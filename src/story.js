/* Curioverse · story: reading progress in the header. */
(() => {
"use strict";
const bar = document.querySelector("[data-progress]"), art = document.querySelector("[data-article]");
if (!bar || !art) return;
bar.hidden = false;
let ticking = false;
const update = () => {
  ticking = false;
  const r = art.getBoundingClientRect(), total = r.height - innerHeight * .6;
  const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : (r.top < innerHeight ? 1 : 0);
  bar.style.transform = `scaleX(${p})`;
};
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive:true });
addEventListener("resize", update); update();
})();
