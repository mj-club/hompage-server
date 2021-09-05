const { UserService, ClubService, UnionService } = require("../services");

// 댓글 등록
module.exports.addComment = (res, req, next) => {
	try {
		const comment = UserService.addComment(
			req.user.id,
			req.params.postId,
			req.body
		);
		res.json(comment);
	} catch (err) {
		next(err);
	}
};

// 댓글 수정하기
module.exports.editComment = (res, req, next) => {
	try {
		const comment = UserService.editComment(req.params.commentId, req.body);
		res.json(comment);
	} catch (err) {
		next(err);
	}
};

// 댓글 삭제하기
module.exports.removeComment = (res, req, next) => {
	let comment;
	try {
		comment = UserService.removeComment(req.params.commentId);
		return comment;
	} catch (err) {
		if (err.name === "NoPermissionError") {
			try {
				if (Permission.isClubManager(req.user.id)) {
					comment = ClubService.removeCommentInClub(
						req.user.id,
						req.params.commentId
					);
				} else {
					comment = UnionService.removeOtherComment(req.params.commentId);
				}
				return comment;
			} catch (error) {
				next(error);
			}
		} else {
			next(err);
		}
	}
};
