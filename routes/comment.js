var express = require("express");
var router = express.Router();
var CommentController = require("../controller/comment");

/* 댓글 등록 */
router.post("/:postId", multer().none(), CommentController.addComment);

/* 댓글 수정, 삭제 */
router
	.route("/:commentId")
	.patch(multer().none(), CommentController.editComment)
	.delete(CommentController.removeComment);

module.exports = router;
