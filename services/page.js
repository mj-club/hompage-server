const { Board, Post } = require("../models");

// 게시판별 게시물 보여주기
module.exports.showBoard = () => {};

// 특정 게시판의 게시물 보여주기
module.exports.showPost = () => {};

// 모든 게시판에서 키워드로 검색하기
module.exports.searchAll = (keyword, searchOption, page) => {
  const keyword = keyword;
  const searchOption = searchOption;
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
    
  if (searchOption == "title") { 
    post = await Post.findAll({
      attributes: [
        "id",
        "title",
        "category",
        "thumbnail"
      ],
      where: {
        title: {
          [Op.like]: "%" + keyword + "%",
        },
      },
      include: [{ model: ClubInfo, attributes: ["name"], required: false },
      { model: UnionInfo, attributes: ["name"], required: false }],
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });
    
    event = await EventInfo.findAll({
      attributes: [
        "id",
        "title",
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
  } else if (searchOption == "both") {
    post = await Post.findAll({
      attributes: [
        "id",
        "title",
        "category",
        "thumbnail",
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
      include: { model: Club, attributes: ["name"] },
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });
    
    event = await EventInfo.findAll({
      attributes: [
        "id",
        "title",
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
    console.log("event >> ", event);
  } else if (searchOption == "writer") {
    const user = await User.findOne({
      where: { name: keyword },
    });
    post = await Post.findAll({
      attributes: [
        "id",
        "title",
        "category",
        "thumbnail",
      ],
      where: { id: user.id, club_id: clubId, category: categoryName },
      include: { model: User, attributes: ["name"] },
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: limit,
    });
  }
  data.push({data_type: "post", data_list: post});
  data.push({data_type: "event", data_list: event});
  res.json(data);
};

// 특정 게시판에서 키워드로 검색하기
module.exports.searchByBoard = () => {};