import React from 'react';
import moment from 'moment';

const Memory = ({memory}) => {

  const { id, username, title, blog, journalImage, createdAt, temp, weatherDescription } = memory;
  const timeStamp = moment(createdAt).format('MMM Do YY');

  return (

    <div className='text' key={id}>
      <div><i>Your memory from {timeStamp} | It was {temp} and {weatherDescription}</i></div>
      <div>{title}</div>
      <div>{blog}</div>
      <div><img src={journalImage} alt="Memory Image" width="400px" height="auto" overflow="hidden"/></div>
    </div>);
};

export default Memory;
