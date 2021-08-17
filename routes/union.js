const express = require("express");
const router = express.Router();
const multer = require("multer");

const { UnionInfo, UnionMember } = require("../models");
const { isLoggedIn, isUnionManager } = require("./middlewares");
const { Op } = (Sequelize = require("sequelize"));
const upload = multer();

// -----------permission------------
function checkPermission(user) {
  if (!isUnionManager(user)) {
    const err = new Error("총동연 관리자 계정이 아닙니다.");
    err.name = "IsNotAdminAccount";
    throw err;
  }
}
// -----------union info------------

// Read
router.get("/read", async (req, res, next) => {
  try {
    const unionInfo = await UnionInfo.findAll();
    res.json(unionInfo);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Create
router.post("/create", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    checkPermission(req.user);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    let unionInfo = await UnionInfo.create({
      name: req.body.name,
      slogan: req.body.slogan,
      representative: req.body.slogan,
      deputy_representative: req.body.deputy_representative,
      organization_chart: req.body.organization_chart,
      logo: req.body.logo,
      th: req.body.th,
    });
    console.log("총동연 초기 정보 등록");
    res.json(unionInfo);
  } catch (error) {
    console.error(error);
  }
});

// Update
router.post("/update", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    checkPermission(req.user);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    let unionInfo = await UnionInfo.update(
      {
        name: req.body.name,
        slogan: req.body.slogan,
        representative: req.body.slogan,
        deputy_representative: req.body.deputy_representative,
        organization_chart: req.body.organization_chart,
        logo: req.body.logo,
        th: req.body.th,
      },
      {
        where: { id: 1 },
      }
    );
    console.log("총동연 데이터 수정");
    res.json(unionInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete
router.delete("/delete", isLoggedIn, async (req, res, next) => {
  try {
    checkPermission(req.user);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    const unionInfo = await UnionInfo.destroy({
      where: {},
      truncate: false,
    });
    console.log("총동연 정보 삭제");
    res.json(unionInfo);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
