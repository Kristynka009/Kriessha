# Kriessha

Prémiový vícestránkový web pražského ateliéru krátkého videa. Z produktových a lifestylových fotografií vznikají vertikální kreativy pro Reels, Stories a Meta Ads.

## Co web obsahuje

- responzivní domovskou stránku s portfoliem, procesem, ceníkem, FAQ a CTA,
- samostatné stránky **Služby**, **Portfolio**, **O studiu** a **Kontakt**,
- funkční mobilní navigaci, filtry portfolia, přístupný akordeon a dialog soukromí,
- právní sekci: ochrana osobních údajů, cookies, obchodní podmínky a přístupnost,
- lokálně hostované variabilní fonty (žádný požadavek na Google Fonts),
- optimalizované responzivní WebP fotografie a malé ikony aplikace,
- metadata pro sdílení, JSON-LD, manifest, robots.txt a vlastní stránku 404,
- podporu `prefers-reduced-motion`, klávesnice, zvětšení textu a tisk právních dokumentů.

## Spuštění

```bash
npm install
npm run dev
```

Vývojový server poběží na `http://localhost:5173`.

Produkční sestavení:

```bash
npm run build
npm run preview
```

Vite sestaví všech deset HTML vstupů definovaných ve `vite.config.js`.

## Struktura

```text
index.html                    Domovská stránka
sluzby.html                   Detail služeb a srovnání balíčků
portfolio.html                Filtrovatelné portfolio
kontakt.html                  Poptávkový formulář
o-nas.html                    Studio, hodnoty a přístup k AI
ochrana-soukromi.html         Informace podle GDPR
cookies.html                  Přehled lokálního úložiště
obchodni-podminky.html        Podmínky kreativních služeb
pristupnost.html              Prohlášení o přístupnosti
404.html                      Chybová stránka
src/main.js                   Sdílený header/footer a interakce
src/styles.css                Design systém a všechny layouty
Documentation/Brand           Závazná barevná paleta
```

## Povinné kroky před ostrým spuštěním

Web záměrně nevymýšlí firemní ani kontaktní údaje, které v zadání nebyly. Před zveřejněním je proto nutné:

1. doplnit skutečný název/jméno provozovatele, sídlo, IČO, údaj o DPH a kontaktní e-mail do právních stránek a patičky;
2. napojit formulář na zabezpečený endpoint, přidat serverovou validaci, ochranu proti spamu a potvrzovací e-mail;
3. upravit zásady soukromí podle reálného hostingu, e-mailu, cloudového úložiště a formulářového dodavatele;
4. nechat obchodní podmínky zkontrolovat podle skutečného smluvního a daňového modelu;
5. po určení finální domény doplnit canonical URL, `og:url` a absolutní `sitemap.xml` do `robots.txt`;
6. pokud se přidá analytika, Meta Pixel, mapa, chat nebo vložené video, rozšířit consent režim i právní dokumentaci **před jejich načtením**;
7. provést závěrečný audit formuláře a přístupnosti v produkčním hostingu.

Aktuální prezentační formulář data nikam neodesílá a po validaci tuto skutečnost transparentně oznámí.

## Kontrola kvality

Použité kontroly:

```bash
npm run build
npx html-validate '*.html'
git diff --check
```

HTML stránky procházejí validací `html-validate`; produkční build má sdílený JS bundle přibližně 4 kB gzip a CSS přibližně 10 kB gzip (bez fontů a fotografií).
