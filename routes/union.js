var express = require("express");
var router = express.Router();
var UnionController = require("../controller/union");

/* 총동연 정보 추가 */
router.post("/", fileMulter.array("files"), UnionController.addUnionInfo);

/* 총동연 정보 확인, 수정, 삭제 */
router
	.route("/:unionName")
	.get(UnionController.getUnionInfo)
	.patch(fileMulter.array("files"), UnionController.editUnionInfo)
	.delete(UnionController.removeUnionInfo);

/* 동아리 추가 */
router.post("/addClub", multer().none(), UnionController.addClub);

/* 동아리 삭제 */
router.delete("/removeClub/:clubName", UnionController.removeClub);

module.exports = router;
