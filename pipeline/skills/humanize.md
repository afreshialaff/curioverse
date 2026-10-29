# Skill: Humanize (audit angka, bukan rasa)

Dipakai **Sora** saat audit/revisi, sebagai pelengkap `bahasa.md` dan `narasi-artikel.md` — bukan pengganti. Diadaptasi dari skill open-source [`humanize`](https://github.com/harshaneel/humanize) (Harshaneel Gokhale, MIT License), disaring ulang untuk konteks artikel Indonesia Curioverse: yang dipakai cuma bagian yang bahasa-agnostik (ritme kalimat, kekonkretan, struktur retoris), bukan daftar kata bahasa Inggris yang nggak relevan di sini.

Prinsip intinya: **"kedengeran mesin" itu kebanyakan bukan soal kosakata, tapi soal ritme dan bentuk**. Model yang nulis draf adalah model yang paling buta sama pola tulisannya sendiri — jadi cek ini pakai hitungan tertulis, bukan "kerasanya udah oke pas dibaca".

## 1. Audit angka buat ritme kalimat (baru, nggak ada di bahasa.md)

Untuk tiap bagian (atau tiap dek/hook), tulis jumlah kata tiap kalimat berurutan, literal, bukan dari ingatan: `9, 5, 22, 16, 7...`. Lalu cek:
- Selisih kalimat terpanjang dan terpendek dalam satu bagian **≥ 15 kata**. Kalau nggak ada kalimat pendek (≤6 kata) ATAU nggak ada yang cukup panjang (≥20 kata) dalam satu bagian, bagian itu rawan terasa rata/seragam — tulis satu kalimat pendek **tapi tetap kalimat utuh** (ada subjek-predikat, bukan potongan tanpa predikat), atau gabung dua kalimat sedang jadi satu yang lebih panjang.
- Nggak boleh lebih dari 3 kalimat berurutan yang selisih panjangnya di bawah 5 kata. Itu tandanya ritmenya datar.
- Satu "bacaan mental terasa variatif" itu nggak bisa dipercaya — modelnya sendiri yang nulis, jadi selalu kedengeran oke buat dia. Hitungan tertulis yang jadi acuan.

Ini pelengkap aturan "kalimat pendek, maksimal 15 kata" di `bahasa.md` bagian 4: bukan cuma pendek, tapi **variatif** — campuran pendek dan sedang-panjang, bukan semuanya pendek-seragam juga.

## 2. Closer dan opener yang keliatan rapi tapi kosong

Ini yang bikin dek/keterangan di bawah judul kerasa "AI slop" walau kalimatnya sendiri nggak salah grammar:

| Pola | Kenapa bermasalah | Gantinya |
|---|---|---|
| **Mini-aphorisme penutup**: kalimat terakhir bagian/dek berupa "pelajaran" 4-10 kata yang kedengeran bijak tapi lepas dari isi di atasnya | Kesannya nyimpulin, padahal nggak nyambung konkret ke kalimat sebelumnya | Akhiri di detail konkret, pertanyaan yang belum kejawab, atau langkah nyata |
| **Opener tesis-dulu**: mulai dari kesimpulan abstrak ("Ini cara kerja otak di baliknya...") sebelum pembaca tau kejadian konkretnya | Pembaca belum punya gambaran, jadi kesimpulannya ngambang | Mulai dari kejadian/angka konkret, baru kesimpulannya nyusul |
| **Parallel-subject mirror**: dua kalimat berurutan buka dengan pola subjek yang sama ("Ini cara kerja X... Ini cara pakai Y...") | Rapi tapi berasa template, bukan ngobrol | Ganti satu subjeknya, atau gabung jadi satu kalimat |
| **Pivot "ternyata"**: nunda fakta buat efek reveal | Kalau dipakai berulang antar-artikel, polanya ketebak | Sebut faktanya langsung |

Contoh nyata yang kena ini (dek lama sebelum revisi): *"Ini cara kerja otak di baliknya, dan cara pakai Occam's razor tanpa merendahkan keyakinan."* — dua klausa mirip bentuk ("cara kerja... dan cara pakai..."), nggak ada angka/kejadian konkret yang dipegang pembaca, jadi ngambang. Revisinya mulai dari kejadian konkret (tengah malam, badan kaku, ada sosok) baru masuk ke Occam's razor.

## 3. Checklist sebelum commit (jalankan di setiap dek, hook, dan paragraf pembuka bagian)

- [ ] Tulis jumlah kata tiap kalimat berurutan. Ada variasi (lihat bagian 1)?
- [ ] Kalimat pertama dek/bagian: ada angka, nama, tempat, atau kejadian konkret — bukan ringkasan abstrak?
- [ ] Kalimat terakhir: nyambung konkret ke kalimat sebelumnya, bukan "pelajaran" yang bisa ditempel ke artikel lain (tes tukar-topik di `bahasa.md` bagian 1 berlaku di sini juga)?
- [ ] Dua kalimat berurutan nggak buka dengan bentuk/struktur yang sama persis?
- [ ] Em dash, titik dua di tengah kalimat buat "reveal", dan pola yang udah dilarang `bahasa.md` bagian 2 sudah dicek ulang (bukan dari ingatan — scan literal teksnya)?

## Batas
Skill ini nggak menambah atau mengubah larangan konten `bahasa.md`/`narasi-artikel.md`/RULES.md — kalau ada yang kelihatan bentrok, dua file itu yang menang. Skill ini juga nggak mengarang fakta baru untuk "nambah kekonkretan": kalau kalimatnya abstrak karena faktanya memang nggak ada angkanya, biarkan abstrak dan jangan diisi dengan contoh karangan (lihat `bahasa.md` bagian 3: kalau angkanya nggak ada, jangan mengarang).

**Peringatan penting (pelajaran dari revisi yang gagal 2026-10-29):** skill sumbernya ditulis buat bahasa Inggris, dan sebagian teknik di sana (fragmen pendek beruntun, titik dua di tengah kalimat buat "reveal") itu sendiri contoh pola yang di bahasa Indonesia malah kedengeran kaku/terjemahan-paksa, bukan ngobrol — dan beberapa di antaranya malah persis yang dilarang `bahasa.md` bagian 2 ("fragmen dramatis beruntun"). **SPOK Indonesia yang wajar menang di atas "burstiness" ala Inggris.** Variasi ritme (bagian 1 di atas) dicapai dengan kalimat pendek-utuh dan kalimat sedang-panjang yang **masing-masing tetap kalimat lengkap** (ada subjek-predikat yang jelas), bukan dengan memecah satu kalimat jadi serpihan tanpa predikat lalu ditutup titik dua. Kalau hasil revisimu kedengeran seperti terjemahan Google Translate dari gaya listicle Inggris, itu tandanya kebablasan — baca keras pakai telinga orang Indonesia, bukan pola di skill ini.

Sumber & lisensi: diadaptasi (bukan disalin mentah) dari github.com/harshaneel/humanize, MIT License, Copyright (c) 2026 Harshaneel Gokhale.
