# 🪑 Rapat Harian Redaksi Curioverse

Dijalankan setiap hari **19.52 WIB**, sesudah post Instagram terjadwal (18.50 UTC / 19.00 WIB) dan sesudah semua tugas harian selesai. Peserta: Kompas, Pena, Lup, Merpati, Kanvas, Layar, Corong, Lup sosial, dan Hope sebagai moderator.

Tujuannya seperti ruang redaksi yang baik: setiap orang mengkritik karya orang lain dengan bukti, lalu semua orang memperbaiki pekerjaannya sendiri dengan dasar yang sama. Rapat tidak menggantikan review harian. Lup tetap memutuskan TERBIT/REVISI/TOLAK, dan Lup sosial tetap memutuskan lolos/ditolak.

## Syarat mulai
1. Repo `afreshialaff/curioverse` sudah di-clone di branch main terbaru. Tanggal `<tgl>` = `TZ=Asia/Jakarta date +%F`.
2. Rapat berjalan **hanya kalau semua tugas hari ini sudah selesai atau jelas tidak akan selesai**: ada `review/` untuk setiap draf, ada `final/` atau alasan TOLAK, dan `social/<tgl>/*/post.json` sudah punya `review.status` final. Kalau ada yang masih `pending`, catat di rapat sebagai "belum selesai", jangan menunggu.
3. Baca semua hasil hari ini: `pipeline/runs/<tgl>/` (drafts, review, final, notes), `social/<tgl>/`, `pipeline/log.md` 10 baris terakhir, dan `pipeline/rapat/` hari sebelumnya.

## Format rapat (urutan tetap)
Tulis hasilnya ke `pipeline/runs/<tgl>/rapat.md` dengan bagian berikut. Setiap bagian maksimal sepuluh baris.

1. **Pembukaan (Hope):** satu paragraf: apa yang terbit hari ini, apa yang ditahan, dan satu hal yang paling mengesankan dari hari itu.
2. **Kritik silang.** Setiap agen memberi **satu** kritik dan **satu** pujian untuk pekerjaan agen lain. Setiap kritik wajib mengutip bagian yang dimaksud. Lihat bagian "Sudut kritik" di bawah.
3. **Usulan.** Setiap agen boleh mengusulkan satu perbaikan untuk dirinya sendiri, dengan cara mengukurnya. Usulan untuk agen lain ditulis sebagai catatan, bukan perintah.
4. **Riset referensi (Kompas, Hope):** dua sampai tiga karya dari media besar (misal BBC Indonesia, Kompas, Tempo) yang bagus strukturnya. Catat: bagaimana mereka membuka cerita, di mana sumber ditaruh, bagaimana transisi antarbagian. Tulis sebagai analisis, dengan link dan tanggal. Dilarang menyalin kalimat panjang.
5. **Pemantauan viral (Hope):** hipotesis per post, skala keyakinan, dan baris untuk `viral-log.md`.
6. **Keputusan:** maksimal tiga usulan yang disetujui. Setiap keputusan punya pemilik (agen) dan kriteria selesai.

## Sudut kritik per agen
Kritik harus melihat dari sudut keahlian masing-masing:
- **Kompas (pemilih topik dan arah):** apakah sudut artikel menjawab pertanyaan riset, atau hanya mengumpulkan fakta menarik?
- **Pena (teori dan narasi):** apakah pembukaan membuat pembaca ingin lanjut? Apakah ada bagian yang bisa dihapus tanpa pembaca kehilangan informasi? Lihat `narasi-artikel.md`.
- **Lup (pemahaman sumber dan fakta):** apakah klaim didukung sumber primer atau sekunder? Apakah ada atribusi yang kabur seperti pada review Lup 19 Okt?
- **Merpati (pemilihan dan urutan):** apakah artikel yang dipilih paling siap terbit hari itu? Apakah antrean `reserve/` sehat?
- **Kanvas (desain carousel):** hirarki visual, keterbacaan di layar HP, jarak antarteks, grafik yang proporsional, konsistensi dengan `social-copy.md`.
- **Layar (Reels):** adegan pertama, ritme, waktu baca per kata, apakah diagram bisa dipahami tanpa suara.
- **Corong (kejelasan dan caption):** apakah paragraf 1 caption berdiri sendiri? Apakah caption menambah konteks, bukan mengulang slide?
- **Lup sosial (kualitas post akhir):** pola kesalahan yang berulang dari hari-hari sebelumnya. Apakah ada masalah yang seharusnya dicegah lebih awal?
- **Hope (viral dan keseluruhan):** apakah format sesuai pola yang sedang dipakai? Apakah ada sinyal yang bisa diuji besok?

## Aturan keras
- **Kritik harus berdasar.** Tanpa kutipan atau bukti, kritik tidak dicatat.
- **Tidak ada yang mengubah fakta atau klaim** karena rapat. Perubahan fakta tetap lewat jalur review dan revisi.
- **Tidak ada yang melewati RULES.md**, termasuk aturan satu post per hari, sumber minimal, dan larangan clickbait.
- **Usulan untuk diri sendiri** boleh diterapkan ke file agen sendiri, **maksimal satu perubahan per hari**, dengan catatan di bagian bawah file agen: `[tgl] perubahan: ...; alasan: ...`. Perubahan yang melonggarkan aturan keselamatan atau akurasi ditolak.
- **Usulan untuk agen lain** tidak boleh diterapkan langsung. Ditulis di `pipeline/rapat/usulan-<agen>.md` dan dibaca agen pemilik sebelum sesi berikutnya.
- Rapat tidak boleh menunda publikasi. Kalau rapat gagal di tengah, tulis apa yang sudah jadi dan berhenti.

## Setelah rapat
1. Commit `pipeline/runs/<tgl>/rapat.md`, `pipeline/rapat/`, dan perubahan file agen sendiri yang sudah disetujui. Commit hanya file itu.
2. Push ke `main`.
3. Ringkasan 3–5 baris untuk pemilik: usulan yang disetujui, pemiliknya, dan satu hal yang paling perlu diperhatikan besok.

## Riset untuk hari berikutnya
Riset referensi dan usulan Kompas disimpan di `pipeline/rapat/referensi.md` (pembaruan harian, paling baru di atas). Kompas membacanya sebelum menyusun brief berikutnya, supaya riset hari itu sudah membawa hasil rapat sebelumnya.
