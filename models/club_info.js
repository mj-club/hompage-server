const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('club_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    representation: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contact_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    brief_introduction: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recruit: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    meeting: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recruitment: {
      type: DataTypes.TEXT,
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'club_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "club_id" },
        ]
      },
      {
        name: "fk_club_info_club1_idx",
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
    ]
  });
};
