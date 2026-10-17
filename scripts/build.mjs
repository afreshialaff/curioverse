// Builds the static Curioverse site into ./dist. No dependencies: `node scripts/build.mjs`.
import { mkdirSync, rmSync, writeFileSync, copyFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATS, ORDER, A, HOLES, TOPIC_DESC, KINDS, SOURCES, CURATORS, FEATURED } from "../content/stories.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");
const SITE = (process.env.SITE_URL || "https://curioverse-beta.vercel.app").replace(/\/$/, "");
const V = Date.now().toString(36); // cache-busting for /assets

/* ---------- helpers ---------- */
const BY = Object.fromEntries(A.map(a => [a.id, a]));
const BULAN = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const fmtDate = d => { const [y, m, dd] = d.split("-").map(Number); return `${dd} ${BULAN[m - 1]} ${y}`; };
const words = a => (a.dek + " " + a.s.map(x => x[0] + " " + x[1].join(" ")).join(" ")).split(/\s+/).length;
const mins = a => Math.max(1, Math.round(words(a) / 200));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const icon = (id, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const badge = c => `<span class="badge" data-c="${c}">${icon(c)}${CATS[c].label}</span>`;
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const latest = A.slice().sort((x, y) => y.date.localeCompare(x.date));
const countFor = c => A.filter(a => a.cat === c || a.also === c).length;
const holeOf = id => HOLES.find(h => h.ids.includes(id));
const KIND_LABEL = { fakta:"Fakta", interpretasi:"Interpretasi", opini:"Opini kita" };
A.forEach(a => { a.min = mins(a); });

/* ---------- shared fragments ---------- */
const ICONS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-finance" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v4c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 10v4c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-4"/><path d="M5 14v4c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-4"/></symbol>
<symbol id="i-science" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/></symbol>
<symbol id="i-sejarah" viewBox="0 0 24 24"><path d="M6 3h12M6 21h12"/><path d="M7 3c0 5 10 5 10 9s-10 4-10 9"/><path d="M17 3c0 5-10 5-10 9s10 4 10 9"/><path d="M9.5 18.5h5"/></symbol>
<symbol id="i-biografi" viewBox="0 0 24 24"><path d="M20 4c-7 0-12 5-13 12l-2 4"/><path d="M20 4c0 6-4 11-11 12"/><path d="M9 11h5M8 14h3"/></symbol>
<symbol id="i-market" viewBox="0 0 24 24"><path d="M3 17l5-5 4 3 7-8"/><path d="M15 7h4v4"/><path d="M3 21h18"/></symbol>
<symbol id="i-saham" viewBox="0 0 24 24"><path d="M7 3v4M7 15v5M17 5v3M17 17v3"/><rect x="5" y="7" width="4" height="8" rx=".6"/><rect x="15" y="8" width="4" height="9" rx=".6"/></symbol>
<symbol id="i-global" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></symbol>
<symbol id="i-dice" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r=".9" fill="currentColor"/><circle cx="15" cy="15" r=".9" fill="currentColor"/><circle cx="15" cy="9" r=".9" fill="currentColor"/><circle cx="9" cy="15" r=".9" fill="currentColor"/><circle cx="12" cy="12" r=".9" fill="currentColor"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
<symbol id="star4" viewBox="-10 -10 20 20"><path d="M0-10C.9-3 3-.9 10 0 3 .9.9 3 0 10-.9 3-3 .9-10 0-3-.9-.9-3 0-10z" stroke="none"/></symbol>
</defs></svg>`;

const MONO = `<svg viewBox="0 0 64 64" aria-hidden="true">
<text x="32" y="47" text-anchor="middle" style="font:800 46px var(--font-display); fill:var(--fg)">C</text>
<ellipse cx="32" cy="34" rx="27" ry="10" transform="rotate(-24 32 34)" fill="none" stroke="var(--accent)" stroke-width="1.6"/>
<use href="#star4" x="27" y="25" width="10" height="10" fill="var(--accent)"/></svg>`;

const NAV = [
  { href:"/explore", label:"Explore", desc:"Semua cerita, filter per topik" },
  { href:"/lab", label:"Lab", desc:"Simulasi interaktif: bunga majemuk, candlestick, cahaya" },
  { href:"/reading-paths", label:"Reading Paths", desc:"Rabbit Holes: seri cerita yang saling nyambung" }
];

function header(active){
  return `<a class="skip" href="#main">Langsung ke konten</a>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="/" aria-label="Curioverse, ke beranda">${MONO}<b>Curioverse</b></a>
    <nav class="nav" aria-label="Navigasi utama">${NAV.map(n => `<a href="${n.href}"${active === n.href ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}</nav>
    <button class="kpill" type="button" data-search aria-label="Search: cari cerita (Ctrl K)">${icon("search")}<span>Search</span><kbd data-kbd>Ctrl K</kbd></button>
    <button class="iconbtn search-m" type="button" data-search aria-label="Search: cari cerita">${icon("search")}</button>
    <button class="iconbtn" type="button" data-theme-toggle aria-label="Ganti tema terang atau gelap">${icon("moon", "ico t-moon")}${icon("sun", "ico t-sun")}</button>
    <button class="menu-btn" type="button" data-menu aria-haspopup="dialog" aria-controls="menu">${icon("menu")}Menu</button>
  </div>
  <div class="progress" data-progress aria-hidden="true" hidden></div>
</header>`;
}

function dialogs(){
  const pop = ["langit","bullbear","kartini","majemuk"];
  return `<dialog class="sheet" id="menu" aria-label="Menu">
  <div class="sheet-top"><a class="brand" href="/" aria-label="Curioverse, ke beranda">${MONO}<b>Curioverse</b></a><button class="iconbtn" type="button" data-close aria-label="Tutup menu">${icon("close")}</button></div>
  <nav aria-label="Menu utama">
    ${NAV.map(n => `<a href="${n.href}"><b>${n.label}</b><span>${n.desc}</span></a>`).join("")}
  </nav>
  <div class="sub">
    <button class="chip" type="button" data-search>${icon("search")}Search</button>
    <button class="chip" type="button" data-surprise>${icon("dice")}Surprise Me</button>
    <a class="chip" href="/explore?topik=global">Radar Global</a>
    <a class="chip" href="/#kurator">Tentang kami</a>
  </div>
</dialog>
<dialog class="search" id="search" aria-label="Cari cerita">
  <div class="s-in">
    <div class="s-head">
      ${icon("search")}
      <label class="sr" for="sq">Cari cerita</label>
      <input id="sq" type="search" placeholder="Cari topik, tokoh, atau istilah" autocomplete="off" enterkeyhint="search" role="combobox" aria-expanded="true" aria-controls="sres" aria-autocomplete="list">
      <button class="iconbtn" type="button" data-close aria-label="Tutup pencarian">${icon("close")}</button>
    </div>
    <div class="s-body">
      <div id="sres-wrap" hidden>
        <p class="s-label" id="scount" aria-live="polite"></p>
        <ul class="s-list" id="sres" role="listbox" aria-labelledby="scount"></ul>
      </div>
      <div id="sempty">
        <p class="s-label">Pertanyaan populer</p>
        <ul class="s-list">${pop.map(id => `<li><a href="/stories/${id}">${icon(BY[id].cat)}<span><span class="tt">${esc(BY[id].title)}</span><span class="mm">${CATS[BY[id].cat].label} · ${BY[id].min} menit</span></span></a></li>`).join("")}</ul>
        <p class="s-label">Topik</p>
        <div class="s-chips">${ORDER.map(c => `<a class="chip" href="/explore?topik=${c}" style="--dotc:var(--c-${c})"><span class="dot" aria-hidden="true"></span>${CATS[c].label}</a>`).join("")}</div>
        <p class="s-label">Lagi bingung mau baca apa?</p>
        <button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button>
      </div>
      <div id="snone" class="empty" hidden>
        <h3>Belum ada cerita soal "<span id="sq-echo"></span>".</h3>
        <p>Coba kata yang lebih umum, pilih topik, atau biarin Curioverse milihin.</p>
        <div class="chips-row">${["saham","bintang","Kartini","inflasi"].map(w => `<button class="chip" type="button" data-q="${w}">${w}</button>`).join("")}</div>
        <button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button>
      </div>
    </div>
    <div class="s-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> pilih</span><span><kbd>Enter</kbd> buka</span><span><kbd>Esc</kbd> tutup</span></div>
  </div>
</dialog>`;
}

function footer(){
  return `<footer class="foot">
  <div class="wrap">
    <div class="wordmark" role="img" aria-label="Curioverse, a curious mind lives here">
      <svg viewBox="0 0 900 260" aria-hidden="true">
        <path class="orb" d="M60 168 C 40 40, 860 20, 846 120 C 836 196, 380 238, 120 206"/>
        <text class="wm" x="450" y="160" text-anchor="middle">CURIOVERSE</text>
        <text class="tag" x="450" y="232" text-anchor="middle">A CURIOUS MIND LIVES HERE</text>
        <use class="sp" href="#star4" x="430" y="4" width="40" height="40"/><use class="sp" href="#star4" x="772" y="28" width="26" height="26"/><use class="sp" href="#star4" x="84" y="182" width="22" height="22"/><circle class="sp" cx="846" cy="120" r="6"/>
      </svg>
    </div>
    <div class="foot-row">
      <svg class="stamp" viewBox="0 0 140 140" aria-hidden="true"><defs><path id="ring" d="M70 70 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0"/></defs>
        <circle cx="70" cy="70" r="66" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="70" cy="70" r="40" fill="none" stroke="currentColor" stroke-width=".8"/>
        <text><textPath href="#ring" textLength="320" lengthAdjust="spacing">CURIOVERSE · A CURIOUS MIND LIVES HERE ·</textPath></text>
        <ellipse cx="70" cy="70" rx="34" ry="12" transform="rotate(-24 70 70)" fill="none" stroke="var(--accent)" stroke-width="1.2"/><use href="#star4" x="56" y="56" width="28" height="28" fill="var(--accent)"/></svg>
      <nav class="foot-links" aria-label="Navigasi footer">
        <a href="/explore">Explore</a><a href="/lab">Lab</a><a href="/reading-paths">Reading Paths</a><a href="/explore?topik=global">Radar Global</a><a href="/#kurator">Tentang kami</a>
        <button type="button" data-surprise>Surprise Me</button>
      </nav>
    </div>
    <p class="fine">© 2026 ${esc(CURATORS)} · Konten finance, market, dan saham buat belajar, bukan saran investasi.</p>
  </div>
</footer>`;
}

const INDEX = JSON.stringify(A.map(a => ({ id:a.id, c:a.cat, t:a.title, d:a.dek, m:a.min, dt:a.date,
  h:norm([a.title, a.dek, a.tags, CATS[a.cat].label, a.also ? CATS[a.also].label : "", a.s.map(x => x[0]).join(" ")].join(" ")) })));

function page({ path, title, desc, body, active = "", scripts = [], jsonld = null, ogType = "website" }){
  const url = SITE + (path === "/" ? "/" : path);
  const fullTitle = path === "/" ? "Curioverse · A curious mind lives here" : `${title} · Curioverse`;
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Curioverse">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#EAE3D5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1B1A17" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:opsz,wght@9..40,500;9..40,600;9..40,700&display=swap">
<link rel="stylesheet" href="/assets/styles.css?v=${V}">
<script>try{var t=localStorage.getItem("cv-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
${ICONS}
${header(active)}
<main id="main">
${body}
</main>
${footer()}
${dialogs()}
<script type="application/json" id="cv-index">${INDEX.replace(/</g, "\\u003c")}</script>
<script src="/assets/app.js?v=${V}" defer></script>
${scripts.map(s => `<script src="/assets/${s}?v=${V}" defer></script>`).join("\n")}
</body>
</html>
`;
}

/* ---------- components ---------- */
const card = (a, extra = "") => `<article class="card${extra}" data-id="${a.id}" data-c="${a.cat}" data-also="${a.also || ""}" data-date="${a.date}" data-min="${a.min}" data-title="${esc(a.title)}" data-h="${esc(norm([a.title, a.dek, a.tags, CATS[a.cat].label, a.also ? CATS[a.also].label : ""].join(" ")))}">
  ${badge(a.cat)}
  <h3><a href="/stories/${a.id}">${esc(a.title)}</a></h3>
  <p class="dek">${esc(a.dek)}</p>
  <div class="meta"><span>${a.min} menit baca</span><span aria-hidden="true">·</span><time datetime="${a.date}">${fmtDate(a.date)}</time></div>
</article>`;

function constellation(h, w = 370, ht = 160){
  const d = h.pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  let len = 0; for (let i = 1; i < h.pts.length; i++) len += Math.hypot(h.pts[i][0] - h.pts[i-1][0], h.pts[i][1] - h.pts[i-1][1]);
  return `<svg class="const" viewBox="0 0 ${w} ${ht}" aria-hidden="true"><path class="ln" d="${d}" style="--len:${Math.ceil(len)}"/>${h.pts.map((p, i) => `<use class="st" href="#star4" x="${p[0]-9}" y="${p[1]-9}" width="18" height="18"/><text x="${p[0]}" y="${p[1] + (p[1] > 100 ? -16 : 28)}" text-anchor="middle">${i + 1}</text>`).join("")}</svg>`;
}
const pathMinutes = h => h.ids.reduce((s, id) => s + BY[id].min, 0);

/* ---------- pages ---------- */
function home(){
  const F = BY[FEATURED];
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">A CURIOUS MIND LIVES HERE</p>
      <h1 class="split" data-split>Welcome to the curious side of the universe.</h1>
      <p class="lede">Science, history, money, human stories, and everything in between. Follow your curiosity.</p>
      <div class="cta">
        <a class="btn btn-primary" href="/explore">Explore Stories</a>
        <button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button>
      </div>
      <p class="hero-note"><b>${A.length}</b> cerita · <b>${ORDER.length}</b> topik · <b>${HOLES.length}</b> reading paths · dikurasi ${esc(CURATORS)}</p>
    </div>
    <div class="hero-visual" id="orrery" aria-hidden="true">
      <svg class="poster" viewBox="0 0 400 400">
        <g class="orbit-spin" fill="none" stroke="var(--line-strong)" stroke-width="1">
          ${[70,100,130,160,190].map((r, i) => `<ellipse cx="200" cy="200" rx="${r}" ry="${Math.round(r*.42)}" transform="rotate(-14 200 200)"/>`).join("")}
        </g>
        <use href="#star4" x="170" y="170" width="60" height="60" fill="var(--accent)"/>
      </svg>
      <canvas></canvas>
      <div class="tip" data-tip></div>
    </div>
  </div>
</section>

<section class="sec" id="topik" aria-labelledby="h-topik">
  <div class="wrap">
    <div class="sec-head"><div><h2 id="h-topik">Explore by topic</h2><p>Pilih satu yang paling bikin kamu kepo duluan.</p></div></div>
    <div class="topics">
      ${ORDER.map(c => `<a class="topic rv" href="/explore?topik=${c}" style="--tc:var(--c-${c})"><span class="ti">${icon(c)}</span><b>${CATS[c].label}</b><span>${TOPIC_DESC[c]}</span><span class="n">${countFor(c)}</span></a>`).join("")}
      <button class="topic alt rv" type="button" data-surprise><span class="ti">${icon("dice")}</span><b>Surprise Me</b><span>Biarin semesta yang milih cerita buat kamu</span></button>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="h-pick">
  <div class="wrap">
    <div class="sec-head"><div><h2 id="h-pick">Editor's pick</h2><p>Mulai dari sini kalau baru pertama mampir.</p></div></div>
    <article class="pick rv">
      <div class="pick-art" aria-hidden="true">
        <svg viewBox="0 0 400 400">
          <ellipse cx="200" cy="200" rx="185" ry="70" transform="rotate(-18 200 200)" fill="none" stroke="currentColor" stroke-width="1.4"/>
          <ellipse cx="200" cy="200" rx="150" ry="150" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="2 7" opacity=".7"/>
          <text class="yr" x="200" y="238" text-anchor="middle">1637</text>
          <use href="#star4" x="300" y="70" width="34" height="34" fill="currentColor"/><use href="#star4" x="70" y="290" width="20" height="20" fill="currentColor"/>
          <circle cx="380" cy="168" r="7" fill="currentColor"/>
        </svg>
      </div>
      <div>
        <div class="meta">${badge(F.cat)}<span>${F.min} menit baca</span><span aria-hidden="true">·</span><time datetime="${F.date}">${fmtDate(F.date)}</time></div>
        <h3><a href="/stories/${F.id}">${esc(F.title)}</a></h3>
        <p class="dek">${esc(F.dek)}</p>
        <span class="btn btn-primary fake-btn" aria-hidden="true">Baca ceritanya</span>
      </div>
    </article>
  </div>
</section>

<section class="sec" aria-labelledby="h-latest">
  <div class="wrap">
    <div class="sec-head"><div><h2 id="h-latest">Latest stories</h2><p>Yang paling baru kita tulis.</p></div><a class="link" href="/explore">Lihat semua ${A.length} cerita</a></div>
    <div class="grid">${latest.filter(a => a.id !== FEATURED).slice(0, 6).map(a => card(a, " rv")).join("")}</div>
  </div>
</section>

<section class="sec band" aria-labelledby="h-lab">
  <div class="wrap">
    <div class="sec-head"><div><h2 id="h-lab">Lab Kepo</h2><p>Belajar paling nempel itu sambil main. Tiga simulasi kecil yang jalan di browser kamu.</p></div><a class="link" href="/lab">Buka Lab</a></div>
    <div class="labs">
      <a class="labcard rv" href="/lab#bunga">
        <svg class="mini" viewBox="0 0 300 96" aria-hidden="true">${Array.from({ length:12 }, (_, i) => { const dep = 10 + i * 4, tot = dep + Math.round(Math.pow(1.22, i) * 3); return `<rect x="${8 + i * 24}" y="${92 - tot}" width="16" height="${tot - dep}" fill="var(--accent)" rx="1.5"/><rect x="${8 + i * 24}" y="${92 - dep}" width="16" height="${dep}" fill="var(--up)" rx="1.5"/>`; }).join("")}</svg>
        <b>Bunga majemuk</b><span>Geser setoran dan waktu, lihat duitmu beranak.</span><em>Coba simulasinya</em>
      </a>
      <a class="labcard rv" href="/lab#candlestick">
        <svg class="mini" viewBox="0 0 300 96" aria-hidden="true"><line x1="110" y1="6" x2="110" y2="90" stroke="var(--up)" stroke-width="3"/><rect x="96" y="22" width="28" height="50" rx="2" fill="var(--up)"/><line x1="190" y1="10" x2="190" y2="92" stroke="var(--down)" stroke-width="3"/><rect x="176" y="26" width="28" height="44" rx="2" fill="var(--card)" stroke="var(--down)" stroke-width="3"/></svg>
        <b>Anatomi candlestick</b><span>Pencet tiap bagian lilin: open, high, low, close.</span><em>Coba simulasinya</em>
      </a>
      <a class="labcard rv" href="/lab#cahaya">
        <svg class="mini" viewBox="0 0 300 96" aria-hidden="true"><line x1="24" y1="48" x2="276" y2="48" stroke="var(--line-strong)" stroke-dasharray="2 6" stroke-width="2"/><circle cx="24" cy="48" r="12" fill="var(--science)"/><circle cx="150" cy="48" r="5" fill="var(--accent-text)"/><use href="#star4" x="256" y="28" width="40" height="40" fill="var(--accent)"/></svg>
        <b>Delay cahaya</b><span>Dari Bulan sampai Andromeda, berapa lama cahaya jalan?</span><em>Coba simulasinya</em>
      </a>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="h-paths">
  <div class="wrap">
    <div class="sec-head"><div><h2 id="h-paths">Reading Paths</h2><p>Rabbit Holes: seri cerita yang saling nyambung. Baca cerita pertama, lanjut terus sampai habis.</p></div><a class="link" href="/reading-paths">Semua reading paths</a></div>
    <div class="paths">
      ${HOLES.map(h => `<article class="path rv">${constellation(h)}<h3>${esc(h.title)}</h3><p>${esc(h.dek)}</p><p class="meta">${h.ids.length} cerita · sekitar ${pathMinutes(h)} menit</p><div class="path-actions"><a class="btn btn-ghost" href="/stories/${h.ids[0]}">Mulai dari cerita 1</a><a class="link" href="/reading-paths#${h.id}">Lihat urutannya</a></div></article>`).join("")}
    </div>
  </div>
</section>

<section class="sec" id="kurator" aria-labelledby="h-kurator">
  <div class="wrap curators">
    <div class="letter rv">
      <div class="sec-head" style="margin-bottom:var(--s-5)"><div><h2 id="h-kurator">Kenalan sama kuratornya</h2></div></div>
      <p>Kita AfreshiaLa dan LeoFa. Dua orang yang sama-sama nggak bisa diem kalau nemu fakta random, dan selalu pengin langsung share ke satu sama lain.</p>
      <p>Curioverse itu tempat kita nyimpen semua "eh tau nggak sih" itu biar nggak tenggelam di chat. Kalau kamu ikut kepo, welcome. A curious mind lives here, dan sekarang kamu juga.</p>
    </div>
    <div class="people rv">
      <div class="person"><span class="av" aria-hidden="true">A</span><span><b>AfreshiaLa</b><small>Co-curator</small></span></div>
      <div class="person"><span class="av" aria-hidden="true">L</span><span><b>LeoFa</b><small>Co-curator</small></span></div>
    </div>
  </div>
</section>`;
  return page({ path:"/", title:"Curioverse", desc:"Science, history, money, human stories, and everything in between. Rak pengetahuan pribadi AfreshiaLa & LeoFa.", body, scripts:["home.js"],
    jsonld:{ "@context":"https://schema.org", "@type":"WebSite", name:"Curioverse", url:SITE + "/", inLanguage:"id",
      potentialAction:{ "@type":"SearchAction", target:SITE + "/explore?q={search_term_string}", "query-input":"required name=search_term_string" } } });
}

function explore(){
  const body = `
<div class="wrap page-head">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span aria-hidden="true">/</span><span>Explore</span></nav>
  <h1>Explore stories</h1>
  <p>Semua cerita Curioverse. Filter per topik, cari kata kunci, atau urutkan biar yang singkat duluan.</p>
</div>
<section class="wrap" aria-label="Daftar cerita" style="padding-bottom:var(--s-8)">
  <div class="controls">
    <div class="scroller"><div class="chips" id="chips" role="group" aria-label="Filter topik">
      <button class="chip" type="button" data-cat="all" aria-pressed="true">Semua <span class="n">${A.length}</span></button>
      ${ORDER.map(c => `<button class="chip" type="button" data-cat="${c}" aria-pressed="false" style="--dotc:var(--c-${c})"><span class="dot" aria-hidden="true"></span>${CATS[c].label} <span class="n">${countFor(c)}</span></button>`).join("")}
    </div></div>
    <div class="filters">
      <label class="field" for="q">${icon("search")}<span class="sr">Cari di daftar cerita</span><input id="q" type="search" placeholder="Cari: saham, bintang, Kartini" autocomplete="off" enterkeyhint="search"></label>
      <div class="select"><label class="sr" for="sort">Urutkan</label><select id="sort"><option value="new">Terbaru dulu</option><option value="short">Paling singkat dulu</option><option value="az">Judul A sampai Z</option></select></div>
    </div>
    <div class="active-bar" id="active" aria-live="polite"><span id="count">Menampilkan ${A.length} cerita</span></div>
  </div>
  <div class="note-box" id="digest" hidden><b>Digest mingguan Radar Global</b><p>Edisi pertama lagi diracik dan belum ada isinya. Nanti di sini muncul rangkuman berita dunia minggu itu, lengkap dengan link sumber aslinya. Sementara itu, ini bekal buat baca berita global.</p></div>
  <div class="grid" id="results">${latest.map(a => card(a)).join("")}</div>
  <div class="empty" id="none" hidden>
    <h2>Belum ketemu yang cocok.</h2>
    <p id="none-msg">Coba kata yang lebih umum atau pilih topik lain.</p>
    <div class="chips-row">${["saham","bintang","Kartini","inflasi"].map(w => `<button class="chip" type="button" data-try="${w}">${w}</button>`).join("")}</div>
    <div class="cta" style="margin-top:0"><button class="btn btn-ghost" type="button" id="reset">Reset filter</button><button class="btn btn-primary" type="button" data-surprise>${icon("dice")}Surprise Me</button></div>
  </div>
</section>`;
  return page({ path:"/explore", title:"Explore stories", desc:`Semua ${A.length} cerita Curioverse: finance, science, sejarah, biografi, market, saham, dan global news.`, body, active:"/explore", scripts:["explore.js"] });
}

function paths(){
  const body = `
<div class="wrap page-head">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span aria-hidden="true">/</span><span>Reading Paths</span></nav>
  <h1>Reading Paths</h1>
  <p>Kita nyebutnya Rabbit Holes: seri cerita yang saling nyambung. Baca dari nomor 1, dan di akhir tiap cerita ada tombol buat lanjut ke cerita berikutnya.</p>
</div>
<div class="wrap" style="padding-bottom:var(--s-8)">
  ${HOLES.map(h => `<section class="path-full rv" id="${h.id}" aria-labelledby="h-${h.id}">
    <div><h2 id="h-${h.id}">${esc(h.title)}</h2><p>${esc(h.dek)}</p><p class="meta" style="margin-top:var(--s-3)">${h.ids.length} cerita · sekitar ${pathMinutes(h)} menit</p>${constellation(h)}<div class="path-actions" style="margin-top:var(--s-4)"><a class="btn btn-primary" href="/stories/${h.ids[0]}">Mulai dari cerita 1</a></div></div>
    <ol class="steps">${h.ids.map(id => `<li><a href="/stories/${id}"><span class="t">${esc(BY[id].title)}</span><span class="m">${BY[id].min} mnt</span></a></li>`).join("")}</ol>
  </section>`).join("")}
</div>`;
  return page({ path:"/reading-paths", title:"Reading Paths", desc:"Rabbit Holes Curioverse: seri cerita yang saling nyambung, dari bunga tulip ke bursa saham sampai cahaya bintang.", body, active:"/reading-paths" });
}

function lab(){
  const body = `
<div class="wrap page-head">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span aria-hidden="true">/</span><span>Lab</span></nav>
  <h1>Lab Kepo</h1>
  <p>Tiga simulasi kecil buat ngerti konsep yang biasanya cuma dijelasin pakai teks. Semua bisa dipakai pakai mouse, sentuhan, atau keyboard.</p>
</div>
<nav class="lab-nav" aria-label="Lompat ke simulasi"><div class="wrap scroller"><div class="chips">
  <a class="chip" href="#bunga">${icon("finance")}Bunga majemuk</a><a class="chip" href="#candlestick">${icon("saham")}Anatomi candlestick</a><a class="chip" href="#cahaya">${icon("science")}Delay cahaya</a>
</div></div></nav>

<section class="lab-sec" id="bunga" aria-labelledby="h-bunga"><div class="wrap">
  <h2 id="h-bunga">Bunga majemuk: duit kamu, kalau dikasih waktu</h2>
  <p>Ubah angkanya pakai slider atau ketik langsung. Hasil dan grafiknya ikut berubah. Konsepnya dijelasin di cerita <a href="/stories/majemuk">Bunga majemuk</a>.</p>
  <div class="panel"><div class="panel-grid">
    <div class="stack">
      ${[["start","Setoran awal","Rp",0,100000000,500000,5000000],["month","Nabung per bulan","Rp",0,10000000,100000,500000],["rate","Bunga per tahun","%",1,15,.5,6],["years","Lama waktu","tahun",1,40,1,15]].map(([k,l,u,mn,mx,st,v]) => `<div class="ctrl">
        <div class="ctrl-top"><label for="r-${k}">${l}</label><label class="num" for="n-${k}">${u === "Rp" ? "<span>Rp</span>" : ""}<input id="n-${k}" type="text" inputmode="${u === "%" ? "decimal" : "numeric"}" aria-label="${l} (angka)">${u !== "Rp" ? `<span>${u}</span>` : ""}</label></div>
        <input id="r-${k}" type="range" min="${mn}" max="${mx}" step="${st}" value="${v}">
      </div>`).join("")}
      <p class="note">Simulasi bunga majemuk bulanan dengan angka contoh. Bukan saran investasi: aslinya ada inflasi, pajak, biaya, dan return yang naik turun.</p>
    </div>
    <div class="stack">
      <div class="big-out"><span class="l">Total di akhir periode</span><span class="v" id="o-total">Rp0</span></div>
      <dl class="kv">
        <div><dt>Total yang kamu setor</dt><dd id="o-dep">Rp0</dd></div>
        <div><dt>Hasil dari bunga</dt><dd id="o-int">Rp0</dd></div>
        <div><dt>Rule of 72: dobel tiap</dt><dd id="o-72">-</dd></div>
        <div><dt>Porsi dari bunga</dt><dd id="o-share">-</dd></div>
      </dl>
      <svg class="chart" id="chart" viewBox="0 0 600 260" role="img" aria-label="Grafik saldo per tahun"></svg>
      <div class="legend"><span><i style="background:var(--up)"></i>Setoran kamu</span><span><i style="background:var(--accent)"></i>Bunga yang numpuk</span></div>
      <p class="summary" id="o-sum" aria-live="polite"></p>
    </div>
  </div></div>
</div></section>

<section class="lab-sec" id="candlestick" aria-labelledby="h-candle"><div class="wrap">
  <h2 id="h-candle">Anatomi candlestick: satu lilin, empat harga</h2>
  <p>Pilih bagian lilinnya, lewat tombol atau langsung di gambar. Bacaan lengkapnya ada di <a href="/stories/candle">Cara baca candlestick</a>.</p>
  <div class="panel"><div class="panel-grid">
    <div class="stack">
      <div class="parts" id="parts" role="group" aria-label="Bagian candlestick">${["high","open","close","low","body","wick"].map(p => `<button class="chip" type="button" data-part="${p}" aria-pressed="false">${p[0].toUpperCase() + p.slice(1)}</button>`).join("")}</div>
      <div class="explain" id="explain" aria-live="polite"><b>Mulai dari mana aja.</b> Tiap lilin merangkum satu periode, misalnya satu hari perdagangan.</div>
      <p class="note">Warna naik dan turun beda-beda tiap aplikasi, jadi selalu cek legendanya. Di sini naik ditandai tulisan "Naik", turun ditandai "Turun".</p>
    </div>
    <svg class="candle-svg" id="candle" viewBox="0 0 400 300" role="img" aria-label="Dua candlestick: satu naik, satu turun, dengan label open, high, low, close">
      <text x="110" y="18" text-anchor="middle" class="lbl-strong">Naik</text><text x="290" y="18" text-anchor="middle" class="lbl-strong">Turun</text>
      <g><line class="part p-wick p-high" x1="110" y1="36" x2="110" y2="80" stroke="var(--up)" stroke-width="3"/><rect class="part p-body p-open p-close" x="84" y="80" width="52" height="110" rx="3" fill="var(--up)"/><line class="part p-wick p-low" x1="110" y1="190" x2="110" y2="250" stroke="var(--up)" stroke-width="3"/>
        <text class="part p-high" x="64" y="40" text-anchor="end">High</text><text class="part p-close" x="64" y="84" text-anchor="end">Close</text><text class="part p-open" x="64" y="194" text-anchor="end">Open</text><text class="part p-low" x="64" y="254" text-anchor="end">Low</text></g>
      <g><line class="part p-wick p-high" x1="290" y1="50" x2="290" y2="96" stroke="var(--down)" stroke-width="3"/><rect class="part p-body p-open p-close" x="264" y="96" width="52" height="104" rx="3" fill="none" stroke="var(--down)" stroke-width="3"/><line class="part p-wick p-low" x1="290" y1="200" x2="290" y2="270" stroke="var(--down)" stroke-width="3"/>
        <text class="part p-high" x="336" y="54">High</text><text class="part p-open" x="336" y="100">Open</text><text class="part p-close" x="336" y="204">Close</text><text class="part p-low" x="336" y="274">Low</text></g>
      <rect class="hit" data-part="wick" x="90" y="30" width="40" height="50" fill="transparent"/><rect class="hit" data-part="body" x="80" y="80" width="60" height="110" fill="transparent"/><rect class="hit" data-part="wick" x="90" y="190" width="40" height="64" fill="transparent"/>
      <rect class="hit" data-part="wick" x="270" y="44" width="40" height="52" fill="transparent"/><rect class="hit" data-part="body" x="260" y="96" width="60" height="104" fill="transparent"/><rect class="hit" data-part="wick" x="270" y="200" width="40" height="74" fill="transparent"/>
    </svg>
  </div></div>
</div></section>

<section class="lab-sec" id="cahaya" aria-labelledby="h-cahaya"><div class="wrap">
  <h2 id="h-cahaya">Delay cahaya: berapa lama cahaya jalan ke matamu?</h2>
  <p>Pilih sumber cahayanya. Bacaan lengkapnya ada di <a href="/stories/cahaya">Bintang yang kamu lihat malam ini</a>.</p>
  <div class="panel"><div class="stack">
    <div class="seg" id="lightSeg" role="radiogroup" aria-label="Pilih sumber cahaya"></div>
    <svg class="light-svg" viewBox="0 0 720 120" aria-hidden="true">
      <line class="track" x1="40" y1="60" x2="680" y2="60" stroke-width="2"/><circle cx="40" cy="60" r="14" fill="var(--science)"/><text x="40" y="104" text-anchor="middle">Bumi</text>
      <use href="#star4" x="660" y="40" width="40" height="40" fill="var(--accent)"/><text id="lightName" x="680" y="104" text-anchor="middle">Matahari</text><circle id="photon" cx="680" cy="60" r="6" fill="var(--accent-text)"/>
    </svg>
    <div class="big-out" aria-live="polite"><span class="l" id="lightLbl">Waktu tempuh cahaya dari Matahari</span><span class="v" id="lightTime">8 menit 20 detik</span></div>
    <p id="lightFun"></p>
    <p class="note">Animasinya pakai skala logaritmik biar Bulan dan Andromeda muat di satu layar. Angka jarak adalah perkiraan rata-rata.</p>
  </div></div>
</div></section>`;
  return page({ path:"/lab", title:"Lab Kepo", desc:"Simulasi interaktif Curioverse: kalkulator bunga majemuk, anatomi candlestick saham, dan waktu tempuh cahaya dari Bulan sampai Andromeda.", body, active:"/lab", scripts:["lab.js"] });
}

function story(a){
  const hole = holeOf(a.id);
  const pos = hole ? hole.ids.indexOf(a.id) : -1;
  const nextId = hole && pos < hole.ids.length - 1 ? hole.ids[pos + 1] : null;
  const money = ["finance","market","saham"].includes(a.cat) || ["finance","market","saham"].includes(a.also);
  const kinds = KINDS[a.id] || {};
  const usedKinds = [...new Set(a.s.map((_, i) => kinds[i] || "fakta"))];
  // related: max three, same path first, then same topic
  const rel = [];
  if (hole) hole.ids.forEach(id => { if (id !== a.id && id !== nextId) rel.push(id); });
  A.forEach(x => { if (x.id !== a.id && x.id !== nextId && !rel.includes(x.id) && (x.cat === a.cat || x.also === a.cat || x.cat === a.also)) rel.push(x.id); });
  latest.forEach(x => { if (x.id !== a.id && x.id !== nextId && !rel.includes(x.id)) rel.push(x.id); });
  const body = `
<article class="story wrap">
  <div class="story-in">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span aria-hidden="true">/</span><a href="/explore?topik=${a.cat}">${CATS[a.cat].label}</a></nav>
    ${badge(a.cat)}
    <h1>${esc(a.title)}</h1>
    <p class="dek">${esc(a.dek)}</p>
    <div class="byline">
      <span class="who"><span class="av" aria-hidden="true">A</span><span class="av" aria-hidden="true">L</span>Dikurasi oleh ${esc(CURATORS)}</span>
      <span class="meta"><time datetime="${a.date}">${fmtDate(a.date)}</time><span aria-hidden="true">·</span><span>${a.min} menit baca</span>${a.also ? `<span aria-hidden="true">·</span><a href="/explore?topik=${a.also}">juga di ${CATS[a.also].label}</a>` : ""}</span>
    </div>
    ${hole ? `<p class="path-banner"><span>Reading Path: <b>${esc(hole.title)}</b></span><span class="tnum">Story ${pos + 1} of ${hole.ids.length}</span><span class="bar" aria-hidden="true"><i style="width:${Math.round((pos + 1) / hole.ids.length * 100)}%"></i></span></p>` : ""}
    <p class="legend-k">Tiap bagian ditandai: ${usedKinds.map(k => `<span class="kind" data-k="${k}">${KIND_LABEL[k]}</span>`).join("")}</p>
    <details class="toc"><summary>Isi cerita (${a.s.length} bagian)</summary><ol>${a.s.map((x, i) => `<li><a href="#bagian-${i + 1}">${esc(x[0])}</a></li>`).join("")}</ol></details>
    <div class="body" data-article>
      ${a.s.map((x, i) => `<h2 id="bagian-${i + 1}"><span class="kind" data-k="${kinds[i] || "fakta"}">${KIND_LABEL[kinds[i] || "fakta"]}</span>${esc(x[0])}</h2>${x[1].map(p => `<p>${esc(p)}</p>`).join("")}`).join("\n      ")}
    </div>
    ${money ? `<p class="disc">Konten ini buat belajar dan nambah wawasan, bukan saran investasi atau keuangan.</p>` : ""}
    <section class="sources" aria-labelledby="h-src"><h2 id="h-src">Sumber &amp; bacaan lanjutan</h2>
      <ol>${(SOURCES[a.id] || []).map(s => `<li>${s.u ? `<a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a>` : esc(s.t)}</li>`).join("")}</ol>
      <p>Nemu yang keliru? Kabarin kita, nanti dikoreksi dan dicatat di sini.</p>
    </section>
    ${nextId ? `<a class="next" href="/stories/${nextId}"><small>Story ${pos + 2} of ${hole.ids.length} · ${esc(hole.title)}</small><b>${esc(BY[nextId].title)}</b><span>Continue This Rabbit Hole →</span></a>` : hole ? `<a class="next" href="/reading-paths"><small>Kamu udah tamat reading path ini</small><b>${esc(hole.title)}</b><span>Pilih reading path lain</span></a>` : ""}
    <section class="related" aria-labelledby="h-rel"><h2 id="h-rel">Baca juga</h2><div class="grid">${rel.slice(0, 3).map(id => card(BY[id])).join("")}</div></section>
    <div class="story-actions"><button class="btn btn-primary" type="button" data-surprise>${icon("dice")}Surprise Me</button><a class="btn btn-ghost" href="/explore">Semua cerita</a></div>
  </div>
</article>`;
  return page({ path:`/stories/${a.id}`, title:a.title, desc:a.dek, body, scripts:["story.js"], ogType:"article",
    jsonld:{ "@context":"https://schema.org", "@type":"Article", headline:a.title, description:a.dek, datePublished:a.date, dateModified:a.date, inLanguage:"id",
      author:[{ "@type":"Person", name:"AfreshiaLa" }, { "@type":"Person", name:"LeoFa" }], publisher:{ "@type":"Organization", name:"Curioverse" },
      mainEntityOfPage:SITE + "/stories/" + a.id, articleSection:CATS[a.cat].label, keywords:a.tags,
      citation:(SOURCES[a.id] || []).map(s => s.u || s.t) } });
}

function notFound(){
  const body = `<div class="wrap page-head" style="padding-block:var(--s-9)"><h1>Halaman ini nyasar ke luar orbit.</h1><p>Link-nya mungkin salah ketik atau ceritanya udah pindah. Coba mulai dari sini:</p><div class="cta"><a class="btn btn-primary" href="/explore">Explore Stories</a><button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button></div></div>`;
  return page({ path:"/404", title:"Halaman tidak ditemukan", desc:"Halaman tidak ditemukan.", body });
}

/* ---------- write ---------- */
rmSync(OUT, { recursive:true, force:true });
const write = (p, s) => { const f = join(OUT, p); mkdirSync(dirname(f), { recursive:true }); writeFileSync(f, s); };
write("index.html", home());
write("explore.html", explore());
write("reading-paths.html", paths());
write("lab.html", lab());
write("404.html", notFound());
A.forEach(a => write(`stories/${a.id}.html`, story(a)));
for (const f of ["styles.css","app.js","home.js","explore.js","lab.js","story.js"]) { mkdirSync(join(OUT, "assets"), { recursive:true }); copyFileSync(join(ROOT, "src", f), join(OUT, "assets", f)); }
mkdirSync(join(OUT, "assets/vendor"), { recursive:true });
copyFileSync(join(ROOT, "assets/vendor/three.min.js"), join(OUT, "assets/vendor/three.min.js"));
copyFileSync(join(ROOT, "favicon.svg"), join(OUT, "favicon.svg"));
const urls = ["/", "/explore", "/lab", "/reading-paths", ...A.map(a => "/stories/" + a.id)];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Built ${urls.length + 1} pages into dist/`);
