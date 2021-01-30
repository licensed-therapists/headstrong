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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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

  componentDidMount() {
    this.getRandomQuote();
  }

  render() {
    const { quoteText, quoteAuthor } = this.state;

    return (
      <div>
        <Header />
        <h1>Welcome to HeadStrong!</h1>
        <Quote quoteText={quoteText} quoteAuthor={quoteAuthor}/>
        <Entry />
      </div>
    );
  }





}

// return (

//)






export default App;
