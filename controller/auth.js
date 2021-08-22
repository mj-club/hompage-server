const { AuthService } = require("../services");

// 회원가입
module.exports.join = (res, req, next) => {
	try {
		const user = AuthService.join(req.body);
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
