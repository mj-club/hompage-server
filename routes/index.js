var express = require("express");
const path = require("path");
var router = express.Router();
var IndexController = require("../controller/index");

//html file
const index = path.resolve(__dirname, "../../client/build/index.html");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.sendFile(index);
});

/* 게시판 보여주기 */
router.get("/board/:belong/:board", IndexController.showBoard);

module.exports = router;
