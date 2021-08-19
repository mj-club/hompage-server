const Sequelize = require("sequelize");

module.exports = class StudentInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        department: {
          // 소속 대학 ex> 인문대, ICT융합대
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        major: {
          // 전공
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        school_year: {
          // 학년
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        student_id: {
          // 학번
          type: Sequelize.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "StudentInfo",
        tableName: "student_info",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  static associate(db) {
    // StudentInfo - User (1:1)
    db.StudentInfo.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
  }
};
