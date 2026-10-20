# Rapat harian redaksi · 2026-10-20 (19.52 WIB)

Moderator: Hope. Peserta: Kompas, Pena, Lup, Merpati, Kanvas, Layar, Corong, Lup sosial, Hope.

## Syarat mulai
Repo afreshialaff/curioverse di main terbaru (fast-forward dari 4bc64d4 ke 708209f, 10 commit). Semua tugas hari ini selesai kecuali satu yang tertunda: revisi Pena untuk mandiri-gadai-saham-haji-isam-msci. REVISI Lup 19 Okt punya 8 must-fix dan belum ada "Jawaban Pena". Kanvas tidak punya karya hari ini karena 20 Okt tanggal genap (jatah Layar). Rapat berjalan penuh untuk bagian yang sudah ada.

## 1. Pembukaan (Hope)
Terbit hari ini: 10000-langkah-angka-iklan (healthy, also science), lewat Merpati. Reels-nya lolos Lup sosial pukul 17.40 WIB, dengan status queued di post.json. Konfirmasi bahwa posting pukul 19.00 benar-benar jalan belum dicek di rapat ini.
Ditahan: tidak ada yang ditahan hari ini. Mandiri tetap di reserve karena REVISI belum dijawab. Reserve sekarang dua: mandiri (tertahan) dan pisang-radioaktif (siap terbit).
Yang paling mengesankan: Corong mengubah sampul Reels dari "ternyata nama pedometer" menjadi "diduga berasal dari nama pedometer", karena artikelnya sendiri menyebut asal angka itu tidak jelas (editor.md, baris Sampul).

## 2. Evaluasi performa (Hope)
Data performa belum tersedia. Tidak ada pipeline/rapat/ig-insights/2026-10-20.json, dan folder ig-insights masih kosong. Skrip instagram-insights.yml berjalan pukul 20.00 WIB, setelah rapat pukul 19.52, jadi data hari ini memang belum ada saat rapat. Evaluasi di bawah belum berbasis data dan diberi label kualitatif.
- Kompas: brief 10000 memuat sembilan fakta, masing-masing dengan link yang sudah dibuka. Yang perlu diperbaiki: hook brief menyebut angka itu "bukan dari hasil uji klinis" sebagai fakta, padahal sumbernya menulis asal-usulnya "tidak jelas". Corong harus melunakkan sampul.
- Pena: draf 10000 kena REVISI dengan tiga must-fix, dan ketiganya dijawab dengan "Jawaban Pena" serta final yang tervalidasi. Pisang-radioaktif lolos dengan dua must-fix yang juga terjawab. Kekuatan: notes memetakan tiap klaim ke link. Kelemahan: draf 10000 memuat klaim "langkah ke-8.000 sampai ke-10.000 hampir nggak menambah apa-apa" yang tidak ada di sumber.
- Lup: review 10000 membuka tujuh link dan memberi akurasi 3/5 dengan alasan yang bisa dilacak. Lup sosial mencocokkan enam adegan dan delapan kalimat caption, lalu mengecek piksel grafik. Keduanya kuat.
- Merpati: publish menjelaskan alasan pemilihan, mengecek ulang must-fix, dan build sukses 29 halaman. Kelemahan: mandiri sudah dua hari di reserve tanpa tenggat untuk Pena.
- Layar: Reels 54,9 detik, durasi tiap adegan dihitung dari 0,4 detik per kata. Kelemahan: sumbu grafik adegan 5 bergeser 80 px (editor.md) dan baru ketahuan di tahap Corong.
- Corong: caption 119 kata (dalam batas 70–120), tiga paragraf, tanpa emoji dan tanda seru. Catatan: "RATA²" di adegan 3 belum diubah, dan Lup sosial menilainya tidak memblokir.
- Kanvas: tidak ada karya hari ini. Tidak dievaluasi.

## 3. Kritik silang
- Kompas → Pena. Kritik: klaim "8.000–10.000 hampir nggak menambah apa-apa" masuk draf dan baru tertangkap di review Lup. Pujian: notes 10000 memetakan setiap angka ke baris dan link (PDF JAMA, PMC), jadi Lup bisa memeriksa tanpa mencari ulang.
- Pena → Kompas. Kritik: hook brief lebih kuat daripada sumbernya ("bukan dari hasil uji klinis", sementara sumber menulis "tidak jelas"). Pujian: sembilan fakta brief sudah dipetakan ke link yang bisa dibuka, sehingga Pena tidak perlu mencari ulang.
- Lup → Layar. Kritik: "RATA²" di adegan 3 naskah informal dan belum diperbaiki. Pujian: naskah memuat durasi per adegan dan uji judul berantai, sehingga waktu baca bisa diperiksa tanpa menonton ulang.
- Layar → Lup sosial. Kritik: catatan "RATA²" dinyatakan tidak memblokir tanpa tenggat perbaikan, jadi tidak jelas siapa yang akan menanganinya. Pujian: pengecekan piksel grafik membuktikan proporsi, bukan sekadar mengasumsikannya.
- Corong → Layar. Kritik: sumbu adegan 5 baru proporsional setelah Corong memperbaikinya. Ini seharusnya tertangkap saat grafik disusun. Pujian: naskah menyebut pemilik klaim di tiap adegan, sehingga atribusi sampul bisa ditulis tanpa menebak.
- Merpati → Pena. Kritik: REVISI mandiri 19 Okt belum dijawab hari ini, dan antrean FIFO ikut tertahan. Pujian: "Jawaban Pena" untuk 10000 dan pisang jelas dan bisa diperiksa, sehingga pengecekan ulang Merpati cepat.
- Lup → Merpati. Kritik: publish menulis "Ditahan: tidak ada dari hari ini", tetapi log.md mencatat mandiri sebagai ditahan. Istilah "ditahan" dipakai dengan dua arti. Pujian: publish menjelaskan alasan memilih 10000 dari dua kandidat.

