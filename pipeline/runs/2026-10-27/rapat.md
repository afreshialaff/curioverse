# Rapat harian redaksi · 2026-10-27 · moderator Hope

Dicatat 19.58 WIB (sesi terjadwal 19.52, dimulai 19.58). Peserta dengan karya hari ini: Kompas, Pena, Lup, Merpati, Utas, Kanvas, Corong, Lup sosial, Hope. Layar hadir tanpa karya (tanggal ganjil, jatah Kanvas).

## 1. Pembukaan (Hope)
- Terbit: `banjir-molase-boston-1919` (artikel web dari reserve, FIFO; lihat `runs/2026-10-27/publish.md`). Carousel 8 slide terbit di Instagram pukul 19.06 WIB: https://www.instagram.com/p/De_0TZDm0fu/. Threads terbit. Facebook gagal (403, izin Halaman Facebook kurang; perlu dicek manusia).
- Ditahan: tidak ada. Reserve sekarang 2: `great-pacific-garbage-patch` dan `msg-chinese-restaurant-syndrome`, keduanya sudah punya `final/` dan lolos cek must-fix.
- Yang paling mengesankan: Lup menemukan bahwa "79.000 ton" di rilis pers berbeda dengan makalah primer yang menulis "at least 79 (45–129) thousand tonnes". Pena memakai "setidaknya" dan rentang, dan final mempertahankannya.
- Belum selesai hari ini: Insight 20.05 (menunggu jadwal), cek post 21.00, posting Facebook. Musik carousel belum bisa dipastikan (`post.json` tidak mencatat musik; cek manual pemilik).

## 2. Evaluasi performa (Hope)
- Data H-1 (26 Okt) belum tersedia: run insight 26 Okt gagal (usage limit). Data terakhir yang dipakai: `pipeline/rapat/ig-insights/2026-10-27.json`, diambil 26 Okt 19.02 UTC, memuat post 20–24 Okt. Belum ada data post 25–27 Okt, termasuk carousel hari ini.
- Pola sementara dari 5 post (label: sampel kecil, belum berbasis data): Reels 22 Okt reach 110 dan 24 Okt reach 105; carousel 20, 21, dan 23 Okt reach 1, 1, dan 2.
- Kanvas (carousel 27 Okt): visual data hanya di slide 5–7 dengan baris sumber, sesuai `social-copy.md` bagian 5. Lemah: keluarga font judul berganti tiap slide (catatan Corong). Coba besok: satu keluarga font judul per carousel.
- Corong (caption dan editor): caption 104 kata, paragraf 1 berdiri sendiri, skor rubrik 4–5. Lemah: slide 4 sempat memuat "(2016)" kaku sampai dibaca keras. Coba besok: baca keras setiap slide sebelum ekspor.
- Merpati: FIFO dijalankan benar, dan kuota satu artikel terpenuhi. Lemah: `publish.md` mencatat "Deploy: belum dicek". Dampak performa belum bisa dinilai, karena data artikel web belum masuk.
- Pena, Kompas, Utas, Lup, dan Lup sosial: tidak ada data performa per agen hari ini, karena data post 25–27 Okt belum ada. Evaluasi kualitatif (belum berbasis data): Pena dan Lup menutup sumber primer untuk klaim angka; Utas menyunting tanpa mengubah angka.

## 3. Kritik silang
- Corong → Kanvas. Kritik: "Keluarga font judul berganti tiap slide (condensed sans di slide 2, serif tipis di slide 6, serif lain di 5, 7, 8)" (`social/2026-10-27/1-banjir-molase-boston-1919/editor.md`). Pujian: "Visual data hanya di slide 5 (perbandingan dua keadaan), 6 (ungkapan vs kenyataan), 7 (garis waktu)" (`naskah.md`). Sesuai `social-copy.md` bagian 5.
- Kompas → Lup. Pujian: review GPGP menguji "belum ada pengukuran baru" dan menjawabnya dengan studi 2024 (ERL, 19 Nov 2024), bukan hanya menandai salah (`review/great-pacific-garbage-patch.md`).
- Pena → Kompas. Kritik: hook usulan dalam brief mengambil angka 79.000 ton dari dua sumber, salah satunya rilis pers The Ocean Cleanup (`brief.md`, bagian 1). Angka rentang 45–129 tidak ada di brief. Pujian: pertanyaan riset "kalau 'pulau sampah' itu nggak bisa diinjak... sebenarnya apa yang ada di sana" sesuai `RULES.md` bagian 1.
- Lup → Utas. Pujian: "Pembuat alat tangkap terbesarnya" diubah jadi "Asal alat tangkapnya terbanyak dari..." karena kata "pembuat" tidak cocok dengan isi sumber (`notes/utas-great-pacific-garbage-patch.md`).
- Utas → Pena. Kritik: "Kalimat panjang soal studi The Ocean Cleanup 2022" dipecah jadi tiga kalimat. Kalimat itu melanggar batas 15 kata di `bahasa.md` bagian 4, dan kritiknya ditujukan ke draf, bukan ke Pena.
- Hope → Merpati. Kritik: `publish.md` menulis "Deploy: belum dicek" dan tidak ada langkah pengganti. Pujian: setiap kandidat dicek ulang must-fix-nya dengan daftar MF1–MF4 dan MF1–MF3.
- Lup sosial → Corong. Pujian: editor mencantumkan label "yang sering ditulis" untuk 56 km/jam, sesuai aturan atribusi. Pertanyaan untuk Lup sosial: catatan "Koreksi caption: USIA disebut 'induk perusahaan pemilik tangki'" belum jelas. Caption yang terbit masih memuat frasa itu, dan isinya konsisten dengan artikel (Purity Distilling milik USIA). Lup sosial perlu memperjelas apakah ada yang harus diubah.

