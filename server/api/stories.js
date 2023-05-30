const { Router } = require('express');
const Stories = Router();
const { getStory } = require('../helpers/stories');

Stories.post('/', async (req, res) => {
  const { event, task } = req.body;
  try {
    const story = await getStory(event, task);
    res.status(201).send(story);
  } catch (err) {
    console.error('Failed to POST text to API:', err);
    res.sendStatus(500);
  }
})

module.exports = {
  Stories,
}