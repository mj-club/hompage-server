const { UserService, ClubService, UnionService } = require("../services");

// 댓글 등록
module.exports.addComment = async (req, res, next) => {
	try {
		const comment = await UserService.addComment(
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
module.exports.editComment = async (req, res, next) => {
	try {
		const comment = await UserService.editComment(
			req.params.commentId,
			req.body
		);
		res.json(comment);
	} catch (err) {
		next(err);
	}
};

// 댓글 삭제하기
module.exports.removeComment = async (req, res, next) => {
	let comment;
	try {
		comment = await UserService.removeComment(req.params.commentId);
		return comment;
	} catch (err) {
		if (err.name === "NoPermissionError") {
			try {
				if (Permission.isClubManager(req.user.id)) {
					comment = await ClubService.removeCommentInClub(
						req.user.id,
						req.params.commentId
					);
				} else {
					comment = await UnionService.removeOtherComment(req.params.commentId);
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
