const { Router } = require('express');
const Location = Router();
const { getGeolocationByIP } = require('../helpers/geolocation');

Location.post('/', (req, res) => {
  const { ip } = req.body;

  return getGeolocationByIP(ip)
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(404));
});

module.exports = {
  Location,
};
