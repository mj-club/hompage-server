// 1. post, comment -> services/

// 자유게시판에 포스트를 등록을 해준다면?


// routes/
router("/:clubOrUnion/:board", middleware(), controller());


// controller/
const { Post } = require("../services");
function controller() {
  try {
		Post.add(board, data)
  } catch (e) {}
}


// services/

const { Post, Board } = require("../models");




function add(Board, data) {
  
	1. Board에 따라 권한을 하나한 체크해줘야한다.
	2. data를 저장한다.
}

function edit(Board, data) {
  1. Board에 따라 권한을 하나한 체크해줘야한다.
	2. data를 수정한다.
}


// 2. post, comment -> utils/

// 공지사항게시판에 포스트를 등록을 해준다면?


// routes/
// router("/club/anouncement", middleware(), controller());
router.post("/add/:clubOrUnion/:board", middleware(), controller());


// controller/
const { Club } = require("../services");
function controller() {
	if (club) {

		if(board == "anouncement") {
			try {
				Club.addAnouncement(data)
			} catch (e) {}
		}
	}
  t
}


// services/

const { Post, Permission } = require("../utils");
const {Club} = require("../models")

const isClubManager = Permissioin.isClubManager();


function add(data) {
  
	if(isClubManager) {
		data를 저장한다.
	}else {
		throw err
	}
}

function edit(data) {
	if(isClubManager) {
		data를 저장한다.
	}else {
		throw err
	}
}

// Board 사용하는 경우

const board = await Board.findOne()
return board.getPosts()
