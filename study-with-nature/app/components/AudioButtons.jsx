import React from 'react';
import { BackwardIcon, PlayIcon, PauseIcon, ForwardIcon } from '@heroicons/react/24/solid';

const AudioButtons = ({ isPlaying, togglePlayPause, playPrevious, playNext }) => {
  return (
    <div className="flex flex-row justify-between mt-6 text-center self-stretch">
      <button onClick={playPrevious}><BackwardIcon className="w-10 p-0" /></button>
      <button onClick={togglePlayPause}>{ isPlaying ? <PauseIcon className="w-10 p-0" /> : <PlayIcon className="w-10 p-0" /> }</button>
      <button onClick={playNext}><ForwardIcon className="w-10 p-0" /></button>
    </div>
  )
}

export default AudioButtons