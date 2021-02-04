const { Router } = require('express');
const Weather = Router();
const { getWeatherByGeolocation } = require('../helpers/weather');

Weather.post('/', (req, res) => {
  const { latitude, longitude } = req.body;

  getWeatherByGeolocation(latitude, longitude)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.warn('API----', err);
      res.status(404);
    });
});

module.exports = {
  Weather,
};
