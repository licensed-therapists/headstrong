import React from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';

const Memory = ({memory}) => {

  const { id, username, title, blog, journalImage, createdAt, temp, weatherDescription } = memory;

  const timeStamp = moment(createdAt).format('MMM Do YY');
  // if no memory, show text directive to write a post!
  return (
    <div className='text wrap' key={id}>
      <div><i>Your memory from {timeStamp} | It was {temp} and {weatherDescription}</i></div>
      <br></br>
      <div><h2>{title}</h2></div>
      <div><p>{blog}</p></div>
      <br></br>
      <div><img src={journalImage} alt="Memory Image" width="400px" height="auto" overflow="hidden"/></div>
      <div>
        <Button
          className='Button'
          onClick={() => {}}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Memory;
