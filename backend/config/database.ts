import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Database configuration
const dbConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '8889'),
  database: process.env.DB_NAME || 'vyaparitrack',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Admin@123',
};

console.log('Database Configuration:', { 
  ...dbConfig, 
  password: '********',
  host: dbConfig.host,
  port: dbConfig.port
});

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect as 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;