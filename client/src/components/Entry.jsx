/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';

class Entry extends Component {
  constructor(props) {
    super(props);

    // let _isMounted = false;

    this.state = {
      username: '',
      title: '',
      blog: '',
      journalImage: '',
      latitude: 0,
      longitude: 0,
      temp: '',
      weatherIcon: '',
      weatherDescription: '',

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.getWeatherByUserLocation = this.getWeatherByUserLocation.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  // get user's geolocation for weather
  getUserLocation() {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      // console.log('Latitude is : ', latitude);
      // console.log('Longitude is : ', longitude);
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
    });
  }

  // get weather using geolocation
  getWeatherByUserLocation() {
    // this._isMounted = true;

    axios.post('/api/weather', {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })
      .then(({ data: { temp, weather } }) => {
        // this._isMounted = false;
        const { icon, description } = weather;
        // change temperature to fahrenheit
        temp = Math.round(temp * (9 / 5) + 32);
        this.setState({
          temp: `${temp}°F`,
          weatherIcon: icon,
          weatherDescription: description
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getUserLocation();
    this.getWeatherByUserLocation();
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
    const { username, title, blog, journalImage, temp, weatherIcon, weatherDescription } = this.state;
    axios.post('/api/journals', {
      username: username,
      title: title,
      blog: blog,
      journal_image: journalImage,
      temp: temp,
      weatherIcon: weatherIcon,
      weatherDescription: weatherDescription
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
            <button className="btn btn-primary float-left" onClick={() => this.handleSubmit()}>Submit</button>
            <input value={ journalImage } placeholder="insert image url" className="btn btn-primary float-right" onChange={(e) => this.handleImageChange(e)}/>
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
