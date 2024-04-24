import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-white text-3xl lg:text-5xl font-bold">Study with Nature</h1>
            <Bars3Icon className="w-8 block lg:hidden" id="menu-icon"/>
        </div>

    )
  
}

export default Header