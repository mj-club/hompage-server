const ClubService = require("../services/club");
const { isClubManager } = require("../utils/permission")

// 동아리 정보 확인
module.exports.getClubInfo = async (res, req, next) => {
	try {
		const club = await ClubService.getClubInfo(req.body);
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 동아리 정보 수정
module.exports.editClubInfo = async (res, req, next) => {
	try {
		const club = await ClubService.editClubInfo(req.body);
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 멤버 추가
module.exports.addMember = async (res, req, next) => {
	try {
		const club;
		const clubId = await isClubManager(req.user.id);
		if (typeof clubId == "number") {
			club = await ClubService.addMember(clubId, req.body);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 멤버 삭제
module.exports.removeMember = async (res, req, next) => {
	try {
		const club;
		const clubId = await isClubManager(req.user.id);
		if (typeof clubId == "number") {
			club = await ClubService.removeMember(clubId, req.body);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 모든 멤버 확인
module.exports.getAllMember = async (res, req, next) => {
	try {
		const club;
		const clubId = await isClubManager(req.user.id);
		if (typeof clubId == "number") {
			club = await ClubService.getAllMember(clubId);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(club);
	} catch (err) {
		next(err);
	}
};
