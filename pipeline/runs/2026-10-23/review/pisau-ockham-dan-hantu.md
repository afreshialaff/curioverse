# Review pisau-ockham-dan-hantu · 2026-10-23

**Keputusan: REVISI**

Artikelnya kuat: sembilan sumber hidup dan relevan, daging melimpah, dan bingkai "bukan menilai iman" sudah dijaga. Yang menahan TERBIT ada empat hal presisi: hook menggeneralisasi, satu kesimpulan ditaruh di mulut narasumber, satu daftar faktor dicampur, dan satu fakta salah atribusi. Semuanya bisa dibereskan dalam satu putaran.

| Aspek | Skor | Catatan singkat |
|---|---|---|
| Akurasi | 4/5 | Tidak ada angka salah, tapi ada 4 kalimat yang melebihi atau salah mengatribusikan sumbernya (must-fix 1–4) |
| Sumber | 5/5 | 9 link, semua hidup dan dibuka hari ini; 8 situs berbeda; Wikipedia 1 dari 9; ada sumber primer (Pew, Goldsmiths/Cortex, SEP, IOA) |
| Daging | 5/5 | ≥5 "eh baru tau": Punch 1639 bukan Ockham; Haunt null result; 58% dari 185 pasien; 28% mahasiswa vs 7,6% umum; 69% Muslim Indonesia percaya sihir |
| Alur & hook | 4/5 | Alur hook → konteks → mekanisme → dua kasus → mitos vs fakta → so what rapi. Hook-nya terlalu menyamaratakan (must-fix 1) |
| Suara | 5/5 | Santai, kalimat pendek, tanpa em dash, tanpa slang berlebihan ("plot twist" 2×) |
| Keamanan | 5/5 | Menghormati keyakinan, tidak merendahkan satu bangsa, tips di bagian opini tidak memberi saran medis yang berlebihan |

`node scripts/validate.mjs` → ✓ lolos quality gate. 1.268 kata, 7 bagian.

## Cek sumber
Semua dibuka lewat WebFetch pada 23 Okt 2026. Beberapa URL awalnya ditolak; sesuai lup.md, judulnya dicari lewat WebSearch dulu lalu di-fetch ulang (SEP dibuka lewat varian URL `plato.stanford.edu/ENTRiES/simplicity/` dari hasil pencarian, isinya halaman yang sama).

