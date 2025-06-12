const { Sequelize } = require('sequelize');

// Create a connection to the database
const sequelize = new Sequelize(
  'vyaparitrack',
  'root',
  'Admin@123',
  {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    logging: console.log,
  }
);

async function createVendorsTable() {
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
        owner_id INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Vendors table created successfully');
    
    // Close the connection
    await sequelize.close();
    
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// Run the function
createVendorsTable();