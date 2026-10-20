# Review 10000-langkah-angka-iklan · 2026-10-20

**Keputusan: REVISI**

`node scripts/validate.mjs` → lolos quality gate. Ketujuh sumber dibuka hari ini (ScienceDaily, Harvard Health, PMC, Sydney, BJSM, SSF lewat WebSearch judul dulu, lalu WebFetch). Semua angka cocok. Yang bermasalah: satu klaim melampaui data (8.000–10.000 langkah di studi Lee), satu klaim yang dilebih-lebihkan dari sumbernya ("disiarkan ke seluruh dunia"), dan satu kalimat yang menggantung.

| Aspek | Skor | Catatan singkat |
|---|---|---|
| Akurasi | 3/5 | Semua angka (16.741, HR 0,59, 47.471, HR 0,60/0,55/0,47, 47%/38%, 7%, 150–300 menit) cocok. Tapi klaim "langkah ke-8.000 sampai ke-10.000 hampir nggak menambah apa-apa" tidak ada di sumber, dan "disiarkan ke seluruh dunia" lebih kuat dari "telecast internationally". |
| Sumber | 5/5 | 7 link hidup, 7 situs berbeda, nol Wikipedia. Ada sumber primer (PDF JAMA, PMC Lancet PH, BJSM) dan rilis universitas. |
| Daging | 5/5 | Banyak "eh baru tau" bersumber: Manpo-kei 1965, "The name was a marketing tool", beda ~1.600 langkah = HR 0,59, plateau beda menurut usia (Paluch), 7% demensia, WHO tidak memakai langkah. |
| Alur & hook | 4/5 | Hook kuat dan bisa dicek. Transisi antarbagian enak. Bagian 1 paragraf 4 punya kalimat menggantung (must-fix 3). |
| Suara | 4/5 | Santai dan jelas, slang hemat ("jujurly" 1×). Kalimat pendek. Label `kind` bagian 6 kurang pas (saran). |
| Keamanan | 5/5 | Topik kesehatan: tidak ada resep angka personal, ada "tetap tanya tenaga kesehatan", batas observasional dijelaskan. |

## Cek sumber
| # | Sumber | Hidup? | Kredibel? | Mendukung klaim |
|---|---|---|---|---|
| 1 | https://whish.stanford.edu/wp-content/uploads/2019/10/Step-Volume-Intensity-Mortality_JAMA-IntMedicine-2019-.pdf | ✅ | ✅ primer | "the origin of the goal of 10 000 steps per day is unclear"; Yamasa 1965, Manpo-kei = "10 000 steps meter"; 16.741 perempuan, 62–101 th, rerata 72,0; 2011–2015; diminta pakai "7 consecutive days"; rerata follow-up 4,3 th, 504 meninggal; median kuartil 2718/4363/5905/8442; Q2 HR 0,59 (0,47–0,75); "before leveling at approximately 7500 steps/d"; intensitas "all associations were attenuated, and most were no longer significant"; "reverse causation bias remains a possibility" |
| 2 | https://www.health.harvard.edu/blog/10000-steps-a-day-or-fewer-2019071117305 | ✅ | ✅ | "The name was a marketing tool"; 4.400 langkah → 41% lebih rendah; "leveling off at approximately 7,500 steps per day"; Lee profesor di Harvard Medical School |
| 3 | https://pmc.ncbi.nlm.nih.gov/articles/PMC9289978 | ✅ | ✅ primer | 15 studi (8 AS, 4 Eropa, 1 Jepang, 1 Australia, 1 lintas 40 negara); 47.471 orang, 3.013 kematian, median 7,1 th; Q1–Q4 3553/5801/7842/10901, HR 0,60/0,55/0,47; ≥60 th plateau 6000–8000, <60 th 8000–10000; "inconsistent evidence" intensitas; "causal inferences cannot be made" |
| 4 | https://www.sydney.edu.au/news-opinion/news/2025/07/24/rethink-the-10000-a-day-step-goal-study-suggests.html | ✅ | ✅ | 57 studi 2014–2025, >10 negara, Lancet Public Health; "Led by Professor Melody Ding"; 47% kematian, 38% demensia; kematian 7.000 "almost identical" dengan 10.000; demensia "only a 7 percent extra reduction"; Owen "co-author and chief analyst"; outcome "cardiovascular disease, dementia and depressive symptoms" |
| 5 | https://sciencedaily.com/releases/2025/07/250726234359.htm | ✅ | ✅ (pelengkap) | Kutipan Ding "Aiming for 7000 steps is a realistic goal based on our findings"; 2000→4000 "significant health gain"; dua kutipan Owen persis |
| 6 | https://bjsm.bmj.com/node/121498.full | ✅ | ✅ primer | Bull dkk.; "150–300 min of moderate-intensity, or 75–150 min of vigorous-intensity"; penguatan otot "on 2 or more days a week"; tidak ada target langkah per hari |
| 7 | https://www.ssf.or.jp/international/uk/20171011.html | ✅ | ✅ | David Minton, 2017.11.01; "first to be telecast internationally"; 3.500–5.000 langkah; tim Dr. Yoshiro Hatano; "Dr Hatano began selling a 10,000-step pedometer known as 'manpo-kei'"; "this arbitrary number" |

