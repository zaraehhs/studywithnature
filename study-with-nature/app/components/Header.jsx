"use client";

import React, { useContext } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline';

import SoundContext from '../contexts/SoundContext';
import MenuContext from '../contexts/MenuContext';

import MobilePlaylist from './MobilePlaylist';

const Header = () => {
    const { soundIndex, handleSelectedSound, sounds } = useContext(SoundContext);
    const { isMenuVisible, openMobileMenu, closeMobileMenu } = useContext(MenuContext);

    return (
        <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-white text-3xl lg:text-5xl font-bold">Study with Nature</h1>
            <button onClick={() => openMobileMenu()}>
                <Bars3Icon className="w-8 block lg:hidden" id="menu-icon"/>
            </button>
            {isMenuVisible && <MobilePlaylist {...{soundIndex, handleSelectedSound, sounds, isMenuVisible, closeMobileMenu}} />}
        </div>
    )
}

export default Header