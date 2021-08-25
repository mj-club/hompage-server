const { Board, Post } = require("../models");

// 게시판별 게시물 보여주기
module.exports.showBoard = () => {};

// 특정 게시판의 게시물 보여주기
module.exports.showPost = () => {};

// 모든 게시판에서 키워드로 검색하기
module.exports.searchAll = async (keyword, searchOption, page) => {
  let fetchCount = page;
  let limit = 15;
  let skip = 0;
  let post;
  let event;
  let data = [];
  if (fetchCount > 1) {
    skip = limit * (fetchCount - 1);
  }

  // 제목으로 검색
  if (searchOption == "title") {
    post = await Post.findAll({
      attributes: [
        "title",
        "thumbnail",
        "content",
        "board_id"
      ],
      where: {
        title: {
          [Op.like]: "%" + keyword + "%",
        }
      },
      include: [{ model: Club, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false },
      { model: Board, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!post) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
    
    event = await EventInfo.findAll({ // post와의 관계...?????
      attributes: [
        "event_name",
        "event_target",
        "event_term",
        "event_start",
        "event_end"
      ],
      where: {
        title: {
          [Op.like]: "%" + keyword + "%",
        },
      },
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!event) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  } 
  // 제목 + 내용으로 검색
  else if (searchOption == "both") {
    post = await Post.findAll({
      attributes: [
        "title",
        "thumbnail",
        "content",
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + keyword + "%",
            },
            content: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ]
      },
      include: [{ model: Club, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false },
      { model: Board, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!post) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
    
    event = await EventInfo.findAll({
      attributes: [
        "event_name",
        "event_target",
        "event_term",
        "event_start",
        "event_end"
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + keyword + "%",
            },
            content: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
      },
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!event) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  } 
  // 작성자명으로 검색
  else if (searchOption == "writer") {
    const user = await User.findOne({
      attributes: ["name"],
      where: { name: keyword },
    });
    post = await Post.findAll({
      attributes: [
        "title",
        "thumbnail",
        "content",
      ],
      where: { id: user.id },
      include: [{ model: Club, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false },
      { model: Board, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!post) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  }
  data.push({data_type: "post", data_list: post});
  data.push({data_type: "event", data_list: event});
  res.json(data);
};

// 특정 게시판에서 키워드로 검색하기
module.exports.searchByBoard = async (keyword, searchOption, page, boardName, clubName, unionName) => {
  let fetchCount = page;
  let limit = 15;
  let skip = 0;
  let post;
  let event;
  let clubId = null;
  let data = [];
  if (fetchCount > 1) {
    skip = limit * (fetchCount - 1);
  }

  // 게시판 탐색 및 게시판 id
  const board;
  if (unionName != null) {
    const union = await UnionInfo.findOne({
      where: { name: unionName }
    });

    if (!union) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }

    board = await Board.findOne({
      where: { name: boardName, union_id: union.id }
    });

    if (!board) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  }
  else if (clubName != null) {
    const club = await Club.findOne({
      where: { name: clubName }
    });

    if (!club) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }

    board = await Board.findOne({
      where: { name: boardName, club_id: club.id }
    });

    if (!board) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  }
  const boardID = board.id;

  // 제목으로 검색
  if (searchOption == "title") {
    post = await Post.findAll({
      attributes: [
        "title",
        "thumbnail",
        "content",
      ],
      where: {
        title: {
          [Op.like]: "%" + keyword + "%",
        },
        board_id: boardID
      },
      include: [{ model: Club, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!post) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
    
    event = await EventInfo.findAll({ // post와의 관계...?????
      attributes: [
        "event_name",
        "event_target",
        "event_term",
        "event_start",
        "event_end"
      ],
      where: {
        title: {
          [Op.like]: "%" + keyword + "%",
        },
      },
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!event) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  } 
  // 제목 + 내용으로 검색
  else if (searchOption == "both") {
    post = await Post.findAll({
      attributes: [
        "title",
        "thumbnail",
        "content",
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + keyword + "%",
            },
            content: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
        board_id: boardID
      },
      include: [{ model: Club, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });
    
    if (!post) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }

    event = await EventInfo.findAll({
      attributes: [
        "event_name",
        "event_target",
        "event_term",
        "event_start",
        "event_end"
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + keyword + "%",
            },
            content: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
      },
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });
    
    if (!event) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  } 
  // 작성자명으로 검색
  else if (searchOption == "writer") {
    const user = await User.findOne({
      attributes: ["name"],
      where: { name: keyword },
    });
    post = await Post.findAll({
      attributes: [
        "title",
        "thumbnail",
        "content",
      ],
      where: { id: user.id, board_id: boardID },
      include: [{ model: Club, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });

    if (!post) {
      const err = new Error();
      err.message = "db에 관련 정보가 없습니다.";
      err.status = 500;
      throw err;
    }
  }
  data.push({data_type: "post", data_list: post});
  data.push({data_type: "event", data_list: event});
  res.json(data);
};