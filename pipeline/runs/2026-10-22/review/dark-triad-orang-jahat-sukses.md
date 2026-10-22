# Review dark-triad-orang-jahat-sukses · 2026-10-22

**Keputusan: REVISI**

| Aspek | Skor | Catatan singkat |
|---|---|---|
| Akurasi | 2/5 | Angka inti (3,9%, −0,07/−0,10, ~1% vs ~28%, 92 studi, 793 pekerja) cocok. Tapi ada klaim yang tidak didukung sumbernya (asal sampel "hampir semua studi", "paling sering dikutip", "bicara duluan") dan label "203 manajer" yang tidak presisi. |
| Sumber | 4/5 | 10 link hidup, 9 situs, Wikipedia 1/10. Tapi WDT dipakai untuk klaim yang tidak ada di halamannya; BAB lewat salinan gwern.net (⚠ mirror, isi sesuai jurnal). |
| Daging | 5/5 | Banyak "eh baru tau" bersumber: 3,9% vs ~1% populasi; komunikasi dinilai tinggi tapi kinerja rendah; ~1% vs ~28% variasi; kurva narsisme; standar ganda gender. |
| Alur & hook | 5/5 | Pembuka konkret (peristiwa + angka), transisi jelas, plot twist "naik iya, berprestasi belum tentu", penutup jawaban berbasis data. |
| Suara | 4/5 | Slang hemat ("jujurly", "plot twist"). Kalimat pendek. Sedikit padat istilah di bagian 2. |
| Keamanan | 5/5 | Eksplisit bahwa label bukan diagnosis dan alat ukur bukan untuk menghakimi. Tidak ada tuduhan ke orang nyata. |

`node scripts/validate.mjs`: ✓ lolos quality gate.

## Cek sumber
| # | Sumber | Hidup? | Kredibel? | Mendukung klaim |
|---|---|---|---|---|
| 1 | https://www2.psych.ubc.ca/%7Edpaulhus/research/SELF-ENHANCEMENT/downloads/ARTICLES/JRP.02.pdf | ✅ | ✅ | JRP 36 (2002) 556–563; UBC; 245 mahasiswa; korelasi .25–.50; agreeableness −.36/−.47/−.25; "overlapping but distinct"; "manipulative personality"; Christie memilih pernyataan dari buku Machiavelli; psikopati = impulsif, minim empati. **Tidak** menyebut "haus pengakuan" dan tidak menyatakan "dimiliki semua orang". |
| 2 | https://boris.unibe.ch/99422 | ✅ | ✅ | Spurk, Keller, Hirschi; SPPS 7(2) 113–121; 793 pekerja awal karier swasta Jerman; narsisme→gaji, Mach→jabatan & kepuasan, psikopati negatif ke semua; kontrol 6 variabel; "bright and dark sides". |
| 3 | https://www.psychologicalscience.org/news/minds-business/why-office-jerks-get-ahead.html | ✅ | ✅ | Univ. of Bern; usia 25–34; Dirty Dozen; kontrol; 10 Des 2015. |
| 4 | https://www.people.vcu.edu/~mamcdani/Publications/O'Boyle%20et%20al%20(2012%20JAP%20-%20Dark%20Triad%29.pdf | ✅ | ✅ | JAP 97(3); 245 sampel, N=43.907, 1951–2011; rc −.07 / −.03 ns / −.10; R² kinerja .011, CWB .282 (Diskusi menulis 26,7%); narsisme prediktor CWB terkuat; contoh CWB; moderator kolektivisme p<.10. |
| 5 | https://gwern.net/doc/psychology/personality/psychopathy/2010-babiak.pdf | ✅ | ⚠ mirror | 7 perusahaan AS; 203 partisipan program MD; 8 (3,9%) PCL-R ≥30 "common research threshold"; komunikasi .33, kreatif .27, strategis .30; "the higher the PCL-R scores the lower the performance appraisal ratings"; bukan team player. Abstrak: "203 corporate professionals"; rincian: 158 manajemen + 45 profesional/staf/sales. |
| 6 | https://healthland.time.com/?p=43151 | ✅ | ✅ | Judul "1 in 25 Business Leaders May Be Psychopaths"; "according to Hare, psychopaths make up 1% of the general population"; checklist Hare. |
| 7 | https://www.ideals.illinois.edu/items/45606 | ✅ | ✅ | Disertasi Grijalva 2013 UIUC: emergence positif (dijelaskan ekstraversi), efektivitas nol, self vs observer, kurva (moderat optimal). |
| 8 | https://www.futurity.org/psychopaths-bosses-1890782/ | ✅ | ✅ | 17 Okt 2018; Landay/Harms/Credé; 92 studi; kutipan Credé persis; standar ganda gender; "frequently found in leaders responsible for major corporate scandals … sexual harassment cases"; 360-degree feedback. |
| 9 | https://e-journals.unmul.ac.id/index.php/psikoneo/article/view/19167 | ✅ | ✅ | Arnietta, Natalya, Siaputra; Psikoborneo 13(2) 2025; Fak. Psikologi Ubaya; 305 mahasiswa; validasi SD4. |
| 10 | https://en.wikipedia.org/wiki/Dark_triad | ✅ | ⚠ tersier | Paulhus & Williams 2002; Christie & Geis 1970; everyday sadism/dark tetrad; narsis bagus di wawancara kerja. **Tidak** menyatakan bahwa sebagian besar bukti berasal dari Amerika Utara dan Eropa. |

