"use client"
import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import soundData from '../soundData';

const Playlist = () => {

  const [selectedSound, setSelectedSound] = useState(0);
  const handleSoundSelect = (index) => {
    setSelectedSound(index);
  }
  const soundItems = soundData.map((sound, index) =>
    <li key={index}
      className={`flex flex-row pt-4 pb-4 pl-5  hover:bg-[#a1a1a199] ${selectedSound === index ? 'bg-[#a1a1a199]' : 'bg-[#eff2f6b5]'}`} onClick={() => handleSoundSelect(index)}>
      <Image className="h-12 box-border rounded-lg mr-4 shadow-lg" width={50} height={50} src={soundData[index].imgUrl} alt={soundData[index].imgAlt} />
      <div className="flex flex-col justify-center">
        <p className="text-black leading-3">{soundData[index].title}</p>
        <p className="text-sm opacity-80 text-black">{soundData[index].subtitle}</p>
      </div>
    </li>
  );

  return (
    <div className="hidden lg:block lg:bg-[#eff2f6b5] lg:w-full lg:h-80 lg:overflow-y-scroll lg:no-scrollbar lg:rounded-lg">
      <ul id="desktop-sounds-list" className="divide-y divide-[#938E8E]">{soundItems}</ul>
    </div>
  )
}

export default Playlist