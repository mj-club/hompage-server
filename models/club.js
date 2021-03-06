const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: {
					// 동아리 명
					type: Sequelize.STRING(45),
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: "Club",
				tableName: "clubs",
				timestamps: true,
				underscored: true,
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_unicode_ci",
			}
		);
	}

	static associate(db) {
		// Club - ClubInfo (1:1)
		db.Club.hasOne(db.ClubInfo, {
			foreignKey: "club_id",
			sourceKey: "id",
		});

		// Club - User (n:m)
		db.Club.belongsToMany(db.User, { through: db.Member });

		// Club - Manager (1:1)
		db.Club.hasOne(db.Manager, {
			foreignKey: "club_id",
			sourceKey: "id",
		});

		// Club - Board (1:n)
		db.Club.hasMany(db.Board, {
			foreignKey: "club_id",
			sourceKey: "id",
		});

		// Club - Schedule (1:n)
		db.Club.hasMany(db.Schedule, {
			foreignKey: "club_id",
			sourceKey: "id",
		});
	}
};
