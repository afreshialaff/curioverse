# Laporan harian redaksi · 2026-10-20

## Terbit dan ditahan

Hari ini terbit satu artikel, **"10.000 langkah sehari: angka dari nama pedometer, bukan resep dokter"** (healthy, also science): https://curioverse-beta.vercel.app/stories/10000-langkah-angka-iklan. Reels-nya sudah terposting di https://www.instagram.com/reel/Det69iKFWcM/ pukul 20.18 WIB. Jadwalnya 19.00 WIB, dan catatan GitHub Actions menunjukkan run posting itu dipicu manual (workflow_dispatch) pukul 20.17 WIB.

Yang ditahan adalah **mandiri-gadai-saham-haji-isam-msci**. Revisi Lup tanggal 19 Okt berisi 8 must-fix, dan "Jawaban Pena" belum ada, jadi artikel ini tetap di reserve dan belum boleh terbit. Di reserve juga ada **pisang-radioaktif**, yang sudah lolos dan siap terbit.

## Performa post hari ini

Data belum tersedia. File `pipeline/rapat/ig-insights/2026-10-20.json` tidak ada, dan folder itu masih kosong. Workflow "Ambil insight Instagram" (`instagram-insights.yml`) aktif dan dijadwalkan pukul 20.00 WIB, tetapi GitHub Actions mencatat 0 run untuk workflow itu sejak dibuat, termasuk hari ini. Tidak ada pesan error dari skrip karena skrip belum berjalan. Jadi belum ada angka performa yang bisa dinilai.

## Evaluasi per agen

- **Kompas:** brief 10000 memuat sembilan fakta dengan link yang sudah dibuka. Perlu diperbaiki: hook menyebut angka itu "bukan dari hasil uji klinis" sebagai fakta, padahal sumbernya menulis asal-usulnya "tidak jelas".
- **Pena:** notes memetakan setiap klaim ke link sehingga Lup bisa memeriksa tanpa mencari ulang, dan pisang-radioaktif lolos. Perlu diperbaiki: draf 10000 memuat klaim "langkah 8.000 sampai 10.000 hampir nggak menambah apa-apa" yang tidak ada di sumber, dan Jawaban Pena untuk mandiri belum dibuat.
- **Lup:** review 10000 membuka tujuh link dan memberi akurasi 3/5 dengan alasan yang bisa dilacak. Tidak ada catatan perbaikan untuk Lup sendiri.
- **Merpati:** publish menjelaskan alasan pemilihan dengan jelas dan build sukses 29 halaman. Perlu diperbaiki: istilah "ditahan" dipakai dengan dua arti dan tidak sesuai dengan log.md.
- **Layar:** Reels 10000 berdurasi 54,9 detik dengan durasi per adegan yang bisa dihitung. Perlu diperbaiki: sumbu grafik adegan 5 bergeser 80 px dan baru ketahuan di tahap Corong.
- **Corong:** caption 119 kata, dalam batas 70 sampai 120, tanpa emoji dan tanda seru, dan sampul sudah dilunakkan menjadi "diduga berasal dari nama pedometer". Perlu diperbaiki: "RATA²" di adegan 3 belum diubah, dan naskah.md belum disesuaikan dengan sampul.
- **Lup sosial:** mencocokkan enam adegan dan delapan kalimat caption, serta mengecek piksel grafik. Perlu diperbaiki: catatan "RATA²" tidak punya tenggat, jadi belum jelas siapa yang menanganinya.
- **Kanvas:** tidak ada karya hari ini (20 Okt adalah jatah Layar), jadi tidak dievaluasi.

## Keputusan rapat

- **Hope:** aturan membaca data H-1 di hope.md, yaitu evaluasi memakai data hari sebelumnya. Pemilik: Hope.
- **Pena:** setiap rentang angka dan kata penguat di draf wajib punya sumber di notes sebelum review (usulan-pena.md). Pemilik: Pena.
- **Pena:** menjawab delapan must-fix mandiri-gadai-saham-haji-isam-msci dengan "Jawaban Pena". Pemilik: Pena.
- **Layar (untuk Reels 22 Okt):** hook 0 sampai 2 detik, judul muncul sekali, teks layar minimal 36 px untuk isi dan 60 px untuk angka, serta naskah.md ikut diperbarui setiap kali sampul diubah pihak lain. Pemilik: Layar.
- **Layar (izin pemilik):** foto dari Wikimedia Commons boleh dipakai sebagai hook dengan kredit di dalam frame. Izin ini datang lewat payload fire, bukan pesan langsung, jadi perlu dikonfirmasi langsung oleh pemilik. Pemilik: Layar.

Usulan Kompas dan Layar di usulan-kompas.md dan usulan-layar.md belum diterapkan dan menunggu keputusan pemilik.

## Permintaan skill

Ada dua permintaan baru di pipeline/rapat/permintaan-skill.md, keduanya menunggu keputusan pemilik. Pertama, plugin **Social Media Skills** dari Layar (hook-writer, short-form-video-script, storyboarding) untuk hook Reels dan variasi format. Kedua, plugin **Windsor.ai** dari Hope untuk membaca reach dan saves Instagram, yang bisa mengisi kekosongan data insight.

## Yang paling perlu diperhatikan besok

Cek workflow "Ambil insight Instagram" di GitHub Actions. Jadwalnya 20.00 WIB, tetapi belum ada satu run pun yang tercatat, termasuk hari ini. Tanpa data insight 19 dan 20 Okt, rapat 21 Okt tidak bisa membaca performa, dan aturan H-1 yang baru disetujui belum bisa dijalankan.
