import React from 'react';

const Quote = ({ quoteText, quoteAuthor }) => {
  return (
    <div>
      <h3>{quoteText} -{quoteAuthor}</h3>
    </div>
  );
};

export default Quote;
