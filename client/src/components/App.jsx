import React, { useState, useEffect } from 'react';
import Entry from './Entry.jsx';
import Memory from './Memory.jsx';
import Feed from './Feed.jsx';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import css from './style.css';
import { AppBar, Button } from '@material-ui/core';

const App = () => {
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [login, setLogin] = useState(false);
  const [view, setView] = useState('feed');
  const [entries, setEntries] = useState([]);

  // change views depending on what you click
  const changeView = (option) => setView(option);

  const getAllMemories = () => {
    axios.get('/api/journals')
      .then(({ data }) => setEntries(data))
      .catch((err) => console.error('cannot get journals', err));
  };

  // get random quote for home page
  const getRandomQuote = () => {
    axios.get('/api/quotes')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length + 1);
        const { text, author } = data[randomIndex];
        setQuoteText(text);
        !author ? setQuoteAuthor('Anonymous') : setQuoteAuthor(author);
      })
      .catch((err) => console.error('error getting random quote', err));
  };

  // render view based on nav
  const renderView = () => {
    // const { view, entries, quoteText, quoteAuthor, memory } = this.state;
    if (view === 'feed') {
      return <Feed entries={entries}
        quoteText={quoteText}
        quoteAuthor={quoteAuthor}/>;
    } else if (view === 'entry') {
      return <Entry logout={logout}/>;
    } else if (view === 'memory') {
      return <Memory entries={entries} getAllMemories={getAllMemories}/>;
    }
  };

  const isLoggedIn = () => {
    axios.get('/isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn('error checking isLoggedIn', err));
  };

  const logout = (bool) => setLogin(bool);

  useEffect(() => {
    renderView();
    isLoggedIn();
    getAllMemories();
    getRandomQuote();
  }, []);

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
              <div className='logo2'>HeadStrong</div>
              <div className='footer-text'>Since 2021</div>
            </div>
          </div>
          :
          <div>
            <AppBar>
              <div className='logo'>HeadStrong</div>
              <div>
                <div className='nav'>
                  <div className={(view === 'feed') ? 'currentButton' : 'button'}>
                    <Button
                      className='Button'
                      onClick={() => changeView('feed')}>Home</Button>
                  </div>

                  <div className={(view === 'entry') ? 'currentButton' : 'button'}>
                    <Button
                      className='Button'
                      onClick={() => changeView('entry')}>Write Entry</Button>
                  </div>

                  <div className={(view === 'memory') ? 'currentButton' : 'button'}>
                    <Button
                      className='Button'
                      onClick={() => changeView('memory')}>Memory</Button>
                  </div>

                  <div className={(view === 'logout') ? 'currentButton' : 'button'}>
                    <Button
                      className='Button'
                      onClick={() => axios.delete('/logout')
                        .then(({ data }) => logout(data))
                        .catch((err) => console.warn(err))}
                    >Logout</Button>
                  </div>
                </div>

              </div>
            </AppBar>

            <div>
              <img className='background' src='https://i.ibb.co/WWs7MZd/headstrong-girl-blue.jpg'/>
              <div className='footer'>
                <div className='logo2'>HeadStrong</div>
                <div className='footer-text'>Since 2021</div>
              </div>

              <div className='main'>{renderView()}</div>

            </div>
          </div>
      }
    </div>
  );
};

export default App;
