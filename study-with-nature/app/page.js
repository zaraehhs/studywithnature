import Header from "./components/Header";
import Playlist from "./components/Playlist";
import MediaPlayer from "./components/MediaPlayer";

export default function Home() {
  return (
    <main className="p-12 lg:p-28">
    <Header />
    <Playlist />
    <MediaPlayer />
      {/* 
        <Pomodoro /> 
      <Footer />
    */}   
    </main>
  );
}
