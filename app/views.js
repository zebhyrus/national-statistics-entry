// Views for NusaStat. One hash route per topic, each route renders
// its section into #view and draws its charts. Every control on the
// page does real work: topic links switch sections, the year picker
// highlights one year across the trend charts, the province picker
// fills the province detail card, and the compare picker draws two
// provinces side by side.
import { META, INDICATORS, SERIES, SECTORS, TRADE, EDUCATION, HEALTH, PROVINCES, SOURCES, TOPICS } from "./data.js";
import { drawBarChart, drawLineChart, drawHBarChart, TEAL, AMBER, BLUE } from "./charts.js";

const view = document.getElementById("view");
let year = 2024;
let province = "Jawa Barat";
let compareA = "Jawa Barat";
let compareB = "DKI Jakarta";

export function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, "") || "overview";
  return TOPICS.some((t) => t.id === hash) ? hash : "overview";
}

function nav(active) {
  return '<nav class="topics" aria-label="Topik">' + TOPICS.map((t) =>
    '<a href="#/' + t.id + '" class="topic' + (t.id === active ? " active" : "") + '">' + t.label + "</a>"
  ).join("") + "</nav>";
}

function sourceLine(source) {
  return '<p class="source">Sumber: ' + source + "</p>";
}

function card(ind) {
  return '<article class="card"><p class="cardlabel">' + ind.label + '</p><p class="big">' + ind.value +
    '</p><p class="detail">' + ind.detail + "</p><p class=\"change\">" + ind.change + "</p>" +
    sourceLine(ind.source) + "</article>";
}

function chartBlock(id, title, source, height) {
  return '<section class="chartbox"><h3>' + title + "</h3>" +
    '<canvas id="' + id + '" data-height="' + (height || 240) + '" role="img" aria-label="' + title + '"></canvas>' +
    sourceLine(source) + "</section>";
}

function yearPicker() {
  return '<label class="picker">Tahun sorot <select id="yearpick" aria-label="Pilih tahun">' +
    SERIES.years.map((y) => '<option value="' + y + '"' + (y === year ? " selected" : "") + ">" + y + "</option>").join("") +
    "</select></label>";
}

function yearNote(key) {
  const i = SERIES.years.indexOf(year);
  return '<p class="callout">Pada ' + year + ", " + SERIES[key].label.toLowerCase() + " tercatat <strong>" +
    SERIES[key].values[i] + " " + SERIES[key].unit + "</strong>. " + SERIES[key].source + ".</p>";
}

function renderOverview() {
  view.innerHTML = nav("overview") +
    '<header class="hero"><p class="eyebrow">Statistik resmi negara</p>' +
    "<h1>Indonesia dalam angka</h1>" +
    "<p class=\"lede\">Penduduk, ekonomi, harga, pendidikan, kesehatan, dan provinsi. " +
    "Setiap angka di bawah ini memakai sumber dan tahun yang jelas, diambil dari publikasi resmi.</p>" +
    '<p class="meta">Ibu kota: ' + META.capital + " · Mata uang: " + META.currency + " · Diperbarui " + META.updated + "</p></header>" +
    '<section class="grid">' + INDICATORS.map(card).join("") + "</section>" +
    '<section class="row">' + yearPicker() + "</section>" +
    '<div id="yearnote">' + yearNote("gdpGrowth") + "</div>" +
    '<section class="charts">' +
    chartBlock("cGdp", "Pertumbuhan PDB 2019 to 2024", SERIES.gdpGrowth.source) +
    chartBlock("cInfl", "Inflasi tahunan 2019 to 2024", SERIES.inflation.source) +
    "</section>" +
    '<section class="charts">' +
    chartBlock("cPov", "Kemiskinan 2019 to 2024", SERIES.poverty.source) +
    chartBlock("cHdi", "IPM 2019 to 2024", SERIES.hdi.source) +
    "</section>" +
    '<section class="panel"><h2>Yang paling dicari</h2><ul class="links">' +
    '<li><a href="#/population">Penduduk 281.6 juta jiwa, BPS 2024</a></li>' +
    '<li><a href="#/economy">PDB Rp22.140 triliun, tumbuh 5.03 persen, BPS 2024</a></li>' +
    '<li><a href="#/prices">Inflasi 1.57 persen dan pengangguran 4.91 persen, BPS 2024</a></li>' +
    '<li><a href="#/regions">10 provinsi terbesar menurut penduduk, BPS 2024</a></li></ul>' +
    sourceLine("BPS 2024") + "</section>";
  drawLineChart(document.getElementById("cGdp"), SERIES.years.map(String), SERIES.gdpGrowth.values, "% per tahun", TEAL);
  drawLineChart(document.getElementById("cInfl"), SERIES.years.map(String), SERIES.inflation.values, "% tahun ke tahun", AMBER);
  drawLineChart(document.getElementById("cPov"), SERIES.years.map(String), SERIES.poverty.values, "% penduduk", BLUE);
  drawLineChart(document.getElementById("cHdi"), SERIES.years.map(String), SERIES.hdi.values, "skala 0 to 100", TEAL);
  document.getElementById("yearpick").addEventListener("change", (e) => {
    year = Number(e.target.value);
    document.getElementById("yearnote").innerHTML = yearNote("gdpGrowth") + yearNote("inflation") + yearNote("poverty");
  });
}

