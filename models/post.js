const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        thumbnail: {
          type: Sequelize.STRING(250),
          allowNull: true
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        set_top: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        visit_count: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        comment_count: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        thumb_count: {
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