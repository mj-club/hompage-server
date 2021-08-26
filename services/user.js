// custom modules
const {
	User,
	StudentInfo,
	Schedule,
	Club,
	Union,
	UnionInfo,
	Post,
	Board,
} = require("../models");
const { ExistUserError, NoSuchDataError } = require("../utils/handleError");
const { File } = require("../utils");
// 프로필 정보 불러오기
module.exports.getProfile = async (id) => {
	const user = await User.findOne({
		where: { id },
	});

	if (!user) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	const student = await StudentInfo.findOne({
		where: { users_id: user.id },
	});

	if (!student) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return { user, student };
};

// 프로필 정보 수정하기
module.exports.editProfile = async (userId, formData) => {
	const user = await User.findOne({
		where: { id: userId },
	});

	if (!user) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	const student = await StudentInfo.findOne({
		where: { users_id: user.id },
	});

	if (!student) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	const updateUser = await user.update({
		email: formData.email,
		name: formData.name,
		password: formData.password,
		ph_number: formData.ph_number,
		provider: formData.provider,
	});

	const updateStudentInfo = await student.update({
		department: formData.department,
		major: formData.major,
		school_year: formData.school_year,
		student_id: formData.student_id,
	});

	return { updateUser, updateStudentInfo };
};

// 일정 추가하기
module.exports.addSchedule = async (userId, formData) => {
	const user = await User.findByPk(userId);

	const schedule = await Schedule.create({
		title: formData.title,
		description: formData.description,
		start: formData.start,
		end: formData.end,
		all_day_long: formData.all_day_long,
		provider: formData.provider,
	});

	return schedule;
};

// 일정 수정하기
module.exports.editSchedule = async (scheduleId, formData) => {
	const schedule = await Schedule.findOne({
		where: { id: scheduleId },
	});

	if (!schedule) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	const schedule = await Schedule.update({
		title: formData.title,
		description: formData.description,
		start: formData.start,
		end: formData.end,
		all_day_long: formData.all_day_long,
		provider: formData.provider,
	});

	return schedule;
};

// 일정 삭제하기
module.exports.removeSchedule = async (scheduleId) => {
	const schedule = await Schedule.findOne({
		where: { id: scheduleId },
	});

	if (!schedule) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	const delSchedule = await schedule.destroy();

	return delSchedule;
};

// 일정 불러오기 (상세)
module.exports.getSchedule = async (date) => {};

// 모든 일정 불러오기
module.exports.getAllSchedule = async (date, userId, unionId) => {
	// 불러올 날짜 조회
	let startDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-01";
	let uptoMonth = parseInt(date.substr(4, 2));
	if (uptoMonth >= 10 && uptoMonth < 12) {
		uptoMonth += 1;
	} else if (uptoMonth == 12) {
		uptoMonth == "01";
	} else {
		uptoMonth += 1;
		uptoMonth.toString();
		uptoMonth = "0" + uptoMonth;
	}
	let endDate = date.substr(0, 4) + "-" + String(uptoMonth) + "-01";
	console.log("조회날짜 >> ", startDate, " ~ ", endDate);

	let data = [];

	// 개인 일정
	const userSchedule = await Schedule.findAll({
		attributes: ["title", "description", "start", "end", "all_day_long"],
		where: {
			user_id: userId,
			start: {
				[Op.gte]: Date.parse(startDate),
				[Op.lt]: Date.parse(endDate),
			},
		},
		order: [["start", "DESC"]],
	});

	// err
	if (!userSchedule) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// data.push({ scheduleType: "userSchedule", scheduleList: userSchedule });

	// // 동아리 일정
	// const user = await User.findByPk(userId, {
	//   include: [{ model: ClubInfo, attributes: ["name"] }],
	// });

	// // err
	// if (!user) {
	//   const err = new Error();
	//   err.message = "db에 관련 정보가 없습니다.";
	//   err.status = 500;
	//   throw err;
	// }

	// try {
	//   await Promise.all(
	//     user.ClubInfos.map(async (club) => {
	//       let userClub = await ClubInfo.findOne({
	//         where: { name: club.name },
	//       });
	//       let clubSchedule = await userClub.getSchedules({
	//         where: {
	//           start: {
	//             [Op.gte]: Date.parse(startDate),
	//             [Op.lt]: Date.parse(endDate),
	//           },
	//         },
	//         order: [["start", "DESC"]],
	//       });
	//       data.push({ scheduleType: club.name, scheduleList: clubSchedule });
	//     })
	//   );

	//   // 총동연 일정
	//   const union = await UnionInfo.findOne({
	//     where: { id: unionId }
	//   });
	//   const unionSchedule = await Schedule.findAll({
	//     attributes: ["title", "description", "start", "end", "all_day_long"],
	//     where: {
	//       union_id: unionId,
	//       start: {
	//         [Op.gte]: Date.parse(startDate),
	//         [Op.lt]: Date.parse(endDate),
	//       },
	//     },
	//     order: [["start", "DESC"]],
	//   });

	//   // err
	//   if (!unionSchedule) {
	//     const err = new Error();
	//     err.message = "db에 관련 정보가 없습니다.";
	//     err.status = 500;
	//     throw err;
	//   }
	//   data.push({ scheduleType: "unionSchedule", scheduleList: unionSchedule });
	// } catch (error) {
	//   res.send(error);
	// }
};

