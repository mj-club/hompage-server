const Sequelize = require('sequelize');

module.exports = class RentalApply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: { // 대여 공간 및 물품명
          type: Sequelize.STRING(45),
          allowNull: false
        },
        rental_date: { // 대여일
          type: Sequelize.DATE,
          allowNull: false
        },
        start: { // 대여 시작일
          type: Sequelize.DATE,
          allowNull: false
        },
        end: { // 대여 종료일
          type: Sequelize.DATE,
          allowNull: false
        },
        rental_time: { // 대여 시간 (단위: 분)
          type: Sequelize.INTEGER,
          allowNull: false
        },
        rep_member_name: { // 대표자명
          type: Sequelize.STRING(45),
          allowNull: false
        },
        member_count: { // 대여 인원 (대표자포함)
          type: Sequelize.INTEGER,
          allowNull: false
        },
        apply_state: { // 대여 승인 여부 (1:승인. 0:반려)
          type: Sequelize.INTEGER,
          allowNull: false
        },
      }, {
        sequelize,
        modelName: "RentalApply",
        tableName: 'rental_apply',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // RentalApply - RentalInfo (n:1)
    db.RentalApply.belongsTo(db.RentalInfo, {
      foreignKey: "rental_info_id",
      targetKey: "id",
    });
  }
};