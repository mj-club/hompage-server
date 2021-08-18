const Sequelize = require('sequelize');

module.exports = class Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        start: {
          type: Sequelize.DATE,
          allowNull: false
        },
        end: {
          type: Sequelize.DATE,
          allowNull: false
        },
        all_day_long: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
      }, {
        sequelize,
        modelName: "Schedule",
        tableName: 'schedules',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // Schedule - User (n:1)
    db.Schedule.belongsTo(db.User, {
      foreignKey: "writer_id",
      targetKey: "id",
    });
  }
};