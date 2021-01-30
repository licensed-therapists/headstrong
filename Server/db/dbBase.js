const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'journals'
});


const getAllJournals = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM entries', (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
};

const addJournals = () => {
  return new Promise((resolve, reject) => {
    const string = 'INSERT into entries (username, title, body, journal_image, time_stamp, quote) VALUES(?, ?, ?, ?, ?, ?)';
    db.query(string, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
};

module.exports = {
  getAllJournals,
  addJournals
};