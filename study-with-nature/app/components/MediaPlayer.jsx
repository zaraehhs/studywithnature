"use client";

import React, { useState, useRef, useEffect } from 'react';

import soundData from '../soundData';

import DisplayMedia from './DisplayMedia';
import Controls from './Controls';

const MediaPlayer = () => {
  const [soundIndex, setSoundIndex] = useState(0);
  const [currentSound, setCurrentSound] = useState(soundData[soundIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const soundRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playPrevious = () => {
    let newSoundIndex = soundIndex;
    if (soundIndex === 0) {
      newSoundIndex = soundData.length - 1;
    } else {
      newSoundIndex -= 1;
    }
    setSoundIndex(newSoundIndex);
    setCurrentSound(soundData[newSoundIndex]);
    setIsPlaying(true);
  };

  const playNext = () => {
    let newSoundIndex = soundIndex;
    if (soundIndex === soundData.length - 1) {
      newSoundIndex = 0;
    } else {
      newSoundIndex += 1;
    }
    setSoundIndex(newSoundIndex);
    setCurrentSound(soundData[newSoundIndex]);
    setIsPlaying(true);
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
    }
  }, [soundIndex, soundRef, isPlaying, volume]);

  return (
    <div className="flex flex-col relative">
      <DisplayMedia {...{currentSound, soundRef}} />
      <Controls {...{currentSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange}} />
    </div>
  )
}

export default MediaPlayer