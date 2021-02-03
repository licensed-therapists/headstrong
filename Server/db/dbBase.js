const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const sequelize = new Sequelize('b7i6rsjwzlwsyfz7le7a', 'uwpqitz9sxjsbq9y', '4sCvHnhBpmu3CXRg3rFD', {
  host: 'b7i6rsjwzlwsyfz7le7a-mysql.services.clever-cloud.com',
  dialect: 'mysql',

});

sequelize.authenticate()
  .then(() => console.info('Connected to the Database'))
  .catch((err) => console.warn(err));


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

});


const getAllJournals = () => {
  return Entries.findAll();
};


const deleteJournal = (body) => {
  const { id } = body;
  return Entries.destroy({
    where: {
      id: id
    }
  });
};


const addJournals = async(body) => {

  const { username, title, blog, journalImage } = body;

  const newEntry = await Entries.create({
    username: username,
    title: title,
    blog: blog,
    journalImage: journalImage,

  });

  return newEntry.save();
};

const updateJournal = (body) => {
  const { username, title, blog, id } = body;
  //first object is what you want to change
  return Entries.update({
    username: username,
    blog: blog,
    title: title
  },
  {
    where: {
      id: id
    }
  });

};

module.exports = {
  getAllJournals,
  addJournals,
  deleteJournal,
  updateJournal,
  Entries
};
