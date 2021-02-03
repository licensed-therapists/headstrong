const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const sequelize = new Sequelize('bt1fnvzakotwnpnehern', 'uupjrbhdknay1bef', '0z5Qosz43DymuacWxtB5', {
  host: 'bt1fnvzakotwnpnehern-mysql.services.clever-cloud.com',
  dialect: 'mysql',

});

const Entries = sequelize.define('entries', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },

  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },

  blog: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },

  journalImage: {
    type: Sequelize.STRING(1000)
  },

  timeStamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }

});


sequelize.sync({force: true})
  .then(() => console.log('Database and Entries table created'))
  .catch((err) => console.warn(err));

sequelize.authenticate()
  .then(() => console.info('Connected to the Database'))
  .catch((err) => console.warn(err));

const getAllJournals = () =>
  // sequelize.query('SELECT * FROM entries', { type: QueryTypes.SELECT })
  Entries.findAll()
    .then((data) => console.log(data))
    .catch((err) => console.warn(err));

const deleteJournal = (body) => {
  const { title } = body;
  const args = [title];
  sequelize.query('DELETE FROM entries WHERE title = ?', args, { type: QueryTypes.DELETE})
    .then((data) => console.info(data))
    .catch((err) => console.warn(err));
};


const addJournals = (body) => {
  const { username, title, blog, journalImage, timeStamp } = body;
  return Entries.create({
    username: username,
    title: title,
    blog: blog,
    journalImage: journalImage,
    timeStamp: timeStamp
  })
    .then((data) => console.log(data))
    .catch((err) => console.warn(err));

};

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


module.exports = {
  getAllJournals,
  addJournals,
  deleteJournal,
  // updateJournal
  Entries
};
