const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    event_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    event_target: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    event_term: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    event_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    event_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    event_link: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    event_img: {
      type: DataTypes.STRING(45),
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'event_info',
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
        name: "fk_event_info_posts1_idx",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
