# Rapat harian redaksi · 2026-10-23 (dijalankan 20.03 WIB, terlambat dari 19.52 WIB)

Moderator: Hope. Peserta: Kompas, Pena, Lup, Merpati, Kanvas, Layar, Corong, Lup sosial, Hope.

## Syarat mulai
Repo afreshialaff/curioverse di main terbaru (86f99c9). Artikel terbit, carousel Instagram terbit, dan Threads terbit. Ada dua tugas yang belum selesai. Keduanya dicatat di sini dan rapat tetap berjalan:
1. Facebook gagal untuk hari ketiga berturut-turut (21, 22, dan 23 Okt) dengan error `403 (#200)`: token halaman belum punya izin `pages_read_engagement` dan `pages_manage_posts` (`cross.json`). Hope tidak memicu ulang karena penyebabnya ada di token, jadi perlu manusia yang memperbaikinya.
2. Entri belajar hari ini baru ada untuk Corong, Kanvas, dan Merpati. Kompas, Pena, Lup, Utas, Layar, dan Hope belum punya entri di `pipeline/belajar/`. Untuk Hope, entrinya diganti oleh perubahan di bagian bawah `hope.md`.
3. `pipeline/rapat/target-minggu.md` masih belum ada, hari kedua berturut-turut.
Tambahan dari pemilik pukul 20.0x, masuk agenda: (a) bahan belajar Kanvas dari @simpleas.off dan satu post (instagram.com/p/DepPeSVHZ7g), dan (b) setiap carousel yang terbit wajib memakai musik.

## 1. Pembukaan (Hope)
Yang terbit hari ini adalah `pisau-ockham-dan-hantu` (ide dari inbox). Reserve kosong karena mandiri-gadai dicabut pemilik, jadi artikel ini terbit lewat jalur REVISI, "Jawaban Pena" lengkap, lalu cek ulang Merpati. Carousel 8 slide (Kanvas) terbit pukul 19.00 WIB di instagram.com/p/De1giSDG1re/, dan Threads terbit pukul 19.05 WIB. Tidak ada yang ditahan. Hal yang paling mengesankan hari ini: putaran revisi kejelasan selesai dalam 24 menit. Lup sosial menolak post pukul 15.44, Kanvas memperbaiki slide 1, 2, dan 8, lalu post lolos re-review pukul 16.08. Dalam putaran itu tidak ada satu angka pun yang berubah.

## 2. Evaluasi performa (Hope)
Data H-1 yang dipakai adalah `ig-insights/2026-10-23.json`, diambil 23 Okt 00.51 WIB, sekitar 12,8 jam setelah Reels dark triad terbit, jadi datanya sudah matang. Tidak ada error. Reels dark triad mencatat reach 105, 2 like, 0 saves, dan 0 shares. Sebagai pembanding, reach-nya 30 di fetch 20.08 WIB.
**Temuan yang perlu dicek:** tiga carousel sebelumnya (18, 20, dan 21 Okt) semuanya tercatat **reach 1**, sementara Reels dari periode yang sama punya reach 15, 66, dan 105. Kesenjangan ini terlalu besar kalau hanya dijelaskan oleh format. Ini masih dugaan, dan bisa berasal dari distribusi atau dari cara metrik dibaca. Hipotesisnya ada di bagian 8. Data carousel hari ini baru masuk di file 24 Okt. Semua evaluasi di bawah belum berbasis data yang cukup.
Kanvas: lolos re-review setelah 5 must-fix kejelasan. Kekuatannya, lebar batang slide 5 dihitung dan dicatat ("640 / 560 / 152 px"). Kelemahannya, sampul versi pertama dibuka dengan konsep, bukan pengalaman penonton.
Corong: caption tiga paragraf yang berdiri sendiri. Kelemahannya, editor.md memberi skor Jargon 4 untuk versi yang memuat "Occam's razor" dan "(parsimony)" (lihat bagian 3).
Lup: review REVISI dengan 4 must-fix presisi, dan 9 sumber dibuka lewat WebFetch. Kekuatannya, kesalahan atribusi Hmong ketahuan (dari CNN, bukan Penn State).
Pena: keempat must-fix terjawab sebelum Merpati memilih, tanpa fakta baru. Merpati: setiap must-fix dicek di final dan diff Utas dicek per kata. Utas: suntingan hanya di bahasa ("simpel" diganti "sederhana"). Kompas: brief inbox menghasilkan artikel dengan 9 sumber dari 8 situs. Layar: tidak ada karya hari ini (tanggal ganjil adalah jatah carousel).

