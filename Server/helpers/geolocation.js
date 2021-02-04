const axios = require('axios');
const config = require('../config');

const getGeolocationByIP = (userIP) => {

  // const url = `http://api.ipstack.com/${userIP}?access_key=${userIP}`;
  const url = `http://api.ipstack.com/${userIP}?access_key=09865bbb6e7031638d0e5f02fd683e52`;

  return axios.get(url)
    .then(({ data }) => data)
    .catch((err) => console.error('helpers err--', err));
};

module.exports = {
  getGeolocationByIP
};
