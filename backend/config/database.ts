import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(
  // Read database details from environment variables
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || '3306', 10), // Parse port as integer, default to 3306
    dialect: process.env.DB_DIALECT as any, // Use 'any' or specific Dialect type if possible
    logging: false,
  }
);

export default sequelize;