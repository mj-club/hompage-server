const express = require("express");
const multer = require("multer");
const passport = require("passport");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User, Auth } = require("../models");

const router = express.Router();
const { Op } = (Sequelize = require("sequelize"));

router.post("/join", isNotLoggedIn, multer().none(), async (req, res, next) => {
  const {
    email,
    name,
    password,
    ph_number,
    department,
    school_year, //학년
    student_id,
    major,
    snsId,
  } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      name,
      password: hash,
      ph_number,
      department,
      school_year,
      student_id,
      auth_lv: 0,
      major,
      snsId,
      // accessible_club: req.body.accessible_club,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.json(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.json(user);
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ status: "logout" });
});

router.post(
  "/checkDuplicate",
  isNotLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let message = "";
      const userEmail = req.body.email;
      const userPH = req.body.ph_number;
      const userId = req.body.student_id;

      const infoEmail = await User.findOne({
        attributes: ["email"],
        where: { email: userEmail },
      });
      const infoPH = await User.findOne({
        attributes: ["ph_number"],
        where: { ph_number: userPH },
      });
      const infoId = await User.findOne({
        attributes: ["student_id"],
        where: { student_id: userId },
      });

      if (!infoEmail) {
        // 사용가능한 이메일입니다.
        if (!infoPH) {
          if (!infoId) {
            console.log("모두 사용가능해요!");
            message = "모두 사용가능해요!";
          } else if (infoId && infoId.student_id == userId) {
            console.log("이미 사용중인 학번이에요!");
            message = "이미 사용중인 학번입니다.";
          }
        } else if (infoPH && infoPH.ph_number == userPH) {
          console.log("이미 사용중인 번호에요!");
          message = "이미 사용중인 번호입니다.";
        }
      } else if (infoEmail && infoEmail.email == userEmail) {
        console.log("이미 사용중인 이메일이에요!");
        message = "이미 사용중인 이메일입니다.";
      }
      res.json(message);
    } catch {
      console.error(error);
      res.send(error);
    }
  }
);
// 개별 중복확인
router.post(
  "/checkEmail",
  isNotLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let message = "";
      const userEmail = req.body.email;
      const infoEmail = await User.findOne({
        attributes: ["email"],
        where: { email: userEmail },
      });

      if (!infoEmail) {
        console.log("사용가능한 이메일입니다.");
        message = "사용가능한 이메일입니다.";
      } else if (infoEmail && infoEmail.email == userEmail) {
        console.log("이미 사용중인 이메일입니다.");
        message = "이미 사용중인 이메일입니다.";
      }

      res.json(message);
    } catch {
      console.error(error);
      res.send(error);
    }
  }
);

router.post(
  "/checkPh",
  isNotLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let message = "";
      const userPH = req.body.ph_number;
      const infoPH = await User.findOne({
        attributes: ["ph_number"],
        where: { ph_number: userPH },
      });

      if (!infoPH) {
        console.log("사용가능한 번호입니다.");
        message = "사용가능한 번호입니다.";
      } else if (infoPH && infoPH.ph_number == userPH) {
        console.log("이미 사용중인 번호입니다.");
        message = "이미 사용중인 번호입니다.";
      }

      res.json(message);
    } catch {
      console.error(error);
      res.send(error);
    }
  }
);

router.post(
  "/checkId",
  isNotLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let message = "";
      const userId = req.body.student_id;
      const infoId = await User.findOne({
        attributes: ["student_id"],
        where: { student_id: userId },
      });

      if (!infoId) {
        console.log("사용가능한 학번입니다.");
        message = "사용가능한 학번입니다.";
      } else if (infoId && infoId.student_id == userId) {
        console.log("이미 사용중인 학번입니다.");
        message = "이미 사용중인 학번입니다.";
      }

      res.json(message);
    } catch {
      console.error(error);
      res.send(error);
    }
  }
);

// 이메일 찾기
router.post(
  "/findEmail",
  isNotLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      const userEmail = await User.findOne({
        attributes: ["email"],
        where: { name: req.body.name, student_id: req.body.student_id },
      });
      const finded = JSON.stringify(userEmail.email);
      const loc = finded.indexOf("@");
      const processed =
        finded.substring(1, loc - 3) +
        "***" +
        finded.substring(loc, finded.length - 1);

      console.log("이메일을 찾았어요!");
      res.json(processed);
    } catch (error) {
      console.log("이메일을 찾지 못했어요...");
      console.error(error);
      res.send(error);
    }
  }
);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log(req.user);
    res.json(req.user);
  }
);

router.post("/findPW", multer().none(), async (req, res) => {
  // email 입력 확인
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  const crypto = require("crypto");
  // 유저 데이터베이스에 존재하는 이메일인지 확인
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        name: req.body.name,
        ph_number: req.body.ph_number,
      },
    });
    console.log(user === null);
    if (user === null) {
      const err = new Error("가입되지 않은 회원입니다.");
      err.name = "NoUserError";
      res.json(err);
    }
    const token = crypto.randomBytes(20).toString("hex"); // token 생성
    const data = {
      // 데이터 정리
      token,
      user_id: user.id,
      ttl: 5000, // ttl 값 설정 (5분)
    };
    console.log(data);
    const auth = await Auth.create(data);
    console.log(auth);
    // nodemailer Transport 생성
    // email example: dsfsa@naver.com
    const host = user.email.split("@")[1];
    const transporter = nodemailer.createTransport({
      // host,
      service: "gmail",
      port: 465,
      // port: "587",
      secure: true, // true for 465, false for other ports
      auth: {
        // 이메일을 보낼 계정 데이터 입력
        user: process.env.MAILER_MAIL,
        pass: process.env.MAILER_PW,
      },
    });
    console.log(user.email, user.password);
    const resetPWLink =
      process.env.NODE_ENV === "production"
        ? `http://13.209.214.244:8080/resetPW/${token}`
        : `<a href="http://localhost:3001/resetPW/${token}">http://localhost/resetPW</a>`;
    const emailOptions = {
      // 옵션값 설정
      from: "명지대학교 인문캠퍼스 총동아리연합회",
      to: user.email,
      subject: "비밀번호 초기화 이메일입니다.",
      html:
        "비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요." +
        resetPWLink,
    };
    transporter
      .sendMail(emailOptions)
      .then((info) => {
        console.log(info);
        res.send(info);
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      }); //전송
    // 데이터베이스 Auth 테이블에 데이터 입력
  } catch (error) {
    res.send(error);
  }
});

router.post("/resetPW/:token", multer().none(), async (req, res) => {
  if (req.body.newPW === undefined) {
    res.status(400).send("new password required");
  }

  // 입력받은 token 값이 Auth 테이블에 존재하며 아직 유효한지 확인
  try {
    const auth = await Auth.findOne({
      where: {
        token: req.params.token,
        created_at: {
          [Op.gt]: new Date(new Date() - 5 * 60 * 1000),
        },
      },
    });
    console.log(auth);
    const user = await User.findByPk(auth.user_id);
    const hash = await bcrypt.hash(req.body.newPW, 12);
    await user.update({
      password: hash,
    });
    console.log(user);
    res.json("complete");
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
