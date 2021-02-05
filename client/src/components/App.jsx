import React, { Component } from 'react';
import Entry from './Entry.jsx';
import Memory from './Memory.jsx';
//import Header from './Header.jsx';
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

    // this.handleSubmit = this.handleSubmit.bind(this);
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

  getRandomMemory() {
    axios.get('/api/journals')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        // console.log('LOOK HERE*******', data[randomIndex]);
        this.setState({
          memory: data[randomIndex]
        });
      }).catch((err) => console.error(err));
  }

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
          <Memory logout={this.logout} memory={memory} /> : <h1 className='text'>Create an ENTRY</h1>
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
              <img className='background' src='https://www.yesmagazine.org/wp-content/uploads/2018/08/issue-bann-1.jpg'/>
              <div className='loginMain'>
                <div className="text">
                  <h1>Welcome To HeadStrong!</h1>
                  <h3>A stress-free, judgment free zone for you to get your thoughts out</h3>
                  <h2>TRUE!</h2>

                </div>
              </div>

              <a className='loginButton' href="/auth/google"> <GoogleButton /></a>
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
                      (view === 'feed') ? 'currentButton' : 'button'
                    }>
                      <Button

                        onClick={() => this.changeView('feed')}
                      >
        Home
                      </Button>

                    </div>
                    <div className={
                      (view === 'entry') ? 'currentButton' : 'button'
                    }>
                      <Button
                        onClick={() => this.changeView('entry')}
                      >
        Write Entry
                      </Button>

                    </div>
                    <div className={
                      (view === 'memory') ? 'currentButton' : 'button'
                    }>

                      <Button
                        onClick={() => this.changeView('memory')}
                      >
        Memory
                      </Button>
                    </div>
                    <div className={
                      (view === 'logout') ? 'currentButton' : 'button'
                    }>
                      <Button
                        onClick={() => axios.delete('/logout')
                          .then(({ data }) => this.logout(data))
                          .catch((err) => console.warn(err))}
                      >
        logout
                      </Button>
                    </div>
                  </div>

                </div>
              </AppBar>
              <div>
                <img className='background' src='https://www.yesmagazine.org/wp-content/uploads/2018/08/issue-bann-1.jpg'/>
                <div className='main'>
                  { this.renderView()}
                </div>
              </div>
            </div>
        }
      </div>
    );
  }





}

// return (

//)






export default App;
