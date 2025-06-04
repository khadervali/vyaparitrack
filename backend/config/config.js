const config = {
    development: {
      dialect: process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : undefined,
      database: process.env.DB_NAME || 'database_development',
    },
  };
  
  module.exports = config;