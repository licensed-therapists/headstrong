/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Slider } from '@material-ui/core';
import { Typography } from '@material-ui/core/Typography';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';


const Entry = () => {
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState('');
  const [journalImage, setJournalImage] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [temp, setTemp] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [mood, setMood] = useState(50);

  // get user's location by ip address
  const getUserLocation = () => {
    //get user's ip address
    return axios.get('https://api.ipify.org')
      .then(({ data }) => axios.post('/api/location', { ip: data }))
      .then(({ data: { latitude, longitude } }) => {
        setLatitude(latitude);
        setLongitude(longitude);
      })
      .then(getWeatherByUserLocation(latitude, longitude))
      .catch((err) => console.warn('error getting location', err));
  };

  // get weather using geolocation
  const getWeatherByUserLocation = (latitude, longitude) => {
    axios.post('/api/weather', { latitude, longitude })
      .then(({ data: { data } }) => {
        const { temp, weather } = data[0];
        const { description } = weather;
        const descriptionLowerCase = description.toLowerCase();
        // change temperature to fahrenheit
        let newTemp = Math.round(temp * (9 / 5) + 32);
        setTemp(`${newTemp}°F`);
        setWeatherDescription(descriptionLowerCase);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePostChange = (e) => {
    setBlog(e.target.value);
  };

  const handleImageChange = (e) => {
    setJournalImage(e.target.value);
  };

  const handleMoodChange = (e, newValue) => {
    // console.info('newValue', newValue);
    setMood(newValue);
  };

  const handleSubmit = () => {
    axios.post('/api/journals', {
      title, blog, journalImage, temp, weatherDescription, mood
    })
      .then((data) => console.info(data))
      .catch((err) => console.warn(err));
  };

  // slider values
  const moodMarker = [
    { value: 50 },
    { value: 100 }
  ];

  // slider styling
  const sliderStyle = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: '#95cff4',
        },
        track: {
          color: 'Aqua'
        },
        rail: {
          color: 'Aquamarine'
        }
      }
    }
  });

  return (
    <div className="text wrap">

      <form>
        <div className="weather">Currently {temp} and {weatherDescription}</div>
        <div>
          <textarea className="form-control"
            placeholder="Give your post a title"
            value={title}
            onChange={handleTitleChange}/>
        </div>
        <br></br>
        <div>
          <textarea className="form-control"
            placeholder="Enter your journal here..."
            value={blog}
            onChange={handlePostChange}/>
        </div>
        <br></br>
        <div>
          <textarea className="form-control"
            placeholder="Paste image URL here"
            value={journalImage}
            onChange={handleImageChange}/>
        </div>
        <button className="urlButton" onClick={handleSubmit}>Submit</button>
        {
          journalImage.length ? <img style={{ height: '200px', width: '300px'}} src={ journalImage } /> : null
        }

      </form>

      <div>
        <h3><center>What's your mood like today?</center></h3>

        <div className="slider" style={{width: 300, marginLeft: 70}}>
          <ThemeProvider theme={sliderStyle}>
            <Grid container className="grid" display="flex" align="center" justify="center" alignItems="center">
              <Grid item>
                <SentimentVeryDissatisfiedIcon/>
              </Grid>
              <Grid item xs={10}>
                <Slider onChange={handleMoodChange} className="slider"
                  value={mood}
                  max={100}
                  marks={moodMarker}
                  step={25}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item>
                <SentimentSatisfiedAltIcon/>
              </Grid>

            </Grid>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Entry;
