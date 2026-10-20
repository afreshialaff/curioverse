# Review pisang-radioaktif · 2026-10-20 (draf cadangan)

**Keputusan: REVISI**

`node scripts/validate.mjs` → lolos quality gate. Ketujuh sumber dan dua halaman gambar dibuka hari ini. Semua angka cocok persis dengan sumber. Masalahnya ada di dua framing yang menyesatkan: daftar contoh McGill disajikan seolah semuanya mengandung kalium, dan contoh backscatter dari Ionactive dipakai untuk menunjukkan BED "berguna", padahal Ionactive memakainya sebagai peringatan.

| Aspek | Skor | Catatan singkat |
|---|---|---|
| Akurasi | 3/5 | Angka bersih semua (450 mg, 0,012%, 1,3 M th, 15 Bq, 6,2×10⁻⁹, 0,093 μSv, 2,4/1,2/0,3 mSv, 12,5/260 mSv, 120 g). Tapi dua framing keliru dari sumbernya (must-fix 1 dan 2). |
| Sumber | 5/5 | 7 link hidup, 7 situs berbeda, nol Wikipedia. Sumber resmi (arsip EPA, CNSC), universitas (McGill, Groningen, UOW/ARPANSA), konsultan proteksi radiasi, media fact-check. |
| Daging | 5/5 | "Eh baru tau" banyak: BED itu "mock unit", 15 Bq × koefisien ICRP = 0,093 μSv, ~100 pisang = radiasi alami sehari di AS, K-40 tidak menumpuk karena homeostasis, Kerala 12,5 mSv vs Iran 260 mSv. |
| Alur & hook | 4/5 | Hook bisa dicek dan bikin penasaran. Plot twist homeostasis kena. Bagian 2 paragraf 4 menarik kesimpulan yang berlawanan dengan sumbernya (must-fix 2). |
| Suara | 5/5 | Santai, jelas, slang hemat, tiap angka besar diberi pembanding (24.000 pisang/tahun). |
| Keamanan | 4/5 | Tidak ada info berbahaya, dan angka "pisang mematikan" sengaja dibuang. Tapi bagian 5 menyarankan pembaca menilai aman tidaknya pakai patokan pisang tanpa menyebut batas BED sebagai alat ukur risiko (terkait must-fix 2). |

## Cek sumber
| # | Sumber | Hidup? | Kredibel? | Mendukung klaim |
|---|---|---|---|---|
| 1 | https://19january2025snapshot.epa.gov/radtown/natural-radioactivity-food/index.html | ✅ | ✅ (arsip resmi EPA, ada label "not the current EPA website") | "Bananas and Brazil nuts are the most well known examples of foods that contain radioactivity"; 0,01 millirem (0,1 μSv); "about 100 bananas" = radiasi alami harian di AS; Brazil nut "small amount of radium that is taken up from the soil"; "these foods do not pose a radiation risk" |
| 2 | https://www.mcgill.ca/oss/article/you-asked/it-true-banana-radioactive | ✅ | ✅ | Joe Schwarcz, 15 Mar 2018; 450 mg kalium; ~0,012% K-40; waktu paruh 1,3 miliar th; bayam, kentang, jeruk, kacang Brazil, kitty litter, granit, udara, tubuh = contoh benda radioaktif; rontgen dada 10 mrem, "at least a thousand bananas"; tubuh ~120 g kalium, "homeostatic control" |
| 3 | https://www.rug.nl/education/courses/other-education/radiation-protection/a-z/a-z-data/banana-equivalent-dose?lang=en | ✅ | ✅ | "a mock unit of effective dose"; "1 BED ≈ 0.1 μSv"; dosis dari rata-rata 40K dalam satu pisang; kelebihan kalium "almost immediately excreted in the urine"; "hardly affects the committed dose in reality" |
| 4 | https://ionactive.co.uk/resource-hub/guidance/radioactive-bananas-banana-equivalent-dose | ✅ | ✅ (konsultan proteksi radiasi, Reading, UK) | ~15 Bq K-40; ICRP 119 6,2×10⁻⁹ Sv/Bq; 0,093 → 0,1 μSv; backscatter "no greater than 0.1 micro Sv"; "the BED does not deliver a committed effective dose at all!"; "still reasonable to use BED as a way of illustrating magnitudes"; **plus peringatan:** produsen memakai angka itu untuk meyakinkan bahwa scanner "safe", tapi "the EU decided to ban the use of such equipment in Europe despite the apparent negligible risk" |
| 5 | https://api.cnsc-ccsn.gc.ca/dms/digital-medias/Fact-Sheet-Background-Radiation-eng.pdf/object | ✅ | ✅ primer | November 2020; 2,4 mSv/th; radon ~1,2 mSv, "the largest source of natural radiation exposure"; ingesti ~0,3 mSv; K-40 "main source of internal irradiation (aside from radon decay)"; daging merah, kentang, wortel, pisang, kacang lima, kacang Brazil; Kerala 12,5 mSv; Iran utara "can reach 260 mSv" |
| 6 | https://www.uow.edu.au/media/2022/are-bananas-really-radioactive-.php | ✅ | ✅ | Sarah Loughran, Director Radiation Research and Advice (ARPANSA); 4 Nov 2022; republikasi The Conversation; "we are also a little bit radioactive"; "Our bodies were built to handle small amounts of radiation" |
| 7 | https://www.9news.com/article/news/verify/food-verify/bananas-natural-radiation-radioactivity-potassium-fact-check/536-69d40988-fb91-4706-b92b-37a343714c69 | ✅ | ✅ (pelengkap) | Pisang dan kacang Brazil "among the most well-known"; ~100 pisang = sehari radiasi latar (menurut EPA); sievert mengukur "potential damage"; 120 g kalium, tidak menumpuk |

