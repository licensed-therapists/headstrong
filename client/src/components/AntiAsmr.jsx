import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SoundCloudWidget = () => {

  const clientID = 'vvWDsm284DNe9CDlRlfb3wuseloIl1RS'
  const authToken = ''
  const accessToken = '2-294009-1258699462-WzGMcgsx9T3Ed'
  const [recentMood, setRecentMood] = useState(null);
  const [favSound, setFavSound] = useState(null)

  const boarnana = '1526241481'

  //not usefull but good for me to know which is which
  const clipsObject = {
    bird: '1526375440',

    balloonClip: '1526385292',

    boostedRamenClip: '1526385283',

    dryEraseBoard: '1526385259',

    forkPot: '1526385250',

    macNCheeseClip: '1526385226',

    nailsOnChalkboard: '1526385211',

    sleepMusicClip: '1526385187',

    styrofoamClip: '1526385172',

    vacuumCleanerClip: '1526385151',
    
    ptRadio: '1526473978'
  }

  const clipsArray = Object.values(clipsObject)
//                      bird            ramen         mac           nails         vac
  const upperMoons = ['1526375440', '1526385283', '1526385226', '1526385211', '1526385151' ]
  
  const lowerMoons = ['1526385292', '1526385259', '1526385250', '1526385187', '1526385172', '1526473978']

  

  const [randomClip, setRandomClip] = useState(() => {
    const randomIndex = Math.floor(Math.random() * clipsArray.length);
    return clipsArray[randomIndex];
  });

  const handleRefresh = () => {
    const randomIndex = Math.floor(Math.random() * clipsArray.length);
    setRandomClip(clipsArray[randomIndex]);
    
  };

  
console.log(recentMood)

const fetchUserMood = () => {
  axios.get('/api/journals')
    .then(response => {
      const data = response.data;
      const mood = data[data.length - 1].mood;
      setRecentMood(mood);
      //console.log(data[data.length - 1]);
    })
    .catch(error => {
      console.error('Error fetching recent mood:', error);
    });
};

const fetchUserFav = () => {
  axios.get('/api/journals')
    .then(response => {
      const data = response.data;
      if (data[data.length - 1].favSounds === null) {
        alert('Please favorite a sound first')
      } else {
        setRandomClip(data[data.length - 1].favSounds)
      }
    })
    .catch(error => {
      console.error('Error fetching recent mood:', error);
    });
};

const updateFavSound = () => {
  axios.get('/api/journals')
    .then(response => {
      const recentMood = response.data[response.data.length - 1];
      const ID = recentMood.id;
      const newFavSound = randomClip; // Use the current randomClip as the new value for favSounds

      axios.put(`/api/journals/${ID}`, { favSounds: newFavSound })
        .then(response => {
          console.log('Favorite sound updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating favorite sound:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching recent mood:', error);
    });
};



useEffect(() => {
  fetchUserMood();
})


  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome back</h2>
      <div style={{ marginBottom: '20px' }}>
        <i>Enjoy some vexatious Anti-ASMR 🤗</i>
      </div>
      <div style={{ margin: '0 auto', maxWidth: '100%' }}>
        <iframe
          id="soundcloud-widget"
          width="150%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${randomClip}&amp;auto_play=true&amp;color=%230066CC&amp;buying=true&amp;sharing=true&amp;download=true&amp;show_artwork=true&amp;show_playcount=true&amp;show_user=true`}
        ></iframe>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
      <button className="urlButton" style={{ width: '150px' }} onClick={handleRefresh}>Refresh</button>
      <button className="urlButton" style={{ width: '150px' }} onClick={updateFavSound}>I Hated This ❤️</button>
      <button className="urlButton" style={{ width: '150px' }} onClick={fetchUserFav}>Get my Fav sound!</button>
    </div>
    </div>
  );
};

export default SoundCloudWidget;
