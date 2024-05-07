import Image from 'next/image';

const useGeneratePlaylistItems = (selectedSoundIndex, handleSelectedSound, sounds) => {
  const soundItems = sounds.map((sound, index) =>
    <li key={index}
      className={`flex flex-row pt-4 pb-4 pl-5 hover:bg-[#a1a1a199] last:border-b-[1px] last:border-b-[#938E8E] ${selectedSoundIndex === index ? 'bg-[#a1a1a199]' : 'bg-[#eff2f6b5]'}`} onClick={() => handleSelectedSound(index)}>
      <Image className="h-12 box-border rounded-lg mr-4 shadow-lg" width={50} height={50} src={sounds[index].imgUrl} alt={sounds[index].imgAlt} />
      <div className="flex flex-col justify-center">
        <p className="text-black leading-3">{sounds[index].title}</p>
        <p className="text-sm opacity-80 text-black">{sounds[index].subtitle}</p>
      </div>
    </li>
  );

  return soundItems;
};

export default useGeneratePlaylistItems;