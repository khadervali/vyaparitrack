// Migration to add vendorId to Users table
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'vendorId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Vendor Admins will have their own id, staff will reference their admin's vendorId
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'vendorId');
  }
};
