import React from 'react';
import Entry from './Entry.jsx';
import Memory from './Memory.jsx';
//import Header from './Header.jsx';
import Feed from './Feed.jsx';
import axios from 'axios';
import GoogleButton from 'react-google-button';

class App extends React.Component {
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
      latitude: '',
      longitude: ''
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.getRandomMemory = this.getRandomMemory.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getWeatherByUserLocation = this.getWeatherByUserLocation.bind(this);
  }

  // get user's geolocation for weather
  getWeatherByUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    })
      .then(axios.get('/api/weather', {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }))
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
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
        if (quoteAuthor === null || quoteAuthor === 'Donald Trump') {
          this.setState({ quoteAuthor: 'Anonymous' });
        }
      }).catch((err) => console.error(err));
  }

  getRandomMemory() {
    axios.get('/api/journals')
      .then(({ data }) => {
        const randomIndex = Math.floor(Math.random() * data.length + 1);
        console.log('LOOK HERE*******', data[randomIndex]);
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
      return <Entry />;
    } else if (view === 'memory') {
      return <Memory memory={memory} />;
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

  logout(data) {
    this.setState({
      login: data
    });
  }

  render() {
    const { quoteText, quoteAuthor, login, view} = this.state;

    return (

      <div>
        <div className='nav'>
          <span className='logo'>HeadStrong</span>
          <span
            className={
              view === 'feed'
                ? 'nav-selected'
                : 'nav-unselected'}
            onClick={() => this.changeView('feed')}
          >
        Home
          </span>
          <span
            className={view === 'entry' ? 'nav-selected' : 'nav-unselected'}
            onClick={() => this.changeView('entry')}
          >
        Write Entry
          </span>
          <span
            className={view === 'memory' ? 'nav-selected' : 'nav-unselected'}
            onClick={() => this.changeView('memory')}
          >
        Memory
          </span>
        </div>

        <div className='main'>
          { this.renderView()}

        </div>
        {/* {
          login ?
            <div>
              <Header logout={this.logout}/>
              <h1>Welcome to HeadStrong!</h1>
              <Quote quoteText={quoteText} quoteAuthor={quoteAuthor}/>
              <Entry /> </div> : <a href="/auth/google"> <GoogleButton /></a>
        } */}
      </div>
    );
  }





}

// return (

//)






export default App;
