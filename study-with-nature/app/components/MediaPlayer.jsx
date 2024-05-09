"use client";

import React, { useContext, useState, useRef, useEffect } from 'react';

import SoundContext from '../contexts/SoundContext';
import MenuContext from '../contexts/MenuContext';

import DisplayMedia from './DisplayMedia';
import Controls from './Controls';

const MediaPlayer = () => {
  const { soundIndex, handleSelectedSound, isPlaying, updatePlayStatus, sounds } = useContext(SoundContext);
  const { isMenuVisible, closeMobileMenu } = useContext(MenuContext);
  const [volume, setVolume] = useState(1);

  const soundRef = useRef();

  const selectedSound = sounds[soundIndex];

  const togglePlayPause = () => {
    updatePlayStatus(!isPlaying);
  };

  const playSelectedSound = (index) => {
    handleSelectedSound(index);
  };

  const playPrevious = () => {
    let newSoundIndex = soundIndex;
    if (soundIndex === 0) {
      newSoundIndex = sounds.length - 1;
    } else {
      newSoundIndex -= 1;
    }
    playSelectedSound(newSoundIndex);
  };

  const playNext = () => {
    let newSoundIndex = soundIndex;
    if (soundIndex === sounds.length - 1) {
      newSoundIndex = 0;
    } else {
      newSoundIndex += 1;
    }
    playSelectedSound(newSoundIndex);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  useEffect(() => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.play();
      } else {
        soundRef.current.pause();
      }
      soundRef.current.volume = volume;
      if (isMenuVisible) closeMobileMenu();
    }
  }, [soundIndex, soundRef, isPlaying, volume]);

  return (
    <div className="flex flex-col relative">
      <DisplayMedia selectedSound={selectedSound} />
      <Controls {...{selectedSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange}} />
    </div>
  )
}

export default MediaPlayer