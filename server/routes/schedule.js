const express = require("express");
const router = express.Router();
const multer = require("multer");
// const dateUtil = require("date-utils");

const { ClubInfo, Schedule, User, UnionInfo } = require("../models");
const { Op } = (Sequelize = require("sequelize"));
const {
  isLoggedIn,
  isClubManager,
  isUnionManager,
  isManager,
} = require("./middlewares");

// -----------permission------------------

// readAll - 총동연, 동아리
// 조건: 로그인, 관리자 계정
// 결과: 해당 동아리 일정
function checkPermissionForReadClubSchedule(user, clubName) {
  if (isUnionManager(user) && clubName !== "union") {
    const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
    err.name = "IsNotAccessibleAdminAccount";
    throw err;
  } else if (isClubManager(user) && user.accessible_club !== clubName) {
    const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
    err.name = "IsNotAccessibleAdminAccount";
    throw err;
  }
}

// readAll - 개인
// 조건: 로그인, 사용자 계정
// 결과: 해당 사용자 일정

function checkPermissionForReadAllUserSchedule(user) {
  if (isManager(user)) {
    const err = new Error("관리자 계정이 요청할 수 없는 사항입니다.");
    err.name = "NoPermission";
    throw err;
  }
}

// 동아리 create
// 조건: 로그인, 동아리 관리자 게정, 본인 동아리

function checkPermissionForCreateClubSchedule(user, clubName) {
  if (!isManager(user)) {
    const err = new Error("관리자 계정이 아닙니다.");
    err.name = "IsNotManagerAccount";
    throw err;
  }
  if (isUnionManager(user) && clubName !== "union") {
    const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
    err.name = "IsNotAccessibleAdminAccount";
    throw err;
  } else if (isClubManager(user) && user.accessible_club !== clubName) {
    const err = new Error("해당 동아리에 대한 관리자 계정이 아닙니다.");
    err.name = "IsNotAccessibleAdminAccount";
    throw err;
  }
}

// 동아리 update
// 조건: 로그인, 등록자 본인
// 동아리 delete
// 조건: 로그인, 등록자 본인

// 개인 read
// 조건: 로그인
// 개인 create
// 조건: 로그인
// 개인 update
// 조건: 로그인, 등록자 본인
// 개인 delete
// 조건: 로그인, 등록자 본인

async function checkPermissionForUpdateOrDelete(user, schedule) {
  if (!(await user.hasSchedule(schedule))) {
    const err = new Error("해당 스케쥴에 대한 작성자 계정이 아닙니다.");
    err.name = "IsNotScheduleOwner";
    throw err;
  }
}

