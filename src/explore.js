/* Curioverse · explore: topic chips, search, sort. State lives in the URL (?topik=&q=&urut=). */
(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const grid = $("#results"), cards = $$("#results .card"), q = $("#q"), sort = $("#sort");
const none = $("#none"), active = $("#active"), digest = $("#digest");
const params = new URLSearchParams(location.search);
const state = {
  cat: CV.LABEL[params.get("topik")] ? params.get("topik") : "all",
  q: params.get("q") || "",
  sort: ["new","short","az"].includes(params.get("urut")) ? params.get("urut") : "new"
};
q.value = state.q; sort.value = state.sort;

function syncUrl(){
  const p = new URLSearchParams();
  if (state.cat !== "all") p.set("topik", state.cat);
  if (state.q.trim()) p.set("q", state.q.trim());
  if (state.sort !== "new") p.set("urut", state.sort);
  const s = p.toString();
  try { history.replaceState(null, "", location.pathname + (s ? "?" + s : "")); } catch(e){}
}
function render(){
  $$("#chips .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)));
  const terms = CV.norm(state.q.trim()).split(/\s+/).filter(Boolean);
  const shown = cards.filter(c => {
    const okCat = state.cat === "all" || c.dataset.c === state.cat || c.dataset.also === state.cat;
    const okQ = terms.every(t => c.dataset.h.includes(t));
    c.hidden = !(okCat && okQ);
    return !c.hidden;
  });
  const by = { new:(a, b) => b.dataset.date.localeCompare(a.dataset.date), short:(a, b) => (+a.dataset.min - +b.dataset.min) || b.dataset.date.localeCompare(a.dataset.date), az:(a, b) => a.dataset.title.localeCompare(b.dataset.title, "id") }[state.sort];
  cards.slice().sort(by).forEach(c => grid.appendChild(c));
  none.hidden = shown.length > 0; grid.hidden = shown.length === 0;
  digest.hidden = state.cat !== "global";
  if (!shown.length) $("#none-msg").textContent = state.q.trim() ? `Nggak ada cerita yang cocok sama "${state.q.trim()}"${state.cat !== "all" ? " di topik " + CV.LABEL[state.cat] : ""}. Coba kata lain atau topik lain.` : "Belum ada cerita di filter ini.";
  // visible active filters
  const tags = [];
  if (state.cat !== "all") tags.push(`<span class="tag">Topik: ${CV.LABEL[state.cat]}<button type="button" data-clear="cat" aria-label="Hapus filter topik ${CV.LABEL[state.cat]}"><svg class="ico" aria-hidden="true" style="width:16px;height:16px"><use href="#i-close"/></svg></button></span>`);
  if (state.q.trim()) tags.push(`<span class="tag">"${CV.esc(state.q.trim())}"<button type="button" data-clear="q" aria-label="Hapus kata kunci"><svg class="ico" aria-hidden="true" style="width:16px;height:16px"><use href="#i-close"/></svg></button></span>`);
  active.innerHTML = `<span>${shown.length ? `Menampilkan ${shown.length} dari ${cards.length} cerita` : "0 cerita"}</span>${tags.join("")}${tags.length ? '<button class="clear" type="button" data-clear="all">Hapus semua filter</button>' : ""}`;
  syncUrl();
}
$("#chips").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; render(); } });
let t; q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { state.q = q.value; render(); }, 120); });
sort.addEventListener("change", () => { state.sort = sort.value; render(); });
active.addEventListener("click", e => {
  const c = e.target.closest("[data-clear]"); if (!c) return;
  if (c.dataset.clear !== "q") state.cat = "all";
  if (c.dataset.clear !== "cat") { state.q = ""; q.value = ""; }
  render(); q.focus();
});
$("#reset").addEventListener("click", () => { state.cat = "all"; state.q = ""; q.value = ""; render(); q.focus(); });
none.addEventListener("click", e => { const b = e.target.closest("[data-try]"); if (b) { state.cat = "all"; state.q = b.dataset.try; q.value = state.q; render(); } });
render();
const chip = $(`#chips [data-cat="${state.cat}"]`); if (chip && state.cat !== "all") chip.scrollIntoView({ inline:"center", block:"nearest" });
})();
