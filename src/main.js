import "./styles.css";

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-form]");
const note = document.querySelector("[data-form-note]");
const year = document.querySelector("[data-year]");

if (year) year.textContent = String(new Date().getFullYear());

const onScroll = () => {
  header?.classList.toggle("is-stuck", window.scrollY > 12);
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
    note.textContent = "Díky. Tohle je zatím nástřel — schránku napojíme, až půjdeme naostro.";
    note.classList.add("is-ok");
  }
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
