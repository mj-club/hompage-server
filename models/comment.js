const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: { // 댓글 내용
          type: Sequelize.TEXT,
          allowNull: false
        },
      }, {
        sequelize,
        modelName: "Comment",
        tableName: 'comments',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // Comment - Post (n:1)
    db.Comment.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });

    // Comment - User (n:1)
    db.Comment.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });
  }
};