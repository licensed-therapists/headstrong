// const path = require('path');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
// const { OPENAI_TOKEN } = require('../config/keys.js');
const OPENAI_TOKEN = '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';

const configuration = new Configuration({
  apiKey: OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const getStory = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "I'm worried about an upcoming event where I have to make a speech in front of a large crowd of people. Please write me a story in second person perspective that describes a worst-case scenario for how this event could play out. The story should be roughly 150 words in length.",
    max_tokens: 300,
    temperature: 0,
  });
  return response.data;
}


module.exports = {
  getStory
}

// const deepai = require('deepai');

// deepai.setApiKey('6c87b48e-91c9-4eb4-95a9-052eb15a4f2f');

// const getStory = async (text1) => {
//   console.log('helper text', text1);
//   try {
//     const resp = await deepai.callStandardApi("text-generator", {
//       // text: String(text),
//       text: text1
//     });
//     console.log(resp);
    
//   } catch (err) {
//     console.error('Failed to POST to API at helper:', err);
//   }
// }