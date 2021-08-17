var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _club = require("./club");
var _club_auth = require("./club_auth");
var _club_info = require("./club_info");
var _comments = require("./comments");
var _event_info = require("./event_info");
var _files = require("./files");
var _join = require("./join");
var _members = require("./members");
var _posts = require("./posts");
var _rental_apply = require("./rental_apply");
var _rental_info = require("./rental_info");
var _schedules = require("./schedules");
var _sns = require("./sns");
var _student_info = require("./student_info");
var _tokens = require("./tokens");
var _union = require("./union");
var _union_info = require("./union_info");
var _users = require("./users");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var club = _club(sequelize, DataTypes);
  var club_auth = _club_auth(sequelize, DataTypes);
  var club_info = _club_info(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var event_info = _event_info(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var join = _join(sequelize, DataTypes);
  var members = _members(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var rental_apply = _rental_apply(sequelize, DataTypes);
  var rental_info = _rental_info(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var sns = _sns(sequelize, DataTypes);
  var student_info = _student_info(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var union = _union(sequelize, DataTypes);
  var union_info = _union_info(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  club.belongsToMany(union, { as: 'union_id_unions', through: board, foreignKey: "club_id", otherKey: "union_id" });
  club.belongsToMany(users, { as: 'users_id_users', through: members, foreignKey: "club_id", otherKey: "users_id" });
  union.belongsToMany(club, { as: 'club_id_clubs', through: board, foreignKey: "union_id", otherKey: "club_id" });
  users.belongsToMany(club, { as: 'club_id_club_members', through: members, foreignKey: "users_id", otherKey: "club_id" });
  posts.belongsTo(board, { as: "board", foreignKey: "board_id"});
  board.hasMany(posts, { as: "posts", foreignKey: "board_id"});
  board.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(board, { as: "boards", foreignKey: "club_id"});
  club_info.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(club_info, { as: "club_infos", foreignKey: "club_id"});
  members.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(members, { as: "members", foreignKey: "club_id"});
  join.belongsTo(club_info, { as: "club_info", foreignKey: "club_info_id"});
  club_info.hasMany(join, { as: "joins", foreignKey: "club_info_id"});
  join.belongsTo(club_info, { as: "club", foreignKey: "club_id"});
  club_info.hasMany(join, { as: "club_joins", foreignKey: "club_id"});
  sns.belongsTo(club_info, { as: "club_info", foreignKey: "club_info_id"});
  club_info.hasMany(sns, { as: "sns", foreignKey: "club_info_id"});
  sns.belongsTo(club_info, { as: "club", foreignKey: "club_id"});
  club_info.hasMany(sns, { as: "club_sns", foreignKey: "club_id"});
  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  event_info.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(event_info, { as: "event_infos", foreignKey: "post_id"});
  files.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(files, { as: "files", foreignKey: "post_id"});
  rental_apply.belongsTo(rental_info, { as: "rental_info", foreignKey: "rental_info_id"});
  rental_info.hasMany(rental_apply, { as: "rental_applies", foreignKey: "rental_info_id"});
  users.belongsTo(student_info, { as: "student_info", foreignKey: "student_info_id"});
  student_info.hasMany(users, { as: "users", foreignKey: "student_info_id"});
  board.belongsTo(union, { as: "union", foreignKey: "union_id"});
  union.hasMany(board, { as: "boards", foreignKey: "union_id"});
  union_info.belongsTo(union, { as: "union", foreignKey: "union_id"});
  union.hasMany(union_info, { as: "union_infos", foreignKey: "union_id"});
  comments.belongsTo(users, { as: "writer", foreignKey: "writer_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "writer_id"});
  members.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(members, { as: "members", foreignKey: "users_id"});
  posts.belongsTo(users, { as: "writer", foreignKey: "writer_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "writer_id"});
  schedules.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(schedules, { as: "schedules", foreignKey: "users_id"});

  return {
    board,
    club,
    club_auth,
    club_info,
    comments,
    event_info,
    files,
    join,
    members,
    posts,
    rental_apply,
    rental_info,
    schedules,
    sns,
    student_info,
    tokens,
    union,
    union_info,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
