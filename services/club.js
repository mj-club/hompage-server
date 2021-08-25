const { Club, ClubInfo, Member } = require("../models");

// 동아리 정보 불러오기
module.exports.getClubInfo = async (formData) => {
	// 동아리 존재 여부 확인
	const clubId = await Club.findOne({
		attributes: ["id"],
		where: { name: formData.clubName },
	});

	if (!clubId) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리 정보 불러오기
	const club = await ClubInfo.findOne({
		where: { id: clubId },
	});

	if (!club) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return club;
};

// 동아리 정보 수정하기
module.exports.editClubInfo = async (formData) => {
	// 동아리 존재 여부 확인
	const clubId = await Club.findOne({
		attributes: ["id"],
		where: { name: formData.clubName },
	});

	if (!clubId) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리 정보 불러오기
	const club = await ClubInfo.findOne({
		where: { id: clubId },
	});

	if (!club) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
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
module.exports.addMember = async (clubName, formData) => {
	// 동아리 존재 여부 확인
	const clubId = await Club.findOne({
		attributes: ["id"],
		where: { name: clubName },
	});

	if (!clubId) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리 정보 불러오기
	const club = await ClubInfo.findOne({
		where: { id: clubId },
	});

	if (!club) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리원 추가
	const member = await Member.create({
		position: formData.position,
	});
	club.addMember(member);

	return member;
};

// 동아리원 삭제
module.exports.removeMember = async (clubName, userId) => {
	// 동아리 존재 여부 확인
	const clubId = await Club.findOne({
		attributes: ["id"],
		where: { name: clubName },
	});

	if (!clubId) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리원 존재 여부 확인
	const member = await Member.findOne({
		where: { users_id: userId, club_id: clubId },
	});

	if (!member) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	// 동아리원 삭제
	await member.destroy();

	return member;
};

// 모든 동아리원 불러오기
module.exports.getAllMember = async (clubName) => {
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

	// 동아리원 불러오기
	const members = club.getMembers();

	if (!members) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return members;
};

// 공지사항 게시물 등록하기
module.exports.addAnnouncementPost = () => {};

// 동아리 게시판 내 게시물 삭제
module.exports.removePostInClub = () => {};

// 동아리 게시물 내 댓글 삭제
module.exports.removeCommentInClub = () => {};
