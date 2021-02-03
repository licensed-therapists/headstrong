const { Router } = require('express');
const Weather = Router();
const { getWeatherByGeolocation } = require('../helpers/weather');

Weather.get('/', (req, res) => {
  const { latitude, longitude } = req.body;

  getWeatherByGeolocation(latitude, longitude)
    .then((data) => res.status(200).json(data))
    .catch(() => res.sendStatus(404));
});

module.exports = {
  Weather,
};
