const Sequelize = require('sequelize');

module.exports = class File extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        file_type: { // 확장자명
          type: Sequelize.STRING(45),
          allowNull: true
        },
        url: { // 파일 경로
          type: Sequelize.STRING(100),
          allowNull: true
        },
        original_url: { // 파일 전체 경로
          type: Sequelize.STRING(100),
          allowNull: true
        },
        description: { // 파일 설명
          type: Sequelize.TEXT,
          allowNull: true
        },
      }, {
        sequelize,
        modelName: "File",
        tableName: 'files',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // File - Post (n:1)
    db.File.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });
  }
};