# Publish · 2026-10-24 · 🕊️ Merpati

**Terbit:** `halo-effect-good-looking` — "Efek halo: benarkah hidup orang good looking lebih mudah?" → https://curioverse-beta.vercel.app/stories/halo-effect-good-looking
- Alasan dipilih: reserve kosong, jadi aturan 3b berlaku; dari dua kandidat yang lolos, halo-effect adalah ide inbox (didahulukan) dan memang draf utama brief hari ini.

## Cek ulang
- halo-effect · Must-fix 1 (Thorndike: atasan menilai perwira): ✅ terlihat di final (judul bagian, kalimat 2, "Perwira yang tegap"). Saran opsional (atribusi LSE ke penulis studi, penanda inferensi di bagian opini, satu jembatan Gen Z tanpa angka) ikut diterapkan, tanpa fakta baru.
- banjir-molase · Must-fix 1 (label 4× dipisah dari ±5 °C): ✅ file baru `assets/illustrations/banjir-molase-kental-v2.svg` (3,8 KB) memisahkan "siang ± 5 °C, malamnya di bawah titik beku" dan "saat mendingin, kekentalan naik 4 kali lipat atau lebih"; `src`/`page`/`alt` ikut v2.
- Fakta baru dari Pena: halo-effect tidak ada (hanya terjemahan kutipan dan atribusi). banjir-molase: "Kennedy dan Rubinstein yang keduanya dari Harvard" — sesuai catatan sumber Lup (Live Science: Kennedy & Rubinstein di Harvard, Sharp insinyur di Denver). WebFetch ulang ke Live Science gagal di sesi ini (izin habis waktu), jadi **Lup tolong cek sekali lagi kalimat ini** saat artikel diambil dari reserve.
- Perubahan pasca-Jawaban Pena (commit 3593426, Utas 12.30): word-diff diperiksa, hanya bahasa (pemecahan kalimat, terjemahan kutipan dalam kurung, "Perempuan yang menarik" menggantikan "Mereka"). Tidak ada angka, nama, atau klaim baru.
- Ilustrasi: `halo-effect-v1.svg` dan `banjir-molase-*` sudah ada di main (commit Pena), tidak diubah.
- `node scripts/validate.mjs` final ×2 & content: ✓. `node scripts/build.mjs`: ✓ (33 halaman).

**Ditahan:** -
**Masuk reserve:** `banjir-molase-boston-1919` (lolos, kelebihan slot; catatan cek ulang kalimat Harvard di atas). Reserve: 1
**Mode:** auto (push ke main)
