const Sequelize = require('sequelize');

module.exports = class EventInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        event_name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        event_target: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        event_term: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        event_start: {
          type: Sequelize.DATE,
          allowNull: false
        },
        event_end: {
          type: Sequelize.DATE,
          allowNull: false
        },
        event_link: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
        event_img: {
          type: Sequelize.STRING(45),
          allowNull: true
        },
      }, {
        sequelize,
        modelName: "EventInfo",
        tableName: 'event_info',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // EventInfo - Post (n:1)
    db.EventInfo.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });
  }
};