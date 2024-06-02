import React from 'react';
import Image from 'next/image';

const DisplayMedia = ({ selectedSound }) => {
  return (
    <div className="flex flex-col relative">
      <Image 
        id="soundImg" 
        className="box-border shadow-lg lg:max-w-full lg:h-[350px] rounded-lg lg:self-stretch lg:mb-8" 
        width={500} 
        height={350} 
        src={selectedSound.imgUrl}
        alt={selectedSound.imgAlt} 
      />
      <p className="sound-title text-xl font-bold m-0 p-0 text-white"> {selectedSound.title} </p>
      <p className="sound-subtitle m-0 p-0 text-sm opacity-80 text-white"> {selectedSound.subtitle} </p>
    </div>
  )
}

export default DisplayMedia