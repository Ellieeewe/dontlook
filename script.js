// Loading Local Data
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let completedDays = JSON.parse(localStorage.getItem("completedDays") || "{}");
let seenCats = JSON.parse(localStorage.getItem("seenCats") || "[]");
let showGrid = JSON.parse(localStorage.getItem("showGrid") || "true");
let gridColor = localStorage.getItem("gridColor") || "#4caf50"; // default green



renderTasks();
renderGrid();

// Adding a new task
document.getElementById("add-task").addEventListener("click", () => {
    const name = document.getElementById("task-name").value;
    const deadline = document.getElementById("task-deadline").value;
    const duration = parseInt(document.getElementById("task-duration").value);

    if (!name) return alert("Enter name of task.");

    const task = {
        id: Date.now(),
        name,
        deadline: deadline || null,
        duration: duration || null,
        timeSpent: 0,
        running: false,
        lastStart: null,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
});

// Saving a task
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Showing tasks
function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");

        let html = `<strong>${task.name}</strong><br>`;

        // Countdown
        if (task.deadline) {
            html += `<div id="countdown-${task.id}"></div>`;
        }

        // Timer
        if (task.duration) {
            html += `
                 <div>
        <span id="timer-${task.id}">${formatTime(task.timeSpent)}</span> / ${formatTime(task.duration * 60)}
    </div>
    <div class="timer-controls">
        <button onclick="startTimer(${task.id})">Start</button>
        <button onclick="pauseTimer(${task.id})">Pause</button>
        <button onclick="completeTask(${task.id})">Finish!</button>
    </div>
            `;
        }

        // Complete button
       

        div.innerHTML = html;
        list.appendChild(div);
    });
}

// Countdown update

setInterval(() => {
    tasks.forEach(task => {
        if (task.deadline) {
            const el = document.getElementById(`countdown-${task.id}`);
            if (!el) return;

            const now = new Date();
            const end = new Date(task.deadline);
            const diff = end - now;

            if (diff <= 0) {
                el.textContent = "Po termínu!";
            } else {
                el.textContent = formatCountdown(diff);
            }
        }
    });
}, 1000);

// Timer logic

function startTimer(id) {
    const task = tasks.find(t => t.id === id);
    if (!task.running) {
        task.running = true;
        task.lastStart = Date.now();
        saveTasks();
    }
}

function pauseTimer(id) {
    const task = tasks.find(t => t.id === id);
    if (task.running) {
        task.running = false;
        task.timeSpent += Math.floor((Date.now() - task.lastStart) / 1000);
        saveTasks();
        renderTasks();
    }
}

setInterval(() => {
    tasks.forEach(task => {
        if (task.running) {
            const elapsed = task.timeSpent + Math.floor((Date.now() - task.lastStart) / 1000);
            const el = document.getElementById(`timer-${task.id}`);
            if (el) el.textContent = formatTime(elapsed);

            if (elapsed >= task.duration * 60) {
                completeTask(task.id);
            }
        }
    });
}, 500);

// Task completion

function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = true;

    // Mark today in grid
    const today = new Date().toISOString().split("T")[0];
    completedDays[today] = true;
    localStorage.setItem("completedDays", JSON.stringify(completedDays));

    // Remove task
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    renderGrid();

    showCat();
}

// Neko

function showCat() {
    fetchNewCat().then(url => {
        document.getElementById("cat-image").src = url;
        document.getElementById("cat-modal").classList.remove("hidden");
    });
}

document.getElementById("close-cat").addEventListener("click", () => {
    document.getElementById("cat-modal").classList.add("hidden");
});

async function fetchNewCat() {
    while (true) {
        const res = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await res.json();
        const url = data[0].url;

        if (!seenCats.includes(url)) {
            seenCats.push(url);
            localStorage.setItem("seenCats", JSON.stringify(seenCats));
            return url;
        }
    }
}

// Grid

function renderGrid() {
    const grid = document.getElementById("grid");
    const title = document.getElementById("monthover");

    if (!showGrid) {
        grid.style.display = "none";
        title.style.display = "none";
        return;
    }

    grid.style.display = "grid";
    title.style.display = "block";

    grid.innerHTML = "";

    const days = 30;
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const key = date.toISOString().split("T")[0];
        const div = document.createElement("div");
        div.classList.add("day");

        if (completedDays[key]) div.classList.add("completed");

        grid.appendChild(div);
    }
}


// ----------------------------
// Settings: toggle grid + color
// ----------------------------

window.addEventListener("DOMContentLoaded", () => {

    // Load saved preference
    showGrid = JSON.parse(localStorage.getItem("showGrid") || "true");
    gridColor = localStorage.getItem("gridColor") || "#4caf50";

    // Apply saved grid color
    document.documentElement.style.setProperty("--grid-color", gridColor);

    // Apply preference on load
    if (!showGrid) {
        document.getElementById("grid").style.display = "none";
        document.getElementById("monthover").style.display = "none";
    }

    // Open/close settings panel
    document.getElementById("settings-btn").addEventListener("click", () => {
        document.getElementById("settings-panel").classList.toggle("hidden");
    });

    // Set checkbox state
    document.getElementById("toggle-grid").checked = showGrid;

    // Toggle grid visibility
    document.getElementById("toggle-grid").addEventListener("change", (e) => {
        showGrid = e.target.checked;
        localStorage.setItem("showGrid", JSON.stringify(showGrid));
        renderGrid();
    });

    // Set initial color picker value
    document.getElementById("grid-color").value = gridColor;

    // Change grid color
    document.getElementById("grid-color").addEventListener("input", (e) => {
        gridColor = e.target.value;
        localStorage.setItem("gridColor", gridColor);
        document.documentElement.style.setProperty("--grid-color", gridColor);
    });

    // Clear grid button
    document.getElementById("clear-grid").addEventListener("click", () => {
        localStorage.removeItem("completedDays");
        completedDays = {};
        renderGrid();
    });
});


// Helpers

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatCountdown(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
}


