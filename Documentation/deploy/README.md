# Nasazení na GitHub Pages

Jediným zdrojem pravdy je workflow `.github/workflows/deploy.yml`. Tento adresář
obsahuje jen postup a nastavení — druhá kopie workflow se tu už neudržuje
(předchozí duplic se rozšla s reálným souborem a způsobila zbytečné zmatky).

## Co musí repozitář povolit (jednorázově, jen vlastník)

1. **Settings → Pages → Source: GitHub Actions**
2. **Settings → Actions → General → Workflow permissions → Read and write permissions**

Bez bodu 2 token workflowu nedostane oprávnění `pages: write` a běh selže na kroku
`Nastavení stránek` s chybou `Resource not accessible by integration`.

## Co workflow udělá a kde to uvidíte

| Pořadí | Co musí proběhnout | Kde to ověřit |
|---|---|---|
| 1 | `npm ci` a `npm run build` na Node 24 | [Actions](https://github.com/Kristynka009/Kriessha/actions) → nejnovější běh → job `build` → kroky *Instalace závislostí*, *Produkční build* |
| 2 | `actions/configure-pages@v6` najde nebo zapne Pages | tentýž job → krok *Nastavení stránek* |
| 3 | `actions/upload-pages-artifact@v5` pošle obsah `dist/` | tentýž job → krok *Nahrání artefaktu* |
| 4 | `actions/deploy-pages@v5` publikuje | job `deploy`; **Settings → Environments → github-pages** |
| 5 | web je živý | **Settings → Pages** (zelené „Your site is live at …“) a <https://kristynka009.github.io/Kriessha/> |

Ruční spuštění: **Actions → Nasazení webu (GitHub Pages) → Run workflow** (větev `main`).
Seznam všech běhů: <https://github.com/Kristynka009/Kriessha/actions/workflows/deploy.yml>

## Postup při každé změně

Změny se posílají pull requestem do `main`. Po sloučení PR se workflow spustí
automaticky (je nastavený na `push` do `main`) a web je do minuty aktualizovaný.

## Tabulka chyb

| Chyba | Příčina | Řešení |
|---|---|---|
| `Resource not accessible by integration` (krok *Nastavení stránek*) | repozitář nedovolí workflow tokenům zapisovat do Pages | Settings → Actions → General → Workflow permissions → **Read and write permissions** |
| `Pages site is not enabled` | Pages mají zdroj nastavený na `None` nebo `classic` | Settings → Pages → Source: **GitHub Actions** |
| `Rollup failed to resolve import` | zastaralé `node_modules` po stažení nové verze | `rm -rf node_modules && npm install` |
| `npm ci` v CI hlásí rozcházející se zámek | `package-lock.json` neodpovídá `package.json` | lokálně `npm install` a `package-lock.json` commitnout |
| `ENOENT: … 'novastranka.html'` | stránka chybí ve `vite.config.js` | zapsat ji do `pages` i `entries` (nebo do `legalPages`) |
