const Sequelize = require('sequelize');

module.exports = class Union extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        introduction: {
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
        collate: "utf8mb4_unicon"
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

    // Union - User (1:1)
    db.Union.belongsTo(db.User, {
      foreignKey: "union_id",
      sourceKey: "id",
    });
  }
};