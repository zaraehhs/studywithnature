"use client";

import { createContext, useState } from 'react';

import sounds from '../data/sounds';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundIndex, setSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectedSound = (index) => {
    setSoundIndex(index);
    setIsPlaying(true);
  };

  const updatePlayStatus = (playStatus) => {
    setIsPlaying(playStatus);
  };

  return (
    <SoundContext.Provider value={{ soundIndex, handleSelectedSound, isPlaying, updatePlayStatus, sounds }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;