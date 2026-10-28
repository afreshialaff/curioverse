import json, random
D = 53.6
VO = 52.42
base = open('base.css').read().replace('</style>', '''
.tr2{font:600 40px CvSans;color:var(--ink);line-height:1.45}
.big{position:absolute;left:80px;right:80px;font-family:CvSerif;font-size:210px;line-height:.95;color:var(--acc)}
.bigsub{position:absolute;left:84px;right:80px;font:600 46px CvSans;color:var(--ink)}
.imgcard{position:absolute;left:80px;right:80px;background:#E8E1D5;border-radius:28px;overflow:hidden;box-shadow:0 18px 50px rgba(27,26,23,.10)}
.imgcard img{display:block;width:100%}
.seg{position:absolute;height:84px;top:0;display:flex;align-items:center;padding-left:20px;font:700 34px CvMono;color:var(--paper);white-space:nowrap}
.barwrap{position:absolute;left:80px;width:860px;height:84px;border-radius:10px;overflow:hidden;transform-origin:left center}
.lg{position:absolute;left:80px;right:80px;font:500 32px CvSans;color:var(--ink);line-height:1.4}
.sw{display:inline-block;width:26px;height:26px;border-radius:6px;vertical-align:-3px;margin-right:12px}
.node{height:120px;font:600 42px CvSans;text-align:center;padding:0 30px;line-height:1.15}
.ocean{position:absolute;left:80px;top:830px;width:920px;height:600px;border-radius:28px;overflow:hidden;background:#C9D6DC}
.chrome{font-size:28px!important}
.credit{font-size:28px!important}
.olbl{position:absolute;font:600 28px CvMono;letter-spacing:.06em;color:#3D5568}
</style>''')

lines = {
 's2': ["Carey Morishige dari NOAA: tidak ada pulau sampah.", "Dari satelit pun tidak kelihatan."],
 's3': ["Arus samudra berputar pelan, seperti sup diaduk.", "Sampah terkumpul di tengah yang paling tenang.", "Kebanyakan mikroplastik, atau serpihan di bawah 5 milimeter."],
 's4': ["Studi 2018 memperkirakan 1,8 triliun keping plastik.", "Beratnya setidaknya 79.000 ton."],
 's5': ["Plot twist-nya: yang paling berat justru jaring ikan.", "Mikroplastik: 94% jumlah keping, cuma 8% berat."],
 's6': ["Hitungan Dianna Parker dari NOAA: 67 kapal setahun", "baru membersihkan kurang dari 1% Pasifik Utara.", "Kamu tadinya membayangkan pulau, atau sup?"],
}
# scene starts sit in the middle of the silences inserted into the VO
starts = [0, 3.38, 10.0, 21.92, 31.78, 41.25]
ends = starts[1:] + [D]
win = {
 's2': [(3.60, 7.50), (7.62, None)],
 's3': [(10.20, 14.00), (14.18, 17.30), (17.48, None)],
 's4': [(22.12, 27.60), (27.80, None)],
 's5': [(31.96, 35.50), (35.72, None)],
 's6': [(41.42, 45.40), (45.62, 49.20), (49.42, None)],
}
kick = {'s2': 'Sejak 1997', 's3': 'Caranya begini', 's4': 'Satu angka · studi 2018', 's5': 'Plot twist', 's6': 'Jadi'}

def cap(sid):
    return '<div class="capbox">' + ''.join(f'<p class="cap" id="{sid}c{i}">{t}</p>' for i, t in enumerate(lines[sid])) + '</div>'

# --- scene 1: schematic ocean with plastic specks (deterministic) ---
random.seed(28)
dots = ''
for i in range(170):
    if i < 120:
        x = random.gauss(460, 150); y = random.gauss(300, 85)
    else:
        x = random.uniform(30, 890); y = random.uniform(40, 560)
    if not (20 < x < 900 and 30 < y < 570): continue
    if (x < 400 and y < 85) or (x > 620 and y > 505): continue
    r = random.choice([4, 5, 6, 7, 9])
    dots += f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}"/>'
S = {}
S['s1'] = f'''<div class="kicker"><i></i>Lingkungan · Samudra Pasifik</div>
<h1 class="h" style="top:390px;font-size:104px">Pulau sampah di Pasifik,<br><span class="it" style="color:var(--acc)">beneran bisa diinjak?</span></h1>
<div class="ocean"><svg width="920" height="600" viewBox="0 0 920 600">
<ellipse id="gy" cx="460" cy="300" rx="380" ry="215" fill="none" stroke="#5B7C9A" stroke-width="12" stroke-linecap="round" stroke-dasharray="70 46"/>
<g fill="#9A3F2B" fill-opacity=".85">{dots}</g></svg>
<p class="olbl" style="left:32px;top:24px">Samudra Pasifik Utara</p><p class="olbl" style="right:32px;bottom:22px">skema, bukan peta</p></div>
<p class="credit" style="top:1460px">Ilustrasi: Curioverse · titik merah = sampah plastik</p>'''

