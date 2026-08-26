import "./styles.css";

const root = document.body;
const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-form]");
const note = document.querySelector("[data-form-note]");
const year = document.querySelector("[data-year]");
const progress = document.querySelector("[data-progress]");
const preloader = document.querySelector("[data-preloader]");
const stage = document.querySelector("[data-stage]");
const stageToggle = document.querySelector("[data-stage-toggle]");
const stageLabel = document.querySelector("[data-stage-label]");

root.classList.add("is-loading");

if (year) year.textContent = String(new Date().getFullYear());

const hidePreloader = () => {
  preloader?.classList.add("is-gone");
  root.classList.remove("is-loading");
};

window.addEventListener("load", () => setTimeout(hidePreloader, 420));
setTimeout(hidePreloader, 1600);

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  header?.classList.toggle("is-stuck", window.scrollY > 8);
  if (progress) progress.style.width = `${Math.min(ratio, 1) * 100}%`;
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

toggle?.addEventListener("click", () => {
  const open = header?.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  form.reset();
  if (note) {
    note.textContent = "Děkujeme. Tohle je zatím ukázka — schránku napojíme, až půjdeme naostro.";
    note.classList.add("is-ok");
  }
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const frames = stage ? [...stage.querySelectorAll("img")] : [];
let frame = 0;
let playing = false;
let timer;

const showFrame = (index) => {
  frames.forEach((img, i) => img.classList.toggle("is-on", i === index));
};

const stopStage = () => {
  playing = false;
  clearInterval(timer);
  stageToggle?.setAttribute("aria-pressed", "false");
  if (stageLabel) stageLabel.textContent = "Přehrát ukázku";
};

const playStage = () => {
  if (!frames.length) return;
  playing = true;
  stageToggle?.setAttribute("aria-pressed", "true");
  if (stageLabel) stageLabel.textContent = "Pozastavit";
  timer = setInterval(() => {
    frame = (frame + 1) % frames.length;
    showFrame(frame);
  }, 1600);
};

stageToggle?.addEventListener("click", () => {
  if (playing) stopStage();
  else playStage();
});

const parallax = document.querySelector("[data-parallax] img");
if (parallax && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      const rect = parallax.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const shift = (rect.top / window.innerHeight) * -18;
      parallax.style.transform = `scale(1.08) translateY(${shift}px)`;
    },
    { passive: true }
  );
}