| # | Sumber | Hidup? | Kredibel? | Mendukung klaim |
|---|---|---|---|---|
| 1 | https://plato.stanford.edu/entries/simplicity/ | ✅ | ✅ | elegance vs parsimony; razor = "Entities are not to be multiplied beyond necessity"; Sober "may have no non-circular answer"; Swinburne "more likely to be the true one" |
| 2 | https://en.wikipedia.org/wiki/Occam%27s_razor | ✅ | ⚠ (Wikipedia, 1 dari 9) | Ockham c. 1287–1347, English Franciscan friar & theologian; rumusan "beyond necessity" absent in extant works, "this particular phrasing comes from John Punch" (1639, "common axiom"); "Numquam ponenda…"; "razor" baru muncul "a few centuries after" wafatnya; heuristic; "may be ruled out as new data become available"; Crick "a very dangerous implement in biology" |
| 3 | https://www.pewresearch.org/religion/2012/08/09/the-worlds-muslims-unity-and-diversity-4-other-beliefs-and-practices/ | ✅ | ✅ | 9 Agu 2012; Indonesia sihir 69% ("Among the Southeast Asian countries surveyed, Indonesian Muslims are the most convinced…"); jin 53%; pertanyaan jin di 23 negara |
| 4 | https://www.cnnindonesia.com/hiburan/20230109070655-220-897722/kkn-di-desa-penari-jadi-film-indonesia-pertama-tembus-10-juta-penonton | ✅ | ✅ | MD Pictures umumkan Minggu 8/1/2023; film Indonesia pertama tembus 10 juta; "akumulasi dari banyak versi" |
| 5 | https://www.cnnindonesia.com/teknologi/20221208152954-199-884797/apakah-ketindihan-itu-ulah-setan | ✅ | ✅ | 7,6% populasi dunia (tinjauan 2011); penjelasan REM Sharpless; Daniel Denis (postdoc psikiatri, BIDMC Boston), amigdala "sangat aktif saat REM"; studi 2019: 185 pasien, 58% merasakan kehadiran, "biasanya sesuatu yang bukan manusia"; faktor risiko; Hmong di Laos, dab tsog |
| 6 | https://www.psu.edu/news/research/story/psychologists-chase-down-sleep-demons | ✅ | ✅ | Sharpless & Barber 2011: 35 studi, 36.533 orang; umum <8%, mahasiswa 28%, pasien psikiatri nearly 32%; alien, inkubus/sukubus, demons. **Tidak menyebut Hmong.** |
| 7 | https://mindandculture.org/why-we-believe-in-the-supernatural/ | ✅ | ✅ | 24 Agu 2023; Barrett "hyperactive agency-detection device"; CSR; ranting patah vs "falling snow", "hungry lion"; Guthrie "We constantly anthropomorphize" (kutipan gambar, Faces in the Clouds) |
| 8 | https://www.ioa.org.uk/node/923 | ✅ | ✅ | Tandy & Lawrence 1998, JSPR 62(851), dua dosen Coventry University, apparition malam, "recently-installed ventilation unit", ~19 Hz; Tandy 2000, cellar rumah abad ke-14, 19 & 23 Hz; Braithwaite & Townsend 2006 skeptis; Parsons 2012 bukti tambahan; Haunt dikritik "lack of rigour in determining infrasound levels" |
| 9 | https://research.gold.ac.uk/4209 | ✅ | ✅ | French dkk., Cortex 2009: N = 79, 50 menit, infrasound/EMF/keduanya/tidak; diberi tahu mungkin merasakan sensasi aneh; jumlah laporan tidak beda antarkondisi; "The most parsimonious explanation for our findings is in terms of suggestibility" |

