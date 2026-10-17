/* Curioverse · shared behaviour: Lenis, nav, menu, search, Surprise Me, reveals, theme. */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k, s = localStorage){ try { return s.getItem(k); } catch(e){ return null; } },
  set(k, v, s = localStorage){ try { s.setItem(k, v); } catch(e){} }
};
let INDEX = [];
try { INDEX = JSON.parse($("#cv-index").textContent); } catch(e){}
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
let LABEL = { finance:"Finance", science:"Science", sejarah:"Sejarah", biografi:"Biografi", market:"Market", saham:"Saham", global:"Global News", scam:"Scam Files" };
try { LABEL = JSON.parse($("#cv-labels").textContent); } catch(e){}
const sysDark = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : sysDark.matches;
window.CV = { INDEX, norm, esc, LABEL, store, isDark, reduced };

/* ---------- smooth scroll (Lenis), skipped for reduced motion ---------- */
let lenis = null;
if (!reduced && window.Lenis) {
  const navH = parseFloat(getComputedStyle(root).getPropertyValue("--nav-h")) || 72;
  lenis = new Lenis({ autoRaf:true, lerp:.1, smoothWheel:true, wheelMultiplier:1, touchMultiplier:1.2, anchors:{ offset:-(navH + 16) } });
}
window.CV.lenis = lenis;
const lock = on => { if (on) { lenis && lenis.stop(); root.style.overflow = "hidden"; } else { lenis && lenis.start(); root.style.overflow = ""; } };

/* ---------- theme ---------- */
const syncTheme = () => $$("[data-theme-toggle]").forEach(b => b.setAttribute("aria-label", isDark() ? "Ganti ke tema terang" : "Ganti ke tema gelap"));
syncTheme();
document.addEventListener("click", e => {
  if (!e.target.closest("[data-theme-toggle]")) return;
  root.dataset.theme = isDark() ? "light" : "dark"; store.set("cv-theme", root.dataset.theme); syncTheme();
  window.dispatchEvent(new Event("cv-theme"));
});
sysDark.addEventListener("change", () => { syncTheme(); window.dispatchEvent(new Event("cv-theme")); });

/* ---------- nav: scrolled state, page progress, sliding ink indicator ---------- */
const nav = $("[data-nav]"), bar = $("[data-progress]"), orbit = $("[data-orbit]"), foot = $(".foot");
let raf = 0;
const tick = () => {
  raf = 0;
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  nav.classList.toggle("is-scrolled", y > 40);
  if (orbit && foot) {
    const r = foot.getBoundingClientRect();
    orbit.style.strokeDashoffset = reduced ? 0 : String(1 - Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height * .9))));
  }
};
const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
addEventListener("scroll", onScroll, { passive:true }); addEventListener("resize", onScroll); tick();

const pill = $(".nav-pill"), ind = $(".nav-ind");
if (pill && ind) {
  const links = $$(".nav-link", pill);
  const current = links.find(a => a.getAttribute("aria-current") === "page");
  const place = a => {
    links.forEach(l => l.classList.toggle("is-on", l === a));
    if (!a) { ind.style.setProperty("--o", "0"); return; }
    ind.style.setProperty("--x", a.offsetLeft - 5 + "px"); ind.style.setProperty("--w", a.offsetWidth + "px"); ind.style.setProperty("--o", "1");
  };
  links.forEach(a => { a.addEventListener("mouseenter", () => place(a)); a.addEventListener("focus", () => place(a)); });
  pill.addEventListener("mouseleave", () => place(current));
  pill.addEventListener("focusout", e => { if (!pill.contains(e.relatedTarget)) place(current); });
  place(current);
  addEventListener("resize", () => place(current));
  document.fonts && document.fonts.ready.then(() => place(current)).catch(() => {});
  if (current) nav.classList.add("is-solid");
}

/* ---------- dialogs: menu (circle reveal) + search ---------- */
const menu = $("#menu"), search = $("#search");
let opener = null;
function openDialog(d, from){
  [menu, search].forEach(x => { if (x !== d && x.open) x.close(); });
  if (d.open) return;
  opener = document.activeElement;
  if (d === menu && from) { const r = from.getBoundingClientRect(); menu.style.setProperty("--mx", r.left + r.width / 2 + "px"); menu.style.setProperty("--my", r.top + r.height / 2 + "px"); }
  d.showModal(); lock(true);
  if (d === menu) requestAnimationFrame(() => menu.classList.add("is-shown"));
}
function closeDialog(d){
  if (!d.open) return;
  if (d === menu && !reduced) {
    menu.classList.remove("is-shown"); menu.classList.add("is-closing");
    setTimeout(() => { menu.classList.remove("is-closing"); menu.close(); }, 520);
  } else d.close();
}
[menu, search].forEach(d => {
  d.addEventListener("cancel", e => { e.preventDefault(); closeDialog(d); });
  d.addEventListener("click", e => { if (e.target === d && d === search) closeDialog(d); if (e.target.closest("[data-close]")) closeDialog(d); });
  d.addEventListener("close", () => { lock(false); if (opener && document.contains(opener) && !menu.open && !search.open) opener.focus({ preventScroll:true }); });
});
$$("[data-menu]").forEach(b => b.addEventListener("click", () => openDialog(menu, b)));
menu.addEventListener("click", e => { const a = e.target.closest("a[href]"); if (a && a.getAttribute("href").startsWith("/#") && location.pathname === "/") { closeDialog(menu); } });

