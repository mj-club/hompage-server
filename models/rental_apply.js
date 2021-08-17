const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rental_apply', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rental_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rep_member_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    member_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    apply_state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rental_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rental_info',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'rental_apply',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_rental_apply_rental_info1_idx",
        using: "BTREE",
        fields: [
          { name: "rental_info_id" },
        ]
      },
    ]
  });
};
