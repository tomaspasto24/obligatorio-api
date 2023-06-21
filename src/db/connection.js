const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '174.138.127.85',
  database: 'bd-obligatorio',
  password: 'e3nz4i6gcmjz2j3y',
  port: 42299, // or your PostgreSQL port
});

// Test the database connection
pool
  .connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((error) => {
    console.error('Failed to connect to the PostgreSQL database:', error);
  });

module.exports = pool;
