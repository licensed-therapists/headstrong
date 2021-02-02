// /* eslint-disable camelcase */
// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'journals'
// });


// const getAllJournals = () => {
//   return new Promise((resolve, reject) => {
//     db.query('SELECT * FROM entries', (err, results) => {
//       if (err) { return reject(err); }
//       resolve(results);
//     });
//   });
// };

// const addJournals = (body) => {
//   // eslint-disable-next-line camelcase
//   const { username, title, blog, journal_image, time_stamp } = body;

//   return new Promise((resolve, reject) => {
//     const string = 'INSERT into entries (username, title, blog, journal_image, time_stamp) VALUES (?, ?, ?, ?, ?)';
//     const args = [username, title, blog, journal_image, time_stamp];
//     db.query(string, args, (err, results) => {
//       if (err) { return reject(err); }
//       resolve(results);
//     });
//   });
// };

// const deleteJournal = (body) => {
//   console.log(body);

//   const { title } = body;
//   return new Promise((resolve, reject) => {
//     const string = 'DELETE FROM entries WHERE title = ?';
//     const args = [title];

//     db.query(string, args, (err, results) => {
//       if (err) { return reject(err); }
//       resolve(results);
//     });
//   });
// };

// const updateJournal = (body) => {

//   const { blog, title, username } = body;

//   return new Promise((resolve, reject) => {
//     const string = 'UPDATE entries SET title = ?, blog = ? WHERE username = ?';
//     const args = [title, blog, username];

//     db.query(string, args, (err, results) => {
//       if (err) { return reject(err); }
//       resolve(results);
//     });
//   });

// };


// module.exports = {
//   getAllJournals,
//   addJournals,
//   deleteJournal,
//   updateJournal
// };



const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bt1fnvzakotwnpnehern', 'uupjrbhdknay1bef', '0z5Qosz43DymuacWxtB5', {
    host: 'bt1fnvzakotwnpnehern-mysql.services.clever-cloud.com',
    dialect: 'mysql',

});

sequelize.authenticate()
.then(() => console.info('Connected to the Database'))
.catch((err) => console.warn(err));



module.export = sequelize;
