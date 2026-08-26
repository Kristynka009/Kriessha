import { resolve } from "node:path";
import { defineConfig } from "vite";

const pages = [
  "index.html",
  "sluzby.html",
  "portfolio.html",
  "o-nas.html",
  "kontakt.html",
  "ochrana-soukromi.html",
  "cookies.html",
  "obchodni-podminky.html",
  "pristupnost.html",
  "404.html",
];

export default defineConfig({
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
