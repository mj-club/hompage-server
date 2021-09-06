const { Club, ClubInfo, Member, Manager, Post, Comment, User, StudentInfo } = require("../models");
const { NoPermissionError, NoSuchDataError } = require("../utils/handleError");

// 동아리 정보 불러오기
module.exports.getClubInfo = async (clubName) => {

	// 동아리 정보 불러오기
	let club = await Club.findOne({
		where: { name: clubName },
		include: [ClubInfo]
	});

	if (!club) {
		const err = NoSuchDataError("존재하지 않는 동아리 정보입니다.");
		throw err;
	}

	return club;
};

// 동아리 정보 수정하기
module.exports.editClubInfo = async (clubId, formData) => {

	// 동아리 정보 불러오기
	let club = await ClubInfo.findOne({
		where: { id: clubId },
	});

	if (!club) {
		const err = NoSuchDataError("존재하지 않는 동아리 정보입니다.");
		throw err;
	}

	// 수정
	await club.update({
		short_introduce: formData.short_introduce,
		long_introduce: formData.long_introduce,
		recruit: formData.recruit,
		meeting: formData.meeting,
		contact: formData.contact,
		location: formData.location,
		department: formData.department,
	});
	return club;
};

// 동아리원 추가
module.exports.addMember = async (clubId, formData) => {

	// 동아리원 추가
	const userInfo = await StudentInfo.findOne({
		where: { student_id: formData.student_id }
	})

	if (!userInfo) {
		const err = NoSuchDataError("존재하지 않는 계정 정보입니다.");
		throw err;
	}

	const user = await User.findOne({
		where: { id: userInfo.user_id}
	});

	if (!user) {
		const err = NoSuchDataError("존재하지 않는 계정 정보입니다.");
		throw err;
	}

	let club = await Club.findOne({
    where: { id: clubId }
  });

  await club.addUser(user, {
    through: { position: formData.position },
  });
  club = await Club.findOne({
    where: { id: clubId },
    include: User,
  });

	return club;
};

// 동아리원 삭제
module.exports.removeMember = async (clubId, formData) => {

	console.log(clubId);
	console.log(formData.user_id);
	// 동아리원 존재 여부 확인
	let member = await Member.findOne({
		where: { user_id: formData.user_id, club_id: clubId },
	});

	console.log(member);

	if (!member) {
		const err = NoSuchDataError("존재하지 않는 동아리원입니다.");
		throw err;
	}

	// 동아리원 삭제
	await member.destroy();

	return member;
};

// 모든 동아리원 불러오기
module.exports.getAllMember = async (clubId) => {
	console.log(clubId);
	// 동아리 존재 여부 확인
	// const club = await Club.findOne({
	// 	where: { id: clubId },
	// });
	// console.log(club);

	// if (!club) {
	// 	const err = NoSuchDataError("존재하지 않는 동아리입니다.");
	// 	throw err;
	// }

	// 동아리원 불러오기
	// const members = await club.getMembers();
	const members = await Member.findAll({
		where: { club_id: clubId }
	});
	console.log(members);

	if (!members) {
		const err = NoSuchDataError("존재하지 않는 동아리원입니다.");
		throw err;
	}

	return members;
};

// 공지사항 게시물 등록하기
module.exports.addAnnouncementPost = async (userId, formData) => {
	let { title, thumbnail, content, files } = formData;
	let user, board, post;

	const init = () => {
		User.findByPk(userId).then((obj) => (user = obj));
		Manager.findOne({ where: { user_id: userId } }).then((manager) => {
			Board.findOne({
				where: { name: "announcement", club_id: manager.club_id },
			}).then((obj) => (board = obj));
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

// 추가 설정 필요
// 동아리 게시판 내 게시물 삭제
module.exports.removePostInClub = async (userId, postId) => {
	let post, clubIdByManager, clubIdByBoard;

	//init
	const init = () => {
		Post.findByPk(postId)
			.then((obj) => (post = obj))
			.then(() => {
				post.getBoard().then((board) => (clubIdByBoard = board.club_id));
			});
		Manager.findOne({ where: { user_id: userId } }).then(
			(manager) => (clubIdByManager = manager.club_id)
		);
	};

	//check
	const check = () => {
		if (clubIdByBoard === clubIdByManager) {
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

// 추가 설정 필요
// 동아리 게시물 내 댓글 삭제
module.exports.removeCommentInClub = async (userId, commentId) => {
	let comment, clubIdByManager, clubIdByBoard;

	const init = () => {
		Comment.findByPk(commentId)
			.then((obj) => (comment = obj))
			.then(() => {
				comment
					.getPost()
					.getBoard()
					.then((board) => (clubIdByBoard = board.club_id));
			});
		Manager.findOne({ where: { user_id: userId } }).then(
			(manager) => (clubIdByManager = manager.club_id)
		);
	};
	const check = () => {
		if (clubIdByBoard === clubIdByManager) {
			return true;
		} else {
			const err = NoPermissionError(
				"해당 댓글을 삭제할 수 있는 관리자 계정이 아닙니다."
			);
			throw err;
		}
	};
	const execute = async () => {
		await comment.destroy();
	};
	return true;
};
