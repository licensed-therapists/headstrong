const axios = require('axios');
const deepai = require('deepai');

deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

const getStory = async () => {
  const resp = await deepai.callStandardApi("text-generator", {
    text: "YOUR_TEXT_HERE",
});
console.log(resp);
}

module.exports = {
  getStory
}