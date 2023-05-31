const { Router } = require('express');
const Stories = Router();
const { getStory } = require('../helpers/stories');
const { addCountdown } = require('../db/index');

Stories.post('/', async (req, res) => {
  const { event, task, date } = req.body;
  const { Headstrong } = req.cookies;
  try {
    const story = await getStory(event, task);
    const { text } = story.choices[0];
    await addCountdown(Headstrong, event, date, text);
    res.status(201).send(story);
  } catch (err) {
    console.error('Failed to POST text to API:', err);
    res.sendStatus(500);
  }
})

module.exports = {
  Stories,
}