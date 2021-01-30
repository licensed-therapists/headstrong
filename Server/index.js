const path = require('path');
const express = require('express');
const { db, getAllJournals } = require('./db/dbBase.js');

const port = 3000;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));


app.get('/api/journals', (req, res) => {
  return getAllJournals()
  .then((data) => res.json(data))
  .catch((err) => console.warn(err));
})


app.listen(port, () => {
  console.log(`Server is listening on http://127.0.0.1:${port}`)
})

