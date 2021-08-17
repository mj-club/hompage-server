var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { isLoggedIn, noPermission } = require('./middlewares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// read
router.get(
  "/read", 
  isLoggedIn, 
  async (req, res, next) => {
    try {

      let userInfo = await User.findOne({
        attributes: [
          "email",
          "name",
          "ph_number",
          "department",
          "school_year",
          "student_id",
          "major",
          "snsId",
        ],
        where: { id: req.user.id }
      });
      res.json(userInfo);
    } catch (error) {
      console.error(error);
      next(error);
    }
});


// update
router.get(
  "/update", 
  isLoggedIn, 
  async (req, res, next) => {
    try {
      const {
        email,
        name,
        password,
        ph_number,
        department,
        school_year,
        student_id,
        major,
        snsId,
      } = req.body;
      const hash = await bcrypt.hash(password, 12);
      let userInfo = await User.update({
        email,
        name,
        password: hash,
        ph_number,
        department,
        school_year,
        student_id,
        auth_lv,
        major,
        snsId,
      },
      {
        where: { id: req.user.id }
      });
      console.log("회원 정보 수정");
      res.json(userInfo);
    } catch (error) {
      console.error(error);
    }
});

// Delete
router.delete(
  "/delete",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const userInfo = await User.destroy({
        where: { id: req.user.id },
        // truncate: true 
      });
      console.log("회원 정보 삭제(탈퇴)");
      res.json(userInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
