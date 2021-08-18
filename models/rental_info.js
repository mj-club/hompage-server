const Sequelize = require('sequelize');

module.exports = class RentalInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: { // 대여 공간 및 물품명
          type: Sequelize.STRING(45),
          allowNull: false
        },
        rental_state: { // 대여 가능 여부 (1:가능. 0:불가)
          type: Sequelize.INTEGER,
          allowNull: false
        },
        room_img: { // 사진
          type: Sequelize.STRING(45),
          allowNull: false
        },
      }, {
        sequelize,
        modelName: "RentalInfo",
        tableName: 'rental_info',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_unicon"
      }
    );
  }
  static associate(db) {
    // RentalInfo - RentalApply (1:n)
    db.RentalInfo.hasMany(db.RentalApply, {
      foreignKey: "rental_info_id",
      sourceKey: "id",
    });
  }
};