import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const dbConfig = {
  dialect: 'mysql', // Manually set
  host: '127.0.0.1', // Manually set (or your actual host)
  port: 3306, // <-- Manually set the correct port here
  database: 'vyaparitrack', // Manually set
  username: 'vyapari_user', // Manually set (or your actual user)
  password: 'Admin@123', // <-- Manually set your password here
};

console.log('Database Configuration:', { ...dbConfig, password: '********' }); // Log the manual config

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect as 'mysql',
    logging: false,
  }
);

export default sequelize;