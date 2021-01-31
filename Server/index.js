const path = require('path');
const express = require('express');
const { Quotes } = require('./api/quotes');
const { db, getAllJournals, addJournals, deleteJournal} = require('./db/dbBase.js');

const port = 3000;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use('/api/quotes', Quotes);


app.get('/api/journals', (req, res) => {
  return getAllJournals()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.post('/api/journals', (req, res) => {
  return addJournals(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.delete('/api/journals', (req, res) => {
  console.log(res);
  return deleteJournal(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});



app.listen(port, () => {
  console.log(`Server is listening on http://127.0.0.1:${port}`);
});

