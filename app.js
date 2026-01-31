// Load saved data or start fresh
let credits = parseInt(localStorage.getItem("credits")) || 0;
let plays = parseInt(localStorage.getItem("plays")) || 0;

// Grab elements
const creditsEl = document.getElementById("credits");
const playsEl = document.getElementById("plays");
const statusEl = document.getElementById("status");
const progressBar = document.getElementById("progress-bar");
const mineBtn = document.getElementById("mineBtn");
const restartBtn = document.getElementById("restartBtn");

let mining = false;
let minedCredits = 0;
let timerInterval = null;

// Update dashboard
function updateUI() {
  creditsEl.innerText = credits;
  playsEl.innerText = plays;

  if (credits >= 5000 && plays >= 3) {
    statusEl.innerText = "Qualified";
    statusEl.style.color = "lime";
  } else {
    statusEl.innerText = "Not Qualified";
    statusEl.style.color = "red";
  }
  progressBar.style.width = mining ? Math.min((minedCredits/1500)*100,100)+"%" : "0%";
}

// Start mining
function startMine() {
  if (mining) return; // Prevent multiple starts
  mining = true;
  minedCredits = 0;
  let timeLeft = 15;

  statusEl.innerText = `Mining... ${timeLeft}s`;
  statusEl.style.color = "orange";

  // Timer countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    statusEl.innerText = `Mining... ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      mining = false;
      credits += minedCredits;
      plays += 1;
      localStorage.setItem("credits", credits);
      localStorage.setItem("plays", plays);
      updateUI();
      alert(`Mining done! You earned ${minedCredits} credits.`);
    }
  }, 1000);
}

// Mine button click increments credits while mining
mineBtn.addEventListener("click", () => {
  if (!mining) {
    startMine(); // Start mining if not started
    return;
  }

  // Only add credits while mining
  let gain = Math.floor(Math.random() * 100) + 50;
  minedCredits += gain;
  updateUI();
});

// Redeem button
function redeem() {
  if (credits >= 5000 && plays >= 3) {
    localStorage.setItem('credits', 0);
    localStorage.setItem('plays', 0);
    window.location.href = "redeem.html";
  } else {
    alert("You are not qualified yet. Earn more credits!");
  }
}

// How to Qualify button
function howTo() {
  alert("To qualify:\n• Earn at least 5,000 credits\n• Play at least 3 times");
}

// Restart button
restartBtn.addEventListener("click", () => {
  if(confirm("Are you sure you want to restart? This will reset credits and plays.")) {
    localStorage.setItem('credits', 0);
    localStorage.setItem('plays', 0);
    credits = 0;
    plays = 0;
    minedCredits = 0;
    mining = false;
    clearInterval(timerInterval);
    updateUI();
    alert("Game has been reset. You can start mining again!");
  }
});

// Initialize dashboard
updateUI();
