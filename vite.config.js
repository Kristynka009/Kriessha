import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

/**
 * Statický header/footer: partials z src/partials se vkládají do každé stránky
 * už při buildu (a i v dev serveru). Výsledkem je navigace čitelná bez JavaScriptu
 * a indexovatelná vyhledávači; main.js ji dále jen oživuje (menu, aria-current).
 */
const injectPartials = () => {
  const header = readFileSync(resolve(import.meta.dirname, "src/partials/header.html"), "utf8").trim();
  const footer = readFileSync(resolve(import.meta.dirname, "src/partials/footer.html"), "utf8").trim();
  return {
    name: "kriessha-static-chrome",
    transformIndexHtml(html) {
      return html
        .replace("<div data-site-header></div>", () => header)
        .replace("<div data-site-footer></div>", () => footer);
    },
  };
};

const pages = [
  "index.html",
  "sluzby.html",
  "portfolio.html",
  "o-nas.html",
  "cenik.html",
  "kontakt.html",
  "ochrana-soukromi.html",
  "cookies.html",
  "obchodni-podminky.html",
  "pristupnost.html",
  "404.html",
];

export default defineConfig({
  // Relativní base: build funguje na vlastní doméně i pod složkou repozitáře
  // na GitHub Pages (kristynka009.github.io/Kriessha/).
  base: "./",
  plugins: [injectPartials()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.replace(/\.html$/, ""), resolve(import.meta.dirname, page)])
      ),
    },
  },
});
