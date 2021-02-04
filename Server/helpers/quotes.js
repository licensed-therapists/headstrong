const axios = require('axios');

const getQuotes = () => {

  return axios.get('https://type.fit/api/quotes')
    .then(({ data }) => data)
    .catch((err) => console.error(err));

};

module.exports = {
  getQuotes
};
