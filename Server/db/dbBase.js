/* eslint-disable camelcase */
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

const addJournals = (body) => {
  // eslint-disable-next-line camelcase
  const { username, title, blog, journal_image, time_stamp } = body;

  return new Promise((resolve, reject) => {
    const string = 'INSERT into entries (username, title, blog, journal_image, time_stamp) VALUES (?, ?, ?, ?, ?)';
    const args = [username, title, blog, journal_image, time_stamp];
    db.query(string, args, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
};

const deleteJournal = (body) => {
  console.log(body);

  const { title } = body;
  return new Promise((resolve, reject) => {
    const string = 'DELETE FROM entries WHERE title = ?';
    const args = [title];

    db.query(string, args, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
};


module.exports = {
  getAllJournals,
  addJournals,
  deleteJournal
};
