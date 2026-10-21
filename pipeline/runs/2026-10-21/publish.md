# Publish 2026-10-21 · 🕊️ Merpati · mode: auto

## Terbit
- **pisang-radioaktif**: "Pisang itu radioaktif, dan kamu tetap aman" (science, also healthy). Dari reserve. Link: https://curioverse-beta.vercel.app/stories/pisang-radioaktif

## Kenapa yang ini
- Hari ini tidak ada `final/` (brief: antrean penuh, tidak ada draf). Jadi slot diisi dari reserve (merpati.md tugas 3a/4).
- FIFO: `mandiri-gadai-saham-haji-isam-msci` paling lama antre, tapi review terakhirnya (Lup 2026-10-19) **REVISI** dengan 8 must-fix dan belum dijawab Pena (dikonfirmasi ulang di `review/_kosong.md` hari ini). Tidak memenuhi syarat, dilewati.
- `pisang-radioaktif`: review Lup 2026-10-20 REVISI + Jawaban Pena lengkap; isi reserve identik byte-per-byte dengan `runs/2026-10-20/final/`. Kategori science beda dari terbitan kemarin (healthy).

## Cek ulang
- Must-fix 1 terlihat di teks: "Sumber radiasinya tidak selalu kalium. Di udara, misalnya, penyumbang utamanya radon." Frasa lama "kalium ada di mana-mana" sudah tidak ada.
- Must-fix 2 terlihat: "paling banyak satu pisang", pelarangan Uni Eropa, dan kalimat tambahan bagian 5 "Patokan pisang membantu membaca besarnya dosis…".
- Fakta baru dari revisi (CNSC soal radon, Ionactive soal pelarangan EU) sudah dibuka dan dicocokkan Merpati 2026-10-20 (publish.md kemarin); teks tidak berubah sejak itu.
- `node scripts/validate.mjs` lolos. Hanya field `date` yang diubah (2026-10-20 → 2026-10-21); isi tidak diedit.

## Ditahan
- mandiri-gadai-saham-haji-isam-msci tetap di reserve, menunggu Pena menjawab 8 must-fix review 2026-10-19.

## Masuk reserve
- Tidak ada.

## Reserve (1)
- mandiri-gadai-saham-haji-isam-msci — tertahan (REVISI belum dijawab)

## Build
`node scripts/build.mjs` sukses (30 halaman, quality gate lolos; peringatan non-blok: cahaya 3/5 sumber Wikipedia).

## Catatan gambar
- Gambar (ars.usda.gov, foto USDA ARS domain publik) tidak bisa dibuka dari sesi agent. Manusia perlu memastikan gambar tampil di halaman live.

## Cek deploy
- Setelah ±6 menit, beranda live belum menampilkan pisang-radioaktif (masih 10000-langkah teratas) dan /stories/pisang-radioaktif gagal dibuka dari sesi agent. Dicatat "deploy belum terlihat", tidak di-push ulang. Build lokal sukses, jadi kemungkinan Vercel masih antre/gagal: perlu dicek manusia di dashboard Vercel.
