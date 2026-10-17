/* Curioverse · home: stacked story slides, scroll-grown lab chart, pinned horizontal reading paths, three.js orrery. */
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

/* ---------- orrery: tablet/desktop only, motion allowed, no data saver ---------- */
const wrap = $("#orrery");
if (!wrap || reduced || !matchMedia("(min-width: 761px)").matches || (navigator.connection && navigator.connection.saveData)) return;
const start = () => { const s = document.createElement("script"); s.src = "/assets/vendor/three.min.js"; s.async = true; s.onload = orrery; document.head.appendChild(s); };
const idle = window.requestIdleCallback || (cb => setTimeout(cb, 600));
if (document.readyState === "complete") idle(start); else addEventListener("load", () => idle(start));

function orrery(){
  const T = window.THREE; if (!T) return;
  const canvas = wrap.querySelector("canvas"), tip = wrap.querySelector("[data-tip]");
  let renderer;
  try { renderer = new T.WebGLRenderer({ canvas, antialias:true, alpha:true }); } catch(e) { return; }
  const ORDER = ["finance","science","sejarah","biografi","market","saham","global"];
  const count = c => CV.INDEX.filter(a => a.c === c).length;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const scene = new T.Scene(), camera = new T.PerspectiveCamera(38, 1, .1, 200);
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const col = n => new T.Color(css(n) || "#A67C52");
  const sys = new T.Group(); sys.rotation.x = .38; sys.rotation.z = -.12; scene.add(sys);
  scene.add(new T.AmbientLight(0xffffff, .75));
  const key = new T.PointLight(0xffffff, 1.15); key.position.set(4, 5, 8); scene.add(key);
  const starShape = (pts, outer, inner) => { const s = new T.Shape(); for (let i = 0; i < pts * 2; i++) { const r = i % 2 ? inner : outer, a = i / (pts * 2) * Math.PI * 2 + Math.PI / 2; i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r); } return s; };
  const gold = new T.MeshStandardMaterial({ metalness:.55, roughness:.35 });
  const star = new T.Mesh(new T.ExtrudeGeometry(starShape(4, .95, .2), { depth:.12, bevelEnabled:true, bevelSize:.03, bevelThickness:.03, bevelSegments:2 }), gold); star.geometry.center();
  const star8 = new T.Mesh(new T.ExtrudeGeometry(starShape(4, .55, .14), { depth:.06, bevelEnabled:false }), gold); star8.geometry.center(); star8.rotation.z = Math.PI / 4; star8.position.z = -.05;
  const core = new T.Group(); core.add(star, star8); scene.add(core);
  const ringMat = new T.LineBasicMaterial({ transparent:true, opacity:.5 });
  const planets = ORDER.map((c, i) => {
    const r = 1.75 + i * .5, g = new T.Group(); g.rotation.x = (i % 2 ? 1 : -1) * (.05 + i * .018); g.rotation.z = (i % 3 - 1) * .06;
    g.add(new T.LineLoop(new T.BufferGeometry().setFromPoints(new T.EllipseCurve(0, 0, r, r * .94).getPoints(160).map(p => new T.Vector3(p.x, 0, p.y))), ringMat));
    const m = new T.Mesh(new T.SphereGeometry(.13 + (i % 3) * .035, 28, 18), new T.MeshStandardMaterial({ roughness:.45, metalness:.25 }));
    m.userData = { cat:c, r, a:i * 2.1 + .4, sp:(Math.PI * 2) / (12 + i * 3) };
    g.add(m); sys.add(g); return m;
  });
  const N = 600, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const r = 14 + Math.random() * 26, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1); pos[i*3] = r * Math.sin(ph) * Math.cos(th); pos[i*3+1] = r * Math.cos(ph) * .7; pos[i*3+2] = r * Math.sin(ph) * Math.sin(th) - 8; }
  const sg = new T.BufferGeometry(); sg.setAttribute("position", new T.BufferAttribute(pos, 3));
  const dust = new T.Points(sg, new T.PointsMaterial({ size:.07, transparent:true, opacity:.6 })); scene.add(dust);
  function colors(){
    gold.color = col("--gold"); gold.emissive = col("--gold"); gold.emissiveIntensity = CV.isDark() ? .35 : .12;
    ringMat.color = col("--faint"); ringMat.opacity = CV.isDark() ? .7 : .6;
    planets.forEach(p => p.material.color = col("--c-" + p.userData.cat));
    dust.material.color = col("--ink"); dust.material.opacity = CV.isDark() ? .7 : .4;
  }
  function resize(){
    const r = wrap.getBoundingClientRect(), w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.position.set(0, 2.2, Math.max(11, 5.3 / Math.tan(camera.fov * Math.PI / 360) / Math.min(1, camera.aspect)));
    camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);
  const ray = new T.Raycaster(), ptr = new T.Vector2(), target = { x:0, y:0 };
  let hovered = null, visible = true, last = performance.now(), t = 0;
  const pick = (cx, cy) => { const r = canvas.getBoundingClientRect(); ptr.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); ray.setFromCamera(ptr, camera); const h = ray.intersectObjects(planets, false)[0]; return h ? h.object : null; };
  function hover(p, cx, cy){
    if (hovered && hovered !== p) hovered.scale.setScalar(1);
    hovered = p;
    if (p) { p.scale.setScalar(1.5); const r = wrap.getBoundingClientRect(); tip.textContent = CV.LABEL[p.userData.cat] + " · " + count(p.userData.cat) + " cerita"; tip.style.left = (cx - r.left) + "px"; tip.style.top = (cy - r.top) + "px"; tip.classList.add("on"); canvas.style.cursor = "pointer"; }
    else { tip.classList.remove("on"); canvas.style.cursor = ""; }
  }
  canvas.addEventListener("pointermove", e => { const r = canvas.getBoundingClientRect(); target.x = (e.clientX - r.left) / r.width - .5; target.y = (e.clientY - r.top) / r.height - .5; hover(pick(e.clientX, e.clientY), e.clientX, e.clientY); });
  canvas.addEventListener("pointerleave", () => { target.x = target.y = 0; hover(null); });
  canvas.addEventListener("click", e => { const p = pick(e.clientX, e.clientY); if (p) location.href = "/explore?topik=" + p.userData.cat; });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(wrap);
  addEventListener("cv-theme", colors);
  function loop(now){
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (visible && !document.hidden) {
      t += dt;
      planets.forEach(p => { if (p !== hovered) p.userData.a += p.userData.sp * dt; p.position.set(Math.cos(p.userData.a) * p.userData.r, 0, Math.sin(p.userData.a) * p.userData.r * .94); });
      const sc = clamp(scrollY / 800);
      sys.rotation.y += ((target.x * .35 + sc * .6) - sys.rotation.y) * .04;
      sys.rotation.x += ((.38 + target.y * .18 + sc * .2) - sys.rotation.x) * .04;
      core.rotation.y = Math.sin(t * .5) * .5; core.rotation.z = t * (Math.PI * 2 / 30);
      dust.rotation.y = t * .008;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(loop);
  }
  resize(); colors(); wrap.classList.add("live"); requestAnimationFrame(loop);
}
})();
