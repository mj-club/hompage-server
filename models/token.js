const Sequelize = require("sequelize");

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        token: {
          // 인증 토큰
          type: Sequelize.TEXT,
          allowNull: false,
        },
        user_id: {
          // 인증 대상
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ttl: {
          // 유효 시간
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Token",
        tableName: "tokens",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
};
