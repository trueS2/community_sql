// database.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'true',
  password: 'Jsjs991002^',
  database: 'community_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
