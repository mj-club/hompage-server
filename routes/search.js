var express = require("express");
var router = express.Router();
var SearchController = require("../controller/search");

/* 통합검색 */
router.get("/all/:keyword", SearchController.searchAll);

/* 게시판 내 검색 */
router.get("/:board/:keyword", SearchController.searchByBoard);

module.exports = router;
