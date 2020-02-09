const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');
const timeDOM = document.querySelector('.counter-time');
const text = document.querySelector('.state h2');
let countdonwInt;
let running = false;
let type = 'work';
let sound = new Audio('../sounds/sound1.mp3');

let modes = [
  {
    pomodoroTime: 1500,
    shortbreak: 300,
    longBreak: 900,
    longBreakDelay: 4
  },
  {
    pomodoroTime: 3000,
    shortbreak: 600,
    longBreak: 1200,
    longBreakDelay: 4
  }
];

let { pomodoroTime, shortbreak } = modes[0];
let timeLeft = pomodoroTime;

let defaultMode = modes[0];
let workMode = modes[1];

// Minute / Seconds Converter
const formatTime = time => {
  let minutes = Math.floor(time / 60);

  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let display = `${minutes}:${seconds}`;
  document.title = `${display} left`;
  timeDOM.textContent = display;
};

/* const startTimer = (mode, condition) => {
  clearInterval(countdonwInt);
  const now = Date.now();
  const then = now + mode[condition] * 1000;
  let pauseSec;

  countdonwInt = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      sound.play();
      clearInterval(countdonwInt);
    }

    formatTime(secondsLeft);
  }, 1000);
}; */

const stopClock = () => {
  clearInterval(countdonwInt);
  running = false;
  timeLeft = pomodoroTime;
  formatTime(timeLeft);
};

const stepDown = () => {
  if (timeLeft > 0) {
    timeLeft--;
  } else if (timeLeft == 0) {
    timeSpentInCurrentSession = 0;
    sound.play();
    if (type === 'work') {
      timeLeft = shortbreak;
      type = 'break';
    } else {
      timeLeft = pomodoroTime;
      type = 'work';
    }
  }
};

const toggleClock = reset => {
  if (reset) {
    // STOP THE TIMER
    stopClock();
  } else {
    if (running === true) {
      //PAUSE THE TIMER
      clearInterval(countdonwInt);
      running = false;
    } else {
      //START THE TIMER
      countdonwInt = setInterval(() => {
        // decrease time left / increase time spent
        stepDown();
        formatTime(timeLeft);
      }, 1000);
      running = true;
    }
  }
};

startBtn.addEventListener('click', () => {
  stopBtn.style.display = 'inline-block';
  startBtn.style.display = 'none';
  pauseBtn.style.cursor = 'pointer';
  pauseBtn.removeAttribute('disabled');
  toggleClock();
});

pauseBtn.addEventListener('click', () => {
  if (pauseBtn.innerHTML == 'PAUSE') {
    pauseBtn.innerHTML = 'RESUME';
  } else {
    pauseBtn.innerHTML = 'PAUSE';
  }
  toggleClock();
});

stopBtn.addEventListener('click', () => {
  stopBtn.style.display = 'none';
  startBtn.style.display = 'inline-block';
  pauseBtn.style.cursor = 'no-drop';
  pauseBtn.disabled = 'true';
  toggleClock(true);
});
