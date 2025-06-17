module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First check if the column exists
    const tableInfo = await queryInterface.describeTable('products');
    if (tableInfo.vendorId) {
      await queryInterface.removeColumn('products', 'vendorId');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Add the column back if needed to rollback
    await queryInterface.addColumn('products', 'vendorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'vendors',
        key: 'id'
      }
    });
  }
}; 