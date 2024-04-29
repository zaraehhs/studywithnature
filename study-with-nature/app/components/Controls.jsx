import React from 'react';

import AudioButtons from './AudioButtons';
import VolumeSlider from './VolumeSlider';

const Controls = ({ currentSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange }) => {
  return (
    <div>
      <audio loop src={currentSound.url} ref={soundRef}></audio>
      <AudioButtons {...{isPlaying, togglePlayPause, playPrevious, playNext}} />
      <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange} />
    </div>
  )
}

export default Controls