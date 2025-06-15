'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the first vendor to associate categories with
    const vendors = await queryInterface.sequelize.query(
      `SELECT id FROM Vendors LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    if (vendors.length === 0) {
      console.log('No vendors found, skipping category seeding');
      return;
    }
    
    const vendorId = vendors[0].id;
    
    // Seed categories
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        vendorId: vendorId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        vendorId: vendorId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Groceries',
        description: 'Food and household items',
        vendorId: vendorId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Furniture',
        description: 'Home and office furniture',
        vendorId: vendorId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Books',
        description: 'Books and publications',
        vendorId: vendorId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};