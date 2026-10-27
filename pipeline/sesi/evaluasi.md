# 🪑 Run Evaluasi (19.52, cadangan 21.52 WIB)

Satu run sesudah Instagram tayang: posting lintas platform, cek, insight, rapat, laporan. Peran: 🪑 Hope (semua tahap).

## 0. Persiapan
- `<tgl>` = `TZ=Asia/Jakarta date +%F`. Hari Minggu: berhenti, "libur".
- Baca: `pipeline/sesi/README.md`, `pipeline/agents/hope.md` (abaikan bagian "penjaga jadwal" dan `fire_trigger`), `pipeline/agents/rapat.md`, `pipeline/RULES.md`.
- **Cek titik lanjut:**
  | Sudah ada | Mulai dari |
  |---|---|
  | `pipeline/runs/<tgl>/laporan.md` | berhenti; jawaban akhir = isi laporan itu |
  | `pipeline/runs/<tgl>/rapat.md` | Tahap 5 |
  | `pipeline/rapat/ig-insights/<tgl>.json` dengan `fetched_at` hari ini | Tahap 4 |
  | lainnya | Tahap 1 |

## Tahap 1 · Facebook + Threads
Ikuti `hope.md` bagian H. Untuk setiap `social/<tgl>/*/post.json` yang `review.status = "lolos"`:
- Kalau Instagram belum `posted` dan sekarang sudah lewat 19.35: picu `instagram-post.yml` sekali (`inputs[date]=<tgl>`, `inputs[dry_run]=0`), tunggu, `git pull`. Kalau tetap bukan `posted`, **jangan** posting Facebook/Threads; catat sebagai masalah utama.
- Kalau Instagram `posted`: buat `cross.json`, `facebook.json`, `threads.json` (caption dipotong di kalimat penuh ≤400 karakter + "Baca selengkapnya: <link>", Threads ≤500 karakter, tanpa menambah fakta/hashtag). Commit + push **sebelum** memicu workflow.
- Picu `facebook-post.yml` dan `threads-post.yml` (`inputs[file]=social/<tgl>/<dir>/<file>.json`, `inputs[dry_run]=0`) hanya untuk platform yang belum `posted`. Tunggu, update status di `cross.json`, commit + push. Gagal → catat errornya dari log run.

## Tahap 2 · Cek 3 platform
Pastikan Instagram, Facebook, Threads berstatus `posted` (catat permalink yang diketahui). Catat juga apakah carousel hari ini bermusik (`hope.md` bagian F, musik ditambah manual). Tidak memicu ulang lebih dari sekali per platform.

## Tahap 3 · Insight Instagram
`gh api -X POST repos/afreshialaff/curioverse/actions/workflows/instagram-insights.yml/dispatches -f ref=main`, tunggu run selesai (`.../runs?per_page=1`, cek `status` dan `conclusion`), `git pull`, baca `pipeline/rapat/ig-insights/<tgl>.json`: jumlah post dan `errors`. Gagal → ambil pesan error dari log. Jangan mengarang angka.

## Tahap 4 · Rapat
Ikuti `pipeline/agents/rapat.md` format rapat (urutan tetap) dan aturan kerasnya, dengan Hope sebagai moderator yang memerankan semua peran bergiliran berdasarkan bukti di repo. Evaluasi performa memakai data H-1 sesuai `hope.md` bagian A (cek `fetched_at`). Tambahan dari penggabungan:
- **Belajar harian:** satu baris per peran yang bekerja hari ini di `pipeline/belajar/<peran>.md` (apa yang dipelajari dari hasil hari ini), bukan sesi belajar terpisah.
- **Kelancaran run:** catat status tiga run hari ini (Redaksi, Sosial, Evaluasi): jalan utama atau cadangan, tahap yang macet, jumlah putaran revisi.
- Usulan untuk peran lain tetap ditulis di `pipeline/rapat/usulan-<peran>.md`; usulan yang disetujui diterapkan oleh run berikutnya yang memegang peran itu.

Tulis `pipeline/runs/<tgl>/rapat.md`, satu baris `pipeline/rapat/viral-log.md`, satu entri `pipeline/rapat/referensi.md`. Commit + push.

## Tahap 5 · Laporan
Ikuti urutan laporan lama (prompt 21.15): apa yang terbit (judul + link) dan yang ditahan; status 3 platform; performa dari insight (atau error-nya); evaluasi singkat per peran (satu kalimat berhasil, satu perlu diperbaiki); keputusan rapat; permintaan skill hari ini; satu hal yang paling perlu diperhatikan besok. Simpan `pipeline/runs/<tgl>/laporan.md`, commit + push.

## Selesai
Jawaban akhir = isi laporan (dibaca langsung di notifikasi). Baris pertama "⚠ PERLU MANUSIA" kalau: artikel tidak terbit, Instagram tidak terbit, atau ada run yang gagal di jadwal utama dan cadangan.
