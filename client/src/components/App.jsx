import React, { Component } from 'react';
import Entry from './Entry.jsx';
import Memory from './Memory.jsx';
import Feed from './Feed.jsx';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import css from './style.css';
import { AppBar, Button } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      quoteText: '',
      quoteAuthor: '',
      login: false,
      view: 'feed',
      entries: [],
      memory: null,
    };

    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.getRandomMemory = this.getRandomMemory.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  //change views depending on what you click
  changeView(option) {
    this.setState({
      view: option,
    });
  }

  // get random quote for home page
  getRandomQuote() {
    axios.get('/api/quotes')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length + 1);
        this.setState({
          quoteText: data[randomIndex].text,
          quoteAuthor: data[randomIndex].author
        });
        const { quoteAuthor } = this.state;
        if (quoteAuthor === null) {
          this.setState({ quoteAuthor: 'Anonymous' });
        }
      }).catch((err) => console.error(err));
  }

  // get random memory for memory page
  getRandomMemory() {
    axios.get('/api/journals')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        this.setState({
          memory: data[randomIndex]
        });
      }).catch((err) => console.error(err));
  }

  // render view based on nav
  renderView() {
    const { view, entries, quoteText, quoteAuthor, memory } = this.state;
    if (view === 'feed') {
      return <Feed entries={entries}
        quoteText={quoteText}
        quoteAuthor={quoteAuthor}/>;
    } else if (view === 'entry') {
      return <Entry logout={this.logout}/>;
    } else if (view === 'memory') {
      return (<div>
        {memory ?
          <Memory logout={this.logout} memory={memory} changeMemory={ this.getRandomMemory }/> : <div className='text wrap'
            style={{display: 'flex', flexDirection: 'column', align: 'center', justify: 'center', alignItems: 'center'}}>
            <img src="https://content.invisioncic.com/r143258/monthly_2016_01/b5b2b1603073cc426b410d1ba620685d.jpg.28d5f653fbeaef692ba8a5f70aaf1f44.jpg"/>
            <h1><i>Ruh roh!</i></h1>
            <h3>It looks like you don't have any memories yet.
          Write an entry to view a random memory.</h3>
          </div>
        }
      </div>);
    }
  }

  componentDidMount() {
    this.getRandomQuote();
    this.getRandomMemory();
    this.renderView();
    axios.get('/isloggedin')
      .then(({ data }) =>
        this.setState({
          login: data
        }))
      .catch((err) => console.warn(err));

  }

  logout(bool) {
    this.setState({
      login: bool
    });
  }

  render() {
    const { login, view } = this.state;

    return (
      <div>

        {
          !login
            ? <div>
              <img className='background' src='https://i.ibb.co/WWs7MZd/headstrong-girl-blue.jpg'/>
              <div className='loginMain'>
                <div className="text">
                  <h1>Welcome To HeadStrong!</h1>
                  <h3>A stress-free, judgment free zone for you to get your thoughts out</h3>
                  <h2></h2>

                </div>
              </div>

              <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
              <div className='footer'>
                <div className='logo2'>
                      HeadStrong
                </div>
                <div className='footer-text'>
                    Since 2021
                </div>
              </div>
            </div>
            :
            <div>
              <AppBar>
                <div className='logo'>
                  HeadStrong
                </div>
                <div>
                  <div className='nav'>

                    <div className={
                      (view === 'feed') ? 'currentButton' : 'button'}>
                      <Button
                        className='Button'
                        onClick={() => this.changeView('feed')}>Home</Button>
                    </div>

                    <div className={
                      (view === 'entry') ? 'currentButton' : 'button'}>
                      <Button
                        className='Button'
                        onClick={() => this.changeView('entry')}>Write Entry</Button>
                    </div>

                    <div className={
                      (view === 'memory') ? 'currentButton' : 'button'}>
                      <Button
                        className='Button'
                        onClick={() => this.changeView('memory')}>Memory</Button>
                    </div>

                    <div className={
                      (view === 'logout') ? 'currentButton' : 'button'}>
                      <Button
                        className='Button'
                        onClick={() => axios.delete('/logout')
                          .then(({ data }) => this.logout(data))
                          .catch((err) => console.warn(err))}
                      >Logout</Button>
                    </div>
                  </div>

                </div>
              </AppBar>

              <div>
                <img className='background' src='https://i.ibb.co/WWs7MZd/headstrong-girl-blue.jpg'/>
                <div className='footer'>
                  <div className='logo2'>
                      HeadStrong
                  </div>
                  <div className='footer-text'>
                    Since 2021
                  </div>
                </div>

                <div className='main'>
                  {this.renderView()}
                </div>

              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;
