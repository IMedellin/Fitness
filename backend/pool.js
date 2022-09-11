const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'ijrm',
  port: 5432,
  database: "fitness_tracker"
})

module.exports = pool;