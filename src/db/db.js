// db.js
const { Pool, types } = require("pg");
require("dotenv").config();

types.setTypeParser(1082, (val) => val);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: false, // Set to true only if you're connecting to a production DB with SSL
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);
});

module.exports = pool;
