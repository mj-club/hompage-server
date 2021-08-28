const express = require("express");
const router = express.Router();
const {
  Post,
  ClubInfo,
  UnionInfo,
  User,
  EventInfo
} = require("../models");
const { Op } = (Sequelize = require("sequelize"));

// search
// 키워드가 포함되는 게시물 모두 검색 (통합검색) - 페이지당 15개 표시 설정 중
// 최신순으로 정렬해서 보내주고 제목과 썸네일(간략한 내용-미리보기), 카테고리, club_id와 union_id를 포함하여 json 형태로 전달해줍니다.
// (/search/:clubName/:category/:keyword)

// keyword (검색 키워드)
// => 키워드 포함 (키워드로 시작, 끝, 중간에 위치 모두)
// => 작성자 이름으로 검색할 경우 키워드에 작성자 이름 기입

// searchOption (검색 옵션) - body
// => 제목 : title, 제목 + 내용 : both , 작성자 : writer

// fetchCount (페이지수) - body12
// => 검색 페이지 기입

/* 결과 예시
[
  {
      "title": "tomato",
      "category": "questions",
      "thumbnail": "썸네일 ",
      "ClubInfo": null,
      "UnionInfo": {
          "name": "KB 국민 "
      }
  },
  {
      "title": "tomato",
      "category": "questions",
      "thumbnail": "썸네일 ",
      "ClubInfo": {
          "name": "blue"
      },
      "UnionInfo": null
  }
]
*/

router.post("/:keyword", async (req, res, next) => {
  try {
    const keyword = req.params.keyword;
    const searchOption = req.body.searchOption;
    let fetchCount = req.body.page;
    let limit = 15;
    let skip = 0;
    let post;
    let event;
    let clubId = null;
    let data = [];

    console.log("시작");

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
      console.log("post >> ", post);

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
      console.log("event >> ", event);
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
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// search
// 키워드가 포함되는 게시물 모두 검색 (게시판 별) - 페이지당 15개 표시 설정 중
// (/search/:clubName/:category/:keyword)
// (/search/:clubName/announcement/:keyword)
// (/search/:clubName/questions/:keyword)
// (/search/petitions/:keyword)
// (/search/keyum/freeBoard/:keyword)
// (/search/keyum/event/:keyword)
// (/search/keyum/monthly/:keyword)

// keyword (검색 키워드)
// => 키워드 포함 (키워드로 시작, 끝, 중간에 위치 모두)
// => 작성자 이름으로 검색할 경우 키워드에 작성자 이름 기입

// searchOption (검색 옵션) - body
// => 제목 : title, 
// => 제목 + 내용 : both , 작성자 : writer

// fetchCount (페이지수) - body
// => 검색 페이지 기입
router.post("/:clubName/:category/:keyword", async (req, res, next) => {
  try {
    const clubName = req.params.clubName;
    const categoryName = req.params.category;
    const keyword = req.params.keyword;
    const searchOption = req.body.searchOption;
    let fetchCount = req.body.page;
    let limit = 15;
    let skip = 0;
    let post;
    let clubId = null;

    console.log("시작");
    if (fetchCount > 1) {
      skip = limit * (fetchCount - 1);
    }
    if (clubName) {
      const club = await ClubInfo.findOne({
        where: { name: clubName },
      });
      clubId = club.id;
    }
    if (searchOption == "title") {
      post = await Post.findAll({
        attributes: [
          "id",
          "title",
          "thumbnail",
          "content",
          "set_top",
          "visit_count",
          "comment_count",
          "thumb_count",
        ],
        where: {
          title: {
            [Op.like]: "%" + keyword + "%",
          },
          club_id: clubId,
          category: categoryName,
        },
        order: [["created_at", "DESC"]],
        offset: skip,
        limit: limit,
      });
      console.log("post >> ", post);
    } else if (searchOption == "both") {
      post = await Post.findAll({
        attributes: [
          "id",
          "title",
          "thumbnail",
          "content",
          "set_top",
          "visit_count",
          "comment_count",
          "thumb_count",
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
          club_id: club.id,
          category: categoryName,
        },
        order: [["created_at", "DESC"]],
        offset: skip,
        limit: limit,
      });
    } else if (searchOption == "writer") {
      const user = await User.findOne({
        where: { name: keyword },
      });
      post = await Post.findAll({
        attributes: [
          "id",
          "title",
          "thumbnail",
          "content",
          "set_top",
          "visit_count",
          "comment_count",
          "thumb_count",
        ],
        where: { id: user.id, club_id: clubId, category: categoryName },
        include: { model: User, attributes: ["name"] },
        order: [["created_at", "DESC"]],
        offset: skip,
        limit: limit,
      });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// search
// 키워드가 포함되는 게시물 모두 검색 (이벤트 게시판) - 페이지당 15개 표시 설정 중

// keyword (검색 키워드)
// => 키워드 포함 (키워드로 시작, 끝, 중간에 위치 모두)
// => 작성자 이름으로 검색할 경우 키워드에 작성자 이름 기입

// searchOption (검색 옵션) - body
// => 제목 : title, 
// => 제목 + 내용 : both , 작성자 : writer

// fetchCount (페이지수) - body
// => 검색 페이지 기입
router.post("/event/:keyword", async (req, res, next) => {
  try {
    const keyword = req.params.keyword;
    const searchOption = req.body.searchOption;
    let fetchCount = req.body.page;
    let limit = 15;
    let skip = 0;
    let event;

    console.log("시작");
    if (fetchCount > 1) {
      skip = limit * (fetchCount - 1);
    }
    
    if (searchOption == "title") {
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
      console.log("event >> ", event);
    } else if (searchOption == "both") {
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
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
