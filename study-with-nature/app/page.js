import MediaPlayer from "./components/MediaPlayer";
import Playlist from "./components/Playlist";
import Pomodoro from "./components/Pomodoro";

import { SoundProvider } from "./contexts/SoundContext";
import { MenuProvider } from "./contexts/MenuContext";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col max-w-5xl w-full m-auto p-6 lg:p-28">
        <SoundProvider>
          <MenuProvider>
            <MediaPlayer />
            <Playlist />
          </MenuProvider>
        </SoundProvider>
        <Pomodoro /> 
          {/* 
          <Footer />
        */}   
      </main>
    </div>
  );
}
