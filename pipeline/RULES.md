# Aturan Redaksi Curioverse

Kitab bersama untuk Kompas, Pena, Lup, dan Merpati. Kalau ada yang bertentangan dengan file peran masing-masing, **file ini yang menang**. Sebagian aturan dicek otomatis oleh `node scripts/validate.mjs` (ditandai 🤖); kalau gagal di situ, build Vercel juga gagal, jadi artikel nggak akan pernah tayang.

## 1. Janji ke pembaca
- **Akurat dan bisa dicek.** Setiap klaim fakta (angka, tanggal, nama, kutipan, sebab-akibat) harus punya sumber yang bisa dibuka siapa pun. Kalau nggak ketemu sumbernya, klaimnya dibuang, bukan dikira-kira.
- **Daging, bukan kulit.** Pembaca harus pulang bawa sesuatu yang dia belum tahu: angka spesifik, mekanisme "kok bisa", plot twist yang didukung sumber, atau koreksi mitos populer. Paragraf yang isinya cuma basa-basi dihapus.
- **Jujur soal batas.** Bedakan fakta, interpretasi, dan opini (label `kind`). Kalau sejarawan masih debat, bilang masih debat.
- **Nggak pernah mengarang.** Dilarang: kutipan rekaan, angka perkiraan tanpa sumber, berita yang belum terjadi, harga saham/kurs live, "katanya" tanpa atribusi.

## 2. Sumber 🤖
- Minimal **5 sumber berlink `https://`** per artikel, dari minimal **3 situs berbeda**. Link dobel nggak dihitung.
- Wikipedia boleh, tapi maksimal setengah dari daftar sumber. Utamakan sumber primer dan lembaga: jurnal/DOI, situs resmi (NASA, NobelPrize.org, BI, OJK, IDX, BPS, SEC, FBI), arsip museum/perpustakaan, Britannica, media kredibel (Reuters, AP, BBC, Kompas, Tempo, The Guardian, NYT), Smithsonian, History.com hanya sebagai pelengkap.
- Setiap link **harus benar-benar dibuka** (WebFetch) dan isinya **mendukung** klaim yang ditempelkan ke situ. Halaman 404, paywall total, halaman beranda generik, atau hasil pencarian = bukan sumber.
- Judul sumber (`t`) ditulis jelas: `Penerbit/Situs: Judul halaman`. Contoh: `NobelPrize.org: Marie Curie, Facts`.
- Dilarang: blog anonim, konten AI, forum, situs clickbait, video tanpa transkrip, situs judi/pinjol.

## 3. Struktur artikel 🤖
Format file: satu JSON per artikel (lihat `pipeline/templates/story.json`).
- `id`: huruf kecil-strip, unik, deskriptif (`victor-lustig`, bukan `artikel1`).
- `cat`: `finance | science | sejarah | biografi | market | saham | global | scam`. `also` opsional untuk kategori kedua.
- `title` ≤ 95 karakter, `dek` ≤ 240 karakter, `hook` ≤ 170 karakter (satu fakta mengejutkan yang bisa dicek, tampil acak di beranda).
- Minimal **4 bagian** (`sections`) dan **700 kata**. Target ideal 900–1.400 kata. Lebih panjang boleh kalau tetap padat.
- Bagian yang isinya analisis diberi `"kind":"interpretasi"`, pendapat kita diberi `"kind":"opini"`. Default fakta.
- Alur yang disarankan: **hook** (kenapa harus peduli) → **konteks** → **inti/mekanisme** (bagian paling daging) → **plot twist / mitos vs fakta** → **so what** (relevansi buat pembaca hari ini).

## 4. Suara
- Bahasa Indonesia santai campur Inggris secukupnya, register Gen Z yang hangat: "jujurly", "plot twist", "bestie" boleh, tapi maksimal 2–3 slang per artikel. Isi tetap serius.
- Kalimat pendek, satu ide per kalimat. Paragraf 2–5 kalimat.
- Angka besar dikasih pembanding ("setara 4.800 km, kira-kira Jakarta ke Tokyo").
- Hindari: em dash berlebihan, kalimat motivasi kosong, "di era digital ini", "tidak bisa dipungkiri", "mari kita", pembuka "Pernahkah kamu…" berturut-turut di banyak artikel.

## 5. Topik sensitif
- **Finance/market/saham**: build otomatis menambah catatan "bukan saran investasi". Tetap dilarang menyuruh beli/jual aset tertentu, menjanjikan return, atau menyebut harga terkini.
- **Scam Files**: fokus ke *psikologi* dan *red flag* yang bikin orang ketipu, plus apa akibat hukumnya. **Dilarang** menulis langkah teknis yang bisa ditiru (skrip penipuan, cara memalsukan dokumen, cara mencuci uang). Setiap artikel scam wajib punya bagian "Red flag yang bisa kamu pakai hari ini".
- **Orang yang masih hidup / kasus hukum**: pakai kata yang tepat sesuai status (diduga, didakwa, divonis, dibebaskan). Wajib sumber dari dokumen pengadilan atau media kredibel. Nggak boleh ada tuduhan baru dari kita.
- **Global news**: hanya peristiwa yang sudah terjadi dan tercatat di minimal 2 media kredibel. Sebutkan tanggal kejadian. Hindari framing partisan; sajikan posisi pihak-pihak secara adil.
- Nggak ada konten kekerasan grafis, kebencian, atau info yang membahayakan.

## 6. Rubrik Lup (skor 1–5)
| Aspek | Yang dicek |
|---|---|
| Akurasi | Semua klaim cocok dengan sumber. Satu klaim salah = skor maksimal 2 |
| Sumber | ≥5 link hidup, relevan, kredibel, beragam |
| Daging | Ada minimal 3 "eh baru tau" yang spesifik dan bersumber |
| Alur & hook | Pembuka bikin penasaran, transisi enak, penutup ada "so what" |
| Suara | Sesuai bagian 4, nggak lebay, nggak kaku |
| Keamanan | Sesuai bagian 5 |

**Keputusan:**
- `TERBIT`: Akurasi 5, Sumber 5, aspek lain ≥4.
- `REVISI`: ada masalah yang bisa dibenerin Pena dalam satu putaran. Tulis daftar *must-fix* bernomor.
- `TOLAK`: fakta inti salah/nggak bisa diverifikasi, sumber nggak cukup, atau topik melanggar bagian 5.

## 7. Kuota harian
Diatur di `pipeline/config.json`: minimal 1, maksimal `max_per_day`. Kalau hari itu nggak ada yang lolos, Merpati menerbitkan satu artikel dari `pipeline/reserve/` (cadangan yang sudah lolos review). Kualitas > kuantitas: lebih baik terbit 1 yang mantap daripada 3 yang setengah matang.
