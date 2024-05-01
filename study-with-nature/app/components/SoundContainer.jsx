"use client";

import React, { useState, useRef, useEffect } from 'react';

import sounds from '../data/sounds';

import Playlist from './Playlist';
import MediaPlayer from './MediaPlayer';

const SoundContainer = () => {
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const soundRef = useRef();

  const selectedSound = sounds[selectedSoundIndex];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectedSound = (index) => {
    setSelectedSoundIndex(index);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    let newSoundIndex = selectedSoundIndex;
    if (selectedSoundIndex === 0) {
      newSoundIndex = sounds.length - 1;
    } else {
      newSoundIndex -= 1;
    }
    handleSelectedSound(newSoundIndex);
    setIsPlaying(true);
  };

  const playNext = () => {
    let newSoundIndex = selectedSoundIndex;
    if (selectedSoundIndex === sounds.length - 1) {
      newSoundIndex = 0;
    } else {
      newSoundIndex += 1;
    }
    handleSelectedSound(newSoundIndex);
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
  }, [selectedSoundIndex, soundRef, isPlaying, volume]);

  return (
    <div className="flex flex-row gap-12">
      <MediaPlayer {...{selectedSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange}} />
      <Playlist {...{selectedSoundIndex, handleSelectedSound, sounds}} />
    </div>
  )
}

export default SoundContainer