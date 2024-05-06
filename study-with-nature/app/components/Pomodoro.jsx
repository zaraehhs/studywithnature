"use client"
import React, { useState, useEffect, useRef } from 'react'
import PomodoroPause from './PomodoroPause';
import PomodoroForm from './PomodoroForm';
import PomodoroEnd from './PomodoroEnd';

const Pomodoro = () => {

    const [showDuringDisplay, setDuringDisplay] = useState(false);
    const [timeDisplay, setTimeDisplay] = useState("0:00");
    const [mode, setPomodoroMode] = useState("Study time!");
    const [toggle, setToggle] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [sessionCount, setSessionCount ] = useState(0);
    const [timer, setTimer] = useState({
        sessionTime: 0,
        shortBreak: 0,
        longBreak: 0, 
    });

    const startTimer = (event) => {
        setTimer(prevState => ({
            ...prevState,
            sessionTime: event.target.sessionTime.value,
            shortBreak: event.target.shortBreak.value,
            longBreak: event.target.longBreak.value,
        })); 

        event.preventDefault();
        setDuringDisplay(true);

        setTotalSeconds(timer.sessionTime * 60);
        setSessionCount(0); 
        setToggle(true)

    }

    useEffect(() => {
        let interval;
        if (toggle) {
         interval = setInterval(() => setTotalSeconds(totalSeconds => totalSeconds - 1), 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [toggle]);


    useEffect(() => {
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
            setSessionCount(sessionCount => sessionCount + 1); 
        }

    }, [totalSeconds]);

    useEffect(() => {
        console.log("This is the sessionCount" + sessionCount)
        if (sessionCount % 2 === 0 && !(sessionCount % 8 === 0)) { 
            setPomodoroMode('It\'\s time for a short break!');
            setTotalSeconds(timer.shortBreak * 60);
        } else if (sessionCount % 8 === 0) {
            setPomodoroMode('Take a long break, great progress!');
            setTotalSeconds(timer.longBreak * 60);
        } else {
            setPomodoroMode('Study time!');
            setTotalSeconds(timer.sessionTime * 60);
        }
        setToggle(true);
    }, [sessionCount]);


    return (
        <div className="bg-[#eff2f6b5] rounded-lg mt-8 p-4 text-black box-shadow">
            <div id="pomodoro-start">
                <h1 className="font-bold text-xl"> Pomodoro </h1>
                <p className="text-left"> {showDuringDisplay ? mode : "Set times to plan your study session"}</p>
                <h2 className={`${showDuringDisplay ? 'block' : 'hidden'}`}> {timeDisplay}</h2>
                <PomodoroForm {...{ showDuringDisplay, startTimer }} />
                <PomodoroPause {...{ showDuringDisplay, timeDisplay, setTimeDisplay, setTotalSeconds, setToggle }} />
                <PomodoroEnd {...{ setDuringDisplay, showDuringDisplay, setTimeDisplay, setToggle, setSessionCount }} />
            </div>
        </div>
    )
}

export default Pomodoro