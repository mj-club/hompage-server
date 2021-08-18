const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { // 제목
          type: Sequelize.STRING(100),
          allowNull: false
        },
        thumbnail: { // 게시물 목록에서의 미리보기 (내용일부)
          type: Sequelize.STRING(250),
          allowNull: true
        },
        content: { // 내용
          type: Sequelize.TEXT,
          allowNull: true
        },
        set_top: { // 상단 고정 여부 (true: 상단고정, false: 고정하지않음)
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        visit_count: { // 조회수
          type: Sequelize.INTEGER,
          allowNull: true
        },
        comment_count: { // 댓글수
          type: Sequelize.INTEGER,
          allowNull: true
        },
        thumb_count: { // 좋아요수
          type: Sequelize.INTEGER,
          allowNull: true
        },
      }, {
        sequelize,
        modelName: "post",
        tableName: 'posts',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // Post - Board (n:1)
    db.Post.belongsTo(db.Board, {
      foreignKey: "board_id",
      targetKey: "id",
    });

    // Post - File (1:n)
    db.Post.hasMany(db.File, {
      foreignKey: "post_id",
      sourceKey: "id",
    });

    // Post - Comment (1:n)
    db.Post.hasMany(db.Comment, {
      foreignKey: "post_id",
      sourceKey: "id",
    });

    // Post - EventInfo (1:n)
    db.Post.hasMany(db.EventInfo, {
      foreignKey: "post_id",
      sourceKey: "id",
    });

    // Post - User (n:1)
    db.Post.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });
  }
};