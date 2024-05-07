import Header from "./components/Header";
import SoundContainer from "./components/SoundContainer";
import Pomodoro from "./components/Pomodoro";
import { SoundProvider } from "./contexts/SoundContext";
import { MenuProvider } from "./contexts/MenuContext";

export default function Home() {
  return (
    
      <main className="flex flex-col max-w-5xl w-full m-auto p-12 lg:p-28">
        <SoundProvider>
          <MenuProvider>
            <Header />
            <SoundContainer />
          </MenuProvider>
        </SoundProvider>
        <Pomodoro /> 
          {/* 
          <Footer />
        */}   
      </main>
  );
}
