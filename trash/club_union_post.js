const Sequelize = require("sequelize");

module.exports = class ClubUnionPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(45), // 공지사항, 문의게시판, 동아리제출서류게시판, 자유게시판, 월별활동
          allowNull: false,
        },
        thumbnail: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        set_top: { // 상단 고정 여부
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        thumb_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        writer: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ClubUnionPost",
        tableName: "club_union_post",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // ClubUnionPost - User (n:1)
    db.ClubUnionPost.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });

    // ClubUnionPost - ClubUnionPostComment (1:n)
    db.ClubUnionPost.hasMany(db.ClubUnionPostComment, {
      foreignKey: "post_id",
      sourceKey: "id",
    });

    // ClubUnionPost - ClubUnionPostFile (1:n)
    db.ClubUnionPost.hasMany(db.ClubUnionPostFile, {
      foreignKey: "post_id",
      sourceKey: "id",
    });
  }
};
