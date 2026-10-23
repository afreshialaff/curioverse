import json
D = 52.0
base = open('base.css').read().replace('</style>', '''
.ess{position:absolute;width:400px;height:560px;top:960px;background:var(--card);border-radius:24px;box-shadow:0 18px 50px rgba(27,26,23,.12)}
.face{position:absolute;left:130px;top:50px;width:140px;height:140px;border-radius:50%;background:#CDBFA6}
.halo{position:absolute;left:105px;top:25px;width:190px;height:190px;border-radius:50%;border:10px solid var(--gold);box-shadow:0 0 40px rgba(166,124,82,.55)}
.ln{position:absolute;left:50px;height:16px;border-radius:8px;background:rgba(27,26,23,.16)}
.q{position:absolute;left:0;right:0;bottom:36px;text-align:center;font-family:CvSerif;font-size:96px;color:var(--acc);line-height:1}
.elbl{position:absolute;top:1540px;width:400px;text-align:center;font:600 32px CvMono;color:var(--mute)}
.qq{font-family:CvSerifI;font-size:64px;line-height:1.1}
.tr2{font:600 40px CvSans;color:var(--ink);line-height:1.5}
</style>''')

lines = {
 's2': ["Tahun 1920, psikolog Edward Thorndike memeriksa penilaian atasan.", "Perwira yang dinilai tegap cenderung ikut dinilai cerdas."],
 's3': ["Caranya: satu kesan baik merembes ke penilaian lain.", "Wajah menarik dianggap berkepribadian lebih baik."],
 's4': ["Esai jelek yang sama diberi foto penulis berbeda.", "Foto penulis menarik: nilainya 5,2 dari 9.", "Foto tidak menarik: cuma 2,7."],
 's5': ["Plot twist-nya: keuntungan ini bisa berbalik.", "Perempuan menarik dinilai kurang cocok jadi insinyur mesin."],
 's6': ["Mei 2025, syarat berpenampilan menarik di lowongan dilarang.", "Saran Thorndike: nilai setiap sifat secara terpisah.", "Kamu menilai orang dari wajah, atau buktinya?"],
}
starts = [0, 3.05, 13.1, 20.6, 31.4, 38.6]
ends = starts[1:] + [D]
# line windows (show, hide)
win = {
 's2': [(3.15, 9.05), (9.3, None)],
 's3': [(13.2, 17.25), (17.45, None)],
 's4': [(20.7, 24.05), (24.25, 28.4), (28.62, None)],
 's5': [(31.5, 34.75), (34.92, None)],
 's6': [(38.7, 43.65), (43.85, 47.5), (47.75, None)],
}
kick = {'s2': 'Dari tahun 1920', 's3': 'Caranya begini', 's4': 'Buktinya · skala 1–9', 's5': 'Plot twist', 's6': 'Jadi'}

# bars: scale 9 -> 860 px
vals = [("Foto penulis menarik", 5.2), ("Tanpa foto", 4.7), ("Foto penulis tidak menarik", 2.7)]
bw = [round(v / 9 * 860) for _, v in vals]

def cap(sid):
    return '<div class="capbox">' + ''.join(f'<p class="cap" id="{sid}c{i}">{t}</p>' for i, t in enumerate(lines[sid])) + '</div>'

S = {}
S['s1'] = '''<div class="kicker"><i></i>Psikologi · Penampilan</div>
<h1 class="h" style="top:440px;font-size:100px">Benarkah hidup orang<br><span class="it" style="color:var(--acc)">good looking</span> lebih mudah?</h1>
<div class="ess" style="left:80px"><div class="halo"></div><div class="face" style="background:#B7A8DE"></div>
<div class="ln" style="top:250px;width:300px"></div><div class="ln" style="top:290px;width:260px"></div><div class="ln" style="top:330px;width:290px"></div><div class="ln" style="top:370px;width:200px"></div><p class="q">?</p></div>
<div class="ess" style="left:600px"><div class="face"></div>
<div class="ln" style="top:250px;width:300px"></div><div class="ln" style="top:290px;width:260px"></div><div class="ln" style="top:330px;width:290px"></div><div class="ln" style="top:370px;width:200px"></div><p class="q">?</p></div>
<p class="elbl" style="left:340px;width:400px">esai yang sama</p>
<p class="credit" style="top:1610px">Ilustrasi: Curioverse</p>'''