S['s2'] = cap('s2') + '''
<div class="imgcard" id="s2img" style="top:790px;height:470px"><img src="assets/img/pulau.png" style="margin-top:-30px"></div>
<p class="tr2" id="s2t" style="position:absolute;left:80px;right:80px;top:1290px">Pertama dilaporkan Charles Moore pada 1997. NOAA adalah badan kelautan dan atmosfer AS.</p>
<p class="credit" style="top:1530px">Carey Morishige, blog NOAA Marine Debris, 2012 · Ilustrasi: Curioverse</p>'''

S['s3'] = cap('s3') + '''
<div class="node n" style="top:780px">Arus raksasa berputar pelan</div>
<div class="vline" id="l1" style="top:905px;height:40px"></div>
<div class="node n" style="top:950px">Sampah tergiring ke tengah yang tenang</div>
<div class="vline" id="l2" style="top:1075px;height:40px"></div>
<div class="node n" style="top:1120px;background:var(--acc);color:var(--paper)">Menyebar seperti merica di sup</div>
<div class="imgcard" id="s3img" style="top:1275px;left:310px;right:310px;height:300px;background:#E8E1D5"><img src="assets/img/mangkuk.png" style="width:460px;margin-top:-10px"></div>
<p class="credit" style="top:1590px">Perumpamaan: NOAA Marine Debris Program · Ilustrasi: Curioverse</p>'''

S['s4'] = cap('s4') + '''
<p class="big" id="s4big" style="top:780px">1,8 triliun</p>
<p class="bigsub" id="s4sub" style="top:990px">keping plastik, hasil perkiraan model</p>
<div class="card" id="s4card" style="left:80px;right:80px;top:1100px;padding:44px 56px">
  <div class="tape" style="left:40px;top:-22px"></div>
  <p class="rk">Berat</p><p class="tr2">setidaknya 79.000 ton</p>
  <p class="rk" style="margin-top:22px">Luas</p><p class="tr2">sekitar 1,6 juta km², kira-kira 3 kali daratan Prancis</p>
</div>
<p class="credit" style="top:1500px">Lebreton dkk., Scientific Reports, 22 Maret 2018 · data kapal 2015 dan pesawat 2016</p>'''

# bars: full width 860 px = 100 %
W = 860
micro_n = round(94 / 100 * W)      # 808
micro_w = round(8 / 100 * W)       # 69
net_w = round(46 / 100 * W)        # 396
rest_w = W - micro_w - net_w       # 395
BARS = dict(micro_n=micro_n, rest_n=W - micro_n, micro_w=micro_w, net_w=net_w, rest_w=rest_w)
S['s5'] = cap('s5') + f'''
<p class="blbl" style="top:790px">DIHITUNG PER KEPING</p>
<div class="barwrap" id="bA" style="top:840px;background:rgba(27,26,23,.18)">
  <div class="seg" style="left:0;width:{micro_n}px;background:var(--acc)">94% mikroplastik</div></div>
<p class="blbl" style="top:1000px">DITIMBANG BERATNYA</p>
<div class="barwrap" id="bB" style="top:1050px;background:rgba(27,26,23,.18)">
  <div class="seg" style="left:0;width:{micro_w}px;background:var(--acc);padding-left:0"></div>
  <div class="seg" style="left:{micro_w}px;width:{net_w}px;background:var(--red)">jaring ikan</div></div>
<p class="lg" id="lg" style="top:1170px"><span class="sw" style="background:var(--acc)"></span>mikroplastik: 8% berat<br><span class="sw" style="background:var(--red)"></span>jaring ikan: setidaknya 46% berat<br><span class="sw" style="background:rgba(27,26,23,.18)"></span>sisanya: benda plastik besar lain</p>
<p class="credit" style="top:1400px">Lebreton dkk., Scientific Reports, 2018 · lebar batang = persentase</p>'''

