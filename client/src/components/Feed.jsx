import React from 'react';

const Feed = ({quoteText, quoteAuthor, entries}) => {
  return (
    <div>
      <div>
        <h3>{quoteText} -{quoteAuthor}</h3>
      </div>
      <div>
        <h1>Recent Journal Entries</h1>
      </div>
      <div>
        { entries.map(entry => {
          const { id, username, title, blog, journalImage, timeStamp } = entry;
          return (
            <div className='entry-row' key={id}>
              <div class='entry-data'>{title}</div>
              <div class='entry-data'>{blog}</div>
              <div class='entry-data'>{journalImage}</div>
              <div class='entry-data'>{timeStamp}</div>
            </div>);
        })
        }
      </div>
    </div>
  );
};

export default Feed;

