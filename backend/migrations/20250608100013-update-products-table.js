module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new columns
    await queryInterface.addColumn('products', 'costPrice', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
      comment: 'Purchase price from supplier',
    });

    await queryInterface.addColumn('products', 'supplier_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'vendors',
        key: 'id',
      },
      comment: 'The supplier who provides this product',
    });

    await queryInterface.addColumn('products', 'hsnCode', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'HSN/SAC code for GST',
    });

    await queryInterface.addColumn('products', 'gstRate', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
      comment: 'GST rate applicable',
    });

    await queryInterface.addColumn('products', 'unitOfMeasure', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'PCS',
      comment: 'Unit of measurement (PCS, KG, LTR, etc.)',
    });

    await queryInterface.addColumn('products', 'reorderPoint', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10,
      comment: 'Stock level at which to reorder',
    });

    await queryInterface.addColumn('products', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });

    // Add index for supplier_id
    await queryInterface.addIndex('products', ['supplier_id']);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns in reverse order
    await queryInterface.removeColumn('products', 'isActive');
    await queryInterface.removeColumn('products', 'reorderPoint');
    await queryInterface.removeColumn('products', 'unitOfMeasure');
    await queryInterface.removeColumn('products', 'gstRate');
    await queryInterface.removeColumn('products', 'hsnCode');
    await queryInterface.removeColumn('products', 'supplier_id');
    await queryInterface.removeColumn('products', 'costPrice');
  }
}; 