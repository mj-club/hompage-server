const Sequelize = require("sequelize");

module.exports = class Schedule extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title: {
					// 일정 제목
					type: Sequelize.STRING(100),
					allowNull: false,
				},
				description: {
					// 일정 내용
					type: Sequelize.TEXT,
					allowNull: false,
				},
				start: {
					// 일정 시작일 (시간포함)
					type: Sequelize.DATE,
					allowNull: false,
				},
				end: {
					// 일정 종료일 (시간포함)
					type: Sequelize.DATE,
					allowNull: false,
				},
				all_day_long: {
					// 하루종일 (true:하루종일, false:시간지정)
					type: Sequelize.BOOLEAN,
					allowNull: true,
				},
			},
			{
				sequelize,
				modelName: "Schedule",
				tableName: "schedules",
				timestamps: true,
				underscored: true,
				paranoid: false,
				charset: "utf8mb4",
				collate: "utf8mb4_unicode_ci",
			}
		);
	}
	static associate(db) {
		// Schedule - User (n:1)
		db.Schedule.belongsTo(db.User, {
			foreignKey: "user_id",
			targetKey: "id",
		});
		// Schedule - Club (n:1)
		db.Schedule.belongsTo(db.Club, {
			foreignKey: "club_id",
			targetKey: "id",
		});
		// Schedule - Union (n:1)
		db.Schedule.belongsTo(db.Union, {
			foreignKey: "union_id",
			targetKey: "id",
		});
	}
};
