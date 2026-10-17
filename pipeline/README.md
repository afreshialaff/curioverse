# Dapur Redaksi Curioverse 🧭✒️🔎🕊️

Empat agent yang tiap hari bikin satu sampai beberapa artikel baru, lalu menerbitkannya ke curioverse-beta.vercel.app. Mereka nggak ngobrol langsung; mereka saling titip kerjaan lewat folder ini di repo, jadi tiap sesi cuma membaca file yang dia butuh (hemat token) dan semua jejak kerja tersimpan di git.

## Jadwal harian (WIB)
| Jam | Agent | Peran | Baca | Tulis |
|---|---|---|---|---|
| 00.00 | 🧭 **Kompas** | Content planner + riset awal | `inbox.md`, `backlog.md`, `log.md`, daftar artikel di web | `runs/<tgl>/brief.md`, update `backlog.md` & `inbox.md` |
| 05.00 | ✒️ **Pena** | Copywriter, draf pertama | `brief.md` | `runs/<tgl>/drafts/<id>.json` + `notes/<id>.md` |
| 09.00 | 🔎 **Lup** | Reviewer + cek fakta, buka semua link | draf + notes | `runs/<tgl>/review/<id>.md` |
| 12.00 | ✒️ **Pena** | Revisi berdasarkan review | draf + review | `runs/<tgl>/final/<id>.json` |
| 15.00 | 🕊️ **Merpati** | Publisher | final + review | `content/stories/<id>.json`, `log.md` |
| 15.20 | 🎨 **Kanvas** | Carousel Instagram di Canva | artikel terbit hari ini | `social/<tgl>/<n>-<id>/post.json` (+ link ekspor) |
| 15.25 | 🎬 **Layar** | Reels Instagram (HyperFrames) | artikel terbit hari ini | `social/<tgl>/<n>-<id>/reel.mp4`, `post.json` |
| 16.40 | 📣 **Corong** | Editor kejelasan + tulis caption | post + artikel + `skills/social-copy.md` | perbaikan desain/video, `caption`, `editor.md` |
| 17.38 | 🔎 **Lup sosial** | Cek fakta akhir | post.json + artikel | `review` di post.json |
| 19.00 | 🤖 GitHub Actions | Posting ke Instagram | post yang `lolos` | `post.permalink` di post.json |

`<tgl>` = tanggal hari itu di WIB, format `YYYY-MM-DD`.

```
backlog.md ──► Kompas ──brief──► Pena ──draf+notes──► Lup ──review──► Pena ──final──► Merpati ──► content/stories/ ──push main──► Vercel
                 ▲                                         │ TOLAK                                     │ lolos lebih dari kuota
                 └──────────── ide yang ditolak/ditunda ◄──┘                                           └──► reserve/
```

## Instagram
Rotasi: artikel pertama hari itu → carousel (Kanvas), artikel kedua → Reels (Layar); kalau cuma satu artikel, tanggal ganjil carousel dan genap Reels. Media disimpan di `social/` dan disajikan Vercel di `/social/...` supaya API Instagram bisa mengambilnya. Workflow: `.github/workflows/social-fetch.yml` (unduh ekspor Canva + potong ke 4:5), `instagram-post.yml` (posting jam 19.00), `instagram-token-refresh.yml` (perpanjang token tiap tanggal 1 & 15). Mode di `config.json` → `social.mode` (`auto` atau `review`: kalau review, post butuh `review.approved_by_human: true`).

## Kasih ide dari luar (inbox)
Tulis ide di `pipeline/inbox.md` bagian "Antrean" (lewat GitHub di HP, atau minta Claude di chat: "tambahin ide ke inbox Curioverse: ..."). Kompas memprosesnya malam itu juga, dan hari itu kuota terbit naik sampai 3 artikel. Topik harian lainnya bebas, kategori bisa bertambah lewat `content/categories.json`.

## Dua mode (`config.json` → `"mode"`)
- **`auto`**: Merpati langsung push ke `main`, Vercel deploy sendiri. Pengamannya berlapis: rubrik ketat Lup, cek ulang must-fix oleh Merpati, lalu quality gate `scripts/validate.mjs` yang bikin build gagal kalau ada artikel melanggar aturan (web live tetap versi terakhir yang aman).
- **`review`**: Merpati push ke branch `terbit/<tgl>`. Vercel otomatis bikin preview URL. Kamu buka preview-nya, kalau oke tinggal merge ke `main` di GitHub.

Ganti mode cukup edit satu baris di `config.json` dan push.

## Protokol setiap sesi (wajib untuk semua agent)
1. Repo: `afreshialaff/curioverse`. Kalau belum ada di sesi, attach dulu, lalu `git clone --depth 1` dan `git pull --rebase origin main` sebelum mulai.
2. Tanggal: `TZ=Asia/Jakarta date +%F`. Pakai itu sebagai `<tgl>`.
3. Baca `pipeline/RULES.md` dan file peranmu di `pipeline/agents/`. **Jangan** baca file lain di luar daftar "Baca" peranmu kecuali perlu (hemat token).
4. Kerjakan tugas. Validasi JSON pakai `node scripts/validate.mjs <file>`.
5. Commit hanya file yang jadi tanggung jawabmu, pesan commit `pipeline(<agent>): <tgl> <ringkasan>`, lalu `git pull --rebase origin main && git push origin main`. Kalau push ditolak, ulangi pull-rebase sekali lagi.
6. Push yang cuma mengubah `pipeline/` (dibanding deploy terakhir) nggak memicu deploy (lihat `ignoreCommand` di `vercel.json`), jadi aman.
7. Tutup dengan ringkasan 3–5 baris: apa yang dikerjakan, apa yang macet, apa yang perlu manusia lihat.

## Kalau ada yang macet
- Langkah sebelumnya nggak menghasilkan file: agent berikutnya pakai jalur cadangan yang ditulis di file perannya (misal Pena ambil ide dari `backlog.md` kalau `brief.md` nggak ada), dan mencatatnya di `log.md`.
- Jangan pernah melewati Lup. Artikel yang belum pernah direview **nggak boleh** diterbitkan, sekalipun kuota belum terpenuhi. Pakai `reserve/`.

## Isi folder
```
pipeline/
  README.md          alur ini
  RULES.md           aturan redaksi + rubrik (dibaca semua agent)
  config.json        mode, kuota, aturan variasi topik
  inbox.md           ide dari pemilik web (didahulukan)
  agents/            kompas.md, pena.md, lup.md, merpati.md, kanvas.md, layar.md, corong.md
  skills/            social-copy.md (standar carousel, Reels, caption)
  templates/         story.json, review.md
  backlog.md         bank ide (dikelola Kompas)
  log.md             satu baris per hari (ditulis Merpati)
  reserve/           artikel cadangan yang sudah lolos review
  runs/<tgl>/        brief.md, drafts/, notes/, review/, final/, publish.md
```
