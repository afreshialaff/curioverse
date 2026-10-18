// Curioverse content. Edit stories here, then run `node scripts/build.mjs`.
// Each story: id, cat, also?, date, title, dek, tags, s: [[heading, [paragraphs]]].
// Stories published by the agent pipeline live as one JSON file each in content/stories/ (loaded at the bottom of this file).
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CAT_DATA = Object.fromEntries(Object.entries(JSON.parse(readFileSync(join(HERE, "categories.json"), "utf8"))).filter(([k]) => !k.startsWith("_")));
export const CATS = Object.fromEntries(Object.entries(CAT_DATA).map(([k, v]) => [k, { label:v.label, light:v.light, dark:v.dark }]));
export const ORDER = Object.keys(CAT_DATA);

export const A = [
{ id:"tulip", cat:"sejarah", also:"finance", date:"2026-10-12",
  title:"Tulip mania: waktu satu umbi bunga dihargai kayak rumah",
  dek:"Belanda abad ke-17, harga kontrak umbi tulip naik gila-gilaan lalu ambruk di Februari 1637. Plot twist-nya, ceritanya mungkin nggak sedramatis yang kamu kira.",
  tags:"gelembung bubble belanda spekulasi harga bunga",
  s:[["Kok bisa bunga jadi aset?",["Di Republik Belanda tahun 1630-an, tulip itu barang flexing. Varietas yang kelopaknya bergaris-garis kayak api paling dicari (belakangan ketahuan pola itu efek virus). Orang nggak cuma beli bunganya, tapi kontrak umbi yang baru bakal dipanen nanti. Jadi yang diperdagangkan sebenernya janji.","Pas musim dingin 1636 ke 1637, harga kontrak itu naik terus. Banyak yang ikut beli bukan karena suka tulip, tapi karena yakin besok ada yang mau beli lebih mahal. Familiar? Ini pola klasik gelembung harga."]],
     ["Februari 1637: pop",["Awal Februari 1637, di sebuah lelang di Haarlem, pembeli tiba-tiba nggak muncul. Kepercayaan runtuh dalam hitungan hari, harga kontrak jatuh, dan banyak kesepakatan akhirnya nggak pernah dibayar penuh."]],
     ["Plot twist dari sejarawan",["Versi populernya bilang ekonomi Belanda hancur dan orang bangkrut massal. Sejarawan Anne Goldgar, lewat bukunya Tulipmania (2007), ngecek arsip aslinya dan nemu kalau yang kena dampak cuma lingkaran pedagang yang relatif kecil. Cerita semua orang jatuh miskin banyak datang dari pamflet moral yang ditulis setelahnya.","Jadi pelajarannya dobel: gelembung harga itu nyata, tapi cerita soal gelembung juga bisa digelembungkan. Selalu cek sumbernya, bestie."]]] },
{ id:"voc", cat:"saham", also:"sejarah", date:"2026-10-09",
  title:"Saham pertama di dunia lahir dari kapal rempah",
  dek:"VOC berdiri tahun 1602 dan jadi salah satu perusahaan pertama yang sahamnya bisa dijual-beli bebas. Iya, VOC yang itu.",
  tags:"voc belanda rempah bursa amsterdam pasar modal banda",
  s:[["Masalahnya: kapal itu mahal dan sering hilang",["Pelayaran ke Asia buat cari pala, cengkeh, dan lada itu high risk high return. Satu kapal bisa bawa pulang untung gede, atau hilang di laut. Solusinya, modal dikumpulin dari banyak orang supaya risikonya dibagi rame-rame."]],
     ["Lahirnya VOC",["Tahun 1602, Vereenigde Oostindische Compagnie (VOC) dibentuk. Bedanya dengan usaha sebelumnya, modal VOC ditanam jangka panjang, bukan per satu pelayaran. Kalau mau keluar, investor nggak narik uang dari perusahaan, tapi jual bagian kepemilikannya ke orang lain di Amsterdam. Dari situ jual-beli saham jadi kebiasaan.","Makanya VOC sering disebut sebagai salah satu perusahaan pertama yang sahamnya diperdagangkan publik."]],
     ["Sisi gelapnya",["Keuntungan itu dibangun dari monopoli rempah dan kekerasan di Nusantara, termasuk tragedi di Kepulauan Banda tahun 1621. Jadi tiap dengar sejarah pasar modal, ingat juga siapa yang bayar harganya."]],
     ["Hari ini",["Sekarang kita bisa beli saham lewat aplikasi di HP, dan di Indonesia jual-belinya lewat Bursa Efek Indonesia (BEI). Konsep dasarnya masih sama: kamu beli sepotong kecil kepemilikan sebuah perusahaan."]]] },
{ id:"majemuk", cat:"finance", date:"2026-10-14",
  title:"Bunga majemuk: cara duit kamu punya anak, terus anaknya punya anak",
  dek:"Konsep finance paling underrated, plus trik Rule of 72 buat ngitung kapan uangmu jadi dua kali lipat cuma pakai otak.",
  tags:"bunga compound interest tabungan investasi rule of 72 duit",
  s:[["Bunga yang berbunga",["Bunga biasa dihitung dari setoran awal aja. Bunga majemuk dihitung dari setoran awal plus bunga yang udah terkumpul. Awalnya bedanya tipis banget, tapi makin lama grafiknya makin melengkung ke atas. Bahan utamanya: waktu."]],
     ["Rule of 72",["Mau tau kira-kira berapa tahun uangmu jadi dua kali lipat? Bagi 72 dengan persentase bunga per tahun. Bunga 6% per tahun berarti sekitar 72 ÷ 6 = 12 tahun. Ini perkiraan kasar, tapi cukup akurat buat bunga di kisaran kecil sampai menengah."]],
     ["Fun fact yang ternyata hoaks",["Kamu mungkin pernah lihat quote bunga majemuk adalah keajaiban dunia kedelapan (atau versi lainnya: penemuan terbesar manusia) yang katanya dari Einstein. Belum ada bukti Einstein pernah bilang itu; jejak paling awal yang ditemukan peneliti kutipan baru muncul puluhan tahun setelah dia wafat, dan itu pun disebut kutipan yang konon. Konsepnya tetap valid, quote-nya aja yang nggak jelas asal-usulnya."]],
     ["Coba sendiri",["Main-main angkanya di Lab Kepo di halaman utama. Ingat ya, ini simulasi. Di dunia nyata ada inflasi, pajak, biaya admin, dan return yang naik turun."]]] },
{ id:"langit", cat:"science", date:"2026-10-05",
  title:"Kenapa langit biru, padahal cahaya matahari putih?",
  dek:"Jawabannya ada di molekul udara yang suka nyebarin cahaya biru ke segala arah. Bonus: kenapa sunset warnanya oranye.",
  tags:"langit biru rayleigh cahaya sunset atmosfer fisika",
  s:[["Cahaya putih itu sebenernya rame",["Cahaya matahari itu campuran semua warna pelangi. Tiap warna punya panjang gelombang beda: merah paling panjang, biru dan ungu paling pendek."]],
     ["Hamburan Rayleigh",["Pas cahaya lewat atmosfer, molekul nitrogen dan oksigen menghamburkan cahaya. Gelombang pendek dihamburkan jauh lebih kuat daripada yang panjang. Hasilnya, biru tersebar ke seluruh langit dan masuk ke mata kita dari arah mana pun. Fenomena ini namanya hamburan Rayleigh."]],
     ["Terus kenapa nggak ungu?",["Ungu malah lebih kuat dihamburkan, tapi matahari memancarkan ungu lebih sedikit, sebagian diserap di atmosfer atas, dan mata kita lebih sensitif ke biru. Jadi otak kita bacanya: biru."]],
     ["Sunset oranye",["Pas matahari rendah, cahayanya nembus atmosfer yang jauh lebih tebal. Birunya udah habis dihamburkan di jalan, yang sampai ke mata tinggal oranye dan merah. Abu vulkanik di udara bisa bikin sunset makin dramatis, dan ini nyambung ke cerita Krakatau."]]] },
{ id:"cahaya", cat:"science", date:"2026-09-30",
  title:"Bintang yang kamu lihat malam ini sebenernya foto lama",
  dek:"Cahaya butuh waktu buat jalan. Jadi tiap kali lihat langit, kamu lagi lihat masa lalu, literally.",
  tags:"bintang cahaya tahun cahaya andromeda proxima astronomi",
  s:[["Cepat, tapi nggak instan",["Kecepatan cahaya di ruang hampa sekitar 300.000 km per detik. Cepat banget, tapi alam semesta jauh lebih luas lagi."]],
     ["Delay dari tetangga",["Cahaya dari Bulan butuh sekitar 1,3 detik buat sampai ke Bumi. Dari Matahari sekitar 8 menit 20 detik. Artinya, kalau Matahari tiba-tiba hilang, kita baru sadar sekitar 8 menit kemudian."]],
     ["Makin jauh, makin lama",["Proxima Centauri, bintang terdekat setelah Matahari, jaraknya sekitar 4,24 tahun cahaya. Galaksi Andromeda sekitar 2,5 juta tahun cahaya. Cahaya Andromeda yang bisa kamu lihat di langit gelap berangkat waktu nenek moyang manusia masih di tahap awal evolusinya."]],
     ["Jadi, bintangnya masih ada?",["Kebanyakan bintang yang kelihatan dengan mata telanjang relatif dekat, jadi hampir pasti masih ada. Tapi prinsipnya tetap: langit malam itu album foto dari waktu yang beda-beda."]]] },
{ id:"curie", cat:"biografi", also:"science", date:"2026-10-02",
  title:"Marie Curie: satu-satunya orang dengan Nobel di dua bidang sains",
  dek:"Fisika 1903, Kimia 1911. Dan buku catatannya sampai sekarang masih radioaktif.",
  tags:"marie curie nobel radium polonium perempuan ilmuwan polandia",
  s:[["Dari Warsawa ke Paris",["Maria Skłodowska lahir di Warsawa tahun 1867. Waktu itu perempuan di sana nggak bisa kuliah di universitas biasa, jadi dia belajar diam-diam, lalu pindah ke Paris dan kuliah di Sorbonne."]],
     ["Dua Nobel, dua bidang",["Tahun 1903 dia dapat Nobel Fisika bareng Pierre Curie dan Henri Becquerel atas riset radiasi. Tahun 1911 dia dapat Nobel Kimia karena menemukan unsur polonium dan radium. Sampai hari ini, dia satu-satunya orang yang menang Nobel di dua bidang sains yang berbeda."]],
     ["Warisan yang literally masih aktif",["Waktu itu bahaya radiasi belum dipahami. Catatan kerjanya sampai sekarang masih menyimpan radioaktivitas, jadi disimpan di kotak berlapis timbal dan yang mau lihat aslinya perlu perlengkapan pelindung."]],
     ["Kenapa dia relate",["Dia kerja di ruang yang dingin dan seadanya, dengan dana minim, dan tetap ngulik sampai tuntas. Energi kepo paling murni."]]] },
{ id:"lovelace", cat:"biografi", date:"2026-09-26",
  title:"Ada Lovelace nulis program komputer sebelum komputernya jadi",
  dek:"Tahun 1843, dia nulis catatan yang sekarang dianggap salah satu algoritma pertama untuk mesin hitung.",
  tags:"ada lovelace babbage analytical engine program komputer perempuan matematika",
  s:[["Anak penyair, jago matematika",["Ada Lovelace lahir tahun 1815, anak penyair Lord Byron. Ibunya sengaja mengarahkan dia ke matematika dan sains. Dari kecil dia udah suka membayangkan mesin terbang."]],
     ["Mesin yang nggak pernah jadi",["Charles Babbage merancang Analytical Engine, mesin hitung serbaguna yang nggak pernah selesai dibangun. Tahun 1843, Ada menerjemahkan artikel tentang mesin itu dan menambahkan catatan sendiri yang panjangnya melebihi artikel aslinya."]],
     ["Note G",["Di catatan terakhir, Note G, dia menulis langkah-langkah supaya mesin itu bisa menghitung bilangan Bernoulli. Itu sering disebut sebagai program komputer pertama yang dipublikasikan. Dia juga menebak mesin seperti ini suatu hari bisa mengolah simbol lain, termasuk musik. Visioner banget."]],
     ["Hari Ada Lovelace",["Setiap Selasa kedua bulan Oktober diperingati sebagai Ada Lovelace Day, untuk merayakan perempuan di bidang sains, teknologi, teknik, dan matematika."]]] },
{ id:"kartini", cat:"biografi", also:"sejarah", date:"2026-09-21",
  title:"Kartini dan surat-surat yang bikin gelap jadi terang",
  dek:"Sebelum ada thread dan newsletter, Kartini udah nulis opini tajam lewat surat ke teman-temannya di Belanda.",
  tags:"kartini jepara surat habis gelap terbitlah terang emansipasi pendidikan perempuan",
  s:[["Dipingit, tapi pikirannya jalan terus",["Raden Ajeng Kartini lahir di Jepara, 21 April 1879. Setelah umur 12 dia harus dipingit di rumah sesuai adat bangsawan Jawa waktu itu. Sekolahnya berhenti, tapi bacaannya jalan terus."]],
     ["Surat sebagai ruang bicara",["Kartini rajin surat-suratan dengan teman-temannya di Belanda. Isinya soal pendidikan perempuan, adat, kolonialisme, dan agama. Gaya nulisnya personal tapi kritis, kayak baca thread panjang yang bikin mikir."]],
     ["Jadi buku",["Kartini meninggal tahun 1904 di usia 25 tahun. Tahun 1911, J.H. Abendanon menerbitkan kumpulan suratnya dengan judul Door Duisternis tot Licht. Versi bahasa Indonesianya kita kenal sebagai Habis Gelap Terbitlah Terang."]],
     ["Kenapa masih relevan",["Ide intinya simpel: perempuan berhak belajar dan menentukan hidupnya. Makanya setiap 21 April kita peringati sebagai Hari Kartini."]]] },
{ id:"krakatau", cat:"sejarah", also:"science", date:"2026-09-18",
  title:"Krakatau 1883: letusan yang kedengeran sampai 4.800 km",
  dek:"Suaranya terdengar sampai Pulau Rodrigues di Samudra Hindia, dan sunset di banyak negara jadi merah aneh berbulan-bulan.",
  tags:"krakatau gunung letusan 1883 tsunami selat sunda vulkanik",
  s:[["26 sampai 27 Agustus 1883",["Gunung Krakatau di Selat Sunda meletus besar-besaran. Ledakan puncaknya terjadi pagi hari tanggal 27 Agustus dan menghancurkan sebagian besar pulaunya."]],
     ["Suara yang nyampe ke seberang samudra",["Dentumannya terdengar sampai Pulau Rodrigues, sekitar 4.800 km jauhnya. Gelombang tekanannya terekam barometer di berbagai negara dan memutari Bumi beberapa kali."]],
     ["Tsunami dan korban",["Tsunami yang dipicu letusan menyapu pesisir Jawa dan Sumatra. Korban jiwanya lebih dari 36 ribu orang, sebagian besar karena tsunami."]],
     ["Langit dunia ikut berubah",["Abu dan partikel halus naik tinggi ke atmosfer dan menyebar ke seluruh dunia. Selama berbulan-bulan, sunset di banyak negara jadi merah menyala, sampai ada yang mengira itu kebakaran besar. Tahun 1927, anak gunungnya muncul dari laut: Anak Krakatau."]]] },
{ id:"bullbear", cat:"market", date:"2026-10-07",
  title:"Bull vs bear market, dijelasin tanpa bikin pusing",
  dek:"Dua istilah yang sering muncul di berita market. Intinya soal arah dan mood pasar.",
  tags:"bull bear market ihsg indeks pasar saham istilah",
  s:[["Bull: pasar lagi optimis",["Bull market itu periode ketika harga-harga di pasar naik dalam waktu cukup lama dan orang optimis. Banteng menyerang dengan tanduk ke atas, jadi gampang diingat."]],
     ["Bear: pasar lagi lesu",["Bear market itu kebalikannya. Patokan yang umum dipakai: harga indeks turun 20% atau lebih dari titik tertingginya. Beruang menyerang dengan cakar ke bawah."]],
     ["Versi Indonesia",["Kalau berita bilang IHSG menguat, yang dimaksud Indeks Harga Saham Gabungan, ukuran pergerakan semua saham di Bursa Efek Indonesia. Satu hari merah belum tentu bear market, ya. Jangan auto panik."]],
     ["Catatan penting",["Nggak ada yang bisa menebak pasti kapan bull berubah jadi bear. Konten ini buat paham istilah."]]] },
{ id:"inflasi", cat:"market", also:"finance", date:"2026-09-28",
  title:"Inflasi: kenapa es kopi favoritmu makin mahal",
  dek:"Harga naik pelan-pelan, duit di dompet sama, tapi belanjaan dapatnya makin dikit. Itu inflasi.",
  tags:"inflasi harga bank indonesia bi rate suku bunga ekonomi",
  s:[["Definisi versi santai",["Inflasi adalah kenaikan harga barang dan jasa secara umum dan terus-menerus. Bukan cuma satu barang yang naik, tapi rata-rata banyak barang."]],
     ["Kenapa bisa terjadi",["Bisa karena permintaan lebih tinggi dari barang yang tersedia, karena biaya produksi naik (misalnya bahan baku atau energi), atau karena orang sudah mengira harga bakal naik."]],
     ["Siapa yang ngerem",["Di Indonesia, Bank Indonesia bertugas menjaga inflasi tetap terkendali, salah satunya lewat suku bunga acuan BI-Rate. Kalau bunga naik, orang cenderung menahan belanja dan pinjaman, jadi laju harga bisa melambat."]],
     ["Hubungannya sama tabunganmu",["Kalau bunga tabunganmu lebih kecil dari inflasi, nilai uangmu sebenernya pelan-pelan turun. Itu sebabnya orang ngomongin investasi. Tapi pahami risikonya dulu."]]] },
{ id:"candle", cat:"saham", date:"2026-10-11",
  title:"Cara baca candlestick buat pemula total",
  dek:"Grafik lilin warna-warni di aplikasi saham itu sebenernya cuma empat angka: open, high, low, close.",
  tags:"candlestick grafik saham chart ohlc teknikal homma",
  s:[["Satu lilin, satu periode",["Setiap batang lilin mewakili satu periode waktu, misalnya satu hari. Lilin itu merangkum empat harga: pembukaan (open), tertinggi (high), terendah (low), dan penutupan (close)."]],
     ["Badan dan sumbu",["Bagian tebal disebut badan (body), jaraknya dari open ke close. Garis tipis di atas dan bawah disebut sumbu (wick atau shadow), menunjukkan harga tertinggi dan terendah. Kalau close lebih tinggi dari open, harga naik. Kalau lebih rendah, harga turun. Warnanya tergantung aplikasi, jadi cek legendanya."]],
     ["Dari pasar beras Jepang",["Metode ini sering dikaitkan dengan Munehisa Homma, pedagang beras Jepang abad ke-18. Di dunia Barat, candlestick jadi populer setelah buku Steve Nison terbit tahun 1991."]],
     ["Latihan",["Coba pencet bagian-bagian lilin di Lab Kepo. Dan ingat, bisa baca grafik belum sama dengan bisa meramal harga."]]] },
{ id:"g20", cat:"global", date:"2026-10-03",
  title:"G20 itu sebenernya apa, dan kenapa Indonesia ada di dalamnya?",
  dek:"Forum 19 negara plus Uni Eropa dan Uni Afrika yang ekonominya paling berpengaruh. Kita rangkum tanpa jargon.",
  tags:"g20 ktt bali indonesia ekonomi dunia forum internasional",
  s:[["Lahir dari krisis",["G20 dibentuk tahun 1999 setelah krisis keuangan Asia, awalnya sebagai pertemuan menteri keuangan dan gubernur bank sentral. Sejak krisis keuangan global 2008, para kepala negara ikut bertemu dalam KTT."]],
     ["Anggotanya siapa aja",["Anggotanya 19 negara, Uni Eropa, dan sejak 2023 Uni Afrika. Indonesia jadi anggota karena ukuran ekonominya termasuk yang besar di dunia."]],
     ["Indonesia jadi tuan rumah",["Tahun 2022 Indonesia memegang presidensi G20, dan KTT-nya digelar di Bali pada bulan November."]],
     ["Kenapa kita perlu peduli",["Keputusan di forum kayak gini bisa menyentuh hal yang dekat sama kita: harga energi, perdagangan, sampai aturan pajak lintas negara. Jadi pas ada beritanya, kamu udah punya konteks."]]] },
{ id:"cekberita", cat:"global", date:"2026-10-15",
  title:"5 pertanyaan sebelum kamu share berita global",
  dek:"Biar nggak ikut nyebarin info setengah matang. Checklist cepat, bisa dipakai dalam 30 detik.",
  tags:"hoaks cek fakta berita media literasi share",
  s:[["Siapa sumbernya?",["Media yang jelas redaksinya, lembaga resmi, atau akun anonim? Cek juga apakah mereka punya kepentingan sama isu itu."]],
     ["Kapan kejadiannya?",["Banyak berita lama di-repost seolah baru. Lihat tanggal aslinya."]],
     ["Ada data atau cuma klaim?",["Kalau ada angka, cari dari mana angka itu. Kalau nggak ada sumbernya, anggap belum terbukti."]],
     ["Media lain bilang apa?",["Bandingkan minimal dua sumber berbeda, idealnya dari negara atau sudut pandang yang beda."]],
     ["Judulnya bikin emosi?",["Judul yang bikin marah atau takut berlebihan itu sinyal buat pelan-pelan dulu. Baca sampai habis sebelum share."]]] },
{ id:"tardigrade", cat:"science", date:"2026-09-23",
  title:"Tardigrade: hewan seukuran debu yang pernah selamat di luar angkasa",
  dek:"Panjangnya kurang dari satu milimeter, tapi tahan kering, beku, dan ruang hampa. Main character energy.",
  tags:"tardigrade water bear hewan mikroskopis luar angkasa biologi",
  s:[["Kenalan dulu",["Tardigrade, atau water bear, adalah hewan mikroskopis berkaki delapan yang hidup di lumut, tanah, sampai laut. Kebanyakan panjangnya sekitar setengah milimeter."]],
     ["Mode tun",["Kalau lingkungannya kering, tardigrade bisa mengerut jadi bentuk yang disebut tun dan menurunkan metabolisme sampai hampir berhenti. Dalam mode ini dia bisa bertahan lama sampai ketemu air lagi."]],
     ["Liburan ke luar angkasa",["Tahun 2007, dalam misi FOTON-M3, tardigrade dibawa ke orbit dan dipaparkan langsung ke ruang hampa. Sebagian berhasil hidup lagi setelah kembali ke Bumi, jadi mereka termasuk hewan pertama yang terbukti bertahan di kondisi itu."]],
     ["Tapi bukan abadi",["Mereka tetap bisa mati, terutama saat sedang aktif. Superpower-nya muncul saat masuk mode tun. Tetap keren sih."]]] }
];
export const HOLES = [
  { id:"bursa", title:"Dari bunga ke bursa", dek:"Gimana spekulasi bunga, kapal rempah, dan istilah pasar modern ternyata satu garis cerita.", ids:["tulip","voc","bullbear","candle"],
    pts:[[30,120],[130,50],[230,96],[330,30]] },
  { id:"jenius", title:"Perempuan yang kelewat jenius buat zamannya", dek:"Tiga orang yang nulis, ngitung, dan nemu hal-hal yang dunia belum siap terima.", ids:["kartini","lovelace","curie"],
    pts:[[40,40],[180,118],[320,60]] },
  { id:"langit", title:"Langit, cahaya, dan hal yang bikin merinding", dek:"Mulai dari warna langit, lanjut ke cahaya masa lalu, gunung yang ngubah sunset dunia, sampai hewan yang tahan ruang hampa.", ids:["langit","cahaya","krakatau","tardigrade"],
    pts:[[30,60],[120,128],[240,40],[340,104]] },
  { id:"tipu", title:"Kitab penipu legendaris", dek:"Dari kupon pos sampai Menara Eiffel: tiga penipu paling terkenal, cara mereka bikin orang percaya, dan red flag yang masih berlaku sampai hari ini.", ids:["charles-ponzi","victor-lustig","frank-abagnale"],
    pts:[[40,100],[190,36],[330,92]] }
];
export const RADAR = ["cekberita","g20"];