## Cek fakta
- ✅ "Delapan orang (3,9%) punya skor 30 atau lebih, ambang yang biasa dipakai peneliti" — BAB.
- ✅ "Majalah TIME merangkumnya jadi sekitar 1 dari 25 bos", "Hare memperkirakan … 1%" — TIME.
- ✅ "makin bagus nilai … komunikasi, kreativitas, dan berpikir strategis … makin rendah penilaian kinerjanya … team player ikut turun" — BAB (teks; tanda minus tabel hilang di ekstraksi PDF, teks + Figure 5 jelas).
- ⚠ "Tujuh perusahaan memilih 203 manajer dan eksekutif" / hook "Dari 203 manajer" — bagian Participants BAB memang menulis "203 managers and executives", tapi abstrak menulis "203 corporate professionals" dan rinciannya 158 manajemen + 45 profesional/staf/sales. Label "manajer" untuk semua 203 tidak presisi → must-fix 1.
- ✅ Paulhus & Williams 2002, JRP, UBC, 245 mahasiswa, .25–.50, agreeableness rendah, "tumpang tindih, tapi berbeda" — PW.
- ❌ "narsisme: rasa diri istimewa dan haus pengakuan" — PW menyebut grandiosity, entitlement, dominance, superiority; "haus pengakuan" tidak ada di sumber mana pun di daftar → must-fix 2.
- ⚠ "psikopati: impulsif dan minim empati" — benar menurut PW ("high impulsivity and thrill-seeking along with low empathy and anxiety"), tapi tidak dipetakan di notes → must-fix 7.
- ❌ "ciri kepribadian yang dimiliki semua orang dalam kadar berbeda" — PW hanya bilang diukur pada sampel non-klinis; tidak ada klaim "semua orang" → must-fix 3.
- ✅ Christie & Geis 1970 (WDT), pernyataan dari buku Machiavelli (PW), dark tetrad (WDT), SD4 Ubaya 2025 305 mahasiswa (SD4).
- ❌ "Studi yang paling sering dikutip soal ini" (Spurk) — superlatif tanpa sumber, tidak ada di notes → must-fix 4.
- ✅ Spurk: 793, Jerman, 25–34, Dirty Dozen, SPPS, temuan per ciri, 6 kontrol, "bright and dark sides" — SPURK + APS.
- ✅ Grijalva: emergence positif via ekstraversi; efektivitas nol; self-rating vs observer; kurva — GRI.
- ❌ "Orang narsis cenderung bicara duluan, tampil percaya diri, dan gampang dilirik" — tidak ada di GRI maupun WDT (WDT hanya: narsis sering bagus di wawancara kerja, kesan pertama baik). Notes sendiri menandai ini interpretasi, padahal posisinya di bagian fakta → must-fix 5.
- ✅ O'Boyle: 245 sampel, 1951–2011, 43.907, −0,07/−0,10/narsisme ns, ~1% vs ~28%, narsisme terkuat untuk CWB, contoh CWB, kolektivisme marginal — OB.
- ✅ Landay/Harms/Credé, 92 studi, efek kecil, kutipan Credé persis, standar ganda gender, skandal & pelecehan, 360 derajat — FUT.
- ❌ "hampir semua studi ini dilakukan di Amerika Utara dan Eropa" — WDT tidak menyatakannya (dicek 22 Okt). Malah OB menguji moderator kolektivisme, artinya meta-analisis itu memuat sampel dari berbagai budaya → must-fix 6.
- ✅ "Kami belum menemukan studi besar … di Indonesia" — pernyataan batas pencarian, berlabel interpretasi. Catatan: WebSearch Lup menemukan beberapa studi kecil dark triad pada karyawan Indonesia (mis. Humanitas 2024, Jurnal Sosial & Psikologi UM), jadi kata "besar" penting dipertahankan (lihat saran).

