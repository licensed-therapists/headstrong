const { Router } = require('express');
const Quotes = Router();
const { getQuotes } = require('../helpers/quotes');

Quotes.get('/', (req, res) => {
  getQuotes()
  .then((data) => res.send(data))
  .catch(() => res.status(404));
});

module.exports = {
  Quotes,
}