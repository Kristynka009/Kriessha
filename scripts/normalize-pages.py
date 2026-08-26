#!/usr/bin/env python3
"""Normalizace cest + doplnění SEO hlaviček do všech HTML stránek.

- interní odkazy a assety → relativní cesty (funguje pod GitHub Pages subcestou i na vlastní doméně)
- canonical + og:url + og:site_name + twitter:card + speculation rules do každého <head>
- og:image → absolutní URL (sdílecí crawleři vyžadují absolutní adresy)
"""
import re
from pathlib import Path

BASE = "https://kristynka009.github.io/Kriessha/"  # po nasazení vlastní domény zde změňte

PAGES = {
    "index.html": "",
    "sluzby.html": "sluzby.html",
    "portfolio.html": "portfolio.html",
    "o-nas.html": "o-nas.html",
    "kontakt.html": "kontakt.html",
    "ochrana-soukromi.html": "ochrana-soukromi.html",
    "cookies.html": "cookies.html",
    "obchodni-podminky.html": "obchodni-podminky.html",
    "pristupnost.html": "pristupnost.html",
}

SPECULATION = """    <script type="speculationrules">
      {"prefetch":[{"source":"document","where":{"href_matches":"/*"},"eagerness":"conservative"}]}
    </script>"""

root = Path(__file__).resolve().parent.parent

for name, slug in PAGES.items():
    path = root / name
    html = path.read_text(encoding="utf-8")
    canonical = BASE + slug

    # --- absolutní URL pro sdílení (crawleři vyžadují absolutní og:image) ---
    html = html.replace('content="/images/og-share.jpg"', f'content="{BASE}images/og-share.jpg"')

    # --- interní odkazy na relativní ---
    html = html.replace('href="/#cenik"', 'href="./#cenik"')
    html = re.sub(r'href="/([a-z0-9-]+\.html)(#[^"]*)?(\?[^"]*)?"', r'href="\1\2\3"', html)
    html = html.replace('href="/"', 'href="./"')
    html = re.sub(r'(src|srcset)="/images/', r'\1="images/', html)
    html = re.sub(r'(srcset="[^"]*?)/images/', r'\1images/', html)
    html = html.replace('src="/src/main.js"', 'src="src/main.js"')
    html = html.replace('href="/favicon.png"', 'href="favicon.png"')
    html = html.replace('href="/apple-touch-icon.png"', 'href="apple-touch-icon.png"')
    html = html.replace('href="/site.webmanifest"', 'href="site.webmanifest"')

    # --- SEO blok před </head> (pokud už tam není) ---
    if "rel=\"canonical\"" not in html:
        seo = (
            f"    <link rel=\"canonical\" href=\"{canonical}\">\n"
            f"    <meta property=\"og:url\" content=\"{canonical}\">\n"
            f"    <meta property=\"og:site_name\" content=\"Kriessha\">\n"
            f"    <meta name=\"twitter:card\" content=\"summary_large_image\">\n"
            f"{SPECULATION}\n"
        )
        html = html.replace("  </head>", seo + "  </head>", 1)

    path.write_text(html, encoding="utf-8")
    print(f"OK {name} → {canonical}")

print("Hotovo.")
