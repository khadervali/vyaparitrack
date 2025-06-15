import { QueryTypes, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection for Sequelize
const sequelize = new Sequelize(
  'vyaparitrack',
  'root',
  'Admin@123', // Using the same password as in config.js
  {
    host: 'localhost',
    port: 8889, // Using port 8889 where the vyaparitrack database exists
    dialect: 'mysql',
    logging: false, // Disable logging for cleaner output
  }
);

// MongoDB connection removed - using MySQL only

// Log database configuration
console.log('Database Configuration:', {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'vyaparitrack',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD ? '********' : ''
});

export default sequelize;