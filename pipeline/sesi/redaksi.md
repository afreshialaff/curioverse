# 📰 Run Redaksi (05.07, cadangan 10.07 WIB)

Satu run dari riset sampai artikel terbit. Peran: 🧭 Kompas → ✒️ Pena draf → 🔎 Lup (subagen) → ✒️ Pena revisi → 🪶 Utas (sekali, di naskah final) → 🕊️ Merpati.

## 0. Persiapan
- `<tgl>` = `TZ=Asia/Jakarta date +%F`. Hari Minggu: berhenti, "libur".
- Baca sekali di awal: `pipeline/sesi/README.md`, `pipeline/README.md` (bagian Protokol), `pipeline/RULES.md`, `pipeline/config.json`, `pipeline/skills/bahasa.md`, `pipeline/skills/narasi-artikel.md`, `pipeline/rapat/referensi.md` (3 entri teratas).
- **Cek titik lanjut** (mulai dari tahap pertama yang belum ada):
  | Sudah ada | Artinya | Mulai dari |
  |---|---|---|
  | baris `<tgl> · terbit:` di `log.md` | selesai | berhenti, satu baris "artikel <tgl> sudah terbit" |
  | `runs/<tgl>/final/` berisi + `notes/utas-final-<id>.md` | tinggal terbit | Tahap 6 |
  | `runs/<tgl>/final/` berisi | | Tahap 5 |
  | `runs/<tgl>/review/` berisi | | Tahap 4 |
  | `runs/<tgl>/drafts/` berisi | | Tahap 3 |
  | `runs/<tgl>/brief.md` | | Tahap 2 |
  | tidak ada | | Tahap 1 |

## Tahap 1 · Kompas (brief)
Ikuti `pipeline/agents/kompas.md` bagian Tugas dan format brief. Baca juga `inbox.md`, `backlog.md`, 7 baris terakhir `log.md`. Kalau `reserve/` berisi ≥2 artikel, tetap tulis brief singkat 1 ide (kuota tetap 1 terbit; Merpati yang memilih). Commit `brief.md`, `backlog.md`, `inbox.md`.

## Tahap 2 · Pena draf
Ikuti `pipeline/agents/pena.md` bagian "Sesi draf". Setiap draf lolos `node scripts/validate.mjs <file>`. Commit `drafts/` dan `notes/`.

## Tahap 3 · Lup review (SUBAGEN)
Panggil tool `Agent` (subagent_type `general-purpose`) dengan brief ini, isi `<tgl>` dan daftar id. **Jangan tambahkan pendapatmu tentang draf.**

> Kamu 🔎 Lup, reviewer dan cek fakta paling galak di redaksi Curioverse. Repo sudah ada di `/home/claude/curioverse` (atau path clone saat ini). Tanggal <tgl>. Baca `pipeline/RULES.md`, `pipeline/templates/review.md`, dan `pipeline/agents/lup.md` (abaikan bagian fire_trigger dan jadwal). Review setiap draf di `pipeline/runs/<tgl>/drafts/` dan artikel di `pipeline/reserve/` yang belum punya review: buka SETIAP link sumber dengan WebFetch, cocokkan setiap klaim dengan peta klaim di `notes/`, beri skor rubrik RULES bagian 6 dan keputusan TERBIT/REVISI/TOLAK dengan must-fix bernomor. Kalau ragu, jangan loloskan. Tulis `pipeline/runs/<tgl>/review/<id>.md`. Jangan mengubah draf. Jangan commit. Balas dengan daftar: id → keputusan → jumlah must-fix.

Setelah subagen selesai: cek file review ada, commit `review/` dengan pesan `pipeline(lup): <tgl> review`.

## Tahap 4 · Pena revisi
Ikuti `pipeline/agents/pena.md` bagian "Sesi revisi" untuk setiap review TERBIT/REVISI: kerjakan semua must-fix, tulis `final/<id>.json`, tambahkan "Jawaban Pena" di file review. TOLAK → tidak direvisi. Validasi, commit.
- **Putaran kedua (opsional, maks 1 kali):** kalau ada must-fix soal fakta, panggil lagi subagen Lup dengan brief yang sama tetapi hanya untuk `final/<id>.json` dan "Jawaban Pena". Kalau subagen masih menolak, artikel itu tidak terbit hari ini (masuk `reserve/` dengan catatan).

## Tahap 5 · Utas (sunting final, satu-satunya putaran Utas)
Ikuti `pipeline/agents/utas.md` "Aturan penyuntingan" dan "Sesi 12.30" pada `final/`. Bahasa saja, tidak mengubah klaim/angka/nama/kutipan/sumber. Catatan di `notes/utas-final-<id>.md` catatan di `notes/utas-final-<id>.md` (penanda tahap ini selesai). Dugaan salah fakta tidak diubah; tulis "⚠ UNTUK LUP" di notes dan **jangan terbitkan artikel itu** sampai dicek ulang subagen Lup (maks 1 kali). Validasi, commit.

## Tahap 6 · Merpati (terbit)
Ikuti `pipeline/agents/merpati.md` bagian Tugas persis: kandidat, FIFO reserve, tepat satu artikel, `node scripts/build.mjs` harus sukses, mode sesuai `config.json`, tulis `publish.md`, baris `log.md`, inbox. Tunggu ±3 menit lalu WebFetch halaman artikel.

## Selesai
Ringkasan 3–5 baris: judul + link yang terbit, yang ditahan/masuk reserve dan alasannya, keputusan Lup per artikel, kendala. Kalau tidak ada yang terbit, baris pertama "⚠ PERLU MANUSIA".
