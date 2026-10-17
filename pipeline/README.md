# Dapur Redaksi Curioverse 🧭✒️🔎🕊️

Empat agent yang tiap hari bikin satu sampai beberapa artikel baru, lalu menerbitkannya ke curioverse-beta.vercel.app. Mereka nggak ngobrol langsung; mereka saling titip kerjaan lewat folder ini di repo, jadi tiap sesi cuma membaca file yang dia butuh (hemat token) dan semua jejak kerja tersimpan di git.

## Jadwal harian (WIB)
| Jam | Agent | Peran | Baca | Tulis |
|---|---|---|---|---|
| 00.00 | 🧭 **Kompas** | Content planner + riset awal | `backlog.md`, `log.md`, daftar artikel di web | `runs/<tgl>/brief.md`, update `backlog.md` |
| 05.00 | ✒️ **Pena** | Copywriter, draf pertama | `brief.md` | `runs/<tgl>/drafts/<id>.json` + `notes/<id>.md` |
| 09.00 | 🔎 **Lup** | Reviewer + cek fakta, buka semua link | draf + notes | `runs/<tgl>/review/<id>.md` |
| 12.00 | ✒️ **Pena** | Revisi berdasarkan review | draf + review | `runs/<tgl>/final/<id>.json` |
| 15.00 | 🕊️ **Merpati** | Publisher | final + review | `content/stories/<id>.json`, `log.md` |

`<tgl>` = tanggal hari itu di WIB, format `YYYY-MM-DD`.

```
backlog.md ──► Kompas ──brief──► Pena ──draf+notes──► Lup ──review──► Pena ──final──► Merpati ──► content/stories/ ──push main──► Vercel
                 ▲                                         │ TOLAK                                     │ lolos lebih dari kuota
                 └──────────── ide yang ditolak/ditunda ◄──┘                                           └──► reserve/
```

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
6. Commit yang cuma mengubah `pipeline/` nggak memicu deploy (lihat `ignoreCommand` di `vercel.json`), jadi aman.
7. Tutup dengan ringkasan 3–5 baris: apa yang dikerjakan, apa yang macet, apa yang perlu manusia lihat.

## Kalau ada yang macet
- Langkah sebelumnya nggak menghasilkan file: agent berikutnya pakai jalur cadangan yang ditulis di file perannya (misal Pena ambil ide dari `backlog.md` kalau `brief.md` nggak ada), dan mencatatnya di `log.md`.
- Jangan pernah melewati Lup. Artikel yang belum pernah direview **nggak boleh** diterbitkan, sekalipun kuota belum terpenuhi. Pakai `reserve/`.

## Isi folder
```
pipeline/
  README.md          alur ini
  RULES.md           aturan redaksi + rubrik (dibaca semua agent)
  config.json        mode, kuota, niche per hari
  agents/            kompas.md, pena.md, lup.md, merpati.md
  templates/         story.json, review.md
  backlog.md         bank ide (dikelola Kompas)
  log.md             satu baris per hari (ditulis Merpati)
  reserve/           artikel cadangan yang sudah lolos review
  runs/<tgl>/        brief.md, drafts/, notes/, review/, final/, publish.md
```
