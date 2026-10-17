// Curioverse quality gate. Runs automatically at the start of every build, so a story
// that breaks the rules can never reach the live site, even if an agent misses it.
//
//   node scripts/validate.mjs                 -> check every story on the site
//   node scripts/validate.mjs path/to/x.json  -> check one pipeline draft (Pena/Lup/Merpati use this)
//
// Exit code 1 = at least one error. Warnings never fail the build.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const RULES = {
  minSources: 5,          // every story, old or new
  minDomains: 3,          // sources must come from at least 3 different websites
  minWords: 700,          // pipeline stories only (content/stories/*.json)
  minSections: 4,         // pipeline stories only
  maxTitle: 95,
  maxDek: 240,
  maxHook: 170
};
const KINDS_OK = ["fakta", "interpretasi", "opini"];
const PLACEHOLDER = /\b(TODO|TBD|lorem ipsum|xxx)\b|\[(sumber|source|link|isi)[^\]]*\]/i;

function checkImage(im, where, e) {
  if (!im) return;
  const local = /^\/assets\/illustrations\/[\w.-]+\.svg$/.test(im.src || "");
  if (local && !existsSync(new URL(`..${im.src}`, import.meta.url))) e.push(`${where}: file ilustrasi ${im.src} tidak ada di repo`);
  if (!local && !/^https:\/\//.test(im.src || "")) e.push(`${where}: gambar butuh "src" https (atau ilustrasi sendiri di /assets/illustrations/*.svg)`);
  if (!im.alt || im.alt.length < 8) e.push(`${where}: gambar butuh "alt" yang mendeskripsikan isinya`);
  if (!im.credit) e.push(`${where}: gambar butuh "credit" (pembuat/pemilik)`);
  if (!im.license) e.push(`${where}: gambar butuh "license" (mis. CC BY-SA 4.0, Public domain)`);
  if (!/^https:\/\//.test(im.page || "")) e.push(`${where}: gambar butuh "page" (link halaman sumber/lisensi gambar)`);
  if (im.license && /all rights reserved|©|getty|shutterstock/i.test(im.license + " " + im.credit)) e.push(`${where}: lisensi gambar bukan lisensi terbuka`);
}

const host = u => { try { return new URL(u).hostname.replace(/^www\./, "").replace(/^([a-z-]+\.)?(m\.)?wikipedia\.org$/, "wikipedia.org"); } catch { return null; } };
const wordsOf = sections => sections.map(x => [x.h, ...(x.p || [])].join(" ")).join(" ").split(/\s+/).filter(Boolean).length;

/** Check one story in pipeline JSON shape. Returns { errors:[], warnings:[] }. */
export function checkStory(j, { cats, pipeline = true, today = null } = {}) {
  const e = [], w = [], id = j.id || "(tanpa id)";
  const need = ["id", "cat", "date", "title", "dek", "tags", "sections", "sources"];
  for (const k of need) if (j[k] == null || j[k] === "") e.push(`${id}: field "${k}" kosong`);
  if (j.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(j.id)) e.push(`${id}: id harus huruf kecil/angka/strip (contoh: victor-lustig)`);
  if (cats && j.cat && !cats[j.cat]) e.push(`${id}: kategori "${j.cat}" nggak dikenal (pilih: ${Object.keys(cats).join(", ")})`);
  if (cats && j.also && !cats[j.also]) e.push(`${id}: kategori tambahan "${j.also}" nggak dikenal`);
  if (j.date && !/^\d{4}-\d{2}-\d{2}$/.test(j.date)) e.push(`${id}: tanggal harus YYYY-MM-DD`);
  if (j.date && today && j.date > today) e.push(`${id}: tanggal ${j.date} masih di masa depan`);
  if (j.title && j.title.length > RULES.maxTitle) e.push(`${id}: judul ${j.title.length} karakter (maks ${RULES.maxTitle})`);
  if (j.dek && j.dek.length > RULES.maxDek) e.push(`${id}: dek ${j.dek.length} karakter (maks ${RULES.maxDek})`);
  if (j.hook && j.hook.length > RULES.maxHook) e.push(`${id}: hook ${j.hook.length} karakter (maks ${RULES.maxHook})`);

  const secs = Array.isArray(j.sections) ? j.sections : [];
  secs.forEach((x, i) => {
    if (!x.h || !Array.isArray(x.p) || !x.p.length) e.push(`${id}: bagian ${i + 1} butuh "h" dan minimal satu paragraf di "p"`);
    if (x.kind && !KINDS_OK.includes(x.kind)) e.push(`${id}: bagian ${i + 1} kind "${x.kind}" (pilih: ${KINDS_OK.join("/")})`);
  });
  checkImage(j.image, `${id} (gambar utama)`, e);
  secs.forEach((x, i) => checkImage(x.img, `${id} (gambar bagian ${i + 1})`, e));
  if (pipeline && !j.image) e.push(`${id}: artikel baru wajib punya gambar utama ("image") dengan lisensi terbuka`);
  const all = JSON.stringify(j);
  if (PLACEHOLDER.test(all)) e.push(`${id}: masih ada placeholder (TODO / [sumber] / lorem)`);
  if (pipeline) {
    if (secs.length < RULES.minSections) e.push(`${id}: cuma ${secs.length} bagian (min ${RULES.minSections})`);
    const n = wordsOf(secs);
    if (n < RULES.minWords) e.push(`${id}: cuma ${n} kata (min ${RULES.minWords}, biar dagingnya kerasa)`);
  }

  const src = Array.isArray(j.sources) ? j.sources : [];
  const linked = src.filter(s => s.u);
  linked.forEach(s => { if (!/^https:\/\//.test(s.u)) e.push(`${id}: sumber harus https: ${s.u}`); });
  if (linked.length < RULES.minSources) e.push(`${id}: ${linked.length} sumber berlink (min ${RULES.minSources} yang bisa dibuka)`);
  const urls = linked.map(s => s.u.replace(/#.*$/, "").replace(/\/$/, ""));
  if (new Set(urls).size !== urls.length) e.push(`${id}: ada link sumber yang dobel`);
  const doms = new Set(linked.map(s => host(s.u)).filter(Boolean));
  if (doms.size < RULES.minDomains) e.push(`${id}: sumber cuma dari ${doms.size} situs (min ${RULES.minDomains} situs berbeda)`);
  src.forEach(s => { if (!s.t) e.push(`${id}: ada sumber tanpa judul ("t")`); });
  const wiki = linked.filter(s => host(s.u) === "wikipedia.org").length;
  if (linked.length && wiki / linked.length > 0.5) w.push(`${id}: ${wiki}/${linked.length} sumber dari Wikipedia; usahakan lebih banyak sumber primer`);
  return { errors:e, warnings:w };
}

/** Check the whole site (old stories in stories.mjs + pipeline JSON). */
export function checkSite({ CATS, A, SOURCES, KINDS, HOOKS, PICKS, HOLES, PIPELINE_IDS = [], IMAGES = {} }) {
  const errors = [], warnings = [];
  const ids = A.map(a => a.id), dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) errors.push(`id dobel: ${[...new Set(dup)].join(", ")}`);
  const today = new Date(Date.now() + 7 * 36e5 + 864e5).toISOString().slice(0, 10); // WIB, toleransi 1 hari
  for (const a of A) {
    const pipe = PIPELINE_IDS.includes(a.id);
    const im = IMAGES[a.id] || {};
    const j = { id:a.id, cat:a.cat, also:a.also, date:a.date, title:a.title, dek:a.dek, tags:a.tags, sources:SOURCES[a.id] || [], image:im.hero,
      sections:a.s.map(([h, p], i) => ({ h, p, kind:(KINDS[a.id] || {})[i], img:(im.sections || {})[i] })) };
    const r = checkStory(j, { cats:CATS, pipeline:false, today });
    if (pipe) { const strict = checkStory(j, { cats:CATS, pipeline:true, today }); r.errors = strict.errors.filter(x => !/wajib punya gambar/.test(x)); }
    if (!im.hero) r.warnings.push(`${a.id}: belum ada gambar utama`);
    errors.push(...r.errors.map(x => (a._file ? a._file + " → " : "") + x)); warnings.push(...r.warnings);
  }
  for (const h of HOOKS) if (!ids.includes(h.id)) errors.push(`HOOKS menunjuk id yang nggak ada: ${h.id}`);
  for (const p of PICKS) if (!ids.includes(p)) errors.push(`PICKS menunjuk id yang nggak ada: ${p}`);
  for (const h of HOLES) for (const id of h.ids) if (!ids.includes(id)) errors.push(`Reading path ${h.id} menunjuk id yang nggak ada: ${id}`);
  return { errors, warnings };
}

export function report({ errors, warnings }, label) {
  warnings.forEach(x => console.warn("  ⚠ " + x));
  if (errors.length) { console.error(`✗ ${label}: ${errors.length} masalah`); errors.forEach(x => console.error("  ✗ " + x)); }
  else console.log(`✓ ${label}: lolos quality gate`);
  return errors.length === 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const S = await import("../content/stories.mjs");
  const files = process.argv.slice(2);
  let ok = true;
  if (files.length) {
    const taken = new Set(S.A.map(a => a.id));
    for (const f of files) {
      let j; try { j = JSON.parse(readFileSync(f, "utf8")); } catch (err) { console.error(`✗ ${f}: JSON rusak (${err.message})`); ok = false; continue; }
      const r = checkStory(j, { cats:S.CATS, pipeline:true });
      if (taken.has(j.id) && !S.A.find(a => a.id === j.id && a._file && f.endsWith(a._file))) r.errors.push(`${j.id}: id ini sudah dipakai cerita lain di web`);
      if (j.path && !S.HOLES.find(h => h.id === j.path)) r.errors.push(`${j.id}: reading path "${j.path}" nggak ada`);
      ok = report(r, f) && ok;
    }
  } else ok = report(checkSite(S), "Seluruh situs");
  process.exit(ok ? 0 : 1);
}
