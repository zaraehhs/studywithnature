let pomodoroForm = document.getElementById('pomodoro-form');
let startButton = document.getElementById('submit');
let endButton = document.getElementById('endPomodoro');
let startSection = document.getElementById('pomodoro-start');
let duringSection = document.getElementById('pomodoro-during');
let timeDisplay = document.getElementById('timeDisplay');
let sessionTime = document.getElementById('sessionTime');
let shortBreak = document.getElementById('shortBreak');
let longBreak = document.getElementById('longBreak');
let sessionDescription = document.getElementById('sessionDescription');
let pauseButton = document.getElementById('pausePomodoro');

endButton.addEventListener('click', endPomodoro);
pauseButton.addEventListener('click', pausePomodoro);

let timer = {
    sessionTime: 0,
    shortBreak: 0,
    longBreak: 0,
    pausedTime: 0,
    sessions: 1,
    mode: 'Study time!',
}

let interval;
let state = true;

function startTimer() {
    timer.sessionTime = sessionTime.value;
    timer.shortBreak = shortBreak.value;
    timer.longBreak = longBreak.value;

    event.preventDefault();
    startSection.style.display = "none";
    duringSection.style.display = "block";

    console.log(state);
    if (state) {
        state = false;
        let totalSeconds;

        totalSeconds = timer.sessionTime * 60;
        if (timer.pausedTime != 0){
            totalSeconds = Math.floor(timer.pausedTime * 60); 
            console.log("hey your close: " + totalSeconds);

            timer.pausedTime = 0;
        }

        let modeDetect = () => {
            console.log("it reaches me");
            console.log("Mode: " + timer.mode);

            if (timer.mode === 'Take a long break, great progress!') {
                totalSeconds = timer.longBreak * 60;
                interval = setInterval(updateSeconds, 1000);

            } else if (timer.mode === 'It\'\s time for a short break!') {
                totalSeconds = timer.shortBreak * 60;
                console.log("break time:" + totalSeconds);
                interval = setInterval(updateSeconds, 1000);

            } else {
                totalSeconds = timer.sessionTime * 60;
                interval = setInterval(updateSeconds, 1000);
            }
        }

        let updateSeconds = () => {
            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10 && secondsLeft > 0) {
                secondsLeft = '0' + secondsLeft;
            }
            timeDisplay.innerHTML = `${minutesLeft} : ${secondsLeft} `;

            console.log(`${minutesLeft} : ${secondsLeft} `);

            if (minutesLeft === 0 && secondsLeft === 0) {
                const pomodoroAlert = document.querySelector('#pomodoro-audio');
                pomodoroAlert.volume = 0.1;
                pomodoroAlert.play();
                clearInterval(interval);
                timer.sessions++;
                console.log("This is session # " + timer.sessions);

                if (timer.sessions % 2 === 0 && !(timer.sessions % 8 === 0)) {  // long break every 8th break
                    timer.mode = 'It\'\s time for a short break!';
                    sessionDescription.innerHTML = timer.mode;
                    modeDetect();

                } else if (timer.sessions % 8 === 0) {
                    timer.mode = 'Take a long break, great progress!';
                    sessionDescription.innerHTML = timer.mode;
                    modeDetect();
                } else {

                    timer.mode = 'Study time!';
                    sessionDescription.innerHTML = timer.mode;
                    modeDetect();
                }
            }
        }
        interval = setInterval(updateSeconds, 1000);
    } else {
        console.log("session started");
    }

}

function stopPomodoroAlert() {
    const pomodoroAlert = document.querySelector('#pomodoro-audio');
    if (!pomodoroAlert.paused && !pomodoroAlert.ended && pomodoroAlert.currentTime > 0) {
        pomodoroAlert.pause();
        pomodoroAlert.currentTime = 0;
    }
}

function endPomodoro() {
    stopPomodoroAlert();
    duringSection.style.display = "none";
    startSection.style.display = "block";
    clearInterval(interval);
    timer.sessions = 1; 
    location.reload(); // 
}

function pausePomodoro() {
    let pausedTime = timeDisplay.innerHTML;
    let pausedTimeArray = pausedTime.split(' : ');
    let remainingMins = pausedTimeArray[0];
    let remainingSeconds = Math.floor((pausedTimeArray[1] * 100 / 60)); //conversion to decimal 

    let newSessionTime = remainingMins + "." + remainingSeconds;

    stopPomodoroAlert();

    if (pauseButton.innerText === "Pause"){
        clearInterval(interval);
        pauseButton.innerText = "Resume";
        timer.pausedTime = parseFloat(newSessionTime);
    } else {
        pauseButton.innerText = "Pause";
        state = true;
        startTimer();
    }

}

pomodoroForm.addEventListener('submit',function(e) {
    e.preventDefault();

    startTimer();
});
