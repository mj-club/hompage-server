"use strict";
require("dotenv").config("../.env");
const bcrypt = require("bcrypt");
const clubSets = require("../data/clubs");

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
	return isClub
		? {
				name,
				created_at: new Date(),
				updated_at: new Date(),
				club_id: id,
		  }
		: {
				name,
				created_at: new Date(),
				updated_at: new Date(),
				union_id: id,
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
		let clubInfoDatas = [];

		await Promise.all(
			clubSets.map(async (club) => {
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

		await queryInterface.bulkInsert("club_auth", clubAuthDatas);
		await queryInterface.bulkInsert("users", userDatas);

		let clubUsers = await queryInterface.sequelize.query(
			`SELECT id, name FROM users;`
		);
		clubUsers = clubUsers[0];
		clubUsers.map((user) => {
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
		await queryInterface.bulkInsert("union", [
			{
				name: "총동아리연합회",
				// introduction: "안녕하세요, 총동아리연합회입니다.",
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);

		let clubs = await queryInterface.sequelize.query(
			`SELECT id, name FROM clubs;`
		);
		clubs = clubs[0];

		clubs.map((club) => {
			let announcementBoard = createBoardObj("announcement", club.id);
			let questionBoard = createBoardObj("question", club.id);
			boardDatas.push(announcementBoard, questionBoard);

			const userId = clubUsers.filter((user) => user.name === club.name)[0].id;
			let managerObj = {
				user_id: userId,
				club_id: club.id,
				created_at: new Date(),
				updated_at: new Date(),
			};
			managerDatas.push(managerObj);

			// 임시
			let clubInfoObj = {
				club_id: club.id,
				short_introduce: "짧은 소개",
				long_introduce: "긴 소개 글",
				recruit: "모집안내",
				meeting: "정기 모임",
				contact: "연락처",
				location: "동아리 위치",
				department: "분과명",
				created_at: new Date(),
				updated_at: new Date(),
			};
			clubInfoDatas.push(clubInfoObj); //임시
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
		await queryInterface.bulkInsert("users", [unionUser]);
		unionUser = await queryInterface.sequelize.query(
			`SELECT id FROM users WHERE name='총동아리연합회';`
		);
		unionUser = unionUser[0][0];
		console.log(unionUser);
		let announcementBoard = createBoardObj("announcement", 1, false);
		let questionBoard = createBoardObj("question", 1, false);
		let eventBoard = createBoardObj("event", 1, false);
		let monthlyKeyumBoard = createBoardObj("monthlyKeyum", 1, false);
		let petitionBoard = createBoardObj("petition", 1, false);
		let freeBoard = createBoardObj("free", 1, false);
		boardDatas.push(
			announcementBoard,
			questionBoard,
			eventBoard,
			monthlyKeyumBoard,
			petitionBoard,
			freeBoard
		);

		let managerObj = {
			user_id: unionUser.id,
			union_id: 1,
			created_at: new Date(),
			updated_at: new Date(),
		};
		managerDatas.push(managerObj);

		console.log("done");
		await queryInterface.bulkInsert("board", boardDatas);
		await queryInterface.bulkInsert("managers", managerDatas);
		await queryInterface.bulkInsert("club_info", clubInfoDatas);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("users", null, {});
		await queryInterface.bulkDelete("clubs", null, {});
		await queryInterface.bulkDelete("club_auth", null, {});
		await queryInterface.bulkDelete("board", null, {});
		await queryInterface.bulkDelete("managers", null, {});
		await queryInterface.bulkDelete("club_info", null, {});
	},
};
