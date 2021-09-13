const {
	Club,
	Union,
	UnionInfo,
	Post,
	EventInfo,
	ClubInfo,
	File,
} = require("../models");
const utils = require("../utils");

// 총동연 정보 추가하기
module.exports.addUnionInfo = async (formData) => {
	// 추가
	const unionInfo = await UnionInfo.create({
		name: formData.name,
		slogan: formData.slogan,
		introduction: formData.introduction,
		representative: formData.representative,
		deputy_representative: formData.deputy_representative,
		organization_chart: formData.organization_chart,
		logo: formData.logo,
		th: formData.th,
	});
	let union = await Union.findByPk(1);
	if (!union) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 404;
		throw err;
	}

	union = await union.addUnionInfo(unionInfo);

	return union;
};

// 총동연 정보 불러오기
module.exports.getUnionInfo = async (unionName) => {
	// 총동아리연합회 정보 불러오기
	console.log(unionName);
	const union = await Union.findByPk(1, {
		include: [{ model: UnionInfo, where: { name: unionName } }],
	});
	console.log(union);

	if (!union) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return union;
};

// 총동연 정보 수정하기
module.exports.editUnionInfo = async (unionName, formData) => {
	// n대 총동연 존재여부 탐색
	const unionInfo = await UnionInfo.findOne({
		where: { name: unionName },
	});

	if (!unionInfo) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 수정
	const updateUnion = await unionInfo.update({
		name: formData.name,
		slogan: formData.slogan,
		introduction: formData.introduction,
		representative: formData.representative,
		deputy_representative: formData.deputy_representative,
		organization_chart: formData.organization_chart,
		logo: formData.logo,
		th: formData.th,
	});

	return updateUnion;
};

// 총동연 정보 삭제하기
module.exports.removeUnionInfo = async (unionName) => {
	// n대 총동연 존재여부 탐색
	const unionInfo = await UnionInfo.findOne({
		where: { name: unionName },
	});

	if (!unionInfo) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 삭제
	const delUnion = await unionInfo.destroy();

	return delUnion;
};

// 동아리 추가
module.exports.addClub = async (formData) => {
	console.log("formData = ", formData);
	// 동아리 존재 여부 확인
	let club = await Club.findOne({
		where: { name: formData.name },
	});
	console.log("club = ", club);

	if (club) {
		const err = new Error();
		err.message = "이미 존재하는 동아리입니다.";
		err.status = 412;
		throw err;
	}

	// 추가
	const clubInfo = await ClubInfo.create({
		short_introduce: formData.short_introduce,
		long_introduce: formData.long_introduce,
		recruit: formData.recruit,
		meeting: formData.meeting,
		contact: formData.contact,
		location: formData.location,
		department: formData.department,
	});
	console.log("clubInfo= ", clubInfo);

	club = await Club.create({
		name: formData.name,
	});

	console.log("club= ", club);
	await club.setClubInfo(clubInfo);

	return club;
};

// 동아리 삭제
module.exports.removeClub = async (clubName) => {
	// 동아리 존재 여부 확인
	const club = await Club.findOne({
		where: { name: clubName },
	});

	if (!club) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	const clubInfo = await ClubInfo.findOne({
		where: { id: club.id },
	});

	if (!club) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 삭제
	await clubInfo.destroy();
	const delClub = await club.destroy();

	return true;
};

