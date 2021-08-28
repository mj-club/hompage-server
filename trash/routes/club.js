const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { ClubInfo, ClubMember, User, Sns, Join } = require("../models");
const { isLoggedIn, isClubManager } = require("./middlewares");

// -----------permission------------
function checkPermission(user, clubName) {
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
// -----------club info------------

// club info
// read
router.get("/read/:clubName", async (req, res, next) => {
  try {
    const club = await ClubInfo.findOne({
      where: { name: req.params.clubName },
      include: [Sns, Join],
    });
    res.json(club);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


//create or update
router.post(
  "/createOrUpdate/:clubName",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      checkPermission(req.user, req.params.clubName);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      let clubInfo = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
      if (clubInfo === null) {
        clubInfo = await ClubInfo.create({
          name: req.params.clubName,
          representation: req.body.representation,
          contact_number: req.body.contact_number,
          introduction: req.body.introduction,
          plan: req.body.plan,
          recruit: req.body.recruit,
          meeting: req.body.meeting,
          recruitment: req.body.recruitment,
        });

        //sns
        if (req.body.sns) {
          sns = req.body.sns;
          sns.map(async (data) => {
            try {
              let sns = await Sns.create({
                sns_type: data.sns_type,
                sns_link: data.sns_link,
              });
              await clubInfo.addSns(sns);
            } catch (error) {
              console.error(error);
            }
          });
        }
        //join
        if (req.body.join) {
          join = req.body.join;
          join.map(async (data) => {
            try {
              let join = await Join.create({
                join_type: data.join_type,
                join_path: data.join_path,
              });
              await clubInfo.addJoin(join);
            } catch (error) {
              console.error(error);
            }
          });
        }
      } else {
        clubInfo.update({
          name: req.params.clubName,
          representation: req.body.representation,
          contact_number: req.body.contact_number,
          introduction: req.body.introduction,
          plan: req.body.plan,
          recruit: req.body.recruit,
          meeting: req.body.meeting,
          recruitment: req.body.recruitment,
        });

        //sns
        if (req.body.sns) {
          await Sns.destroy({ where: { club_id: clubInfo.id } });
          sns = req.body.sns;
          sns.map(async (data) => {
            try {
              let sns = await Sns.create({
                sns_type: data.sns_type,
                sns_link: data.sns_link,
              });
              await clubInfo.addSns(sns);
            } catch (error) {
              console.error(error);
            }
          });
        }
        //join
        if (req.body.join) {
          await Join.destroy({ where: { club_id: clubInfo.id } });
          join = req.body.join;
          join.map(async (data) => {
            try {
              let join = await Join.create({
                join_type: data.join_type,
                join_path: data.join_path,
              });
              await clubInfo.addJoin(join);
            } catch (error) {
              console.error(error);
            }
          });
        }
      }
      res.json(clubInfo);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// delete
router.delete("/delete/:clubName", isLoggedIn, async (req, res, next) => {
  try {
    checkPermission(req.user, req.params.clubName);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    let clubInfo = await ClubInfo.destroy({
      where: { name: req.params.clubName },
    });
    res.json(clubInfo);
  } catch (err) {
    console.error(err);
  }
});

// -----------members------------

// read (member list)
router.get(
  "/readMembers/:clubId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const clubMembers = await ClubMember.findAll({
        where: { club_info_id: req.params.clubId },
      });
      res.json(clubMembers);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// add (member)
// 여러번 add시 에러 핸들링 필요
router.post(
  "/addMember/:clubId",
  multer().none(),
  isLoggedIn,
  async (req, res, next) => {
    try {
      const clubInfo = await ClubInfo.findByPk(req.params.clubId);
      const user = await User.findByPk(req.body.user_id);
      await clubInfo.addUser(user, {
        through: { position: req.body.member_position },
      });
      const result = await ClubInfo.findOne({
        where: { id: req.params.clubId },
        include: User,
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

// delete (member)
router.delete(
  "/deleteMember/:clubId",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      ClubMember.destroy({
        where: { club_info_id: req.params.clubId, user_id: req.body.user_id },
      });
      const result = await ClubInfo.findOne({
        where: { id: req.params.clubId },
        include: User,
      });

      res.json(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

module.exports = router;
