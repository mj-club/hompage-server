const Sequelize = require('sequelize');

module.exports = class Union extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { // 총동아리연합회(default)
          type: Sequelize.STRING(45),
          allowNull: false
        },
        introduction: { // 총동아리연합회 소개(default)
          type: Sequelize.TEXT,
          allowNull: true
        },
      }, {
        sequelize,
        modelName: "Union",
        tableName: 'union',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
      }
    );
  }
  static associate(db) {
    // Union - UnionInfo (1:n)
    db.Union.hasMany(db.UnionInfo, {
      foreignKey: "union_id",
      sourceKey: "id",
    });

    // Union - Board (1:n)
    db.Union.hasMany(db.Board, {
      foreignKey: "union_id",
      sourceKey: "id",
    });

    // Union - Manager (1:1)
    db.Union.hasOne(db.Manager, {
      foreignKey: "union_id",
      sourceKey: "id",
    });
  }
};