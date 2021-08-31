const { UserService, PageService } = require("../services");

// 게시물 등록
module.exports.addPost = (res, req, next) => {
	try {
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
	try {
		const post = UserService.removePost(req.params.postId);
		return post;
	} catch (err) {
		next(err);
	}
};
