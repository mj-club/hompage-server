"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

// Account Group
const User = require("./user");
const StudentInfo = require("./student_info");
const Member = require("./member");
const Manager = require("./manager");
const ClubAuth = require("./club_auth");
const Token = require("./token");

// Club Group
const Club = require("./club");
const ClubInfo = require("./club_info");
const Join = require("./join");
const Sns = require("./sns");

// Union Group
const Union = require("./union");
const UnionInfo = require("./union_info");

// Board Group
const Board = require("./board");
const Post = require("./post");
const Comment = require("./comment");
const EventInfo = require("./event_info");
const File = require("./file");

// Etc Group
const Schedule = require("./schedule");
const RentalInfo = require("./rental_info");
const RentalApply = require("./rental_apply");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.User = User;
db.StudentInfo = StudentInfo;
db.Member = Member;
db.Manager = Manager;
db.ClubAuth = ClubAuth;
db.Token = Token;
db.Club = Club;
db.ClubInfo = ClubInfo;
db.Join = Join;
db.Sns = Sns;
db.Union = Union;
db.UnionInfo = UnionInfo;
db.Board = Board;
db.Post = Post;
db.Comment = Comment;
db.EventInfo = EventInfo;
db.File = File;
db.Schedule = Schedule;
db.RentalInfo = RentalInfo;
db.RentalApply = RentalApply;

User.init(sequelize);
StudentInfo.init(sequelize);
Member.init(sequelize);
Manager.init(sequelize);
ClubAuth.init(sequelize);
Token.init(sequelize);
Club.init(sequelize);
ClubInfo.init(sequelize);
Join.init(sequelize);
Sns.init(sequelize);
Union.init(sequelize);
UnionInfo.init(sequelize);
Board.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
EventInfo.init(sequelize);
File.init(sequelize);
Schedule.init(sequelize);
RentalInfo.init(sequelize);
RentalApply.init(sequelize);

User.associate(db);
StudentInfo.associate(db);
Manager.associate(db);
Club.associate(db);
ClubInfo.associate(db);
Join.associate(db);
Sns.associate(db);
Union.associate(db);
UnionInfo.associate(db);
Board.associate(db);
Post.associate(db);
Comment.associate(db);
EventInfo.associate(db);
File.associate(db);
Schedule.associate(db);
RentalInfo.associate(db);
RentalApply.associate(db);

module.exports = db;
