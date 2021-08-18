const Sequelize = require('sequelize');

module.exports = class UnionInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        slogan: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        introduction: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        representative: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        deputy_representative: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        organization_chart: {
          type: Sequelize.STRING(200),
          allowNull: true
        },
        logo: {
          type: Sequelize.STRING(200),
          allowNull: true
        },
        th: {
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
        collate: "utf8mb4_unicon"
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