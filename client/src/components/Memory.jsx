import React from 'react';

const Memory = ({memory}) => {

  const { id, username, title, blog, journalImage, timeStamp } = memory;
  return (
    <div key={id}>
      <div>{title}</div>
      <div>{blog}</div>
      <div>{journalImage}</div>
      <div>{timeStamp}</div>
    </div>);
};

export default Memory;
