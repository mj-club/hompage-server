const { Manager } = require("../models");

// 권한 확인 - 일반 학생인지, 동아리인지, 총동연인지
module.exports.isManager = async (userId) => {
	let res = await Manager.findByPk(userId);
	return res ? true : false;
};

// 동아리 권한 확인
module.exports.isClubManager = async (userId) => {
	let res = await Manager.findByPk(userId);
	return res.club_id ? res.club_id : false;
};

// 총동연 권한 확인
module.exports.isUnionManager = async (userId) => {
	let res = await Manager.findByPk(userId);
	return res.union_id ? true : false;
};

// 계정 타입 확인 - 일반 학생 계정인지, 동아리 계정인지, 총동연 계정인지
module.exports.checkAccountType = (userId, assume) => {
	let user = await Manager.findByPk(userId);

	let accountType;
	if (user) {
		accountType = accountType.club_id ? "club" : "union";
	} else {
		accountType = "user";
	}
	return accountType === assume;
};
