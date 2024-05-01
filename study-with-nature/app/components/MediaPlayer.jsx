import React from 'react';

import DisplayMedia from './DisplayMedia';
import Controls from './Controls';

const MediaPlayer = ({ selectedSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange }) => {
  return (
    <div className="flex flex-col relative">
      <DisplayMedia selectedSound={selectedSound} />
      <Controls {...{selectedSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange}} />
    </div>
  )
}

export default MediaPlayer