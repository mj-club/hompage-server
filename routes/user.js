var express = require("express");
var router = express.Router();

const UserController = require("../controller/user");
const { addSchedule, getSchedule } = require("../services/user");
var multer = require("multer");

/* 프로필 확인, 수정 */
router
	.route("/info")
	.get(UserController.getProfile)
	.patch(multer().none(), UserController.editProfile);

/* 일정 추가 */
router.post("/schedule", multer().none(), addSchedule);

/* 일정 모두 불러오기 */
router.get("/schedule/all", getSchedule);

/* 일정 확인, 수정, 삭제 */
router
	.route("/schedule/:scheduleId")
	.get(UserController.addSchedule)
	.patch(multer().none(), UserController.editSchedule)
	.delete(UserController.removeSchedule);

/* 내가 쓴 게시물 모두 불러오기 */
router.get("/myPost", UserController.getAllUserPost);

/* 내가 쓴 댓글 모두 불러오기 */
router.get("/myComment", UserController.getAllUserComment);

module.exports = router;
