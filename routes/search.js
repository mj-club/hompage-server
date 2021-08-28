var express = require("express");
var router = express.Router();

/* 통합검색 */
router.get("/all/:keyword");

/* 게시판 내 검색 */
router.get("/:board/:keyword");

module.exports = router;
