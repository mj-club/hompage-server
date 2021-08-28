// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).send("로그인 필요");
//     // res.redirect("/");
//     // res.json(req);
//   }
// };

const { User, Post } = require("../models");

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    // res.redirect(`/?error=${message}`);
    res.json(message);
  }
};

exports.noPermission = function (req, res) {
  req.flash("errors", { login: "권한이 없습니다." });
  const message = encodeURIComponent("권한이 없습니다.:");
  req.logout();
  res.json(req);
};

// permission (로그인)
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
    // res.redirect("/");
    // res.json(req);
  }
};

// permission (관리자만)
exports.isManager = (user) => {
  const res = user.auth_lv > 0 ? true : false;
  return res;
};

// permission (동아리만)
exports.isClubManager = (user) => {
  const res = user.auth_lv === 1 ? true : false;
  return res;
};

// permission (총동연만)
exports.isUnionManager = (user) => {
  const res = user.auth_lv === 2 ? true : false;
  return res;
};

exports.fileSize = function (bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};
