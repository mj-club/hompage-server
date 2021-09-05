var express = require("express");
var router = express.Router();
var ClubController = require("../controller/club");

/* 동아리 정보 확인, 수정 */
router.route("/:club")
  .get(ClubController.getClubInfo)
  .patch(ClubController.editClubInfo)

/* 멤버 추가, 삭제 */
router.route("/member")
  .post(ClubController.addMember)
  .delete(ClubController.removeMember)

/* 모든 멤버 확인 */
router.get("/member/all", ClubController.getAllMember);

module.exports = router;
