const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

async function createTables() {
  try {
    // Create vendors table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(100),
        gstin VARCHAR(20),
        owner_id INT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      );
    `);
    
    // Create user_vendors junction table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS user_vendors (
        user_id INT NOT NULL,
        vendor_id INT NOT NULL,
        role ENUM('owner', 'manager', 'staff') DEFAULT 'staff',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, vendor_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (vendor_id) REFERENCES vendors(id)
      );
    `);
    
    // Modify products table to reference vendor_id
    await sequelize.query(`
      ALTER TABLE products 
      DROP FOREIGN KEY IF EXISTS products_ibfk_1;
    `);
    
    await sequelize.query(`
      ALTER TABLE products 
      CHANGE COLUMN vendor_id vendor_id INT NOT NULL,
      ADD CONSTRAINT products_ibfk_1 FOREIGN KEY (vendor_id) REFERENCES vendors(id);
    `);
    
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

module.exports = createTables;