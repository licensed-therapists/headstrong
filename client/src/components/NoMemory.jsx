import React from 'react';

const NoMemory = () => {
  return (
    <div className='text wrap'
      style={{display: 'flex',
        flexDirection: 'column',
        align: 'center',
        justify: 'center',
        alignItems: 'center'}}>
      <img src="https://content.invisioncic.com/r143258/monthly_2016_01/b5b2b1603073cc426b410d1ba620685d.jpg.28d5f653fbeaef692ba8a5f70aaf1f44.jpg"/>
      <h1><i>Ruh roh!</i></h1>
      <h3>It looks like you don't have any memories yet.
      Write an entry to view a random memory.</h3>
    </div>
  );
};

export default NoMemory;
