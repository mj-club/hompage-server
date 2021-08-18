const Sequelize = require("sequelize");

module.exports = class Sns extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sns_type: {
          // Sns 타입 ex> Youtube, Instagram 등등
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        sns_link: {
          // Sns 주소
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Sns",
        tableName: "sns",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Sns - ClubInfo (n:1)
    db.Sns.belongsTo(db.ClubInfo, {
      foreignKey: "club_info_id",
      targetKey: "id",
    });
  }
};
