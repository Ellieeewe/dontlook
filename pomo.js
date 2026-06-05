let endTime = null;
let running = false;

const input = document.getElementById("minutes-input");
const display = document.getElementById("time-display");

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  if (!running || endTime === null) return;

  const now = Date.now();
  const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

  display.textContent = formatTime(remaining);

  if (remaining === 0) {
    running = false;
    document.getElementById("endsesh").play();
  }
}

document.addEventListener("visibilitychange", () => {
  updateDisplay();
});

// Update every second ONLY for UI smoothness
setInterval(updateDisplay, 1000);

// BUTTONS

document.getElementById("start-btn").addEventListener("click", () => {
  if (!running) {
    let mins = Number(input.value);
    if (mins <= 0) return;

    const totalSeconds = mins * 60;
    endTime = Date.now() + totalSeconds * 1000;
    running = true;
    updateDisplay();
  }
});

document.getElementById("pause-btn").addEventListener("click", () => {
  if (running) {
    const now = Date.now();
    const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
    endTime = null;
    running = false;
    display.textContent = formatTime(remaining);
  }
});

document.getElementById("reset-btn").addEventListener("click", () => {
  running = false;
  endTime = null;
  display.textContent = "00:00";
});
