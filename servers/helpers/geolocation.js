const axios = require('axios');

const getGeolocationByIP = (userIP) => {
  const url = `http://api.ipstack.com/${userIP}?access_key=${process.env.IPSTACK_TOKEN}`;

  return axios.get(url)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

module.exports = {
  getGeolocationByIP
};