// -----------동아리, 개인 일정 모두 불러오기------------------
// 전체 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/readAll/:date", isLoggedIn, async (req, res, next) => {
  try {
    checkPermissionForReadAllUserSchedule(req.user);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    // 불러올 날짜 조회
    const paramDate = req.params.date;
    let startDate =
      paramDate.substr(0, 4) + "-" + paramDate.substr(4, 2) + "-01";
    let uptoMonth = parseInt(paramDate.substr(4, 2));
    if (uptoMonth >= 10 && uptoMonth < 12) {
      uptoMonth += 1;
    } else if (uptoMonth == 12) {
      uptoMonth == "01";
    } else {
      uptoMonth += 1;
      uptoMonth.toString();
      uptoMonth = "0" + uptoMonth;
    }
    let endDate = paramDate.substr(0, 4) + "-" + String(uptoMonth) + "-01";
    console.log("조회날짜 >> ", startDate, " ~ ", endDate);

    // 가입한 동아리명 불러오기
    /* 
    "ClubInfos": [
        {
            "name": "blue",
            "ClubMember": {}
        }
      ]
    */
    // 와 같이 name만 불러오지 않는 문제 해결 필요

    let data = [];

    // 개인 일정
    const userSchedule = await Schedule.findAll({
      attributes: ["title", "description", "start", "end", "allDayLong"],
      where: {
        user_id: req.user.id,
        start: {
          [Op.gte]: Date.parse(startDate),
          [Op.lt]: Date.parse(endDate),
        },
      },
      order: [["start", "DESC"]],
    });
    // console.log(">>", userSchedule);

    data.push({ scheduleType: "userSchedule", scheduleList: userSchedule });

    // 동아리 일정
    const user = await User.findByPk(req.user.id, {
      include: [{ model: ClubInfo, attributes: ["name"] }],
    });
    // console.log(user.ClubInfos);
    try {
      await Promise.all(
        user.ClubInfos.map(async (club) => {
          let userClub = await ClubInfo.findOne({
            where: { name: club.name },
          });
          let clubSchedule = await userClub.getSchedules({
            where: {
              start: {
                [Op.gte]: Date.parse(startDate),
                [Op.lt]: Date.parse(endDate),
              },
            },
            order: [["start", "DESC"]],
          });
          // console.log(scheduleList);
          data.push({ scheduleType: club.name, scheduleList: clubSchedule });
          // console.log(data);
        })
      );
      // console.log(data);

      // 총동연 일정
      const unionSchedule = await Schedule.findAll({
        attributes: ["title", "description", "start", "end", "allDayLong"],
        where: {
          union_id: 1,
          start: {
            [Op.gte]: Date.parse(startDate),
            [Op.lt]: Date.parse(endDate),
          },
        },
        order: [["start", "DESC"]],
      });
      // console.log(">>", unionSchedule);
      data.push({ scheduleType: "unionSchedule", scheduleList: unionSchedule });
    } catch (error) {
      res.send(error);
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// -----------동아리 일정------------------
// Read
// 동아리별 + 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/read/:clubName/:date", isLoggedIn, async (req, res, next) => {
  try {
    checkPermissionForReadClubSchedule(req.user, req.params.clubName);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    let club;
    if (req.params.clubName == "union") {
      club = await UnionInfo.findByPk(1);
    }
    else {
      club = await ClubInfo.findOne({
        where: { name: req.params.clubName },
      });
    }
    const clubId = club.id;

    // 월별 조회
    const paramDate = req.params.date; // 20210101이면 올해 1월
    let startDate =
      paramDate.substr(0, 4) + "-" + paramDate.substr(4, 2) + "-01";
    let uptoMonth = parseInt(paramDate.substr(4, 2));
    if (uptoMonth >= 10 && uptoMonth < 12) {
      uptoMonth += 1;
    } else if (uptoMonth == 12) {
      uptoMonth == "01";
    } else {
      uptoMonth += 1;
      uptoMonth.toString();
      uptoMonth = "0" + uptoMonth;
    }
    let endDate = paramDate.substr(0, 4) + "-" + String(uptoMonth) + "-01";

    // 기간별 조회 조회 시작 날짜 ~ 조회 종료 날짜
    console.log("조회날짜 >> ", startDate, " ~ ", endDate);
    const schedule = await Schedule.findAll({
      attributes: ["title", "description", "start", "end", "allDayLong"],
      where: {
        club_id: clubId,
        start: {
          [Op.gte]: Date.parse(startDate),
          [Op.lt]: Date.parse(endDate),
        },
      },
      order: [["start", "DESC"]],
    });
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post(
  "/create/:clubName", // 동아리명
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      checkPermissionForCreateClubSchedule(req.user, req.params.clubName);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      let user = await User.findByPk(req.user.id);
      let club;
      if (req.params.clubName == "union") {
        club = await UnionInfo.findByPk(1);
      }
      else {
        club = await ClubInfo.findOne({
          where: { name: req.params.clubName },
        });
      }
      // false : 시간지정, true : 하루종일
      let schedule = await Schedule.create({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start, // 날짜 시간포함
        end: req.body.end, // 날짜 시간포함
        allDayLong: req.body.allDayLong, // false : 시간지정, true : 하루종일
      });
      await club.addSchedules(schedule);
      await user.addSchedule(schedule);
      console.log("일정 등록");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update
router.post(
  "/update/:scheduleId", // 스케줄 데이터 id
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    let user, schedule;
    try {
      user = await User.findByPk(req.user.id);
      schedule = await Schedule.findByPk(req.params.scheduleId);
      await checkPermissionForUpdateOrDelete(user, schedule);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      schedule.update({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        allDayLong: req.body.allDayLong,
      });
      console.log("일정 수정");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
router.delete("/delete/:scheduleId", // 스케줄 데이터 id
 isLoggedIn, async (req, res, next) => {
  try {
    user = await User.findByPk(req.user.id);
    schedule = await Schedule.findByPk(req.params.scheduleId);
    await checkPermissionForUpdateOrDelete(user, schedule);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    schedule.destroy();
    console.log("일정 삭제");
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// -----------개인 일정------------------
// Read
// 월별 일정 ( date param 에는 20210101 형식으로 접근)
router.get("/readMy/:date", isLoggedIn, async (req, res, next) => {
  try {
    // 월별 - 20210808이면 8월
    // req.params.date; -> 20210808
    const paramDate = req.params.date;
    let startDate =
      paramDate.substr(0, 4) + "-" + paramDate.substr(4, 2) + "-01"; // 시작일
    let uptoMonth = parseInt(paramDate.substr(4, 2));
    if (uptoMonth >= 10 && uptoMonth < 12) {
      uptoMonth += 1;
    } else if (uptoMonth == 12) {
      uptoMonth == "01";
    } else {
      uptoMonth += 1;
      uptoMonth.toString();
      uptoMonth = "0" + uptoMonth;
    }
    let endDate = paramDate.substr(0, 4) + "-" + String(uptoMonth) + "-01"; // 종료일

    console.log("조회날짜 >> ", startDate, " ~ ", endDate);
    const schedule = await Schedule.findAll({
      attributes: ["title", "description", "start", "end", "allDayLong"],
      where: {
        user_id: req.user.id,
        start: {
          [Op.gte]: Date.parse(startDate),
          [Op.lt]: Date.parse(endDate),
        },
      },
      order: [["start", "DESC"]],
    });
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create
router.post(
  "/createMy",
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      let user = await User.findByPk(req.user.id);

      // false : 시간지정, true : 하루종일
      let schedule = await Schedule.create({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        allDayLong: req.body.allDayLong,
      });
      await user.addSchedule(schedule);
      console.log("일정 등록");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update
router.post(
  "/updateMy/:scheduleId", // 스케줄 데이터 id
  isLoggedIn,
  multer().none(),
  async (req, res, next) => {
    try {
      user = await User.findByPk(req.user.id);
      schedule = await Schedule.findByPk(req.params.scheduleId);
      await checkPermissionForUpdateOrDelete(user, schedule);
    } catch (error) {
      console.error(error);
      res.status(403).send(error);
      return;
    }
    try {
      schedule.update({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        allDayLong: req.body.allDayLong,
      });
      console.log("일정 수정");
      res.json(schedule);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete
// 스케줄 데이터 id
router.delete("/deleteMy/:scheduleId", isLoggedIn, async (req, res, next) => {
  try {
    user = await User.findByPk(req.user.id);
    schedule = await Schedule.findByPk(req.params.scheduleId);
    await checkPermissionForUpdateOrDelete(user, schedule);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return;
  }
  try {
    schedule.destroy();
    console.log("일정 삭제");
    res.json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
