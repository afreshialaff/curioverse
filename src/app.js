/* Curioverse · shared behaviour: theme, menu, search, Surprise Me, reveals. */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const store = {
  get(k, s = localStorage){ try { return s.getItem(k); } catch(e){ return null; } },
  set(k, v, s = localStorage){ try { s.setItem(k, v); } catch(e){} }
};
let INDEX = [];
try { INDEX = JSON.parse($("#cv-index").textContent); } catch(e){}
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const LABEL = { finance:"Finance", science:"Science", sejarah:"Sejarah", biografi:"Biografi", market:"Market", saham:"Saham", global:"Global News" };
window.CV = { INDEX, norm, esc, LABEL, store };

/* ---------- theme ---------- */
const sysDark = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : sysDark.matches;
window.CV.isDark = isDark;
const syncTheme = () => $$("[data-theme-toggle]").forEach(b => b.setAttribute("aria-label", isDark() ? "Ganti ke tema terang" : "Ganti ke tema gelap"));
syncTheme();
document.addEventListener("click", e => {
  if (!e.target.closest("[data-theme-toggle]")) return;
  const next = isDark() ? "light" : "dark";
  root.dataset.theme = next; store.set("cv-theme", next); syncTheme();
  window.dispatchEvent(new Event("cv-theme"));
});
sysDark.addEventListener("change", () => { syncTheme(); window.dispatchEvent(new Event("cv-theme")); });

/* ---------- dialogs ---------- */
const menu = $("#menu"), search = $("#search");
let opener = null;
function openDialog(d){
  [menu, search].forEach(x => { if (x !== d && x.open) x.close(); });
  if (!d.open) { opener = document.activeElement; d.showModal(); }
}
[menu, search].forEach(d => {
  d.addEventListener("click", e => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
  d.addEventListener("close", () => { if (opener && document.contains(opener) && !menu.open && !search.open) opener.focus({ preventScroll:true }); });
});
$$("[data-menu]").forEach(b => b.addEventListener("click", () => openDialog(menu)));
menu.addEventListener("click", e => { if (e.target.closest("a[href^='/#']")) menu.close(); });

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
function openSearch(q = ""){ openDialog(search); sq.value = q; runSearch(); sq.focus(); }
window.CV.openSearch = openSearch;
sq.addEventListener("input", runSearch);
sq.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
  else if (e.key === "Enter") {
    e.preventDefault();
    const target = hits[sel >= 0 ? sel : 0];
    if (target && !sresWrap.hidden) location.href = "/stories/" + target.id;
  }
});
search.addEventListener("click", e => { const c = e.target.closest("[data-q]"); if (c) { sq.value = c.dataset.q; runSearch(); sq.focus(); } });
document.addEventListener("click", e => { if (e.target.closest("[data-search]")) { e.preventDefault(); openSearch(); } });
document.addEventListener("keydown", e => {
  if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); search.open ? search.close() : openSearch(); }
  else if (e.key === "/" && !search.open && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
});

/* ---------- Surprise Me: real article URLs, no repeats until the deck runs out ---------- */
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

/* ---------- one-time reveal ---------- */
const rv = $$(".rv");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin:"0px 0px -8% 0px" });
  rv.forEach(el => io.observe(el));
} else rv.forEach(el => el.classList.add("in"));

/* ---------- horizontal chip scrollers: hide the fade at the end ---------- */
$$(".scroller > .chips").forEach(row => {
  const upd = () => row.parentElement.style.setProperty("--fade", row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 ? "0" : "1");
  row.addEventListener("scroll", upd, { passive:true }); addEventListener("resize", upd); upd();
});
})();
