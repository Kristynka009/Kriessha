# Nasazení na GitHub Pages

Jediným zdrojem pravdy je workflow `.github/workflows/deploy.yml`. Tento adresář
obsahuje jen postup a nastavení — druhá kopie workflow se tu už neudržuje
(předchozí duplic se rozšla s reálným souborem a způsobila zbytečné zmatky).

Výjimka: kapitola [Ruční úprava workflow](#ruční-úprava-workflow) níže obsahuje
znění, které je potřeba do `.github/workflows/deploy.yml` vložit ručně —
automatizovaný push do adresáře `.github/workflows/` GitHub odmítá, pokud
připojená aplikace nemá oprávnění **Workflows**.

## Co musí repozitář povolit (jednorázově, jen vlastník)

1. **Settings → General → Change visibility → Public**
   GitHub Pages je zdarma jen u veřejného repozitáře. U privátního repozitáře
   vyžaduje placený plán (Pro / Team / Enterprise) a workflow skončí chybou
   `Resource not accessible by integration`.
2. **Settings → Pages → Source: GitHub Actions**
3. **Settings → Actions → General → Workflow permissions → Read and write permissions**

Bez bodu 3 token workflowu nedostane oprávnění `pages: write` a běh selže na kroku
`Nastavení stránek`.

## Ruční úprava workflow

Dokud repozitář zůstává privátní (nebo než někdo Pages zapne), padá krok
*Nastavení stránek*, protože `actions/configure-pages` s `enablement: true`
nesmí Pages založit. Nové znění se nejdřív zeptá, jestli je Pages zapnuté, a
nasazení spustí jen tehdy; jinak jen uloží build jako artefakt a workflow
zůstane zelený.

Postup: v GitHubu otevřete `.github/workflows/deploy.yml`, klikněte na tužku a
obsah souboru nahraďte tímto:

```yaml
name: Nasazení webu (GitHub Pages)

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      # "true" pouze pokud je GitHub Pages pro repozitář skutečně zapnuté.
      # U privátního repozitáře bez placeného plánu Pages zapnout nelze,
      # proto se nasazení přeskočí a workflow zůstane zelený.
      pages-ready: ${{ steps.pages-check.outputs.ready }}
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm

      - name: Instalace závislostí
        run: npm ci

      - name: Produkční build
        run: npm run build

      - name: Kontrola dostupnosti GitHub Pages
        id: pages-check
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          if gh api "repos/${GITHUB_REPOSITORY}/pages" >/dev/null 2>&1; then
            echo "ready=true" >> "$GITHUB_OUTPUT"
            echo "GitHub Pages je zapnuté – web se nasadí."
          else
            echo "ready=false" >> "$GITHUB_OUTPUT"
            echo "::notice title=GitHub Pages::Pages není pro tento repozitář zapnuté (privátní repozitář vyžaduje placený plán). Build proběhl, nasazení se přeskakuje. Zapněte Pages v Settings → Pages (Source: GitHub Actions), nebo repozitář zveřejněte."
          fi

      - name: Nastavení stránek
        if: steps.pages-check.outputs.ready == 'true'
        uses: actions/configure-pages@v6

      - name: Nahrání artefaktu pro Pages
        if: steps.pages-check.outputs.ready == 'true'
        uses: actions/upload-pages-artifact@v5
        with:
          path: dist

      - name: Nahrání buildu ke stažení
        if: steps.pages-check.outputs.ready != 'true'
        uses: actions/upload-artifact@v7
        with:
          name: dist
          path: dist
          if-no-files-found: error

  deploy:
    needs: build
    if: needs.build.outputs.pages-ready == 'true'
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Publikace
        id: deployment
        uses: actions/deploy-pages@v5
```

Proti původnímu znění se mění tři věci:

| Změna | Důvod |
|---|---|
| přibyl krok *Kontrola dostupnosti GitHub Pages* | zjistí přes `gh api repos/…/pages`, jestli má smysl nasazovat |
| `actions/configure-pages@v6` už nemá `enablement: true` a má podmínku `if` | zakládání Pages přes API je právě to, co u privátního repozitáře vrací `403` |
| job `deploy` má `if: needs.build.outputs.pages-ready == 'true'`, přibylo záložní `actions/upload-artifact@v7` | bez Pages workflow neselže a build je pořád ke stažení z běhu |

## Co workflow udělá a kde to uvidíte

| Pořadí | Co musí proběhnout | Kde to ověřit |
|---|---|---|
| 1 | `npm ci` a `npm run build` na Node 24 | [Actions](https://github.com/Kristynka009/Kriessha/actions) → nejnovější běh → job `build` → kroky *Instalace závislostí*, *Produkční build* |
| 2 | *Kontrola dostupnosti GitHub Pages* řekne `ready=true` | tentýž job → krok *Kontrola dostupnosti GitHub Pages* |
| 3 | `actions/configure-pages@v6` načte nastavení Pages | tentýž job → krok *Nastavení stránek* |
| 4 | `actions/upload-pages-artifact@v5` pošle obsah `dist/` | tentýž job → krok *Nahrání artefaktu pro Pages* |
| 5 | `actions/deploy-pages@v5` publikuje | job `deploy`; **Settings → Environments → github-pages** |
| 6 | web je živý | **Settings → Pages** (zelené „Your site is live at …“) a <https://kristynka009.github.io/Kriessha/> |

Ruční spuštění: **Actions → Nasazení webu (GitHub Pages) → Run workflow** (větev `main`).
Seznam všech běhů: <https://github.com/Kristynka009/Kriessha/actions/workflows/deploy.yml>

## Postup při každé změně

Změny se posílají pull requestem do `main`. Po sloučení PR se workflow spustí
automaticky (je nastavený na `push` do `main`) a web je do minuty aktualizovaný.

## Tabulka chyb

| Chyba | Příčina | Řešení |
|---|---|---|
| `Create Pages site failed. Error: Resource not accessible by integration` | repozitář je privátní, Pages tam bez placeného plánu nejde založit | Settings → General → **Change visibility → Public**, pak Settings → Pages → Source: GitHub Actions |
| `Get Pages site failed. Error: Not Found` | Pages ještě nikdy nebyly pro repozitář zapnuté | Settings → Pages → Source: **GitHub Actions** |
| `refusing to allow a GitHub App to create or update workflow … without workflows permission` | připojená aplikace nemá oprávnění zapisovat do `.github/workflows/` | vložit workflow ručně podle kapitoly [Ruční úprava workflow](#ruční-úprava-workflow), nebo v Aréně znovu připojit GitHub s oprávněním **Workflows** |
| `Resource not accessible by integration` (krok *Nastavení stránek*) | repozitář nedovolí workflow tokenům zapisovat do Pages | Settings → Actions → General → Workflow permissions → **Read and write permissions** |
| `Pages site is not enabled` | Pages mají zdroj nastavený na `None` nebo `classic` | Settings → Pages → Source: **GitHub Actions** |
| `Rollup failed to resolve import` | zastaralé `node_modules` po stažení nové verze | `rm -rf node_modules && npm install` |
| `npm ci` v CI hlásí rozcházející se zámek | `package-lock.json` neodpovídá `package.json` | lokálně `npm install` a `package-lock.json` commitnout |
| `ENOENT: … 'novastranka.html'` | stránka chybí ve `vite.config.js` | zapsat ji do `pages` i `entries` (nebo do `legalPages`) |
