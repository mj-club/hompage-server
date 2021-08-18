const Sequelize = require("sequelize");

module.exports = class ClubAuth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ClubAuth",
        tableName: "club_auth",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
};
