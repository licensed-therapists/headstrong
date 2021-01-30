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


module.exports = {
  getAllJournals
}