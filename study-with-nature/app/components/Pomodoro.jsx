"use client"
import React, { useState, useEffect, useRef } from 'react'
import PomodoroPause from './PomodoroPause';
import PomodoroForm from './PomodoroForm';
import PomodoroEnd from './PomodoroEnd';

const Pomodoro = () => {

    const [showDuringDisplay, setDuringDisplay] = useState(false);
    const [timeDisplay, setTimeDisplay] = useState("0:00");
    const [mode, setPomodoroMode] = useState("Study time!");
   // const [pausedTime, setPausedTime] = useState(0);
    const [toggle, setToggle] = useState(false);
    // const [totalSeconds, setTotalSeconds] = useState(0);
   
    
    let timer = {
        sessionTime: 0,
        shortBreak: 0,
        longBreak: 0,
        sessions: 1,
    }
    useEffect(() => {
    let interval;
    if (toggle) {
      interval = setInterval(updateSeconds, 1000);
    }
        return () => {
            clearInterval(interval);
        };
    }, [toggle]);

    const startTimer = (event) => {
        timer.sessionTime = event.target.sessionTime.value;
        timer.shortBreak = event.target.shortBreak.value;
        timer.longBreak = event.target.longBreak.value;

        event.preventDefault();
        setDuringDisplay(true);

 
       let totalSeconds = timer.sessionTime * 60 ;
        console.log("totalseconds" + totalSeconds)

        // if (pausedTime != 0) {
        //     totalSeconds = Math.floor(pausedTime * 60);
        //     setPausedTime(0); 
        // }    
       setToggle(true)
       return totalSeconds;
    
        //}
    }

    
    const updateSeconds = () => {
        // setTotalSeconds(prevAutoCount => prevAutoCount - 1)
        totalSeconds--;
         console.log(totalSeconds)
         let minutesLeft = Math.floor(totalSeconds / 60);
         let secondsLeft = totalSeconds % 60;
 
         if (secondsLeft < 10 && secondsLeft > 0) {
             secondsLeft = '0' + secondsLeft;
         }
         setTimeDisplay(`${minutesLeft} : ${secondsLeft}`);
 
         if (minutesLeft === 0 && secondsLeft === 0) {
             // const pomodoroAlert = document.querySelector('#pomodoro-audio');
             // pomodoroAlert.volume = 0.1;
             // pomodoroAlert.play();
             setToggle(false)
             timer.sessions++;
 
             if (timer.sessions % 2 === 0 && !(timer.sessions % 8 === 0)) {  // long break every 8th break
                 setPomodoroMode('It\'\s time for a short break!');
                 modeDetect();
 
             } else if (timer.sessions % 8 === 0) {
                 setPomodoroMode('Take a long break, great progress!');
                 modeDetect();
             } else {
 
                 setPomodoroMode('Study time!');
                 modeDetect();
             }
         }
     }
    

    let modeDetect = () => { //Change to useEffect?
        if (mode === 'Take a long break, great progress!') {
            totalSeconds = timer.longBreak * 60;
            setToggle(true)

        } else if (mode === 'It\'\s time for a short break!') {
            totalSeconds = timer.shortBreak * 60;
            setToggle(true)

        } else {
            totalSeconds = timer.sessionTime * 60;
            setToggle(true)

        }
    }


    useEffect(() => {
        let interval;
        if (toggle) {
          interval = setInterval(updateSeconds, 1000);
        }
            return () => {
                clearInterval(interval);
            };
        }, [mode]);
    return (
        <div className="bg-[#eff2f6b5] rounded-lg mt-8 p-4 text-black box-shadow">
            <div id="pomodoro-start">
                <h1 className="font-bold text-xl"> Pomodoro </h1>
                <p className="text-left"> {showDuringDisplay ? mode : "Set times to plan your study session"}</p>
                <h2 className={`${showDuringDisplay ? 'block' : 'hidden'}`}> {timeDisplay}</h2>
                <PomodoroForm {...{ showDuringDisplay, startTimer }} />

                {/* 
                <PomodoroPause {...{ showDuringDisplay, timeDisplay, startTimer, setPausedTime, setTimeDisplay }} />
                <PomodoroEnd {...{ setDuringDisplay, showDuringDisplay, setTimeDisplay, timer, setToggle }} />
    */}
            </div>
        </div>
    )
}

export default Pomodoro