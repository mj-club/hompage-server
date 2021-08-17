var DataTypes = require("sequelize").DataTypes;
var _auth = require("./auth");
var _board = require("./board");
var _club = require("./club");
var _club_auth = require("./club_auth");
var _club_info = require("./club_info");
var _club_members = require("./club_members");
var _comments = require("./comments");
var _event_info = require("./event_info");
var _files = require("./files");
var _join = require("./join");
var _managers = require("./managers");
var _members = require("./members");
var _members_copy1 = require("./members_copy1");
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
  var auth = _auth(sequelize, DataTypes);
  var board = _board(sequelize, DataTypes);
  var club = _club(sequelize, DataTypes);
  var club_auth = _club_auth(sequelize, DataTypes);
  var club_info = _club_info(sequelize, DataTypes);
  var club_members = _club_members(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var event_info = _event_info(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var join = _join(sequelize, DataTypes);
  var managers = _managers(sequelize, DataTypes);
  var members = _members(sequelize, DataTypes);
  var members_copy1 = _members_copy1(sequelize, DataTypes);
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
  club_info.belongsToMany(users, { as: 'user_id_users', through: club_members, foreignKey: "club_info_id", otherKey: "user_id" });
  union.belongsToMany(club, { as: 'club_id_clubs', through: board, foreignKey: "union_id", otherKey: "club_id" });
  users.belongsToMany(club, { as: 'club_id_club_members', through: members, foreignKey: "users_id", otherKey: "club_id" });
  users.belongsToMany(club_info, { as: 'club_info_id_club_infos', through: club_members, foreignKey: "user_id", otherKey: "club_info_id" });
  board.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(board, { as: "boards", foreignKey: "club_id"});
  managers.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(managers, { as: "managers", foreignKey: "club_id"});
  members.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(members, { as: "members", foreignKey: "club_id"});
  club_members.belongsTo(club_info, { as: "club_info", foreignKey: "club_info_id"});
  club_info.hasMany(club_members, { as: "club_members", foreignKey: "club_info_id"});
  join.belongsTo(club_info, { as: "club", foreignKey: "club_id"});
  club_info.hasMany(join, { as: "joins", foreignKey: "club_id"});
  posts.belongsTo(club_info, { as: "club", foreignKey: "club_id"});
  club_info.hasMany(posts, { as: "posts", foreignKey: "club_id"});
  schedules.belongsTo(club_info, { as: "club", foreignKey: "club_id"});
  club_info.hasMany(schedules, { as: "schedules", foreignKey: "club_id"});
  sns.belongsTo(club_info, { as: "club", foreignKey: "club_id"});
  club_info.hasMany(sns, { as: "sns", foreignKey: "club_id"});
  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  files.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(files, { as: "files", foreignKey: "post_id"});
  rental_apply.belongsTo(rental_info, { as: "room", foreignKey: "room_id"});
  rental_info.hasMany(rental_apply, { as: "rental_applies", foreignKey: "room_id"});
  board.belongsTo(union, { as: "union", foreignKey: "union_id"});
  union.hasMany(board, { as: "boards", foreignKey: "union_id"});
  managers.belongsTo(union, { as: "union", foreignKey: "union_id"});
  union.hasMany(managers, { as: "managers", foreignKey: "union_id"});
  posts.belongsTo(union_info, { as: "union", foreignKey: "union_id"});
  union_info.hasMany(posts, { as: "posts", foreignKey: "union_id"});
  schedules.belongsTo(union_info, { as: "union", foreignKey: "union_id"});
  union_info.hasMany(schedules, { as: "schedules", foreignKey: "union_id"});
  club_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(club_members, { as: "club_members", foreignKey: "user_id"});
  comments.belongsTo(users, { as: "writer", foreignKey: "writer_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "writer_id"});
  event_info.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(event_info, { as: "event_infos", foreignKey: "user_id"});
  managers.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(managers, { as: "managers", foreignKey: "users_id"});
  members.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(members, { as: "members", foreignKey: "users_id"});
  posts.belongsTo(users, { as: "writer", foreignKey: "writer_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "writer_id"});
  rental_apply.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rental_apply, { as: "rental_applies", foreignKey: "user_id"});
  schedules.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(schedules, { as: "schedules", foreignKey: "user_id"});

  return {
    auth,
    board,
    club,
    club_auth,
    club_info,
    club_members,
    comments,
    event_info,
    files,
    join,
    managers,
    members,
    members_copy1,
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
