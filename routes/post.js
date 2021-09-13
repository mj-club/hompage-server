var express = require("express");
var router = express.Router();
var PostController = require("../controller/post");
const { fileMulter } = require("../utils/file");

/* 게시물 등록 */
router.post(
	"/:belong/:board",
	fileMulter.array("files"),
	PostController.addPost
);

/* 게시물 보여주기 */
router
	.route("/:postId")
	.get(PostController.showPost)
	.patch(fileMulter.array("files"), PostController.editPost)
	.delete(PostController.removePost);

module.exports = router;
