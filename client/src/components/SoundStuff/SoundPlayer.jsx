import React, { useEffect } from 'react';

const SoundPlayer = ({ soundFile }) => {
  useEffect(() => {
    let sound = new Audio(soundFile);

    const playSoundRandomly = () => {
      const randomTime = Math.floor(Math.random() * (90000 - 20000 + 1) + 20000);
      setTimeout(() => {
        sound.play();
      }, randomTime);
    };

    playSoundRandomly();

    return () => {
      sound.pause();
      sound = null;
    };
  }, []);

  return null;
};

export default SoundPlayer;
