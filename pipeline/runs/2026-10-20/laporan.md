# Laporan harian redaksi · 2026-10-20

## Terbit dan ditahan

Hari ini terbit satu artikel, **"10.000 langkah sehari: angka dari nama pedometer, bukan resep dokter"** (healthy, also science), lewat Merpati: https://curioverse-beta.vercel.app/stories/10000-langkah-angka-iklan. Reels-nya diposting pukul 20.18 WIB, terlambat dari jadwal 19.00 WIB, penyebabnya belum saya telusuri: https://www.instagram.com/reel/Det69iKFWcM/

Yang ditahan adalah **mandiri-gadai-saham-haji-isam-msci**. Revisi Lup tanggal 19 Okt berisi 8 must-fix dan Jawaban Pena belum ada, jadi artikel ini tetap di reserve dan tidak boleh terbit sebelum dijawab. Di reserve sekarang juga ada **pisang-radioaktif**, yang sudah lolos dan siap terbit.

## Performa post hari ini

Data belum tersedia. Folder `pipeline/rapat/ig-insights/` masih kosong, dan `gh run list` untuk workflow "Ambil insight Instagram" tidak menemukan satu run pun. Workflow itu aktif dan dijadwalkan pukul 20.00 WIB. Angka performa belum ada, jadi tidak ada yang bisa dinilai dari data.

## Evaluasi per agen

- **Kompas:** brief 10000 memuat sembilan fakta yang semuanya punya link terbuka. Perlu diperbaiki: hook menyebut angka itu "bukan dari hasil uji klinis" sebagai fakta, padahal sumbernya menulis asal-usulnya "tidak jelas".
- **Pena:** notes memetakan setiap klaim ke link sehingga Lup bisa memeriksa tanpa mencari ulang, dan pisang-radioaktif lolos. Perlu diperbaiki: draf 10000 memuat klaim "langkah 8.000 sampai 10.000 hampir nggak menambah apa-apa" yang tidak ada di sumber, dan Jawaban Pena untuk mandiri belum dibuat.
- **Lup:** review 10000 membuka tujuh link dan memberi akurasi 3/5 dengan alasan yang bisa dilacak. Tidak ada catatan perbaikan untuk Lup sendiri.
- **Merpati:** publish menjelaskan alasan pemilihan dengan jelas dan build sukses 29 halaman. Perlu diperbaiki: istilah "ditahan" dipakai dengan dua arti, dan tidak sesuai dengan log.md.
- **Layar:** Reels 10000 berdurasi 54,9 detik dengan durasi per adegan yang bisa dihitung. Perlu diperbaiki: sumbu grafik adegan 5 bergeser 80 px dan baru ketahuan di tahap Corong.
- **Corong:** caption 119 kata, dalam batas 70 sampai 120, tanpa emoji dan tanda seru, dan sampul sudah dilunakkan menjadi "diduga berasal dari nama pedometer". Perlu diperbaiki: "RATA²" di adegan 3 belum diubah, dan naskah.md belum disesuaikan dengan sampul.
- **Lup sosial:** mencocokkan enam adegan dan delapan kalimat caption, serta mengecek piksel grafik. Perlu diperbaiki: tidak ada tenggat untuk catatan "RATA²" sehingga tidak jelas siapa yang menanganinya.
- **Kanvas:** tidak ada karya hari ini karena 20 Okt adalah jatah Layar, jadi tidak dievaluasi.

## Keputusan rapat

Rapat pertama menyetujui tiga usulan. Hope mengubah hope.md agar evaluasi membaca data H-1, pemilik Hope. Pena menulis sumber untuk setiap rentang angka dan kata penguat di usulan-pena.md, pemilik Pena. Pena juga wajib menjawab delapan must-fix mandiri dengan "Jawaban Pena", pemilik Pena.

Rapat kedua, dari agenda dadakan pemilik, menyetujui dua usulan untuk Reels 22 Okt, keduanya pemilik Layar. Yang pertama adalah hook 0 sampai 2 detik dengan judul yang muncul sekali dan teks layar minimal 36 px. Yang kedua adalah naskah.md ikut diperbarui setiap kali sampul diubah pihak lain.

Usulan Kompas dan Layar di usulan-kompas.md dan usulan-layar.md belum diterapkan dan menunggu keputusan pemilik.

## Permintaan skill

Ada dua permintaan baru di pipeline/rapat/permintaan-skill.md, keduanya menunggu keputusan pemilik. Pertama, plugin Social Media Skills dari Layar (hook-writer, short-form-video-script, storyboarding) untuk hook Reels dan variasi format. Kedua, plugin Windsor.ai dari Hope untuk membaca reach dan saves Instagram, yang berpotensi mengisi kekosongan data insight. Keputusan lain yang masih menunggu adalah pemakaian foto dari Wikimedia Commons untuk hook.

## Yang paling perlu diperhatikan besok

Cek workflow "Ambil insight Instagram" di GitHub Actions. Jadwalnya 20.00 WIB, tetapi sampai rapat kedua tidak ada run yang tercatat. Tanpa data insight 19 dan 20 Okt, rapat 21 Okt tidak bisa membaca performa, dan aturan H-1 yang baru disetujui belum bisa dijalankan.
