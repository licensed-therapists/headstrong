import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Countdown = () => {
  const [event, setEvent] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [story, setStory] = useState('');
  const [countdown, setCountdown] = useState('');

  const getDate = async () => {
    try {
      const response = await axios.get('/api/stories');
      const { date } = response.data;
      if (date) {
        setDate(new Date(date));
      }
      console.log(response.data.date);
    } catch (err) {
      console.error('Failed to GET date from db to client:', err);
    }
  }

  const getStory = async () => {
    try {
      const response = await axios.get('/api/stories');
      const { story } = response.data;
      setStory(story);
    } catch (err) {
      console.error('Failed to GET story from db to client:', err);
    }
  }

  useEffect(() => {
    getDate();
    getStory();
  }, [])

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
      console.log('hi');
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
  
          setCountdown(`${days} days\n${hours} hours\n${minutes} minutes\n${seconds} seconds`);
        }
      }
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [date]);

  const countdownStyle = {
    color: 'red',
    fontSize: '24px',
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
    textAlign: 'center'
  };

  const daysStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
  };

  return (
    <div>
      <Typography component="div" style={countdownStyle}>
        {countdown ? (
          countdown.split('\n').map((line, index) => {
            if (index === 0) {
              return <span key={index} style={daysStyle}>{line}{'\n'}</span>;
            }
            return line + '\n';
          })
        ) : null}
      </Typography>
      Event:<input type="text" onChange={handleEventChange}></input>
      Task:<input type="text" onChange={handleTaskChange}></input>
      Date:<input type="date" onChange={handleDateChange}></input>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      {/* <button type="submit" onClick={getDate}>Test GET date</button> */}
      <div>{story ? story : null}</div>
    </div>
  )
}

export default Countdown;
