// Seeder: Insert dummy products
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Sample Product 1',
        description: 'A dummy product for testing',
        price: 100.0,
        quantity: 50,
        type: 'product',
        stockQuantity: 50,
        minStockQuantity: 10,
        vendor_id: 1, // Adjust vendor ID as needed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample Service 1',
        description: 'A dummy service for testing',
        price: 200.0,
        quantity: 0,
        type: 'service',
        stockQuantity: 0,
        minStockQuantity: 0,
        vendor_id: 2, // Adjust vendor ID as needed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample Product 2',
        description: 'Another dummy product',
        price: 150.0,
        quantity: 30,
        type: 'product',
        stockQuantity: 30,
        minStockQuantity: 5,
        vendor_id: 3, // Adjust vendor ID as needed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
