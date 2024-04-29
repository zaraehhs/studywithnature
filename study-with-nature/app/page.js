import Header from "./components/Header";
import Playlist from "./components/Playlist";
import Pomodoro from "./components/Pomodoro";

export default function Home() {
  return (
    <main className="p-12 lg:p-28">
    <Header />
    <Playlist />
    <Pomodoro />
      {/* 
        <MediaPlayer />
         
      <Footer />
    */}   
    </main>
  );
}
