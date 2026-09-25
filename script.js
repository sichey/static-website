/* =========================================================
   1. LIVE TIME COUNTER
   Displays the current time and updates every second.
   ========================================================= */
function updateClock() {
  const now = new Date();

  const clockEl = document.getElementById('live-clock');
  const dateEl = document.getElementById('live-date');

  if (clockEl) {
    clockEl.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
updateClock();
setInterval(updateClock, 1000);


/* =========================================================
   2. COUNTDOWN TIMER
   Counts down to New Year's Day and updates every second.
   ========================================================= */
function getNextNewYear() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year + 1, 0, 1, 0, 0, 0);
  // If somehow already Jan 1st exactly, push to the following year
  if (target <= now) {
    target = new Date(year + 2, 0, 1, 0, 0, 0);
  }
  return target;
}

const countdownTarget = getNextNewYear();

function pad(num) {
  return String(num).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  let diff = countdownTarget - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (daysEl) daysEl.textContent = pad(days);
  if (hoursEl) hoursEl.textContent = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================================
   3. INTERACTIVE BUTTON
   Shows a random short coding tip each time it's clicked.
   ========================================================= */
const codingTips = [
  "Commit early, commit often — small commits are easier to undo.",
  "Name variables for what they hold, not for how clever you feel.",
  "Read the error message twice before you start guessing.",
  "A README is a love letter to the version of you six months from now.",
  "Delete code as confidently as you write it.",
  "Test the edge case before you trust the happy path.",
  "If a function needs a comment to explain what it does, consider renaming it.",
  "Version control is not a backup plan, but it will save you like one.",
  "Ship something small today instead of something perfect someday."
];

const tipButton = document.getElementById('tip-btn');
const tipOutput = document.getElementById('tip-output');
let lastTipIndex = -1;

if (tipButton && tipOutput) {
  tipButton.addEventListener('click', () => {
    let index;
    do {
      index = Math.floor(Math.random() * codingTips.length);
    } while (index === lastTipIndex && codingTips.length > 1);

    lastTipIndex = index;
    tipOutput.textContent = codingTips[index];
  });
}


/* =========================================================
   BONUS: DARK / LIGHT MODE TOGGLE
   Switches the site theme and remembers the choice.
   ========================================================= */
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
}

// Restore a previously saved preference, if the browser allows storage.
try {
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) applyTheme(savedTheme);
} catch (err) {
  // Storage unavailable — default theme is used, no action needed.
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const nextTheme = isLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    try {
      localStorage.setItem('site-theme', nextTheme);
    } catch (err) {
      // Storage unavailable — theme still applies for this session.
    }
  });
}


/* =========================================================
   Small extra: auto-fill the footer year.
   ========================================================= */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