S['s2'] = cap('s2') + '''
<div class="card" id="s2card" style="left:80px;right:80px;top:820px;padding:56px 60px">
  <div class="tape" style="left:40px;top:-22px"></div>
  <p class="rk">Angkatan Darat AS · 1920</p>
  <p class="tr2" style="margin-top:18px">Yang dinilai: fisik, kecerdasan, kepemimpinan, karakter.</p>
  <p class="qq" style="margin-top:34px">"Terlalu tinggi dan terlalu seragam,"</p>
  <p class="qby">kata Thorndike soal kaitan antar-nilainya</p>
</div>
<p class="credit" style="top:1420px">Edward Thorndike, Journal of Applied Psychology, 1920</p>'''

S['s3'] = cap('s3') + '''
<div class="node n" style="top:820px">Wajah menarik</div>
<div class="vline" id="l1" style="top:950px;height:70px"></div>
<div class="node n" style="top:1030px">Dianggap berkepribadian baik</div>
<div class="vline" id="l2" style="top:1160px;height:70px"></div>
<div class="node n" style="top:1240px;background:var(--acc);color:var(--paper)">Karyanya ikut dinilai lebih bagus</div>
<p class="credit" style="top:1420px">Dion, Berscheid &amp; Walster, 1972 · Landy &amp; Sigall, 1974</p>'''

bars = ''
for i, ((lbl, v), w) in enumerate(zip(vals, bw)):
    top = 830 + i * 175
    col = 'var(--acc)' if i == 0 else ('rgba(94,79,140,.45)' if i == 1 else 'var(--red)')
    bars += f'<p class="blbl" style="top:{top}px">{lbl}</p><div class="bar" id="b{i}" style="top:{top+52}px;width:{w}px;background:{col}"></div><p class="bval" id="b{i}v" style="top:{top+50}px;left:{80+w+24}px">{str(v).replace(".", ",")}</p>'
S['s4'] = cap('s4') + bars + '''
<p class="credit" style="top:1380px">Nilai esai jelek, skala 1–9 · Landy &amp; Sigall, 1974 · 60 mahasiswa laki-laki</p>'''

S['s5'] = cap('s5') + '''
<div class="card" id="s5card" style="left:80px;right:80px;top:820px;padding:56px 60px">
  <div class="tape" style="left:40px;top:-22px"></div>
  <p class="rk">Pekerjaan yang dianggap maskulin</p>
  <p class="tr2" style="margin-top:18px">Sipir penjara · sopir truk derek · direktur keamanan · insinyur mesin</p>
  <p class="tr2" style="margin-top:28px;color:var(--acc)">Laki-laki menarik tidak kena penalti serupa.</p>
</div>
<p class="credit" style="top:1420px">Stefanie Johnson dkk., Journal of Social Psychology, 2010</p>'''

S['s6'] = cap('s6') + '''
<div class="card" id="s6card" style="left:80px;right:80px;top:820px;padding:56px 60px">
  <div class="tape" style="left:40px;top:-22px"></div>
  <p class="rk">Menaker Yassierli · Mei 2025</p>
  <p class="tr2" style="margin-top:18px">Syarat tinggi badan dan "harus single" juga dilarang.</p>
  <p class="qby">Surat Edaran Nomor M/6/HK.04/V/2025</p>
</div>'''

secs = ''
for k in range(6):
    sid = f's{k+1}'
    kk = '' if sid == 's1' else f'<div class="kicker"><i></i>{kick[sid]}</div>\n'
    secs += f'<section class="clip" data-start="{starts[k]:.2f}" data-duration="{ends[k]-starts[k]:.2f}" data-track-index="1"><div class="inner" id="{sid}">{kk}{S[sid]}</div></section>\n'

js = []
for k in range(1, 6):
    sid = f's{k+1}'
    t0 = starts[k]
    js.append(f"blurIn('#{sid} .kicker', {t0+0.05:.2f});")
    for i, (a, b) in enumerate(win[sid]):
        js.append(f"tl.fromTo('#{sid}c{i}', {{opacity:0,y:24}}, {{opacity:1,y:0,duration:.35,ease:'power3.out'}}, {a:.2f});")
        if b: js.append(f"tl.to('#{sid}c{i}', {{opacity:0,y:-20,duration:.25,ease:'power2.in'}}, {b:.2f});")
    js.append(f"blurIn('#{sid} .credit', {t0+1.2:.2f});")
for k in range(5):
    js.append(f"out('#s{k+1}', {ends[k]-0.4:.2f});")
