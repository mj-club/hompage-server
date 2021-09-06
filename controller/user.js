const UserService = require("../services/user");

// 프로필 확인
module.exports.getProfile = async (res, req, next) => {
	try {
		const user = await UserService.getProfile(req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 프로필 수정
module.exports.editProfile = async (res, req, next) => {
	try {
		const user = await UserService.editProfile(req.user.id, req.body);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 일정 추가
module.exports.addSchedule = async (res, req, next) => {
	try {
		const user = await UserService.addSchedule(req.body, req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 일정 확인
module.exports.getSchedule = async (res, req, next) => {
	try {
		const user = await UserService.getSchedule(req.body.date, req.body.scheduleId);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 일정 수정
module.exports.editSchedule = async (res, req, next) => {
	try {
		const user = await UserService.editSchedule(req.body.scheduleId, req.body);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 일정 삭제
module.exports.removeSchedule = async (res, req, next) => {
	try {
		const user = await UserService.removeSchedule(req.body.scheduleId);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 일정 모두 불러오기
module.exports.getAllSchedule = async (res, req, next) => {
	try {
		const user = await UserService.getAllSchedule(req.body.date, req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 내가 쓴 게시물 모두 불러오기
module.exports.getAllUserPost = async (res, req, next) => {
	try {
		const user = await UserService.getAllUserPost(req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 내가 쓴 댓글 모두 불러오기
module.exports.getAllUserComment = async (res, req, next) => {
	try {
		const user = await UserService.getAllUserComment(req.user.id);
		res.json(user);
	} catch (err) {
		next(err);
	}
};
