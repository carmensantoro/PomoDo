let updatedWorkSessionDuration;
let updatedBreakSessionDuration;

let workDurationInput = document.querySelector('#input-work-duration');
let breakDurationInput = document.querySelector('#input-break-duration');

workDurationInput.value = '25';
breakDurationInput.value = '5';






const pomodoTimer = document.querySelector('#pomodo-timer');

const startButton = document.querySelector('#pomodo-start');
const pauseButton = document.querySelector('#pomodo-pause');
const stopButton = document.querySelector('#pomodo-stop');

// START
startButton.addEventListener('click', () => {
  toggleClock();
})

// PAUSE
pauseButton.addEventListener('click', () => {
  toggleClock();
})

// STOP
stopButton.addEventListener('click', () => {
  toggleClock(true);
})


// UPDATE WORK TIME
workDurationInput.addEventListener('input', () => {
  updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value)
})

// UPDATE PAUSE TIME
breakDurationInput.addEventListener('input', () => {
  updatedBreakSessionDuration = minuteToSeconds(
    breakDurationInput.value
  )
})

const minuteToSeconds = mins => {
  return mins * 60
}




let isClockRunning = false;


// 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

// 5 mins
let breakSessionDuration = 300;

let type = 'Work';

let timeSpentInCurrentSession = 0;

let currentTaskLabel = document.querySelector('#pomodo-clock-task');

let isClockStopped = true;







const toggleClock = (reset) => {
  if (reset) {
    stopClock();
  } else {
    if (isClockStopped) {
      setUpdatedTimers();
      isClockStopped = false;
    }
    if (isClockRunning === true) {
      // PAUSE THE TIMER
      isClockRunning = false;
      clearInterval(clockTimer);
    } else {
      // START THE TIMER
      clockTimer = setInterval(() => {
  stepDown();
  displayCurrentTimeLeftInSession();
}, 1000)
isClockRunning = true;
    }
  }
}


const stopClock = () => {
  setUpdatedTimers();
  displaySessionLog(type);
  clearInterval(clockTimer);
   isClockStopped = true;
  isClockRunning = false;
  currentTimeLeftInSession = workSessionDuration;
  displayCurrentTimeLeftInSession();
  type = 'Work';
  timeSpentInCurrentSession = 0;
}


const displayCurrentTimeLeftInSession = () => {
  const secondsLeft = currentTimeLeftInSession;
  let result = '';
  const seconds = secondsLeft % 60;
  const minutes = parseInt(secondsLeft / 60) % 60;
  let hours = parseInt(secondsLeft / 3600);
  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time
  }
  if (hours > 0) result += `${hours}:`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
  pomodoTimer.innerText = result.toString();
}


const stepDown = () => {
  if (currentTimeLeftInSession > 0) {
    // decrease time left / increase time spent
    currentTimeLeftInSession--;
    timeSpentInCurrentSession++;
    } else if (currentTimeLeftInSession === 0) {
      timeSpentInCurrentSession = 0;
      if (type === 'Work') {
        currentTimeLeftInSession = breakSessionDuration;
        displaySessionLog('Work');
        type = 'Break';
        setUpdatedTimers();
        currentTaskLabel.value = 'Break';
        currentTaskLabel.disabled = true;
      } else {
        currentTimeLeftInSession = workSessionDuration;
        type = 'Work';
        setUpdatedTimers();
        if (currentTaskLabel.value === 'Break') {
      currentTaskLabel.value = workSessionLabel;
    }
    currentTaskLabel.disabled = false;
    displaySessionLog('Break');
  }
}
    displayCurrentTimeLeftInSession();
  }



  const displaySessionLog = (type) => {
    const sessionsList = document.querySelector('#pomodo-sessions');
    // append li to it
    const li = document.createElement('li');
    if (type === 'Work') {
  sessionLabel = currentTaskLabel.value
    ? currentTaskLabel.value
    : 'Work'
  workSessionLabel = sessionLabel
} else {
  sessionLabel = 'Break'
}
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60)
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

    const text = document.createTextNode(
      `${sessionLabel} : ${elapsedTime} min`
    )
    li.appendChild(text);
    sessionsList.appendChild(li);
  }



  const setUpdatedTimers = () => {
    if (type === 'Work') {
      currentTimeLeftInSession = updatedWorkSessionDuration
        ? updatedWorkSessionDuration
        : workSessionDuration
      workSessionDuration = currentTimeLeftInSession
    } else {
      currentTimeLeftInSession = updatedBreakSessionDuration
        ? updatedBreakSessionDuration
        : breakSessionDuration
      breakSessionDuration = currentTimeLeftInSession
    }
  }
