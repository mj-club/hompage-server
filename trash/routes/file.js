const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const { Post, File } = require("../models");
const { findByPk } = require("../models/user");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

// -----------file------------

// try {
//   fs.readFileSync("uploads");
// } catch (error) {
//   console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
//   fs.mkdirSync("uploads");
// }

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});
const s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3,
    bucket: "mju-club",
    key(req, file, cb) {
      const fileType =
        file.mimetype.split("/")[file.mimetype.split("/").length - 1];
      if (fileType == "image") {
        console.log("imageFile upload.");
        cb(null, `images/${Date.now()}${path.basename(file.originalname)}`);
      } else if (fileType == "video") {
        console.log("videoFile upload.");
        cb(null, `videos/${Date.now()}${path.basename(file.originalname)}`);
      } else {
        console.log("documentFile upload.");
        cb(null, `documents/${Date.now()}${path.basename(file.originalname)}`);
      }
    },
  }),
});

// Read
// 게시물별 파일 불러오기
router.get(
  "/read/:postId",
  async (req, res, next) => {
    try {
      let files = await File.findAll({
        where: { post_id: req.params.postId },
      });
      res.json(files);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create
router.post(
  "/upload/:postId",
  isLoggedIn,
  upload.array("files"),
  async (req, res) => {
    console.log(req.files);

    // const urls = [];
    let fileType, url, originalUrl;
    // req.files.map((file) => {
    //   fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
    //   if (fileType == "image") {
    //     originalUrl = file.location;
    //     url = originalUrl.replace(/\/images\//, "/thumb/");
    //     urls.push({ fileType, url, originalUrl });
    //   } else {
    //     urls.push({ fileType, url: file.location });
    //   }
    // });
    let post = await Post.findOne({
      where: { id: req.params.postId },
      include: [File],
    });
    req.files.map(async (file) => {
      fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
      if (fileType == "image") {
        originalUrl = file.location;
        url = originalUrl.replace(/\/images\//, "/thumb/");

        console.log(originalUrl);
        onsole.log(url);
      } else {
        url = file.location;
        originalUrl = file.location;

        console.log(originalUrl);
        console.log(url);
      }

      const uploaded = await File.create({
        file_type: fileType,
        original_url: originalUrl,
        url: url,
        description: req.body.description,
      });
      post = await post.addFile(uploaded);
    });
    console.log(post.Files);

    res.json(post.files);
  }
);

// Delete
router.delete(
  "/delete/:fileId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const file = await File.findByPk(req.params.fileId);
      const url = file.url.split("/"); // file에 저장된 fileUrl을 가져옴
      const originalUrl = file.original_url;

      const delFileName = url[url.length - 1]; // 버킷에 저장된 객체 URL만 가져옴
      const params = {
        Bucket: "mju-club/documents",
        Key: delFileName,
      };
      if (file.file_type === "image") {
        await s3.deleteObject(params, function (err, data) {
          if (err) {
            console.log("aws delete error");
            console.log(err, err.stack);
            res.redirect("/");
          } else {
            console.log("aws delete success" + data);
          }

          // const post = await Comment.destroy({
          //   where: { id: req.params.fileId },
          // });

          console.log("리사이즈 파일 삭제");
        });
      }
      await s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log("aws delete error");
          console.log(err, err.stack);
          res.redirect("/");
        } else {
          console.log("aws delete success" + data);
        }
      });
      const deleted = await File.destroy({
        where: { id: req.params.fileId },
      });

      console.log("파일 삭제");
      res.json(deleted);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// // download
// router.get("/download/:postId/:name", function (req, res) {
//   var filename = req.params.name;
//   let filePath = await File.findOne({
//     where: { post_id: req.params.postId  },
//   });

//   console.log(__dirname);
//   var file = __dirname + "/../uploads/images/" + filename;
//   console.log(req.path);
//   console.log(file);
//   res.download(file);
// });

module.exports = router;