js += [
 "tl.fromTo('#s2card', {opacity:0,y:60}, {opacity:1,y:0,duration:.6,ease:'back.out(1.6)'}, 4.0);",
 "tl.fromTo('#s3 .n', {opacity:0,x:-40}, {opacity:1,x:0,duration:.5,ease:'power3.out',stagger:1.2}, 13.9);",
 "tl.fromTo('#l1', {scaleY:0}, {scaleY:1,duration:.4}, 14.4); tl.fromTo('#l2', {scaleY:0}, {scaleY:1,duration:.4}, 15.6);",
 "blurIn('#s4 .blbl', 21.3, 0.3);",
 "tl.fromTo('#b1', {scaleX:0}, {scaleX:1,duration:.6,ease:'power3.out'}, 22.0); blurIn('#b1v', 22.4);",
 "tl.fromTo('#b0', {scaleX:0}, {scaleX:1,duration:.8,ease:'power3.out'}, 25.8); blurIn('#b0v', 26.4);",
 "tl.fromTo('#b2', {scaleX:0}, {scaleX:1,duration:.6,ease:'power3.out'}, 29.9); blurIn('#b2v', 30.4);",
 "tl.fromTo('#s5card', {opacity:0,y:60}, {opacity:1,y:0,duration:.6,ease:'back.out(1.6)'}, 32.1);",
 "tl.fromTo('#s6card', {opacity:0,y:60}, {opacity:1,y:0,duration:.6,ease:'back.out(1.6)'}, 39.2);",
]

html = f'''<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080, height=1920">
<title>Curioverse Reel · Efek halo</title>
{base}
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{D}" data-width="1080" data-height="1920">
  <audio id="bgm" src="assets/audio/bgm.wav" data-start="0" data-duration="{D}" data-track-index="9" data-volume="0.35"></audio>
  <audio id="vo" src="assets/audio/vo.mp3" data-start="0" data-duration="50.91" data-track-index="8" data-volume="1"></audio>
  <section class="clip bg" data-start="0" data-duration="{D}" data-track-index="0" data-layout-allow-overflow>
    <div class="grain" id="grain"></div>
    <svg class="star" id="st1" style="left:900px;top:250px" viewBox="-10 -10 20 20"><path d="M0-10C.9-3 3-.9 10 0 3 .9.9 3 0 10-.9 3-3 .9-10 0-3-.9-.9-3 0-10z"/></svg>
    <div class="band"></div>
  </section>
  <section class="clip" data-start="0" data-duration="{D}" data-track-index="2">
    <div class="chrome"><div class="tl">Curioverse · Psikologi</div><div class="tr" id="prog">01 / 06</div><div class="bl">curioverse</div><div class="br">a curious mind lives here</div></div>
  </section>
{secs}</div>
<script src="assets/vendor/gsap.min.js"></script>
<script>
const tl = gsap.timeline({{ paused: true }});
const blurIn = (sel, at, st = 0.07) => tl.fromTo(sel, {{ opacity: 0, y: 26, filter: 'blur(18px)' }}, {{ opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', stagger: st }}, at);
const out = (sel, at) => tl.fromTo(sel, {{ opacity: 1, y: 0 }}, {{ opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' }}, at);
const starts = {json.dumps(starts)};
starts.forEach((t, i) => tl.call(() => {{ document.getElementById('prog').textContent = '0' + (i + 1) + ' / 06'; }}, null, t + 0.01));
tl.fromTo('#grain', {{ x: 0, y: 0 }}, {{ x: -40, y: 30, duration: {D}, ease: 'none' }}, 0);
tl.fromTo('#st1', {{ rotation: 0 }}, {{ rotation: 120, duration: {D}, ease: 'none' }}, 0);
{chr(10).join(js)}
document.fonts.ready.then(() => {{ window.__timelines = window.__timelines || {{}}; window.__timelines["main"] = tl; }});
</script>
</body>
</html>
'''
open('index.html', 'w').write(html)
cues = [{"t":0.05,"kind":"pop"}]
for t in starts[1:]: cues.append({"t":t,"kind":"whoosh"})
cues += [{"t":4.0,"kind":"pop"},{"t":13.9,"kind":"pop"},{"t":15.1,"kind":"pop"},{"t":16.3,"kind":"pop"},
         {"t":22.0,"kind":"tick"},{"t":24.8,"kind":"rise","len":1.0},{"t":25.8,"kind":"tick"},{"t":29.9,"kind":"thud"},
         {"t":32.1,"kind":"pop"},{"t":39.2,"kind":"pop"},{"t":51.0,"kind":"ding"}]
json.dump(cues, open('cues.json', 'w'))
print('bars px', dict(zip([v for _, v in vals], bw)))