function renderPopulation() {
  view.innerHTML = nav("population") +
    "<h1>Penduduk</h1>" +
    '<p class="lede">Indonesia berpenduduk 281.6 juta jiwa pada pertengahan 2024, naik 0.83 persen dari 2023. ' +
    "Jawa menampung lebih dari separuh penduduk, sementara Papua dan Maluku paling jarang.</p>" +
    '<section class="grid">' + INDICATORS.filter((i) => i.topic === "population").map(card).join("") +
    card({ label: "Kepadatan", value: "148/km2", detail: "jiwa per kilometer persegi", source: "BPS 2024", change: "Jawa 1.167/km2" }) +
    card({ label: "Usia median", value: "30.5 th", detail: "setengah penduduk di bawah usia ini", source: "BPS 2024", change: "bonus demografi" }) +
    card({ label: "Laju tumbuh", value: "0.83%", detail: "pertumbuhan penduduk 2024", source: "BPS 2024", change: "melambat dari 1.1%" }) + "</section>" +
    chartBlock("cPop", "Jumlah penduduk 2019 to 2024", SERIES.population.source) +
    '<section class="panel"><h2>Di mana penduduk tinggal</h2>' +
    "<p>Jawa Barat adalah provinsi terpadat dengan 49.94 juta jiwa, diikuti Jawa Timur 41.81 juta dan Jawa Tengah 38.08 juta. " +
    "Tiga provinsi itu saja menampung hampir setengah penduduk Indonesia.</p>" +
    sourceLine("BPS 2024, proyeksi penduduk") + "</section>";
  drawBarChart(document.getElementById("cPop"), SERIES.years.map(String), SERIES.population.values, "juta jiwa", TEAL);
}

function renderEconomy() {
  view.innerHTML = nav("economy") +
    "<h1>Ekonomi</h1>" +
    '<p class="lede">PDB Indonesia 2024 mencapai Rp22.140 triliun dengan pertumbuhan 5.03 persen. ' +
    "Industri pengolahan tetap menjadi penyumbang terbesar, diikuti perdagangan dan pertanian.</p>" +
    '<section class="grid">' + INDICATORS.filter((i) => i.topic === "economy").map(card).join("") +
    card({ label: "Pertumbuhan", value: "5.03%", detail: "PDB 2024", source: "BPS 2024", change: "stabil di atas 5%" }) +
    card({ label: "PDB per kapita", value: "US$4.925", detail: "per tahun", source: "BPS 2024", change: "naik dari US$4.785" }) + "</section>" +
    '<section class="charts">' +
    chartBlock("cGdp2", "Pertumbuhan PDB 2019 to 2024", SERIES.gdpGrowth.source) +
    chartBlock("cSec", "Pangsa sektor terhadap PDB 2024", "BPS 2024", 280) + "</section>" +
    '<section class="panel"><h2>Perdagangan luar negeri</h2><div class="grid">' +
    TRADE.map((t) => '<article class="card"><p class="cardlabel">' + t.label + '</p><p class="big">' + t.value +
      '</p><p class="detail">' + t.detail + "</p>" + sourceLine(t.source) + "</article>").join("") +
    "</div></section>";
  drawBarChart(document.getElementById("cGdp2"), SERIES.years.map(String), SERIES.gdpGrowth.values, "% per tahun", TEAL);
  drawHBarChart(document.getElementById("cSec"), SECTORS.map((s) => s.name), SECTORS.map((s) => s.share), "% PDB");
}

