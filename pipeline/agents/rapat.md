# 🪑 Rapat Harian Redaksi Curioverse

Dijalankan setiap hari **19.52 WIB**, sesudah post Instagram terjadwal (19.00 WIB) dan sesudah semua tugas harian selesai. Dipimpin Hope. Peserta: Kompas, Pena, Lup, Merpati, Kanvas, Layar, Corong, Lup sosial, dan Hope.

Tujuannya seperti ruang redaksi yang baik: setiap orang mengkritik karya orang lain dengan bukti, lalu memperbaiki pekerjaannya sendiri dengan dasar yang sama. Rapat tidak menggantikan review. Lup tetap memutuskan TERBIT/REVISI/TOLAK, dan Lup sosial tetap memutuskan lolos/ditolak.

## Syarat mulai
1. Repo `afreshialaff/curioverse` sudah di-clone di branch main terbaru. Tanggal `<tgl>` = `TZ=Asia/Jakarta date +%F`.
2. Rapat berjalan penuh hanya kalau semua tugas hari ini sudah selesai. Yang belum selesai dicatat sebagai "belum selesai" di rapat, dan rapat tetap berjalan untuk bagian yang sudah ada.
3. Baca semua hasil hari ini: `pipeline/runs/<tgl>/` (drafts, review, final, notes), `social/<tgl>/`, `pipeline/rapat/ig-insights/<tgl>.json`, `pipeline/log.md` 10 baris terakhir, `pipeline/rapat/` hari sebelumnya, dan `pipeline/rapat/permintaan-skill.md`.

## Format rapat (urutan tetap)
Tulis hasilnya ke `pipeline/runs/<tgl>/rapat.md`. Setiap bagian maksimal sepuluh baris.

1. **Pembukaan (Hope):** apa yang terbit hari ini, apa yang ditahan, dan satu hal yang paling mengesankan.
2. **Evaluasi performa (Hope):** data dari ig-insights per post, atau "belum tersedia" dengan pesan errornya. Lalu satu paragraf evaluasi per agen yang punya karya hari itu. Lihat `hope.md` bagian A.
3. **Kritik silang.** Setiap agen memberi **satu** kritik dan **satu** pujian untuk pekerjaan agen lain, dengan kutipan bagian yang dimaksud. Lihat "Sudut kritik" di bawah.
4. **Pengembangan alur (Hope memfasilitasi, Kompas dan Pena terlibat).** Kalau Pena menerima riset dari Kompas dan kesulitan menyusun urutan, Hope mengajukan pertanyaan terarah. Jawabannya dicatat sebagai kerangka alur di bagian ini. Hope tidak menulis kerangka itu sendiri.
5. **Usulan.** Setiap agen boleh mengusulkan satu perbaikan untuk dirinya sendiri, dengan cara mengukurnya. Usulan untuk agen lain ditulis sebagai catatan.
6. **Kebutuhan skill.** Kalau ada agen yang butuh skill atau kemampuan tambahan, tulis di sini dan di `pipeline/rapat/permintaan-skill.md`. Hanya pemilik yang memutuskan skill dibuat atau diubah.
7. **Riset referensi (Kompas, Hope):** dua sampai tiga karya dari media besar yang bagus strukturnya. Catat cara mereka membuka cerita, menaruh sumber, dan transisi antarbagian. Analisis pola saja, dengan link dan tanggal. Tidak boleh menyalin kalimat panjang.
8. **Pemantauan viral (Hope):** hipotesis per post, skala keyakinan, dan cara mengujinya.
9. **Keputusan:** setiap usulan yang punya bukti dan lolos RULES.md disetujui, tanpa batas jumlah per hari (perintah pemilik 2026-10-23). Setiap keputusan punya pemilik dan kriteria selesai. Usulan bagus tidak boleh ditunda hanya karena kuota.

