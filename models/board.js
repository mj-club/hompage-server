const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
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
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'club',
        key: 'id'
      }
    },
    union_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'union',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "club_id" },
          { name: "union_id" },
        ]
      },
      {
        name: "fk_board_club1_idx",
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
      {
        name: "fk_board_union1_idx",
        using: "BTREE",
        fields: [
          { name: "union_id" },
        ]
      },
    ]
  });
};
