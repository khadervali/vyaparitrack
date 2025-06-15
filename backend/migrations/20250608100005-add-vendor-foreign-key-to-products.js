'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists
    const tableInfo = await queryInterface.describeTable('Products');
    if (!tableInfo.vendorId) {
      await queryInterface.addColumn('Products', 'vendorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Vendors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'vendorId');
  }
};