# Skill: Reels hook dan konteks (Layar, Lup sosial)

Dipakai Layar saat menulis naskah dan membangun Reels. Lup sosial memakai bagian 1–3 untuk cek. Standar bahasa tetap di `bahasa.md`, standar struktur di `social-copy.md`. Skill ini menambah aturan khusus Reels.

## 1. Tiga detik pertama
- Frame pertama sudah menampilkan subjek: gambar dari artikel atau ilustrasi, bukan latar kosong.
- Hook memuat topik dan satu pertanyaan yang bisa dijawab di video. Contoh: "Angka 10.000 langkah itu dari mana?". Bukan "Ini yang nggak mereka kasih tau".
- Judul tidak diputar pelan dari kosong. Teks sudah utuh sejak frame pertama.
- Adegan kedua menjawab pertanyaan hook. Tidak mengulang judul.

## 2. Konteks harus terbaca tanpa caption
- Penonton yang tidak membaca caption harus tahu: topiknya, siapa yang bicara (nama dan jabatan di layar), dan kapan atau di mana kejadiannya.
- Setiap angka punya satuan dan tahun di dalam frame.
- Setiap kutipan punya nama dan jabatan orangnya.

## 3. Teks di layar
- Maksimal 8 kata sekaligus. Lebih dari itu, pecah jadi dua frame.
- Angka besar minimal sekitar 60 px di lebar 1080. Isi minimal sekitar 36 px. Label grafik minimal sekitar 30 px.
- Judul tidak diulang di adegan lain.
- Tidak ada teks yang menimpa gambar atau diagram.

## 4. Variasi format antar Reels
Jangan pakai format yang sama dua hari berturut-turut. Catat pilihan di naskah:
- Tanya-jawab: pertanyaan di frame 1, jawaban satu bukti per adegan.
- Bukti satu angka: satu angka besar, konteksnya, lalu sumbernya.
- Timeline: tahun berurutan, satu peristiwa per frame.
- Perbandingan: dua hal berdampingan.

## 5. Gambar
- Boleh: `image` dan `img` artikel di `content/stories/<id>.json` (sudah berlisensi terbuka dan berkredit), atau ilustrasi SVG di `assets/illustrations/`.
- Kredit ditampilkan di dalam frame, kecil tapi terbaca, di sudut bawah.
- Gambar harus relevan dengan adegan. Dilarang memakai foto peristiwa lain seolah-olah peristiwa yang dibahas.
- Footage dan foto dari luar tetap dilarang, kecuali keputusan pemilik yang tercatat di `pipeline/rapat/` untuk hook tertentu.

## 6. Sebelum render
- Lihat contact sheet. Frame pertama harus sudah berisi subjek dan teks hook.
- Waktu baca minimal 0,4 detik per kata yang tampil.
- Setiap angka dan nama dicocokkan dengan artikel. Angka yang tidak ada di artikel tidak boleh masuk.
- Grafik dihitung dari nilai, lalu dicatat hasil hitungannya di naskah.

## 7. Setelah terbit
- Catat format dan hipotesisnya di `pipeline/rapat/viral-log.md`.
- Kalau data insight sudah ada di `pipeline/rapat/ig-insights/`, baca reach dan saves sebelum memilih format berikutnya.

## Batas
- Tidak ada klaim tentang algoritma. Format dipilih dari data akun dan pola yang bisa diuji.
- Hook clickbait ditolak, sesuai `bahasa.md` bagian 5.
