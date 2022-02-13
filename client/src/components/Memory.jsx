import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import NoMemory from './NoMemory.jsx';

const Memory = () => {

  const [memories, setMemories] = useState([]);
  const [memory, setMemory] = useState({});

  const {
    id,
    username,
    title,
    blog,
    journalImage,
    createdAt,
    temp,
    weatherDescription,
    mood } = memory;

  const timeStamp = moment(createdAt).format('MMM Do YY');

  const getMemories = () => {
    axios.get('/api/journals')
      .then(({ data }) => setMemories(data))
      .catch((err) => console.error('cannot get memories', err));
  };

  const randomIndex = Math.floor(Math.random() * memories.length + 1);
  const getRandomMemory = () => {
    setMemory(memories[randomIndex]);
  };

  const deleteEntry = (id) => {
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
    getMemories();
    if (memories.length) {
      getRandomMemory();
    }
  }, []);

  // return <NoMemory />
  return !memories.length
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
          onClick={() => deleteEntry(memories[randomIndex].id)}>
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
