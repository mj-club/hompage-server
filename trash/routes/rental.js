const express = require("express");
const multer = require("multer");

const { RentalInfo, RentalApply, User } = require("../models");
const { isLoggedIn, isUnionManager } = require("./middlewares");

const router = express.Router();

const upload = multer();

//--------사용자----------

// Read
// 개인 신청 내역 조회 (상세)
// itemId에는 대여 품목의 id가 들어갑니다.
router.get(
  "/my-application/read/:itemId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const myRental = await RentaApply.findOne({
        where: { id: req.params.itemId, user_id: req.user.id },
      });
      res.json(myRental);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);
// 개인 신청 내역 전체 조회
router.get(
  "/my-application/readAll",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const myRental = await RentalApply.findAll({
        where: { user_id: req.user.id },
      });
      res.json(myRental);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);

// Read
// 대여 공간 및 물품 상세 조회 (게시판에서)
// itemId에는 대여 품목의 id가 들어갑니다.
router.get(
  "/read/:itemId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.findOne({
        where: { id: req.params.itemId },
      });
      res.json(rental);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);

// 대여 공간 및 물품 전체 조회 (게시판에서)
// itemId에는 대여 품목의 id가 들어갑니다.
router.get(
  "/readAll",
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.findAll({
        attributes: [
          "room_name",
          "rental_state",
          "room_img",
        ],
        order: [["room_name", "DESC"]],
      });
      res.json(rental);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);

//--------사용자(대여 신청)----------
// Create
// 신청
// 날짜 먼저 선택 후 대여인지, 대여 신청페이지에서 날짜 선택인지..
// 름 선택 후 신청인지, 신청페이지에서 룸 선택인지

router.post(
  // itemId에는 대여 품목의 id가 들어갑니다.
  "/application/:itemId",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rentalItem = await RentalInfo.findOne({
        where: { id: req.params.itemId },
      });
      if (rentalItem.rental_state != 1) {
        const rental = await RentalApply.create({
          room_name: rentalItem.room_name,
          rental_date: req.body.rental_date,
          start: req.body.start,
          end: req.body.end,
          rental_time: req.body.rental_time, // 수정할것
          rep_member_name: req.body.rep_member_name,
          member_count: req.body.member_count,
          apply_state: 0,
        });
        const user = await User.findByPk(req.user.id);
        await user.addRentalApply(rental);
        console.log("대여 신청(사용자)");
        res.json(rental);
      }
      else {
        const error = new Error("잔여 수량이 부족하여 신청할 수 없습니다.");
        res.send(error);
      }
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);

// Update
// 신청 수정 
// itemId에는 대여 품목의 id가 들어갑니다.
router.post(
  "/application/update/:itemId",
  isLoggedIn,
  // apply_state -> 0,1,2에 따른 구분 설정 추가 필요
  upload.none(),
  async (req, res, next) => {
    try {
      const rentalItem = await RentalInfo.findOne({
        where: { id: req.params.itemId },
      });
      const rental = await RentalApply.update({
        rental_date: req.body.rental_date,
        start: req.body.start,
        end: req.body.end,
        rental_time: req.body.rental_time,
        rep_member_name: req.body.rep_member_name,
        member_count: req.body.member_count,
      },
      { 
        where: { id: rentalItem.id }
      });
      console.log("신청 수정");
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

// Delete
// 신청 취소(사용자)
// itemId에는 대여 품목의 id가 들어갑니다.
router.delete(
  "/application/delete/:itemId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const rental = await RentalApply.destroy({
        where: { id: req.params.itemId },
      });
      console.log("신청 취소");
      res.json(rental);
    } catch (err) {
      console.error(err);
    }
  }
);

//--------관리자----------

// 대여서비스 공간 또는 물품 추가(관리자)
// Create
router.post(
  "/create",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.create({
        room_name: req.body.room_name,
        rental_state: req.body.rental_state,
        room_img: req.body.room_img,
      });
      console.log("대여 공간/물품 등록");
      res.json(rental);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
);

// Update
// 대여서비스 공간 또는 물품 수정(관리자)
// itemId에는 대여 품목의 id가 들어갑니다.
router.post(
  "/update/:itemId",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.update({
        room_name: req.body.room_name,
        rental_state: req.body.rental_state,
        room_img: req.body.room_img,
      },
      {
        where: { id: req.body.itemId }
      });
      console.log("대여 공간/물품 수정");
      res.json(rental);
    } catch (error) {
      console.error(error);
    }
  }
);

// Delete
// 대여서비스 공간 또는 물품 삭제(관리자)
// itemId에는 대여 품목의 id가 들어갑니다.
router.delete(
  "/delete/:itemId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const rental = await RentalInfo.destroy({
        where: { id: req.params.itemId },
      });
      console.log("대여 공간/물품 삭제");
      res.json(rental);
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
