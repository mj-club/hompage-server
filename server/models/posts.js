const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    set_top: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    visit_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    thumb_count: {
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
    writer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'club_info',
        key: 'id'
      }
    },
    union_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'union_info',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'posts',
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
        name: "writer_id",
        using: "BTREE",
        fields: [
          { name: "writer_id" },
        ]
      },
      {
        name: "club_id",
        using: "BTREE",
        fields: [
          { name: "club_id" },
        ]
      },
      {
        name: "union_id",
        using: "BTREE",
        fields: [
          { name: "union_id" },
        ]
      },
    ]
  });
};
