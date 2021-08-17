const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "email"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ph_number: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    student_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    auth_lv: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    major: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "local"
    },
    sns_id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    accessible_club: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
