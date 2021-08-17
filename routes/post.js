const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  Post,
  Comment,
  ClubInfo,
  UnionInfo,
  User,
  File,
  sequelize,
} = require("../models");
const { isLoggedIn, isClubManager, isUnionManager } = require("./middlewares");
const upload = multer();
const { Op } = (Sequelize = require("sequelize"));

// -----------permission------------

function checkPermissionForCreate(user, clubName, category) {
  // user: req.user
  // clubName: req.params
  // category: req.params
  // 총동연 - 공지사항
  if (clubName === "union" && category === "announcement") {
    if (!isUnionManager(user)) {
      const err = new Error("총동연 관리자 계정이 아닙니다.");
      err.name = "IsNotAdminAccount";
      throw err;
    }
  } else if (clubName === "union" && category === "monthlyKeyum") {
    if (!isUnionManager(user)) {
      const err = new Error("총동연 관리자 계정이 아닙니다.");
      err.name = "IsNotAdminAccount";
      throw err;
    }
  } else if (clubName !== "union" && category === "announcement") {
    if (!isClubManager(user)) {
      const err = new Error("동아리 관리자 계정이 아닙니다.");
      err.name = "IsNotAdminAccount";
      throw err;
    }
    if (user.accessible_club !== clubName) {
      const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
      err.name = "IsNotAccessibleAdminAccount";
      throw err;
    }
  }
}
async function checkPermissionForUpdate(user, post) {
  // user: sequelize model,
  // post: sequelize model

  if (!(await user.hasPost(post))) {
    const err = new Error("해당 게시물에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotPostOwner";
    throw err;
  }
}
async function checkPermissionForDelete(user, post, clubName) {
  // user: sequelize model,
  // post: sequelize model
  if (isUnionManager(user)) {
    return true;
  } else if (isClubManager(user) && user.accessible_club === clubName) {
    return true;
  } else if (!(await user.hasPost(post))) {
    const err = new Error("해당 게시물에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotPostOwner";
    throw err;
  }
}
// -----------post------------
// 총동연, 동아리
// announcement[공지사항], questions[문의게시판], freeBoard[자유게시판], petitions[청원게시판]

// Read
// 게시물 상세
// postId에는 게시물 id가 들어갑니다.
router.get("/read/:postId", async (req, res, next) => {
  try {
    let post = await Post.findOne({
      where: { id: req.params.postId },
      include: [Comment, File, { model: User, attributes: ["name"] }],
    });
    // console.log(post);
    let visit_count = parseInt(post.visit_count) + 1;
    post = await post.update({ visit_count });
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 동아리별 전체 게시물
// readAll/동아리명(총동연포함-총동연은 union으로 접근)/카테고리
// category: announcement[공지사항], questions[문의게시판], freeBoard[자유게시판], petitions[청원게시판]
router.get(
  "/readAll/:clubName/:category",
  // upload.none(),
  async (req, res, next) => {
    if (req.params.clubName === "union") {
      console.log("(ノ^∇^)");
      try {
        let postList = await Post.findAll({
          where: { union_id: 1, category: req.params.category },
          attributes: [
            "id",
            "title",
            "thumbnail",
            "content",
            "set_top",
            "visit_count",
            "comment_count",
            "thumb_count",
          ],
          order: [["created_at", "DESC"]],
        });
        res.json(postList);
      } catch (error) {
        console.error(error);
        next(error);
      }
    } else {
      try {
        const clubInfo = await ClubInfo.findOne({
          where: { name: req.params.clubName },
        });
        const clubId = clubInfo.id;

        let postList = await Post.findAll({
          where: { club_id: clubId, category: req.params.category },
          attributes: [
            "id",
            "title",
            "thumbnail",
            "set_top",
            "visit_count",
            "comment_count",
            "thumb_count",
          ],
          order: [["created_at", "DESC"]],
        });
        res.json(postList);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  }
);

// Create
// create/동아리명(총동연포함-총동연은 union으로 접근)/카테고리
// category: announcement[공지사항], questions[문의게시판], freeBoard[자유게시판], petitions[청원게시판]
router.post(
  "/create/:clubName/:category",
  isLoggedIn,
  // isClubManager,
  upload.none(),
  async (req, res, next) => {
    try {
      checkPermissionForCreate(
        req.user,
        req.params.clubName,
        req.params.category
      );
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    if (req.params.clubName === "union") {
      try {
        const unionInfo = await UnionInfo.findByPk(1);

        let post = await Post.create({
          title: req.body.title,
          category: req.params.category,
          content: req.body.content || null,
          thumbnail: req.body.thumbnail || null,
          set_top: req.body.set_top || false,
          comment_count: 0,
          visit_count: 0,
          thumb_count: 0,
        });
        unionInfo.addPost(post);
        const user = await User.findByPk(req.user.id);
        await user.addPost(post);
        console.log("게시물 등록");
        res.json(post);
      } catch (error) {}
    } else {
      try {
        const clubInfo = await ClubInfo.findOne({
          where: { name: req.params.clubName },
        });

        let post = await Post.create({
          title: req.body.title,
          category: req.params.category,
          content: req.body.content || null,
          thumbnail: req.body.thumbnail || null,
          set_top: req.body.set_top || false,
          comment_count: 0,
          visit_count: 0,
          thumb_count: 0,
        });
        clubInfo.addPost(post);
        const user = await User.findByPk(req.user.id);
        user.addPost(post);
        console.log("게시물 등록");
        res.json(post);
      } catch (error) {
        console.error(error);
      }
    }
  }
);

// Update
// postId에는 게시물 id가 들어갑니다.
router.post(
  "/update/:postId",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    let user, post;
    try {
      user = await User.findByPk(req.user.id);
      post = await Post.findByPk(req.params.postId);
      await checkPermissionForUpdate(user, post);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      post = await post.update({
        title: req.body.title,
        content: req.body.content || null,
        thumbnail: req.body.thumbnail || null,
        set_top: req.body.set_top || false,
      });
      console.log("게시물 수정");
      res.json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
// postId에는 게시물 id가 들어갑니다.
router.delete(
  "/delete/:postId",
  isLoggedIn,
  async (req, res, next) => {
    let user, post, club;
    try {
      user = await User.findByPk(req.user.id);
      post = await Post.findByPk(req.params.postId);
      club = await post.getClubInfo();
      await checkPermissionForDelete(user, post, club.name);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      console.log("게시물 삭제 전");
      post = await post.destroy();
      console.log("게시물 삭제");
      res.json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
