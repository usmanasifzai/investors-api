'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Investors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        default: '',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        default: '',
      },
      allocation: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      equity: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Investors');
  }
};
