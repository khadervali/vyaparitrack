const { Sequelize } = require('sequelize');

// Create a connection to MySQL without specifying a database
const sequelize = new Sequelize(
  '',
  'root',
  'Admin@123',
  {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    logging: console.log,
  }
);

async function setupDatabase() {
  try {
    // Create database if it doesn't exist
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS vyaparitrack;`);
    console.log('Database created or already exists');
    
    // Use the database
    await sequelize.query(`USE vyaparitrack;`);
    
    // Create vendors table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(100),
        gstin VARCHAR(20),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log('Vendors table created');
    
    // Insert sample vendors
    await sequelize.query(`
      INSERT INTO vendors (name, address, phone, email, gstin, is_active, created_at, updated_at)
      VALUES 
        ('ABC Electronics', '123 Main St', '555-1234', 'abc@example.com', 'GST123456789', true, NOW(), NOW()),
        ('XYZ Supplies', '456 Oak Ave', '555-5678', 'xyz@example.com', 'GST987654321', true, NOW(), NOW()),
        ('Global Traders', '789 Pine Rd', '555-9012', 'global@example.com', 'GST456789123', true, NOW(), NOW());
    `);
    console.log('Vendors seeded successfully');
    
    // Close the connection
    await sequelize.close();
    
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the function
setupDatabase();