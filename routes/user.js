var express = require('express');
var router = express.Router();
const { isLoggedIn, noPermission } = require('./middlewares');

const { PostController } = require("../controller");

// 게시판 보여주기
router.get('/board/:belong/:board', PostController)

module.exports = router;
