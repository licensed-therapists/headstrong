const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_TOKEN = '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';

const configuration = new Configuration({
  apiKey: OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const getStory = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: text,
    max_tokens: 300,
    temperature: 0,
  });
  return response.data;
}


module.exports = {
  getStory
}