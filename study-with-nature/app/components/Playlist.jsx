import React from 'react';
import useGeneratePlaylistItems from '../hooks/useGeneratePlaylistItems';

const Playlist = ({ soundIndex, playSelectedSound, sounds }) => {
  const soundItems = useGeneratePlaylistItems(soundIndex, playSelectedSound, sounds);

  return (
    <div className="hidden lg:block lg:bg-[#eff2f6b5] lg:w-full lg:h-80 lg:overflow-y-scroll lg:no-scrollbar lg:rounded-lg">
      <ul id="desktop-sounds-list" className="divide-y divide-[#938E8E]">{soundItems}</ul>
    </div>
  )
}

export default Playlist