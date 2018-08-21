const { Pool } = require('pg');

const pool = new Pool({
  database: 'rental_hosts',
  host: 'localhost',
});

module.exports = pool;
