const { User, StudentInfo } = require("../models");

// 회원가입
module.exports.join = async (formData) => {
	try {
		const exUser = await User.findOne({ where: { email } });
		if (exUser) {
			const err = new Error();
			err.message = "ExistUserError";
			return res.redirect("/join?error=exist");
		}
		const hash = await bcrypt.hash(formData.password, 12);
		const user = await User.create({
			email: formData.email,
			name: formData.name,
			password: hash,
			ph_number: formData.ph_number,
		});
		if (formData.student_id) {
			const studentInfo = await StudentInfo.create({
				department: formData.department,
				major: formData.major,
				school_year: formData.school_year,
				student_id: formData.student_id,
			});
			user = user.addStudentInfo(studentInfo);
		}
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// 로그인
module.exports.login = () => {};

// 로그아웃
module.exports.logout = () => {};

// 이메일 찾기
module.exports.findEmail = () => {};

// 토큰 요청
module.exports.sendTokenToMail = () => {};

// 비밀번호 재설정
module.exports.resetPW = () => {};

// 회원 탈퇴
module.exports.quit = () => {};
