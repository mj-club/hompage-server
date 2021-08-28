var express = require("express");
var router = express.Router();

/* 회원가입 */
router.get("/join");

/* 로그인 */
router.get("/login");

/* 로그아웃 */
router.get("/logout");

/* 이메일 찾기 */
router.get("/findEmail");

/* 토큰 요청 */
router.get("/sendTokenToMail");

/* 비번 재설정 */
router.get("/resetPW/:token");

/* 회원 탈퇴 */
router.get("/leave");

/* 계정 권한 확인하기 */
router.get("/checkPermission/:accountType");

/* 이메일 중복확인 */
router.get("/checkEmail");

/* 학번 중복확인 */
router.get("/checkStudentId");

/* 휴대폰번호 중복확인 */
router.get("/ccheckPh");

module.exports = router;
