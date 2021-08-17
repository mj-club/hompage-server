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
    thumbnail: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    set_top: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    visit_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    thumb_count: {
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
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'board',
        key: 'id'
      }
    },
    writer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
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
        name: "fk_posts_board1_idx",
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
      {
        name: "fk_posts_users1_idx",
        using: "BTREE",
        fields: [
          { name: "writer_id" },
        ]
      },
    ]
  });
};
