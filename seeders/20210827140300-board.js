"use strict";

const createBoardObj = (name, clubId = null, unionId = null) => {
	return {
		name,
		created_at: new Date(),
		updated_at: new Date(),
		club_id: clubId,
		unionId: unionId,
	};
};

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
