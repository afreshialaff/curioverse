# Curioverse

A curious mind lives here. Rak pengetahuan pribadi **AfreshiaLa & LeoFa**: finance, science, sejarah, biografi, market, saham, dan global news dalam bahasa yang nggak bikin ngantuk.

## Isi
- `index.html`: seluruh website (HTML + CSS + JS dalam satu file). three.js dimuat dari cdnjs, font dari Google Fonts.
- `favicon.svg`: monogram C.
- `vercel.json`: konfigurasi hosting statis di Vercel (tanpa build step).
- `tokens.css`: design tokens (warna, tipografi, spacing) dari brand guide.
- `PRODUCT.md`: konteks produk untuk skill desain.

## Jalanin lokal
Buka `index.html` langsung di browser, atau:

```bash
npx serve .
```

## Deploy
Import repo ini di Vercel (Framework Preset: **Other**, tanpa build command, output directory `.`). Setiap push ke `main` otomatis deploy ulang.

## Nambah cerita
Artikel ada di array `A` di dalam `index.html` (cari `/* ================= DATA`). Tiap artikel punya `id`, `cat`, `date`, `title`, `dek`, `tags`, dan `s` (daftar bagian `[judul, [paragraf...]]`).
