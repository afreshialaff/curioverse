# Skill: Reels hook dan konteks (Layar, Lup sosial)

Dipakai Layar saat menulis naskah dan membangun Reels. Lup sosial memakai bagian 1–3 untuk cek. Standar bahasa tetap di `bahasa.md`, standar struktur di `social-copy.md`. Skill ini menambah aturan khusus Reels.

## 1. Tiga detik pertama
- Frame pertama sudah menampilkan subjek: foto atau ilustrasi bergambar (bagian 5), bukan latar kosong atau kartu teks.
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

## 5. Gambar (keputusan pemilik 2026-10-28: setiap adegan wajib punya gambar)
Reels yang cuma teks bergerak dinilai terlalu monoton. Mulai Reels berikutnya, **keenam adegan punya visual utama berupa gambar** (foto atau ilustrasi bergambar), bukan cuma kartu teks atau kotak alur. Teks layar = VO tetap ada, tapi gambar jadi pusat frame. Grafik batang dan diagram alur tetap boleh, asal adegan itu juga punya gambar (misalnya grafik di atas foto/ilustrasi, atau ilustrasi di samping alur).

Sumber yang boleh, urut prioritas:
1. **Foto Wikimedia Commons** (Public domain, CC0, CC BY, CC BY-SA) atau foto domain publik pemerintah AS (NASA, NOAA, USGS, Library of Congress), sesuai RULES bagian 3b. Lisensi dicek di halaman File, kredit tampil di frame ("Foto: Wikimedia Commons / <pembuat> / <lisensi>"). Termasuk `image`/`img` artikel yang berupa foto.
2. **Ilustrasi buatan Curioverse**: SVG/HTML yang digambar sendiri di komposisi atau dari `assets/illustrations/`, gaya Curioverse. Kredit "Ilustrasi: Curioverse".
3. **Gambar AI bergaya ilustrasi** lewat Gemini atau Flow (Google), hanya kalau sesi punya akses Claude in Chrome ke komputer pemilik. Kredit "Ilustrasi AI (Gemini)" atau "Ilustrasi AI (Flow)" di frame. Prompt dan alat dicatat di `aset.json`.

Batas yang tidak berubah:
- Gambar harus relevan dengan adegan. Dilarang memakai foto peristiwa lain seolah-olah peristiwa yang dibahas, atau foto orang lain sebagai tokoh.
- Gambar AI **tidak boleh meniru foto nyata**: tidak fotorealistik, tidak menggambarkan peristiwa/tempat tertentu seolah dokumentasi, tidak menggambar wajah tokoh asli, tanpa logo merek. Teks, angka, dan label tidak diambil dari gambar AI (sering salah eja); tulis di HTML di atasnya.
- Tanpa foto stok, tanpa gambar dari Google Images, Getty, Shutterstock, atau situs berita.
- Kredit kecil tapi terbaca (≥ 28 px) di sudut bawah gambar.

Pencatatan: setiap aset disimpan di `social/<tgl>/<post>/source/assets/` dan didaftar di `social/<tgl>/<post>/aset.json`: `{ "adegan": 1, "file": "...", "jenis": "foto | ilustrasi | ilustrasi-ai", "sumber": "<URL halaman File / nama alat>", "lisensi": "...", "kredit": "...", "prompt": "<khusus AI>" }`.

Lup sosial: adegan tanpa gambar = must-fix (video). Foto: buka halaman File, cek lisensi, kredit, dan relevansi. Gambar AI: cek labelnya ada di frame dan tidak meniru foto nyata. Aset tanpa catatan di `aset.json` = must-fix.

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
