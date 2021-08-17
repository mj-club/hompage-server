const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sns', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sns_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sns_link: {
      type: DataTypes.STRING(200),
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
    club_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'club_info',
        key: 'id'
      }
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'club_info',
        key: 'club_id'
      }
    }
  }, {
    sequelize,
    tableName: 'sns',
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
        name: "fk_sns_club_info1_idx",
        using: "BTREE",
        fields: [
          { name: "club_info_id" },
          { name: "club_id" },
        ]
      },
    ]
  });
};