## Sudut kritik per agen
- **Kompas (topik dan arah):** apakah sudut artikel menjawab pertanyaan riset, atau hanya mengumpulkan fakta menarik?
- **Pena (teori dan narasi):** apakah pembukaan membuat pembaca ingin lanjut? Adakah bagian yang bisa dihapus tanpa pembaca kehilangan informasi? Lihat `narasi-artikel.md`.
- **Lup (sumber dan fakta):** apakah klaim didukung sumber primer atau sekunder? Adakah atribusi yang kabur?
- **Merpati (pemilihan dan urutan):** apakah artikel yang dipilih paling siap terbit? Apakah antrean `reserve/` sehat?
- **Kanvas (desain carousel):** hierarki visual, keterbacaan di HP, jarak antarteks, grafik proporsional, konsistensi dengan `social-copy.md`.
- **Layar (Reels):** adegan pertama, ritme, waktu baca per kata, apakah diagram bisa dipahami tanpa suara.
- **Corong (kejelasan dan caption):** apakah paragraf 1 caption berdiri sendiri? Apakah caption menambah konteks, bukan mengulang slide?
- **Lup sosial (kualitas post akhir):** pola kesalahan yang berulang. Adakah masalah yang seharusnya dicegah lebih awal?
- **Hope (performa dan keseluruhan):** apakah format sesuai data akun dan pola publik? Adakah hipotesis yang bisa diuji besok?

## Aturan keras
- **Kritik harus berdasar.** Tanpa kutipan atau bukti, kritik tidak dicatat.
- **Tidak ada yang mengubah fakta atau klaim** karena rapat. Perubahan fakta lewat jalur review dan revisi.
- **Tidak ada yang melewati RULES.md**, termasuk satu post per hari, sumber minimal, dan larangan clickbait.
- **Tidak ada klaim tentang algoritma** tanpa data. Evaluasi berbasis data akun diberi label sesuai kekuatan datanya.
- **Usulan untuk diri sendiri** boleh diterapkan ke file agen sendiri, **maksimal satu perubahan per hari**, dengan catatan `[tgl] perubahan: ...; alasan: ...` di bagian bawah file agen. Perubahan yang melonggarkan akurasi atau keselamatan ditolak.
- **Usulan untuk agen lain** ditulis di `pipeline/rapat/usulan-<agen>.md`. Hope mereview setiap usulan di rapat: cek bukti, cek RULES.md, dan pastikan tidak melonggarkan akurasi atau keselamatan. Usulan yang lolos langsung berstatus "disetujui" dan wajib diterapkan pemilik di file agennya pada sesi berikutnya, lalu dicatat di `pipeline/belajar/<agen>.md`. Usulan yang tidak lolos ditulis alasannya. Pemilik boleh membatalkan kapan saja.
- **Belajar harian wajib untuk setiap agen.** Setiap agen punya metode belajar sendiri (lihat bagian "Belajar harian" di file agennya). Hasil belajar hari itu dicatat di `pipeline/belajar/<agen>.md`. Hope mengecek di rapat bahwa setiap agen punya catatan belajar dan satu perubahan, atau alasan kenapa tidak ada perubahan.
- Rapat tidak boleh menunda publikasi. Kalau rapat gagal di tengah, tulis apa yang sudah jadi dan berhenti.

## Setelah rapat
1. Commit `pipeline/runs/<tgl>/rapat.md`, `pipeline/rapat/`, dan perubahan file agen sendiri yang disetujui. Hanya file itu.
2. Push ke `main`.
3. Ringkasan 3–5 baris untuk pemilik: usulan yang disetujui, pemiliknya, dan satu hal yang paling perlu diperhatikan besok.

## Laporan pukul 21.15
Laporan untuk pemilik dibuat oleh sesi terpisah pukul 21.15 WIB dari `pipeline/runs/<tgl>/rapat.md`. Kalau rapat tidak menghasilkan file itu, laporan menyebut bahwa rapat tidak berjalan dan apa penyebabnya.

## Riset untuk hari berikutnya
Riset referensi dan hasil rapat disimpan di `pipeline/rapat/referensi.md`, paling baru di atas. Kompas membacanya sebelum menyusun brief berikutnya.
