const SearchService = require("../services");

// 통합검색
module.exports.searchAll = async (req, res, next) => {
  try {
		const search = await SearchService.searchAll(req.body);
		res.json(search);
	} catch (err) {
		next(err);
	}
};

// 게시판 내 검색
module.exports.searchByBoard = async (req, res, next) => {
  try {
		const search = await SearchService.searchByBoard(req.body);
		res.json(search);
	} catch (err) {
		next(err);
	}
};
