const UnionService = require("../services/union");

// 총동연 정보 추가
module.exports.addUnionInfo = (res, req, next) => {
  try {
		const union = UnionService.addUnionInfo(req);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 확인
module.exports.getUnionInfo = (res, req, next) => {
  try {
		const union = UnionService.getUnionInfo(unionName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 수정
module.exports.editUnionInfo = (res, req, next) => {
  try {
		const union = UnionService.editUnionInfo(unionName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 삭제
module.exports.removeUnionInfo = (res, req, next) => {
  try {
		const union = UnionService.removeUnionInfo(unionName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 추가
module.exports.addClub = (res, req, next) => {
  try {
		const union = UnionService.addClub(formData);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 삭제
module.exports.removeClub = (res, req, next) => {
  try {
		const union = UnionService.removeClub(clubName);
		res.json(union);
	} catch (err) {
		next(err);
	}
};
