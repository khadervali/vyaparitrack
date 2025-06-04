import 'dotenv/config';
import { Options, Dialect } from 'sequelize';

interface DbConfig {
  development: Options;
  test?: Options;
  production?: Options;
}

const config: DbConfig = {
  development: {
    dialect: process.env.DB_DIALECT as Dialect || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : undefined,
    database: process.env.DB_NAME || 'database_development',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
};

export = config;