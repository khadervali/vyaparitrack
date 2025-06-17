module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_vendor_roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vendors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      role: {
        type: Sequelize.ENUM('owner', 'admin', 'manager', 'staff', 'viewer'),
        allowNull: false,
        defaultValue: 'staff',
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Indicates if this is the primary vendor for the user',
      },
      permissions: {
        type: Sequelize.JSON,
        defaultValue: [],
        comment: 'Array of specific permissions for this user-vendor relationship',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add unique constraint for userId and vendorId combination
    await queryInterface.addIndex('user_vendor_roles', ['userId', 'vendorId'], {
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_vendor_roles');
  }
}; 