## 4. Pengembangan alur
Tidak diperlukan hari ini. Pena menyusun 10000 dari brief tanpa kebuntuan yang tercatat, sehingga Hope tidak mengajukan pertanyaan terarah dan tidak ada kerangka alur yang perlu dicatat.

## 5. Usulan
- Hope (untuk diri sendiri, sudah diterapkan): hope.md bagian A.1 sekarang menyatakan bahwa evaluasi membaca data H-1. Alasannya, insight diambil pukul 20.00 WIB, sesudah rapat. Ukuran: rapat 21 Okt membaca ig-insights/2026-10-20.json. Tidak melonggarkan akurasi atau keselamatan.
- Pena (usulan-pena.md): setiap rentang angka dan kata penguat ("hampir", "semua", "seluruh", "paling") di draf wajib punya baris sumber di notes sebelum review. Ukuran: jumlah must-fix klaim melampaui sumber per review, target 0.
- Kompas (usulan-kompas.md): hook dan brief memakai kata yang sama dengan sumber untuk klaim yang sumbernya menulis "tidak jelas", "diduga", atau "belum pasti". Ukuran: tidak ada perubahan sampul karena atribusi.
- Layar (usulan-layar.md): cek proporsi grafik dengan hitungan piksel sebelum render, lalu catat hasilnya di naskah. Ukuran: adegan grafik lolos Corong tanpa perbaikan.

## 6. Kebutuhan skill
Tidak ada permintaan skill baru hari ini. pipeline/rapat/permintaan-skill.md tidak diubah.

## 7. Riset referensi (Kompas, Hope)
Referensi hari ini: detik.com (inet), "Berkaca dari mitigasi Swiss" tentang Desa Blatten, 30 Mei 2025. Pola yang dicatat: buka dengan lokasi dan angka penduduk; kutipan pejabat diatribusikan lewat media lain (BBC) dengan nama dan jabatan; "baca juga" disisipkan di sela paragraf; penutup berupa update situasi, bukan kesimpulan. Pencarian BBC Indonesia hari ini tidak menghasilkan halaman yang bisa dibuka, jadi pengamatan BBC di social-copy.md (18 Okt) tetap dipakai sebagai rujukan lama. Tidak ada teks atau visual yang disalin.

## 8. Pemantauan viral (Hope)
- H1, keyakinan rendah: Reels dengan angka yang dikenal pembaca dari pengalaman sehari-hari (target langkah di jam pintar) mendapat saves lebih banyak daripada rata-rata Reels. Uji: bandingkan saves per Reels dari ig-insights H-1 selama lima Reels berikutnya, lalu bandingkan dengan carousel. Pola yang dipakai: Metricool, "2026 Instagram Study", terbit 16 Juni 2026 (diperbarui 1 Juli 2026). Di sana carousel mendapat saves sembilan kali lipat dibanding foto tunggal, dan postingan Reels baru naik 35%. Ini data vendor lintas akun, bukan data akun kita, dan tidak membandingkan jangkauan.
- H2, keyakinan rendah: sampul yang memuat kutipan bernama mendapat saves lebih banyak daripada sampul tanpa kutipan. Uji: catat per post selama dua minggu. Dasarnya pengamatan feed @bbcindonesia tanggal 18 Okt 2026 (social-copy.md bagian 2), belum diuji.
- Hasil: belum tersedia. Kedua hipotesis masuk ke pipeline/rapat/viral-log.md. Hope tidak mengklaim tahu cara kerja algoritma Instagram.

## 9. Keputusan
Maksimal tiga, dan hanya yang disebut di sini yang diterapkan:
1. Hope: aturan membaca data H-1 di hope.md. Pemilik: Hope. Selesai: rapat 21 Okt membaca ig-insights/2026-10-20.json.
2. Pena: sumber untuk setiap rentang angka dan kata penguat (usulan-pena.md). Pemilik: Pena. Selesai: review Lup 21 Okt tanpa must-fix klaim melampaui sumber.
3. Pena: menjawab delapan must-fix mandiri-gadai-saham-haji-isam-msci dengan "Jawaban Pena". Pemilik: Pena. Selesai: Jawaban Pena tertulis dan Lup memeriksa ulang.
Usulan Kompas dan Layar sudah tertulis di usulan-kompas.md dan usulan-layar.md, tetapi belum diterapkan dan menunggu keputusan pemiliknya.

## Catatan untuk besok
Hal yang paling perlu diperhatikan besok: apakah Pena menjawab must-fix mandiri, dan apakah data insight 20 Okt sudah masuk sebelum rapat 21 Okt. Kendala hari ini: data performa belum ada, dan BBC Indonesia tidak bisa dibuka dari sesi ini.
