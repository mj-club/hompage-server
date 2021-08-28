const { UserService } = require("../services");

// 프로필 확인
module.exports.getProfile = (res, req, next) => {
	try {
		const user = UserService.getProfile(req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 프로필 수정
module.exports.editProfile = (res, req, next) => {
	try {
		const user = UserService.editProfile(req.user.id, req);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 일정 추가
module.exports.addSchedule = (res, req, next) => {};

// 일정 확인
module.exports.getSchedule = (res, req, next) => {};

// 일정 수정
module.exports.editSchedule = (res, req, next) => {};

// 일정 삭제
module.exports.removeSchedule = (res, req, next) => {};

// 일정 모두 불러오기
module.exports.getAllSchedule = (res, req, next) => {};

// 내가 쓴 게시물 모두 불러오기
module.exports.getAllUserPost = (res, req, next) => {};

// 내가 쓴 댓글 모두 불러오기
module.exports.getAllUserComment = (res, req, next) => {};
