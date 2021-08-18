const Sequelize = require("sequelize");

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        position: {
          // 동아리 직급
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Member",
        tableName: "members",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
};
