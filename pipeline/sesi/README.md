# Sesi harian Curioverse (3 run)

Mulai 2026-10-28 tim Curioverse tidak lagi berjalan sebagai 16 jadwal terpisah yang saling memicu. Setiap hari (Senin–Sabtu) ada **tiga run**. Satu run mengerjakan beberapa peran berurutan sampai hasilnya jadi.

| Run | Jam WIB (utama · cadangan) | Peran yang dikerjakan | Hasil akhir |
|---|---|---|---|
| 📰 Redaksi | 05.07 · 10.07 | Kompas → Pena draf → Utas → **Lup (subagen)** → Pena revisi → Utas → Merpati | 1 artikel terbit di web |
| 📱 Sosial | 14.07 · 16.07 | Kanvas (ganjil) / Layar (genap) → Corong → **Lup sosial (subagen)** → revisi | 1 post `review.status = "lolos"` sebelum 18.45 |
| 🪑 Evaluasi | 19.52 · 21.52 | Facebook + Threads → cek 3 platform → insight → rapat (Hope) → laporan | `runs/<tgl>/laporan.md` + notifikasi ke pemilik |

Instagram tetap diposting otomatis oleh GitHub Actions (`instagram-post.yml`, 18.50 dan cadangan 19.30 WIB). Tidak ada run yang memposting Instagram sendiri kecuali post lolos setelah jam itu lewat.

## Aturan bersama
1. **File peran tetap jadi pegangan.** `pipeline/agents/<peran>.md` sekarang dibaca sebagai panduan *tahap*, bukan jadwal. Abaikan bagian di file peran yang menyebut jam jalan, `fire_trigger`, "rantai", "sesi revisi dipanggil Lup", atau "panggil agen X". Semua itu sekarang terjadi di dalam satu run.
2. **Bisa dilanjutkan (idempoten).** Setiap run memeriksa dulu tahap mana yang sudah ada di repo, lalu mulai dari tahap pertama yang belum ada. Kalau hasil akhirnya sudah ada, run berhenti dengan satu baris. Karena itu jadwal cadangan aman: kalau run utama mati karena limit token, run cadangan meneruskannya.
3. **Commit per tahap.** Setelah setiap tahap selesai, commit + `git pull --rebase origin main && git push origin main`. Pesan commit: `pipeline(<peran>): <tgl> <ringkas>`. Kalau run mati di tengah, hasil yang sudah jadi tidak hilang.
4. **Pemeriksa harus mata segar.** Lup dan Lup sosial dijalankan sebagai **subagen baru** (tool `Agent`) yang hanya diberi path file dan aturannya, bukan pendapat penulis. Keputusan TERBIT/REVISI/TOLAK dan lolos/ditolak tetap milik subagen itu; run utama tidak boleh mengubahnya. Kalau tool `Agent` tidak tersedia, run membaca ulang semua sumber dari nol sebagai Lup dan menulis "review tanpa subagen" di file review.
5. **Batas revisi.** Maksimal 2 putaran revisi per hari untuk artikel dan 2 untuk post sosial. Lewat dari itu, artikel masuk `reserve/` / post ditandai `ditolak`, dan laporan menulis "⚠ PERLU MANUSIA".
6. **RULES.md tetap menang.** Penggabungan tidak melonggarkan akurasi, sumber, kuota (1 artikel + 1 post per hari), atau hari Minggu libur.
7. **Belajar harian** tidak lagi ditulis tiap peran di setiap sesi. Catatan belajar dibuat sekali di run Evaluasi (bagian rapat).
8. **Tidak ada penjaga jadwal.** Kegagalan ditangani oleh jadwal cadangan tiap run. Kalau run cadangan juga gagal, ringkasannya diawali "⚠ PERLU MANUSIA" dan pemilik mendapat notifikasi.

Runbook tiap run: `redaksi.md`, `sosial.md`, `evaluasi.md` di folder ini.
