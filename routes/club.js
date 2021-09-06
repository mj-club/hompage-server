var express = require("express");
const multer = require("multer");
var router = express.Router();
var ClubController = require("../controller/club");
const { fileMulter } = require("../utils/file");

/* 동아리 정보 확인, 수정 */
router
	.route("/:club")
	.get(ClubController.getClubInfo)
	.patch(fileMulter.array("files"), ClubController.editClubInfo);

/* 멤버 추가, 삭제 */
router
	.route("/member")
	.post(multer().none(), ClubController.addMember)
	.delete(ClubController.removeMember);

/* 모든 멤버 확인 */
router.get("/member/all", ClubController.getAllMember);

module.exports = router;
