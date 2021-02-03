const axios = require('axios');
const config = require('../config');

const getWeatherByGeolocation = (latitude, longitude) => {

  const url = `http://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${config.WEATHERBIT_TOKEN}`;

  return axios.get(url)
    .then(({ data }) => data);
};

module.exports = {
  getWeatherByGeolocation
};
