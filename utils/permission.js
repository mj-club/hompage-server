const { Manager } = require("../models");

// 권한 확인 - 일반 학생인지, 동아리인지, 총동연인지
module.exports.isManager = () => {};

// 동아리 권한 확인  
module.exports.isClubManager = () => {};

// 총동연 권한 확인  
module.exports.isUnionManager = () => {};

// 계정 타입 확인 - 일반 학생 계정인지, 동아리 계정인지, 총동연 계정인지
module.exports.checkAccountType = () => {};