# Editor (Corong) · halo-effect-good-looking · 2026-10-24

Dilihat dari frame reel.mp4 (1,5, 10,5, 18,5, 30, 38,5, 48, 50 dtk) dan teks `source/index.html`. Durasi 51,0 dtk, 6 adegan. **VO belum ada** (akun ElevenLabs Layar dinonaktifkan, lihat `social/2026-10-24/reel/vo.json`); video saat ini hanya musik + efek.

| Uji | Skor | Catatan |
|---|---|---|
| Sampul | 5 | "Benarkah hidup orang good looking lebih mudah?" pertanyaan konkret soal pengalaman penonton, sama dengan judul artikel. Sebelumnya 3 baris (118 px); sekarang 2 baris (100 px, tetap teks terbesar). Kutipan artikel ("terlalu tinggi dan terlalu seragam") dipakai di adegan 2. |
| Judul berantai | 5 | Pertanyaan > Dari 1920: perwira tegap ikut dinilai cerdas > Caranya: wajah menarik dianggap berkepribadian lebih baik > Buktinya: 5,2 vs 2,7 > Plot twist: bisa berbalik > Jadi: syarat dilarang 2025, nilai tiap sifat terpisah, pertanyaan. |
| Orang asing | 4 | Apa, kok bisa, terus kenapa terjawab tanpa web. Tanpa VO penonton harus membaca semuanya; waktu tampil tiap baris cukup (≥0,4 dtk/kata). |
| Jargon | 5 | Istilah "efek halo"/"halo effect" tidak dipakai di layar maupun caption; maksudnya ditulis langsung ("satu kesan baik merembes ke penilaian lain"). "Good looking" kata sehari-hari. |
| Angka | 5 | 1920, 60 mahasiswa, skala 1–9, 5,2 / 4,7 / 2,7, Mei 2025, M/6/HK.04/V/2025, Johnson 2010: semua sama dengan artikel. |
| Atribusi | 4 | Setiap adegan data punya baris sumber (Thorndike 1920; Dion, Berscheid & Walster 1972 · Landy & Sigall 1974; Johnson dkk. 2010; Menaker Yassierli). Baris "satu kesan baik merembes" bersandar pada sumber adegan, bukan nama di kalimatnya. |
| Bahasa | 5 | Nol em dash, nol pola terlarang. Koma yang memisahkan subjek dan predikat di adegan 2 dibuang ("Perwira yang dinilai tegap cenderung ikut dinilai cerdas"). |
| Visual | 5 | Alur di adegan 3, batang di adegan 4, kartu lain hanya teks. Hitungan batang: lebar = nilai / 9 × 860 px. 5,2 → 497 px, 4,7 → 449 px, 2,7 → 258 px. Diukur di frame 30 dtk (skala 540 px): 248 / 224 / 128 px = 496 / 448 / 256 px di 1080. Proporsional, label nilai di tiap batang, baris sumber ada. |
| Tata letak | 5 | Rata kiri di adegan isi, teks atas, kartu tengah, ruang kosong lega, satu aksen ungu Psikologi, chrome konsisten. Label kartu adegan 6 sebelumnya patah ("MEI / 2025"); sekarang satu baris. |
| Keterbacaan | 4 | Teks 80 px, kontras cukup, nggak ada glyph kosong. Baris sumber monospace kecil. Tanpa VO, Reels ini sepenuhnya bergantung pada teks. |
| Penutup | 5 | Saran bernama (Thorndike) lalu pertanyaan terbuka. Tanpa kartu promosi. |
| Caption | 5 | 3 paragraf + pertanyaan, 107 kata sebelum penutup, paragraf 1 berdiri sendiri, nol emoji, nol tanda seru, 5 hashtag. |

## Diubah
- `source/index.html` + `build.py`: sampul 118 → 100 px dengan pemisah baris, jadi 2 baris; koma subjek-predikat di adegan 2 dibuang; label kartu adegan 6 jadi "Menaker Yassierli · Mei 2025", nomor jadi "Surat Edaran Nomor M/6/HK.04/V/2025". Render ulang (`hyperframes render --quality draft`, audio bgm dari `cues.json` + `synth.py` yang sama), `reel.mp4` dan `cover.jpg` diganti.
- `vo.json`: koma yang sama dibuang dari `prompt_siap_pakai` supaya VO nanti cocok dengan layar.
- Caption ditulis. **Belum** ada keterangan VO AI karena VO belum ada. Kalau VO ditambahkan, sisipkan sebelum "A curious mind lives here.": "Suara narator dibuat dengan AI (ElevenLabs)." (total tetap ≤ 120 kata).

## Untuk Lup sosial
- Blocker di luar rubrik: VO belum ada (lihat `review.notes` Layar). Perlu pemilik memulihkan akun ElevenLabs.
