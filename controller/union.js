const { UnionInfo } = require("../models");
const UnionService = require("../services/union");
const { isUnionManager } = require("../utils/permission")

// 총동연 정보 추가
module.exports.addUnionInfo = async (req, res, next) => {
  try {
		const union = await UnionService.addUnionInfo(req.body);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 총동연 정보 확인
module.exports.getUnionInfo = async (req, res, next) => {
  try {
		let union = "";
		
		const unionId = await isUnionManager(req.user.id);
		console.log("unionId= ", unionId);
		if (unionId) {
			union = await UnionService.getUnionInfo(req.params.unionName);
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
module.exports.editUnionInfo = async (req, res, next) => {
  try {
		let union = "";
		
		const unionId = await isUnionManager(req.user.id);
		console.log("unionId= ", unionId);
		if (unionId) {
			union = await UnionService.editUnionInfo(req.params.unionName, req.body);
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
module.exports.removeUnionInfo = async (req, res, next) => {
  try {
		let union = "";
		
		const unionId = await isUnionManager(req.user.id);
		console.log("unionId= ", unionId);
		if (unionId) {
			union = await UnionService.removeUnionInfo(req.params.unionName);
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
module.exports.addClub = async (req, res, next) => {
  try {
		let union = await UnionService.addClub(req.body);
		res.json(union);
	} catch (err) {
		next(err);
	}
};

// 동아리 삭제
module.exports.removeClub = async (req, res, next) => {
  try {
		let union = "";
		const unionId = await isUnionManager(req.user.id);
		if (unionId) {
			union = UnionService.removeClub(req.params.clubName);
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
