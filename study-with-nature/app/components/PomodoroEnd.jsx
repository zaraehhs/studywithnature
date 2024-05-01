import React from 'react'

const PomodoroEnd = ({setDuringDisplay, showDuringDisplay, setTimeDisplay, timer, setIntervalState, setToggle}) => {
    const endPomodoro = () => {
        //stopPomodoroAlert();
        setToggle(false)
        setDuringDisplay(false);
        setTimeDisplay("0:00");
        timer.sessions = 1;
       // setIntervalState(true);
    }

    // const stopPomodoroAlert = () => {
    //     const pomodoroAlert = document.querySelector('#pomodoro-audio');
    //     if (!pomodoroAlert.paused && !pomodoroAlert.ended && pomodoroAlert.currentTime > 0) {
    //         pomodoroAlert.pause();
    //         pomodoroAlert.currentTime = 0;
    //     }
    // }

  return (
    <button className={`${showDuringDisplay ? 'block' : 'hidden'} text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`} onClick={endPomodoro}> End Session</button>

  )
}

export default PomodoroEnd