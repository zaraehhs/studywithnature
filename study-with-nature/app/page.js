import Header from "./components/Header";
import Playlist from "./components/Playlist";

export default function Home() {
  return (
    <main className="p-12 lg:p-28">
    <Header />
    <Playlist />
      {/* 
        <MediaPlayer />
        <Pomodoro /> 
      <Footer />
    */}   
    </main>
  );
}
