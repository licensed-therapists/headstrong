import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStory } from '../../../server/helpers/stories';

const Countdown = ({ story, setStory }) => {
  const [prompt, setPrompt] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setPrompt(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { text: prompt });
      const { text } = response.data.choices[0];
      console.log(text);
      setStory(text);
      console.log('story', story);
    } catch (err) {
      console.error('Failed to POST text to API at client:', err);
    }
  }

  // useEffect(() => {
  //   setText(text);
  // }, [text])

  return (
    <div>
      <h1>Countdown</h1>
      <input type="text" onChange={handleInputChange}></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <div>{story ? story : null}</div>
    </div>
  )
}

export default Countdown;
