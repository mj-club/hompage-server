// import package
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const createError = require("http-errors");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// redis
const redisClient = redis.createClient({
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
	password: process.env.REDIS_PW,
});

// set router
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const clubRouter = require("./routes/club");
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");
const searchRouter = require("./routes/search");
const unionRouter = require("./routes/union");
const userRouter = require("./routes/user");
const { sequelize } = require("./models");
const passportConfig = require("./passport");
const logger = require("./logger");

// init express app
const app = express();
// passportConfig();
app.set("port", process.env.PORT || 3001);

// init sequelize
sequelize
	.sync({ force: true })
	.then(() => {
		console.log("데이터베이스 연결 성공");
	})
	.catch((err) => {
		console.error(err);
	});

// middleware
if (process.env.NODE_ENV === "production") {
	app.use(morgan("combined"));
	app.use(helmet({ contentSecurityPolicy: false }));
	app.use(hpp());
} else {
	app.use(morgan("dev"));
}
// cors
// app.use(
//   cors({
//     origin: "http://13.209.214.244:8080", // 허용할 도메인
//     credentials: true, // 도메인 간 쿠키 공유
//   })
// );
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build"))); // default folder location
app.use("/files", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));

// session
const sessionOption = {
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true,
		secure: false,
	},
	store: new RedisStore({ client: redisClient }),
};

if (process.env.NODE_ENV === "production") {
	sessionOption.proxy = true;
	// sessionOption.cookie.secure = true; //쿠키 전송을 https로 제한
} else {
	app.use(morgan("dev"));
}
// set express-session
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

// route handler
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/club", clubRouter);
app.use("/comment", commentRouter);
app.use("/post", postRouter);
app.use("/search", searchRouter);
app.use("/union", unionRouter);
app.use("/user", userRouter);

// react router
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
	error.status = 404;
	logger.info("hello");
	logger.error(error.message);
	next(error);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err);
});

// listen server
app.listen(app.get("port"), () => {
	console.log(
		app.get("port"),
		"번 포트에서 대기중\n",
		"NODE_ENV: ",
		process.env.NODE_ENV
	);
});

// 테스트 전용
module.exports = {
	sayHello: function () {
		return "hello";
	},
	addNumbers: function (a, b) {
		return a + b;
	},
};
