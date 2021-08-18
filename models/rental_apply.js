const Sequelize = require('sequelize');

module.exports = class RentalApply extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        room_name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        rental_date: {
          type: Sequelize.DATE,
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
        rental_time: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        rep_member_name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        member_count: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        apply_state: {
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