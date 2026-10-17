// Posts today's approved Curioverse social posts to Instagram via the official Instagram Graph API
// (Instagram API with Instagram Login). Runs inside GitHub Actions, never inside an agent session.
//
// Env: IG_ACCESS_TOKEN (required), IG_USER_ID (optional, defaults to "me"), SITE_URL, DRY_RUN=1 to only print.
// Usage: node scripts/instagram-post.mjs [YYYY-MM-DD]   (default: today in Asia/Jakarta)
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const API = "https://graph.instagram.com/v23.0";
const TOKEN = process.env.IG_ACCESS_TOKEN;
const USER = process.env.IG_USER_ID || "me";
const SITE = (process.env.SITE_URL || "https://curioverse-beta.vercel.app").replace(/\/$/, "");
const DRY = process.env.DRY_RUN === "1";
const today = process.argv[2] || new Date(Date.now() + 7 * 36e5).toISOString().slice(0, 10);
const cfg = JSON.parse(readFileSync("pipeline/config.json", "utf8")).social || {};
const sleep = ms => new Promise(r => setTimeout(r, ms));
const log = (...a) => console.log(new Date().toISOString(), ...a);

async function api(path, params = {}, method = "POST") {
  const q = new URLSearchParams({ ...params, access_token: TOKEN });
  const url = method === "GET" ? `${API}/${path}?${q}` : `${API}/${path}`;
  const res = await fetch(url, method === "GET" ? {} : { method, body: q });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error) throw new Error(`${path}: ${res.status} ${JSON.stringify(j.error || j).slice(0, 400)}`);
  return j;
}
async function waitReady(id, maxMin = 15) {
  for (let i = 0; i < maxMin * 6; i++) {
    const { status_code, status } = await api(id, { fields: "status_code,status" }, "GET");
    if (status_code === "FINISHED") return;
    if (status_code === "ERROR" || status_code === "EXPIRED") throw new Error(`container ${id}: ${status_code} ${status || ""}`);
    await sleep(10000);
  }
  throw new Error(`container ${id}: masih diproses setelah ${maxMin} menit`);
}
async function reachable(url) {
  for (let i = 0; i < 20; i++) {           // up to ~10 minutes for a fresh Vercel deploy
    const r = await fetch(url, { method: "HEAD" }).catch(() => null);
    if (r && r.ok) return true;
    await sleep(30000);
  }
  return false;
}

async function publish(dir, p) {
  const base = `${SITE}/social/${today}/${dir}/`;
  const urls = (p.media || []).map(m => base + m.file);
  for (const u of urls) if (!(await reachable(u))) throw new Error(`media belum bisa diakses publik: ${u}`);
  const caption = p.caption;
  if (DRY) { log("DRY RUN", dir, p.type, urls); return { id: "dry", permalink: "dry-run" }; }
  let creation;
  if (p.type === "reel") {
    const cover = p.cover ? base + p.cover : undefined;
    creation = (await api(`${USER}/media`, { media_type: "REELS", video_url: urls[0], caption, share_to_feed: "true", ...(cover ? { cover_url: cover } : {}) })).id;
  } else if (urls.length === 1) {
    creation = (await api(`${USER}/media`, { image_url: urls[0], caption })).id;
  } else {
    const children = [];
    for (const u of urls.slice(0, 10)) { children.push((await api(`${USER}/media`, { image_url: u, is_carousel_item: "true" })).id); }
    for (const c of children) await waitReady(c, 5);
    creation = (await api(`${USER}/media`, { media_type: "CAROUSEL", children: children.join(","), caption })).id;
  }
  await waitReady(creation, p.type === "reel" ? 20 : 5);
  const { id } = await api(`${USER}/media_publish`, { creation_id: creation });
  const { permalink } = await api(id, { fields: "permalink" }, "GET");
  return { id, permalink };
}

// ---- main ----
if (!TOKEN && !DRY) { console.error("IG_ACCESS_TOKEN belum diset di GitHub Secrets."); process.exit(1); }
const root = join("social", today);
if (!existsSync(root)) { log(`Tidak ada folder ${root}; tidak ada yang diposting.`); process.exit(0); }

// Wait until the configured post time (default 19:00 WIB) so GitHub's cron delay can't post early.
const [hh, mm] = (cfg.post_time || "19:00").split(":").map(Number);
const target = Date.parse(`${today}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00+07:00`);
if (!DRY && Date.now() < target && target - Date.now() < 30 * 60e3) { log("Menunggu jam posting…"); await sleep(target - Date.now()); }

let failed = 0;
for (const dir of readdirSync(root).sort()) {
  const file = join(root, dir, "post.json");
  if (!existsSync(file)) continue;
  const p = JSON.parse(readFileSync(file, "utf8"));
  p.post = p.post || { status: "queued" };
  if (p.post.status === "posted") { log(dir, "sudah terposting, lewati"); continue; }
  const approved = p.review && p.review.status === "lolos";
  const needHuman = (cfg.mode || "auto") === "review" && !p.review?.approved_by_human;
  if (!approved || needHuman) { log(dir, `dilewati (review: ${p.review?.status || "belum"}${needHuman ? ", menunggu persetujuan manusia" : ""})`); p.post.status = "skipped"; writeFileSync(file, JSON.stringify(p, null, 2) + "\n"); continue; }
  try {
    const r = await publish(dir, p);
    Object.assign(p.post, { status: "posted", at: new Date().toISOString(), media_id: r.id, permalink: r.permalink, error: null });
    log(dir, "TERPOSTING", r.permalink);
  } catch (e) {
    failed++;
    Object.assign(p.post, { status: "failed", at: new Date().toISOString(), error: String(e.message).slice(0, 500) });
    log(dir, "GAGAL", e.message);
  }
  if (!DRY) writeFileSync(file, JSON.stringify(p, null, 2) + "\n");
}
process.exit(failed ? 1 : 0);
