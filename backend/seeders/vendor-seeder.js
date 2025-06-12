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

async function seedVendors() {
  try {
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
    console.error('Error seeding vendors:', error);
  }
}

// Run the function
seedVendors();