// 자유 게시물 등록하기
module.exports.addFreePost = async (userId, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = () => {
		User.findByPk(userId).then((obj) => (user = obj));
		Board.findOne({ where: { name: "free" } }).then((obj) => (board = obj));
	};

	const create = () => {
		Post.create({
			title,
			thumbnail,
			content,
			set_top: false,
			visit_count: 0,
			comment_count: 0,
			// 좋아요 수 추후 추가
		}).then((obj) => (post = obj));
	};

	const associate = () => {
		post.addUser(user);
		post.addBoard(board);
		if (files) {
			File.upload(post, files);
		}
	};

	const recall = async () => {
		const id = post.id;
		post = await Post.findByPk(id, {
			include: [
				{ model: User, attributes: ["name"], required: false },
				{ model: Board, attributes: ["name"], required: false },
				{ model: File, required: false },
			],
		});
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 다시 작성
// 동아리 문의사항 게시물 등록하기
module.exports.addClubQuestionPost = async (userId, belongName, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = () => {
		User.findByPk(userId).then((obj) => (user = obj));
		Club.findOne({ where: { name: belongName } }).then((clubObj) => {
			Board.findOne({ where: { name: "question", club_id: clubObj.id } }).then(
				(boardObj) => (board = boardObj)
			);
		});
	};

	const create = () => {
		Post.create({
			title,
			thumbnail,
			content,
			set_top: false,
			visit_count: 0,
			comment_count: 0,
			// 좋아요 수 추후 추가
		}).then((obj) => (post = obj));
	};

	const associate = () => {
		post.addUser(user);
		post.addBoard(board);
		if (files) {
			File.upload(post, files);
		}
	};

	const recall = async () => {
		const id = post.id;
		post = await Post.findByPk(id, {
			include: [
				{ model: User, attributes: ["name"], required: false },
				{ model: Board, attributes: ["name"], required: false },
				{ model: File, required: false },
			],
		});
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 총동연 문의사항 게시물 등록하기
module.exports.addUnionQuestionPost = async (userId, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = () => {
		User.findByPk(userId).then((obj) => (user = obj));
		Board.findOne({ where: { name: "question", union_id: 1 } }).then(
			(obj) => (board = obj)
		);
	};

	const create = () => {
		Post.create({
			title,
			thumbnail,
			content,
			set_top: false,
			visit_count: 0,
			comment_count: 0,
			// 좋아요 수 추후 추가
		}).then((obj) => (post = obj));
	};

	const associate = () => {
		post.addUser(user);
		post.addBoard(board);
		if (files) {
			File.upload(post, files);
		}
	};

	const recall = async () => {
		const id = post.id;
		post = await Post.findByPk(id, {
			include: [
				{ model: User, attributes: ["name"], required: false },
				{ model: Board, attributes: ["name"], required: false },
				{ model: File, required: false },
			],
		});
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 청원 게시물 등록하기
module.exports.addPetitionPost = async (userId, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = () => {
		User.findByPk(userId).then((obj) => (user = obj));
		Board.findOne({ where: { name: "petition" } }).then((obj) => (board = obj));
	};

	const create = () => {
		Post.create({
			title,
			thumbnail,
			content,
			set_top: false,
			visit_count: 0,
			comment_count: 0,
			// 좋아요 수 추후 추가
		}).then((obj) => (post = obj));
	};

	const associate = () => {
		post.addUser(user);
		post.addBoard(board);
		if (files) {
			File.upload(post, files);
		}
	};

	const recall = async () => {
		const id = post.id;
		post = await Post.findByPk(id, {
			include: [
				{ model: User, attributes: ["name"], required: false },
				{ model: Board, attributes: ["name"], required: false },
				{ model: File, required: false },
			],
		});
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 게시물 수정하기
module.exports.editPost = (postId, formData) => {
	let { title, thumbnail, content, set_top, files } = formData;
	let post;

	//init
	const init = async () => {
		post = await Post.findByPk(postId);
	};
	//execute
	const execute = () => {
		post.update({
			title,
			thumbnail,
			content,
			set_top: set_top,
		});
		if (await post.hasFiles()) {
			await post.removeFiles();
			if (files) {
				File.upload(post, files);
			}
		}
	};
	//recall
	const recall = async () => {
		const id = post.id;
		post = await Post.findByPk(id, {
			include: [
				{ model: User, attributes: ["name"], required: false },
				{ model: Board, attributes: ["name"], required: false },
				{ model: File, required: false },
			],
		});
	};

	await init();
	await execute();
	await recall();

	return post;
};

// 게시물 삭제하기
module.exports.removePost = () => {
	let post;

	//init
	post = await Post.findByPk(postId);

	//execute
	await post.removeFiles();
	await post.destroy();

	//after
	return post;
};

// 내가 쓴 게시물 모두 불러오기
module.exports.getAllUserPost = () => {};

// 내가 쓴 댓글 모두 불러오기
module.exports.getAllUserComment = () => {};
