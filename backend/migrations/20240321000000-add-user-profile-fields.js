'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING(20),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'company', {
      type: Sequelize.STRING(255),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'gstin', {
      type: Sequelize.STRING(15),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'address', {
      type: Sequelize.STRING(255),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'city', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'state', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'pincode', {
      type: Sequelize.STRING(10),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'avatar', {
      type: Sequelize.STRING(255),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'timezone', {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: 'Asia/Kolkata'
    });

    await queryInterface.addColumn('users', 'date_format', {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: 'DD-MM-YYYY'
    });

    await queryInterface.addColumn('users', 'currency', {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: 'INR'
    });

    await queryInterface.addColumn('users', 'language', {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: 'en'
    });

    await queryInterface.addColumn('users', 'email_notifications', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });

    await queryInterface.addColumn('users', 'whatsapp_notifications', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phone');
    await queryInterface.removeColumn('users', 'company');
    await queryInterface.removeColumn('users', 'gstin');
    await queryInterface.removeColumn('users', 'address');
    await queryInterface.removeColumn('users', 'city');
    await queryInterface.removeColumn('users', 'state');
    await queryInterface.removeColumn('users', 'pincode');
    await queryInterface.removeColumn('users', 'avatar');
    await queryInterface.removeColumn('users', 'timezone');
    await queryInterface.removeColumn('users', 'date_format');
    await queryInterface.removeColumn('users', 'currency');
    await queryInterface.removeColumn('users', 'language');
    await queryInterface.removeColumn('users', 'email_notifications');
    await queryInterface.removeColumn('users', 'whatsapp_notifications');
  }
}; 