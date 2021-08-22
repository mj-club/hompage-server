const express = require("express");

// 권한 확인 - 일반 학생인지, 동아리인지, 총동연인지
exports.isManager = async () => {};

// 동아리 권한 확인  
exports.isClubManager = async () => {};

// 총동연 권한 확인  
exports.isUnionManager = async () => {};

// 계정 타입 확인 - 일반 학생 계정인지, 동아리 계정인지, 총동연 계정인지
exports.checkAccountType = async () => {};