import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

import useGeneratePlaylistItems from '../hooks/useGeneratePlaylistItems';

const MobilePlaylist = ({ selectedSoundIndex, handleSelectedSound, sounds, closeMobileMenu }) => {
  const soundItems = useGeneratePlaylistItems(selectedSoundIndex, handleSelectedSound, sounds);

  const handleOnClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
  };

  return (
    <div id="mobile-sounds-menu" className="block w-9/12 h-full fixed z-[1] top-0 left-1/4 overflow-x-hidden duration-[0.5s] bg-[#eff2f6] lg:hidden">
      <a href="#" className="closeBtn" onClick={(e) => handleOnClick(e)}>
        <ArrowLeftIcon className="w-10 p-1 text-black" />
      </a>
      <div className="w-full">
        <ul className="mt-0 pl-0 [&>*:nth-child(1n)]:border-t-[1px] [&>*:nth-child(1n)]:border-t-[#938E8E]" id="mobile-sounds-list">{soundItems}</ul>
      </div>
    </div>
  )
}

export default MobilePlaylist