## 3. Kritik silang
- **Lup sosial → Corong.** Kritik: editor.md memberi skor Jargon 4 dengan catatan "parsimony ('kehematan')... dijelaskan saat muncul". Padahal istilah "Occam's razor" dan "(parsimony)" di slide 2 justru alasan post ditolak pukul 15.44. Istilah yang dijelaskan tetap istilah sulit. Pujian: kalimat paragraf 3 caption, "Itu bukan bukti, cuma cara memilih dugaan yang diuji dulu", menjaga batas klaim.
- **Corong → Kanvas.** Kritik: sampul pertama, "Penjelasan gaib terasa paling sederhana, padahal asumsinya paling banyak", baru menyebut ketindihan di slide 3. Pujian: slide 5 menampilkan tiga batang dengan skala tercatat, dan baris "Sumber: Sharpless & Barber (2011)" diletakkan di slide itu sendiri.
- **Kanvas → Pena.** Kritik: artikel memakai istilah "pisau Ockham" di judul dan di 4 dari 7 judul bagian, sehingga carousel mewarisi istilah itu sebagai jangkar. Pujian: judul bagian "Kasus kedua: hantu 19 hertz yang ikut kena pisau" langsung bisa dijadikan slide 7.
- **Lup → Merpati.** Pujian: publish.md mencentang must-fix 1–4 satu per satu di final. Kritik: alasan "satu-satunya artikel hari ini" tidak menyebut rencana reserve, padahal reserve sekarang 0 (log.md).
- **Merpati → Kompas.** Kritik: reserve 0 dan inbox jadi satu-satunya jalur, sementara brief belum menyebut cadangan untuk 24 Okt. Pujian: brief menghasilkan 5 atau lebih "eh baru tau" (skor Daging 5).
- **Pena → Lup.** Pujian: catatan must-fix 2 memisahkan kata Denis ("menghasilkan solusi untuk paradoks itu") dari tafsiran "ada sosok di kamar". Kritik: belum ada entri `belajar/lup.md` hari ini.
- **Kompas → Utas.** Pujian: "kemajemukan" diganti "jumlah hal" tanpa mengubah klaim. Kritik: tidak ada entri belajar hari ini.
- **Layar → Kanvas.** Kritik: slide 7 menulis "Dengan paparan / Tanpa paparan apa pun" tanpa angka, sehingga perbandingannya hanya bertumpu pada teks keterangan. Pujian: slide 3 berbentuk alur tiga kotak yang bisa dipahami tanpa paragraf.
- **Hope → Hope.** Kritik: anomali reach 1 pada carousel sudah terlihat sejak 20 Okt, tapi baru diangkat sebagai temuan hari ini.

## 4. Pengembangan alur (Hope memfasilitasi)
Hari ini Pena tidak menulis catatan kesulitan menyusun alur. Pertanyaan Hope untuk Kompas dan Pena sebelum brief berikutnya: "Kalau penonton carousel tidak tahu istilah kuncinya, pengalaman sehari-hari apa yang bisa jadi pintu masuk?" Hari ini jawabannya diberikan oleh revisi itu sendiri: ketindihan dulu, prinsipnya kemudian. Kerangka alurnya: pengalaman (ketindihan) → mekanisme (REM) → angka (1 dari 13) → prinsip (uji asumsi paling sedikit) → batas prinsip. Pena dan Kompas memutuskan apakah urutan ini dipakai di artikel, tidak hanya di carousel.

## 5. Usulan
- **Hope (diri sendiri, diterapkan hari ini):** di `hope.md` bagian F, aturan musik carousel ditambahkan (perintah pemilik), dan kendala API ditulis secara jujur. Cara mengukur: rapat dan laporan setiap tanggal ganjil menyebut apakah carousel hari itu bermusik.
- **Kanvas (usulan dari rapat, `usulan-kanvas.md`):** (1) Pelajari referensi dari pemilik, @simpleas.off dan post DepPeSVHZ7g, hanya untuk pola. Catat hasilnya di `belajar/kanvas.md`. (2) Setiap naskah.md carousel menyertakan satu usulan musik instrumental yang tidak mengganggu, ditulis sebagai arah suasana, bukan judul lagu berhak cipta yang diwajibkan. Ukurannya: naskah carousel 25 Okt punya baris "Musik:".
- **Corong (catatan, `usulan-corong.md`):** istilah asing yang "dijelaskan saat muncul" tetap diberi skor Jargon maksimal 3 kalau istilah itu ada di judul slide. Ukurannya: tidak ada lagi post yang lolos Corong tapi ditolak Lup sosial karena istilah.

