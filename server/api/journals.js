const { Router } = require('express');
const Journals = Router();
const { getAllJournals, addJournals, deleteJournal, updateJournal, updateFavSounds } = require('../db');

Journals.get('/', (req, res) => {
  console.log('cookie?', req.cookies)
  return getAllJournals(req.cookies.Headstrong)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

Journals.post('/', (req, res) => {
  return addJournals(req.body, req.cookies.Headstrong)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

Journals.delete('/:id', (req, res) => {
  return deleteJournal(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

Journals.put('/', (req, res) => {
  console.info(req.body);
  return updateJournal(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

Journals.put('/:id', (req, res) => {
  const { id } = req.params; // Get the id from the request parameters
  const updatedData = { id, ...req.body }; // Merge the id with the updated data

  return updateJournal(updatedData) // Pass the updatedData object to the updateJournal function
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});




module.exports = {
  Journals,
};
