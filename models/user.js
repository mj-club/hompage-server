const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          // 이메일
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        name: {
          // 이름
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        password: {
          // 패스워드
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        ph_number: {
          // 휴대폰 번호
          type: Sequelize.STRING(45),
          allowNull: false,
        },

        provider: {
          // 카카오 로그인인지 로컬 로그인인지
          type: Sequelize.STRING(45),
          allowNull: false,
          defaultValue: "local",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // User - StudentInfo (1:1)
    db.User.hasOne(db.StudentInfo, {
      foreignKey: "user_id",
      sourceKey: "id",
    });

    // User - Manager (1:1)
    db.User.hasOne(db.Manager, {
      foreignKey: "user_id",
      sourceKey: "id",
    });

    // User - Club (m:n)
    db.User.belongsToMany(db.Club, { through: db.Member });

    // User - Post (1:n)
    db.User.hasMany(db.Post, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });

    // User - Comment (1:n)
    db.User.hasMany(db.Comment, {
      foreignKey: "writer_id",
      sourceKey: "id",
    });

    // User - RentalApply (1:n)
    db.User.hasMany(db.RentalApply, {
      foreignKey: "user_id",
      sourceKey: "id",
    });

    // User - Schedule (1:n)
    db.User.hasMany(db.Schedule, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
};