S['s6'] = cap('s6') + '''
<div class="card" id="s6card" style="left:80px;right:80px;top:820px;padding:52px 60px">
  <div class="tape" style="left:40px;top:-22px"></div>
  <p class="rk">Membersihkan pakai kapal</p>
  <p style="font-family:CvSerif;font-size:120px;line-height:1;color:var(--acc);margin-top:16px">67 kapal</p>
  <p class="tr2" style="margin-top:10px">bekerja selama setahun, untuk kurang dari 1% Samudra Pasifik Utara</p>
  <p class="qby">Dianna Parker, NOAA Marine Debris Program · podcast NOAA, 2014</p>
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
        js.append(f"tl.fromTo('#{sid}c{i}', {{opacity:0,y:24}}, {{opacity:1,y:0,duration:.3,ease:'power3.out'}}, {a:.2f});")
        if b: js.append(f"tl.to('#{sid}c{i}', {{opacity:0,y:-20,duration:.2,ease:'power2.in'}}, {b:.2f});")
    if 'class="credit"' in S[sid]: js.append(f"blurIn('#{sid} .credit', {t0+1.0:.2f});")
for k in range(5):
    js.append(f"out('#s{k+1}', {ends[k]-0.35:.2f});")
js += [
 "tl.fromTo('#gy', {attr:{'stroke-dashoffset':0}}, {attr:{'stroke-dashoffset':-460}, duration:3.4, ease:'none'}, 0);",
 "tl.fromTo('#s2img', {opacity:0,y:50}, {opacity:1,y:0,duration:.5,ease:'power3.out'}, 4.2);",
 "blurIn('#s2t', 4.6);",
 "tl.fromTo('#s3 .n', {opacity:0,x:-40}, {opacity:1,x:0,duration:.45,ease:'power3.out',stagger:1.6}, 10.6);",
 "tl.fromTo('#l1', {scaleY:0}, {scaleY:1,duration:.35}, 11.2); tl.fromTo('#l2', {scaleY:0}, {scaleY:1,duration:.35}, 12.8);",
 "tl.fromTo('#s3img', {opacity:0,y:40}, {opacity:1,y:0,duration:.5,ease:'power3.out'}, 14.4);",
 "tl.fromTo('#s4big', {opacity:0,scale:.85}, {opacity:1,scale:1,duration:.6,ease:'back.out(1.6)',transformOrigin:'left center'}, 23.7);",
 "blurIn('#s4sub', 24.3);",
 "tl.fromTo('#s4card', {opacity:0,y:60}, {opacity:1,y:0,duration:.6,ease:'back.out(1.4)'}, 26.9);",
 "blurIn('#s5 .blbl', 32.3, 0.9);",
 "tl.fromTo('#bA', {scaleX:0}, {scaleX:1,duration:.7,ease:'power3.out'}, 32.5);",
 "tl.fromTo('#bB', {scaleX:0}, {scaleX:1,duration:.7,ease:'power3.out'}, 33.4);",
 "blurIn('#lg', 36.0);",
 "tl.fromTo('#s6card', {opacity:0,y:60}, {opacity:1,y:0,duration:.6,ease:'back.out(1.6)'}, 42.2);",
]

html = f'''<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1080, height=1920">
<title>Curioverse Reel · Great Pacific Garbage Patch</title>
{base}
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{D}" data-width="1080" data-height="1920">
  <audio id="bgm" src="assets/audio/bgm.wav" data-start="0" data-duration="{D}" data-track-index="9" data-volume="0.35"></audio>
  <audio id="vo" src="assets/audio/vo.mp3" data-start="0" data-duration="{VO}" data-track-index="8" data-volume="1"></audio>
  <section class="clip bg" data-start="0" data-duration="{D}" data-track-index="0" data-layout-allow-overflow>
    <div class="grain" id="grain"></div>
    <svg class="star" id="st1" style="left:900px;top:250px" viewBox="-10 -10 20 20"><path d="M0-10C.9-3 3-.9 10 0 3 .9.9 3 0 10-.9 3-3 .9-10 0-3-.9-.9-3 0-10z"/></svg>
    <div class="band"></div>
  </section>
  <section class="clip" data-start="0" data-duration="{D}" data-track-index="2">
    <div class="chrome"><div class="tl">Curioverse · Lingkungan</div><div class="tr" id="prog">01 / 06</div><div class="bl">curioverse</div><div class="br">a curious mind lives here</div></div>
  </section>
{secs}</div>
<script src="assets/vendor/gsap.min.js"></script>
<script>
const tl = gsap.timeline({{ paused: true }});
const blurIn = (sel, at, st = 0.07) => tl.fromTo(sel, {{ opacity: 0, y: 26, filter: 'blur(18px)' }}, {{ opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out', stagger: st }}, at);
const out = (sel, at) => tl.fromTo(sel, {{ opacity: 1, y: 0 }}, {{ opacity: 0, y: -30, duration: 0.35, ease: 'power2.in' }}, at);
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
cues = [{"t": 0.05, "kind": "pop"}]
for t in starts[1:]: cues.append({"t": t, "kind": "whoosh"})
cues += [{"t": 4.2, "kind": "pop"}, {"t": 10.6, "kind": "pop"}, {"t": 12.2, "kind": "pop"}, {"t": 13.8, "kind": "pop"},
         {"t": 23.2, "kind": "rise", "len": 0.5}, {"t": 23.7, "kind": "tick"}, {"t": 26.9, "kind": "pop"},
         {"t": 32.5, "kind": "tick"}, {"t": 33.4, "kind": "thud"}, {"t": 42.2, "kind": "pop"}, {"t": 52.6, "kind": "ding"}]
json.dump(cues, open('cues.json', 'w'))
print('bars px', BARS)
