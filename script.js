// Load votes from localStorage or initialize
let votes = JSON.parse(localStorage.getItem("votes")) || { boy: 0, girl: 0 };
let userVote = localStorage.getItem("userVote"); // stores if user already voted

const revealBtn = document.getElementById("revealBtn");
const revealText = document.getElementById("revealText");
const timerDisplay = document.getElementById("timer");

// PIE CHART SETUP
const ctx = document.getElementById("voteChart").getContext("2d");
const voteChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Boy 💙", "Girl 💖"],
    datasets: [
      {
        data: [votes.boy, votes.girl],
        backgroundColor: ["#00bfff", "#ff69b4"],
      },
    ],
  },
  options: { responsive: false },
});

// Update chart
function updateChart() {
  voteChart.data.datasets[0].data = [votes.boy, votes.girl];
  voteChart.update();
}

// Initial chart update
updateChart();

// Voting
function vote(choice) {
  if (userVote) {
    alert("You already voted!");
    return;
  }
  votes[choice]++;
  userVote = choice;

  // Save votes and userVote to localStorage
  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("userVote", userVote);

  updateChart();
  alert(`You voted for ${choice === "boy" ? "💙 Boy" : "💖 Girl"}!`);
}

// REVEAL LOGIC
function revealGender() {
  revealText.innerHTML =
    "💙 It's a boy! 💙<br><span style='font-size:1.5rem;'>Welcome, Cloud Kori R. Quilar!</span>";
  document.body.style.background = "#87CEEB";
  document
    .querySelectorAll(".vote-btn")
    .forEach((btn) => (btn.disabled = true));
  revealBtn.disabled = true;
  revealBtn.classList.remove("active");
  revealBtn.style.backgroundColor = "gray";
  triggerConfetti();
  startFireworks();
}

// CONFETTI
function triggerConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ["#bb0000", "#ffffff", "#0000ff"];
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// FIREWORKS
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      speedX: Math.random() * 6 - 3,
      speedY: Math.random() * 6 - 3,
      radius: Math.random() * 3 + 1,
      alpha: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.01;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// TIMER — Reveal available on Nov 9, 2025 9AM (PHT)
const revealDate = new Date("November 9, 2025 09:00:00 GMT+0800").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = revealDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    timerDisplay.textContent = "🎉 Reveal time has come!";
    revealBtn.disabled = false;
    revealBtn.classList.add("active");
    revealBtn.onclick = revealGender;
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timerDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until reveal`;
  }
}, 1000);

// BALLOONS — 10 in total, looping animation
const balloonContainer = document.getElementById("balloon-container");
const numBalloons = 10;
for (let i = 0; i < numBalloons; i++) {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");

  balloon.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 20 + 30;
  balloon.style.width = size + "px";
  balloon.style.height = size * 1.5 + "px";

  balloon.style.backgroundColor = Math.random() > 0.5 ? "blue" : "pink";
  balloon.style.animationDuration = Math.random() * 10 + 5 + "s";
  balloon.style.animationDelay = Math.random() * 10 + "s";

  balloonContainer.appendChild(balloon);
}
