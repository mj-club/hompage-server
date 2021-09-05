const {
	UserService,
	PageService,
	UnionService,
	ClubService,
} = require("../services");
const { Permission } = require("../utils");

// 게시물 등록
module.exports.addPost = (res, req, next) => {
	try {
		const { belong, board } = req.params;
		let post;

		// 공지사항 게시판
		if (board === "announcement") {
			if (belong === "unioin") {
				post = UnionService.addAnnouncementPost(req.user.id, req.body);
				return post;
			} else {
				post = ClubService.addAnnouncementPost(req.user.id, req.body);
				return post;
			}
		}
		// 문의사항 게시판
		else if (board === "question") {
			if (belong === "unioin") {
				post = UserService.addUnionQuestionPost(req.user.id, req.body);
				return post;
			} else {
				post = UserService.addClubQuestionPost(req.user.id, belong, req.body);
				return post;
			}
		}
		// 이벤트 게시판
		else if (board === "event") {
			post = UnionService.addEventPost(req.user.id, req.body);
			return post;
		}
		// 월별 활동 게시판
		else if (board === "monthlyKeyum") {
			post = UnionService.addEventPost(req.user.id, req.body);
			return post;
		}
		// 청원 게시판
		else if (board === "petition") {
			post = UnionService.addEventPost(req.user.id, req.body);
			return post;
		}
		//자유게시판
		else if (board === "free") {
			post = UserService.addFreePost(req.user.id, req.body);
		}
	} catch (err) {
		next(err);
	}
};

// 게시물 보여주기
module.exports.showPost = (res, req, next) => {
	try {
		const post = PageService.showPost(req.params.postId);
		return post;
	} catch (err) {
		next(err);
	}
};

// 게시물 수정하기
module.exports.editPost = (res, req, next) => {
	try {
		const post = UserService.editPost(req.params.postId, req.body);
		return post;
	} catch (err) {
		next(err);
	}
};

// 게시물 삭제하기
module.exports.removePost = (res, req, next) => {
	let post;
	try {
		post = UserService.removePost(req.user.id, req.params.postId);
		return post;
	} catch (err) {
		if (err.name === "NoPermissionError") {
			try {
				if (Permission.isClubManager) {
					post = ClubService.removePostInClub(req.user.id, req.params.postId);
				} else {
					post = UnionService.removeOtherPost(req.params.postId);
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
