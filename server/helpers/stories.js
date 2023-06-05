const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_TOKEN } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_TOKEN,
});

const openai = new OpenAIApi(configuration);

const getStory = async (event, task, stressors) => {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `I'm worried about an upcoming ${event} where I have to ${task}. It's stressful for this reason: ${stressors}. Please write me a story in second person perspective that describes a worst-case scenario for how this event will play out. Write the story as if it is definitely what is going to happen. The story should be roughly 150 words in length.`,
    max_tokens: 200,
    temperature: 1.40,
  });
  return response.data;
}

module.exports = {
  getStory
}