/* ---------- search ---------- */
const sq = $("#sq"), sres = $("#sres"), sresWrap = $("#sres-wrap"), sempty = $("#sempty"), snone = $("#snone");
let sel = -1, hits = [];
const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
$$("[data-kbd]").forEach(k => k.textContent = isMac ? "⌘K" : "Ctrl K");
function runSearch(){
  const q = norm(sq.value.trim());
  sel = -1; sq.removeAttribute("aria-activedescendant");
  if (!q) { sresWrap.hidden = true; snone.hidden = true; sempty.hidden = false; return; }
  hits = INDEX.filter(a => q.split(/\s+/).every(t => a.h.includes(t)));
  sempty.hidden = true;
  if (!hits.length) { sresWrap.hidden = true; snone.hidden = false; $("#sq-echo").textContent = sq.value.trim(); return; }
  snone.hidden = true; sresWrap.hidden = false;
  $("#scount").textContent = hits.length + " cerita ketemu";
  sres.innerHTML = hits.map((a, i) => `<li><a href="/stories/${a.id}" id="sopt-${i}" role="option" aria-selected="false"><svg class="ico" aria-hidden="true"><use href="#i-${a.c}"/></svg><span><span class="tt">${esc(a.t)}</span><span class="mm">${LABEL[a.c]} · ${a.m} menit</span></span></a></li>`).join("");
}
function move(d){
  if (!hits.length || sresWrap.hidden) return;
  sel = (sel + d + hits.length) % hits.length;
  $$("[role=option]", sres).forEach((o, i) => o.setAttribute("aria-selected", String(i === sel)));
  const o = $("#sopt-" + sel); sq.setAttribute("aria-activedescendant", o.id); o.scrollIntoView({ block:"nearest" });
}
function openSearch(){ openDialog(search); sq.value = ""; runSearch(); sq.focus(); }
sq.addEventListener("input", runSearch);
sq.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
  else if (e.key === "Enter") { e.preventDefault(); const t = hits[sel >= 0 ? sel : 0]; if (t && !sresWrap.hidden) location.href = "/stories/" + t.id; }
});
search.addEventListener("click", e => { const c = e.target.closest("[data-q]"); if (c) { sq.value = c.dataset.q; runSearch(); sq.focus(); } });
document.addEventListener("click", e => { if (e.target.closest("[data-search]")) { e.preventDefault(); openSearch(); } });
document.addEventListener("keydown", e => {
  if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); search.open ? closeDialog(search) : openSearch(); }
  else if (e.key === "/" && !search.open && !menu.open && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
});

/* ---------- Surprise Me: real story URLs, no repeats until the deck runs out ---------- */
const here = (location.pathname.match(/^\/stories\/([a-z0-9-]+)/) || [])[1] || null;
function surprise(){
  let deck = [];
  try { deck = JSON.parse(store.get("cv-deck", sessionStorage) || "[]"); } catch(e){}
  deck = deck.filter(id => id !== here && INDEX.some(a => a.id === id));
  if (!deck.length) {
    deck = INDEX.map(a => a.id).filter(id => id !== here);
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  }
  const next = deck.shift();
  store.set("cv-deck", JSON.stringify(deck), sessionStorage);
  if (next) location.href = "/stories/" + next;
}
document.addEventListener("click", e => { if (e.target.closest("[data-surprise]")) { e.preventDefault(); surprise(); } });

/* ---------- reveals: fade + rise, and lines sliding out of a mask (once) ---------- */
const nodes = $$(".rv, .rv-mask");
if ("IntersectionObserver" in window && !reduced) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { rootMargin:"0px 0px -8% 0px", threshold:.12 });
  nodes.forEach(n => io.observe(n));
} else nodes.forEach(n => n.classList.add("is-in"));

/* ---------- chip scrollers: hide the end fade ---------- */
$$(".scroller > .chips").forEach(row => {
  const upd = () => row.parentElement.style.setProperty("--fade", row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 ? "0" : "1");
  row.addEventListener("scroll", upd, { passive:true }); addEventListener("resize", upd); upd();
});
})();
