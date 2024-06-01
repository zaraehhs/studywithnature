import MediaPlayer from "./components/MediaPlayer";
import Playlist from "./components/Playlist";
import Pomodoro from "./components/Pomodoro";

import { SoundProvider } from "./contexts/SoundContext";
import { MenuProvider } from "./contexts/MenuContext";
import { BackgroundProvider } from "./contexts/BackgroundContext";

export default function Home() {
  return (
    // <main className="flex flex-col max-w-6xl w-full m-auto p-12 lg:p-28">
    <BackgroundProvider>
      <main className="flex flex-col max-w-6xl w-full m-auto p-12 lg:p-28" id="gradientContainer">
        <SoundProvider>
          <MenuProvider>
            <div id="mobile" className="lg:hidden">
              <div className="flex justify-between align-top my-4">
                <h1 className="text-white text-2xl font-bold">Study with Nature</h1>
                <Playlist />
              </div>
              <MediaPlayer />
              <Pomodoro />
            </div>

            <h1 className="hidden lg:block text-white text-3xl lg:text-5xl font-bold my-4">Study with Nature</h1>

            <div id="desktop" className="hidden lg:flex flex-row justify-start gap-12">
              <div>
                <MediaPlayer />
              </div>
              <div>
                <Playlist />
                <Pomodoro />
              </div>
            </div>
          </MenuProvider>
        </SoundProvider>
      </main>
    </BackgroundProvider>
    // </main> 
  );
}
