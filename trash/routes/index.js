var express = require("express");
const path = require("path");
var router = express.Router();

//html file
<<<<<<< HEAD
const index = path.resolve(__dirname, "../../client/build/index.html");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.sendFile(index);
});

/* 게시판 보여주기 */
router.get("/board/:belong/:board");
=======
const index = path.resolve(__dirname, "../../client/build/index.html")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(index);
});

>>>>>>> 0cd710966b43219db606b26e69c655c3bf838dcc

module.exports = router;
