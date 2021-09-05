// custom modules
const {
	User,
	Manager,
	StudentInfo,
	Schedule,
	Club,
	Union,
	UnionInfo,
	Post,
	Board,
	Comment,
} = require("../models");
const {
	ExistUserError,
	NoSuchDataError,
	NoPermissionError,
} = require("../utils/handleError");
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
	const {
		email,
		name,
		password,
		ph_number,
		provider,
		department,
		major,
		school_year,
		student_id,
	} = formData;
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
		email,
		name,
		password,
		ph_number,
		provider,
	});

	const updateStudentInfo = await student.update({
		department,
		major,
		school_year,
		student_id,
	});

	return { updateUser, updateStudentInfo };
};

// 일정 추가하기
module.exports.addSchedule = async (formData, userId) => {
	const { title, description, start, end, all_day_long, provider } = formData;
	const schedule = await Schedule.create({
		title,
		description,
		start,
		end,
		all_day_long,
		provider,
	});

	// 계정 타입확인
	const typeManager = Manager.findOne({
		where: { users_id: userId },
	});

	if (!typeManager) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리 계정
	if (typeManager.club_id) {
		const club = await Club.findOne({
			where: { id: typeManager.club_id },
		});
		await club.addSchedule(schedule);
	}
	// 총동연 계정
	else if (typeManager.union_id) {
		const union = await UnionInfo.findOne({
			where: { id: typeManager.union_id },
		});
		await union.addSchedule(schedule);
	}
	// 개인 계정
	else {
		const user = await User.findOne({
			where: { id: userId },
		});
		await user.addSchedule(schedule);
	}

	return schedule;
};

// 일정 수정하기
module.exports.editSchedule = async (scheduleId, formData) => {
	const { title, description, start, end, all_day_long, provider } = formData;
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
		title,
		description,
		start,
		end,
		all_day_long,
		provider,
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
module.exports.getSchedule = async (date, scheduleId) => {
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

	// 일정 상세 정보 불러오기
	let data = await Schedule.findAll({
		attributes: ["title", "description", "start", "end", "all_day_long"],
		where: {
			id: scheduleId,
			start: {
				[Op.gte]: Date.parse(startDate),
				[Op.lt]: Date.parse(endDate),
			},
		},
		order: [["start", "DESC"]],
	});

	// err
	if (!data) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return data;
};

// 모든 일정 불러오기
// 전체 월별 일정 ( date param 에는 20210101 형식으로 접근)
module.exports.getAllSchedule = async (date, userId) => {
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

	// 개인, 동아리, 총동연 일정 모두 불러오기
	// (개인 계정의 경우 개인 일정만)
	// (관리자 계정의 경우 해당 동아리 및 총동연 일정만)
	let data;
	const typeManager = Manager.findOne({
		where: { users_id: userId },
	});

	// err
	if (!typeManager) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리 계정
	if (typeManager.club_id) {
		// const club = await Club.findOne({
		// 	where: {id: typeManager.club_id}
		// });
		// data = await club.getSchedule();
		data = await Schedule.findAll({
			attributes: ["title", "description", "start", "end", "all_day_long"],
			where: {
				club_id: typeManager.club_id,
				start: {
					[Op.gte]: Date.parse(startDate),
					[Op.lt]: Date.parse(endDate),
				},
			},
			order: [["start", "DESC"]],
		});
	}
	// 총동연 계정
	else if (typeManager.union_id) {
		// const union = await UnionInfo.findOne({
		// 	where: {id: typeManager.union_id}
		// });
		// data = await union.getSchedule();
		data = await Schedule.findAll({
			attributes: ["title", "description", "start", "end", "all_day_long"],
			where: {
				union_id: typeManager.union_id,
				start: {
					[Op.gte]: Date.parse(startDate),
					[Op.lt]: Date.parse(endDate),
				},
			},
			order: [["start", "DESC"]],
		});
	}
	// 개인 계정
	else {
		// const user = await User.findOne({
		// 	where: {id: userId}
		// });
		// data = await user.getSchedule();
		data = await Schedule.findAll({
			attributes: ["title", "description", "start", "end", "all_day_long"],
			where: {
				[Op.or]: [
					{ user_id: userId },
					{ club_id: clubId },
					{ union_id: unionId },
				],
				start: {
					[Op.gte]: Date.parse(startDate),
					[Op.lt]: Date.parse(endDate),
				},
			},
			order: [["start", "DESC"]],
		});
	}

	// err
	if (!data) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return data;
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
			await File.delete(post);
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
module.exports.removePost = async (userId, postId) => {
	let post, user;

	//init
	const init = () => {
		Post.findByPk(postId).then((obj) => (post = obj));
		User.findByPk(userId).then((obj) => (user = obj));
	};

	//check
	const check = async () => {
		if (await user.hasPost(post)) {
			return true;
		} else {
			const err = NoPermissionError(
				"해당 게시물을 삭제할 수 있는 관리자 계정이 아닙니다."
			);
			throw err;
		}
	};
	//execute
	const execute = async () => {
		await File.delete(post);
		await post.destroy();
	};

	await init();
	await check();
	await execute();

	//after
	return true;
};

// 댓글 작성
module.exports.addComment = async (userId, postId, formData) => {
	let { content } = formData;
	let user, post, comment;

	const init = () => {
		User.findByPk(userId).then((obj) => (user = obj));
		Post.findByPk(postId).then((obj) => (post = user));
	};

	const create = () => {
		Comment.create({ content }).then((obj) => (comment = obj));
	};

	const associate = () => {
		comment.addPost(post);
	};

	await init();
	await create();
	await associate();

	return comment;
};

// 댓글 수정
module.exports.editComment = async (commentId, formData) => {
	let { content } = formData;
	let comment;
	// init
	let comment = await Comment.findByPk(commentId);

	// create
	comment = await comment.update({ content });

	return comment;
};

// 댓글 삭제
module.exports.removeComment = async (commentId) => {
	let comment;

	comment = await Comment.destroy({ where: { id: commentId } });
	return comment;
};

// 내가 쓴 게시물 모두 불러오기
module.exports.getAllUserPost = async (userId) => {
	const post = await Post.findAll({
		attributes: ["id", "title", "thumbnail", "board_id"],
		where: { writer_id: userId },
	});

	return post;
};

// 내가 쓴 댓글 모두 불러오기
module.exports.getAllUserComment = async (userId) => {
	const comment = await Comment.findAll({
		attributes: ["id", "content"],
		where: { writer_id: userId },
		include: [
			{
				model: Post,
				attributes: ["id", "title", "thumbnail", "board_id"],
				required: false,
			},
		],
	});

	return comment;

	// 댓글로 게시물을 불러올경우
	// const post = await Post.findOne({
	// 	where: { post_id: comment.post_id }
	// });
};
