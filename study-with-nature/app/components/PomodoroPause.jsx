import React, {useState} from 'react'

const PomodoroPause = ({showDuringDisplay, timeDisplay, setTimeDisplay, setTotalSeconds, setToggle}) => {
  const [pauseButton, setPauseButton] = useState("Pause");

  const pausePomodoro = () => {
    let pausedTime = timeDisplay;
    let pausedTimeArray = pausedTime.split(' : ');
    let remainingMins = pausedTimeArray[0];
    let remainingSeconds = Math.floor((pausedTimeArray[1] * 100 / 60));

    let newSessionTime = remainingMins + "." + remainingSeconds;

    //stopPomodoroAlert();

    if (pauseButton === "Pause"){
        setToggle(false)
        setPauseButton("Resume");
        setTimeDisplay(pausedTime);
    } else {
        setPauseButton("Pause");
        setTotalSeconds( Math.floor(newSessionTime * 60));
        setToggle(true);
    }

}
  return (
    <button className={`${showDuringDisplay ? 'block' : 'hidden'} text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`} onClick={pausePomodoro}> {pauseButton}</button>
  )
}

export default PomodoroPause