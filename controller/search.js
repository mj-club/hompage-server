const SearchService = require("../services");

// 통합검색
module.exports.searchAll = async (res, req, next) => {
  try {
		const search = await SearchService.searchAll(keyword, searchOption, page);
		res.json(search);
	} catch (err) {
		next(err);
	}
};

// 게시판 내 검색
module.exports.searchByBoard = async (res, req, next) => {
  try {
		const search = await SearchService.searchByBoard(keyword, searchOption, page);
		res.json(search);
	} catch (err) {
		next(err);
	}
};