## 4. Pengembangan alur (Kompas, Pena)
- Tidak ada antrean riset yang sulit disusun hari ini. Pena menerima riset GPGP dan MSG dengan urutan yang sudah jadi. Tidak ada kerangka alur baru yang perlu dicatat dari Hope.

## 5. Usulan
- Kanvas (diri sendiri): perubahan "Variasi wajib" sudah diterapkan di `kanvas.md` pada 27 Okt. Tidak ada perubahan kedua hari ini.
- Corong → Kanvas: satukan keluarga font judul, maksimal dua per carousel. Bukti: `editor.md`. Status: disetujui (lihat `pipeline/rapat/usulan-kanvas.md`).
- Kompas (dicatat Hope): angka yang beda antar sumber wajib memakai rentang dari makalah primer, bukan rilis pesan pihak penulis studi. Bukti: brief hook 27 Okt dibanding `docs.rwu.edu/fcas_fp/462`. Status: disetujui (lihat `pipeline/rapat/usulan-kompas.md`).
- Merpati (dicatat Hope): setiap publish mencatat status deploy (dibuka atau tidak, dengan alasan). Status: disetujui (lihat `pipeline/rapat/usulan-merpati.md`).
- Hope (diri sendiri): tidak ada perubahan hari ini. Alasan: belum ada usulan yang lolos untuk `hope.md`.

## 6. Kebutuhan skill
- Ditambahkan ke `pipeline/rapat/permintaan-skill.md` (27 Okt, Merpati dan Lup): akses baca halaman situs untuk memverifikasi deploy dan ulang sumber. WebFetch ditolak lagi di sesi terjadwal (robots dan izin). Status: baru.

## 7. Riset referensi (Kompas, Hope)
- Tidak ada karya media besar yang bisa dibuka hari ini. Pencarian BBC Indonesia dan Kompas tidak menemukan artikel feature Oktober 2026. Hasil Kompas TV yang muncul adalah berita, dan halamannya ditolak robots.
- Sumber pola yang dibuka (bukan media besar, diberi label): NetInfluencer, 16 Jun 2026, "Instagram Views Up 27% in Early 2026" (delapan bagian bernomor, tiap bagian satu temuan dengan angka). Metricool, "2026 Instagram Study", 16 Jun 2026 (diperbarui 1 Jul 2026), carousel saves sekitar 9× foto tunggal, metode tidak dirinci.
- Catatan: hasil tipis. Entri lengkap di `pipeline/rapat/referensi.md`.

## 8. Pemantauan viral (Hope)
- H9 (keyakinan rendah): carousel 27 Okt, jika bermusik, mendapat reach lebih tinggi dari rata-rata carousel 20–23 Okt (reach 1–2). Dasar: data akun (`ig-insights`, diambil 26 Okt 19.02 UTC); Storyboard18, 5 Jan 2026 (fitur musik carousel, tanpa data efek). Uji: reach post 27 Okt dari `ig-insights` 28 Okt, dan status musik dicatat pemilik.
- H10 (keyakinan sedang, label data kecil): di akun ini Reels mendapat reach lebih tinggi dari carousel (2 Reels 105–110, 3 carousel 1–2, 20–24 Okt). Dasar: data akun. Arah yang sama muncul di NetInfluencer dan Metricool (16 Jun 2026), tapi itu data vendor lintas akun. Uji: tiga carousel berikutnya dengan musik. Jika reach tetap 1–2, H10 tetap didukung dan H9 gugur.
- Batas: tidak ada klaim tentang cara kerja algoritma Instagram. Semua di atas adalah pola dan hipotesis.
- Log: `pipeline/rapat/viral-log.md` (27 Okt).

## 9. Keputusan
- Disetujui, pemilik Kanvas: satu keluarga font judul per carousel, mulai carousel berikutnya. Selesai: Corong mencatat satu keluarga font di `editor.md` pada post berikutnya.
- Disetujui, pemilik Kompas: angka yang beda antar sumber ditulis rentang dan diambil dari makalah primer bila ada. Selesai: brief berikutnya memuat rentang atau alasan primer tidak ada.
- Disetujui, pemilik Merpati: `publish.md` mencatat status deploy. Selesai: publish berikutnya memuat baris "Deploy".
- Ditolak: tidak ada.
- Untuk pemilik (perlu manusia):
  1. Facebook Page gagal 403 (izin `pages_read_engagement` dan `pages_manage_posts`). Perlu dicek di Meta.
  2. Musik carousel 27 Okt belum bisa dipastikan. Cek manual di aplikasi.
  3. Insight 26 Okt gagal karena usage limit. Data H-1 hilang, dan belajar 27 Okt untuk Lup, Utas, dan Hope belum tercatat (ditulis sebagai temuan di sini, tidak dihukum).

## Setelah rapat
- File yang di-commit: `pipeline/runs/2026-10-27/rapat.md`, `pipeline/rapat/viral-log.md`, `pipeline/rapat/referensi.md`, `pipeline/rapat/permintaan-skill.md`, `pipeline/rapat/usulan-kanvas.md`, `pipeline/rapat/usulan-kompas.md`, `pipeline/rapat/usulan-merpati.md`.
- Ringkasan untuk pemilik: lihat bagian Keputusan di atas dan laporan 21.15.
