# Usulan untuk Layar · dari rapat 2026-10-20

Diusulkan oleh: Hope (hasil rapat). Status: disetujui (rapat 23 Okt, perintah pemilik: tidak ada batas kuota usulan). Pemilik: Layar.

- Usulan: sebelum render, cek proporsi grafik dengan hitungan piksel dari nilai data, lalu catat hasilnya di naskah (misalnya "lebar = HR × 860 px, dicek").
- Alasan (kasus 20 Okt): sumbu adegan 5 bergeser 80 px dan baru diperbaiki Corong (editor.md, baris Visual).
- Ukuran: adegan grafik lolos Corong tanpa perbaikan proporsi.

## Keputusan rapat kedua · 20 Okt 2026 (agenda dadakan pemilik)
- Disetujui rapat: hook 0–2 detik memuat subjek visual dan topik, judul muncul sekali, teks layar minimal 36 px untuk isi dan 60 px untuk angka, maksimal 8 kata per layar.
- Pemilik: Layar. Diterapkan pada Reels 22 Okt 2026 (tanggal genap). Belum diterapkan langsung ke file Layar oleh rapat.
- Selesai: Reels 22 Okt lolos Lup sosial, frame 0,5 dtk dan 2 dtk terbaca penuh.
- Tambahan: `naskah.md` diperbarui setiap kali sampul diubah pihak lain. Selesai: naskah dan source sampul sama.
- Batas: foto untuk hook harus berlisensi terbuka dan disetujui pemilik (agenda poin 5, belum disetujui).

## Tambahan rapat ketiga · 20 Okt 2026 (fire pemilik)
- Pemilik mengizinkan foto Wikimedia Commons dengan kredit di dalam frame untuk hook 0–2 detik. Sumber izin: payload fire, belum dikonfirmasi langsung. Batas: lisensi dicek di halaman File, kredit terlihat, isi gambar relevan (RULES 3b).

## Keputusan rapat · 22 Okt 2026 (Hope)
- Status: ditunda. Bukti 20 Okt kuat, tetapi kuota tiga usulan disetujui sudah terisi (Pena, Kompas, Corong). Sebagian sudah dicakup Corong dan Lup sosial, jadi rapat 23 Okt perlu memutuskan apakah masih dibutuhkan.

## Keputusan rapat · 2026-10-23 (Hope, perintah pemilik)
- Status: disetujui. Dulu ditunda karena kuota tiga usulan. Kuota itu dicabut hari ini.
- Bukti: kasus 20 Okt (sumbu adegan 5 bergeser 80 px, dicek pemilik di contact sheet). Dicek terhadap RULES bagian 8 (grafik proporsional): memperketat, tidak mengubah angka.
- Pemilik: Layar. Selesai: `layar.md` memuat langkah "hitung lebar grafik dari nilai" sebelum render, dan `naskah.md` mencatat hasilnya (misalnya "HR × 860 px = 528 px, dicek").
- Catatan: Corong sudah mengukur batang carousel. Usulan ini melengkapinya untuk Reels, jadi tidak dobel.
- Pesan untuk Layar: terapkan di sesi berikutnya dan catat di `pipeline/belajar/layar.md`.

## Usulan · dari rapat 2026-10-24 (Hope)
Diusulkan oleh: Hope (berdasar must-fix 2 review Lup sosial untuk Reels halo, `social/2026-10-24/1-halo-effect-good-looking/post.json`). Status: **disetujui** (rapat 24 Okt, keputusan 2). Pemilik: Layar.

- Usulan: setiap angka di adegan ditulis di naskah **dengan apa yang dihitung**: kelompok dan jumlah dari sumber primer, misalnya "60 mahasiswa laki-laki = total peserta, dibagi kondisi esai dan foto", bukan hanya nilainya.
- Alasan (kasus 24 Okt): adegan 4 menulis "Esai jelek yang sama dinilai 60 mahasiswa". 60 adalah total peserta, bukan jumlah penilai esai jelek. Naskah sudah punya bagian "Cek angka", tetapi bagian itu hanya mengecek bahwa angka ada di artikel, bukan siapa yang dihitung.
- Ukuran: adegan angka pada Reels berikutnya memuat baris "dihitung" di naskah, dan Lup sosial tidak menemukan salah atribusi angka.
- Batas: tidak mengubah angka atau fakta. Hanya memperjelas siapa yang dihitung.
- Selesai: naskah Reels berikutnya memuat baris "dihitung" untuk setiap angka.

## Keputusan pemilik · 2026-10-28 (langsung, di sesi Sosial)
- Masalah: Reels terlalu monoton, cuma motion dan teks tanpa aset gambar (pemilik, setelah Reels 28 Okt).
- Keputusan: mulai Reels berikutnya, **setiap adegan wajib punya gambar** sebagai visual utama. Sumber yang disetujui pemilik: foto Wikimedia Commons (lisensi terbuka, kredit di frame), ilustrasi buatan Curioverse, dan gambar AI bergaya ilustrasi lewat Gemini atau Flow (Claude in Chrome). Batas RULES tetap: gambar AI tidak boleh meniru foto nyata, tanpa wajah tokoh asli, tanpa logo.
- Diterapkan di: `pipeline/skills/reels-hook.md` bagian 5, `pipeline/agents/layar.md` langkah 1b dan "Jangan", `pipeline/RULES.md` bagian 8.
- Catatan teknis: run Sosial terjadwal berjalan di cloud tanpa akses komputer pemilik, jadi Gemini/Flow lewat Chrome hanya bisa dipakai kalau task diset "Require this computer". Tanpa itu, Layar memakai foto Commons + ilustrasi sendiri.
- Ukuran: Reels berikutnya (tanggal genap, 30 Okt) punya gambar di 6 dari 6 adegan dan lolos Lup sosial.

## Keputusan pemilik · 2026-10-28 (copywriting Reels)
- Masalah: naskah Reels susah dipahami, loncat-loncat, tidak jelas apa yang mau disampaikan (pemilik, setelah Reels 28 Okt).
- Diagnosis: baris ditulis sebagai potongan fakta bergaya judul berita; bantahan sebelum penjelasan; mekanisme sebelum isi; 7 angka dalam 50 detik; nama orang membuka kalimat; penutup membuka topik baru.
- Keputusan: aturan baru `pipeline/skills/reels-hook.md` bagian 0 (kalimat inti, VO ditulis sebagai cerita lisan dulu, rantai pertanyaan, kata penghubung, maks 3 angka, nama di kredit layar, uji ceritakan ulang lewat subagen, uji loncat). Rubrik "Orang asing" Corong ikut diperketat untuk Reels.
- Ukuran: Reels 30 Okt lolos uji ceritakan ulang tanpa catatan "membingungkan", dan Corong memberi skor Orang asing ≥ 4.
