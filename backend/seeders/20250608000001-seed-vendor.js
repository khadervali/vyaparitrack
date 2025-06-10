'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vendors', [
      {
        name: 'Test Vendor 1',
        email: 'vendor1@test.com',
        phone: '1234567890',
        address: '123 Test Street, Test City',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Test Vendor 2',
        email: 'vendor2@test.com',
        phone: '0987654321',
        address: '456 Test Avenue, Test Town',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Test Vendor 3',
        email: 'vendor3@test.com',
        phone: '5555555555',
        address: '789 Test Road, Test Village',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vendors', null, {});
  }
};