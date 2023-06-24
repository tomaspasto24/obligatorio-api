const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 0, // or your PostgreSQL port
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