## Cek fakta
- ✅ Asal-usul "tidak jelas", Yamasa 1965, Manpo-kei = "meteran 10.000 langkah" — JAMA
- ✅ "The name was a marketing tool" — Harvard Health (kutipan persis)
- ✅ Lee "dari Harvard" — Harvard Health (profesor Harvard Medical School)
- ❌ "Olimpiade Tokyo 1964, olimpiade pertama yang disiarkan ke seluruh dunia" — SSF: "first to be telecast internationally". "Ke seluruh dunia" lebih kuat dari sumber (must-fix 1)
- ✅ 3.500–5.000 langkah, tim Hatano, Hatano menjual manpo-kei, "arbitrary" — SSF
- ✅ Perbedaan versi Yamasa vs Hatano disebut terang. Bagus, sesuai RULES §2
- ✅ 16.741, 62–101 th, rerata 72, 7 hari, 2011–2015, 4,3 th, 504 kematian — JAMA
- ✅ Median 2.718 vs 4.363, HR 0,59, "sekitar 41%", selisih ~1.600 (1.645) — JAMA + Harvard
- ✅ Turun sampai ~7.500 lalu mendatar — JAMA + Harvard
- ❌ "Di populasi ini, langkah ke-8.000 sampai ke-10.000 hampir nggak menambah apa-apa untuk angka kematian" — tidak ada di sumber dan tidak ada di notes. JAMA hanya bilang kurva mendatar di ~7.500, dan kuartil teratasnya bermedian 8.442, jadi data di kisaran 10.000 tipis. Klaim ini ekstrapolasi (must-fix 2)
- ✅ Intensitas melemah dan sebagian besar tidak signifikan setelah adjust langkah — JAMA ("all associations were attenuated, and most were no longer significant")
- ✅ Semua angka Paluch (15 kohort, negara, 47.471, 7,1 th, 3.013, Q1–Q4, HR, plateau per usia, intensitas "tidak konsisten") — PMC
- ✅ Ding: 57 studi, 2014–2025, >10 negara, Lancet PH, 47% / 38%, kematian hampir sama di 7.000 dan 10.000, demensia +7% — rilis Sydney
- ✅ "Profesor Melody Ding" memimpin studi, Owen "rekan penulis" (co-author) — rilis Sydney
- ✅ "penyakit jantung, demensia, dan gejala depresi" — rilis Sydney ("cardiovascular disease, dementia and depressive symptoms")
- ✅ Kutipan Ding dan dua kutipan Owen persis — ScienceDaily + rilis Sydney
- ✅ Observasional, "causal inferences cannot be made"; Lee mengakui reverse causation — PMC, JAMA
- ✅ WHO 2020: 150–300 / 75–150 menit, penguatan otot ≥2 hari, tanpa target langkah — BJSM
- ❌ Bagian 1 paragraf 4: "Keduanya sepakat soal satu hal." Kalimat ini tidak pernah menyebut hal apa yang disepakati. Kalimat berikutnya ("SSF bahkan menyebut angka itu arbitrary") bukan sesuatu yang disepakati JAMA, karena JAMA tidak memakai kata itu (must-fix 3)

Gambar:
- ✅ `page` NPGallery hidup: judul "Tower Fall Trailhead", Yellowstone, 20/08/2019, PhotoCredit "NPS/Diane Renkin", Constraints "Public domain:Full Granting Rights". `src` `proxymdres.jpg` (1260×840) tercantum di halaman, ukuran sesuai RULES 3b (±1280px). Foto NPS = karya pemerintah AS, boleh.
- ✅ Alt cocok dengan judul aset di hasil pencarian NPGallery ("People walk on an asphalt trail up a slight hill"). Foto generik, tidak diklaim sebagai peristiwa yang dibahas.
- ⚠ Lup tidak bisa melihat file JPG-nya langsung (WebFetch gambar ditolak proxy), jadi isi visual dicek lewat metadata halaman saja. Caption memakai kata "Pengunjung", padahal metadata hanya bilang "People" (saran).

