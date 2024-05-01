import React from 'react';

import AudioButtons from './AudioButtons';
import VolumeSlider from './VolumeSlider';

const Controls = ({ selectedSound, soundRef, isPlaying, togglePlayPause, playPrevious, playNext, volume, handleVolumeChange }) => {
  return (
    <div>
      <audio loop src={selectedSound.url} ref={soundRef}></audio>
      <AudioButtons {...{isPlaying, togglePlayPause, playPrevious, playNext}} />
      <VolumeSlider volume={volume} handleVolumeChange={handleVolumeChange} />
    </div>
  )
}

export default Controls