// 공지사항 게시물 등록하기
module.exports.addAnnouncementPost = async (userId, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = async () => {
		await Promise.all([
			User.findByPk(userId).then((obj) => (user = obj)),
			Board.findOne({ where: { name: "announcement", union_id: 1 } }).then(
				(obj) => (board = obj)
			),
		]);
	};

	const create = async () => {
		post = await Post.create({
			title,
			thumbnail,
			content,
			set_top: false,
			visit_count: 0,
			comment_count: 0,
			// 좋아요 수 추후 추가
		});
	};

	const associate = async () => {
		if (files) {
			return Promise.all([
				user.addPost(post),
				board.addPost(post),
				utils.File.upload(post, files),
			]);
		} else {
			console.log("No files");
			return Promise.all([user.addPost(post), board.addPost(post)]);
		}
	};

	const recall = async () => {
		post = await Post.findByPk(post.id, {
			include: [
				{ model: User, attributes: ["name"] },
				{ model: Board, attributes: ["name"] },
			],
		});
		files = await File.findAll({ where: { post_id: post.id } });
		post.File = files;
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 이벤트 게시물 등록하기
module.exports.addEventPost = async (userId, formData) => {
	let {
		title,
		thumbnail,
		content,
		files,
		event_name,
		event_target,
		event_term,
		event_start,
		event_end,
		event_link,
	} = formData;
	let user, board, post, eventInfo;

	const init = async () => {
		await Promise.all([
			User.findByPk(userId).then((obj) => (user = obj)),
			Board.findOne({ where: { name: "event" } }).then((obj) => (board = obj)),
		]);
	};

	const create = async () => {
		await Promise.all([
			Post.create({
				title,
				thumbnail,
				content,
				set_top: false,
				visit_count: 0,
				comment_count: 0,
				// 좋아요 수 추후 추가
			}).then((obj) => (post = obj)),
			EventInfo.create({
				event_name,
				event_target,
				event_term,
				event_start,
				event_end,
				event_link,
			}).then((obj) => (eventInfo = obj)),
		]);
	};

	const associate = () => {
		if (files) {
			return Promise.all([
				user.addPost(post),
				board.addPost(post),
				post.addEventInfo(eventInfo),
				utils.File.upload(post, files),
			]);
		} else {
			console.log("No files");
			return Promise.all([
				user.addPost(post),
				board.addPost(post),
				post.addEventInfo(eventInfo),
			]);
		}
	};

	const recall = async () => {
		post = await Post.findByPk(post.id, {
			include: [
				{ model: User, attributes: ["name"] },
				{ model: Board, attributes: ["name"] },
			],
		});
		files = await File.findAll({ where: { post_id: post.id } });
		post.File = files;
		eventInfo = await EventInfo.findOne({ where: { post_id: post.id } });
		post.EventInfo = eventInfo;
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 월별활동 게시물 등록하기
module.exports.addMonthlyKeyumPost = async (userId, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = async () => {
		await Promise.all([
			User.findByPk(userId).then((obj) => (user = obj)),
			Board.findOne({ where: { name: "monthly_keyum" } }).then(
				(obj) => (board = obj)
			),
		]);
	};

	const create = async () => {
		post = await Post.create({
			title,
			thumbnail,
			content,
			set_top: false,
			visit_count: 0,
			comment_count: 0,
			// 좋아요 수 추후 추가
		});
	};

	const associate = () => {
		if (files) {
			return Promise.all([
				user.addPost(post),
				board.addPost(post),
				utils.File.upload(post, files),
			]);
		} else {
			console.log("No files");
			return Promise.all([user.addPost(post), board.addPost(post)]);
		}
	};

	const recall = async () => {
		post = await Post.findByPk(post.id, {
			include: [
				{ model: User, attributes: ["name"] },
				{ model: Board, attributes: ["name"] },
			],
		});
		files = await File.findAll({ where: { post_id: post.id } });
		post.File = files;
	};

	await init();
	await create();
	await associate();
	await recall();

	return post;
};

// 추가 설정 필요
// 부적절한 게시물 삭제
module.exports.removeOtherPost = async (postId) => {
	let post;

	//init
	post = await Post.findByPk(postId);

	//execute
	await utils.File.delete(post);
	await post.destroy();

	//after
	return post;
};

// 추가 설정 필요
// 부적절한 댓글 삭제
module.exports.removeOtherComment = async (commentId) => {
	let comment;

	comment = await Comment.destroy({ where: { id: commentId } });
	return comment;
};
