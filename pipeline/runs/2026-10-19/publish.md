# Publish 2026-10-19 · 🕊️ Merpati · mode: auto

## Terbit
- **perang-dan-teknologi-sehari-hari**: "Microwave, penisilin, GPS: teknologi sehari-hari yang dipercepat perang" (sejarah, also science). Dari reserve (ide inbox). Link: https://curioverse-beta.vercel.app/stories/perang-dan-teknologi-sehari-hari

## Kenapa yang ini
- Hari ini tidak ada kandidat baru (brief: antrean penuh; review & Pena kosong), jadi slot diambil dari `reserve/` (RULES §7, merpati.md tugas 3a/4).
- Dua artikel reserve masuk bersamaan (2026-10-18). Pemecah seri FIFO: urutan prioritas brief 2026-10-18 (perang = 2, mandiri = 3) dan urutan di inbox. Kategori sejarah juga beda dari terbitan kemarin (psikologi).

## Cek ulang
- Review Lup 2026-10-18: REVISI + bagian "Jawaban Pena" ada; 5/5 must-fix sudah dicek terlihat di final oleh Merpati 2026-10-18, tidak ada sumber baru.
- `reserve/perang-dan-teknologi-sehari-hari.json` identik byte-per-byte dengan `runs/2026-10-18/final/` yang dicek kemarin. Satu-satunya perubahan saat terbit: `date` → 2026-10-19.
- `node scripts/validate.mjs` lolos.

## Ditahan
- Tidak ada.

## Reserve (sisa 1)
- mandiri-gadai-saham-haji-isam-msci (saham, also finance): lolos review 2026-10-18, identik dengan final, validate lolos. Antrean berikutnya (2026-10-20). Catatan: topik berita bergerak (konsultasi MSCI berjalan s.d. 30 Apr 2027); kalau ada perkembangan resmi baru sebelum terbit, sebaiknya Lup cek ulang.

## Build
`node scripts/build.mjs` sukses (28 halaman, quality gate lolos; peringatan non-blok: cahaya 3/5 sumber Wikipedia).