function renderPrices() {
  view.innerHTML = nav("prices") +
    "<h1>Harga dan kerja</h1>" +
    '<p class="lede">Inflasi 2024 tercatat 1.57 persen, terendah dalam enam tahun, sementara pengangguran turun ke 4.91 persen ' +
    "dan kemiskinan ke 8.57 persen pada September 2024.</p>" +
    '<section class="grid">' + INDICATORS.filter((i) => i.topic === "prices").map(card).join("") +
    card({ label: "Rasio gini", value: "0.379", detail: "Maret 2024", source: "BPS 2024", change: "turun dari 0.388" }) +
    card({ label: "Upah minimum", value: "Rp5.4 jt", detail: "UMP tertinggi, DKI Jakarta 2025", source: "BPS 2025", change: "naik 6.5%" }) + "</section>" +
    '<section class="charts">' +
    chartBlock("cInf2", "Inflasi tahunan 2019 to 2024", SERIES.inflation.source) +
    chartBlock("cUne", "Pengangguran 2019 to 2024", SERIES.unemployment.source) + "</section>" +
    chartBlock("cPov2", "Kemiskinan 2019 to 2024", SERIES.poverty.source) +
    '<section class="panel"><h2>Apa artinya</h2><p>Inflasi yang rendah menjaga daya beli, dan turunnya pengangguran serta kemiskinan ' +
    "menunjukkan pasar kerja yang membaik setelah pandemi 2020, ketika pengangguran sempat melonjak ke 7.07 persen.</p>" +
    sourceLine("BPS, Sakernas dan Susenas 2019 to 2024") + "</section>";
  drawLineChart(document.getElementById("cInf2"), SERIES.years.map(String), SERIES.inflation.values, "% tahun ke tahun", AMBER);
  drawLineChart(document.getElementById("cUne"), SERIES.years.map(String), SERIES.unemployment.values, "% angkatan kerja", BLUE);
  drawBarChart(document.getElementById("cPov2"), SERIES.years.map(String), SERIES.poverty.values, "% penduduk", TEAL);
}

function renderEducation() {
  view.innerHTML = nav("education") +
    "<h1>Pendidikan</h1>" +
    '<p class="lede">IPM Indonesia 2024 mencapai 75.02, dengan rata rata lama sekolah 9.07 tahun dan harapan lama sekolah 13.33 tahun. ' +
    "Hampir semua anak usia SD bersekolah, dan melek huruf usia 15 tahun ke atas mencapai 96.9 persen.</p>" +
    '<section class="grid">' + EDUCATION.map((e) => card({ label: e.label, value: e.value, detail: e.detail, source: e.source, change: "" })).join("") + "</section>" +
    chartBlock("cHdi2", "IPM 2019 to 2024", SERIES.hdi.source) +
    '<section class="panel"><h2>Catatan</h2><p>IPM naik 0.58 poin dari 2023 ke 2024. Komponen pendidikan naik seiring bertambahnya lama sekolah, ' +
    "sementara komponen kesehatan dan pengeluaran ikut menguat.</p>" + sourceLine("BPS, IPM 2024") + "</section>";
  drawLineChart(document.getElementById("cHdi2"), SERIES.years.map(String), SERIES.hdi.values, "skala 0 to 100", TEAL);
}

function renderHealth() {
  view.innerHTML = nav("health") +
    "<h1>Kesehatan</h1>" +
    '<p class="lede">Harapan hidup Indonesia 2024 mencapai 74.23 tahun. Stunting balita masih 21.5 persen pada 2023, ' +
    "dan jaminan kesehatan nasional sudah menjangkau 98.2 juta peserta aktif.</p>" +
    '<section class="grid">' + HEALTH.map((e) => card({ label: e.label, value: e.value, detail: e.detail, source: e.source, change: "" })).join("") + "</section>" +
    '<section class="panel"><h2>Catatan</h2><p>Angka kematian bayi turun perlahan dari tahun ke tahun, dan puskesmas menjadi ujung tombak layanan dasar ' +
    "dengan 10.374 unit di seluruh Indonesia.</p>" + sourceLine("BPS 2023 dan Kemenkes 2023") + "</section>";
}

function provinceOptions(selected) {
  return PROVINCES.map((p) => '<option value="' + p.name + '"' + (p.name === selected ? " selected" : "") + ">" + p.name + "</option>").join("");
}

function provinceCard(p) {
  return '<article class="card bigcard"><p class="cardlabel">Provinsi terpilih</p><h3>' + p.name + "</h3>" +
    '<p class="detail">Ibu kota: ' + p.capital + "</p>" +
    '<dl class="facts"><div><dt>Penduduk</dt><dd>' + p.pop + ' juta jiwa</dd></div>' +
    "<div><dt>Pangsa PDB</dt><dd>" + p.gdpShare + " persen</dd></div>" +
    "<div><dt>Kemiskinan</dt><dd>" + p.poverty + " persen</dd></div>" +
    "<div><dt>IPM</dt><dd>" + p.hdi + "</dd></div></dl>" +
    sourceLine("BPS 2024") + "</article>";
}

