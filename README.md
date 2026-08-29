# Kriessha

Prémiový vícestránkový web pražského ateliéru krátkého videa. Z produktových a lifestylových fotografií vznikají vertikální kreativy pro Reels, Stories a Meta Ads.

## Co web obsahuje

- 11 stránek: domů, **Služby**, **Portfolio**, **O studiu**, **Ceník** (nově samostatná stránka se srovnávací tabulkou a doplňky), **Kontakt** a právní sekci,
- statický header a footer ve všech stránkách (vkládá se už při buildu — čitelné bez JavaScriptu, indexovatelné vyhledávači),
- právní sekci: ochrana osobních údajů (GDPR), cookies + cookie lišta s nastavením, obchodní podmínky, přístupnost a identifikace provozovatele v patičce,
- samostatně hostované variabilní fonty (`src/fonts/`) — **žádná závislost na npm fontových balíčcích, build nemůže selhat na chybějícím importu**,
- plynulé přechody mezi stránkami (View Transitions) a prefetch odkazů (Speculation Rules) s respektem k `prefers-reduced-motion`,
- responzivní fluidní typografii (`clamp()`), autoprefixer pro širší podporu prohlížečů, vlastní 404 stránku funkční na jakékoli adrese,
- optimalizované responzivní WebP fotografie, metadata pro sdílení, JSON-LD, `sitemap.xml`, `robots.txt` a manifest.

## Spuštění

```bash
npm install
npm run dev
```

> **Pozor:** po každém stažení nové verze z Gitu nejdřív spusťte `npm install`.
> Stará `node_modules` bez nových závislostí byla příčinou dřívější chyby
> `Rollup failed to resolve import "@fontsource-variable/..."` — tato závislost
> už je zcela odstraněná, ale `vite` samotný vždy `npm install` potřebuje.

Vývojový server poběží na `http://localhost:5173`.

Produkční sestavení a místní náhled:

```bash
npm run build
npm run preview
```

Vite sestaví všech 11 HTML vstupů definovaných ve `vite.config.js`.

## Nasazení na web (GitHub Pages)

Nasazuje `.github/workflows/deploy.yml` (build na Node 24, artefakt z `dist/`, publikace přes `deploy-pages`). Žádný ruční přesun souborů ani druhá kopie workflow už se nedělá — podrobnosti a tabulka chyb jsou v [`Documentation/deploy/README.md`](Documentation/deploy/README.md).

Jednorázově musí vlastník repozitáře povolit: **Settings → Pages → Source: GitHub Actions** a **Settings → Actions → General → Workflow permissions → Read and write permissions**.

Po sloučení pull requestu do `main` se workflow spustí sám a web je do minuty aktualizovaný na `https://kristynka009.github.io/Kriessha/`. Průběh je vidět v záložce **Actions**, výsledek v **Settings → Pages**.

„Stará verze" se už nezobrazí: všechny assety mají v názvu hash buildu a GitHub Pages cachuje maximálně 10 minut.

## Struktura

```text
index.html                    Domovská stránka
sluzby.html                   Detail služeb a srovnání balíčků
portfolio.html                Filtrovatelné portfolio
cenik.html                    Balíčky, srovnávací tabulka, doplňky, FAQ
kontakt.html                  Poptávkový formulář
o-nas.html                    Studio, hodnoty a přístup k AI
ochrana-soukromi.html         Informace podle GDPR
cookies.html                  Přehled lokálního úložiště
obchodni-podminky.html        Podmínky kreativních služeb
pristupnost.html              Prohlášení o přístupnosti
404.html                      Samostatná chybová stránka (bez externích závislostí)
src/main.js                   Interakce, cookie lišta, fallback chrome
src/styles.css                Design systém a všechny layouty
src/fonts.css                 @font-face pro samostatně hostované fonty
src/fonts/                    WOFF2 podsady latin + latin-ext (OFL)
src/partials/header.html      Statický header (vkládá build)
src/partials/footer.html      Statický footer (vkládá build)
.github/workflows/deploy.yml           Deploy workflow (build + publikace Pages)
Documentation/deploy/README.md         Návod a tabulka chyb nasazení
Documentation/Brand           Závazná barevná paleta
```

## Povinné kroky před ostrým spuštěním

Web záměrně nevymýšlí firemní ani kontaktní údaje, které v zadání nebyly. Před zveřejněním je proto nutné:

1. doplnit skutečný název/jméno provozovatele, sídlo, IČO, údaj o DPH a kontaktní e-mail do právních stránek a patičky;
2. napojit formulář na zabezpečený endpoint, přidat serverovou validaci, ochranu proti spamu a potvrzovací e-mail;
3. upravit zásady soukromí podle reálného hostingu, e-mailu, cloudového úložiště a formulářového dodavatele;
4. nechat obchodní podmínky zkontrolovat podle skutečného smluvního a daňového modelu;
5. po přechodu na vlastní doménu aktualizovat canonical URL, `og:url` a absolutní adresy v `sitemap.xml` a `robots.txt` (vše na jednom místě — `scripts/normalize-pages.py` a `public/sitemap.xml`);
6. pokud se přidá analytika, Meta Pixel, mapa, chat nebo vložené video, rozšířit consent režim i právní dokumentaci **před jejich načtením**;
7. provést závěrečný audit formuláře a přístupnosti v produkčním hostingu.

Aktuální prezentační formulář data nikam neodesílá a po validaci tuto skutečnost transparentně oznámí.

## Kontrola kvality

```bash
npm run build
npx html-validate '*.html'
git diff --check
```

HTML stránky procházejí validací `html-validate`; produkční build má sdílený JS bundle přibližně 4,5 kB gzip a CSS přibližně 11,5 kB gzip (bez fontů a fotografií). Odkazy a assety všech stránek procházejí automatickým crawl testem (vše HTTP 200).
