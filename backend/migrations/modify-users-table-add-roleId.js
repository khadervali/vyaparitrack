'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the existing 'role' column
    await queryInterface.removeColumn('users', 'role');

    // Add the new 'roleId' column
    await queryInterface.addColumn('users', 'roleId', {
      type: Sequelize.INTEGER,
      allowNull: true, // or false, depending on your requirement
      references: {
        model: 'roles', // name of the target table
        key: 'id', // key in the target table that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // or CASCADE, RESTRICT, etc.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'roleId' column and its foreign key constraint
    await queryInterface.removeColumn('users', 'roleId');

    // Add back the original 'role' column (if needed for rollback)
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on original constraint
    });
  }
};