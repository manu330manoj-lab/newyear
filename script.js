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
