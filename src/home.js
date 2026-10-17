/* Curioverse · home: opening hook, stacked story pages, scroll-grown lab chart, pinned horizontal reading paths. */
(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduced = CV.reduced;
const clamp = v => Math.min(1, Math.max(0, v));
const loops = [];
let raf = 0;
const run = () => { raf = 0; loops.forEach(f => f()); };
const schedule = () => { if (!raf) raf = requestAnimationFrame(run); };
addEventListener("scroll", schedule, { passive:true });
addEventListener("resize", () => { loops.forEach(f => f.resize && f.resize()); schedule(); });

/* ---------- stacked slides: each card shrinks a little as the next one slides over it ---------- */
const slides = $$("[data-stack] .slide");
if (slides.length) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-play"); io.unobserve(e.target); } }), { threshold:.3 });
  slides.forEach(s => io.observe(s));
  if (!reduced) loops.push(() => {
    const sticky = getComputedStyle(slides[0]).position === "sticky";
    slides.forEach((c, i) => {
      const next = slides[i + 1];
      if (!sticky || !next) { c.style.transform = ""; c.style.setProperty("--cover", "0"); return; }
      const r = c.getBoundingClientRect(), n = next.getBoundingClientRect();
      const p = clamp(1 - (n.top - r.top) / Math.max(1, r.height));
      c.style.transform = `scale(${(1 - p * .05).toFixed(4)})`;
      c.style.setProperty("--cover", p.toFixed(3));
    });
  });
}

/* ---------- lab: bars grow with scroll, number counts with them ---------- */
const grow = $("[data-grow]");
if (grow) {
  const bars = [...grow.querySelectorAll("[data-bar]")], val = grow.querySelector("[data-grow-v]"), yr = grow.querySelector("[data-grow-y]");
  const finalText = val.textContent, final = parseFloat(finalText.replace(/[^\d,]/g, "").replace(",", "."));
  const unit = finalText.trim().split(" ").pop();
  const f = () => {
    const r = grow.getBoundingClientRect();
    const p = reduced ? 1 : clamp((innerHeight * .95 - r.top) / (r.height * 1.4));
    const n = Math.max(1, Math.round(p * bars.length));
    bars.forEach((b, i) => { b.style.opacity = i < n ? "1" : ".12"; });
    val.textContent = p >= .999 ? finalText : "Rp" + (final * Math.pow(n / bars.length, 1.6)).toLocaleString("id-ID", { maximumFractionDigits:1 }) + " " + unit;
    yr.textContent = "Tahun " + n;
    grow.classList.toggle("is-done", p >= .999);
  };
  loops.push(f);
}

/* ---------- reading paths: pinned section, horizontal travel, focus card lifts ---------- */
const pin = $("[data-pin]"), track = $("[data-track]"), prog = $("[data-pin-prog]");
if (pin && track) {
  const cards = [...track.children];
  if (reduced) pin.classList.add("no-pin");
  else {
    let travel = 0, focused = -1;
    const measure = () => { travel = Math.max(0, track.scrollWidth - innerWidth); pin.style.height = `calc(100svh + ${travel}px)`; };
    const f = () => {
      const p = travel > 0 ? clamp(-pin.getBoundingClientRect().top / travel) : 0;
      track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
      if (prog) prog.style.transform = `scaleX(${p})`;
      const cx = innerWidth / 2; let best = 0, bestD = Infinity;
      cards.forEach((c, i) => { const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - cx); if (d < bestD) { bestD = d; best = i; } });
      if (best !== focused) { cards[focused] && cards[focused].classList.remove("is-focus"); cards[best].classList.add("is-focus"); focused = best; }
      cards.forEach(c => { const r = c.getBoundingClientRect(); if (r.left < innerWidth * .9 && pin.getBoundingClientRect().top < innerHeight * .5) c.classList.add("is-in"); });
    };
    f.resize = measure; measure(); loops.push(f);
    document.fonts && document.fonts.ready.then(() => { measure(); schedule(); }).catch(() => {});
  }
}
schedule();

/* ---------- opening hook: a different fact each visit, "Fakta lain" shuffles without repeats ---------- */
const hq = $("#hook-q"), hl = $("#hook-link"), more = $("#hook-more");
let HOOKS = [];
try { HOOKS = JSON.parse($("#hooks").textContent); } catch(e){}
if (hq && HOOKS.length) {
  let order = HOOKS.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  let k = 0;
  const show = (h, animate) => {
    const set = () => { hq.textContent = h.t; hl.href = "/stories/" + h.id; };
    if (!animate || reduced) return set();
    hq.classList.remove("hook-q-in"); hq.classList.add("hook-q-out");
    setTimeout(() => { set(); hq.classList.remove("hook-q-out"); void hq.offsetWidth; hq.classList.add("hook-q-in"); }, 320);
  };
  show(HOOKS[order[0]], false);
  more.addEventListener("click", () => { k = (k + 1) % order.length; show(HOOKS[order[k]], true); });
}

/* ---------- play the little illustrations once they are in view ---------- */
const plays = $$("[data-play]");
if (plays.length) {
  const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-play"); io2.unobserve(e.target); } }), { threshold:.3 });
  plays.forEach(p => io2.observe(p));
}
})();
