// Data for NusaStat, the Indonesia statistics site.
// Every figure carries its source and year. Figures come from BPS
// (Badan Pusat Statistik) publications unless another source is named.
// Values are rounded for display; the source note keeps the exact context.
export const META = {
  country: "Indonesia",
  countryFull: "Republik Indonesia",
  capital: "Jakarta",
  currency: "Rupiah (IDR)",
  updated: "November 2026",
  note: "All figures are official published statistics. Each card names its source and year."
};

export const INDICATORS = [
  { id: "population", label: "Penduduk", value: "281.6 jt", detail: "jiwa, pertengahan tahun", source: "BPS 2024", change: "+0.83% vs 2023", topic: "population" },
  { id: "gdp", label: "PDB", value: "Rp22.140 T", detail: "harga berlaku", source: "BPS 2024", change: "+5.03% tumbuh", topic: "economy" },
  { id: "gdpPerCapita", label: "PDB per kapita", value: "Rp78.6 jt", detail: "per tahun", source: "BPS 2024", change: "US$4.925", topic: "economy" },
  { id: "inflation", label: "Inflasi", value: "1.57%", detail: "tahun ke tahun, Des", source: "BPS 2024", change: "turun dari 2.61%", topic: "prices" },
  { id: "unemployment", label: "Pengangguran", value: "4.91%", detail: "TPT, Agustus", source: "BPS 2024", change: "turun dari 5.45%", topic: "prices" },
  { id: "poverty", label: "Kemiskinan", value: "8.57%", detail: "September", source: "BPS 2024", change: "turun dari 9.36%", topic: "prices" },
  { id: "hdi", label: "IPM", value: "75.02", detail: "Indeks Pembangunan Manusia", source: "BPS 2024", change: "naik 0.58 poin", topic: "education" },
  { id: "lifeExpectancy", label: "Harapan hidup", value: "74.2 th", detail: "angka harapan hidup", source: "BPS 2024", change: "naik 0.30 tahun", topic: "health" }
];

// Year series, 2019 to 2024. Each series names its source once.
export const SERIES = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  gdpGrowth: { label: "Pertumbuhan PDB", unit: "% per tahun", source: "BPS, PDB 2019 to 2024", values: [5.02, -2.07, 3.70, 5.31, 5.05, 5.03] },
  inflation: { label: "Inflasi tahunan", unit: "% tahun ke tahun", source: "BPS, IHK 2019 to 2024", values: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57] },
  unemployment: { label: "Tingkat pengangguran terbuka", unit: "% angkatan kerja", source: "BPS, Sakernas Agustus 2019 to 2024", values: [5.28, 7.07, 6.49, 5.86, 5.45, 4.91] },
  poverty: { label: "Tingkat kemiskinan", unit: "% penduduk", source: "BPS, Susenas 2019 to 2024", values: [9.22, 9.78, 9.71, 9.57, 9.36, 8.57] },
  population: { label: "Jumlah penduduk", unit: "juta jiwa", source: "BPS, proyeksi penduduk 2019 to 2024", values: [266.9, 269.6, 272.3, 275.8, 278.7, 281.6] },
  hdi: { label: "Indeks Pembangunan Manusia", unit: "skala 0 to 100", source: "BPS, IPM 2019 to 2024", values: [71.92, 71.94, 72.29, 73.37, 74.39, 75.02] }
};

export const SECTORS = [
  { name: "Industri pengolahan", share: 18.67, source: "BPS 2024" },
  { name: "Perdagangan", share: 12.99, source: "BPS 2024" },
  { name: "Pertanian", share: 12.02, source: "BPS 2024" },
  { name: "Konstruksi", share: 10.26, source: "BPS 2024" },
  { name: "Pertambangan", share: 9.24, source: "BPS 2024" },
  { name: "Lainnya", share: 36.82, source: "BPS 2024" }
];

export const TRADE = [
  { label: "Ekspor", value: "US$264.7 M", detail: "total 2024", source: "BPS 2024" },
  { label: "Impor", value: "US$233.7 M", detail: "total 2024", source: "BPS 2024" },
  { label: "Surplus dagang", value: "US$31.0 M", detail: "neraca 2024", source: "BPS 2024" },
  { label: "Ekspor nonmigas", value: "US$248.8 M", detail: "total 2024", source: "BPS 2024" }
];

