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
    const [toggle, setToggle] = useState(false);
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
            setSoundToggle(true);
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


    useEffect(() => {
        const pomodoroAlert = document.querySelector('#pomodoro-audio');

        if (soundToggle) {
            pomodoroAlert.volume = 0.1;
            pomodoroAlert.play();
        } else {
            if (!pomodoroAlert.paused && !pomodoroAlert.ended && pomodoroAlert.currentTime > 0) {
                pomodoroAlert.pause();
                pomodoroAlert.currentTime = 0;
            }

        }

    }, [soundToggle]);

    return (
        <>
            <div className="bg-[#eff2f6b5] rounded-lg mt-8 p-4 text-black box-shadow">
                <div id="pomodoro-start">
                    <h1 className="font-bold text-xl"> Pomodoro </h1>
                    <p className="text-left"> {showDuringDisplay ? mode : "Set times to plan your study session"}</p>
                    <h2 className={`${showDuringDisplay ? 'block' : 'hidden'}`}> {timeDisplay}</h2>
                    <PomodoroForm {...{ showDuringDisplay, startTimer }} />
                    <PomodoroPause {...{ showDuringDisplay, timeDisplay, setTimeDisplay, setTotalSeconds, setToggle, setSoundToggle }} />
                    <PomodoroEnd {...{ setDuringDisplay, showDuringDisplay, setTimeDisplay, setToggle, setSessionCount, setSoundToggle }} />
                </div>
            </div>
            <p class="text-white shadow-lg"> Made with ✨ by
                <a href="https://twitter.com/maggiecodes_" target="_blank"> @maggiecodes </a>&
                <a href="https://twitter.com/zaraehhs" target="_blank"> @zaraehhs </a></p>
            <audio id="pomodoro-audio" src="https://audio.jukehost.co.uk/fDV1AmZFVXzsUH0mAB1reX0Kd1sdIuAY"></audio>
        </>
    )
}

export default Pomodoro