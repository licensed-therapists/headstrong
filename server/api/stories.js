const { Router } = require('express');
const Stories = Router();
const { getStory } = require('../helpers/stories');

Stories.post('/', async (req, res) => {
  const { text } = req.body;
  console.log('text', text);
  try {
    const story = await getStory(text);
    console.log('story', story);
    res.status(201).send(story);
  } catch (err) {
    console.error('Failed to POST text to API:', err);
    res.sendStatus(500);
  }
})

// Stories.get('/', async (req, res) => {
//   const { text } = req.body;
//   console.log('text', text);
//   try {
//     const story = await getStory(text);
//     console.log('story', story);
//     res.status(201).send(story);
//   } catch (err) {
//     console.error('Failed to POST text to API:', err);
//     res.sendStatus(500);
//   }
// })

module.exports = {
  Stories,
}