"use client";

import React, { useContext, useEffect } from 'react';
import Image from 'next/image';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

import SoundContext from '../contexts/SoundContext';
import MenuContext from '../contexts/MenuContext';

const Playlist = () => {
  const { soundIndex, handleSelectedSound, sounds } = useContext(SoundContext);
  const { isMenuVisible, openMobileMenu, closeMobileMenu } = useContext(MenuContext);

  const soundItems = () => {
    return sounds.map((sound, index) =>
      <li key={index}
        className={`flex flex-row pt-4 pb-4 pl-5 hover:bg-[#a1a1a199] last:border-b-[1px] last:border-b-[#938E8E] ${soundIndex === index ? 'bg-[#a1a1a199]' : 'bg-[#eff2f6b5]'}`} onClick={() => handleSelectedSound(index)}>
        <Image className="h-12 box-border rounded-lg mr-4 shadow-lg" width={50} height={50} src={sounds[index].imgUrl} alt={sounds[index].imgAlt} />
        <div className="flex flex-col justify-center">
          <p className="text-black leading-3">{sounds[index].title}</p>
          <p className="text-sm opacity-80 text-black">{sounds[index].subtitle}</p>
        </div>
      </li>
    );
  };

  const handleOpenMobileMenu = () => {
    // TODO: add blur properties to background when mobile menu is opened
  };

  const handleCloseMobileMenu = (e) => {
    // TODO: remove blur properties when mobile menu is closed
  };

  const handleOnClick = (e) => {
    const mobileSoundsMenu = document.getElementById('mobile-sounds-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeBtn = document.getElementById('closebtn');
    if (e.target !== mobileSoundsMenu && e.target !== closeBtn && e.target !== menuIcon) {
      e.preventDefault(e);
      closeMobileMenu();
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      handleOpenMobileMenu();
      document.addEventListener('click', handleOnClick);
      return () => {
          document.removeEventListener('click', handleOnClick);
      };
    } else {
      handleCloseMobileMenu();
    }
  }, [isMenuVisible]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block lg:bg-[#eff2f6b5] lg:w-full lg:h-[350px] lg:overflow-y-scroll lg:no-scrollbar lg:rounded-lg">
        <ul id="desktop-sounds-list" className="divide-y divide-[#938E8E]">{soundItems()}</ul>
      </div>
      {/* Mobile */}
      <button className="lg:hidden" onClick={openMobileMenu}>
        <Bars3Icon className="w-8 block" id="menu-icon"/>
      </button>
      <div id="mobile-sounds-menu" className={`${isMenuVisible ? 'block w-9/12 h-full fixed z-[1] top-0 left-1/4 overflow-x-hidden duration-[0.5s] bg-[#eff2f6]' : 'hidden'} lg:hidden`}>
        <a href="#" id="closeBtn" onClick={(e) => {e.preventDefault(e); closeMobileMenu}}>
          <ArrowLeftIcon className="w-10 p-1 text-black" />
        </a>
        <div className="w-full">
          <ul className="mt-0 pl-0 [&>*:nth-child(1n)]:border-t-[1px] [&>*:nth-child(1n)]:border-t-[#938E8E]" id="mobile-sounds-list">{soundItems()}</ul>
        </div>
      </div>
    </>
  )
}

export default Playlist