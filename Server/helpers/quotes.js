const axios = require('axios');
const config = require('../config');

const getRandomQuote = () => {
  const options = {
    method: 'GET',
    url: 'https://theysaidso.p.rapidapi.com/qod',
    params: {
      category: 'inspire',
      language: 'en'
    },
    headers: {
      'x-rapidapi-key': `${config.QUOTES_TOKEN}`,
      'x-rapidapi-host': 'theysaidso.p.rapidapi.com'
    }
  };

  return axios(options)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

module.exports = {
  getRandomQuote,
}