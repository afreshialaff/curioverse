/* Curioverse · Lab Kepo: compound interest, candlestick anatomy, light travel time. */
(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

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
