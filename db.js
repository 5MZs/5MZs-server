const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '5MZs',
  password: 'a',
  port: 5432,
});

module.exports = pool;