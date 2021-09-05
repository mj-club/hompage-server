const UnionService = require("../services/union");

// 총동연 정보 추가
module.exports.addUnionInfo = async (res, req, next) => {
  try {
		const union = await UnionService.addUnionInfo(req);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 확인
module.exports.getUnionInfo = async (res, req, next) => {
  try {
		const union = await UnionService.getUnionInfo(unionName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 수정
module.exports.editUnionInfo = async (res, req, next) => {
  try {
		const union = await UnionService.editUnionInfo(unionName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 삭제
module.exports.removeUnionInfo = async (res, req, next) => {
  try {
		const union = await UnionService.removeUnionInfo(unionName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 추가
module.exports.addClub = async (res, req, next) => {
  try {
		const union = await UnionService.addClub(formData);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 삭제
module.exports.removeClub = async (res, req, next) => {
  try {
		const union = await UnionService.removeClub(clubName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};
