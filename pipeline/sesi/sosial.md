# 📱 Run Sosial (14.07, cadangan 16.07 WIB)

Satu run dari artikel terbit sampai post Instagram siap diposting (`review.status = "lolos"`). Peran: 🎨 Kanvas (tanggal ganjil) atau 🎬 Layar (tanggal genap) → 📣 Corong → 🔎 Lup sosial (subagen) → revisi.

Target: post lolos dan ter-push **sebelum 18.45 WIB** (GitHub Actions memposting 18.50, cadangan 19.30).

## 0. Persiapan
- `<tgl>` = `TZ=Asia/Jakarta date +%F`. Hari Minggu: berhenti, "libur".
- Baca sekali di awal: `pipeline/sesi/README.md`, `pipeline/RULES.md` bagian 8, `pipeline/config.json` (`social`), `pipeline/skills/bahasa.md`, `pipeline/skills/social-copy.md`, `pipeline/rapat/referensi.md` (3 entri teratas).
- Artikel hari ini = baris `<tgl> · terbit:` di `pipeline/log.md`. **Kalau belum ada**, artikel web belum terbit: berhenti dengan "⚠ PERLU MANUSIA: artikel <tgl> belum terbit, run Redaksi perlu dicek".
- **Cek titik lanjut** di `social/<tgl>/*/post.json` (abaikan `"backfill": true`):
  | Kondisi | Mulai dari |
  |---|---|
  | `review.status = "lolos"` | berhenti, "post <tgl> sudah lolos" (kalau sudah lewat 19.30 dan `post.status` belum `posted`, jalankan Tahap 5 saja) |
  | ada `editor` dan `review.status = "ditolak"` | Tahap 4 (revisi) |
  | ada `editor`, review `pending` | Tahap 3 |
  | post ada, belum ada `editor` | Tahap 2 |
  | belum ada post | Tahap 1 |

## Tahap 1 · Kanvas atau Layar
- **Tanggal ganjil → Kanvas.** Ikuti `pipeline/agents/kanvas.md` bagian "Bikin carousel" dan "Variasi wajib" persis. Simpan URL ekspor sebagai `remote`, commit + push SECEPATNYA, tunggu ±3 menit, `git pull`, pastikan `slide-*.jpg` sudah diunduh workflow "Ambil media sosial" (ekspor ulang maks 2 kali kalau `fetch_error`).
- **Tanggal genap → Layar.** Ikuti `pipeline/skills/reels-hook.md` dan `pipeline/agents/layar.md` bagian "Bikin Reels" dan "Voice over (ElevenLabs)" persis. VO wajib; kalau tool ElevenLabs tidak ada, jangan pakai suara lain, tulis "⚠ VO BELUM ADA" dan post tidak boleh lolos.
- Caption dikosongkan. Commit + push.

## Tahap 2 · Corong
Ikuti `pipeline/agents/corong.md` bagian "Tugas per post": lihat hasil seperti penonton, nilai 12 uji `social-copy.md` bagian 9, perbaiki sendiri yang bisa, tulis caption format BBC (bagian 8), isi `editor` dan `editor.md`. Commit + push.

## Tahap 3 · Lup sosial (SUBAGEN)
Panggil tool `Agent` (subagent_type `general-purpose`) dengan brief ini. **Jangan tambahkan pendapatmu tentang post.**

> Kamu 🔎 Lup sosial, pemeriksa fakta akhir post Instagram Curioverse. Repo ada di path clone saat ini. Tanggal <tgl>. Baca `pipeline/RULES.md` bagian 8, `pipeline/skills/social-copy.md`, `pipeline/skills/bahasa.md` bagian 8, dan `pipeline/agents/lup.md` bagian "Sesi sosial" (abaikan perintah fire_trigger dan workflow). Untuk `social/<tgl>/<dir>/post.json`: cocokkan setiap teks di slide (`slide-*.jpg`, lihat gambarnya) atau di `source/index.html` + frame `reel.mp4` (ambil dengan ffmpeg), dan setiap kalimat caption, dengan artikel `content/stories/<story>.json`. Periksa angka di dalam ilustrasi, grafik proporsional, media sudah ada di repo, istilah sulit tidak jadi judul/label, VO ada untuk Reels. Koreksi kecil di caption boleh kamu betulkan sendiri. Tulis `review.status` "lolos" atau "ditolak" + `review.notes` (must-fix bernomor, sebut pemiliknya: desain/video atau caption). Jangan commit. Balas: keputusan + must-fix.

Commit + push hasil review: `pipeline(lup-sosial): <tgl> review`.

## Tahap 4 · Revisi (maks 2 putaran)
Kalau `ditolak`: kerjakan must-fix sendiri dengan peran yang tepat, tanpa bikin post baru.
- Desain carousel → ikuti `kanvas.md` "Sesi revisi" (edit-design, ekspor ulang slide yang berubah, hapus `slide-N.jpg` lama, set `remote` baru, push, tunggu unduhan, lihat JPG baru).
- Reels → ubah `source/index.html`, render ulang (`layar.md` langkah 4–5), push.
- Caption/kejelasan → peran Corong.
Lalu ulangi Tahap 3 (subagen baru). Setelah 2 putaran masih ditolak: berhenti, "⚠ PERLU MANUSIA" dengan daftar must-fix.

## Tahap 5 · Posting terlambat (hanya kalau perlu)
Kalau post baru lolos setelah 18.50 WIB dan `post.status` belum `posted`: picu `gh api -X POST repos/afreshialaff/curioverse/actions/workflows/instagram-post.yml/dispatches -f ref=main -f 'inputs[date]=<tgl>' -f 'inputs[dry_run]=0'`, tunggu selesai, `git pull`, cek `post.status`. Jangan memposting sebelum 18.50 (jam posting tidak boleh dimajukan).

## Selesai
Ringkasan 3–5 baris: artikel, format (carousel/Reels), link desain Canva atau durasi Reels, skor Corong, keputusan Lup sosial + jumlah putaran revisi. Kalau post tidak lolos, baris pertama "⚠ PERLU MANUSIA".
