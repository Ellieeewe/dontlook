let remainingSeconds = 0;
let intervalId = null;

const input = document.getElementById("minutes-input");
const display = document.getElementById("time-display");

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  display.textContent = formatTime(remainingSeconds);
}

document.getElementById("start-btn").addEventListener("click", () => {
  if (intervalId !== null) return;

  if (remainingSeconds === 0) {
    const mins = Number(input.value);
    if (mins > 0) remainingSeconds = mins * 60;
  }

  intervalId = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateDisplay();
    } else {
      clearInterval(intervalId);
      intervalId = null;
      document.getElementById("endsesh").play();
    }

   
  }, 1000);
});

document.getElementById("pause-btn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  remainingSeconds = 0;
  updateDisplay();
});

updateDisplay();
