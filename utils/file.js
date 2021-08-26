const { File } = require("../models");

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
