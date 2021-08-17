const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email: username } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              var err = new Error("비밀번호가 일치하지 않습니다.");
              err.name = "WrongPasswordError";
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            const err = new Error("가입되지 않은 회원입니다.");
            err.name = "NoUserError";
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
