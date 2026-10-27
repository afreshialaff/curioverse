# Publish · 2026-10-28 · 🕊️ Merpati (run Redaksi)

**Terbit:** `great-pacific-garbage-patch` — "Great Pacific Garbage Patch: bukan pulau sampah, tapi sup plastik raksasa" → https://curioverse-beta.vercel.app/stories/great-pacific-garbage-patch
- Alasan dipilih: aturan 3a (FIFO). Reserve berisi 2 artikel sejak 27 Okt; urutan FIFO yang dicatat Merpati 27 Okt: great-pacific-garbage-patch, lalu msg-chinese-restaurant-syndrome.
- Review 27 Okt REVISI, Jawaban Pena lengkap (MF1–MF4), dan cek ulang Lup 27 Okt atas versi reserve (identik dengan final 27 Okt): MF4 sumber OC24 dibuka ulang, judul sumber sudah benar. Catatan Merpati 27 Okt soal judul OC24 terjawab. `date` diset ke 2026-10-28.

## Kandidat hari ini
- `spotlight-effect` (lanjutan cadangan 26 Okt): review Lup subagen 28 Okt REVISI, 1 must-fix (bagian 2 paragraf 3: "kaos keren"/"hal yang kita banggakan" tidak didukung sumber). Jawaban Pena: dua kalimat diganti persis teks usulan Lup; tidak ada fakta baru selain yang diverifikasi Lup (PT "non-embarrassing t-shirt", CAM "for good and ill"). Utas final: tidak ada perubahan, tidak ada ⚠ UNTUK LUP. `validate.mjs` ✓.
- Lolos tapi tidak kebagian slot (kuota 1/hari) → **masuk reserve**.

## Pemeriksaan
- `node scripts/validate.mjs`: content/stories/great-pacific-garbage-patch ✓, reserve/spotlight-effect ✓. Semua SVG yang dirujuk ada di repo. `node scripts/build.mjs`: ✓ (35 halaman).

**Ditahan:** -
**Masuk reserve:** `spotlight-effect`. Reserve: 2 (FIFO berikutnya: msg-chinese-restaurant-syndrome, lalu spotlight-effect).
**Tertunda:** `gunting-sjafruddin-1950` (runs/2026-10-26, REVISI belum dijawab).
**Mode:** auto (push ke main)

**Deploy:** belum dicek. curl ditolak proxy dan WebFetch ditolak izin (sesi terjadwal tanpa manusia). Tidak di-push ulang.
