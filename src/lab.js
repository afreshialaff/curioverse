/* Curioverse · Lab Kepo: two quick games (fakta atau hoaks, duluan mana), compound interest, candlestick anatomy, light travel time. */
(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- games: shared round engine ---------- */
const DATA = JSON.parse($("#lab-games").textContent);
const ROUNDS = 8;
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const escH = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const storyLink = id => `<a class="link" href="/stories/${id}">Baca: ${escH(DATA.titles[id])}</a>`;
const best = { get:k => { try { return +localStorage.getItem("cv-best-" + k) || 0; } catch { return 0; } }, set:(k, v) => { try { localStorage.setItem("cv-best-" + k, v); } catch {} } };
const VERDICT = n => n === ROUNDS ? "Sempurna! Kepo level dewa." : n >= 6 ? "Mantap, kamu jelas rajin baca." : n >= 4 ? "Lumayan! Masih ada yang bisa dikepoin." : "Nggak apa-apa, justru ini alasan buat baca.";

function game(root, { key, unit, makeRounds, renderRound }){
  const el = n => root.querySelector(`[data-${n}]`);
  let rounds, i, score, missed;
  function dots(){ el("dots").innerHTML = rounds.map((r, k) => `<li class="${r.res === true ? "is-ok" : r.res === false ? "is-no" : k === i ? "is-now" : ""}"></li>`).join(""); }
  function start(focus){
    rounds = makeRounds(); i = 0; score = 0; missed = null;
    el("play").hidden = false; el("end").hidden = true;
    show(focus);
  }
  function show(focus){
    el("step").textContent = `${unit} ${i + 1} dari ${ROUNDS}`; el("score").textContent = "Skor " + score;
    el("fb").innerHTML = ""; dots();
    renderRound(rounds[i], el, answer);
    if (focus) el("q").focus();
  }
  function answer(ok, html){
    const r = rounds[i]; r.res = ok;
    if (ok) score++; else if (!missed) missed = r.id;
    el("score").textContent = "Skor " + score; dots();
    const last = i === ROUNDS - 1;
    el("fb").innerHTML = `<div class="fb ${ok ? "is-ok" : "is-no"}"><p class="stamp-v hand">${ok ? "Betul!" : "Yah, meleset."}</p>${html}<div class="fb-acts">${storyLink(r.id)}<button class="btn btn-primary" type="button" data-next>${last ? "Lihat skor" : "Lanjut"}</button></div></div>`;
    el("fb").querySelector("[data-next]").focus({ preventScroll:true });
  }
  function end(){
    const prev = best.get(key), rec = score > prev;
    if (rec) best.set(key, score);
    el("play").hidden = true; el("end").hidden = false;
    el("end").innerHTML = `<div class="big-out"><span class="l">Skor kamu</span><span class="v" tabindex="-1" data-final>${score} / ${ROUNDS}</span></div>
      <p class="end-msg">${VERDICT(score)}${rec && prev ? " Rekor baru!" : prev ? ` Rekor kamu: ${prev}.` : ""}</p>
      ${missed ? `<p class="note">Yang kelewat tadi ada di sini, siapa tahu jadi rabbit hole berikutnya:</p><p>${storyLink(missed)}</p>` : ""}
      <button class="btn btn-primary" type="button" data-again>Main lagi</button>`;
    el("step").textContent = "Selesai"; dots();
    el("end").querySelector("[data-final]").focus();
  }
  root.addEventListener("click", e => {
    if (e.target.closest("[data-next]")) { if (i === ROUNDS - 1) end(); else { i++; show(true); } }
    else if (e.target.closest("[data-again]")) start(true);
  });
  start(false);
}

/* Fakta atau Hoaks: half fakta, half hoaks, shuffled */
game($("#quiz"), { key:"quiz", unit:"Soal",
  makeRounds: () => { const f = shuffle(DATA.quiz.filter(q => q.ok)), h = shuffle(DATA.quiz.filter(q => !q.ok)); return shuffle([...f.slice(0, ROUNDS / 2), ...h.slice(0, ROUNDS / 2)]).map(q => ({ ...q })); },
  renderRound: (r, el, answer) => {
    el("q").textContent = r.q;
    const btns = $$("[data-ans]", el("play"));
    btns.forEach(b => { b.disabled = false; b.classList.remove("is-pick", "is-right"); b.onclick = () => {
      const pick = b.dataset.ans === "1";
      btns.forEach(x => { x.disabled = true; x.classList.toggle("is-right", (x.dataset.ans === "1") === r.ok); });
      b.classList.add("is-pick");
      answer(pick === r.ok, `<p class="why">${escH(r.why)}</p>`);
    }; });
  }
});

/* Duluan Mana: pairs of events with different years, no event used twice in one game */
game($("#order"), { key:"order", unit:"Ronde",
  makeRounds: () => { const pool = shuffle(DATA.timeline), out = [];
    while (out.length < ROUNDS && pool.length >= 2) { const a = pool.pop(), k = pool.findIndex(b => b.y !== a.y); if (k < 0) break; const b = pool.splice(k, 1)[0]; out.push({ a, b, id:(a.y < b.y ? a : b).id }); }
    return out; },
  renderRound: (r, el, answer) => {
    el("pair").innerHTML = [r.a, r.b].map((e, k) => `<button class="order-card" type="button" data-k="${k}"><span class="order-t">${escH(e.t)}</span><span class="order-y" aria-hidden="true"></span></button>`).join(`<span class="order-vs hand" aria-hidden="true">atau</span>`);
    const cards = $$(".order-card", el("pair")), ev = [r.a, r.b], first = r.a.y < r.b.y ? 0 : 1;
    cards.forEach((c, k) => c.onclick = () => {
      cards.forEach((x, j) => { x.disabled = true; x.classList.toggle("is-right", j === first); const y = x.querySelector(".order-y"); y.textContent = ev[j].y; y.removeAttribute("aria-hidden"); });
      c.classList.add("is-pick");
      const gap = Math.abs(r.a.y - r.b.y);
      answer(k === first, `<p class="why"><b>${escH(ev[first].t)}</b> terjadi tahun ${ev[first].y}, sedangkan <b>${escH(ev[1 - first].t)}</b> tahun ${ev[1 - first].y}. Selisihnya ${gap} tahun.</p>`);
    });
  }
});

/* ---------- compound interest ---------- */
const rp = new Intl.NumberFormat("id-ID");
const rupiah = v => "Rp" + rp.format(Math.round(v));
const dec = (v, d = 1) => v.toLocaleString("id-ID", { maximumFractionDigits:d });
const short = v => v >= 1e12 ? "Rp" + dec(v/1e12) + " T" : v >= 1e9 ? "Rp" + dec(v/1e9) + " M" : v >= 1e6 ? "Rp" + dec(v/1e6) + " jt" : v >= 1e3 ? "Rp" + Math.round(v/1e3) + " rb" : "Rp" + Math.round(v);
const keys = ["start","month","rate","years"];
const R = Object.fromEntries(keys.map(k => [k, $("#r-" + k)])), N = Object.fromEntries(keys.map(k => [k, $("#n-" + k)]));
const showNum = k => { const v = +R[k].value; N[k].value = k === "rate" ? dec(v) : rp.format(v); };
keys.forEach(k => {
  showNum(k);
  R[k].addEventListener("input", () => { showNum(k); calc(); });
  N[k].addEventListener("change", () => {
    let v = parseFloat(N[k].value.replace(/\./g, "").replace(",", "."));
    if (isNaN(v)) v = +R[k].value;
    v = Math.min(+R[k].max, Math.max(+R[k].min, v));
    R[k].value = v; showNum(k); calc();
  });
  N[k].addEventListener("focus", () => N[k].select());
  N[k].addEventListener("keydown", e => { if (e.key === "Enter") N[k].blur(); });
});
function niceMax(v){ if (v <= 0) return 1; const p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }
function calc(){
  const P = +R.start.value, M = +R.month.value, r = +R.rate.value / 100, Y = +R.years.value;
  let bal = P; const rows = [];
  for (let y = 1; y <= Y; y++) { for (let m = 0; m < 12; m++) bal = bal * (1 + r / 12) + M; rows.push({ y, dep:P + M * 12 * y, bal }); }
  const dep = P + M * 12 * Y, int = Math.max(0, bal - dep), dbl = 72 / (r * 100);
  $("#o-total").textContent = rupiah(bal); $("#o-dep").textContent = rupiah(dep); $("#o-int").textContent = rupiah(int);
  $("#o-72").textContent = "± " + dec(dbl) + " tahun";
  $("#o-share").textContent = bal > 0 ? Math.round(int / bal * 100) + "%" : "-";
  $("#o-sum").textContent = bal > 0
    ? `Dalam ${Y} tahun, kamu nyetor ${short(dep)} dan bunganya nambah ${short(int)}. Bunga ${dec(r * 100)}% per tahun bikin uang kira-kira dobel tiap ${dec(dbl)} tahun.`
    : "Isi setoran awal atau tabungan bulanan dulu buat lihat hasilnya.";
  const svg = $("#chart"), W = 600, H = 260, L = 64, Rr = 8, T = 10, B = 28;
  const max = niceMax(Math.max(...rows.map(x => x.bal), 1)), cw = (W - L - Rr) / rows.length, bw = Math.max(2, cw * .66);
  const yy = v => T + (H - T - B) * (1 - v / max);
  let out = "";
  [0, .5, 1].forEach(f => { const v = max * f; out += `<line class="grid-l" x1="${L}" x2="${W - Rr}" y1="${yy(v)}" y2="${yy(v)}"/><text x="${L - 8}" y="${yy(v) + 4}" text-anchor="end">${short(v)}</text>`; });
  rows.forEach((x, i) => {
    const px = L + i * cw + (cw - bw) / 2, d = Math.min(x.dep, x.bal);
    out += `<rect class="b-dep" x="${px}" y="${yy(d)}" width="${bw}" height="${Math.max(0, yy(0) - yy(d))}" rx="1.5"/><rect class="b-int" x="${px}" y="${yy(x.bal)}" width="${bw}" height="${Math.max(0, yy(d) - yy(x.bal))}" rx="1.5"/>`;
  });
  const step = rows.length > 20 ? 5 : rows.length > 10 ? 2 : 1;
  rows.forEach((x, i) => { if (x.y === 1 || x.y % step === 0 || x.y === rows.length) out += `<text x="${L + i * cw + cw / 2}" y="${H - 8}" text-anchor="middle">${x.y}</text>`; });
  svg.innerHTML = out;
  svg.setAttribute("aria-label", `Grafik saldo per tahun selama ${Y} tahun. Saldo akhir ${rupiah(bal)}, dari setoran ${rupiah(dep)} dan bunga ${rupiah(int)}.`);
}
calc();

/* ---------- candlestick ---------- */
const EXPLAIN = {
  high:"<b>High</b> adalah harga tertinggi selama periode itu. Ditunjukkan ujung atas sumbu.",
  low:"<b>Low</b> adalah harga terendah selama periode itu. Ditunjukkan ujung bawah sumbu.",
  open:"<b>Open</b> adalah harga pertama saat periode dibuka. Di lilin naik, open ada di bawah badan. Di lilin turun, open ada di atas badan.",
  close:"<b>Close</b> adalah harga terakhir saat periode ditutup. Close di atas open berarti naik, close di bawah open berarti turun.",
  body:"<b>Body</b> adalah badan lilin, jarak antara open dan close. Badan panjang artinya pergerakan harganya besar di periode itu.",
  wick:"<b>Wick</b> atau shadow adalah garis tipis di atas dan bawah badan. Panjangnya menunjukkan seberapa jauh harga sempat bergerak sebelum balik lagi."
};
const candle = $("#candle");
function part(p){
  candle.classList.add("focusing");
  $$(".part", candle).forEach(el => el.classList.toggle("hl", el.classList.contains("p-" + p)));
  $$("#parts .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.part === p)));
  $("#explain").innerHTML = EXPLAIN[p];
}
$("#parts").addEventListener("click", e => { const b = e.target.closest("[data-part]"); if (b) part(b.dataset.part); });
candle.addEventListener("click", e => { const h = e.target.closest(".hit"); if (h) part(h.dataset.part); });

/* ---------- light travel time ---------- */
const LIGHT = [
  { n:"Bulan", t:"1,3 detik", s:1.3, f:"Hampir real-time. Bulan yang kamu lihat cuma telat sedetikan." },
  { n:"Matahari", t:"8 menit 20 detik", s:500, f:"Kalau Matahari padam, Bumi baru tahu sekitar 8 menit kemudian." },
  { n:"Proxima Centauri", t:"4,24 tahun", s:4.24 * 3.156e7, f:"Cahayanya yang sampai malam ini berangkat lebih dari empat tahun lalu." },
  { n:"Pusat Bima Sakti", t:"± 26.000 tahun", s:26000 * 3.156e7, f:"Cahayanya berangkat waktu manusia masih hidup di Zaman Es terakhir." },
  { n:"Andromeda", t:"± 2,5 juta tahun", s:2.5e6 * 3.156e7, f:"Objek terjauh yang bisa dilihat mata telanjang di langit gelap. Cahayanya lebih tua dari spesies kita." }
];
const seg = $("#lightSeg"), ph = $("#photon");
let li = 1, anim;
seg.innerHTML = LIGHT.map((l, i) => `<button class="chip" type="button" role="radio" aria-checked="${i === li}" tabindex="${i === li ? 0 : -1}" data-li="${i}">${l.n}</button>`).join("");
function light(i, focus){
  li = i; const l = LIGHT[i];
  $$("[data-li]", seg).forEach((b, j) => { b.setAttribute("aria-checked", String(j === i)); b.tabIndex = j === i ? 0 : -1; if (j === i && focus) b.focus(); });
  $("#lightLbl").textContent = "Waktu tempuh cahaya dari " + l.n; $("#lightTime").textContent = l.t; $("#lightFun").textContent = l.f; $("#lightName").textContent = l.n;
  if (anim) anim.cancel();
  if (reduced || !ph.animate) { ph.setAttribute("cx", 40); return; }
  ph.setAttribute("cx", 0);
  anim = ph.animate([{ transform:"translateX(680px)" }, { transform:"translateX(40px)" }], { duration:500 + 170 * Math.log10(l.s + 1), easing:"cubic-bezier(.65,0,.35,1)", fill:"forwards" });
}
seg.addEventListener("click", e => { const b = e.target.closest("[data-li]"); if (b) light(+b.dataset.li); });
seg.addEventListener("keydown", e => {
  const d = ["ArrowRight","ArrowDown"].includes(e.key) ? 1 : ["ArrowLeft","ArrowUp"].includes(e.key) ? -1 : 0;
  if (d) { e.preventDefault(); light((li + d + LIGHT.length) % LIGHT.length, true); }
});
light(1);

/* lab nav: mark the section in view */
const links = $$(".lab-nav .chip");
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + en.target.id))); }), { rootMargin:"-40% 0px -55% 0px" });
$$(".lab-sec").forEach(s => io.observe(s));
})();
