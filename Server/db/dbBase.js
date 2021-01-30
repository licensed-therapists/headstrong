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

  // console.log(body);

  // eslint-disable-next-line camelcase
  const { username, title, blog, journal_image, time_stamp } = body;
  // console.log(user);

  return new Promise((resolve, reject) => {
    const string = 'INSERT into entries (username, title, blog, journal_image, time_stamp, quote) VALUES (?, ?, ?, ?, ?)';
    const args = [username, title, blog, journal_image, time_stamp];
    db.query(string, args, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
};

module.exports = {
  getAllJournals,
  addJournals
};
