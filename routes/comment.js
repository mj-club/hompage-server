var express = require("express");
var router = express.Router();
var CommentController = require("../controller/comment");

/* 댓글 등록 */
router.post("/:postId", CommentController.addComment);

/* 댓글 수정, 삭제 */
router.route("/:commentId")
  .patch(CommentController.editComment)
  .delete(CommentController.removeComment)

module.exports = router;