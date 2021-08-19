const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        short_introduce: {
          // 한 줄 소개
          type: Sequelize.STRING(250),
          allowNull: true,
        },
        long_introduce: {
          // 소개
          type: Sequelize.TEXT,
          allowNull: true,
        },

        recruit: {
          // 모집안내
          type: Sequelize.TEXT,
          allowNull: true,
        },
        meeting: {
          // 정기 모임
          type: Sequelize.TEXT,
          allowNull: true,
        },
        contact: {
          // 연락처
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        location: {
          // 동아리 위치
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        department: {
          // 동아리 위치
          type: Sequelize.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ClubInfo",
        tableName: "club_info",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // ClubInfo - Club (1:1)
    db.ClubInfo.belongsTo(db.Club, {
      foreignKey: "club_id",
      targetKey: "id",
    });

    // ClubInfo - Join (1:n)
    db.ClubInfo.hasMany(db.Join, {
      foreignKey: "club_info_id",
      sourceKey: "id",
    });
    // ClubInfo - Sns (1:n)
    db.ClubInfo.hasMany(db.Sns, {
      foreignKey: "club_info_id",
      sourceKey: "id",
    });
  }
};
