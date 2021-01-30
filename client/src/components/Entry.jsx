import React from 'react';

const Entry = () => {
  return (

    <div className="col-12 col-lg-6 offset-lg-3">
      <div>
        <input className="form-control" placeholder="Journal Entry Title" />
      </div>
      <div>
        <textarea className="form-control" placeholder="Journal Entry Post">
        </textarea>

      </div>
  <div>
    <button className="btn btn-primary float-right">Submit!</button>
  </div>
</div>
)
};

export default Entry;