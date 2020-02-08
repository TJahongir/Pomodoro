const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const timeDOM = document.querySelector('.counter-time');
let sound = new Audio('../sounds/sound1.mp3');

let modes = [
  {
    time: 1500,
    shortbreak: 300,
    longBreak: 900,
    longBreakDelay: 4
  },
  {
    time: 3000,
    shortbreak: 600,
    longBreak: 1200,
    longBreakDelay: 4
  }
];

let defaultMode = modes[0];
let workMode = modes[1];

// Minute / Seconds Converter
const formatTime = time => {
  let minutes = Math.floor(time / 60);

  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const startTimer = mode => {
  let timePassed = 0;
  let timeLeft = mode.time;

  let timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = 5 - timePassed;
    timeDOM.textContent = formatTime(timeLeft);

    if (timeLeft == 0) {
      sound.play();
      clearInterval(timerInterval);
    }
  }, 1000);
};

startBtn.addEventListener('click', () => {
  startTimer(defaultMode);
});

pauseBtn.addEventListener('click', () => {});
