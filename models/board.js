const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { // 게시판 이름 
          type: Sequelize.STRING(45),
          allowNull: false
        },
      }, {
        sequelize,
        modelName: "Board",
        tableName: 'board',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
      }
    );
  }
  static associate(db) {
    // Board - Post (1:n)
    db.Board.hasMany(db.Post, {
      foreignKey: "board_id",
      sourceKey: "id",
    });

    // Board - Club (n:1)
    db.Board.belongsTo(db.Club, {
      foreignKey: "club_id",
      targetKey: "id",
    });

    // Board - Union (n:1)
    db.Board.belongsTo(db.Union, {
      foreignKey: "union_id",
      targetKey: "id",
    });
  }
};