## Must-fix
1. **Bagian 1, paragraf 4, kalimat 1** · "Olimpiade Tokyo 1964, olimpiade pertama yang disiarkan ke seluruh dunia". SSF menulis "the first to be telecast internationally". · Ganti jadi "olimpiade pertama yang disiarkan secara internasional, menurut artikel itu".
2. **Bagian 2, paragraf 3, kalimat 3** · "Di populasi ini, langkah ke-8.000 sampai ke-10.000 hampir nggak menambah apa-apa untuk angka kematian." Klaim ini tidak ada di JAMA maupun Harvard Health. Kuartil teratas studi Lee bermedian 8.442 langkah, jadi data untuk ~10.000 langkah tipis. · Hapus kalimat itu, atau ganti dengan yang sesuai sumber: "Di populasi ini, langkah di atas sekitar 7.500 tidak lagi menurunkan angka kematian secara berarti." Kalau mau menyebut 10.000, tambahkan bahwa data di kisaran itu sedikit, dan kutip sumber yang menyatakannya.
3. **Bagian 1, paragraf 4, dua kalimat terakhir** · "Keduanya sepakat soal satu hal. SSF bahkan menyebut angka itu 'arbitrary'..." Hal yang disepakati tidak pernah disebut, dan kata "arbitrary" hanya ada di SSF. · Tulis hal yang disepakati secara eksplisit, misalnya: "Keduanya sepakat bahwa angka itu lahir sebagai nama pedometer Jepang tahun 1960-an, bukan dari uji klinis." Lalu kalimat SSF berdiri sendiri: "SSF bahkan menyebut angka itu 'arbitrary', alias dipilih begitu saja." (JAMA dan Harvard Health mendukung "nama pedometer" dan "marketing tool"; SSF mendukung "manpo-kei" dan "arbitrary".)

## Saran (opsional)
- **Judul dan bagian 6:** "bukan resep dokter". Versi SSF justru menyebut tim **Dr.** Yoshiro Hatano yang menyimpulkan 10.000 langkah bakal menyehatkan. Maksud "bukan resep" memang jelas (bukan hasil uji klinis), tapi pembaca yang teliti bisa merasa kontradiktif. Opsi: "angka dari nama pedometer, bukan hasil uji klinis".
- **Bagian 6 `kind: "opini"`:** paragraf 1 berisi fakta WHO/BJSM. Pertimbangkan memisahkan paragraf fakta WHO ke bagian tanpa label, atau ganti label jadi `interpretasi`, supaya fakta tidak terbaca sebagai opini.
- **Bagian 2, paragraf 4, kalimat terakhir:** "Di kelompok lansia ini, jumlah langkah lebih penting daripada kecepatannya" adalah tafsiran. Lebih aman ditulis "Artinya, di kelompok lansia ini, yang lebih terkait dengan risiko kematian adalah jumlah langkahnya, bukan kecepatannya."
- **Caption gambar:** "Pengunjung berjalan..." → "Orang-orang berjalan..." (metadata NPS tidak menyebut mereka pengunjung).
- **Bagian 4 paragraf 2:** angka demensia +7% sudah diatribusikan ke rilis. Bagus. Kalau sempat, buka paper aslinya (Ding dkk. 2025, Lancet Public Health) supaya angka bisa dikutip dari sumber primer.

## Jawaban Pena
1. Bagian 1 par. 4, "disiarkan ke seluruh dunia" → diganti "olimpiade pertama yang disiarkan secara internasional menurut artikel itu" (sesuai SSF "telecast internationally").
2. Bagian 2 par. 3, klaim langkah ke-8.000–10.000 → kalimat diganti persis versi yang didukung sumber: "Di populasi ini, langkah di atas sekitar 7.500 tidak lagi menurunkan angka kematian secara berarti." Tidak ada lagi klaim soal 10.000 di studi Lee.
3. Bagian 1 par. 4, "Keduanya sepakat soal satu hal" → ditulis eksplisit: "Tapi keduanya sepakat bahwa angka itu lahir sebagai nama pedometer Jepang tahun 1960-an, bukan dari uji klinis." Kalimat "arbitrary" kini berdiri sendiri sebagai kata SSF.

Saran yang diambil: caption "Pengunjung" → "Orang-orang"; bagian 2 par. 4 kalimat terakhir → "Artinya, di kelompok lansia ini, yang lebih terkait dengan risiko kematian adalah jumlah langkahnya, bukan kecepatannya." Saran yang tidak diambil (judul "resep dokter", label `kind` bagian 6, paper primer Ding) dibiarkan agar tidak menambah perubahan di luar must-fix. Tidak ada fakta baru.
