"use strict";
require("dotenv").config("../.env");
const bcrypt = require("bcrypt");
const clubs = require("../data/clubs");

//난수 생성
function generateRandomCode(n) {
	let str = "";
	for (let i = 0; i < n; i++) {
		str += Math.floor(Math.random() * 10);
	}
	return str;
}

// 게시판 생성
const createBoardObj = (name, id, isClub = true) => {
	return {
		name,
		created_at: new Date(),
		updated_at: new Date(),
		club_id: clubId,
		unionId: unionId,
	};
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		// 비번 설정 어떻게 할까...
		// 비밀번호 난수 생성 -> 비밀번호 EX> clubName + 난수 4자리 -> DB로 확인 불가 -> 비밀번호 직접 설정? -> 코드상에 노출 불가 -> 비밀번호 재설정? -> 유효한 메일이 아님
		// 직접 회원가입하고 총동연 계정으로 권한 레벨 올리기 -> 프론트 UI 추가 필요, 관리자 계정을 갖고 있는 사람은 사용자 계정을 추가로 가질 수 없어, 세습이 안 됨
		// 비밀번호 난수 생성 & hash 암호화X -> 로그인시 암호화 처리 필수
		// 비밀번호 구현 조건:
		// 1. 난수 생성
		// 2. 코드상 노출 X
		// 3. 우리가 확인 가능해야 함
		// DB테이블 하나 더 만들어서 암호화 되지 않은 비번을 추가로 저장
		let userDatas = [];
		let clubAuthDatas = [];
		let clubDatas = [];
		let boardDatas = [];
		let managerDatas = [];

		await Promise.all(
			clubs.map(async (club) => {
				console.log(club.code, club.name);
				const password = club.code + generateRandomCode(4);
				const hash = await bcrypt.hash(password, 12);
				let userObj = {
					email: club.code + "@mjuclub.com",
					name: club.name,
					password: hash,
					ph_number: "01012345678",
					created_at: new Date(),
					// .toISOString()
					// .replace(/T/, " ")
					// .replace(/\..+/, ""),
					updated_at: new Date(),
					// .toISOString()
					// .replace(/T/, " ")
					// .replace(/\..+/, ""),
				};
				let clubAuthObj = {
					email: club.code + "@mjuclub.com",
					password: password,
					created_at: new Date(),
					// .toISOString()
					// .replace(/T/, " ")
					// .replace(/\..+/, ""),
					updated_at: new Date(),
					// .toISOString()
					// .replace(/T/, " ")
					// .replace(/\..+/, ""),
				};

				userDatas.push(userObj);
				clubAuthDatas.push(clubAuthObj);
			})
		);

		queryInterface.bulkInsert("club_auth", clubAuthDatas);
		await queryInterface.bulkInsert("users", userDatas);

		let users = await queryInterface.sequelize.query(
			`SELECT id, name FROM users;`
		);
		users = users[0];
		users.map((user) => {
			let clubObj = {
				name: user.name,
				created_at: new Date(),
				// .toISOString()
				// .replace(/T/, " ")
				// .replace(/\..+/, ""),
				updated_at: new Date(),
				// .toISOString()
				// .replace(/T/, " ")
				// .replace(/\..+/, ""),
			};
			clubDatas.push(clubObj);
		});

		await queryInterface.bulkInsert("clubs", clubDatas);

		let clubs = await queryInterface.sequelize.query(
			`SELECT id, name FROM clubs;`
		);
		clubs = clubs[0];

		clubs.map((club) => {
			let announcementBoard = createBoardObj("announcement", club.id);
			let questionBoard = createBoardObj("question", club.id);
			boardDatas.push(announcementBoard, questionBoard);

			const userId = users.filter((user) => user.name === club.name)[0].id;
			let managerObj = {
				user_id: userId,
				club_id: club.id,
			};
			managerDatas.push(managerObj);
		});

		let unionPassword = await bcrypt.hash(process.env.MAILER_PW, 12);
		let unionUser = {
			email: process.env.MAILER_MAIL,
			name: "총동아리연합회",
			password: unionPassword,
			ph_number: "01012345678",
			created_at: new Date(),
			updated_at: new Date(),
		};
		await queryInterface.bulkInsert("users", unionUser);
		let union = await queryInterface.sequelize.query(
			`SELECT id FROM users WHERE name=총동아리연합회;`
		);
		union = union[0][0];
		let announcementBoard = createBoardObj("announcement", union.id, false);
		let questionBoard = createBoardObj("question", union.id, false);
		let eventBoard = createBoardObj("event", union.id, false);
		let monthlyKeyumBoard = createBoardObj("monthlyKeyum", union.id, false);
		let petitionBoard = createBoardObj("petition", union.id, false);
		boardDatas.push(
			announcementBoard,
			questionBoard,
			eventBoard,
			monthlyKeyumBoard,
			petitionBoard
		);

		let managerObj = {
			user_id: userId,
			union_id: union.id,
		};
		managerDatas.push(managerObj);

		queryInterface.bulkInsert("board", boardDatas);
		queryInterface.bulkInsert("managers", managerDatas);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete("users", null, {});
	},
};
