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

async function seedProducts() {
  try {
    // Get the first vendor ID
    const [vendors] = await sequelize.query(`SELECT id FROM vendors LIMIT 1;`);
    const vendorId = vendors.length > 0 ? vendors[0].id : 1;
    
    // Insert sample products
    await sequelize.query(`
      INSERT INTO products (name, description, price, quantity, type, stockQuantity, minStockQuantity, vendor_id, createdAt, updatedAt)
      VALUES 
        ('Laptop', 'High-performance laptop', 999.99, 10, 'product', 10, 5, ${vendorId}, NOW(), NOW()),
        ('Smartphone', 'Latest model smartphone', 699.99, 15, 'product', 15, 5, ${vendorId}, NOW(), NOW()),
        ('Tablet', '10-inch tablet', 399.99, 8, 'product', 8, 3, ${vendorId}, NOW(), NOW()),
        ('Headphones', 'Noise-cancelling headphones', 149.99, 20, 'product', 20, 5, ${vendorId}, NOW(), NOW()),
        ('IT Support', 'Technical support service', 50.00, 0, 'service', 0, 0, ${vendorId}, NOW(), NOW());
    `);
    
    console.log('Products seeded successfully');
    
    // Close the connection
    await sequelize.close();
    
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

// Run the function
seedProducts();