/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';

class Entry extends Component {
  constructor(props) {
    super(props);
    // const {title, blog, journalImage} = this.props;

    this.state = {
      username: '',
      title: '',
      blog: '',
      journalImage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handlePostChange(e) {
    this.setState({ blog: e.target.value });
  }

  handleSubmit() {
    const { username, title, blog, journalImage } = this.state;
    axios.post('/api/journals', {
      username: username,
      title: title,
      blog: blog,
      journal_image: journalImage,
      time_stamp: new Date()
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    const { username, title, blog, journalImage } = this.state;

    return (

      <div className="col-12 col-lg-6 offset-lg-3">

        <form>
          <div>
            <input className="form-control"
              placeholder="Journal Entry Title"
              value={title}
              onChange={this.handleTitleChange}/>
          </div>

          <div>
            <textarea className="form-control"
              placeholder="Journal Entry Post"
              value={blog}
              onChange={this.handlePostChange}>
            </textarea>
          </div>

          <div>
            <button className="btn btn-primary float-left">Upload Photo</button>
            <button className="btn btn-primary float-right" onClick={() => this.handleSubmit()}>Submit!</button>
          </div>

        </form>
      </div>
    );

  }
}

export default Entry;
