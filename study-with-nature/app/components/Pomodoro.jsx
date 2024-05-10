"use client"
import React, { useState, useEffect, useRef } from 'react'
import PomodoroPause from './PomodoroPause';
import PomodoroForm from './PomodoroForm';
import PomodoroEnd from './PomodoroEnd';

const Pomodoro = () => {

    const [showDuringDisplay, setDuringDisplay] = useState(false);
    const [timeDisplay, setTimeDisplay] = useState("0:00");
    const [mode, setPomodoroMode] = useState("Study time!");
    const [soundToggle, setSoundToggle] = useState(false);
    const [toggleInterval, setIntervalToggle] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);
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
        setIntervalToggle(true)

    }

    useEffect(() => {
        let interval;
        if (toggleInterval) {
            interval = setInterval(() => setTotalSeconds(totalSeconds => totalSeconds - 1), 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [toggleInterval]);


    useEffect(() => {
        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        if (secondsLeft < 10 && secondsLeft > 0) {
            secondsLeft = '0' + secondsLeft;
        }
        setTimeDisplay(`${minutesLeft} : ${secondsLeft}`);
        if (minutesLeft === 0 && secondsLeft === 0) {
            setSoundToggle(true);
            triggerAlert();
            setIntervalToggle(false)
            setSessionCount(sessionCount => sessionCount + 1);
        }

    }, [totalSeconds]);

    useEffect(() => {
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
        setIntervalToggle(true);
    }, [sessionCount]);

    const triggerAlert = () => {
        const pomodoroAlert = document.querySelector('#pomodoro-audio');

        if (soundToggle && sessionCount != 0) {
            pomodoroAlert.volume = 0.1;
            pomodoroAlert.play();
        } 
    }

    return (
        <>
            <div className="bg-[#eff2f6b5] rounded-lg mt-8 p-4 text-black box-shadow text-center">
                <div id="pomodoro-start">
                    <h1 className="font-bold text-xl text-left"> Pomodoro </h1>
                    <p className="text-left"> {showDuringDisplay ? mode : "Set times to plan your study session"}</p>
                    <h2 className={`${showDuringDisplay ? 'block' : 'hidden'} my-4 font-bold text-2xl`}> {timeDisplay}</h2>
                    <PomodoroForm {...{ showDuringDisplay, startTimer }} />
                    <div className="flex justify-center">  
                    <PomodoroPause {...{ showDuringDisplay, timeDisplay, setTimeDisplay, setTotalSeconds, setIntervalToggle, setSoundToggle }} />
                    <PomodoroEnd {...{ setDuringDisplay, showDuringDisplay, setTimeDisplay, setTotalSeconds, setIntervalToggle, setSessionCount, setSoundToggle, setPomodoroMode, sessionCount }} />
                    </div>
                </div>
            </div>
            <p className="text-white shadow-lg my-4"> Made with ✨ by
                <a href="https://twitter.com/maggiecodes_" target="_blank" className='underline'> @maggiecodes </a>&
                <a href="https://twitter.com/zaraehhs" target="_blank" className='underline'> @zaraehhs </a></p>
                <audio id="pomodoro-audio" src="https://audio.jukehost.co.uk/fDV1AmZFVXzsUH0mAB1reX0Kd1sdIuAY"></audio>
        </>
    )
}

export default Pomodoro