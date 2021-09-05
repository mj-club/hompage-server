const { AuthService } = require("../services");

// 회원가입
module.exports.join = (res, req, next) => {
	try {
		const user = await AuthService.join(req.body);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

// 로그인
module.exports.login = (req, res, next) => {
	passport.authenticate("local", (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.json(info.message);
		}
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}

			return res.json(user);
		});
	})(req, res, next);
};

// 로그아웃
module.exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.json({ status: "logout" });
};

// 이메일 찾기
module.exports.findEmail = (res, req, next) => {
	try {
		const email = await AuthService.findEmail(req.body);
		res.json(email);
	} catch (err) {
		next(err);
	}
};

// 토큰 요청
module.exports.sendTokenToMail = (res, req, next) => {
	try {
		await AuthService.sendTokenToMail(req.body);
		res.json(true);
	} catch (err) {
		next(err);
	}
};

// 비번 재설정
module.exports.resetPW = (res, req, next) => {
	try {
		const result = await AuthService.resetPW(
			req.params.token,
			req.body.newPassword
		);
		res.json(result);
	} catch (err) {
		next(err);
	}
};

// 회원 탈퇴
module.exports.leave = (res, req, next) => {
	try {
		const result = await AuthService.quit(req.user.id);
		res.json(result);
	} catch (err) {
		next(err);
	}
};

// 계정 권한 확인하기
module.exports.checkPermission = (res, req, next) => {};

// 이메일 중복확인
module.exports.checkEmail = (res, req, next) => {
	try {
		const result = await AuthService.checkDuplication("email", req.body.email);
		res.json(result);
	} catch (err) {
		next(err);
	}
};

// 학번 중복확인
module.exports.checkStudentId = (res, req, next) => {
	try {
		const result = await AuthService.checkDuplication(
			"student_id",
			req.body.student_id
		);
		res.json(result);
	} catch (err) {
		next(err);
	}
};

// 휴대폰번호 중복확인
module.exports.checkPh = (res, req, next) => {
	try {
		const result = await AuthService.checkDuplication(
			"ph_number",
			req.body.ph_number
		);
		res.json(result);
	} catch (err) {
		next(err);
	}
};
