const { Router } = require('express');
const Location = Router();
const { getGeolocationByIP } = require('../helpers/geolocation');

Location.post('/', (req, res) => {
  console.log(req.params);
  const { ip } = req.body;

  return getGeolocationByIP(ip)
    .then((data) => {
      console.log('API DATA', data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.warn('IP API ERR----', err);
      res.status(404);
    });
});

module.exports = {
  Location,
};
