// Builds the static Curioverse site into ./dist. No dependencies: `node scripts/build.mjs`.
import { mkdirSync, rmSync, writeFileSync, copyFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATS, ORDER, A, HOLES, TOPIC_DESC, KINDS, SOURCES, CURATORS, CONTACT, PICKS, HOOKS, PIPELINE_IDS, IMAGES } from "../content/stories.mjs";
import { checkSite, report } from "./validate.mjs";

// Quality gate first: if any story breaks the rules, the build fails and Vercel keeps the last good version live.
if (!report(checkSite({ CATS, A, SOURCES, KINDS, HOOKS, PICKS, HOLES, PIPELINE_IDS, IMAGES }), "Quality gate")) {
  console.error("Build dihentikan. Perbaiki masalah di atas (lihat pipeline/RULES.md).");
  process.exit(1);
}

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
const KNOWN_ICONS = ["finance","science","sejarah","biografi","market","saham","global","scam","lingkungan","psikologi","healthy","konspirasi","search","dice","close","moon","sun","menu","arrow","mail","instagram","threads","x","share","up"];
const icon = (id, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${KNOWN_ICONS.includes(id) ? id : "topic"}"/></svg>`;
// Category colours and labels come from content/categories.json, so new categories need no CSS or JS edits.
const CAT_STYLE = `<style>:root{${ORDER.map(c => `--c-${c}:${CATS[c].light}`).join(";")}}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${ORDER.map(c => `--c-${c}:${CATS[c].dark}`).join(";")}}}:root[data-theme="dark"]{${ORDER.map(c => `--c-${c}:${CATS[c].dark}`).join(";")}}</style>`;
const CAT_LABELS = `<script type="application/json" id="cv-labels">${JSON.stringify(Object.fromEntries(ORDER.map(c => [c, CATS[c].label]))).replace(/</g, "\\u003c")}</script>`;
const figure = (im, cls = "story-fig", vt = "") => im && im.src ? `<figure class="${cls} rv"><img src="${esc(im.src)}" alt="${esc(im.alt || "")}" ${vt ? `fetchpriority="high" style="--vt:cv-${vt}"` : 'loading="lazy"'} decoding="async" referrerpolicy="no-referrer"><figcaption>${esc(im.caption || im.alt || "")}${im.credit ? ` <span class="credit">${im.page ? `<a href="${esc(im.page)}" target="_blank" rel="noopener">` : ""}${esc(im.credit)}${im.license ? `, ${esc(im.license)}` : ""}${im.page ? "</a>" : ""}</span>` : ""}</figcaption></figure>` : "";
const badge = c => `<span class="badge" data-c="${c}">${icon(c)}<b>${CATS[c].label}</b></span>`;
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const latest = A.slice().sort((x, y) => y.date.localeCompare(x.date));
const countFor = c => A.filter(a => a.cat === c || a.also === c).length;
const holeOf = id => HOLES.find(h => h.ids.includes(id));
const KIND_LABEL = { fakta:"Fakta", interpretasi:"Interpretasi", opini:"Opini kita" };
const MAILTO = (subject = "") => `mailto:${CONTACT.email}${subject ? "?subject=" + encodeURIComponent(subject) : ""}`;
const heroOf = a => (IMAGES[a.id] || {}).hero;
// Wikimedia thumbs are stored at 1280px; covers in lists only need 500 to 960px. The 1280px original stays in data-full as a fallback.
const sized = (src, w) => /^https:\/\/upload\.wikimedia\.org\/.+\/thumb\/.+\/1280px-/.test(src) ? src.replace("/1280px-", `/${w}px-`) : src;
// Cover photo for a story in lists (cards, picks, slides). Falls back to the category illustration when a story has no image.
function cover(a, cls = "cover", sizes = "(min-width:980px) 420px, 92vw"){
  const im = heroOf(a);
  if (!im || !im.src) return `<div class="${cls} stage" style="--vt:cv-${a.id}">${stageArt(a.cat)}</div>`;
  const small = sized(im.src, 500);
  const srcset = small !== im.src ? ` srcset="${esc(small)} 500w, ${esc(sized(im.src, 960))} 960w, ${esc(im.src)} 1280w" sizes="${sizes}"` : "";
  return `<div class="${cls}${im.src.startsWith("/") ? " is-ill" : ""}" style="--vt:cv-${a.id}"><img src="${esc(small)}"${srcset} data-full="${esc(im.src)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>`;
}
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
<symbol id="i-scam" viewBox="0 0 24 24"><path d="M3 9c3-2 6-2 9 0 3-2 6-2 9 0-.4 4-2.6 7-5.6 7-1.6 0-2.6-1-3.4-2.4-.8 1.4-1.8 2.4-3.4 2.4C5.6 16 3.4 13 3 9z"/><circle cx="8" cy="10.6" r="1.4"/><circle cx="16" cy="10.6" r="1.4"/></symbol>
<symbol id="i-lingkungan" viewBox="0 0 24 24"><path d="M12 21v-8"/><path d="M12 15c-3.9 0-6.5-2.6-6.5-6.2 3.7 0 6.5 2.5 6.5 6.2z"/><path d="M12 12.6c0-4.3 2.6-7.6 7-7.6 0 4.6-2.8 7.6-7 7.6z"/><path d="M8 21h8"/></symbol>
<symbol id="i-psikologi" viewBox="0 0 24 24"><path d="M9 21v-3.1C6.6 16.8 5 14.3 5 11.4 5 7.3 8.1 4 12.2 4 16 4 19 6.9 19 10.6c0 .8-.2 1.6-.6 2.3l1.3 2.5c.2.4-.1.9-.5.9H18v2.2c0 .8-.6 1.4-1.4 1.4H14V21"/><path d="M10.4 9.3a2 2 0 0 1 3.8.9c0 1.4-2 1.7-2 3.1"/><circle cx="12.2" cy="15.6" r=".55" fill="currentColor"/></symbol>
<symbol id="i-healthy" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"/><path d="M6.2 12.4h2.9l1.4-2.4 2.2 4.4 1.4-2h3.7"/></symbol>
<symbol id="i-konspirasi" viewBox="0 0 24 24"><path d="M12 3.5l9 16H3z"/><path d="M7.7 14.2c1.2-1.5 2.6-2.3 4.3-2.3s3.1.8 4.3 2.3c-1.2 1.5-2.6 2.3-4.3 2.3s-3.1-.8-4.3-2.3z"/><circle cx="12" cy="14.2" r="1"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M4 7.5l8 5.8 8-5.8"/></symbol>
<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.1" cy="6.9" r=".7" fill="currentColor"/></symbol>
<symbol id="i-threads" viewBox="0 0 24 24"><path d="M16.6 11.3c-.3-2.6-2-4-4.4-4-1.8 0-3.2.8-3.9 2.1"/><path d="M16.6 11.3c-1.3-.5-2.7-.6-4-.4-2 .3-3.2 1.4-3.1 2.8.1 1.5 1.6 2.4 3.4 2.2 2.4-.3 3.5-2.2 3.4-5.6"/><path d="M16.6 11.3c2 .9 3 2.4 2.4 4.6-.8 2.8-3.4 4.6-7 4.6-4.6 0-7.5-3.2-7.5-8.5S7.4 3.5 12 3.5c3.4 0 5.8 1.6 6.9 4.4"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M4.5 4.5h4.2l10.8 15h-4.2z"/><path d="M19 4.5l-5.8 6.4M10.8 13.1L5 19.5"/></symbol>
<symbol id="i-share" viewBox="0 0 24 24"><path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 12v6.5c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5V12"/></symbol>
<symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></symbol>
<symbol id="i-topic" viewBox="0 0 24 24"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5C4.7 20 4 19.3 4 18.5z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></symbol>
<symbol id="i-dice" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r=".9" fill="currentColor"/><circle cx="15" cy="15" r=".9" fill="currentColor"/><circle cx="15" cy="9" r=".9" fill="currentColor"/><circle cx="9" cy="15" r=".9" fill="currentColor"/><circle cx="12" cy="12" r=".9" fill="currentColor"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></symbol>
<symbol id="star4" viewBox="-10 -10 20 20"><path d="M0-10C.9-3 3-.9 10 0 3 .9.9 3 0 10-.9 3-3 .9-10 0-3-.9-.9-3 0-10z" stroke="none"/></symbol>
</defs></svg>`;

const MARK = `<svg viewBox="0 0 40 40" aria-hidden="true"><text class="c" x="20" y="28" text-anchor="middle">C</text><ellipse cx="20" cy="21" rx="17" ry="6.2" transform="rotate(-24 20 21)" fill="none" stroke="var(--gold)" stroke-width="1.3"/><use href="#star4" x="17" y="14" width="7" height="7" fill="var(--gold)"/></svg>`;

const NAV = [
  { href:"/explore", label:"Explore", desc:"Semua cerita, filter per topik" },
  { href:"/lab", label:"Lab", desc:"Simulasi: bunga majemuk, candlestick, cahaya" },
  { href:"/reading-paths", label:"Reading Paths", desc:"Rabbit Holes: seri cerita yang nyambung" }
];

function header(active){
  return `<a class="skip" href="#main">Langsung ke konten</a>
<div class="nav-progress" aria-hidden="true"><i data-progress></i></div>
<header class="nav" data-nav>
  <div class="wrap nav-inner">
    <a class="nav-brand" href="/" aria-label="Curioverse, ke beranda"><span class="nav-mark" aria-hidden="true">${MARK}</span><span class="nav-name" aria-hidden="true">Curioverse</span></a>
    <div class="nav-right">
      <nav class="nav-pill" aria-label="Navigasi utama">
        <span class="nav-ind" aria-hidden="true"></span>
        <ul>${NAV.map(n => `<li><a class="nav-link" href="${n.href}"${active === n.href ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("")}</ul>
      </nav>
      <button class="nav-btn nav-search" type="button" data-search aria-label="Search: cari cerita">${icon("search")}<span class="nav-search-label">Search</span><kbd data-kbd>Ctrl K</kbd></button>
      <button class="nav-btn nav-ico" type="button" data-theme-toggle aria-label="Ganti tema terang atau gelap">${icon("moon", "ico t-moon")}${icon("sun", "ico t-sun")}</button>
      <button class="nav-menu-btn" type="button" data-menu aria-haspopup="dialog" aria-controls="menu">Menu <i aria-hidden="true"></i></button>
    </div>
  </div>
</header>`;
}

function dialogs(){
  const pop = ["langit","bullbear","kartini","majemuk"];
  return `<dialog class="menu" id="menu" aria-label="Menu">
  <div class="wrap menu-top"><a class="nav-brand" href="/" aria-label="Curioverse, ke beranda"><span class="nav-mark" aria-hidden="true">${MARK}</span></a><button class="menu-close" type="button" data-close>Tutup</button></div>
  <div class="wrap menu-body">
    <ol>
      ${NAV.map((n, i) => `<li><a href="${n.href}" style="--i:${i}">${n.label}<small>${["semua cerita","main sambil belajar","seri yang nyambung"][i]}</small></a></li>`).join("")}
      <li><a href="/#kurator" style="--i:3">Tentang kami<small>siapa kita</small></a></li>
      <li><a href="/#kontak" style="--i:4">Kontak<small>sapa kita</small></a></li>
    </ol>
    <div class="menu-foot">
      <button class="btn btn-primary" type="button" data-surprise>${icon("dice")}Surprise Me</button>
      <button class="btn btn-ghost" type="button" data-search>${icon("search")}Search</button>
      <a class="btn btn-ghost" href="/explore?topik=global">Radar Global</a>
      <button class="btn btn-ghost" type="button" data-theme-toggle>${icon("moon", "ico t-moon")}${icon("sun", "ico t-sun")}Ganti tema</button>
    </div>
  </div>
</dialog>
<dialog class="search" id="search" aria-label="Cari cerita">
  <div class="s-in">
    <div class="s-head">
      ${icon("search")}
      <label class="sr" for="sq">Cari cerita</label>
      <input id="sq" type="search" placeholder="Cari topik, tokoh, atau istilah" autocomplete="off" enterkeyhint="search" role="combobox" aria-expanded="true" aria-controls="sres" aria-autocomplete="list">
      <button class="s-x" type="button" data-close aria-label="Tutup pencarian">${icon("close")}</button>
    </div>
    <div class="s-body" data-lenis-prevent>
      <div id="sres-wrap" hidden><p class="s-label" id="scount" aria-live="polite"></p><ul class="s-list" id="sres" role="listbox" aria-labelledby="scount"></ul></div>
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
  return `<footer class="foot wave">
  <div class="wrap">
    <div class="foot-cta">
      <p class="hand rv">masih penasaran?</p>
      <h2 class="h2 rv-mask"><span>Tetap kepo, ya.</span></h2>
      <div class="hero-ctas rv" style="--i:1"><a class="btn btn-primary" href="/explore">Explore Stories <i class="arr" aria-hidden="true">↗</i></a><button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button></div>
    </div>
    <div class="foot-word" role="img" aria-label="Curioverse, a curious mind lives here">
      <svg viewBox="0 0 1200 250" aria-hidden="true">
        <path class="orb" data-orbit d="M70 196 C 30 40, 1170 10, 1150 120 C 1136 214, 520 250, 150 226" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        <text class="wm" x="600" y="190" text-anchor="middle" textLength="1100" lengthAdjust="spacingAndGlyphs">CURIOVERSE</text>
        <use class="sp" href="#star4" x="572" y="0" width="56" height="56"/><use class="sp" href="#star4" x="1040" y="24" width="30" height="30"/><circle class="sp" cx="1150" cy="120" r="8"/>
      </svg>
    </div>
    ${phases()}
    <div class="foot-row">
      <nav class="foot-links" aria-label="Navigasi footer">
        <a href="/explore">Explore</a><a href="/lab">Lab</a><a href="/reading-paths">Reading Paths</a><a href="/explore?topik=global">Radar Global</a><a href="/#kurator">Tentang kami</a><a href="/#kontak">Kontak</a><button type="button" data-surprise>Surprise Me</button>
      </nav>
      <nav class="foot-social" aria-label="Kontak">
        <a href="${MAILTO()}" aria-label="Email: ${esc(CONTACT.email)}">${icon("mail")}<span>Email</span></a>${CONTACT.social.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)} ${esc(s.handle)} (tab baru)">${icon(s.icon)}<span>${esc(s.label)}</span></a>`).join("")}
      </nav>
      <p class="fine">© 2026 ${esc(CURATORS)} · A curious mind lives here · Bukan saran investasi</p>
    </div>
  </div>
</footer>`;
}

const INDEX = JSON.stringify(A.map(a => ({ id:a.id, c:a.cat, t:a.title, d:a.dek, m:a.min, dt:a.date,
  h:norm([a.title, a.dek, a.tags, CATS[a.cat].label, a.also ? CATS[a.also].label : "", a.s.map(x => x[0]).join(" ")].join(" ")) })));

function page({ path, title, desc, body, active = "", scripts = [], jsonld = null, ogType = "website", image = null }){
  const og = image && /^https:\/\//.test(image.src) ? image : null;
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
${og ? `<meta property="og:image" content="${esc(og.src)}">\n<meta property="og:image:alt" content="${esc(og.alt || "")}">\n` : ""}<meta name="twitter:card" content="${og ? "summary_large_image" : "summary"}">
<link rel="alternate" type="application/rss+xml" title="Curioverse" href="/feed.xml">
<link rel="preconnect" href="https://upload.wikimedia.org" crossorigin>
<meta name="theme-color" content="#EAE3D5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1B1A17" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/InterTight-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/InstrumentSerif-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/Caveat-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${V}">
<script>(function(d){d.classList.add("js");try{var t=localStorage.getItem("cv-theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}setTimeout(function(){if(!window.CV)d.classList.add("rv-safe")},3500)})(document.documentElement)</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
${CAT_STYLE}
</head>
<body>
${ICONS}
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<button class="to-top" type="button" data-top aria-label="Kembali ke atas" hidden>${icon("up")}</button>
<div class="toast" role="status" aria-live="polite" data-toast></div>
${dialogs()}
${CAT_LABELS}
<script type="application/json" id="cv-index">${INDEX.replace(/</g, "\\u003c")}</script>
<script src="/assets/vendor/lenis.min.js" defer></script>
<script src="/assets/app.js?v=${V}" defer></script>
${scripts.map(s => `<script src="/assets/${s}?v=${V}" defer></script>`).join("\n")}
</body>
</html>
`;
}

/* ---------- components ---------- */
const head = (hand, title, extra = "") => `<div class="sec-head"><p class="hand rv">${hand}</p><h2 class="h2 rv-mask"${extra}><span>${title}</span></h2></div>`;

const card = (a, i = 0) => `<article class="card rv" style="--i:${i % 3}" data-id="${a.id}" data-c="${a.cat}" data-also="${a.also || ""}" data-date="${a.date}" data-min="${a.min}" data-title="${esc(a.title)}" data-h="${esc(norm([a.title, a.dek, a.tags, CATS[a.cat].label, a.also ? CATS[a.also].label : ""].join(" ")))}">
  ${cover(a)}
  <h3><a href="/stories/${a.id}">${esc(a.title)}</a></h3>
  <p class="dek">${esc(a.dek)}</p>
  <div class="meta">${badge(a.cat)}<span>${a.min} menit</span><span aria-hidden="true">·</span><time datetime="${a.date}">${fmtDate(a.date)}</time></div>
</article>`;

function constellation(h, w = 370, ht = 150){
  const d = h.pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  let len = 0; for (let i = 1; i < h.pts.length; i++) len += Math.hypot(h.pts[i][0] - h.pts[i-1][0], h.pts[i][1] - h.pts[i-1][1]);
  return `<svg class="const" viewBox="0 0 ${w} ${ht}" aria-hidden="true"><path class="ln" d="${d}" style="--len:${Math.ceil(len)}"/>${h.pts.map((p, i) => `<use class="st" href="#star4" x="${p[0]-9}" y="${p[1]-9}" width="18" height="18"/><text x="${p[0]}" y="${p[1] + (p[1] > 100 ? -16 : 28)}" text-anchor="middle">0${i + 1}</text>`).join("")}</svg>`;
}
const pathMinutes = h => h.ids.reduce((s, id) => s + BY[id].min, 0);

/* animated, illustrative SVG per topic for the stacked slides */
function stageArt(c){
  const S = (body) => `<svg viewBox="0 0 400 320" aria-hidden="true">${body}</svg>`;
  const stars = [[40,40,.2],[360,52,.6],[330,270,1],[60,280,1.4],[200,24,.9]].map(([x,y,d]) => `<use class="a-twinkle" href="#star4" x="${x-7}" y="${y-7}" width="14" height="14" fill="currentColor" style="--d:${d}s"/>`).join("");
  switch (c){
    case "finance": return S(`${stars}${Array.from({ length:10 }, (_, i) => { const dep = 22 + i * 9, tot = dep + Math.round(Math.pow(1.28, i) * 6); const x = 52 + i * 31; return `<rect class="a-grow" x="${x}" y="${270 - tot}" width="20" height="${tot - dep}" rx="3" fill="var(--gold)" style="--d:${.1 + i * .08}s"/><rect class="a-grow" x="${x}" y="${270 - dep}" width="20" height="${dep}" rx="3" fill="var(--up)" style="--d:${i * .08}s"/>`; }).join("")}<line x1="40" y1="272" x2="360" y2="272" class="sink" stroke-width="1.5"/><text x="40" y="296">TAHUN 1</text><text x="360" y="296" text-anchor="end">TAHUN 10</text>`);
    case "science": return S(`${stars}${[70,105,140].map((r, i) => `<g class="a-orbit" style="--t:${14 + i * 8}s"><ellipse cx="200" cy="160" rx="${r}" ry="${r}" fill="none" stroke="var(--line-2)" stroke-width="1.2"/><circle cx="${200 + r}" cy="160" r="${7 - i}" fill="${["var(--blue)","var(--gold)","var(--up)"][i]}"/></g>`).join("")}<use class="a-pop" href="#star4" x="170" y="130" width="60" height="60" fill="currentColor"/>`);
    case "sejarah": return S(`${stars}<path class="a-draw sink" style="--len:700" d="M150 60 H250 M150 260 H250 M160 60 C160 130 240 130 240 160 C240 190 160 190 160 260 M240 60 C240 130 160 130 160 160 C160 190 240 190 240 260" fill="none" stroke-width="2.4" stroke-linecap="round"/><path class="a-grow" d="M178 255 Q200 222 222 255 Z" fill="var(--gold)" style="--d:.8s"/><circle class="a-pop" cx="200" cy="168" r="4" fill="var(--gold)" style="--d:1.2s"/>`);
    case "biografi": return S(`${stars}<circle class="a-draw" style="--len:600" cx="200" cy="150" r="88" fill="none" stroke="var(--gold)" stroke-width="2"/><circle cx="200" cy="128" r="30" class="a-pop ink" style="--d:.5s"/><path class="a-pop ink" style="--d:.7s" d="M146 214 C150 180 250 180 254 214 Z"/><path class="a-draw sink" style="--len:300;--d:1s" d="M282 270 C300 200 340 160 372 140 C350 190 320 230 282 270 Z" fill="none" stroke-width="1.8"/>`);
    case "market": return S(`${stars}<line x1="40" y1="260" x2="360" y2="260" class="sink" stroke-width="1.5"/><path class="a-draw sink" style="--len:520" d="M40 220 L90 200 L130 230 L180 150 L220 170 L270 100 L310 120 L360 70" fill="none" stroke-width="3" stroke-linejoin="round"/>${[[180,150],[270,100],[360,70]].map(([x,y],i) => `<circle class="a-pop" cx="${x}" cy="${y}" r="6" fill="var(--gold)" style="--d:${.8 + i * .25}s"/>`).join("")}<text x="40" y="290">BULL</text><text x="360" y="290" text-anchor="end">ILUSTRASI</text>`);
    case "saham": return S(`${stars}${[[70,150,210,120,240,1],[130,120,190,100,230,0],[190,100,170,80,200,1],[250,130,90,110,160,1],[310,80,130,60,150,0]].map(([x,o,c2,h,l,up],i) => { const top = Math.min(o, c2), bh = Math.abs(o - c2); return `<g class="a-grow" style="--d:${i * .15}s"><line x1="${x}" y1="${h}" x2="${x}" y2="${l + 40}" stroke="${up ? "var(--up)" : "var(--down)"}" stroke-width="2.5"/><rect x="${x - 15}" y="${top}" width="30" height="${bh}" rx="3" fill="${up ? "var(--up)" : "var(--card)"}" stroke="${up ? "var(--up)" : "var(--down)"}" stroke-width="2.5"/></g>`; }).join("")}`);
    case "scam": return S(`${stars}<path class="a-draw sink" style="--len:900" d="M90 130 C150 90 200 92 200 132 C200 92 250 90 310 130 C304 196 270 232 232 232 C214 232 205 218 200 204 C195 218 186 232 168 232 C130 232 96 196 90 130 Z" fill="none" stroke-width="2.6" stroke-linejoin="round"/><circle class="a-pop ink" cx="160" cy="150" r="13" style="--d:.7s"/><circle class="a-pop ink" cx="240" cy="150" r="13" style="--d:.8s"/><rect class="a-grow" x="252" y="40" width="96" height="52" rx="6" fill="none" stroke="var(--gold)" stroke-width="2" style="--d:1s"/><text x="300" y="72" text-anchor="middle" fill="var(--gold)">100% ASLI?</text><text x="40" y="296">TOO GOOD</text><text x="360" y="296" text-anchor="end">TO BE TRUE</text>`);
    default: return S(`${stars}<circle class="a-draw" style="--len:700" cx="200" cy="160" r="100" fill="none" stroke="var(--on-night)" stroke-width="2"/><path class="a-draw" style="--len:640;--d:.4s" d="M200 60 C250 100 250 220 200 260 C150 220 150 100 200 60 M100 160 H300 M114 110 H286 M114 210 H286" fill="none" stroke="var(--on-night)" stroke-width="1.4"/><g class="a-orbit" style="--t:20s"><ellipse cx="200" cy="160" rx="150" ry="46" fill="none" stroke="var(--gold)" stroke-width="1.6" transform="rotate(-18 200 160)"/></g><circle class="a-pop" cx="340" cy="112" r="7" fill="var(--gold)" style="--d:1s"/>`);
  }
}

/* ---------- pages ---------- */
/* moon phase drawing, p in [0,1): 0 new, .25 first quarter, .5 full, .75 last quarter */
function moon(p, r = 24, cls = ""){
  const c = r + 2, top = `${c} ${c - r}`, bot = `${c} ${c + r}`;
  const rx = Math.abs(r * Math.cos(2 * Math.PI * p)).toFixed(2);
  let lit = "";
  if (p > .02 && p < .98) {
    if (Math.abs(p - .5) < .02) lit = `<circle class="moon-lit" cx="${c}" cy="${c}" r="${r}"/>`;
    else if (p < .5) lit = `<path class="moon-lit" d="M${top} A${r} ${r} 0 0 1 ${bot} A${rx} ${r} 0 0 ${p < .25 ? 0 : 1} ${top}Z"/>`;
    else lit = `<path class="moon-lit" d="M${top} A${r} ${r} 0 0 0 ${bot} A${rx} ${r} 0 0 ${p > .75 ? 1 : 0} ${top}Z"/>`;
  }
  return `<svg class="${cls}" viewBox="0 0 ${c * 2} ${c * 2}" aria-hidden="true"><circle class="moon-disc" cx="${c}" cy="${c}" r="${r}"/>${lit}</svg>`;
}
const PHASES = [[0,"awal kepo"],[.13,"mulai nyari"],[.25,"nemu clue"],[.38,"makin dalam"],[.5,"aha!"],[.62,"cerita ke pacar"],[.75,"rehat"],[.88,"kepo lagi"]];
const phases = (extra = "") => `<div class="phases${extra}" aria-hidden="true">${PHASES.map(([p, l], i) => `<div class="phase rv" style="--i:${i}">${moon(p)}<span>${l}</span></div>`).join("")}</div>`;

function home(){
  const picks = PICKS.map(id => BY[id]);
  const recent = latest.filter(a => !PICKS.includes(a.id)).slice(0, 4);
  const hook = HOOKS[0];
  let bal = 0; const yrs = [];
  for (let y = 1; y <= 20; y++){ for (let m = 0; m < 12; m++) bal = bal * (1 + .06 / 12) + 500000; yrs.push({ y, dep:500000 * 12 * y, bal }); }
  const maxB = yrs[19].bal;
  const lead = picks[0];
  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <h1 class="display" id="hero-title"><span class="rv-mask"><span>Buku catatan</span></span><span class="rv-mask" style="--i:1"><span>buat orang kepo.</span></span></h1>
        <p class="hand rv" style="--i:2">satu fakta kecil, penasaran seharian.</p>
        <p class="lede rv" style="--i:3">Curioverse itu jurnal pengetahuan punya AfreshiaLa &amp; LeoFa. Finance, science, sejarah, sampai berita dunia, ditulis santai biar enak dibaca sambil rebahan.</p>
        <div class="hero-ctas rv" style="--i:4">
          <a class="btn btn-primary" href="#pilihan">Baca pilihan minggu ini <i class="arr" aria-hidden="true">↓</i></a>
          <button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button>
        </div>
      </div>
      <div class="hook-wrap rv" style="--i:3">
        <figure class="hook scrap night taped" style="margin:0" aria-labelledby="hook-label">
          <div class="hook-top"><p class="hand" id="hook-label">Tau nggak?</p><svg class="hook-moon" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="40" fill="var(--gold)"/><circle cx="30" cy="30" r="8" fill="rgba(27,26,23,.16)"/><circle cx="54" cy="50" r="11" fill="rgba(27,26,23,.13)"/><circle cx="36" cy="58" r="5" fill="rgba(27,26,23,.16)"/><circle cx="58" cy="26" r="4" fill="rgba(27,26,23,.14)"/></svg></div>
          <q id="hook-q" aria-live="polite">${esc(hook.t)}</q>
          <div class="hook-acts">
            <a class="link" id="hook-link" href="/stories/${hook.id}">Kok bisa? Baca ceritanya <i class="arr" aria-hidden="true">↗</i></a>
            <button class="hook-more" type="button" id="hook-more">${icon("dice")}Fakta lain</button>
          </div>
        </figure>
        <span class="note" aria-hidden="true">ganti tiap kamu mampir</span>
        <script type="application/json" id="hooks">${JSON.stringify(HOOKS).replace(/</g, "\\u003c")}</script>
      </div>
    </div>
    ${phases()}
  </div>
</section>

<section class="section" id="pilihan" aria-labelledby="h-pilihan">
  <div class="wrap">
    <div class="sec-row">${head("mulai dari sini, ya", "Pilihan minggu ini", ' id="h-pilihan"')}<p class="lede rv">Tiga cerita yang paling bikin kita heboh minggu ini. Dipilih kurator, bukan algoritma.</p></div>
    <div class="feat-grid">
      <a class="scrap feat-lead taped rv" data-play href="/stories/${lead.id}">
        ${cover(lead, "pic", "(min-width:980px) 700px, 92vw")}
        <div class="txt">
          <h3>${esc(lead.title)}</h3>
          <p class="dek">${esc(lead.dek)}</p>
          <p class="meta">${badge(lead.cat)}<span>${lead.min} menit baca</span><span aria-hidden="true">·</span><time datetime="${lead.date}">${fmtDate(lead.date)}</time></p>
          <span class="link" style="justify-self:start">Baca ceritanya <i class="arr" aria-hidden="true">↗</i></span>
        </div>
      </a>
      <div class="feat-side">
        ${picks.slice(1).map((a, i) => `<a class="scrap feat-item taped${i ? " blue" : ""} rv" data-play style="--i:${i + 1}" href="/stories/${a.id}">${cover(a, "mini", "120px")}<div><h3>${esc(a.title)}</h3><p class="dek">${esc(a.dek)}</p><p class="meta" style="margin-top:10px">${badge(a.cat)}<span>${a.min} menit baca</span></p></div></a>`).join("")}
        <p class="feat-note rv" style="--i:3">sisanya ada di <a class="link" href="/explore" style="font:inherit">Explore</a></p>
      </div>
    </div>
  </div>
</section>

<section class="band wave" id="topik" aria-labelledby="h-topik">
  <div class="wrap">
    <div class="sec-row">${head("pilih orbit kamu", "Mau kepo soal apa?", ' id="h-topik"')}<p class="lede rv">${ORDER.length} topik, satu rasa penasaran. Ketuk salah satu buat lihat semua ceritanya.</p></div>
    <div class="topics">
      ${ORDER.map((c, i) => `<a class="topic rv" style="--i:${i % 4}; --tc:var(--c-${c})" href="/explore?topik=${c}"><span class="topic-ico">${icon(c)}</span><b>${CATS[c].label}</b><small>${TOPIC_DESC[c]}</small><span class="n">${countFor(c) ? countFor(c) + " cerita" : "segera hadir"}</span></a>`).join("")}
      <button class="topic alt rv" style="--i:3" type="button" data-surprise><span class="topic-ico">${icon("dice")}</span><b>Surprise Me</b><small>Biarin semesta yang milih cerita</small><span class="n">acak</span></button>
    </div>
  </div>
</section>

<section class="section" id="cerita" aria-labelledby="h-cerita">
  <div class="wrap">
    <div class="sec-row">${head("baru ditulis", "Cerita terbaru", ' id="h-cerita"')}<a class="link rv" href="/explore">Lihat semua ${A.length} cerita <i class="arr" aria-hidden="true">↗</i></a></div>
    <ol class="stack" data-stack>
      ${recent.map((a, i) => { const h = holeOf(a.id); return `<li class="slide" style="--i:${i}">
        <article class="slide-in">
          <div class="slide-txt">
            <div class="slide-top"><span class="hand">${fmtDate(a.date)}</span></div>
            <h3><a href="/stories/${a.id}">${esc(a.title)}</a></h3>
            <p class="dek">${esc(a.dek)}</p>
            <div class="slide-facts"><span>${CATS[a.cat].label}</span><span>${a.min} menit baca</span><span>${a.s.length} bagian</span>${h ? `<span>Reading Path: ${esc(h.title)}</span>` : ""}</div>
            <a class="btn btn-ghost" style="align-self:flex-start" href="/stories/${a.id}" tabindex="-1" aria-hidden="true">Baca cerita <i class="arr" aria-hidden="true">↗</i></a>
          </div>
          ${cover(a, "slide-cover", "(min-width:900px) 560px, 92vw")}
        </article>
      </li>`; }).join("")}
    </ol>
  </div>
</section>

<section class="section" id="lab" aria-labelledby="h-lab" style="padding-top:0">
  <div class="wrap">
    <div class="sec-row">${head("lab kepo", "Belajar sambil main", ' id="h-lab"')}<p class="lede rv">Konsep yang biasanya cuma dijelasin pakai teks, sekarang bisa kamu geser dan pencet sendiri.</p></div>
    <div class="lab-grid">
      <ul class="lab-list">
        <li class="rv"><a href="/lab#bunga"><b>Bunga majemuk</b><small>Geser setoran dan waktu, lihat duitmu beranak</small><i class="arr" aria-hidden="true">↗</i></a></li>
        <li class="rv" style="--i:1"><a href="/lab#candlestick"><b>Anatomi candlestick</b><small>Pencet tiap bagian lilin: open, high, low, close</small><i class="arr" aria-hidden="true">↗</i></a></li>
        <li class="rv" style="--i:2"><a href="/lab#cahaya"><b>Delay cahaya</b><small>Dari Bulan sampai Andromeda, berapa lama cahaya jalan?</small><i class="arr" aria-hidden="true">↗</i></a></li>
      </ul>
      <div class="scrap grow taped rv" style="--i:1" data-grow>
        <svg viewBox="0 0 400 236" role="img" aria-label="Contoh: menabung Rp500 ribu per bulan dengan bunga 6% per tahun selama 20 tahun menjadi sekitar ${short(maxB)}.">
          <text x="0" y="14">Nabung Rp500 rb per bulan, bunga 6% per tahun</text>
          <text class="big" x="0" y="62" data-grow-v>${short(maxB)}</text>
          ${yrs.map((r, i) => { const x = 4 + i * 19.6, hB = 140 * r.bal / maxB, hD = 140 * r.dep / maxB; return `<g data-bar="${i}"><rect x="${x}" y="${228 - hB}" width="14" height="${hB - hD}" rx="2" fill="var(--gold)"/><rect x="${x}" y="${228 - hD}" width="14" height="${hD}" rx="2" fill="var(--up)"/></g>`; }).join("")}
        </svg>
        <div class="grow-cap"><span data-grow-y>Tahun 20</span><span class="grow-ok">dobel tiap ±12 tahun!</span></div>
      </div>
    </div>
  </div>
</section>

<section class="pin" id="paths" aria-labelledby="h-paths" data-pin>
  <div class="pin-sticky">
    <div class="wrap pin-head">${head("rabbit holes", "Baca satu, lanjut terus", ' id="h-paths"')}<span class="pin-prog" aria-hidden="true"><i data-pin-prog></i></span></div>
    <div class="track" data-track>
      ${HOLES.map(h => `<article class="scrap path-card taped">${constellation(h)}<h3>${esc(h.title)}</h3><p>${esc(h.dek)}</p><p class="meta">${h.ids.length} cerita · sekitar ${pathMinutes(h)} menit</p><a class="btn btn-primary" href="/stories/${h.ids[0]}">Mulai dari cerita 1 <i class="arr" aria-hidden="true">↗</i></a></article>`).join("")}
      <article class="scrap path-card night taped blue"><p class="hand" style="color:var(--gold)">cara mainnya</p><h3>Di akhir tiap cerita ada tombol buat lanjut ke cerita berikutnya.</h3><p>Tiap seri disusun kayak rasi bintang: urutannya penting, jadi mulai dari bintang pertama.</p><a class="btn btn-light" href="/reading-paths">Lihat semua path <i class="arr" aria-hidden="true">↗</i></a></article>
    </div>
  </div>
</section>

<section class="section" id="kurator" aria-labelledby="h-kurator">
  <div class="wrap">
    <div class="sec-row">${head("yang nulis jurnal ini", "Kenalan, yuk", ' id="h-kurator"')}</div>
    <div class="cur-grid">
      <div class="rv">
        <p class="statement">Kita AfreshiaLa dan LeoFa. Kalau nemu fakta random, rasanya harus langsung di-share ke satu sama lain.</p>
        <p class="lede">Curioverse itu tempat kita nyimpen semua "eh tau nggak sih" biar nggak tenggelam di chat. Kalau kamu ikut kepo, welcome. A curious mind lives here, dan sekarang kamu juga.</p>
      </div>
      <div class="people">
        <div class="scrap person taped rv"><span class="av" aria-hidden="true">A</span><span><b>AfreshiaLa</b><small>co-curator</small></span></div>
        <div class="scrap person taped blue rv" style="--i:1"><span class="av" aria-hidden="true">L</span><span><b>LeoFa</b><small>co-curator</small></span></div>
      </div>
    </div>
  </div>
</section>

<section class="section contact" id="kontak" aria-labelledby="h-kontak">
  <div class="wrap">
    <div class="postcard scrap taped rv">
      <div class="pc-msg">
        <p class="hand">kirim kabar, yuk</p>
        <h2 class="h2 rv-mask" id="h-kontak"><span>Kontak</span></h2>
        <p class="lede">Punya ide cerita, nemu fakta yang keliru, atau cuma mau bilang hai? Kirim aja. Semua pesan kita baca sendiri.</p>
      </div>
      <div class="pc-side">
        <div class="stamp" aria-hidden="true"><span>${MARK}<small>KEPO POST</small></span></div>
        <ul class="pc-links">
          <li><a class="pc-link" href="${MAILTO("Halo Curioverse")}">${icon("mail")}<span><small>Email</small><b>${esc(CONTACT.email)}</b></span><i class="arr" aria-hidden="true">↗</i></a></li>
          ${CONTACT.social.map(s => `<li><a class="pc-link" href="${esc(s.url)}" target="_blank" rel="noopener">${icon(s.icon)}<span><small>${esc(s.label)}</small><b>${esc(s.handle)}</b></span><i class="arr" aria-hidden="true">↗</i></a></li>`).join("\n          ")}
        </ul>
        <button class="pc-copy" type="button" data-copy="${esc(CONTACT.email)}" data-copy-msg="Email disalin">Salin alamat email</button>
      </div>
    </div>
  </div>
</section>`;
  return page({ path:"/", title:"Curioverse", desc:"Buku catatan buat orang kepo. Finance, science, sejarah, biografi, market, saham, berita dunia, sampai kisah penipu legendaris, ditulis santai oleh AfreshiaLa & LeoFa.", body, scripts:["home.js"],
    jsonld:{ "@context":"https://schema.org", "@type":"WebSite", name:"Curioverse", url:SITE + "/", inLanguage:"id",
      sameAs:CONTACT.social.map(s => s.url), potentialAction:{ "@type":"SearchAction", target:SITE + "/explore?q={search_term_string}", "query-input":"required name=search_term_string" } } });
}

function short(v){ return v >= 1e9 ? "Rp" + (v / 1e9).toLocaleString("id-ID", { maximumFractionDigits:1 }) + " M" : "Rp" + (v / 1e6).toLocaleString("id-ID", { maximumFractionDigits:1 }) + " jt"; }

function pageHead(label, title, hand, lede){
  return `<div class="wrap page-head">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span aria-hidden="true">/</span><span>${label}</span></nav>
  <h1 class="display rv-mask"><span>${title}</span></h1>
  <p class="hand rv">${hand}</p>
  <p class="lede rv" style="--i:1">${lede}</p>
</div>`;
}

function explore(){
  const body = `
${pageHead("Explore", "Semua cerita", "pilih, cari, atau acak aja", "Semua cerita Curioverse. Filter per topik, cari kata kunci, atau urutkan biar yang singkat duluan.")}
<section class="wrap" aria-label="Daftar cerita" style="padding-bottom:var(--section-y)">
  <div class="controls">
    <div class="scroller"><div class="chips" id="chips" role="group" aria-label="Filter topik">
      <button class="chip" type="button" data-cat="all" aria-pressed="true">Semua <span class="n">${A.length}</span></button>
      ${ORDER.map(c => `<button class="chip" type="button" data-cat="${c}" aria-pressed="false" style="--dotc:var(--c-${c})"><span class="dot" aria-hidden="true"></span>${CATS[c].label} <span class="n">${countFor(c) || "segera"}</span></button>`).join("")}
    </div></div>
    <div class="filters">
      <label class="field" for="q">${icon("search")}<span class="sr">Cari di daftar cerita</span><input id="q" type="search" placeholder="Cari: saham, bintang, Kartini" autocomplete="off" enterkeyhint="search"></label>
      <div class="select"><label class="sr" for="sort">Urutkan</label><select id="sort"><option value="new">Terbaru dulu</option><option value="short">Paling singkat dulu</option><option value="az">Judul A sampai Z</option></select></div>
    </div>
    <div class="active-bar" id="active" aria-live="polite"><span>Menampilkan ${A.length} cerita</span></div>
  </div>
  <div class="note-box taped" id="digest" hidden><b>Digest mingguan Radar Global</b><p>Edisi pertama lagi diracik dan belum ada isinya. Nanti di sini muncul rangkuman berita dunia minggu itu, lengkap dengan link sumber aslinya. Sementara itu, ini bekal buat baca berita global.</p></div>
  <div class="grid" id="results">${latest.map((a, i) => card(a, i)).join("")}</div>
  <div class="empty" id="none" hidden>
    <h2>Belum ketemu yang cocok.</h2>
    <p id="none-msg">Coba kata yang lebih umum atau pilih topik lain.</p>
    <div class="chips-row">${["saham","bintang","Kartini","inflasi"].map(w => `<button class="chip" type="button" data-try="${w}">${w}</button>`).join("")}</div>
    <div class="hero-ctas" style="margin-top:0"><button class="btn btn-ghost" type="button" id="reset">Reset filter</button><button class="btn btn-primary" type="button" data-surprise>${icon("dice")}Surprise Me</button></div>
  </div>
</section>`;
  return page({ path:"/explore", title:"Explore stories", desc:`Semua ${A.length} cerita Curioverse: finance, science, sejarah, biografi, market, saham, global news, dan Scam Files.`, body, active:"/explore", scripts:["explore.js"] });
}

function paths(){
  const body = `
${pageHead("Reading Paths", "Reading Paths", "a.k.a. rabbit holes", "Kita nyebutnya Rabbit Holes: seri cerita yang saling nyambung. Baca dari cerita pertama, dan di akhir tiap cerita ada tombol buat lanjut ke berikutnya.")}
<div class="wrap" style="padding-bottom:var(--section-y)">
  ${HOLES.map(h => `<section class="path-full rv" id="${h.id}" aria-labelledby="h-${h.id}">
    <div><h2 id="h-${h.id}">${esc(h.title)}</h2><p>${esc(h.dek)}</p><p class="meta" style="margin-top:12px">${String(h.ids.length).padStart(2, "0")} cerita · ±${pathMinutes(h)} menit</p>${constellation(h)}<div class="hero-ctas"><a class="btn btn-primary" href="/stories/${h.ids[0]}">Mulai dari cerita 1 <i class="arr" aria-hidden="true">↗</i></a></div></div>
    <ol class="steps">${h.ids.map(id => `<li><a href="/stories/${id}"><span class="t">${esc(BY[id].title)}</span><span class="m">${BY[id].min} mnt</span></a></li>`).join("")}</ol>
  </section>`).join("")}
</div>`;
  return page({ path:"/reading-paths", title:"Reading Paths", desc:"Rabbit Holes Curioverse: seri cerita yang saling nyambung, dari bunga tulip ke bursa saham sampai cahaya bintang.", body, active:"/reading-paths" });
}

function lab(){
  const sec = (id, n, label, title, accent, lede, inner) => `<section class="lab-sec" id="${id}" aria-labelledby="h-${id}"><div class="wrap">
  <p class="hand rv">${label.toLowerCase()}</p><h2 class="h2 rv-mask" id="h-${id}"><span>${title} ${accent}</span></h2><p class="lede rv">${lede}</p>
  <div class="panel rv">${inner}</div></div></section>`;
  const body = `
${pageHead("Lab", "Lab Kepo", "belajar sambil pencet-pencet", "Tiga simulasi kecil buat ngerti konsep yang biasanya cuma dijelasin pakai teks. Bisa dipakai pakai mouse, sentuhan, atau keyboard.")}
<nav class="lab-nav" aria-label="Lompat ke simulasi"><div class="wrap scroller"><div class="chips">
  <a class="chip" href="#bunga">${icon("finance")}Bunga majemuk</a><a class="chip" href="#candlestick">${icon("saham")}Anatomi candlestick</a><a class="chip" href="#cahaya">${icon("science")}Delay cahaya</a>
</div></div></nav>
${sec("bunga", "01", "Finance", "Duit kamu, kalau dikasih", "waktu.", `Ubah angkanya pakai slider atau ketik langsung. Konsepnya dijelasin di cerita <a class="link" href="/stories/majemuk">Bunga majemuk</a>.`, `<div class="panel-grid">
    <div class="vstack">
      ${[["start","Setoran awal","Rp",0,100000000,500000,5000000],["month","Nabung per bulan","Rp",0,10000000,100000,500000],["rate","Bunga per tahun","%",1,15,.5,6],["years","Lama waktu","tahun",1,40,1,15]].map(([k,l,u,mn,mx,st,v]) => `<div class="ctrl">
        <div class="ctrl-top"><label for="r-${k}">${l}</label><label class="num" for="n-${k}">${u === "Rp" ? "<span>Rp</span>" : ""}<input id="n-${k}" type="text" inputmode="${u === "%" ? "decimal" : "numeric"}" aria-label="${l} (angka)">${u !== "Rp" ? `<span>${u}</span>` : ""}</label></div>
        <input id="r-${k}" type="range" min="${mn}" max="${mx}" step="${st}" value="${v}">
      </div>`).join("")}
      <p class="note">Simulasi bunga majemuk bulanan dengan angka contoh. Bukan saran investasi: aslinya ada inflasi, pajak, biaya, dan return yang naik turun.</p>
    </div>
    <div class="vstack">
      <div class="big-out"><span class="l">Total di akhir periode</span><span class="v" id="o-total">Rp0</span></div>
      <dl class="kv"><div><dt>Total setoran</dt><dd id="o-dep">Rp0</dd></div><div><dt>Hasil bunga</dt><dd id="o-int">Rp0</dd></div><div><dt>Rule of 72: dobel tiap</dt><dd id="o-72">-</dd></div><div><dt>Porsi dari bunga</dt><dd id="o-share">-</dd></div></dl>
      <svg class="chart" id="chart" viewBox="0 0 600 260" role="img" aria-label="Grafik saldo per tahun"></svg>
      <div class="legend"><span><i style="background:var(--up)"></i>Setoran kamu</span><span><i style="background:var(--gold)"></i>Bunga yang numpuk</span></div>
      <p class="summary" id="o-sum" aria-live="polite"></p>
    </div>
  </div>`)}
${sec("candlestick", "02", "Saham", "Satu lilin, empat", "harga.", `Pilih bagian lilinnya, lewat tombol atau langsung di gambar. Bacaan lengkapnya di <a class="link" href="/stories/candle">Cara baca candlestick</a>.`, `<div class="panel-grid">
    <div class="vstack">
      <div class="parts" id="parts" role="group" aria-label="Bagian candlestick">${["high","open","close","low","body","wick"].map(p => `<button class="chip" type="button" data-part="${p}" aria-pressed="false">${p[0].toUpperCase() + p.slice(1)}</button>`).join("")}</div>
      <div class="explain" id="explain" aria-live="polite"><b>Mulai dari mana aja.</b> Tiap lilin merangkum satu periode, misalnya satu hari perdagangan.</div>
      <p class="note">Warna naik dan turun beda-beda tiap aplikasi, jadi cek legendanya. Di sini naik ditandai "Naik", turun ditandai "Turun".</p>
    </div>
    <svg class="candle-svg" id="candle" viewBox="0 0 400 300" role="img" aria-label="Dua candlestick: satu naik, satu turun, dengan label open, high, low, close">
      <text x="110" y="18" text-anchor="middle" class="lbl-strong">Naik</text><text x="290" y="18" text-anchor="middle" class="lbl-strong">Turun</text>
      <g><line class="part p-wick p-high" x1="110" y1="36" x2="110" y2="80" stroke="var(--up)" stroke-width="3"/><rect class="part p-body p-open p-close" x="84" y="80" width="52" height="110" rx="4" fill="var(--up)"/><line class="part p-wick p-low" x1="110" y1="190" x2="110" y2="250" stroke="var(--up)" stroke-width="3"/>
        <text class="part p-high" x="64" y="40" text-anchor="end">HIGH</text><text class="part p-close" x="64" y="84" text-anchor="end">CLOSE</text><text class="part p-open" x="64" y="194" text-anchor="end">OPEN</text><text class="part p-low" x="64" y="254" text-anchor="end">LOW</text></g>
      <g><line class="part p-wick p-high" x1="290" y1="50" x2="290" y2="96" stroke="var(--down)" stroke-width="3"/><rect class="part p-body p-open p-close" x="264" y="96" width="52" height="104" rx="4" fill="none" stroke="var(--down)" stroke-width="3"/><line class="part p-wick p-low" x1="290" y1="200" x2="290" y2="270" stroke="var(--down)" stroke-width="3"/>
        <text class="part p-high" x="336" y="54">HIGH</text><text class="part p-open" x="336" y="100">OPEN</text><text class="part p-close" x="336" y="204">CLOSE</text><text class="part p-low" x="336" y="274">LOW</text></g>
      <rect class="hit" data-part="wick" x="90" y="30" width="40" height="50" fill="transparent"/><rect class="hit" data-part="body" x="80" y="80" width="60" height="110" fill="transparent"/><rect class="hit" data-part="wick" x="90" y="190" width="40" height="64" fill="transparent"/>
      <rect class="hit" data-part="wick" x="270" y="44" width="40" height="52" fill="transparent"/><rect class="hit" data-part="body" x="260" y="96" width="60" height="104" fill="transparent"/><rect class="hit" data-part="wick" x="270" y="200" width="40" height="74" fill="transparent"/>
    </svg>
  </div>`)}
${sec("cahaya", "03", "Science", "Cahaya yang kamu lihat itu", "masa lalu.", `Pilih sumber cahayanya. Bacaan lengkapnya di <a class="link" href="/stories/cahaya">Bintang yang kamu lihat malam ini</a>.`, `<div class="vstack">
    <div class="seg" id="lightSeg" role="radiogroup" aria-label="Pilih sumber cahaya"></div>
    <svg class="light-svg" viewBox="0 0 720 120" aria-hidden="true">
      <line class="track" x1="40" y1="60" x2="680" y2="60" stroke-width="2"/><circle cx="40" cy="60" r="14" fill="var(--blue)"/><text x="40" y="104" text-anchor="middle">BUMI</text>
      <use href="#star4" x="660" y="40" width="40" height="40" fill="var(--gold)"/><text id="lightName" x="680" y="104" text-anchor="middle">Matahari</text><circle id="photon" cx="680" cy="60" r="6" fill="var(--gold-text)"/>
    </svg>
    <div class="big-out" aria-live="polite"><span class="l" id="lightLbl">Waktu tempuh cahaya dari Matahari</span><span class="v" id="lightTime">8 menit 20 detik</span></div>
    <p id="lightFun" class="lede"></p>
    <p class="note">Animasinya pakai skala logaritmik biar Bulan dan Andromeda muat di satu layar. Angka jarak adalah perkiraan rata-rata.</p>
  </div>`)}`;
  return page({ path:"/lab", title:"Lab Kepo", desc:"Simulasi interaktif Curioverse: kalkulator bunga majemuk, anatomi candlestick saham, dan waktu tempuh cahaya dari Bulan sampai Andromeda.", body, active:"/lab", scripts:["lab.js"] });
}

function story(a){
  const hole = holeOf(a.id);
  const pos = hole ? hole.ids.indexOf(a.id) : -1;
  const nextId = hole && pos < hole.ids.length - 1 ? hole.ids[pos + 1] : null;
  const money = ["finance","market","saham"].includes(a.cat) || ["finance","market","saham"].includes(a.also);
  const kinds = KINDS[a.id] || {};
  const usedKinds = [...new Set(a.s.map((_, i) => kinds[i] || "fakta"))];
  const rel = [];
  if (hole) hole.ids.forEach(id => { if (id !== a.id && id !== nextId) rel.push(id); });
  A.forEach(x => { if (x.id !== a.id && x.id !== nextId && !rel.includes(x.id) && (x.cat === a.cat || x.also === a.cat || x.cat === a.also)) rel.push(x.id); });
  latest.forEach(x => { if (x.id !== a.id && x.id !== nextId && !rel.includes(x.id)) rel.push(x.id); });
  const body = `
<article class="story wrap">
  <div class="story-in">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span aria-hidden="true">/</span><a href="/explore?topik=${a.cat}">${CATS[a.cat].label}</a></nav>
    <h1 class="display rv-mask"><span>${esc(a.title)}</span></h1>
    <p class="dek rv">${esc(a.dek)}</p>
    <div class="byline rv" style="--i:1">
      <span class="who"><span class="av" aria-hidden="true">A</span><span class="av" aria-hidden="true">L</span>Dikurasi oleh ${esc(CURATORS)}</span>
      <span class="meta"><time datetime="${a.date}">${fmtDate(a.date)}</time><span aria-hidden="true">·</span><span>${a.min} menit baca</span>${a.also ? `<span aria-hidden="true">·</span><a href="/explore?topik=${a.also}">juga di ${CATS[a.also].label}</a>` : ""}</span>
    </div>
    ${hole ? `<p class="path-banner rv" style="--i:2"><span>Reading Path: <b>${esc(hole.title)}</b></span><span class="tnum">Story ${pos + 1} of ${hole.ids.length}</span><span class="bar" aria-hidden="true"><i style="width:${Math.round((pos + 1) / hole.ids.length * 100)}%"></i></span></p>` : ""}
    <p class="legend-k">Tiap bagian ditandai: ${usedKinds.map(k => `<span class="kind" data-k="${k}">${KIND_LABEL[k]}</span>`).join("")}</p>
    <details class="toc"><summary>Isi cerita · ${a.s.length} bagian</summary><ol>${a.s.map((x, i) => `<li><a href="#bagian-${i + 1}">${esc(x[0])}</a></li>`).join("")}</ol></details>
    ${figure((IMAGES[a.id] || {}).hero, "story-fig story-hero", a.id)}
    <div class="body" data-article>
      ${a.s.map((x, i) => `<h2 id="bagian-${i + 1}"><span class="kind" data-k="${kinds[i] || "fakta"}">${KIND_LABEL[kinds[i] || "fakta"]}</span>${esc(x[0])}</h2>${figure(((IMAGES[a.id] || {}).sections || {})[i])}${x[1].map(p => `<p>${esc(p)}</p>`).join("")}`).join("\n      ")}
    </div>
    ${money ? `<p class="disc">Konten ini buat belajar dan nambah wawasan, bukan saran investasi atau keuangan.</p>` : ""}
    <section class="sources" aria-labelledby="h-src"><h2 id="h-src">Sumber &amp; bacaan lanjutan</h2>
      <ol>${(SOURCES[a.id] || []).map(s => `<li>${s.u ? `<a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a>` : esc(s.t)}</li>`).join("")}</ol>
      <p>Nemu yang keliru? <a href="${MAILTO("Koreksi: " + a.title)}">Kabarin kita lewat email</a>, nanti dikoreksi dan dicatat di sini.</p>
    </section>
    ${nextId ? `<a class="next scrap taped" href="/stories/${nextId}"><small>Story ${pos + 2} of ${hole.ids.length} · ${esc(hole.title)}</small><b>${esc(BY[nextId].title)}</b><span>Continue This Rabbit Hole →</span></a>` : hole ? `<a class="next scrap taped" href="/reading-paths"><small>Kamu udah tamat reading path ini</small><b>${esc(hole.title)}</b><span>Pilih reading path lain →</span></a>` : ""}
    <section class="related" aria-labelledby="h-rel"><h2 id="h-rel">Baca juga</h2><div class="grid">${rel.slice(0, 3).map((id, i) => card(BY[id], i)).join("")}</div></section>
    <div class="story-actions"><button class="btn btn-primary" type="button" data-surprise>${icon("dice")}Surprise Me</button><button class="btn btn-ghost" type="button" data-share>${icon("share")}Bagikan</button><a class="btn btn-ghost" href="/explore">Semua cerita</a></div>
  </div>
</article>`;
  return page({ path:`/stories/${a.id}`, title:a.title, desc:a.dek, body, ogType:"article", image:heroOf(a),
    jsonld:{ "@context":"https://schema.org", "@type":"Article", headline:a.title, description:a.dek, datePublished:a.date, dateModified:a.date, inLanguage:"id",
      author:[{ "@type":"Person", name:"AfreshiaLa" }, { "@type":"Person", name:"LeoFa" }], publisher:{ "@type":"Organization", name:"Curioverse" },
      mainEntityOfPage:SITE + "/stories/" + a.id, ...(heroOf(a) ? { image:/^https:/.test(heroOf(a).src) ? heroOf(a).src : SITE + heroOf(a).src } : {}), articleSection:CATS[a.cat].label, keywords:a.tags, citation:(SOURCES[a.id] || []).map(s => s.u || s.t) } });
}

function notFound(){
  return page({ path:"/404", title:"Halaman tidak ditemukan", desc:"Halaman tidak ditemukan.", body:`${pageHead("404", "Nyasar ke luar orbit", "halaman ini nggak ketemu", "Link-nya mungkin salah ketik atau ceritanya udah pindah. Coba mulai dari sini.")}<div class="wrap" style="padding-bottom:var(--section-y)"><div class="hero-ctas"><a class="btn btn-primary" href="/explore">Explore Stories <i class="arr" aria-hidden="true">↗</i></a><button class="btn btn-ghost" type="button" data-surprise>${icon("dice")}Surprise Me</button></div></div>` });
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
const copyDir = (from, to) => { mkdirSync(join(OUT, to), { recursive:true }); for (const f of readdirSync(join(ROOT, from))) copyFileSync(join(ROOT, from, f), join(OUT, to, f)); };
for (const f of ["styles.css","app.js","home.js","explore.js","lab.js"]) { mkdirSync(join(OUT, "assets"), { recursive:true }); copyFileSync(join(ROOT, "src", f), join(OUT, "assets", f)); }
copyDir("assets/vendor", "assets/vendor");
copyDir("assets/fonts", "assets/fonts");
copyDir("assets/illustrations", "assets/illustrations");
copyFileSync(join(ROOT, "favicon.svg"), join(OUT, "favicon.svg"));
// Instagram media (social/<tgl>/<post>/...) is served publicly so the Instagram API can fetch it.
const copyMedia = (rel) => { const src = join(ROOT, rel); if (!existsSync(src)) return;
  for (const f of readdirSync(src, { withFileTypes:true })) {
    const r = join(rel, f.name);
    if (f.isDirectory()) copyMedia(r);
    else if (/\.(jpe?g|png|mp4)$/i.test(f.name)) { mkdirSync(join(OUT, rel), { recursive:true }); copyFileSync(join(ROOT, r), join(OUT, r)); }
  } };
copyMedia("social");
const urls = ["/", "/explore", "/lab", "/reading-paths", ...A.map(a => "/stories/" + a.id)];
const lastmod = Object.fromEntries(A.map(a => ["/stories/" + a.id, a.date]));
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc>${lastmod[u] ? `<lastmod>${lastmod[u]}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`);
// RSS: the 20 newest stories, so readers can follow Curioverse in a feed reader.
const rssDate = d => new Date(d + "T07:00:00+07:00").toUTCString();
write("feed.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Curioverse</title><link>${SITE}/</link><description>Buku catatan buat orang kepo, oleh ${esc(CURATORS)}.</description><language>id</language>
<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${latest.slice(0, 20).map(a => `<item><title>${esc(a.title)}</title><link>${SITE}/stories/${a.id}</link><guid>${SITE}/stories/${a.id}</guid><pubDate>${rssDate(a.date)}</pubDate><category>${esc(CATS[a.cat].label)}</category><description>${esc(a.dek)}</description></item>`).join("\n")}
</channel></rss>
`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Built ${urls.length + 1} pages into dist/`);
