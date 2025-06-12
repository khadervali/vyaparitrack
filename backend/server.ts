import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import productRoutes from './routes/productRoutes';
import branchRoutes from './routes/branchRoutes';
import vendorRoutes from './routes/vendorRoutes';

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
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

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

// Routes that require authentication
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/vendors', vendorRoutes);

// Start server and initialize database
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ force: false }); // This will create the tables. Set to false after first run
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