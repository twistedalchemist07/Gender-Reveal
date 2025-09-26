function revealGender() {
  const revealDiv = document.getElementById("reveal-message");

  // Update message
  revealDiv.textContent = "It's a Boy! 👶💙";
  revealDiv.className = "";
  revealDiv.style.display = "block";
  revealDiv.classList.add("boy");

  // Lock background to blue
  document.body.style.animation = "none";
  document.body.style.background = "#1e90ff";

  // Start confetti (endless loop)
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
const confettiCount = 250;
let animationFrame;

function randomColor() {
  const colors = ["#1e90ff", "#87ceeb", "#e0f7ff", "#f9c74f", "#ffffff"];
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
    animationFrame = requestAnimationFrame(animate);
    drawConfetti();
  })();
}
