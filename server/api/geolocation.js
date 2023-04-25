const { Router } = require('express');
const Location = Router();
const { getGeolocationByIP } = require('../helpers/geolocation');
const axios = require('axios');

Location.get('/', (req, res) => {
  return axios.get('https://api.ipify.org')
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => console.error('Cannot get IP address', err))
})

Location.post('/', (req, res) => {
  const { ip } = req.body;
  return getGeolocationByIP(ip)
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(404));
});

module.exports = {
  Location,
};
