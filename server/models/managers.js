const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('managers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    union_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'union',
        key: 'id'
      }
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'club',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'managers',
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
        name: "fk_managers_users1_idx",
        using: "BTREE",
        fields: [
          { name: "users_id" },
        ]
      },
      {
        name: "fk_managers_union1_idx",
        using: "BTREE",
        fields: [
          { name: "union_id" },
        ]
      },
      {
        name: "fk_managers_club1_idx",
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
    ]
  });
};
