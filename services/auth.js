// npm
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// custom modules
const { User, StudentInfo, Token } = require("../models");
const { ExistUserError, NoSuchDataError } = require("../utils/handleError");
const passport = require("../passport");
const nodemailer = require("nodemailer");
const { Op } = (Sequelize = require("sequelize"));

// 중복확인 함수
const checkDuplication = (key, value) => {
	const keyword = {
		email: "이메일",
		ph_number: "핸드폰 번호",
		student_id: "학번",
	};

	if (key !== "student_id")
		isDuplicate = User.findOne({ where: { [key]: value } })
			.then((data) => {
				if (data) {
					return ExistUserError(`이미 가입된 ${keyword[key]}입니다.`);
				}
			})
			.catch((err) => err);
	else {
		isDuplicate = StudentInfo.findOne({ where: { [key]: value } })
			.then((data) => {
				if (data) {
					return ExistUserError(`이미 가입된 ${keyword[key]}입니다.`);
				}
			})
			.catch((err) => err);
	}
	return true;
};

// 가입된 정보인지 확인
const checkExistUser = (email, ph_number, student_id = undefined) => {
	let state = false;
	// 이메일 확인
	state = checkDuplication("email", email);

	// 전화번호 확인
	state = checkDuplication("ph_number", ph_number);

	// 학번 확인
	if (student_id) {
		state = checkDuplication("student_id", student_id);
	}
	return state;
};

// module.exports
// 회원가입
module.exports.join = async (formData) => {
	let exUser;

	// 중복 가입 확인
	await checkExistUser(
		formData.email,
		formData.ph_number,
		formData.student_id ? formData.student_id : undefined
	);
	const hash = await bcrypt.hash(formData.password, 12);
	let user = await User.create({
		email: formData.email,
		name: formData.name,
		password: hash,
		ph_number: formData.ph_number,
	});
	// console.log(user);
	if (formData.student_id) {
		const studentInfo = await StudentInfo.create({
			department: formData.department,
			major: formData.major,
			school_year: formData.school_year,
			student_id: formData.student_id,
		});
		// console.log(studentInfo);
		user = await user.setStudentInfo(studentInfo);
	}
	console.log(user);
	return user;
};

// 이메일 중복 확인
module.exports.checkDuplication = checkDuplication;

// 이메일 찾기
module.exports.findEmail = async (formData) => {
	const { name, ph_number } = formData;

	const email = await User.findOne({
		attributes: ["email"],
		where: { name, ph_number },
	});

	if (email) {
		return email;
	} else {
		const err = NoSuchDataError("해당 정보로 가입된 계정이 없습니다.");
		throw err;
	}
};

// 토큰 요청
module.exports.sendTokenToMail = async (formData) => {
	console.log("formData = " , formData);
	const user = await User.findOne({
		where: {
			email: formData.email,
			name: formData.name,
			ph_number: formData.ph_number,
		}
	});
	console.log("user = ", user);
	// user가 없을 경우
	if (!user) {
		const err = NoSuchDataError("해당 정보로 가입된 계정이 없습니다.");
		throw err;
	}

	const val = crypto.randomBytes(20).toString("hex"); // token 생성
	console.log("val = ", val);
	const data = {
		// 데이터 정리
		token: val,
		user_id: user.id,
		ttl: 5000, // ttl 값 설정 (5분)
	};
	console.log("data = ", data);
	const token = await Token.create(data);
	console.log("token = ", token);
	// nodemailer Transport 생성
	// email example: dsfsa@naver.com
	const transporter = nodemailer.createTransport({
		service: "gmail",
		port: 465,
		// port: "587",
		secure: true, // true for 465, false for other ports
		auth: {
			// 이메일을 보낼 계정 데이터 입력
			user: process.env.MAILER_MAIL,
			pass: process.env.MAILER_PW,
		},
	});
	console.log("transporter= ", transporter);
	const resetPWLink =
		process.env.NODE_ENV === "production"
			? `http://13.209.214.244:8080/resetPW/${token}`
			: `<a href="http://localhost:3001/resetPW/${token}">http://localhost/resetPW</a>`;
	console.log("resetPWLink = ", resetPWLink);
	const emailOptions = {
		// 옵션값 설정
		from: "명지대학교 인문캠퍼스 총동아리연합회",
		to: user.email,
		subject: "비밀번호 초기화 이메일입니다.",
		html:
			"비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요." + resetPWLink,
	};
	console.log("emailOptions = ", emailOptions);
	transporter
		.sendMail(emailOptions)
		.then((info) => {
			return info;
		})
		.catch((err) => {
			throw err;
		}); //전송
	// 데이터베이스 Auth 테이블에 데이터 입력
};

// 비밀번호 재설정
module.exports.resetPW = async (token, newPassword) => {
	console.log("token = ", token);
	console.log("newPassword = ", newPassword);
	const auth = await Token.findOne({
		where: {
			token,
			created_at: {
				[Op.gt]: new Date(new Date() - 5 * 60 * 1000),
			},
		},
	});
	console.log("auth = ", auth);
	if (!auth) {
		const err = NoSuchDataError("유효한 토큰값이 아닙니다.");
		throw err;
	}
	const user = await User.findByPk(auth.user_id);
	console.log("user = ", user);
	const hash = await bcrypt.hash(newPassword, 12);
	console.log("hash = ", hash);
	await user.update({
		password: hash,
	});
	return true;
};

// 회원 탈퇴  
module.exports.quit = async (id) => {
	await StudentInfo.destroy({ where: { user_id: id }});
	const user = await User.destroy({ where: { id } });
	
	return user;
};
