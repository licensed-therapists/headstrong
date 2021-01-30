import React from 'react';
import Entry from './Entry.jsx';
import Quote from './MotivationalQuote.jsx';
import Header from './Header.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {title, body } = this.state;
    //need to return axios.post here
    /*return axios.post('http://localhost:8000/api/articles', {
      title,
      body,
      author,
    });
    */
  }
  render() {
    return (
      <div>
        <Header />
        <h1>Welcome to HeadStrong!</h1>
        <Quote />
        <Entry />
      </div>
    );
  }





}

// return (

//)






export default App;
