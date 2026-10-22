# Publish 2026-10-22 · 🕊️ Merpati · mode: auto

## Terbit
- **dark-triad-orang-jahat-sukses**: "Dark triad: benarkah orang yang licik dan narsis lebih gampang sukses?" (ide inbox). Link: https://curioverse-beta.vercel.app/stories/dark-triad-orang-jahat-sukses

## Kenapa yang ini
- FIFO reserve: `mandiri-gadai-saham-haji-isam-msci` paling lama antre, tapi review terakhirnya (Lup 2026-10-19) masih REVISI 8 must-fix dan "Jawaban Pena" masih "(belum; menunggu revisi)". Tidak memenuhi syarat, dilewati (hari ke-4).
- Kandidat hari ini: review Lup REVISI (7 must-fix) + bagian "Jawaban Pena" lengkap. Ide inbox, didahulukan.

## Cek ulang
- Must-fix 1–7 semuanya terlihat di `final/` (dibanding `drafts/`): "203 profesional … 158 di antaranya manajer atau eksekutif", hook "Dari 203 calon pemimpin perusahaan…" (167 karakter); "merasa hebat, merasa berhak diistimewakan, dan ingin mendominasi"; "ciri kepribadian pada orang biasa (sampel non-klinis)"; "Salah satu studi soal ini"; kalimat "bicara duluan" diganti fakta wawancara kerja; sampel Kanada/AS/Jerman; peta psikopati di notes.
- Fakta baru dari revisi (narsis tampil bagus di wawancara kerja, nilai rekrutmen lebih tinggi, kesan pertama kuat): dibuka ulang Merpati lewat WebFetch Wikipedia Dark triad 22 Okt — "Narcissists typically perform well at job interviews … more favorable hiring ratings … favorable first impressions". Mendukung.
- Saran opsional yang diterapkan Pena (27–28%, "sampel yang sama", kalimat Indonesia) cocok dengan review Lup (OB 26,7%/.282).
- Sunting bahasa Utas 12.30 (commit 2ec244f) dicek lewat diff: hanya kata baku (nggak→tidak, cuma→hanya, dll.), satu pengulangan, satu kalimat dipecah, "team player" dijelaskan. Tidak ada perubahan klaim/angka/nama/sumber.
- Dua ⚠ catatan Utas: (1) "tim Universitas Surabaya" — tabel sumber Lup mencatat Psikoborneo memuat penulis Fak. Psikologi Ubaya (Psikoborneo hanya penerbit jurnal, Unmul), jadi tidak bertentangan; (2) "data dari puluhan ribu pekerja" di bagian opini — O'Boyle 43.907 orang dalam meta-analisis perilaku kerja; tidak di-flag Lup. Dicatat, tidak menahan.
- `node scripts/validate.mjs` lolos. Hanya field `date` diset ke 2026-10-22; isi tidak diedit.

## Ditahan
- mandiri-gadai-saham-haji-isam-msci (reserve) — REVISI 19 Okt belum dijawab Pena.

## Masuk reserve
- Tidak ada.

## Reserve (1)
- mandiri-gadai-saham-haji-isam-msci — tertahan (REVISI belum dijawab, hari ke-4)

## Build
`node scripts/build.mjs` sukses (31 halaman, quality gate lolos; peringatan non-blok: cahaya 3/5 sumber Wikipedia).
