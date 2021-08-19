const Sequelize = require("sequelize");

module.exports = class Manager extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        modelName: "Manager",
        tableName: "managers",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Manager - User (1:1)
    db.Manager.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });

    // Manager - Club (1:1)
    db.Manager.belongsTo(db.Club, {
      foreignKey: "club_id",
      targetKey: "id",
    });

    // Manager - Union (1:1)
    db.Manager.belongsTo(db.Union, {
      foreignKey: "union_id",
      targetKey: "id",
    });
  }
};
