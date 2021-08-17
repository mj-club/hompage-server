var express = require("express");
const path = require("path");
var router = express.Router();

//html file
const index = path.resolve(__dirname, "../../client/build/index.html")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(index);
});


module.exports = router;
