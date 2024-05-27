import React from 'react';
import { SpeakerXMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

import '../styles/media-player.css';

const VolumeSlider = ({ volume, handleVolumeChange }) => {
  return (
    <div className="hidden lg:flex lg:flex-row lg:items-center lg:mt-2.5">
      <SpeakerXMarkIcon className="w-10 p-0" />
      <input 
        id="volume-input" 
        className="shadow-lg" 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume} 
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))} 
      />
      <SpeakerWaveIcon className="w-10 p-0" />
    </div>
  )
}

export default VolumeSlider