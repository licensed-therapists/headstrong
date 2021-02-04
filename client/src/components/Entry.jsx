/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
class Entry extends Component {
  constructor(props) {
    super(props);

    let _isMounted = false;

    this.state = {
      username: '',
      title: '',
      blog: '',
      journalImage: '',
      latitude: 0,
      longitude: 0,
      temp: '',
      weatherDescription: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.getWeatherByUserLocation = this.getWeatherByUserLocation.bind(this);
    this.getWeatherByUserInput = this.getWeatherByUserInput.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  // get user's location by ip address
  getUserLocation() {
    //get user's ip address
    return axios.get('https://api.ipify.org')
    // get location data by ip address
      .then(({ data }) => axios.post('/api/location', { ip: data }))
      .then(({ data: { latitude, longitude } }) => {
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
        this.getWeatherByUserLocation(latitude, longitude);
      })
      .catch((err) => console.warn(err));
  }

  // get weather using geolocation
  getWeatherByUserLocation(latitude, longitude) {
    this._isMounted = true;
    axios.post('/api/weather', { latitude, longitude })
      .then(({ data: { data } }) => {
        this._isMounted = false;
        const { temp, weather } = data[0];
        const { description } = weather;
        const descriptionLowerCase = description.toLowerCase();
        // change temperature to fahrenheit
        let newTemp = Math.round(temp * (9 / 5) + 32);
        this.setState({
          temp: `${newTemp}°F`,
          weatherDescription: descriptionLowerCase
        });
      })
      .catch((err) => console.warn(err));
  }

  componentDidMount() {
    this.getUserLocation();
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handlePostChange(e) {
    this.setState({ blog: e.target.value });
  }

  handleImageChange(e) {
    this.setState({ journalImage: e.target.value });
  }

  handleSubmit() {
    const { username, title, blog, journalImage, temp, weatherDescription } = this.state;
    axios.post('/api/journals', {
      username: username,
      title: title,
      blog: blog,
      journalImage: journalImage,
      temp: temp,
      weatherDescription: weatherDescription
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  render() {
    const { username, title, blog, journalImage, temp, weatherDescription } = this.state;

    return (

      <div className="col-12 col-lg-6 offset-lg-3">

        <form>
          <div className="weather">Currently {temp} and {weatherDescription}</div>
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
            <input value={ journalImage } placeholder="insert image url" className="btn btn-primary float-right" onChange={this.handleImageChange}/>
            <button className="btn btn-primary float-left" onClick={() => this.handleSubmit()}>Submit</button>
          </div>
          {
            journalImage.length ? <img style={{ height: '200px', width: '300px'}} src={ journalImage } /> : null
          }

        </form>
      </div>
    );
  }
}

export default Entry;
