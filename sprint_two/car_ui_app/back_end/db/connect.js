//This file connects Back-End Express Server (server.js) to Postgres DB

const Pool = require('pg').Pool

//IF HAVING TROUBLE CONNECTING TO DB, MAKE SURE CREDENTIALS ARE CORRECT
const pool = new Pool({
  user: 'oibnpyyowvtdwk',
  host: 'ec2-52-87-22-151.compute-1.amazonaws.com',
  database: 'dfmvc8d1pd6s9s',
  password: '76da5a9a0eb67a94b779d4481a4eb524a0633baa7631a3567d5df1dbb8dc5088',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = { pool };
