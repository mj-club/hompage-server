const Sequelize = require('sequelize');

module.exports = class EventInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        event_name: { // 이벤트 이름
          type: Sequelize.STRING(45),
          allowNull: false
        },
        event_target: { // 이벤트 대상 
          type: Sequelize.STRING(45),
          allowNull: false
        },
        event_term: { // 이벤트 기간
          type: Sequelize.STRING(45),
          allowNull: true
        },
        event_start: { // 이벤트 시작일 (시간 포함)
          type: Sequelize.DATE,
          allowNull: false
        },
        event_end: { // 이벤트 종료일 (시간 포함)
          type: Sequelize.DATE,
          allowNull: false
        },
        event_link: { // 이벤트 경로 (naver Form, sns 등등)
          type: Sequelize.STRING(45),
          allowNull: true
        },
        event_img: { // 이벤트 관련 사진
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