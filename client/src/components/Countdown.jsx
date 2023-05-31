import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countdown = () => {
  const [event, setEvent] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [story, setStory] = useState('');
  const [countdown, setCountdown] = useState('');

  const handleEventChange = (e) => {
    const { value } = e.target;
    setEvent(value);
  }

  const handleTaskChange = (e) => {
    const { value } = e.target;
    setTask(value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/stories', { event, task, date });
      const { text } = response.data.choices[0];
      console.log(text);
      setStory(text);
    } catch (err) {
      console.error('Failed to POST text to API at client:', err);
    }
  }

  const handleDateChange = (e) => {
    const { value } = e.target;
    const [year, month, day] = value.split('-');
    const newDate = new Date(year, month - 1, day); // month is zero-based
    setDate(newDate);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (date) {
        const now = new Date();
        const timeDifference = date.getTime() - now.getTime();
  
        if (!timeDifference) {
          setStory('Countdown is over!');
          clearInterval(intervalId);
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
          setCountdown(`Countdown: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
        }
      }
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [date]);
  

  return (
    <div>
      <h1>Countdown</h1>
      Event:<input type="text" onChange={handleEventChange}></input>
      Task:<input type="text" onChange={handleTaskChange}></input>
      Date:<input type="date" onChange={handleDateChange}></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <div>{story ? story : null}</div>
      <div>{countdown ? countdown : null}</div>
    </div>
  )
}

export default Countdown;