## 6. Kebutuhan skill
- Kanvas: cara melihat referensi Instagram. Pada 23 Okt 2026, kedua tautan pemilik ditolak WebFetch (`robots_disallowed`). Pemilik perlu mengirim tangkapan layar atau unduhan slide.
- Hope dan Kanvas: cara menambah musik ke carousel. Audio API Instagram (dokumen developers.facebook.com, versi v22.0, dibaca 23 Okt 2026) hanya menampilkan contoh `media_type=REELS`, dan carousel tidak disebut. Keduanya sudah dicatat di `permintaan-skill.md`.

## 7. Riset referensi (Kompas, Hope)
- Storyboard18, "Instagram adds background music to carousel posts" (5 Jan 2026, dibaca 23 Okt 2026). Polanya dimulai dengan fitur, lalu cara kerja (musik berlaku untuk seluruh carousel, minimal dua gambar), baru kemudian konteks strategi. Artikel ini tidak memberi angka efek pada reach, hanya "Reports suggest".
- Referensi dari pemilik (@simpleas.off, post DepPeSVHZ7g) belum bisa dianalisis karena halaman Instagram memblokir pengambilan otomatis. Keduanya dicatat sebagai tertunda di `referensi.md`.
- BBC Indonesia dan Kompas tidak dibuka hari ini. Waktu riset dipakai untuk memverifikasi soal musik.

## 8. Pemantauan viral (Hope)
- **H7 (keyakinan sedang).** Carousel kita hampir tidak didistribusikan, atau metrik reach carousel terbaca keliru. Buktinya, reach tiga carousel tercatat 1, sementara reach Reels 15–105 (ig-insights 23 Okt). Cara mengujinya: pemilik membuka insight carousel DewfJIMFNl9 di aplikasi dan membandingkan angkanya dengan file. Selain itu, reach carousel De1giSDG1re dibaca di file 24 Okt (setelah lewat 12 jam).
- **H8 (keyakinan rendah).** Carousel bermusik akan punya reach lebih tinggi daripada carousel tanpa musik. Belum ada data publik yang mendukung. Storyboard18 (5 Jan 2026) hanya menyebutnya "engagement tool". Cara mengujinya: bandingkan minimal tiga carousel bermusik dengan tiga carousel lama, memakai reach setelah 12 jam.
- Saran viral yang menambah klaim tidak ada hari ini.

## 9. Keputusan
1. **Perintah pemilik, musik carousel:** setiap carousel yang terbit wajib memakai musik. Pemilik: Hope (memastikan) dan Kanvas (memilih suasana di naskah). Kriteria selesai: post carousel 25 Okt bermusik. Kendalanya, API publikasi belum terbukti mendukung audio untuk carousel. Sampai ada cara otomatis, musik ditambahkan manual lewat aplikasi Instagram, dan laporan 21.15 menyebutnya.
2. **Kanvas, usulan referensi dan baris musik:** disetujui. Pemilik: Kanvas. Kriteria selesai: entri di `belajar/kanvas.md` dan baris "Musik:" di naskah 25 Okt.
3. **Corong, batas skor Jargon:** disetujui. Lolos RULES, karena memperketat kejelasan dan tidak mengubah fakta. Pemilik: Corong. Kriteria selesai: aturan tertulis di `corong.md` dan `belajar/corong.md`.
4. **Hope, perubahan sendiri (bagian F):** diterapkan hari ini.
5. **Pemilik:** perbaiki izin `FB_PAGE_TOKEN` (hari ketiga gagal), cek insight carousel di aplikasi (H7), dan kirim tangkapan layar referensi untuk Kanvas.

## Catatan untuk besok
Yang paling perlu diperhatikan besok adalah reach carousel De1giSDG1re di `ig-insights/2026-10-24.json`. Kalau angkanya 1 lagi, H7 makin kuat, dan format carousel perlu dicek sebelum Kanvas membuat post 25 Okt. Reserve 0, jadi artikel 24 Okt bergantung penuh pada brief Kompas.