## Cek gambar
- `/assets/illustrations/dark-triad-v1.svg` ada di repo (4,5 KB), ilustrasi sendiri, credit/lisensi/page sesuai RULES 3b. Teks di SVG (merasa istimewa / manipulatif / impulsif, minim empati / kurang ramah; gaji ↔ narsisme, atasan ↔ Mach, psikopati lebih rendah; ~1% variasi) cocok dengan sumber. Alt dan caption akurat. Tidak ada must-fix gambar.

## Must-fix
1. Hook + Bagian 1 kalimat 1 · "203 manajer dan eksekutif" / "Dari 203 manajer" — abstrak BAB: "203 corporate professionals", rinciannya 158 manajemen (supervisor sampai CEO) + 45 profesional, staf kunci, atau sales. Ganti jadi mis. "203 profesional (158 di antaranya manajer atau eksekutif)" di bagian 1, dan di hook "Dari 203 calon pemimpin perusahaan" atau "203 karyawan pilihan". Pastikan hook tetap ≤170 karakter.
2. Bagian 2 paragraf 2 · "narsisme: rasa diri istimewa dan haus pengakuan" — "haus pengakuan" tidak ada di sumber. Ganti dengan yang ada di PW: "merasa hebat, merasa berhak diistimewakan, dan ingin mendominasi" (grandiosity, entitlement, dominance, superiority), lalu petakan ke PW di notes.
3. Bagian 2 paragraf 3 · "ciri kepribadian yang dimiliki semua orang dalam kadar berbeda" — PW tidak menyatakan "semua orang". Ganti jadi "ciri kepribadian yang diukur pada orang biasa (sampel non-klinis), bukan diagnosis gangguan jiwa", atau tambah sumber yang eksplisit menyebut ciri ini dimensional/ada pada semua orang.
4. Bagian 3 kalimat 1 · "Studi yang paling sering dikutip soal ini" — superlatif tanpa sumber. Hapus "yang paling sering dikutip" (mis. "Salah satu studi soal ini datang dari …") atau beri sumber jumlah sitasi.
5. Bagian 3 paragraf 4 kalimat terakhir · "Orang narsis cenderung bicara duluan, tampil percaya diri, dan gampang dilirik" — tidak ada di sumber. Hapus, atau ganti dengan fakta WDT: "Orang narsis juga sering tampil bagus di wawancara kerja dan mendapat nilai rekrutmen lebih tinggi, kemungkinan karena kesan pertamanya kuat." (petakan ke WDT di notes).
6. Bagian 5 paragraf 5 · "hampir semua studi ini dilakukan di Amerika Utara dan Eropa" — WDT tidak menyatakannya, dan OB memuat sampel lintas budaya. Ganti dengan yang bisa dicek: "Studi tunggal yang dibahas di sini memakai sampel dari Kanada (Paulhus & Williams), Amerika Serikat (Babiak dkk.), dan Jerman (Spurk dkk.), dengan peserta mahasiswa atau pekerja kantoran." Perbarui notes.
7. Notes bagian 2 · tambahkan baris peta untuk "psikopati: impulsif dan minim empati" → PW ("high impulsivity and thrill-seeking along with low empathy and anxiety").

## Saran (opsional)
- Bagian 4: OB menulis R² CWB .282 di tabel tapi 26,7% di Diskusi. "Sekitar 27–28%" lebih jujur daripada "sekitar 28%".
- Bagian 5: "Babiak menemukan dua gambaran itu sekaligus pada orang yang sama" → "pada sampel yang sama" (yang dilaporkan korelasi seluruh sampel, bukan profil per orang).
- Bagian 5 kalimat terakhir: pertajam jadi "Studi yang kami temukan di Indonesia masih kecil atau baru memvalidasi alat ukur" supaya nggak terkesan belum ada riset sama sekali.
- Sumber 5: kalau ada salinan BAB di situs penerbit/universitas yang bisa di-fetch, lebih baik daripada gwern.net.

---
Review selesai 08.52 WIB. Pena (sesi revisi, trig_01WnvJBFjVh1ogya4zRQu7HU) dipanggil lewat fire_trigger pukul 08.53 WIB.
