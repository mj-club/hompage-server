const UnionService = require("../services/union");
const { isUnionManager } = require("../utils/permission")

// 총동연 정보 추가
module.exports.addUnionInfo = async (res, req, next) => {
  try {
		const union = await UnionService.addUnionInfo(req.body);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 확인
module.exports.getUnionInfo = async (res, req, next) => {
  try {
		const union = "";
		const unionId = await isUnionManager(req.user.id);
		if (typeof unionId == "number") {
			union = await UnionService.getUnionInfo(unionId);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 수정
module.exports.editUnionInfo = async (res, req, next) => {
  try {
		const union = "";
		const unionId = await isUnionManager(req.user.id);
		if (typeof unionId == "number") {
			union = await UnionService.editUnionInfo(unionId);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 삭제
module.exports.removeUnionInfo = async (res, req, next) => {
  try {
		const union = "";
		const unionId = await isUnionManager(req.user.id);
		if (typeof unionId == "number") {
			union = await UnionService.removeUnionInfo(unionId);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 추가
module.exports.addClub = async (res, req, next) => {
  try {
		const union = await UnionService.addClub(req.body);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 삭제
module.exports.removeClub = async (res, req, next) => {
  try {
		const union = "";
		const unionId = await isUnionManager(req.user.id);
		if (typeof unionId == "number") {
			union = UnionService.removeClub(unionId);
		}
		else {
			const err = NoSuchDataError("권한이 없습니다.");
			throw err;
		}
		res.json(union);
	} catch (err) {
		next(err);
	}
};
