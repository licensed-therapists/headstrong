import React from 'react';
import Entry from './Entry.jsx';
import Quote from './MotivationalQuote.jsx';
import Header from './Header.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      quoteText: '',
      quoteAuthor: '',
      login: false
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
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

  componentDidMount() {
    this.getRandomQuote();
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
    const { quoteText, quoteAuthor, login } = this.state;

    return (
      <div>
        {
          login ?
            <div>
              <Header logout={this.logout}/>
              <h1>Welcome to HeadStrong!</h1>
              <Quote quoteText={quoteText} quoteAuthor={quoteAuthor}/>
              <Entry /></div> : <button><a href="/auth/google">Sign In with Google</a></button>
        }
      </div>
    );
  }





}

// return (

//)






export default App;
