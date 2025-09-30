/* =====================
   VOTING SYSTEM
===================== */
let votes = JSON.parse(localStorage.getItem("votes")) || { boy: 0, girl: 0 };
let userVote = localStorage.getItem("userVote");

function vote(choice) {
  if (userVote) {
    alert("You already voted!");
    return;
  }
  votes[choice]++;
  userVote = choice;
  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("userVote", choice);
  updateResults();
}

function updateResults() {
  const total = votes.boy + votes.girl;
  const boyPercent = total ? ((votes.boy / total) * 100).toFixed(1) : 0;
  const girlPercent = total ? ((votes.girl / total) * 100).toFixed(1) : 0;
  document.getElementById("results").innerHTML =
    `💙 Boy: ${boyPercent}% (${votes.boy}) | 💖 Girl: ${girlPercent}% (${votes.girl})`;
}

updateResults();

/* =====================
   COUNTDOWN TIMER
===================== */
const revealDate = new Date("Nov 9, 2025 00:00:00").getTime();
const countdownEl = document.getElementById("countdown");
const revealBtn = document.getElementById("reveal-btn");

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = revealDate - now;

  if (distance <= 0) {
    clearInterval(timer);
    countdownEl.innerHTML = "🎉 The moment has arrived! 🎉";
    revealBtn.disabled = false;
    document.body.style.animation = "none"; // stop gradient cycle
    document.body.style.background = "#1e90ff"; // blue background for boy
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = 
      `⏳ Reveal in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

/* =====================
   GENDER REVEAL
===================== */
function revealGender() {
  const revealDiv = document.getElementById("reveal-message");

  revealDiv.textContent = "It's a Boy! 👶💙";
  revealDiv.className = "boy";
  revealDiv.style.display = "block";

  startConfetti();
}

/* =====================
   CONFETTI ANIMATION
===================== */
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

window.addEventListener("resize", () => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
});

let confetti = [];
const confettiCount = 200;

function randomColor() {
  const colors = ["#1e90ff", "#ff69b4", "#f9c74f", "#90be6d", "#f94144"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function ConfettiPiece() {
  this.x = Math.random() * W;
  this.y = Math.random() * H - H;
  this.r = Math.random() * 6 + 4;
  this.d = Math.random() * confettiCount;
  this.color = randomColor();
  this.tilt = Math.floor(Math.random() * 10) - 10;
}

function drawConfetti() {
  ctx.clearRect(0, 0, W, H);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c, i) => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);
    if (c.y > H) {
      confetti[i] = new ConfettiPiece();
      confetti[i].x = Math.random() * W;
      confetti[i].y = -10;
    }
  });
}

function startConfetti() {
  confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new ConfettiPiece());
  }
  (function animate() {
    requestAnimationFrame(animate);
    drawConfetti();
  })();
}
