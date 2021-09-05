const { PageService } = require("../services");

// 게시판 보여주기
module.exports.showBoard = async (res, req, next) => {
	try {
		const posts = await PageService.showBoard(
			req.params.belong,
			req.params.board
		);
		res.json(posts);
	} catch (err) {
		next(err);
	}
};
