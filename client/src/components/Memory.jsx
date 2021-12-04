import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import NoMemory from './NoMemory.jsx';

const Memory = () => {
  const [memory, setMemory] = useState({});

  const { id, username, title, blog, journalImage, createdAt, temp, weatherDescription, mood } = memory;
  const timeStamp = moment(createdAt).format('MMM Do YY');

  const getRandomMemory = () => {
    axios.get('/api/journals')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setMemory(data[randomIndex]);
      }).catch((err) => console.error(err));
  };

  const deleteEntry = () => {
    axios.delete(`/api/journals/${id}`)
      .then(getRandomMemory)
      .catch((err) => console.warn(err));
  };

  const showJournalImage = () => {
    if (journalImage) {
      <img
        style={{ height: '200px', width: '300px'}}
        src={journalImage}
        alt="Memory Image"
        width="400px"
        height="auto"
        overflow="hidden"
      />;
    }
  };

  useEffect(() => {
    getRandomMemory();
  }, []);

  return !memory
    ? <NoMemory />
    : (<div className='text wrap' key={id}>
      <h2>Welcome back, {username}</h2>
      <br />
      <div><i>Your memory from {timeStamp} | It was {temp} and {weatherDescription} and you were feeling {mood}% happy!</i></div>
      <br />
      <div><h2>{title}</h2></div>
      <div><p>{blog}</p></div>
      <br />
      <div>{showJournalImage()}</div>
      <div>
        <Button
          className='Button'
          style={{ color: 'white' }}
          onClick={deleteEntry}>
          <DeleteIcon/>
        </Button>
        <Button
          className='Button'
          style={{ color: 'white', fontFamily: 'Roboto' }}
          onClick={getRandomMemory}>
          View Another Memory
        </Button>
      </div>
    </div>);
};

export default Memory;
