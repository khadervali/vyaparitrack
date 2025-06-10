// Migration to add vendorId to Users table
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'vendor_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Vendor Admins will have their own id, staff will reference their admin's vendorId
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'vendor_id');
  }
};
