const express = require("express");
const multer = require("multer");

const { EventInfo } = require("../models");
const { isLoggedIn, isUnionManager } = require("./middlewares");

const router = express.Router();

const upload = multer();

// -----------permission------------

function checkPermissionForCreate(user) {
  // user: req.user
  if (!isUnionManager(user)) {
    const err = new Error("총동연 관리자 계정이 아닙니다.");
    err.name = "IsNotAdminAccount";
    throw err;
  }
}
async function checkPermissionForUpdate(user) {
  if (!isUnionManager(user)) {
    const err = new Error("총동연 관리자 계정이 아닙니다.");
    err.name = "IsNotAdminAccount";
    throw err;
  }
}
async function checkPermissionForDelete(user) {
  if (!isUnionManager(user)) {
    const err = new Error("총동연 관리자 계정이 아닙니다.");
    err.name = "IsNotAdminAccount";
    throw err;
  }
}

// -----------event------------
// 총동연만 생성, 수정, 삭제 가능

// Read
// 개별 이벤트 상세
// eventId에는 이벤트 id가 들어갑니다.
router.get("/read/:eventId", async (req, res, next) => {
  try {
    let eventInfo = await EventInfo.findOne({
      where: { id: req.params.eventId },
    });
    res.json(eventInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 전체 이벤트 목록
router.get("/readAll", async (req, res, next) => {
  try {
    let eventInfo = await EventInfo.findAll({
      attributes: ["title", "event_term", "event_start", "event_end"],
      order: [["event_Start", "ASC"]],
    });
    res.json(eventInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post(
  "/create",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      checkPermissionForCreate(req.user);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
    try {
      let eventInfo = await EventInfo.create({
        event_name: req.body.event_name,
        event_target: req.body.event_target,
        title: req.body.title,
        content: req.body.content,
        event_term: req.body.event_term,
        event_start: req.body.event_start,
        event_end: req.body.event_end,
        event_link: req.body.event_link,
        event_img: req.body.event_img,
      });
      console.log("이벤트 등록");
      res.json(eventInfo);
    } catch (error) {
      console.error(error);
    }
  }
);

// Update
// eventId에는 이벤트 id가 들어갑니다.
router.post(
  "/update/:eventId",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      checkPermissionForUpdate(req.user);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
    try {
      let eventInfo = await EventInfo.update(
        {
          event_name: req.body.event_name,
          event_target: req.body.event_target,
          title: req.body.title,
          content: req.body.content,
          event_term: req.body.event_term,
          event_start: req.body.event_start,
          event_end: req.body.event_end,
          event_link: req.body.event_link,
          event_img: req.body.event_img,
        },
        { where: { id: req.params.eventId } }
      );
      console.log("이벤트 수정");
      res.json(eventInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
// eventId에는 이벤트 id가 들어갑니다.
router.delete(
  "/delete/:eventId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      checkPermissionForDelete(req.user);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
    }
    try {
      const eventInfo = await EventInfo.destroy({
        where: { id: req.params.eventId },
      });
      console.log("이벤트 삭제");
      res.json(eventInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
