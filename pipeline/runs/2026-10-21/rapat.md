# Rapat harian redaksi · 2026-10-21 (19.52 WIB)

Moderator: Hope. Peserta: Kompas, Pena, Lup, Merpati, Kanvas, Layar, Corong, Lup sosial, Hope.

## Syarat mulai
Repo afreshialaff/curioverse di main terbaru (52dc766). Dua tugas hari ini belum selesai, dicatat di sini dan rapat tetap jalan untuk bagian yang sudah ada.
1. Posting Instagram 21 Okt belum terbit. Carousel pisang-radioaktif ditolak Lup sosial pukul 17.40 WIB karena batang slide 6 tidak proporsional (61 px, seharusnya sekitar 77 px dari 2,4 : 0,3). Kanvas dipanggil ulang pukul 17.40 WIB, tetapi sampai rapat tidak ada commit Kanvas di repo dan `review.status` masih `ditolak`. `post.status` masih `queued`.
2. Jawaban Pena untuk 8 must-fix `mandiri-gadai-saham-haji-isam-msci` (REVISI 19 Okt) belum ada. Artikel ini sudah tiga hari di reserve.
Cross-platform (Facebook dan Threads) tidak berjalan karena Instagram belum terbit (`cross.json` belum ada).

## 1. Pembukaan (Hope)
Terbit hari ini: pisang-radioaktif (science, also healthy), dari reserve, lewat Merpati. Build dan deploy sudah sukses (kendala Ignored Build Step di Vercel sudah diperbaiki di 65061bd). Yang ditahan: mandiri-gadai-saham-haji-isam-msci, karena REVISI belum dijawab. Yang paling mengesankan: Corong mengganti "Masalahnya, satu pisang itu kecil sekali" menjadi "Dibanding radiasi harian, satu pisang kecil sekali" karena penghubung "masalahnya" salah makna (editor.md, baris Diubah).

## 2. Evaluasi performa (Hope)
Data H-1 (`ig-insights/2026-10-20.json`, diambil 20 Okt 14.21 UTC) tersedia dan kosong dari error. Namun data ini terlalu kecil untuk dinilai. Reels 10000 langkah (20 Okt 20.18 WIB): reach 2, saves 0, likes 0. Di file 21 Okt (diambil 21 Okt 00.47 WIB), reach-nya naik menjadi 20, saves tetap 0. Carousel 18, 19, dan 20 Okt masing-masing reach 1. Reels 18 Okt: reach 15 dan 2. Carousel reach 1 di tiga post berturut-turut patut dicek, mungkin ini keterlambatan data, mungkin memang belum terjangkau. Hope belum bisa membedakan keduanya. Semua evaluasi di bawah berlabel "belum berbasis data cukup".
- Lup sosial: kuat. Pengecekan piksel batang slide 6 menemukan kesalahan yang tidak terlihat sekilas. Tidak ada data yang bisa menunjukkan dampaknya.
- Kanvas: carousel pisang kena penolakan karena grafik. Kekuatan: slide 3 dan 5 mendapat visual perbandingan yang tepat. Kelemahan: slide 6 tidak proporsional dan judul slide berganti-ganti font (catatan Corong). Satu hal untuk besok: setiap batang dihitung dari nilainya sebelum ekspor, dengan hasilnya dicatat di naskah.
- Corong: caption 118 kata, tiga paragraf, tanpa emoji. Penyelamatan yang baik: "Masalahnya" dibuang, klaim urin dikembalikan ke pemiliknya.
- Merpati: publish menjelaskan kenapa mandiri dilewati. Kelemahan: alasannya tepat, tetapi pembaca log tidak tahu bahwa antrean sudah tiga hari tanpa tenggat untuk Pena.
- Lup: review pisang menyebut "lolos" tanpa must-fix tersisa, dan membuka sumber yang cocok dengan teks. Lup belum menulis tenggat untuk mandiri.
- Pena: tidak ada draf hari ini. Pekerjaan yang menggantung adalah Jawaban Pena untuk mandiri.
- Kompas dan Layar: tidak ada karya hari ini (Kompas tidak membuat brief baru; Layar tidak punya jatah, 21 Okt tanggal ganjil).
- Utas: tidak ada karya hari ini.

## 3. Kritik silang
- Lup sosial → Kanvas. Kritik: slide 6 mengulang kesalahan proporsi yang sama dengan usulan Layar 20 Okt. Pujian: penolakan menulis angka dan piksel, jadi Kanvas bisa memeriksa dan memperbaiki tanpa menebak.
- Corong → Kanvas. Kritik: Corong menulis "batang proporsional" untuk slide 6 di editor.md tanpa hitungan piksel. Pujian: tabel skor Corong menyebut angka dan sumbernya, jadi Lup sosial bisa mencocokkannya.
- Merpati → Pena. Kritik: mandiri tiga hari tanpa tenggat jawaban. Pujian: pemilihan pisang menyebut bahwa isi reserve identik dengan final 20 Okt, sehingga Lup tidak perlu mengulang pengecekan.
- Lup → Merpati. Kritik: publish mencatat "ditahan: tidak ada" di satu bagian dan "ditahan: mandiri" di bagian lain. Istilah ini dipakai dengan dua arti, seperti yang sudah dicatat rapat 20 Okt. Pujian: langkah cek ulang must-fix dicatat satu per satu.
- Hope → Lup sosial. Kritik: rapat 20 Okt menyebut bahwa frame dan piksel grafik perlu dicek. Lup sosial sudah menulis cek piksel, tetapi penolakan slide 6 baru terjadi di jam 17.40, terlalu dekat dengan posting 18.55. Pujian: penolakan itu terjadi sebelum 18.55, sehingga ada kesempatan memperbaiki hari itu.

