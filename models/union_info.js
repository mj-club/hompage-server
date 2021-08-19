const Sequelize = require('sequelize');

module.exports = class UnionInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { // 총동연 이름 (ex. 키움)
          type: Sequelize.STRING(45),
          allowNull: false
        },
        slogan: { // 슬로건 (ex. 하나되는 명지)
          type: Sequelize.STRING(100),
          allowNull: true
        },
        introduction: { // 긴 소개 
          type: Sequelize.TEXT,
          allowNull: true
        },
        representative: { // 회장이름
          type: Sequelize.STRING(45),
          allowNull: true
        },
        deputy_representative: { // 부회장이름
          type: Sequelize.STRING(45),
          allowNull: true
        },
        organization_chart: { // 조직도
          type: Sequelize.STRING(200),
          allowNull: true
        },
        logo: { // 로고 사진
          type: Sequelize.STRING(200),
          allowNull: true
        },
        th: { // n대(ex. 13대)
          type: Sequelize.INTEGER,
          allowNull: true
        },
      }, {
        sequelize,
        modelName: "UnionInfo",
        tableName: 'union_info',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
      }
    );
  }
  static associate(db) {
    // UnionInfo - Union (n:1)
    db.UnionInfo.belongsTo(db.Union, {
      foreignKey: "union_id",
      targetKey: "id",
    });
  }
};