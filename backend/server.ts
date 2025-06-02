import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sequelize from './config/database'; // Import Sequelize instance
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import productRoutes from './routes/productRoutes';
import branchRoutes from './routes/branchRoutes';
const app = express();
const port = process.env.PORT || 5000;
const connection = process.env.MONGO_URI || 'mongodb://localhost:27017/vyaparitrack';

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1); // Exit the process with an error code
}

// You might also want to check for MONGO_URI or other critical variables
// if (!process.env.MONGO_URI && process.env.DB_DIALECT !== 'mysql') {
//   console.error('FATAL ERROR: MONGO_URI is not defined.');
//   process.exit(1);
// }
// if (process.env.DB_DIALECT === 'mysql' && (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME)) {
//    console.error('FATAL ERROR: MySQL database credentials are not fully defined.');
//    process.exit(1);
// }

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/branches', branchRoutes);


// Start the server
app.listen(port, () => {
  sequelize.sync({ force: false }) // Set force to true to drop and re-create tables (use with caution!)
    .then(() => {
      console.log('Database synchronized successfully.');
      console.log(`Server running on port ${port}`);
    })
    .catch((err) => {
      console.error('Error synchronizing database:', err);
    });
});
