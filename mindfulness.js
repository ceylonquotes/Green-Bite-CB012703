// ==========================
// Breathing Animation + Text
// ==========================
const circle = document.getElementById('circle');
const breathText = document.getElementById('breathing-text');

let phase = 0; // 0 = inhale, 1 = hold, 2 = exhale
let breathingActive = false;

function startBreathing() {
    if (breathingActive) return;
    breathingActive = true;
    breathingCycle();
    setInterval(breathingCycle, 4000); // cycle every 4s
}

function breathingCycle() {
    if (!breathingActive) return;
    
    if (phase === 0) {
        breathText.textContent = "Breathe In";
        circle.style.transform = "scale(1.5)";
        circle.style.background = "radial-gradient(circle at center, rgba(255,255,255,0.9), var(--light-green))";
    } else if (phase === 1) {
        breathText.textContent = "Hold";
        circle.style.transform = "scale(1.5)";
        circle.style.background = "radial-gradient(circle at center, rgba(255,255,255,0.8), var(--dark-green))";
    } else {
        breathText.textContent = "Breathe Out";
        circle.style.transform = "scale(1)";
        circle.style.background = "radial-gradient(circle at center, rgba(255,255,255,0.9), var(--light-green))";
    }
    phase = (phase + 1) % 3;
}

// Start breathing animation when page loads
window.addEventListener('load', startBreathing);

// ==========================
// Toggle Ambient Sound
// ==========================
const toggleSoundBtn = document.getElementById("toggle-sound");
const ambientSound = document.getElementById("ambient-sound");

let isPlaying = false;

toggleSoundBtn.addEventListener("click", function () {
    if (!isPlaying) {
        ambientSound.play().then(() => {
            this.textContent = "Pause Ambient Sound";
            isPlaying = true;
        }).catch(error => {
            console.log("Audio play failed:", error);
            this.textContent = "Audio not available";
        });
    } else {
        ambientSound.pause();
        this.textContent = "Play Ambient Sound";
        isPlaying = false;
    }
});

// Reset button text when audio ends
ambientSound.addEventListener('ended', () => {
    toggleSoundBtn.textContent = "Play Ambient Sound";
    isPlaying = false;
});

// Handle audio loading errors
ambientSound.addEventListener('error', () => {
    toggleSoundBtn.textContent = "Audio not available";
    toggleSoundBtn.disabled = true;
});

// ==========================
// Meditation Timer
// ==========================
const timerDisplay = document.getElementById("timer-display");

let timer;
let timeLeft = 300; // default 5 minutes (300 seconds)
let running = false;

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(duration) {
    if (running) return;
    
    // Set the duration (in minutes, convert to seconds)
    timeLeft = duration * 60;
    running = true;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            running = false;
            completeSession();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    timeLeft = 300; // reset to 5 minutes
    updateTimerDisplay();
}

// ==========================
// Session Tracker
// ==========================
const sessionCount = document.getElementById("session-count");

function loadSessions() {
    let sessions = localStorage.getItem("completedSessions");
    if (!sessions) {
        sessions = 0;
    } else {
        sessions = parseInt(sessions);
    }
    sessionCount.textContent = `${sessions} sessions completed`;
}

function completeSession() {
    let sessions = parseInt(localStorage.getItem("completedSessions")) || 0;
    sessions++;
    localStorage.setItem("completedSessions", sessions);
    sessionCount.textContent = `${sessions} sessions completed`;
    alert("Great job! You completed a meditation session 🌸");
}

// Initialize timer display and load sessions when page loads
updateTimerDisplay();
loadSessions();

// Mobile nav toggle function
function toggleMenu() {
    const links = document.getElementById('navLinks');
    const btn = document.querySelector('.hamburger');
    links.classList.toggle('active');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
}