## 4. Pengembangan alur (Hope memfasilitasi, Kompas dan Pena terlibat)
Tidak diperlukan. Pena tidak menulis draf hari ini, dan tidak ada kebuntuan alur yang tercatat.

## 5. Usulan
- Kanvas (usulan-kanvas.md): hitung lebar setiap batang dari nilainya (lebar = nilai ÷ total × lebar maksimum) dan catat hasilnya di naskah sebelum ekspor. Hope mengecek: usulan ini memperketat, tidak melonggarkan. Status: disetujui (lihat keputusan 1).
- Hope (untuk diri sendiri): tidak ada perubahan hari ini. Alasan: data H-1 belum cukup untuk menilai perubahan aturan Hope, dan perubahan 20 Okt masih berjalan.
- Pena, Kompas, Layar: usulan kemarin tetap berlaku. Usulan Layar tentang proporsi grafik dan usulan Kompas tentang kata "tidak jelas" belum diuji hari ini.
- Belajar: file `pipeline/belajar/` hanya memuat entri 21 Okt untuk Corong, Kanvas, dan Merpati. Dari tail file, Pena, Kompas, Layar, Lup, Utas, dan Hope belum punya entri hari ini. Ini temuan, bukan teguran. Hope mengingatkan sebelum rapat besok.

## 6. Kebutuhan skill
Tidak ada permintaan baru. Dua entri 20 Okt di `permintaan-skill.md` masih berstatus baru, menunggu pemilik.

## 7. Riset referensi (Kompas, Hope)
Pencarian BBC Indonesia dan Kompas hari ini tidak menghasilkan halaman feature yang bisa dibuka dan relevan. Referensi yang dipakai: The Jakarta Post (24 Agustus 2023), "Indonesia's only glaciers melting faster amid climate crisis, El Niño", sebuah berita yang ditulis dengan struktur kuat. Polanya: dua kalimat pembuka berisi peristiwa dan institusi, sumber diatribusikan dengan nama lembaga dan peran, transisi lewat paragraf pendek berurutan (latar, deret waktu, temuan terbaru), penutup berupa proyeksi peneliti. Sumber: https://www.thejakartapost.com/id/indonesia/2023/08/24/indonesias-only-glaciers-melting-faster-amid-climate-crisis-el-nio. Tidak ada teks yang disalin.

## 8. Pemantauan viral (Hope)
- H4, keyakinan rendah: carousel dengan visual perbandingan di tengah (slide angka) mendapat saves lebih banyak daripada carousel teks murni. Dasar: pola umum vendor (Socialinsider, Storrito, 2026, tanpa data akun kita) dan pengamatan feed @bbcindonesia 18 Okt 2026. Uji: bandingkan saves carousel yang punya visual perbandingan dengan yang tidak, minimal tiga post per jenis, dari ig-insights.
- H1 (dari kemarin) belum bisa diuji. Reels 10000 saves 0 di data H-1 dan H-0.
- Catatan: tidak ada klaim tentang algoritma Instagram di sini. Hope hanya menulis pola.

## 9. Keputusan
Maksimal tiga, dan hanya yang disebut di sini yang diterapkan.
1. Kanvas: hitung lebar batang dari nilai dan catat di naskah sebelum ekspor (usulan-kanvas.md). Pemilik: Kanvas. Selesai: carousel bagan berikutnya lolos Lup sosial tanpa penolakan proporsi.
2. Pena: jawab 8 must-fix mandiri-gadai-saham-haji-isam-msci (carryover). Pemilik: Pena. Selesai: "Jawaban Pena" tertulis dan Lup memeriksa ulang sebelum Merpati memilih artikel 22 Okt.
3. Kanvas: revisi slide 6 pisang-radioaktif dan push ulang (carryover). Pemilik: Kanvas. Selesai: `review.status` menjadi `lolos` dari Lup sosial. Keputusan lanjutan (dijalankan ulang di GitHub atau ditunda ke besok) diserahkan ke pemilik, karena posting Instagram tidak boleh dilakukan di luar jadwal tanpa persetujuan.

## Catatan untuk besok
Hal yang paling perlu diperhatikan: apakah carousel pisang-radioaktif sudah lolos Lup sosial dan apakah pemilik memutuskan mengejar atau menunda posting hari ini. Kendala hari ini: posting Instagram 21 Okt tidak terbit, insight H-1 terlalu kecil untuk dinilai, dan referensi BBC Indonesia tidak bisa dibuka dari sesi ini.
