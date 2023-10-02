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

startButton.addEventListener('click', startTimer);
endButton.addEventListener('click', endPomodoro);
pauseButton.addEventListener('click', pausePomodoro);

let timer = {
    sessionTime: 0,
    shortBreak: 0,
    longBreak: 0,
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

    if (state) {
        state = false;
        let totalSeconds;

        totalSeconds = timer.sessionTime * 60;

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
                //sound play()
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

function endPomodoro() {
    duringSection.style.display = "none";
    event.preventDefault();
    startSection.style.display = "block";
    clearInterval(interval);
}

function pausePomodoro() {
    let pausedTime = timeDisplay.innerHTML;
    console.log(pausedTime);
    //clearInterval(); 




}

        //