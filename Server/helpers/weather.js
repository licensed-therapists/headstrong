const axios = require('axios');
const config = require('../config');

const getWeatherByGeolocation = (latitude, longitude) => {

  // const url = `http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${config.WEATHERBIT_TOKEN}`;
  const url = `http://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=f4a62f25fdd94f3cb2aea6f4b892ae10`;

  return axios.get(url)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

module.exports = {
  getWeatherByGeolocation
};