// One line per topic for the Explore by Topic grid.
export const TOPIC_DESC = Object.fromEntries(Object.entries(CAT_DATA).map(([k, v]) => [k, v.desc]));

// Section labels: fakta (default), interpretasi, opini. Key = story id, value = { sectionIndex: kind }.
export const KINDS = {
  tulip:{ 2:"interpretasi" },
  voc:{ 2:"interpretasi" },
  majemuk:{ 3:"opini" },
  cahaya:{ 3:"interpretasi" },
  curie:{ 3:"opini" },
  kartini:{ 3:"interpretasi" },
  bullbear:{ 3:"opini" },
  inflasi:{ 3:"interpretasi" },
  g20:{ 3:"opini" },
  cekberita:{ 0:"opini", 1:"opini", 2:"opini", 3:"opini", 4:"opini" },
  tardigrade:{}
};

// Sources and further reading. u is optional (print-only citations have no link).
const W = t => "https://en.wikipedia.org/wiki/" + t;
export const SOURCES = {
  tulip:[{ t:"Wikipedia: Tulip mania", u:W("Tulip_mania") },
    { t:"Smithsonian Magazine: There Never Was a Real Tulip Fever", u:"https://www.smithsonianmag.com/history/there-never-was-real-tulip-fever-180964915/" },
    { t:"History.com: The Real Story Behind the 17th-Century 'Tulip Mania' Financial Crash", u:"https://www.history.com/news/tulip-mania-financial-crash-holland" },
    { t:"Reviews in History (Institute of Historical Research): ulasan Tulipmania karya Anne Goldgar", u:"https://reviews.history.ac.uk/review/666" },
    { t:"University of Chicago Press Blog: ulasan Tulipmania (Goldgar)", u:"https://pressblog.uchicago.edu/2007/05/24/review-goldgar-tulipmania.html" },
    { t:"Anne Goldgar, Tulipmania: Money, Honor, and Knowledge in the Dutch Golden Age (University of Chicago Press, 2007)" }],
  voc:[{ t:"Wikipedia: Dutch East India Company", u:W("Dutch_East_India_Company") },
    { t:"Erasmus University Rotterdam: Verwijmeren on why the first share was amazing news for the Netherlands", u:"https://www.eur.nl/en/news/verwijmeren-why-first-share-was-amazing-news-netherlands" },
    { t:"Euronews: How a Dutch trading company started the world's first stock exchange", u:"https://www.euronews.com/2025/04/13/how-a-dutch-trading-company-started-the-worlds-first-stock-exchange" },
    { t:"Wikipedia: Dutch conquest of the Banda Islands", u:W("Dutch_conquest_of_the_Banda_Islands") },
    { t:"Bursa Efek Indonesia", u:"https://www.idx.co.id" }],
  majemuk:[{ t:"Wikipedia: Compound interest", u:W("Compound_interest") }, { t:"Wikipedia: Rule of 72", u:W("Rule_of_72") },
    { t:"Investor.gov (SEC): Compound Interest Calculator", u:"https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
    { t:"Nasdaq Glossary: Rule of 72", u:"https://www.nasdaq.com/glossary/r/rule-of-72" },
    { t:"Texas A&M University: The Rule of 72 for compound interest", u:"https://people.tamu.edu/~fulling/m152/interest.html" },
    { t:"Quote Investigator: Compound Interest Is Man's Greatest Invention (atribusi ke Einstein tak terbukti)", u:"https://quoteinvestigator.com/2011/10/31/compound-interest/" }],
  langit:[{ t:"NASA Space Place: Why Is the Sky Blue?", u:"https://spaceplace.nasa.gov/blue-sky/en/" },
    { t:"Royal Museums Greenwich: Why is the sky blue?", u:"https://www.rmg.co.uk/stories/space-astronomy/why-sky-blue" },
    { t:"Live Science: Why is the sky blue?", u:"https://www.livescience.com/planet-earth/why-is-the-sky-blue" },
    { t:"Wikipedia: Rayleigh scattering", u:W("Rayleigh_scattering") }, { t:"Wikipedia: Diffuse sky radiation", u:W("Diffuse_sky_radiation") }],
  cahaya:[{ t:"NIST: Meter (kecepatan cahaya 299.792.458 m/s)", u:"https://www.nist.gov/si-redefinition/meter" },
    { t:"BBC Sky at Night Magazine: How long it takes light from the Sun to reach Earth", u:"https://www.skyatnightmagazine.com/space-science/how-take-light-from-sun-reach-earth" },
    { t:"Wikipedia: Speed of light", u:W("Speed_of_light") }, { t:"Wikipedia: Proxima Centauri", u:W("Proxima_Centauri") }, { t:"Wikipedia: Andromeda Galaxy", u:W("Andromeda_Galaxy") }],
  curie:[{ t:"NobelPrize.org: Nobel Prize in Physics 1903", u:"https://www.nobelprize.org/prizes/physics/1903/summary/" }, { t:"NobelPrize.org: Nobel Prize in Chemistry 1911", u:"https://www.nobelprize.org/prizes/chemistry/1911/summary/" },
    { t:"The Christian Science Monitor: Marie Curie, why her papers are still radioactive", u:"https://www.csmonitor.com/Innovation/Horizons/2011/1107/Marie-Curie-Why-her-papers-are-still-radioactive" },
    { t:"ScienceAlert: These personal effects of Marie Curie will be radioactive for another 1,500 years", u:"https://www.sciencealert.com/these-personal-effects-of-marie-curie-will-be-radioactive-for-another-1-500-years" },
    { t:"Wikipedia: Marie Curie", u:W("Marie_Curie") }],
  lovelace:[{ t:"BBC Science Focus: How Ada Lovelace's notes on the Analytical Engine created the first computer program", u:"https://www.sciencefocus.com/future-technology/how-ada-lovelaces-notes-on-the-analytical-engine-created-the-first-computer-program" },
    { t:"Two-Bit History: What Did Ada Lovelace's Program Actually Do?", u:"https://twobithistory.org/2018/08/18/ada-lovelace-note-g.html" },
    { t:"Finding Ada: Ada Lovelace Day", u:"https://findingada.com/" },
    { t:"Wikipedia: Ada Lovelace", u:W("Ada_Lovelace") }, { t:"Wikipedia: Ada Lovelace Day", u:W("Ada_Lovelace_Day") }],
  kartini:[{ t:"Universitas Pakuan: Sejarah R.A. Kartini (PDF)", u:"https://unpak.ac.id/pdf/Sejarah_R.A.Kartini.pdf" },
    { t:"Bisnis.com: Hari Kartini 21 April, sejarah, makna, dan tujuan", u:"https://kabar24.bisnis.com/read/20240420/79/1758983/hari-kartini-21-april-sejarah-makna-dan-tujuan" },
    { t:"CNBC Indonesia: Kisah Kartini, pahlawan RI yang tak pernah angkat senjata", u:"https://www.cnbcindonesia.com/lifestyle/20250421094210-33-627365/kisah-kartini-pahlawan-ri-yang-tak-pernah-angkat-senjata-di-perang" },
    { t:"Wikipedia (ID): Kartini", u:"https://id.wikipedia.org/wiki/Kartini" }, { t:"Wikipedia (EN): Kartini", u:W("Kartini") }],
  krakatau:[{ t:"Smithsonian Global Volcanism Program: Krakatau", u:"https://volcano.si.edu/volcano.cfm?vn=262000" },
    { t:"Nautilus: The Sound So Loud That It Circled the Earth Four Times", u:"https://nautil.us/the-sound-so-loud-that-it-circled-the-earth-four-times-235101/" },
    { t:"Oregon State University, Volcano World: Historical eruption sounds", u:"https://volcano.oregonstate.edu/historical-eruption-sounds" },
    { t:"Wikipedia: 1883 eruption of Krakatoa", u:W("1883_eruption_of_Krakatoa") }, { t:"Wikipedia: Anak Krakatoa", u:W("Anak_Krakatoa") }],
  bullbear:[{ t:"Investor.gov (SEC): Bear Market", u:"https://www.investor.gov/introduction-investing/investing-basics/glossary/bear-market" },
    { t:"Investor.gov (SEC): Bull Market", u:"https://www.investor.gov/introduction-investing/investing-basics/glossary/bull-market" },
    { t:"Bisnis.com: Apa itu IHSG? Fungsi, istilah, dan faktor yang memengaruhinya", u:"https://market.bisnis.com/read/20221017/7/1588284/apa-itu-ihsg-ini-fungsi-istilah-dan-faktor-yang-mempengaruhinya" },
    { t:"Pegadaian: IHSG, pengertian dan cara membacanya", u:"https://pegadaian.co.id/artikel/keuangan/ihsg-adalah" },
    { t:"Wikipedia: Market trend", u:W("Market_trend") }, { t:"Wikipedia: IDX Composite", u:W("IDX_Composite") }],
  inflasi:[{ t:"Bank Indonesia: Inflasi", u:"https://www.bi.go.id/id/fungsi-utama/moneter/inflasi/default.aspx" },
    { t:"Bank Indonesia: BI-Rate", u:"https://www.bi.go.id/id/fungsi-utama/moneter/bi-rate/default.aspx" },
    { t:"IMF Finance & Development: Inflation, Prices on the Rise", u:"https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Inflation" },
    { t:"Bisnis.com: Bukti inflasi, harga bakso dulu Rp200 sekarang Rp20.000", u:"https://finansial.bisnis.com/read/20230514/55/1655841/bukti-inflasi-harga-bakso-dulu-rp200-sekarang-rp20000-ini-pentingnya-investasi" },
    { t:"Wikipedia: Inflation", u:W("Inflation") }],
  candle:[{ t:"StockCharts ChartSchool: Introduction to Candlesticks", u:"https://chartschool.stockcharts.com/table-of-contents/chart-analysis/chart-types/candlestick-charts/introduction-to-candlesticks" },
    { t:"Pegadaian: Apa itu candlestick, cara baca dan pola umum", u:"https://pegadaian.co.id/artikel/investasi/candlestick-adalah" },
    { t:"Mandiri Sekuritas: Cara baca candlestick patterns", u:"https://www.mandirisekuritas.co.id/en/press-releases-articles/articles/cara-baca-candlestick-patterns" },
    { t:"Wikipedia: Candlestick chart", u:W("Candlestick_chart") }, { t:"Wikipedia: Homma Munehisa", u:W("Homma_Munehisa") }],
  g20:[{ t:"Council on Foreign Relations: What Does the G20 Do?", u:"https://www.cfr.org/backgrounder/what-does-g20-do" },
    { t:"Sekretariat Kabinet RI: Indonesia serahkan presidensi G20 ke India", u:"https://setkab.go.id/indonesia-serahkan-presidensi-g20-ke-india/" },
    { t:"Medcom.id: KTT G20 dimulai hari ini (Bali, 15–16 November 2022)", u:"https://www.medcom.id/internasional/asean/VNxwa1yK-ktt-g20-dimulai-hari-ini-berikut-daftar-tamu-undangan-yang-hadir" },
    { t:"G20 (situs resmi)", u:"https://www.g20.org" }, { t:"Wikipedia: G20", u:W("G20") }],
  cekberita:[{ t:"TurnBackHoax (Mafindo)", u:"https://turnbackhoax.id" },
    { t:"CekFakta.com: kolaborasi cek fakta Mafindo, AJI, dan AMSI", u:"https://cekfakta.com/" },
    { t:"Antara: Cara menyaring informasi dan hindari hoaks di dunia maya", u:"https://www.antaranews.com/berita/4673753/cara-menyaring-informasi-dan-hindari-hoaks-di-dunia-maya/" },
    { t:"Poynter: International Fact-Checking Network", u:"https://www.poynter.org/ifcn/" },
    { t:"Wikipedia: Fact-checking", u:W("Fact-checking") }],
  tardigrade:[{ t:"Space.com: Creature Survives Naked in Space", u:"https://www.space.com/5817-creature-survives-naked-space.html" },
    { t:"NBC News: 'Water bear' survives naked in space", u:"https://www.nbcnews.com/id/wbna26613502" },
    { t:"National Geographic: Tardigrades (water bears)", u:"https://www.nationalgeographic.com/animals/invertebrates/facts/tardigrades-water-bears" },
    { t:"Université de Montpellier: The mystery of tardigrades' extreme resilience", u:"https://www.umontpellier.fr/en/articles/le-mystere-de-la-resistance-extreme-des-tardigrades-enfin-resolu/" },
    { t:"Wikipedia: Tardigrade", u:W("Tardigrade") },
    { t:"Jönsson dkk. (2008), Tardigrades survive exposure to space in low Earth orbit, Current Biology 18(17)" }]
};

export const CURATORS = "AfreshiaLa & LeoFa";
// Kontak yang tampil di beranda (#kontak), footer, dan ajakan koreksi di tiap cerita.
// short = teks pendek di footer; personal = akun pribadi kurator, tidak masuk sameAs situs.
export const CONTACT = { email:"afreshiala@gmail.com", social:[
  { label:"Instagram · Curioverse", short:"IG Curioverse", icon:"instagram", handle:"@ocurioverse", url:"https://www.instagram.com/ocurioverse" },
  { label:"Instagram · AfreshiaLa", short:"IG AfreshiaLa", icon:"instagram", handle:"@afreshialaff", url:"https://www.instagram.com/afreshialaff", personal:true },
  { label:"Instagram · LeoFa", short:"IG LeoFa", icon:"instagram", handle:"@anec_dote1", url:"https://www.instagram.com/anec_dote1", personal:true },
  { label:"Threads", icon:"threads", handle:"@anec_dote1", url:"https://www.threads.com/@anec_dote1" },
  { label:"X", icon:"x", handle:"@ghaghafa", url:"https://x.com/ghaghafa" }
] };
export const FEATURED = "tulip";

// Three curated picks shown right under the hero ("Pilihan minggu ini"). Curated, not traffic-based.
export const PICKS = ["krakatau", "tulip", "curie"];

// Opening hooks: one short, checkable fact per story. A random one is shown per visit.
export const HOOKS = [
  { id:"krakatau", t:"Dentuman Krakatau tahun 1883 kedengeran sampai Pulau Rodrigues, sekitar 4.800 km jauhnya." },
  { id:"cahaya", t:"Cahaya Matahari yang kamu lihat sekarang berangkat sekitar 8 menit 20 detik yang lalu." },
  { id:"curie", t:"Marie Curie menang Nobel di dua bidang sains yang berbeda: Fisika 1903 dan Kimia 1911." },
  { id:"tardigrade", t:"Tahun 2007, tardigrade dibawa ke luar angkasa dan sebagian selamat dari ruang hampa." },
  { id:"lovelace", t:"Tahun 1843, Ada Lovelace nulis algoritma buat mesin yang nggak pernah selesai dibangun." },
  { id:"majemuk", t:"Quote bunga majemuk itu keajaiban dunia kedelapan sering dibilang dari Einstein. Buktinya belum ada." },
  { id:"voc", t:"VOC berdiri tahun 1602 dan sering disebut perusahaan pertama yang sahamnya diperdagangkan publik." },
  { id:"langit", t:"Ungu sebenernya dihamburkan atmosfer lebih kuat dari biru. Kok langit tetap kelihatan biru?" }
];

/* ---------- pipeline stories: content/stories/<id>.json ----------
   Format (lihat pipeline/RULES.md):
   { id, cat, also?, date, title, dek, tags, hook?, path?,
     sections:[{ h, kind?:"fakta"|"interpretasi"|"opini", p:[paragraf...] }],
     sources:[{ t, u }] }                                                    */
const STORY_DIR = join(HERE, "stories");
// Images: old stories via content/images.json, pipeline stories via their own image / sections[].img.
export const IMAGES = Object.fromEntries(Object.entries(JSON.parse(readFileSync(join(HERE, "images.json"), "utf8"))).filter(([k]) => !k.startsWith("_")));
export const PIPELINE_IDS = [];
if (existsSync(STORY_DIR)) {
  for (const f of readdirSync(STORY_DIR).filter(f => f.endsWith(".json")).sort()) {
    const j = JSON.parse(readFileSync(join(STORY_DIR, f), "utf8"));
    j._file = "content/stories/" + f;
    A.push({ id:j.id, cat:j.cat, ...(j.also ? { also:j.also } : {}), date:j.date, title:j.title, dek:j.dek, tags:j.tags,
      s:(j.sections || []).map(x => [x.h, x.p]), _file:j._file });
    KINDS[j.id] = Object.fromEntries((j.sections || []).map((x, i) => [i, x.kind || "fakta"]).filter(([, k]) => k !== "fakta"));
    SOURCES[j.id] = j.sources || [];
    if (j.hook) HOOKS.push({ id:j.id, t:j.hook });
    if (j.path) { const h = HOLES.find(h => h.id === j.path); if (h && !h.ids.includes(j.id)) h.ids.push(j.id); }
    const secImg = Object.fromEntries((j.sections || []).map((x, i) => [i, x.img]).filter(([, v]) => v));
    if (j.image || Object.keys(secImg).length) IMAGES[j.id] = { hero:j.image, sections:secImg };
    PIPELINE_IDS.push(j.id);
  }
}

// Reading paths that grew from pipeline stories get fresh constellation points.
for (const h of HOLES) if (h.pts.length !== h.ids.length)
  h.pts = h.ids.map((_, i, a) => [30 + Math.round(i * 310 / Math.max(1, a.length - 1)), i % 2 ? 112 : 44]);
