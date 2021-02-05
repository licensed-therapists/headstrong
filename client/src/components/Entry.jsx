/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Slider } from '@material-ui/core';
import { Typography } from '@material-ui/core/Typography';
import {SentimentSatisfiedAltIcon} from '@material-ui/icons/SentimentSatisfiedAlt';
import {SentimentVeryDissatisfiedIcon} from '@material-ui/icons/SentimentVeryDissatisfied';

class Entry extends Component {
  constructor(props) {
    super(props);

    let _isMounted = false;

    this.state = {
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

    const { title, blog, journalImage, temp, weatherDescription } = this.state;
    const mark = [
      {
        value: 0,
        label: 'sad'
      },
      {
        value: 50,
        label: 'neutral'
      },
      {
        value: 100,
        label: 'happy'
      }
    ];

    return (
      <div className="text">

        <form>
          <div className="weather">Currently {temp} and {weatherDescription}</div>
          <div>
            <textarea className="form-control"
              placeholder="Journal Entry Title"
              value={title}
              onChange={this.handleTitleChange}/>
          </div>
          <br></br>
          <div>
            <textarea className="form-control"
              placeholder="Journal Entry Post"
              value={blog}
              onChange={this.handlePostChange}/>
          </div>
          <br></br>
          <div>
            <textarea className="form-control"
              placeholder="Insert image URL"
              value={journalImage}
              onChange={this.handleImageChange}/>
          </div>
          <button className="urlButton" onClick={() => this.handleSubmit()}>Submit</button>
          {
            journalImage.length ? <img style={{ height: '200px', width: '300px'}} src={ journalImage } /> : null
          }

        </form>

        <div> <h3>What's your mood like today?</h3>
          <div style={{width: 300, margin: 30}}>
            <Slider
              // color="green"
              defaultValue={50}
              max={100}
              marks={mark}
              step={25}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Entry;
