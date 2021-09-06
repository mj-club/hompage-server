const { File } = require("../models");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

AWS.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	region: "ap-northeast-2",
});
const s3 = new AWS.S3();

module.exports.fileMulter = multer({
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

// 파일 업로드
module.exports.upload = async (model, files) => {
	let fileType, url, originalUrl;
	files.map(async (file) => {
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
		model = await model.addFile(uploaded);
	});

	return model;
};

// 파일 삭제
module.exports.delete = (model) => {
	model.getFiles().map((file) => file.destroy());
};
