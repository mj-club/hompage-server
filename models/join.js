const Sequelize = require("sequelize");

module.exports = class Join extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        join_type: {
          // 가입 방법 ex> 문자지원, 구글 폼 등등
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        join_path: {
          // 가입 경로 ex> 문자지원 -> 전화 번호, 구글 폼 -> 폼 링크
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Join",
        tableName: "join",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // Join - ClubInfo (n:1)
    db.Join.belongsTo(db.ClubInfo, {
      foreignKey: "club_info_id",
      targetKey: "id",
    });
  }
};
