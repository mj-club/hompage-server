var express = require("express");
var router = express.Router();
var PostController = require("../controller/post");

/* 게시물 등록 */
router.post("/:belong/:board", PostController.addPost);

/* 게시물 보여주기 */
router.route("/:postId")
  .get(PostController.showPost)
  .patch(PostController.editPost)
  .delete(PostController.removePost)

module.exports = router;