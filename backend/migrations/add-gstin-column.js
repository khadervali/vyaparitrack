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

async function addGstinColumn() {
  try {
    // Check if the column exists
    const [columns] = await sequelize.query(`
      SHOW COLUMNS FROM vendors LIKE 'gstin';
    `);
    
    // Add the column if it doesn't exist
    if (columns.length === 0) {
      await sequelize.query(`
        ALTER TABLE vendors 
        ADD COLUMN gstin VARCHAR(20) AFTER email;
      `);
      console.log('GSTIN column added successfully');
    } else {
      console.log('GSTIN column already exists');
    }
    
    // Close the connection
    await sequelize.close();
    
  } catch (error) {
    console.error('Error adding GSTIN column:', error);
  }
}

// Run the function
addGstinColumn();