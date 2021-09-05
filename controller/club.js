const ClubService = require("../services/club");

// 동아리 정보 확인
module.exports.getClubInfo = async (res, req, next) => {
	try {
		const club = await ClubService.getClubInfo(req);
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 동아리 정보 수정
module.exports.editClubInfo = async (res, req, next) => {
	try {
		const club = await ClubService.editClubInfo(req);
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 멤버 추가
module.exports.addMember = async (res, req, next) => {
	try {
		const club = await ClubService.addMember(clubName, req);
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 멤버 삭제
module.exports.removeMember = async (res, req, next) => {
	try {
		const club = await ClubService.removeMember(clubName, req.user.id);
		res.json(club);
	} catch (err) {
		next(err);
	}
};

// 모든 멤버 확인
module.exports.getAllMember = async (res, req, next) => {
	try {
		const club = await ClubService.getAllMember(clubName);
		res.json(club);
	} catch (err) {
		next(err);
	}
};
