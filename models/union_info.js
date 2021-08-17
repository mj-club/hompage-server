const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('union_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    slogan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    representative: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    deputy_representative: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    organization_chart: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    th: {
      type: DataTypes.INTEGER,
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
    union_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'union',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'union_info',
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
        name: "fk_union_info_union1_idx",
        using: "BTREE",
        fields: [
          { name: "union_id" },
        ]
      },
    ]
  });
};
