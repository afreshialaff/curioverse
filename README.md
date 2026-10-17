# Curioverse

A curious mind lives here. Rak pengetahuan pribadi **AfreshiaLa & LeoFa**: finance, science, sejarah, biografi, market, saham, dan global news.

Live: https://curioverse-beta.vercel.app

## Struktur
```
content/stories.mjs   semua cerita, topik, reading paths, sumber, label Fakta/Interpretasi/Opini
scripts/build.mjs     generator halaman statis (tanpa dependency) -> dist/
src/styles.css        design tokens + komponen (buttons, cards, chips, search, dll.)
src/app.js            semua halaman: tema, menu, search (Ctrl/Cmd K), Surprise Me, reveal
src/home.js           headline + orrery three.js (lazy, hanya tablet/desktop)
src/explore.js        filter topik, cari, urutkan (state di URL: ?topik=&q=&urut=)
src/lab.js            simulasi bunga majemuk, candlestick, delay cahaya
src/story.js          progress bar baca
assets/vendor/        three.js r128 (MIT)
```

Halaman yang dihasilkan: `/`, `/explore`, `/lab`, `/reading-paths`, `/stories/<id>`, `404`, plus `sitemap.xml` dan `robots.txt`.

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
