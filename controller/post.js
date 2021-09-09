const {
	UserService,
	PageService,
	UnionService,
	ClubService,
} = require("../services");
const { Permission } = require("../utils");

// 게시물 등록
module.exports.addPost = async (req, res, next) => {
	try {
		const { belong, board } = req.params;
		console.log("belong = ", belong);
		console.log("board = ", board);
		let post;

		// 공지사항 게시판
		if (board === "announcement") {
			if (belong === "union") {
				post = await UnionService.addAnnouncementPost(req.user.id, req.body);
				return post;
			} else {
				post = await ClubService.addAnnouncementPost(req.user.id, req.body);
				return post;
			}
		}
		// 문의사항 게시판
		else if (board === "question") {
			if (belong === "union") {
				post = await UserService.addUnionQuestionPost(req.user.id, req.body);
				return post;
			} else {
				post = await UserService.addClubQuestionPost(
					req.user.id,
					belong,
					req.body
				);
				return post;
			}
		}
		// 이벤트 게시판
		else if (board === "event") {
			post = await UnionService.addEventPost(req.user.id, req.body);
			return post;
		}
		// 월별 활동 게시판
		else if (board === "monthlyKeyum") {
			post = await UnionService.addEventPost(req.user.id, req.body);
			return post;
		}
		// 청원 게시판
		else if (board === "petition") {
			post = await UnionService.addEventPost(req.user.id, req.body);
			return post;
		}
		//자유게시판
		else if (board === "free") {
			post = await UserService.addFreePost(req.user.id, req.body);
		}
	} catch (err) {
		next(err);
	}
};

// 게시물 보여주기
module.exports.showPost = async (req, res, next) => {
	try {
		const post = await PageService.showPost(req.params.postId);
		return post;
	} catch (err) {
		next(err);
	}
};

// 게시물 수정하기
module.exports.editPost = async (req, res, next) => {
	try {
		const post = await UserService.editPost(req.params.postId, req.body);
		return post;
	} catch (err) {
		next(err);
	}
};

// 게시물 삭제하기
module.exports.removePost = async (req, res, next) => {
	let post;
	try {
		post = await UserService.removePost(req.user.id, req.params.postId);
		return post;
	} catch (err) {
		if (err.name === "NoPermissionError") {
			try {
				if (Permission.isClubManager) {
					post = await ClubService.removePostInClub(
						req.user.id,
						req.params.postId
					);
				} else {
					post = await UnionService.removeOtherPost(req.params.postId);
				}
				return post;
			} catch (error) {
				next(error);
			}
		} else {
			next(err);
		}
	}
};
