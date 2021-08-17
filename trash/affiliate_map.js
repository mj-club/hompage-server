const Sequelize = require("sequelize");

module.exports = class AffiliateMap extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        map_name: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        map_content: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "AffiliateMap",
        tableName: "affiliate_map",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",

      }
    );
  }

  static associate(db) {}
};
