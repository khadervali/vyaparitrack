import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import productRoutes from './routes/productRoutes';
import branchRoutes from './routes/branchRoutes';

dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 3000;

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Middleware
app.use(express.json());

// CORS middleware configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the routers
console.log('Mounting routes...');
app.use('/api/auth', (req, res, next) => {
  console.log('Auth route accessed:', req.method, req.path, req.headers);
  next();
}, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/branches', branchRoutes);

// Start server and initialize database
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ force: true }); // This will create the tables. Set back to false after first run
    console.log('Database tables created successfully.');

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
