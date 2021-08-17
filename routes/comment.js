const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Comment, Post, User } = require("../models");
const { isLoggedIn, isClubManager, isUnionManager } = require("./middlewares");

// -----------permission------------
function checkPermissionForCreate(user, clubName) {
  // 총동연 문의사항: 일반, 동아리, 총동연
  // 동아리 문의사항: 일반, 해당 동아리
  // 총동연 청원: 일반, 동아리, 총동연
  // 총동연 자게: 일반, 동아리, 총동연
  // monthly keyum: 일반, 동아리, 총동연
  if (isClubManager(user) && user.accessible_club !== clubName) {
    const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
    err.name = "IsNotAccessibleAdminAccount";
    throw err;
  }
}
async function checkPermissionForUpdate(user, comment) {
  if (!(await user.hasComment(comment))) {
    const err = new Error("해당 댓글에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotCommentOwner";
    throw err;
  }
}
async function checkPermissionForDelete(user, comment, clubName) {
  if (isUnionManager(user)) {
    return true;
  } else if (isClubManager(user) && user.accessible_club === clubName) {
    return true;
  } else if (!(await user.hasComment(comment))) {
    const err = new Error("해당 댓글에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotCommentOwner";
    throw err;
  }
}
// -----------comment------------

//Read
// 게시물별 전체 댓글
router.get(
  "/read/:postId", // 게시물 id
  async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        where: { post_id: req.params.postId },
        order: [["created_at", "DESC"]],
      });

      res.json(comments);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post(
  "/create/:postId", // 게시물 id
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    let user, post, club;
    try {
      user = await User.findByPk(req.user.id);
      post = await Post.findByPk(req.params.postId);
      club = await post.getClubInfo();
      checkPermissionForCreate(user, club.name);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      const comment = await Comment.create({
        content: req.body.content,
        post_id: req.params.postId,
        // writer_id: req.user.id,
      });
      await post.addComment(comment);
      await user.addComment(comment);
      console.log("댓글 등록");
      res.json(comment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update
router.post(
  "/update/:commentId", // 댓글 id
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    let user, comment;
    try {
      user = await User.findByPk(req.user.id);
      comment = await Comment.findByPk(req.params.commentId);
      await checkPermissionForUpdate(user, comment);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      comment.update({
        content: req.body.content,
      });
      console.log("댓글 수정");
      res.json(comment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
// 댓글 id
router.delete("/delete/:commentId", isLoggedIn, async (req, res, next) => {
  let user, comment, club;
  try {
    user = await User.findByPk(req.user.id);
    comment = await Comment.findByPk(req.params.commentId);
    club = await comment.getPost().getClubInfo();
    await checkPermissionForDelete(user, comment, club.name);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    comment.destroy();
    console.log("댓글 삭제");
    res.json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
