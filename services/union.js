const { json } = require("sequelize/types");
const { Union, UnionInfo } = require("../models");

// 총동연 정보 추가하기
module.exports.addUnionInfo = async (formData) => {
	// n대 총동연 정보 존재여부 탐색
	const unionInfo = await UnionInfo.findByPk(1);

	if (unionInfo) {
		const err = new Error();
		err.message = "이미 등록된 총동연입니다.";
		err.status = 412;
		throw err;
	}

	// 추가
	const addUnion = await UnionInfo.create({
		name: formData.name,
		slogan: formData.slogan,
		introduction: formData.introduction,
		representative: formData.representative,
		deputy_representative: formData.deputy_representative,
		organization_chart: formData.organization_chart,
		logo: formData.logo,
		th: formData.th,
	});

	return addUnion;
};

// 총동연 정보 불러오기
module.exports.getUnionInfo = async (unionName) => {
	// 총동아리연합회 정보 불러오기
	const union = await Union.findByPk(1, {
		include: {
			include: [{ model: UnionInfo, where: { name: unionName } }],
		},
	});

	if (!union) {
		const err = new Error();
		err.message = "db에 관련 정보가 없습니다.";
		err.status = 500;
		throw err;
	}

	return union;
};

// 총동연 정보 수정하기
module.exports.editUnionInfo = async (unionName) => {
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
	// 동아리 존재 여부 확인
	const club = await Club.findOne({
		where: { name: formData.clubName },
	});

	if (club) {
		const err = new Error();
		err.message = "이미 존재하는 동아리입니다.";
		err.status = 412;
		throw err;
	}

	// 추가
	const addClub = await Club.create({
		short_introduce: formData.short_introduce,
		long_introduce: formData.long_introduce,
		recruit: formData.recruit,
		meeting: formData.meeting,
		contact: formData.contact,
		location: formData.location,
		department: formData.department,
	});
	return addClub;
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

	// 삭제
	const delClub = await club.destroy();
	return delClub;
};

// 공지사항 게시물 등록하기
module.exports.addAnnouncementPost = () => {};

// 이벤트 게시물 등록하기
module.exports.addEventPost = () => {};

// 월별활동 게시물 등록하기
module.exports.addMonthlyKeyumPost = () => {};

// 부적절한 게시물 삭제
module.exports.removeOtherPost = () => {};

// 부적절한 댓글 삭제
module.exports.removeOtherComment = () => {};
