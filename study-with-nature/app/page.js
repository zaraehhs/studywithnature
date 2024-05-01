import Header from "./components/Header";
import SoundContainer from "./components/SoundContainer";
import Pomodoro from "./components/Pomodoro";

export default function Home() {
  return (
    <main className="flex flex-col max-w-5xl w-full m-auto p-12 lg:p-28">
    <Header />
    <SoundContainer />
    <Pomodoro /> 
      {/* 
      <Footer />
    */}   
    </main>
  );
}
