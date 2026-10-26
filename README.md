# Curioverse

A curious mind lives here. Rak pengetahuan pribadi **AfreshiaLa & LeoFa**: finance, science, sejarah, biografi, market, saham, dan global news.

Live: https://curioverse-beta.vercel.app

## Struktur
```
content/stories.mjs   semua cerita, topik, reading paths, sumber, label Fakta/Interpretasi/Opini
scripts/build.mjs     generator halaman statis (tanpa dependency) -> dist/
src/styles.css        design tokens + komponen (buttons, cards, chips, search, dll.)
src/app.js            semua halaman: Lenis, nav + indikator, menu lingkaran, search (Ctrl/Cmd K), Surprise Me, reveal, tema
src/home.js           slide cerita bertumpuk, grafik Lab yang tumbuh saat scroll, Reading Paths horizontal ter-pin, orrery three.js (lazy, tablet/desktop)
src/explore.js        filter topik, cari, urutkan (state di URL: ?topik=&q=&urut=)
src/lab.js            permainan (Fakta atau Hoaks?, Duluan mana?) + simulasi bunga majemuk, candlestick, delay cahaya
content/lab-games.mjs soal permainan Lab; tiap soal menunjuk ke id cerita sumbernya
assets/vendor/        three.js r128 (MIT), Lenis 1.3.11 (MIT, smooth scroll)
assets/fonts/         Inter Tight, Instrument Serif, JetBrains Mono (WOFF2, SIL OFL)
```

Halaman yang dihasilkan: `/`, `/explore`, `/lab`, `/reading-paths`, `/stories/<id>`, `404`, plus `sitemap.xml`, `robots.txt`, dan `feed.xml` (RSS 20 cerita terbaru).

Kontak (email, Instagram, Threads, X) diatur di `CONTACT` di `content/stories.mjs`, lalu tampil di beranda (`/#kontak`), menu, footer, dan ajakan koreksi di tiap cerita.

## Jalanin lokal
```bash
node scripts/build.mjs
npx serve dist
```

## Deploy
Vercel membaca `vercel.json`: build `node scripts/build.mjs`, output `dist`, clean URLs. Push ke `main` = deploy otomatis.
Kalau domain berubah, set env `SITE_URL` di Vercel supaya canonical URL dan sitemap ikut benar.

## Nambah cerita
1. Tambah objek baru di array `A` di `content/stories.mjs` (`id`, `cat`, `date`, `title`, `dek`, `tags`, `s`).
2. Tambah sumbernya di `SOURCES[id]`, dan kalau ada bagian interpretasi/opini, tandai di `KINDS[id]`.
3. Kalau masuk reading path, tambahkan `id`-nya ke `HOLES`.
4. Push. Vercel build ulang sendiri.

## Bahasa visual
Tema sketchbook: jurnal rasa ingin tahu dengan kertas sobek, washi tape, catatan tulisan tangan (Caveat), fase bulan, dan band hijau bergelombang, dalam palet Curioverse (Parchment, Midnight Ink, Moss, Sepia Gold, Dusk Blue). Heading Instrument Serif, teks Inter Tight 18px. Motion dari afreshia.vercel.app tetap dipakai: Lenis, reveal mask, slide bertumpuk, track horizontal ter-pin, indikator nav, menu lingkaran. Tiap cerita tampil dengan sampulnya (gambar utama) di semua daftar; kartu sampul melebar jadi foto utama saat cerita dibuka (View Transitions, otomatis mati kalau pengguna memilih reduced motion). Hook pembuka di beranda mengambil satu fakta acak dari `HOOKS` di `content/stories.mjs`, dan tiga artikel unggulan diatur lewat `PICKS`.
