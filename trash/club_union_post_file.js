const Sequelize = require("sequelize");

module.exports = class ClubUnionPostFile extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        file_name: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        file_dir: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        file_extension: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        file_size: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "ClubUnionPostFile",
        tableName: "club_union_post_file",
        timestamp: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
  static associate(db) {
    // ClubUnionPostFile - ClubUnionPost (n:1)
    db.ClubUnionPostFile.belongsTo(db.ClubUnionPost, {
      foreignKey: "post_id",
      targetKey: "id",
    });
  }
};
