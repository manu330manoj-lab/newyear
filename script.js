// Fade-in animation
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.18 });

sections.forEach(section => observer.observe(section));

// Image popup modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".photo img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});
const music = document.getElementById("bgMusic");
music.volume = 0; // start silent

let fadeInterval;

// start music after first user interaction
document.addEventListener("click", () => {
  music.play();
  fadeInMusic();
}, { once: true });

function fadeInMusic() {
  fadeInterval = setInterval(() => {
    if (music.volume < 0.3) {
      music.volume += 0.01;
    } else {
      clearInterval(fadeInterval);
    }
  }, 150);
}
const btn = document.getElementById("musicBtn");
let isPlaying = false;

btn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevents double triggering

  if (!isPlaying) {
    music.play();
    btn.textContent = "❚❚";
  } else {
    music.pause();
    btn.textContent = "♫";
  }

  isPlaying = !isPlaying;
});

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(canvas.height * 0.2, canvas.height * 0.5);
    this.radius = 2;
    this.color = `hsl(${random(0,360)},70%,70%)`;
    this.speed = random(3, 5);
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
      }
    } else {
      this.particles.forEach(p => p.update());
    }
  }

  explode() {
    this.exploded = true;
    for (let i = 0; i < 30; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw());
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.life = 60;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    if (this.life > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

let fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.04) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((fw, index) => {
    fw.update();
    fw.draw();
    if (fw.exploded && fw.particles.every(p => p.life <= 0)) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

