# AGENT.md — NusaStat (national-statistics-entry)

## What was built

NusaStat, an original national statistics site for **Indonesia**, in Indonesian,
for the make.fun bounty `best-national-statistics-site-20261126-0539`.
Static files under `app/`, no build step, no network request, no library:
plain ES modules plus canvas charts.

- `app/index.html` — shell: top bar with brand, search box, footer
- `app/style.css` — teal and amber design on paper, responsive to 390 px
- `app/data.js` — all figures, each with source and year
- `app/charts.js` — canvas bar, line, and horizontal bar chart helpers
- `app/views.js` — hash router and all eight sections, every control wired
- `app/main.js` — bootstrap, search, hash change, resize redraw
- `main.ts` — copies `app/` and `screenshots/` to the output dir and writes
  `dossier.json` with the vendored `buildDossier`
- `serve.ts` — tiny local static server for testing

Sections: Ringkasan (8 headline indicators plus 4 trend charts and a year
picker), Penduduk, Ekonomi (growth chart, sector shares, trade), Harga dan
kerja (inflation, unemployment, poverty), Pendidikan, Kesehatan, Provinsi
(province picker with detail card, two province comparison, full table),
Tentang data (sources and reading notes).

## Country and data sources

Country: Indonesia. Sources and years, cited on every figure:

- BPS (Badan Pusat Statistik), 2019 to 2024: population 281.6 million,
  GDP Rp22,140 trillion, growth 5.03 percent, GDP per capita Rp78.6 million,
  inflation 1.57 percent, unemployment 4.91 percent, poverty 8.57 percent,
  HDI 75.02, life expectancy 74.23 years, mean schooling 9.07 years,
  province populations and shares.
- Kementerian Kesehatan, SSGI 2023: stunting 21.5 percent; Kemenkes 2023:
  10,374 puskesmas.
- BPJS Kesehatan 2024: 98.2 million active JKN participants.
- BPS 2020: maternal mortality 173 per 100,000 live births.

Figures are rounded published values; the site states the source and year
next to each one. No figure is invented.

## How to run it

```sh
node serve.ts            # serves app/ on http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # writes out/dossier.json
```

## What was tested and results

- Served `app/` locally; index, CSS, and all four JS files return 200.
- Rendered in real headless Chromium (Playwright chromium 1255):
  desktop overview, economy, regions, and a 390 by 844 phone overview.
  All four screenshots inspected visually: cards, charts, tables, and
  selectors render correctly; phone layout stacks to one column.
- Verified with `--dump-dom` that the regions, about, and health routes
  render their content (province card, BPS source list, stunting figure).
- Checked the site files for external URLs: none found.
- Ran `main.ts` twice into two output dirs: `dossier.json` sha256 identical
  both runs (deterministic), 872,554 bytes, under the 1.5 MiB cap.
- Screenshot limits: 4 files, each under 256 KiB, long side at most 1280,
  short side at least 360 (390 phone).
- Fixed after first render: the first indicator label was in English
  ("Population"); changed to "Penduduk" and re-shot the two overview
  screenshots.

## Limits

- Province coverage is the 10 largest provinces by population, not all 38.
- The bundled Chromium at `/opt/meta-chromium/chrome` refuses to start in
  this VM (Hatch WebGL domain policy error), so screenshots used the
  Playwright chromium at `~/.cache/ms-playwright/chromium-1255/`.
- Search only filters the headline indicators; it does not search tables.
- Charts use canvas, so values are also written as text on the page for
  screen readers via the card values and the comparison text.
