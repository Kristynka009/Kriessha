import "./styles.css";

const page = document.body.dataset.page || "home";

// Označení aktuální stránky ve statické navigaci (partials vložené při buildu).
document.querySelectorAll("a[data-nav-page]").forEach((link) => {
  if (link.dataset.navPage === page) {
    link.setAttribute("aria-current", "page");
    link.classList.add("is-current");
  }
});
const iconArrow = `
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const logo = `
  <span class="brand-mark" aria-hidden="true">
    <span></span><span></span><span></span>
  </span>
  <span class="brand-name">Kriessha</span>`;

const navItems = [
  ["services", "sluzby.html", "Služby"],
  ["portfolio", "portfolio.html", "Portfolio"],
  ["about", "o-nas.html", "O studiu"],
  ["pricing", "cenik.html", "Ceník"],
];

const headerTarget = document.querySelector("[data-site-header]");
if (headerTarget) {
  headerTarget.outerHTML = `
    <header class="site-header" data-header>
      <div class="scroll-progress" data-progress aria-hidden="true"></div>
      <div class="shell header-inner">
        <a class="wordmark" href="./" aria-label="Kriessha — domovská stránka">${logo}</a>
        <nav class="desktop-nav" aria-label="Hlavní navigace">
          ${navItems
            .map(
              ([id, href, label]) =>
                `<a href="${href}" ${page === id ? 'aria-current="page"' : ""}>${label}</a>`
            )
            .join("")}
        </nav>
        <div class="header-actions">
          <span class="header-note"><i></i> Praha · na dálku</span>
          <a class="btn btn-small btn-dark header-cta" href="kontakt.html">Nezávazně poptat ${iconArrow}</a>
          <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu">
            <span class="sr-only">Otevřít menu</span><i></i><i></i>
          </button>
        </div>
      </div>
      <div class="mobile-panel" id="mobile-menu" data-mobile-menu aria-hidden="true">
        <div class="shell mobile-panel-inner">
          <p class="micro-label">Menu</p>
          <nav aria-label="Mobilní navigace">
            <a href="./" ${page === "home" ? 'aria-current="page"' : ""}>Domů <span>00</span></a>
            ${navItems
              .map(
                ([id, href, label], index) =>
                  `<a href="${href}" ${page === id ? 'aria-current="page"' : ""}>${label}<span>0${index + 1}</span></a>`
              )
              .join("")}
            <a href="kontakt.html" ${page === "contact" ? 'aria-current="page"' : ""}>Kontakt <span>05</span></a>
          </nav>
          <div class="mobile-panel-foot">
            <p>Krátká reklamní videa z vašich fotografií.</p>
            <a class="btn btn-primary" href="kontakt.html">Začít projekt ${iconArrow}</a>
          </div>
        </div>
      </div>
    </header>`;
}

const footerTarget = document.querySelector("[data-site-footer]");
if (footerTarget) {
  footerTarget.outerHTML = `
    <footer class="site-footer">
      <div class="shell footer-main">
        <div class="footer-brand">
          <a class="wordmark wordmark-large" href="./">${logo}</a>
          <p>Z vašich fotografií tvoříme krátká videa, která jsou připravená zaujmout i prodávat.</p>
          <a class="footer-contact-link" href="kontakt.html">Pojďme probrat váš projekt ${iconArrow}</a>
        </div>
        <div class="footer-nav-group">
          <p class="micro-label">Studio</p>
          <a href="sluzby.html">Služby</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="o-nas.html">O studiu</a>
          <a href="cenik.html">Ceník</a>
          <a href="kontakt.html">Kontakt</a>
        </div>
        <div class="footer-nav-group">
          <p class="micro-label">Informace</p>
          <a href="ochrana-soukromi.html">Ochrana soukromí</a>
          <a href="cookies.html">Zásady cookies</a>
          <a href="obchodni-podminky.html">Obchodní podmínky</a>
          <a href="pristupnost.html">Přístupnost</a>
          <button type="button" data-cookie-settings>Nastavení soukromí</button>
        </div>
        <div class="footer-studio">
          <p class="micro-label">Ateliér</p>
          <p>Praha, Česko<br />Spolupráce po celé ČR</p>
          <span class="availability"><i></i> Poptávky přijímáme online</span>
        </div>
      </div>
      <div class="shell footer-legal-note">
        <p>Web provozuje kreativní studio <strong>Kriessha</strong>, Praha. Úplné identifikační údaje provozovatele (jméno, sídlo, IČO a kontaktní e-mail) jsou zveřejněny v <a href="ochrana-soukromi.html">dokumentu o ochraně osobních údajů</a> a budou doplněny před veřejným spuštěním. Používání webu se řídí <a href="obchodni-podminky.html">obchodními podmínkami</a> a <a href="cookies.html">zásadami cookies</a>.</p>
      </div>
      <div class="shell footer-bottom">
        <p>© <span data-year></span> Kriessha. Všechna práva vyhrazena.</p>
        <p>Creative motion studio · Praha</p>
        <a href="#top" class="to-top-inline">Nahoru <span aria-hidden="true">↑</span></a>
      </div>
    </footer>`;
}

const privacyUi = document.createElement("div");
privacyUi.innerHTML = `
  <aside class="cookie-banner" data-cookie-banner aria-label="Informace o soukromí" hidden>
    <div class="cookie-icon" aria-hidden="true"><span></span><i></i><i></i></div>
    <div>
      <strong>Soukromí bez drobného písma.</strong>
      <p>Nepoužíváme analytické ani reklamní cookies. Ukládáme jen vaši volbu k tomuto oznámení.</p>
    </div>
    <div class="cookie-actions">
      <button class="btn btn-small btn-primary" type="button" data-cookie-accept>Rozumím</button>
      <button class="text-button" type="button" data-cookie-settings>Podrobnosti</button>
    </div>
  </aside>
  <dialog class="privacy-dialog" data-privacy-dialog aria-labelledby="privacy-title">
    <form method="dialog" class="privacy-dialog-card">
      <div class="dialog-head">
        <div>
          <p class="micro-label">Centrum soukromí</p>
          <h2 id="privacy-title">Vy rozhodujete. My nic nesledujeme.</h2>
        </div>
        <button class="icon-button" value="cancel" aria-label="Zavřít nastavení">×</button>
      </div>
      <p>Tato verze webu nepoužívá analytiku, reklamní pixely ani profilování. Nastavení je proto jednoduché.</p>
      <div class="privacy-option">
        <div><strong>Nezbytné úložiště</strong><span>Zapamatuje si zavření tohoto oznámení. Bez osobních údajů.</span></div>
        <span class="always-on">Vždy aktivní</span>
      </div>
      <div class="privacy-option is-muted">
        <div><strong>Analytické a marketingové cookies</strong><span>Na tomto webu je nepoužíváme.</span></div>
        <span class="always-off">Neaktivní</span>
      </div>
      <div class="dialog-actions">
        <a href="cookies.html" class="text-link">Přečíst zásady cookies</a>
        <button class="btn btn-dark" value="default" data-cookie-accept>Uložit a zavřít</button>
      </div>
    </form>
  </dialog>`;
document.body.append(...privacyUi.children);

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const progress = document.querySelector("[data-progress]");
const toTop = document.querySelector("[data-to-top]");

const closeMenu = (restoreFocus = false) => {
  header?.classList.remove("menu-open");
  document.body.classList.remove("menu-is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
  const label = menuToggle?.querySelector(".sr-only");
  if (label) label.textContent = "Otevřít menu";
  if (restoreFocus) menuToggle?.focus();
};

menuToggle?.addEventListener("click", () => {
  const open = !header?.classList.contains("menu-open");
  if (!open) {
    closeMenu();
    return;
  }
  header?.classList.add("menu-open");
  document.body.classList.add("menu-is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu?.setAttribute("aria-hidden", "false");
  const label = menuToggle.querySelector(".sr-only");
  if (label) label.textContent = "Zavřít menu";
  window.setTimeout(() => mobileMenu?.querySelector("a")?.focus(), 80);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header?.classList.contains("menu-open")) {
    closeMenu(true);
    return;
  }
  if (event.key !== "Tab" || !header?.classList.contains("menu-open") || !mobileMenu) return;
  const focusable = [menuToggle, ...mobileMenu.querySelectorAll("a, button")].filter(Boolean);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const updateScrollUi = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const amount = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
  toTop?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.7);
};

updateScrollUi();
window.addEventListener("scroll", updateScrollUi, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) closeMenu();
}, { passive: true });

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -5%" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-revealed"));
}

// Keep only one FAQ item open at a time inside each accordion.
document.querySelectorAll("[data-accordion]").forEach((accordion) => {
  accordion.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      accordion.querySelectorAll("details").forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });
});

// Accessible portfolio filters.
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const portfolioItems = [...document.querySelectorAll("[data-category]")];
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    portfolioItems.forEach((item) => {
      const visible = filter === "all" || item.dataset.category === filter;
      item.hidden = !visible;
    });
  });
});

// Interactive before/after showcase on the homepage.
const showcase = document.querySelector("[data-showcase]");
if (showcase) {
  const frames = [...showcase.querySelectorAll("[data-showcase-frame]")];
  const tabs = [...document.querySelectorAll("[data-showcase-tab]")];
  frames.forEach((frame, index) => {
    frame.id = `showcase-panel-${index + 1}`;
    frame.setAttribute("aria-labelledby", `showcase-tab-${index + 1}`);
  });
  tabs.forEach((tab, index) => {
    tab.id = `showcase-tab-${index + 1}`;
    tab.setAttribute("aria-controls", `showcase-panel-${index + 1}`);
  });
  const setFrame = (index) => {
    frames.forEach((frame, frameIndex) => {
      const active = frameIndex === index;
      frame.classList.toggle("is-active", active);
      frame.setAttribute("aria-hidden", String(!active));
    });
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setFrame(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + tabs.length) % tabs.length;
      setFrame(next);
      tabs[next].focus();
    });
  });
  setFrame(0);
}

// Carry the chosen package from pricing links into the contact form.
const packageParam = new URLSearchParams(window.location.search).get("balicek");
const packageMap = { start: "start", studio: "studio", pece: "care" };
if (packageParam && packageMap[packageParam]) {
  const option = document.querySelector(`input[name="package"][value="${packageMap[packageParam]}"]`);
  if (option) option.checked = true;
}

// The repository contains a front-end presentation only. Keep the form honest and ready for a real endpoint.
document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (status) {
      status.hidden = false;
      status.innerHTML = "<strong>Formulář je připravený.</strong> V této prezentační verzi se data nikam neodesílají. Před spuštěním stačí napojit zabezpečený endpoint.";
      status.focus();
    }
  });
});

const COOKIE_KEY = "kriessha_privacy_notice_v1";
const banner = document.querySelector("[data-cookie-banner]");
const privacyDialog = document.querySelector("[data-privacy-dialog]");
let cookieStored = false;
try {
  cookieStored = window.localStorage.getItem(COOKIE_KEY) === "acknowledged";
} catch {
  cookieStored = false;
}
if (banner && !cookieStored) banner.hidden = false;

const storeCookieChoice = () => {
  try {
    window.localStorage.setItem(COOKIE_KEY, "acknowledged");
  } catch {
    // The interface still closes when storage is unavailable.
  }
  if (banner) banner.hidden = true;
  if (privacyDialog?.open) privacyDialog.close();
};

document.querySelectorAll("[data-cookie-accept]").forEach((button) => {
  button.addEventListener("click", storeCookieChoice);
});

document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof privacyDialog?.showModal === "function") privacyDialog.showModal();
    else privacyDialog?.setAttribute("open", "");
  });
});

