import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStory } from '../../../server/helpers/stories';

const Countdown = ({ story, setStory }) => {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { text });
      const { text } = response.data.choices[0];
      console.log(text);
      setStory(text);
      console.log('story', story);
    } catch (err) {
      console.error('Failed to POST text to API at client:', err);
    }
  }

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('/api/stories', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'text/plain'
  //       },
  //       body: { text: text }
  //     });
  //     console.log(response.data);
  //     setStory(response.data);
  //   } catch (err) {
  //     console.error('Failed to POST text to API at client:', err);
  //   }
  // }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setText(value);
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
