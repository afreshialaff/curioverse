# Kalender Konten — Cara Memperbarui

Halaman **Kalender Konten — Titik Penasaran & Curioverse** ada di folder ini
(`docs/kalender/index.html`, satu berkas HTML tanpa framework). Halaman itu
**tidak menyimpan data sendiri**. Setiap kali dibuka, halaman membaca berkas:

```
data/kalender/konten.json
```

dari `raw.githubusercontent.com/afreshialaff/curioverse/main/data/kalender/konten.json`.
Jadi siapa pun yang menjadwalkan konten atau memeriksa status tayang cukup
mengubah berkas JSON itu — halaman otomatis ikut berubah.

## Langkah memperbarui data

1. Ambil versi terbaru dulu: `git pull --rebase`
2. Sunting `data/kalender/konten.json` (tambah entri baru, ubah status,
   isi tautan setelah tayang, dan sebagainya).
3. Pastikan JSON tetap sah (koma, kurung kurawal, dan tanda kutip benar).
4. Commit dan push ke branch `main`.
5. Setelah push, halaman kalender menampilkan data baru secara otomatis
   begitu GitHub Pages selesai membangun ulang (biasanya beberapa menit).
   Tidak ada langkah build manual.

Data awal di `konten.json` diisi oleh Claude (Cowork) dari dashboard
Kalender Konten Titi yang lama.

## Skema satu entri

`konten.json` adalah array JSON. Satu entri bentuknya:

```json
{
  "id": "2026-11-29-rawa-pening",
  "tanggal": "2026-11-29",
  "jam": "20:00",
  "topik": "Rawa Pening dan Baru Klinting",
  "daerah": "Jawa Tengah",
  "format": "long",
  "kategori": "Katanya Begitu",
  "sudut": "Desa yang tenggelam karena sebatang lidi",
  "status": "terjadwal",
  "catatan": "Long 16:9 tayang Minggu 20.00 WIB; Short turunan sekitar 21.30 WIB",
  "yt_url": null,
  "ig_url": null,
  "threads_url": null,
  "fb_url": null,
  "ig_jangkauan": null,
  "ig_jangkauan_per": null
}
```

Penjelasan tiap field:

| Field | Isi |
| --- | --- |
| `id` | Pengenal unik, format `TANGGAL-slug`, misalnya `2026-11-29-rawa-pening`. Jangan diubah setelah dibuat. |
| `tanggal` | Tanggal tayang, format `YYYY-MM-DD`. |
| `jam` | Jam tayang WIB, format `HH:MM`, misalnya `20:00`. |
| `topik` | Judul/topik konten. |
| `daerah` | Daerah asal cerita atau topik. |
| `format` | Bentuk konten, misalnya `short` atau `long`. |
| `kategori` | Kategori/seri konten, misalnya `Katanya Begitu`. Nilai yang ada otomatis muncul di saringan kategori halaman. |
| `sudut` | Sudut pandang atau ringkasan satu kalimat. |
| `status` | Status konten (lihat nilai sah di bawah). |
| `catatan` | Catatan bebas: progres, kendala, pengingat. |
| `yt_url` | Tautan YouTube setelah tayang; `null` bila belum ada. |
| `ig_url` | Tautan Instagram setelah tayang; `null` bila belum ada. |
| `threads_url` | Tautan Threads setelah tayang; `null` bila belum ada. |
| `fb_url` | Tautan Facebook setelah tayang; `null` bila belum ada. |
| `ig_jangkauan` | Angka jangkauan Instagram bila sudah diukur; `null` bila belum. |
| `ig_jangkauan_per` | Perubahan jangkauan Instagram (persen) bila dicatat; `null` bila belum. |

## Nilai status yang sah

Status utama untuk halaman ini:

- `terjadwal` — sudah punya tanggal dan jam tayang, belum tayang.
- `tayang` — sudah tayang; tautan platform biasanya sudah diisi.

Data warisan dari dashboard lama juga memakai status `disetujui` dan
`produksi`. Halaman menampilkannya apa adanya dan saringan status dibuat
dari nilai yang benar-benar ada di data, jadi status lain tetap bisa
disaring. Kartu ringkasan di halaman menghitung khusus jumlah `tayang`,
jumlah `terjadwal`, dan total entri.

## Contoh menambah entri baru

Tambahkan satu objek baru ke dalam array di `data/kalender/konten.json`
(ikuti contoh skema di atas), lalu commit dan push ke `main`. Entri akan
muncul di kalender bulanan pada tanggalnya, di daftar konten, dan bisa
diklik untuk melihat rinciannya.
