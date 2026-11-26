# national-statistics-entry

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zebhyrus/national-statistics-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zebhyrus/national-statistics-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat is a national statistics site for Indonesia. It shows real published figures with the source and year on every card and chart: 281.6 million people, GDP Rp22,140 trillion growing 5.03 percent, inflation 1.57 percent, unemployment 4.91 percent, poverty 8.57 percent, HDI 75.02 (all BPS 2024), plus education, health, and a province breakdown for the 10 largest provinces.

Eight sections on hash routes: Ringkasan, Penduduk, Ekonomi, Harga dan kerja, Pendidikan, Kesehatan, Provinsi, Tentang data. Working controls: a search box that filters indicators, a year picker that highlights one year across the trend charts, a province picker with a detail card, and a two province comparison. Charts are drawn on plain canvas, no library, no network request, no build step. Layout is responsive down to a 390 px phone.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in desktop Chrome. Or serve `app/` with any static server.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=9srzvfjv&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
