// ===========================
// CASH-MINE APP.JS
// ===========================

// Load saved data
let points = Number(localStorage.getItem('points')) || 0;
let plays = Number(localStorage.getItem('plays')) || 0;

// Display user info from login
document.getElementById('userPhone').innerText =
  localStorage.getItem('userPhone') || 'Guest';

updateUI();

// ---------------------------
// Update Dashboard
// ---------------------------
function updateUI() {
  document.getElementById('points').innerText = points;
  document.getElementById('plays').innerText = plays;

  let naira = Math.floor((points / 100) * 150);
  document.getElementById('naira').innerText = naira;

  let progress = Math.min((points / 500) * 100, 100);
  document.getElementById('progressBar').style.width = progress + '%';

  document.getElementById('status').innerText =
    points >= 500 ? 'Qualified' : 'Not Qualified';
}

// ---------------------------
// Mine Button
// ---------------------------
function mine() {
  points += 100;
  plays += 1;

  localStorage.setItem('points', points);
  localStorage.setItem('plays', plays);

  updateUI();
}

// ---------------------------
// How to Qualify Button
// ---------------------------
function howTo() {
  alert(
    "How to qualify:\n\n" +
    "• Mine points\n" +
    "• Reach at least 500 points\n" +
    "• Click Withdraw\n" +
    "• Follow our WhatsApp channel to get your code and instructions"
  );
}

/* 
// The old withdraw functions are now disabled
// ---------------------------
// Show Withdraw Form
// ---------------------------
// function showWithdraw() { ... }

// ---------------------------
// Submit Withdraw Details
// ---------------------------
// function submitWithdraw() { ... }

// ---------------------------
// Send to WhatsApp Channel
// ---------------------------
// function sendToWhatsApp() { ... }
*/