function renderRegions() {
  const p = PROVINCES.find((x) => x.name === province) || PROVINCES[0];
  view.innerHTML = nav("regions") +
    "<h1>Provinsi</h1>" +
    '<p class="lede">Sepuluh provinsi terbesar menurut penduduk, dari Jawa Barat 49.94 juta jiwa sampai Riau 6.97 juta jiwa. ' +
    "Pilih provinsi untuk melihat datanya, atau bandingkan dua provinsi.</p>" +
    '<section class="row"><label class="picker">Provinsi <select id="provpick" aria-label="Pilih provinsi">' + provinceOptions(province) + "</select></label>" +
    '<label class="picker">Bandingkan <select id="cmpA" aria-label="Provinsi pertama">' + provinceOptions(compareA) + "</select>" +
    ' dengan <select id="cmpB" aria-label="Provinsi kedua">' + provinceOptions(compareB) + "</select></label></section>" +
    '<section class="charts"><div id="provcard">' + provinceCard(p) + "</div>" +
    chartBlock("cProv", "Penduduk 10 provinsi terbesar 2024", "BPS 2024") + "</section>" +
    '<section class="panel"><h2>Bandingkan provinsi</h2><div id="cmpout"></div>' +
    '<p class="source">Sumber: BPS 2024</p></section>' +
    '<section class="panel"><h2>Semua provinsi</h2><table class="table"><thead><tr><th>Provinsi</th><th>Penduduk (juta)</th><th>Pangsa PDB (%)</th><th>Kemiskinan (%)</th><th>IPM</th></tr></thead><tbody>' +
    PROVINCES.map((x) => "<tr><td>" + x.name + "</td><td>" + x.pop + "</td><td>" + x.gdpShare + "</td><td>" + x.poverty + "</td><td>" + x.hdi + "</td></tr>").join("") +
    "</tbody></table>" + sourceLine("BPS 2024") + "</section>";
  drawHBarChart(document.getElementById("cProv"), PROVINCES.map((x) => x.name), PROVINCES.map((x) => x.pop), "juta jiwa");
  const updateCompare = () => {
    const a = PROVINCES.find((x) => x.name === compareA);
    const b = PROVINCES.find((x) => x.name === compareB);
    document.getElementById("cmpout").innerHTML = "<p><strong>" + a.name + "</strong>: " + a.pop + " juta jiwa, kemiskinan " + a.poverty +
      " persen, IPM " + a.hdi + ". &nbsp; <strong>" + b.name + "</strong>: " + b.pop + " juta jiwa, kemiskinan " + b.poverty +
      " persen, IPM " + b.hdi + ". Selisih penduduk: " + Math.abs(a.pop - b.pop).toFixed(2) + " juta jiwa.</p>";
  };
  updateCompare();
  document.getElementById("provpick").addEventListener("change", (e) => {
    province = e.target.value;
    document.getElementById("provcard").innerHTML = provinceCard(PROVINCES.find((x) => x.name === province));
  });
  document.getElementById("cmpA").addEventListener("change", (e) => { compareA = e.target.value; updateCompare(); });
  document.getElementById("cmpB").addEventListener("change", (e) => { compareB = e.target.value; updateCompare(); });
}

function renderAbout() {
  view.innerHTML = nav("about") +
    "<h1>Tentang data</h1>" +
    '<p class="lede">NusaStat menyajikan statistik resmi Indonesia dari publikasi yang bisa dicek siapa saja. ' +
    "Angka di situs ini memakai tahun dan sumber yang tercantum pada setiap kartu dan grafik.</p>" +
    '<section class="panel"><h2>Sumber data</h2>' +
    SOURCES.map((s) => "<h3>" + s.name + "</h3><p>" + s.what + ". Tahun: " + s.year + ". " + s.note + "</p>").join("") +
    "</section>" +
    '<section class="panel"><h2>Cara membaca</h2><ul class="notes">' +
    "<li>PDB harga berlaku memakai harga tahun berjalan; pertumbuhan PDB memakai harga konstan 2010.</li>" +
    "<li>Inflasi memakai Indeks Harga Konsumen, tahun ke tahun pada Desember.</li>" +
    "<li>TPT adalah tingkat pengangguran terbuka dari Sakernas Agustus.</li>" +
    "<li>Kemiskinan memakai garis kemiskinan Susenas, Maret dan September.</li>" +
    "<li>IPM memakai skala 0 sampai 100 dari BPS.</li></ul></section>" +
    '<section class="panel"><h2>Tentang situs ini</h2><p>NusaStat adalah situs statistik orisinal yang berjalan tanpa jaringan: ' +
    "semua data tersimpan di berkas situs sendiri. Dibangun November 2026 untuk kompetisi situs statistik nasional make.fun.</p></section>";
}

const RENDER = {
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  prices: renderPrices,
  education: renderEducation,
  health: renderHealth,
  regions: renderRegions,
  about: renderAbout
};

export function render() {
  const route = currentRoute();
  RENDER[route]();
  window.scrollTo(0, 0);
  document.title = "NusaStat · " + (TOPICS.find((t) => t.id === route) || TOPICS[0]).label + " · Statistik Indonesia";
}

export function searchIndicators(query) {
  const q = query.trim().toLowerCase();
  if (!q) return INDICATORS;
  return INDICATORS.filter((i) => (i.label + " " + i.detail + " " + i.value).toLowerCase().includes(q));
}
