/* Curioverse · home: headline reveal + lazy three.js orrery (supplemental; topic grid is the real entry). */
(() => {
"use strict";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* headline: word-by-word rise, once */
const h1 = document.querySelector("[data-split]");
if (h1 && !reduced) {
  let i = 0;
  const words = h1.textContent.split(/(\s+)/);
  h1.setAttribute("aria-label", h1.textContent);
  h1.innerHTML = words.map(w => /^\s+$/.test(w) ? w : `<span class="w" aria-hidden="true"><span style="--i:${i++}">${w}</span></span>`).join("");
  requestAnimationFrame(() => h1.classList.add("play"));
}

/* orrery: only on wider screens, with motion allowed, without data saver */
const wrap = document.getElementById("orrery");
if (!wrap || reduced || !matchMedia("(min-width: 768px)").matches || (navigator.connection && navigator.connection.saveData)) return;
const start = () => {
  const s = document.createElement("script");
  s.src = "/assets/vendor/three.min.js"; s.async = true; s.onload = orrery;
  document.head.appendChild(s);
};
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

  const starShape = (pts, outer, inner) => {
    const s = new T.Shape();
    for (let i = 0; i < pts * 2; i++) { const r = i % 2 ? inner : outer, a = i / (pts * 2) * Math.PI * 2 + Math.PI / 2; i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
    return s;
  };
  const gold = new T.MeshStandardMaterial({ metalness:.55, roughness:.35 });
  const star = new T.Mesh(new T.ExtrudeGeometry(starShape(4, .95, .2), { depth:.12, bevelEnabled:true, bevelSize:.03, bevelThickness:.03, bevelSegments:2 }), gold); star.geometry.center();
  const star8 = new T.Mesh(new T.ExtrudeGeometry(starShape(4, .55, .14), { depth:.06, bevelEnabled:false }), gold); star8.geometry.center(); star8.rotation.z = Math.PI / 4; star8.position.z = -.05;
  const core = new T.Group(); core.add(star, star8); scene.add(core);

  const ringMat = new T.LineBasicMaterial({ transparent:true, opacity:.5 });
  const planets = ORDER.map((c, i) => {
    const r = 1.75 + i * .5;
    const g = new T.Group(); g.rotation.x = (i % 2 ? 1 : -1) * (.05 + i * .018); g.rotation.z = (i % 3 - 1) * .06;
    g.add(new T.LineLoop(new T.BufferGeometry().setFromPoints(new T.EllipseCurve(0, 0, r, r * .94).getPoints(160).map(p => new T.Vector3(p.x, 0, p.y))), ringMat));
    const m = new T.Mesh(new T.SphereGeometry(.13 + (i % 3) * .035, 28, 18), new T.MeshStandardMaterial({ roughness:.45, metalness:.25 }));
    m.userData = { cat:c, r, a:i * 2.1 + .4, sp:(Math.PI * 2) / (12 + i * 3) }; // 12 s inner orbit to 30 s outer orbit
    g.add(m); sys.add(g); return m;
  });
  const N = 600, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const r = 14 + Math.random() * 26, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1); pos[i*3] = r * Math.sin(ph) * Math.cos(th); pos[i*3+1] = r * Math.cos(ph) * .7; pos[i*3+2] = r * Math.sin(ph) * Math.sin(th) - 8; }
  const sg = new T.BufferGeometry(); sg.setAttribute("position", new T.BufferAttribute(pos, 3));
  const dust = new T.Points(sg, new T.PointsMaterial({ size:.07, transparent:true, opacity:.6 })); scene.add(dust);

  function colors(){
    gold.color = col("--accent"); gold.emissive = col("--accent"); gold.emissiveIntensity = CV.isDark() ? .35 : .12;
    ringMat.color = col("--line-strong"); ringMat.opacity = CV.isDark() ? .65 : .55;
    planets.forEach(p => p.material.color = col("--c-" + p.userData.cat));
    dust.material.color = col("--fg"); dust.material.opacity = CV.isDark() ? .7 : .45;
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
      sys.rotation.y += (target.x * .35 - sys.rotation.y) * .04;
      sys.rotation.x += ((.38 + target.y * .18) - sys.rotation.x) * .04;
      core.rotation.y = Math.sin(t * .5) * .5; core.rotation.z = t * (Math.PI * 2 / 30);
      dust.rotation.y = t * .008;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(loop);
  }
  resize(); colors(); wrap.classList.add("live"); requestAnimationFrame(loop);
}
})();
