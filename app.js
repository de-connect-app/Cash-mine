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
// Show Withdraw Form
// ---------------------------
function showWithdraw() {
  document.getElementById('withdrawForm').style.display = 'block';
  document.getElementById('whatsappBtn').style.display = 'none'; // Hide WhatsApp initially
}

// ---------------------------
// Submit Withdraw Details
// ---------------------------
function submitWithdraw() {
  const bank = document.getElementById('bank').value.trim();
  const account = document.getElementById('account').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!bank || !account || !phone) {
    alert('Please fill all fields');
    return;
  }

  // Save info in localStorage (optional)
  localStorage.setItem('bank', bank);
  localStorage.setItem('account', account);
  localStorage.setItem('phone', phone);

  alert("Your details have been submitted.\nPlease follow our WhatsApp channel for your code and instructions on how to withdraw.");

  // Show WhatsApp button
  document.getElementById('whatsappBtn').style.display = 'block';
}

// ---------------------------
// Send to WhatsApp Channel
// ---------------------------
function sendToWhatsApp() {
  const url = "https://whatsapp.com/channel/0029Vb5zfLhEKyZQG98VNt2V"; // Updated channel
  window.open(url, "_blank");
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
