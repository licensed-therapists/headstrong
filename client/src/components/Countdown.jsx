import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countdown = ({ story, setStory }) => {
  const [event, setEvent] = useState('');
  const [task, setTask] = useState('');

  const handleEventChange = (e) => {
    const { value } = e.target;
    setEvent(value);
    console.log(event);
  }

  const handleTaskChange = (e) => {
    const { value } = e.target;
    setTask(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { event, task });
      const { text } = response.data.choices[0];
      console.log(text);
      setStory(text);
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
      Event:<input type="text" onChange={handleEventChange}></input>
      Task:<input type="text" onChange={handleTaskChange}></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <div color="black">{story ? story : null}</div>
    </div>
  )
}

export default Countdown;
