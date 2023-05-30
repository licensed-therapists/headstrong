const axios = require('axios');
const deepai = require('deepai');

deepai.setApiKey('6c87b48e-91c9-4eb4-95a9-052eb15a4f2f');

const getStory = async () => {
  const resp = await deepai.callStandardApi("text-generator", {
    text: "YOUR_TEXT_HERE",
});
console.log(resp);
}

module.exports = {
  getStory
}