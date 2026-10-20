# Publish 2026-10-20 · 🕊️ Merpati · mode: auto

## Terbit
- **10000-langkah-angka-iklan**: "10.000 langkah sehari: angka dari nama pedometer, bukan resep dokter" (healthy, also science). Prioritas 1 di brief. Link: https://curioverse-beta.vercel.app/stories/10000-langkah-angka-iklan

## Kenapa yang ini
- Reserve berisi `mandiri-gadai-saham-haji-isam-msci` (paling lama antre), tapi review terakhirnya (Lup 2026-10-19, `runs/2026-10-19/review/`) **REVISI** dengan 8 must-fix dan "Jawaban Pena" masih kosong. Belum memenuhi syarat terbit (merpati.md tugas 4), jadi dilewati, bukan diterbitkan.
- Dua kandidat hari ini sama-sama lolos cek ulang. Dipilih prioritas 1 brief. Kategori healthy beda dari terbitan kemarin (sejarah).

## Cek ulang
- 10000-langkah-angka-iklan: REVISI + Jawaban Pena. 3/3 must-fix terlihat di final (diff vs drafts): "disiarkan secara internasional menurut artikel itu"; klaim 8.000–10.000 diganti "langkah di atas sekitar 7.500 tidak lagi menurunkan angka kematian secara berarti"; "keduanya sepakat bahwa angka itu lahir sebagai nama pedometer Jepang tahun 1960-an, bukan dari uji klinis". Saran yang diambil (caption "Orang-orang", tafsiran intensitas) hanya merumuskan ulang. Tidak ada fakta/sumber baru. validate lolos.
- pisang-radioaktif: REVISI + Jawaban Pena. 2/2 must-fix terlihat di final. Fakta baru dibuka ulang Merpati: CNSC PDF "On average, it is the largest source of natural radiation exposure" (radon); Ionactive "security equipment providers were trying to reassure the industry (and public)" … "'safe'" dan "the EU decided to ban the use of such equipment in Europe despite the apparent negligible risk". Cocok. validate lolos.

## Ditahan
- Tidak ada dari hari ini.
- mandiri-gadai-saham-haji-isam-msci tetap di reserve, **menunggu revisi Pena** atas 8 must-fix review Lup 2026-10-19 (atribusi kutipan, frasa POJK 26/2024, sumber Euronews vs Bisnis). Tidak boleh terbit sebelum dijawab.

## Masuk reserve
- pisang-radioaktif (science, also healthy): lolos, bersih, siap terbit. Alasan: kuota tepat 1 artikel per hari.

## Reserve (2)
- mandiri-gadai-saham-haji-isam-msci — tertahan (REVISI belum dijawab)
- pisang-radioaktif — siap terbit

## Build
`node scripts/build.mjs` sukses (29 halaman, quality gate lolos; peringatan non-blok: cahaya 3/5 sumber Wikipedia).

## Catatan gambar
- Gambar kedua artikel (npgallery.nps.gov, ars.usda.gov) tidak bisa dibuka dari sesi agent (proxy menolak host). Lisensi & halaman sudah diverifikasi Lup; tampilnya `src` perlu dicek manusia di halaman live.

## Cek deploy
- Setelah ±3 menit, /stories/10000-langkah-angka-iklan sudah tampil di web live (judul & tanggal 20 Okt 2026 cocok).
