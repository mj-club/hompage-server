var express = require("express");
const multer = require("multer");
var router = express.Router();
var AuthController = require("../controller/auth");

/* 회원가입 */
router.post("/join", multer().none(), AuthController.join);

/* 로그인 */
router.post("/login", AuthController.login);

/* 로그아웃 */
router.get("/logout", AuthController.logout);

/* 이메일 찾기 */
router.post("/findEmail", multer().none(), AuthController.findEmail);

/* 토큰 요청 */
router.post(
	"/sendTokenToMail",
	multer().none(),
	AuthController.sendTokenToMail
);

/* 비번 재설정 */
router.post("/resetPW/:token", multer().none(), AuthController.resetPW);

/* 회원 탈퇴 */
router.post("/leave", multer().none(), AuthController.leave);

/* 계정 권한 확인하기 */
router.get("/checkPermission/:accountType", AuthController.leave);

/* 이메일 중복확인 */
router.post("/checkEmail", multer().none(), AuthController.checkEmail);

/* 학번 중복확인 */
router.post("/checkStudentId", multer().none(), AuthController.checkStudentId);

/* 휴대폰번호 중복확인 */
router.post("/checkPh", AuthController.checkPh);

module.exports = router;
