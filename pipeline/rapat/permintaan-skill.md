# Permintaan skill dari agen

Agen menulis permintaan skill di sini saat butuh kemampuan atau panduan yang belum ada. Hanya pemilik yang memutuskan skill mana yang dibuat atau diubah. Agen tidak membuat skill sendiri.

Format per entri:
- [tgl] agen · kebutuhan · alasan (contoh kasus dari hari itu) · dampak kalau tidak ada · status (baru / disetujui / ditolak)

- [2026-10-20] Layar · plugin "Social Media Skills" (hook-writer, short-form-video-script, storyboarding) · untuk hook 0–2 detik Reels dan variasi format; disarankan pemilik di agenda dadakan · dampak kalau tidak ada: variasi format bergantung pada template manual · status: disetujui pemilik 23 Okt
- [2026-10-20] Hope · plugin Windsor.ai (membaca reach dan saves Instagram) · ig-insights 19 dan 20 Okt belum ada, dan workflow tidak mencatat run hari ini · dampak kalau tidak ada: evaluasi performa tetap "belum tersedia" · status: disetujui pemilik 23 Okt
- [2026-10-21] Hope · tambahan metrik retensi video 3 detik ke skrip insight (instagram-insights.mjs) · uji H3 20 Okt tidak bisa dijalankan karena ig-insights hanya menyimpan reach, saved, shares, total_interactions, likes, comments · dampak kalau tidak ada: H3 tidak bisa diuji · status: disetujui pemilik 23 Okt
- [2026-10-23] Kanvas · cara melihat referensi Instagram yang dititipkan pemilik (@simpleas.off, post DepPeSVHZ7g) · pada 23 Okt kedua tautan ditolak WebFetch (robots_disallowed) · dampaknya, tanpa akses ini Kanvas tidak bisa mempelajari referensi pemilik · status: baru (usulan sementara: pemilik mengirim tangkapan layar)
- [2026-10-23] Hope + Kanvas · cara menambahkan musik ke carousel saat posting otomatis (perintah pemilik: carousel wajib bermusik) · dokumen Audio API Instagram (v22.0, dibaca 23 Okt 2026) hanya mencontohkan media_type=REELS, sedangkan instagram-post.mjs tidak punya parameter audio · dampaknya, sampai ada jalannya, musik harus ditambahkan manual lewat aplikasi · status: baru
- [2026-10-24] Hope · akses baca ke halaman media besar (BBC Indonesia, Kompas) untuk referensi pola · WebSearch 24 Okt tidak mengembalikan artikel dari situs itu, dan WebFetch ke artikel web hari ini ditolak izin pada sesi publish (lihat publish.md) · dampak kalau tidak ada: referensi media besar hanya dari sumber lain (Metricool, Storyboard18, detikInet, Jakarta Post) dan referensi.md tipis · status: baru
- [2026-10-27] Merpati, Lup · akses baca halaman situs (artikel web dan sumber) untuk memverifikasi deploy dan ulang sumber · WebFetch ditolak di sesi terjadwal 27 Okt (robots dan izin), sama seperti 24 Okt · dampak kalau tidak ada: deploy tidak bisa dibuktikan dan sumber ulang untuk reserve bergantung pada Lup · status: baru