## Cek fakta
- ✅ Pisang dan kacang Brazil contoh paling terkenal — EPA
- ✅ 450 mg kalium, 0,012% K-40, waktu paruh 1,3 miliar tahun — McGill
- ❌ "Persentasenya kecil sekali, tapi kalium ada di mana-mana. McGill mencontohkan bayam, kentang, jeruk, kacang Brazil, granit meja dapur, udara, sampai tubuh manusia sendiri." — McGill menyebut daftar itu sebagai contoh benda yang **radioaktif**, bukan benda yang mengandung kalium. Radioaktivitas udara terutama dari radon (CNSC), bukan K-40. Kalimatnya membuat pembaca mengira udara mengandung kalium (must-fix 1)
- ✅ Daging merah, wortel, kacang lima — CNSC
- ✅ Kacang Brazil menyerap radium dari tanah — EPA
- ✅ 15 Bq, ICRP 119 6,2×10⁻⁹ Sv/Bq, 0,093 → 0,1 μSv — Ionactive
- ✅ 0,01 millirem = 0,1 μSv — EPA
- ✅ Sievert = potensi efek pada tubuh — 9News
- ✅ BED "mock unit", 1 BED ≈ 0,1 μSv — Groningen
- ❌ "Satuan bercanda itu ternyata berguna. Ionactive memakainya untuk memberi gambaran, misalnya satu kali pemindaian keamanan x-ray backscatter ... tidak lebih dari 0,1 μSv. Jadi kira-kira setara satu pisang." — Angkanya benar, tapi konteksnya terbalik. Ionactive memakai contoh ini justru untuk menunjukkan bahwa angka BED pernah dipakai produsen untuk meyakinkan publik bahwa scanner "safe", lalu EU tetap melarang alat itu. Selain itu, "tidak lebih dari 0,1 μSv" berarti **paling banyak** satu pisang, bukan "kira-kira" (must-fix 2)
- ✅ 2,4 mSv/th dunia; 2.400 μSv ≈ 24.000 pisang (hitungan benar) — CNSC + Groningen
- ✅ ~100 pisang = radiasi alami sehari di AS — EPA + 9News
- ✅ Rontgen dada 10 mrem, ≥1.000 pisang — McGill
- ✅ Radon penyumbang terbesar, ~1,2 mSv; makanan dan minuman ~0,3 mSv; K-40 sumber utama radiasi internal selain radon — CNSC
- ✅ Kerala 12,5 mSv; Iran utara sampai 260 mSv — CNSC
- ✅ Tubuh ~120 g kalium, homeostasis, kelebihan tidak ditimbun — McGill + 9News
- ✅ Dibuang lewat urin, "hardly affects the committed dose" — Groningen
- ✅ "does not deliver a committed effective dose at all" — Ionactive (kutipan persis)
- ✅ Ionactive tetap menganggap BED masuk akal sebagai ilustrasi — Ionactive. Tapi batas kedua dari Ionactive (BED jangan dipakai untuk menyiratkan risiko pasti dapat diabaikan) tidak disebut (lihat must-fix 2)
- ✅ Loughran/ARPANSA 2022, "we are also a little bit radioactive", tubuh terbiasa radiasi kecil — UOW
- ✅ "these foods do not pose a radiation risk" — EPA
- ✅ Tidak ada klaim di artikel yang tidak ada di notes, selain definisi satuan (becquerel, mikro = sepersejuta) yang wajar

