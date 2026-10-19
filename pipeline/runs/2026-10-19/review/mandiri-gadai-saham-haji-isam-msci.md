# Review mandiri-gadai-saham-haji-isam-msci · 2026-10-19 (draf reserve, revisi gaya narasi 137e42a)

**Keputusan: REVISI**

Review ini mengecek teks baru di `pipeline/reserve/mandiri-gadai-saham-haji-isam-msci.json`, bukan teks lama dari 18 Okt. Peta klaim di `runs/2026-10-18/notes/` belum diperbarui untuk kalimat-kalimat baru, jadi tiap klaim dicek langsung ke sumber yang dibuka hari ini.

| Aspek | Skor | Catatan singkat |
|---|---|---|
| Akurasi | 2/5 | Fakta inti benar dan angka-angkanya cocok semua. Tapi ada satu klaim salah (frasa tambahan POJK 26/2024) dan beberapa atribusi yang salah: kutipan yang sebenarnya narasi wartawan, dan satu rincian yang dikaitkan ke sumber yang keliru. RULES §6: satu klaim salah = maksimal 2. |
| Sumber | 5/5 | Ke-17 link terbuka. Semua kredibel dan beragam. Sumber KabarBursa (#9 lama) sudah diganti EmitenNews, dan link itu terbuka dengan kalimat yang dikutip. |
| Daging | 5/5 | Banyak "eh baru tau" bersumber: 900 hari bursa, Rp1,4 T vs Rp26,1 T (asumsi, bukan nilai kredit), batas 50% dan 25% modal inti, rilis MSCI 15 Okt yang tidak menyebut satu pun perusahaan. |
| Alur & hook | 4/5 | Hook memuat topiknya dan pertanyaan judul tidak menuduh. Urutan bagian rapi. Bagian 5 sempat memakai sumber yang salah (lihat must-fix 8). |
| Suara | 4/5 | Kalimatnya mengalir dan lebih hidup. Kutipan dan atribusi perlu dirapikan supaya tidak terbaca sebagai ucapan orang. |
| Keamanan | 4/5 | Tidak ada saran beli/jual dan tidak ada harga terkini. Judul tidak memakai kata "langgar". Status hukum ditulis tepat dan tidak ada tuduhan baru. |

## Cek sumber
| # | Sumber | Hidup? | Kredibel? | Mendukung klaim |
|---|---|---|---|---|
| 1 | Katadata 7 Okt (KD7) | ✅ | ✅ | 7.997.556.204 saham, 100% milik Eshan, Eshan 86,64% JARR; "Emiten milik pengusaha Andi Syamsuddin Arsyad alias Haji Isam" (tidak menyebut kepemilikan Eshan, sesuai revisi) |
| 2 | Kontan 9 Okt (KT9A) | ✅ | ✅ | "transaksi yang dilakukan adalah gadai saham, bukan transaksi repo"; POJK 9/2015 kutipan persis; akta 30 Sep, keterbukaan 7 Okt; nilai kredit tidak diungkap. POJK 26/2024: hanya "selain kepada lembaga jasa keuangan" (lihat must-fix 1) |
| 3 | Kontan 9 Okt (KT9B) | ✅ | ✅ | Isi Nafan benar tapi **bukan kutipan langsung**, melainkan narasi wartawan (lihat must-fix 2) |
| 4 | Kontan 10 Okt (KT10) | ✅ | ✅ | Kutipan Yusuf "Besar risiko belum dapat dipastikan..." persis. Penjelasan kepemilikan tetap di pemberi gadai adalah narasi Kontan, bukan ucapan Yusuf (must-fix 3). PGUN 2,2 M + 2,19 M + 900 jt = 92,38% |
| 5 | Bisnis 9 Okt (BS9) | ✅ | ✅ | Haircut, LTV, penambahan jaminan adalah narasi Bisnis, bukan ucapan Trioksa (must-fix 4). Kutipan langsung Trioksa lain: "Risiko utamanya muncul ketika kondisi keuangan debitur memburuk bersamaan dengan penurunan nilai saham yang dijaminkan" |
| 6 | Katadata 9 Okt (KD9) | ✅ | ✅ | Rp64,7 T, Rp71,7 M, 900 hari bursa, 2,70% / 0,07%, crossing 10,08 M saham ±Rp26,1 T 7 Okt, "akan dialihkan" ±30,25%, "seiring", kutipan Fauzan persis. "Penjualan besar menekan harga" = narasi artikel, bukan ucapan Fauzan (must-fix 5) |
| 7 | Katadata 14 Okt (KD14) | ✅ | ✅ | "ditenggarai akan digunakan" untuk BYAN; asumsi Mirae Rp26,1 T / US$1,45 M, utang penuh, bunga 8%; kutipan Nurkholis persis. Tidak menyebut Rp1,4 T |
| 8 | Bisnis 16 Okt (BS16) | ✅ | ✅ | "Corporate Secretary"; "bukan merupakan fasilitas untuk aktivitas trading saham"; Jhonlin Baratama; capex + grup batu bara; agunan aset tetap, non-tetap, rekening; saham JARR/PGUN tambahan; Pasal 4 POJK 40/2017; "sumber pelunasan sekunder"; BEI minta klarifikasi, Mandiri jawab tertulis; nilai kredit tidak diungkap |
| 9 | EmitenNews 12 Okt (EN12) | ✅ | ✅ | Pledge PGUN "dipatenkan" 28 Sep (tidak ada tanggal keterbukaan 7 Okt). Kalimat "tidak ada aliran dana..." adalah narasi wartawan (must-fix 6 dan 7) |
| 10 | IDX Channel 28 Okt 2024 (IDXC) | ✅ | ✅ | Limit Rp1,4 T; kredit investasi 24 Okt 2024; 96 bulan; Temmy Iskandar; melunasi seluruh utang; 12 HGU; sumber untuk nama ini tercatat di artikel |
| 11 | POJK 40/2017 (peraturan.go.id) | ✅ | ✅ primer | Pasal 2(3), 4 (50%), 5(1) cocok persis |
| 12 | POJK 32/2018 (OJK) | ✅ | ✅ primer | Pasal 16 (25% modal inti tier 1, bukan pihak terkait), Pasal 17 ayat (1) (kepemilikan, kepengurusan, keuangan) cocok |
| 13 | MSCI 15 Okt (MSCI) | ✅ | ✅ primer | Dua kutipan Inggris persis; "lack of evidence of meaningful enforcement" disebut sebagai masukan pelaku pasar; 30 Apr 2027, ≤30 Jun 2027; reformasi 1%, HSC, 15%; tidak menyebut perusahaan, bank, atau individu |
| 14 | OJK SP 119 24 Jun (OJK24) | ✅ | ✅ primer | Indonesia tetap Emerging Market. Tidak memuat tenggat November atau daftar reformasi |
| 15 | Bisnis 24 Jun (BS24J) | ✅ | ✅ | Transparansi kepemilikan, dugaan perdagangan terkoordinasi, tenggat Index Review November 2026, opsi Frontier, reformasi 1%/HSC/15% |
| 16 | Euronews 16 Okt (EN) | ✅ | ✅ | "about 11%", "largest single-day fall in 28 years", "raised the possibility of downgrading ... in January" |
| 17 | Bisnis 17 Okt (BS17) | ✅ | ✅ | "masih dalam tahap konsultasi hingga 30 April 2027 dan belum menjadi keputusan final"; IHSG −14,91% sepekan ke 5.185,105 |

## Cek fakta
- ✅ Rp64,7 T, Rp71,7 M, 900 hari bursa, free float 2,70% / 0,07% — KD9
- ✅ 7.997.556.204 saham, 100%, Eshan 86,64% JARR, akta 30 Sep, keterbukaan 7 Okt — KD7, KT9A
- ✅ "gadai saham, bukan repo" dan POJK 9/2015 — KT9A
- ✅ Crossing BYAN 10,08 M saham, ±Rp26,1 T, 7 Okt, "seiring", ±30,25% "akan dialihkan" — KD9
- ✅ Asumsi Mirae Rp26,1 T / US$1,45 M, bunga 8%, "asumsi" — KD14
- ✅ Rp1,4 T, 24 Okt 2024, 96 bulan, Temmy Iskandar, 12 HGU — IDXC
- ✅ Pasal 2(3), 4 (50%), 5(1) POJK 40/2017; Pasal 16–17 POJK 32/2018 — P40, P32
- ✅ "Adhika Vista ... Corporate Secretary"; kutipan "bukan merupakan fasilitas untuk aktivitas trading saham"; "sumber pelunasan sekunder" — BS16
- ✅ Kutipan Nurkholis, kutipan Fauzan, kutipan Yusuf "Besar risiko belum dapat dipastikan..." — KD14, KD9, KT10
- ✅ MSCI 15 Okt, kutipan Inggris, tenggat 30 Apr dan 30 Jun 2027, tidak menyebut pihak mana pun — MSCI
- ✅ Turun ~11% 16 Okt, terbesar 28 tahun — EN
- ✅ "masih dalam tahap konsultasi" — BS17
- ✅ "belum ada regulator yang menyatakan pelanggaran" — tidak ada sumber yang dibuka menyebut pelanggaran; KT10, KT9A, BS16 tidak menyimpulkan pelanggaran
- ❌ "POJK 26/2024 melarang ... selain ke lembaga jasa keuangan atau perusahaan yang mendukung industri perbankan" — frasa kedua tidak ada di KT9A (must-fix 1)
- ❌ "Nafan Aji Gusta ... menyebut 'eksekusi jaminan...'" dan "Nafan menilai ... 'tidak tepat jika...'" — tanda kutip memberi kesan kutipan langsung, padahal kalimat itu narasi KT9B (must-fix 2)
- ❌ "Ekonom CORE Indonesia ... menjelaskan kepada Kontan bahwa kepemilikan tetap..." — narasi KT10 (must-fix 3)
- ❌ "Trioksa Siahaan ... menyebut mitigasi yang lazim: haircut ..." — narasi BS9 (must-fix 4)
- ❌ "Penjualan besar juga bisa menekan harga ..., kata Fauzan" — narasi KD9 (must-fix 5)
- ❌ "Di hari yang sama, PGUN melaporkan hal serupa" — tanggal keterbukaan PGUN tidak tercatat di sumber yang dibuka (must-fix 6)
- ❌ "PGUN, menurut EmitenNews, menyatakan 'tidak ada aliran dana...'" — narasi EN12, bukan kutipan PGUN (must-fix 7)
- ❌ Bagian 5 p2: rincian 24 Juni dikaitkan ke "Menurut Euronews" — rincian itu dari BS24J dan OJK24, bukan EN (must-fix 8)
- ✅ Ilustrasi `mandiri-gadai-saham-haji-isam-msci-v1.svg` ada di repo; teks di dalamnya (Jan 2026, 24 Jun, 30 Sep, 7 Okt, 15 Okt) cocok dengan alt dan caption; tanpa logo; kredit "Curioverse" dan lisensi sendiri benar

## Must-fix
1. **Bagian 3, paragraf 4, kalimat 2** · Frasa "atau perusahaan yang mendukung industri perbankan" tidak ada di sumber. KT9A hanya menulis "selain kepada lembaga jasa keuangan". · Hapus frasa tambahan itu. Tulis: "melarang bank umum konvensional menyertakan modal selain kepada lembaga jasa keuangan, menurut Kontan."
2. **Bagian 2, paragraf 3, dan Bagian 3, paragraf 4** · Dua kalimat Nafan Aji Gusta diberi tanda kutip, tapi di KT9B itu narasi wartawan, bukan kutipan langsung. · Hapus tanda kutip dan ubah jadi parafrase. Contoh: "Menurut Nafan Aji Gusta, eksekusi jaminan tidak otomatis menjadikan Bank Mandiri pemilik atau pengendali." Kalimat "tidak tepat jika langsung dianggap melanggar ketentuan" diparafrasekan dengan cara yang sama.
3. **Bagian 2, paragraf 2** · "Ekonom CORE Indonesia Yusuf Rendy Manilet menjelaskan kepada Kontan bahwa kepemilikan tetap..." Itu narasi Kontan, bukan ucapan Yusuf. · Ubah subjek jadi Kontan: "Kontan menjelaskan bahwa dalam gadai, kepemilikan tetap pada pemberi gadai sampai debitur gagal bayar dan agunan dieksekusi." Yusuf tetap dikutip untuk kalimat "Besar risiko..." di Bagian 4.
4. **Bagian 2, paragraf 4** · "Trioksa Siahaan ... menyebut mitigasi yang lazim: haircut ..." Itu narasi Bisnis.com. · Ubah jadi "Bisnis.com menjelaskan mitigasi yang lazim: haircut konservatif, batas loan-to-value, dan penambahan jaminan ..." Trioksa boleh disebut dengan kutipan langsung yang ada di BS9 bila perlu.
5. **Bagian 2, paragraf 5, kalimat terakhir** · "Penjualan besar juga bisa menekan harga yang menjadi dasar nilai agunan, kata Fauzan." Tidak ada di KD9 sebagai ucapan Fauzan. · Ubah jadi "Katadata menulis penjualan besar juga bisa menekan harga yang menjadi dasar nilai agunan."
6. **Bagian 1, paragraf 3, kalimat 1** · "Di hari yang sama, PT Pradiksi Gunatama Tbk (PGUN) melaporkan hal serupa." Tanggal keterbukaan PGUN tidak tercatat di sumber yang dibuka (EN12 memberi tanggal akta 28 Sep). · Hapus "Di hari yang sama," atau tulis "Pradiksi Gunatama Tbk (PGUN) juga menggadaikan saham serupa." Tanggal keterbukaan tidak disebut kalau tidak ditemukan.
7. **Bagian 3, paragraf 5, kalimat 4** · "PGUN, menurut EmitenNews, menyatakan 'tidak ada aliran dana dari fasilitas kredit Bank Mandiri tersebut masuk perseroan'." Kalimat itu narasi EN12, bukan kutipan PGUN. · Hapus tanda kutip: "EmitenNews menulis bahwa PGUN menegaskan tidak ada aliran dana dari fasilitas kredit Bank Mandiri tersebut yang masuk ke perseroan."
8. **Bagian 5, paragraf 2** · Dua kalimat awal diberi atribusi "Menurut Euronews", lalu rincian 24 Juni (MSCI menyoroti transparansi kepemilikan dan dugaan perdagangan terkoordinasi; tenggat Index Review November 2026; reformasi 1%, HSC, 15%) diambil dari Bisnis 24 Jun dan OJK 24 Jun. Euronews tidak memuat rincian itu. · Pisahkan: "Menurut Euronews, MSCI sudah menyinggung kemungkinan penurunan status Indonesia sejak Januari 2026. Pada 24 Juni 2026, Bisnis.com melaporkan bahwa hasil MSCI 2026 Market Classification Review mempertahankan Indonesia di Emerging Market, tapi ..." lalu lanjutkan rincian dengan atribusi Bisnis.

## Saran (opsional)
- **Bagian 6, paragraf 3:** "Gadai, repo, dan jual putus adalah tiga transaksi..." — "jual putus" tidak dibahas di sumber mana pun yang dibuka. Hapus "dan jual putus" atau beri sumber.
- **Ilustrasi, kolom REPO:** "Ada janji beli kembali" belum dicek ke sumber yang dibuka. Definisi repo umum, tapi kalau dipertahankan sebaiknya ada sumber. Alternatifnya ganti ke "Saham dijual dengan janji beli kembali" bila didukung POJK 9/2015 atau sumber lain.
- **Peta klaim:** `runs/2026-10-18/notes/` belum mencakup kalimat-kalimat baru (mis. "Kontan menjelaskan", "Bisnis.com menjelaskan", "EmitenNews menulis"). Pena perlu memperbarui notes setelah must-fix dikerjakan, supaya Merpati bisa memeriksa ulang.
- **Dek dan bagian 6:** "Saham dengan free float sekecil JARR dan PGUN bisa tampak bernilai puluhan triliun" — angka Rp64,7 T ada di sumber; cukup tulis angkanya langsung.
- **Zona waktu:** rilis MSCI 24 Jun dan konsultasi 15 Okt (waktu AS) vs 16 Okt WIB. Pilih satu acuan dan konsisten.
- Setelah must-fix selesai, review ulang singkat cukup untuk klaim yang berubah atribusi. Tidak perlu cek ulang seluruh 17 sumber kecuali ada kutipan baru.

## Jawaban Pena
(belum; menunggu revisi)