## Cek fakta
- ✅ "KKN di Desa Penari … pertama … lebih dari 10 juta … MD Pictures … gabungan beberapa versi" — CNN Indonesia (9 Jan 2023)
- ✅ "69% Muslim Indonesia percaya sihir … tertinggi di Asia Tenggara di antara negara yang disurvei … 53% jin … Agustus 2012 … puluhan negara" — Pew (jin ditanyakan di 23 negara, jadi "puluhan" aman)
- ✅ "William of Ockham … biarawan Fransiskan dan teolog Inggris … sekitar 1287 sampai 1347" — Wikipedia
- ✅ "kalimat itu nggak ditemukan dalam karya Ockham yang masih ada … John Punch … 1639 … aksioma umum" — Wikipedia ("this particular phrasing comes from John Punch")
- ✅ "Numquam ponenda est pluralitas sine necessitate" + terjemahan — Wikipedia ("Plurality must never be posited without necessity")
- ✅ "Istilah pisau baru muncul berabad-abad setelah ia wafat" — Wikipedia
- ✅ elegance vs parsimony; razor klasik = parsimony — SEP
- ✅ "pertanyaan itu mungkin tidak bisa dijawab tanpa berputar-putar" — SEP (Sober)
- ✅ "heuristik … bisa gugur begitu ada data baru" — Wikipedia
- ✅ Barrett, HADD, ilmu kognitif agama — Mind and Culture
- ✅ ranting patah / salju / singa lapar — Mind and Culture (sumber tidak menyebut "hutan", tapi itu latar ilustrasi, bukan klaim)
- ✅ Guthrie "We constantly anthropomorphize" — Mind and Culture, persis
- ✅ "Sharpless dan Barber (2011) … 35 studi … 36.533 peserta … 7,6% … mahasiswa 28% … pasien psikiatri hampir 32%" — PSU + CNN
- ✅ mekanisme REM, terbangun sebagian, mimpi bercampur — CNN (Sharpless)
- ✅ "Daniel Denis, peneliti pascadoktoral psikiatri di Beth Israel Deaconess Medical Center, Boston … amigdala … aktif selama REM" — CNN (sumber: "sangat aktif"; dilemahkan jadi "aktif" masih benar)
- ❌ "Rasa takut muncul tanpa sebab yang jelas, lalu otak mencarikan penjelasan: ada sosok di kamar." — Denis bilang otak "menghasilkan solusi untuk paradoks itu"; frasa "ada sosok di kamar" bukan kata Denis. Lihat must-fix 2.
- ✅ "studi klinis tahun 2019: dari 185 pasien … 58% merasakan kehadiran sesuatu di kamar, biasanya bukan manusia" — CNN
- ❌ "kurang tidur, kualitas tidur yang buruk, dan kecemasan memengaruhi seberapa sering dan seberapa berat ketindihan terjadi" — CNN memisahkan dua hal: kualitas tidur buruk termasuk **faktor risiko** (bersama genetik, trauma, diagnosis psikiatri, kondisi kesehatan); yang dikaitkan dengan **frekuensi dan keparahan** hanya "kecemasan serta kekurangan tidur". Lihat must-fix 3.
- ✅ "penculikan alien, setan inkubus dan sukubus, atau makhluk lain" — PSU
- ❌ "Suku Hmong di Laos mengenal dab tsog, roh yang duduk di dada." — fakta ini dari CNN, bukan PSU, tapi kalimatnya menempel di paragraf yang dibuka "Menurut rilis Penn State". PSU sama sekali tidak menyebut Hmong. Lihat must-fix 4.
- ❌ Hook: "Sekitar 1 dari 13 orang pernah ketindihan, terbangun kaku dan merasa ada sosok di kamar." — 7,6% adalah angka orang yang pernah ketindihan. "Merasa ada sosok" hanya 58% dari 185 **pasien terdiagnosis** (CNN). Hook menyiratkan semua yang ketindihan merasakan sosok. Lihat must-fix 1.
- ✅ Tandy & Lawrence 1998, JSPR, Coventry University, penampakan malam, 19 Hz, ventilasi baru — IOA
- ✅ Tandy 2000, ruang bawah tanah rumah abad ke-14, 19 & 23 Hz — IOA
- ✅ Haunt: 79 peserta, 50 menit, empat kondisi, diberi tahu sebelumnya, tidak beda antarkondisi, sugesti paling parsimonious — Goldsmiths
- ✅ "temuan Tandy masih diperdebatkan … skeptis soal metodenya … bukti tambahan … Haunt dikritik karena kontrol tingkat infrasound-nya lemah" — IOA
- ✅ Swinburne "lebih mungkin benar, bukan pasti benar" — SEP
- ✅ Crick "very dangerous" — Wikipedia ("a very dangerous implement in biology")
- ✅ "Angka ketindihan malah lebih tinggi pada mahasiswa" — PSU
- ✅ Bagian 7 (opini) tidak menambah fakta baru; "kurang tidur … memengaruhi seberapa sering" cocok dengan CNN.

**Klaim yang tidak ada di notes:** tidak ditemukan. Semua klaim fakta punya baris di peta klaim.

## Cek gambar
- `image` = `/assets/illustrations/pisau-ockham-hantu-v1.svg` → file ada di repo, credit "Curioverse", license "Ilustrasi sendiri (Curioverse)", `page` menunjuk file di GitHub. ✅
- Isi SVG: dua kolom asumsi (ketindihan vs sosok dari luar) + catatan "alat berpikir, bukan penilaian atas keyakinan". Klaim di kolom 1 ("otot lumpuh saat tidur REM", "mimpi bocor ke saat setengah sadar", "lebih sering kalau kurang tidur") cocok dengan CNN. Tidak ada wajah tokoh atau tiruan foto. ✅
- Alt dan caption akurat. ✅