export const EDUCATION = [
  { label: "Rata rata lama sekolah", value: "9.07 th", detail: "penduduk 25 tahun ke atas", source: "BPS 2024" },
  { label: "Harapan lama sekolah", value: "13.33 th", detail: "anak usia 7 tahun", source: "BPS 2024" },
  { label: "Melek huruf usia 15+", value: "96.9%", detail: "penduduk usia 15 tahun ke atas", source: "BPS 2024" },
  { label: "IPM pendidikan", value: "67.93", detail: "komponen IPM", source: "BPS 2024" },
  { label: "APM SD", value: "97.7%", detail: "angka partisipasi murni", source: "BPS 2023" },
  { label: "APM SMP", value: "81.9%", detail: "angka partisipasi murni", source: "BPS 2023" }
];

export const HEALTH = [
  { label: "Harapan hidup", value: "74.23 th", detail: "angka harapan hidup saat lahir", source: "BPS 2024" },
  { label: "Kematian bayi", value: "16.4", detail: "per 1.000 kelahiran hidup", source: "BPS 2023" },
  { label: "Balita stunting", value: "21.5%", detail: "prevalensi stunting", source: "Kemenkes SSGI 2023" },
  { label: "Kematian ibu", value: "173", detail: "per 100.000 kelahiran hidup", source: "BPS 2020" },
  { label: "Fasilitas kesehatan", value: "10.374", detail: "puskesmas di seluruh Indonesia", source: "Kemenkes 2023" },
  { label: "Jaminan kesehatan", value: "98.2 jt", detail: "peserta JKN aktif", source: "BPJS Kesehatan 2024" }
];

export const PROVINCES = [
  { name: "Jawa Barat", pop: 49.94, gdpShare: 14.3, poverty: 7.46, hdi: 74.92, capital: "Bandung" },
  { name: "Jawa Timur", pop: 41.81, gdpShare: 14.6, poverty: 10.35, hdi: 74.30, capital: "Surabaya" },
  { name: "Jawa Tengah", pop: 38.08, gdpShare: 8.3, poverty: 10.47, hdi: 73.98, capital: "Semarang" },
  { name: "Sumatera Utara", pop: 16.36, gdpShare: 5.0, poverty: 8.15, hdi: 75.28, capital: "Medan" },
  { name: "Banten", pop: 12.91, gdpShare: 3.9, poverty: 5.84, hdi: 77.28, capital: "Serang" },
  { name: "DKI Jakarta", pop: 10.68, gdpShare: 16.7, poverty: 4.14, hdi: 82.46, capital: "Jakarta" },
  { name: "Sulawesi Selatan", pop: 9.46, gdpShare: 3.2, poverty: 8.10, hdi: 74.56, capital: "Makassar" },
  { name: "Lampung", pop: 9.44, gdpShare: 2.1, poverty: 10.69, hdi: 72.66, capital: "Bandar Lampung" },
  { name: "Sumatera Selatan", pop: 9.01, gdpShare: 3.4, poverty: 11.09, hdi: 72.98, capital: "Palembang" },
  { name: "Riau", pop: 6.97, gdpShare: 4.9, poverty: 6.36, hdi: 74.82, capital: "Pekanbaru" }
];

export const SOURCES = [
  { name: "Badan Pusat Statistik (BPS)", what: "Penduduk, PDB, inflasi, pengangguran, kemiskinan, IPM, pendidikan", year: "2019 to 2024", note: "Publikasi Statistik Indonesia, Berita Resmi Statistik, Sakernas, Susenas." },
  { name: "Kementerian Kesehatan (Kemenkes)", what: "Stunting, puskesmas", year: "2023", note: "Survei Status Gizi Indonesia (SSGI) 2023 dan Profil Kesehatan Indonesia." },
  { name: "BPJS Kesehatan", what: "Peserta Jaminan Kesehatan Nasional", year: "2024", note: "Laporan tahunan kepesertaan JKN." }
];

export const TOPICS = [
  { id: "overview", label: "Ringkasan" },
  { id: "population", label: "Penduduk" },
  { id: "economy", label: "Ekonomi" },
  { id: "prices", label: "Harga dan kerja" },
  { id: "education", label: "Pendidikan" },
  { id: "health", label: "Kesehatan" },
  { id: "regions", label: "Provinsi" },
  { id: "about", label: "Tentang data" }
];
