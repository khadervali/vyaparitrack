require('dotenv').config();
const mysql = require('mysql2/promise');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function checkDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT ? parseInt(DB_PORT, 10) : 3306, // Default MySQL port
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    console.log('Successfully connected to the database.');

    const [rows, fields] = await connection.execute('SHOW TABLES;');
    console.log('Tables in the database:');
    console.log(rows);

  } catch (error) {
    console.error('Database connection or query error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

checkDatabase();