## Must-fix
1. **Hook** · "Sekitar 1 dari 13 orang pernah ketindihan, terbangun kaku dan merasa ada sosok di kamar." menyiratkan semua yang ketindihan merasakan sosok; menurut CNN, "merasakan kehadiran" hanya 58% pasien terdiagnosis (studi 2019). · Ganti, misalnya: "Sekitar 1 dari 13 orang pernah ketindihan: bangun kaku, banyak yang merasa ada sosok di kamar. Penyebabnya tidur REM yang terbawa ke saat setengah sadar." (153 karakter, di bawah batas 170; cek ulang dengan validate). Jangan menulis "kebanyakan" tanpa sumber populasi umum.
2. **Bagian 4 paragraf 2, kalimat terakhir** · "Rasa takut muncul tanpa sebab yang jelas, lalu otak mencarikan penjelasan: ada sosok di kamar." dibaca sebagai penjelasan Denis, padahal Denis hanya bilang ada respons takut "tetapi tidak ada apa pun di sekitar yang dapat menjelaskannya. Jadi otak menghasilkan solusi untuk paradoks itu" (CNN). · Tulis bagian Denis sesuai sumber, lalu pisahkan sambungannya ke sosok, misalnya: "…Rasa takut muncul tanpa ada apa pun di sekitar yang menjelaskannya, jadi otak 'menghasilkan solusi untuk paradoks itu', kata Denis. Salah satu solusi itu bisa berupa sosok di kamar." Kalau mau, kembalikan "aktif" jadi "sangat aktif" karena itu kata sumber.
3. **Bagian 4 paragraf 3, kalimat terakhir** · "kurang tidur, kualitas tidur yang buruk, dan kecemasan memengaruhi seberapa sering dan seberapa berat ketindihan terjadi" mencampur dua daftar dari CNN. · Ganti jadi: "Menurut artikel yang sama, seberapa sering dan seberapa berat ketindihan terjadi berkaitan dengan kecemasan dan kurang tidur. Kualitas tidur yang buruk termasuk faktor yang menaikkan risikonya."
4. **Bagian 4 paragraf 4, kalimat 2–3** · "Suku Hmong di Laos mengenal dab tsog, roh yang duduk di dada." menempel di paragraf yang diatribusikan ke Penn State, padahal PSU tidak menyebut Hmong; sumbernya CNN, dalam konteks imigran laki-laki Hmong dari Laos. · Beri atribusi sendiri, misalnya: "CNN Indonesia juga menulis tentang imigran Hmong dari Laos yang mengenal dab tsog, roh mimpi buruk yang menduduki dada korban." Tambahkan baris ini di notes (CNNSP, bukan PSU).

## Saran (opsional)
- Bagian 5 kalimat 1: "menulis … tentang penyelidikan dua dosen Coventry University" bisa dibaca seolah yang menyelidiki orang lain. Menurut IOA, Tandy dan Lawrence sendiri adalah dua dosen itu. Pertimbangkan: "Tahun 1998, dua dosen Coventry University, Vic Tandy dan Lawrence, menulis di Journal of the Society for Psychical Research tentang kejadian aneh di tempat kerja mereka…"
- Bagian 3 paragraf 4: sumber tidak menyebut "hutan"; aman sebagai latar ilustrasi, tapi "Kalau kamu dengar ranting patah" sudah cukup.
- Bagian 5 paragraf 4: kritik ke Haunt di IOA dikutip dari Parsons, yang juga merancang eksperimen Haunt. Detail ini menarik untuk satu klausa, kalau muat.

---
Review selesai 08.57 WIB oleh 🔎 Lup.

Revisi cepat (langkah 8): fire_trigger ke Pena (trig_01WnvJBFjVh1ogya4zRQu7HU) dicoba 08.59 WIB, **ditolak sistem izin sesi**. Pena belum dipanggil; revisi menunggu jadwal biasa (11.48) atau dipicu manual.