Gambar:
- ✅ `page` https://www.ars.usda.gov/oc/images/photos/jan95/k5727-9/ hidup: "Bananas are readied for shipment at a Puerto Rican packing shed", Scott Bauer, ID K5727-9; file 640px `/ARSUserFiles/oc/graphics/photos/jan95/k5727-9.jpg` tercantum di halaman.
- ✅ Lisensi: halaman foto memang tidak menulis lisensi, tapi halaman kebijakan resmi https://www.ars.usda.gov/oc/images/copyright menyatakan foto Image Gallery "copyright-free, public domain" kecuali ada keterangan lain, dan meminta kredit "Photo by (photographer's name), USDA Agricultural Research Service". Credit di draf sudah sesuai. Satu batasan: foto tidak boleh menyiratkan dukungan ARS. Artikel aman dari soal itu.
- ⚠ Lup **tidak bisa melihat isi gambarnya**. WebFetch ke file JPG mengembalikan server error, dan unduhan lewat shell ditolak proxy. Alt dan caption disusun dari deskripsi halaman, bukan dari gambar. Ini tidak dijadikan must-fix karena metadata konsisten, tapi Pena atau Merpati wajib memastikan `src` benar-benar tampil sebelum terbit (lihat Saran).

## Must-fix
1. **Bagian 1, paragraf 3, kalimat 1–2** · "Persentasenya kecil sekali, tapi kalium ada di mana-mana. McGill mencontohkan bayam, kentang, jeruk, kacang Brazil, granit meja dapur, udara, sampai tubuh manusia sendiri." McGill menyebut daftar itu sebagai contoh benda yang sedikit radioaktif, bukan benda yang mengandung kalium. Udara, misalnya, radioaktif terutama karena radon (CNSC). · Pisahkan dua ide itu. Contoh: "Pisang juga bukan satu-satunya. McGill mencontohkan benda lain yang sedikit radioaktif: bayam, kentang, jeruk, kacang Brazil, granit meja dapur, udara, sampai tubuh manusia sendiri. Sumber radiasinya tidak selalu kalium. Di udara, misalnya, penyumbang utamanya radon." Kalimat CNSC soal daging merah, wortel, dan kacang lima (memang soal K-40) tetap boleh.
2. **Bagian 2, paragraf 4** · Contoh backscatter disajikan sebagai bukti bahwa BED "berguna", dan dosisnya ditulis "kira-kira setara satu pisang". Di Ionactive, contoh ini justru peringatan: produsen memakai angka setara-pisang untuk meyakinkan bahwa scanner "safe", tapi "the EU decided to ban the use of such equipment in Europe despite the apparent negligible risk". "No greater than 0.1 micro Sv" juga berarti paling banyak satu pisang. · Tulis ulang paragrafnya sesuai konteks Ionactive. Contoh: "Satuan ini juga pernah dipakai untuk meyakinkan publik. Menurut Ionactive, satu kali pemindaian keamanan x-ray backscatter memberi dosis paling banyak 0,1 μSv, alias paling banyak satu pisang, dan produsennya memakai angka itu untuk menyebut alatnya aman. Uni Eropa tetap melarang alat itu. Jadi dosis 'setara pisang' membantu membayangkan besarnya angka, tapi tidak otomatis menjawab apakah sesuatu boleh dipakai." Lalu di bagian 5 paragraf 2, tambahkan satu kalimat bahwa patokan pisang membantu membaca besarnya dosis, tapi keputusan aman atau tidak tetap ada di tangan lembaga proteksi radiasi.

## Saran (opsional)
- **Gambar:** sebelum terbit, pastikan `src` (`https://www.ars.usda.gov/ARSUserFiles/oc/graphics/photos/jan95/k5727-9.jpg`) benar-benar tampil di preview, dan isi gambarnya memang tandan pisang di gudang pengemasan sesuai alt. Kalau perlu resolusi lebih besar, halaman yang sama menyediakan versi 300 dpi (`/ARSUserFiles/oc/graphics/photos/300dpi/kesa/k5727-9.jpg`). Pakai hanya kalau link itu dibuka dan terverifikasi.
- **Notes, bagian Gambar:** ganti rujukan lisensi dari catalog.data.gov ke halaman kebijakan resmi ARS https://www.ars.usda.gov/oc/images/copyright.
- **Hook / bagian 3:** angka "100 pisang" berasal dari arsip EPA 19 Jan 2025 (bukan halaman live). Sudah jujur di judul sumber. Tidak perlu diubah, cukup dicatat.
- **Bagian 4 paragraf 2:** "hampir seketika" sudah sesuai Groningen ("almost immediately"). Bagus, jangan dikuatkan jadi "seketika".

## Jawaban Pena
(belum; menunggu revisi)
