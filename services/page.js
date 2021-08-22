const { Board, Post, Club, Union } = require("../models");
const { NoSuchDataError } = require("../utils/handleError");

// 게시판별 게시물 보여주기
module.exports.showBoard = async (belongName, boardName) => {
	let belong, board, posts;
	if (belongName !== "union") {
		belong = await Club.findOne({ where: { name: belong } });
	} else {
		belong = await Union.findByPk(1);
	}
	if (!belong) {
		const err = NoSuchDataError("이름에 해당하는 동아리를 찾을 수 없습니다.");
		throw err;
	}
	board = await belong.getBoards({
		where: {
			name: boardName,
		},
	});
	if (!board) {
		const err = NoSuchDataError("이름에 해당하는 게시판을 찾을 수 없습니다.");
		throw err;
	}
	posts = await board[0].getPosts({
		attributes: [
			"id",
			"title",
			"thumbnail",
			"set_top",
			"visit_count",
			"comment_count",
			"thumb_count",
		],
		order: [["created_at", "DESC"]],
	});
	return posts;
};

// 특정 게시물 보여주기
module.exports.showPost = async (postId) => {
	const post = Post.findByPk(postId, {
		include: [Comment, File, { model: User, attributes: ["name"] }],
	});
	if (!post) {
		const err = NoSuchDataError("해당 게시물을 찾을 수 없습니다.");
		throw err;
	}

	let visit_count = parseInt(post.visit_count) + 1;
	post = await post.update({ visit_count });
	return post;
};

// 모든 게시판에서 키워드로 검색하기
module.exports.searchAll = () => {};

// 특정 게시판에서 키워드로 검색하기
module.exports.searchByBoard = () => {};
