# Editor (Corong) · pisang-radioaktif · 2026-10-21

Dilihat dari slide JPG 1–8 dan thumbnail Canva setelah edit.

| Uji | Skor | Catatan |
|---|---|---|
| Sampul | 5 | Pernyataan 2 baris memuat beritanya, kutipan 'satuan bercanda' dengan pemiliknya (Groningen). |
| Judul berantai | 4 | Setelah judul slide 5 diganti, rantai nyambung: radioaktif tapi aman > dari kalium > 15 Bq jadi 0,1 µSv > punya nama > kecil dibanding radiasi harian > sumber terbesar bukan makanan > nggak menumpuk > yang menentukan angka dosis. |
| Orang asing | 5 | Apa, kok bisa, terus kenapa terjawab tanpa web. |
| Jargon | 4 | Becquerel, sievert, K-40, homeostasis dijelaskan. Slide 3 tadinya fragmen "Becquerel atau satuan...", sudah dibetulkan. ICRP 119 cuma disebut "dokumen", cukup. |
| Angka | 5 | Semua angka cocok artikel (450 mg, 0,012%, 1,3 miliar tahun, 15 Bq, 0,093/0,1 µSv, 100, 1.000, 24.000, 2,4/1,2/0,3 mSv, 120 g). |
| Atribusi | 5 | Tiap klaim punya pemilik (McGill, Ionactive, ICRP, Groningen, EPA, CNSC, ARPANSA). |
| Bahasa | 4 | Nol em dash, nol pola terlarang. "Masalahnya" di slide 5 salah makna (bukan masalah), sudah diganti. |
| Visual | 4 | Visual data di slide 3, 5, 6 saja; batang slide 6 proporsional (2,4 / 1,2 / 0,3), baris sumber ada. |
| Tata letak | 4 | Rata kiri, ruang kosong cukup, chrome ada di semua slide. Catatan untuk Kanvas: font judul dan wordmark beda-beda antar slide (slide 2 sans tebal, lainnya serif). |
| Keterbacaan | 4 | Teks isi ±29 px di 1080 masih terbaca di HP; label slide 5 kecil tapi jelas. Nggak ada glyph kosong. |
| Penutup | 4 | Kutipan bernama (Loughran, ARPANSA, 2022) lalu pertanyaan terbuka, tanpa kartu promosi. Kutipan Inggris sekarang diberi terjemahan. |
| Caption | 5 | 3 paragraf + pertanyaan, 118 kata, paragraf 1 berdiri sendiri, nol emoji dan tanda seru. |

## Diubah
- Slide 3: "Becquerel atau satuan aktivitas radioaktif." → "Becquerel adalah satuan aktivitas radioaktif." (sesuai artikel bagian 2)
- Slide 5 judul: "Masalahnya, satu pisang itu kecil sekali" → "Dibanding radiasi harian, satu pisang kecil sekali"
- Slide 8: kutipan "'We are also a little bit radioactive,'" ditambah "atau kita juga sedikit radioaktif"; kotak dilebarkan ke 718 px, pertanyaan digeser ke top 660.
- Slide 3, 5, 8 diekspor ulang (remote di post.json; file lama dihapus supaya diunduh ulang Actions).
- Caption ditulis.

## Revisi Kanvas 2026-10-21 (20.05 WIB), must-fix Lup slide 6
- Batang lama bertekstur/bergaris tepi sehingga ter-render lebih pendek (613/303/61 px). Diganti persegi panjang polos.
- Hitungan: lebar = nilai / 2,4 x 640. Total 2,4 = 640 px; Radon 1,2 = 1,2/2,4 x 640 = 320 px; Makanan dan minuman 0,3 = 0,3/2,4 x 640 = 80 px. (Dengan skala Lup 613 px: 0,3/2,4 x 613 = 77 px; rasio yang sama, 1/8 dari total.)
- Diukur di slide-6.jpg baru (1080x1350): 640 / 320 / 80 px. Teks dan label tidak berubah. Hanya slide 6 diekspor ulang.
