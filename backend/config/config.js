require('dotenv').config();

module.exports = {
  development: {
    username: 'root', // Replace with your actual MySQL username
    password: 'Admin@123', // Replace with your actual MySQL password
    database: 'vyaparitrack', // Replace with your actual database name
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
    define: {
      freezeTableName: true,
      underscored: true,
      underscoredAll: true
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: parseInt(process.env.DB_PORT_TEST || '3306', 10),
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD || 'database_production',
    host: process.env.DB_HOST_PROD || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: parseInt(process.env.DB_PORT_PROD || '3306', 10),
  },
};
