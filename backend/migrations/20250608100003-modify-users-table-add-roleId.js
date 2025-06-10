'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new 'roleId' column
    await queryInterface.addColumn('users', 'role_id', {
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
    // Remove the role_id column and its foreign key constraint
    await queryInterface.removeColumn('users', 'role_id');
  }
};