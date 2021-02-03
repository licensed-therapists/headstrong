const { Router } = require('express');
const Forecast = Router();
const { getForecastByGeolocation } = require('../helpers/weather');

Forecast.get('/', (req, res) => {
  const { latitude, longitude } = req.body;

  getForecastByGeolocation(latitude, longitude)
    .then((data) => res.status(200).json(data))
    .catch(() => res.sendStatus(404));
});

module.exports = {
  Forecast,
};
