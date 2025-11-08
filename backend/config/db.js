const mysql = require("mysql2");
const ENV = require("./env");

const db = mysql.createConnection({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log(`✅ MySQL connected to ${ENV.NODE_ENV} database`);
});

module.exports = db;
