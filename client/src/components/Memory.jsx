import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import NoMemory from './NoMemory.jsx';

const Memory = ({ entries, getAllMemories }) => {

  const [memories, setMemories] = useState(entries);
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

  const getRandomMemory = () => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    memories.length
      ? setMemory(memories[randomIndex])
      : <NoMemory />
  };

  const deleteEntry = (id) => {
    axios.delete(`/api/journals/${id}`)
      .then(getAllMemories)
      .then(getRandomMemory)
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getRandomMemory();
  }, []);

  return !memories.length
    ? <NoMemory />
    : (
      <div className='text wrap' key={id}>
        <h2>Welcome back, {username}</h2>
        <div>
          <i>Your memory from {timeStamp} | It was {temp} and {weatherDescription} and you were feeling {mood}% happy!</i>
        </div>
        <div>
          <h2>{title}</h2>
          </div>
        <div>
          <p>{blog}</p>
        </div>
        <div>
          { journalImage
          ? (<img
              style={{ height: 'auto', width: '300px'}}
              src={journalImage}
              alt="Memory Image"
              width="400px"
              height="auto"
              overflow="hidden"
            />)
          : null }
          </div>
        <div>
          <Button
            className='Button'
            style={{ color: 'white' }}
            onClick={() => deleteEntry(memory.id)}>
            <DeleteIcon/>
          </Button>
          <Button
            className='Button'
            style={{ color: 'white', fontFamily: 'Roboto' }}
            onClick={() => getRandomMemory()}>
            View Another Memory
          </Button>
        </div>
      </div>);
};

export default Memory;
