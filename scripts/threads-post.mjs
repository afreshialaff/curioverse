// Posts a text post to the Curioverse Threads account (Threads API, two steps: create container, then publish).
// Env: THREADS_USER_ID, THREADS_ACCESS_TOKEN, DRY_RUN=1 only prints.
// Usage: node scripts/threads-post.mjs <file.json>   file berisi { "text": "...", "video_url": "..." opsional } (maks 500 karakter)
import { readFileSync } from "node:fs";

const API = "https://graph.threads.net/v1.0";
const USER = process.env.THREADS_USER_ID;
const TOKEN = process.env.THREADS_ACCESS_TOKEN;
const DRY = process.env.DRY_RUN === "1";
const file = process.argv[2];
if (!file) throw new Error("Usage: node scripts/threads-post.mjs <file.json>");
const p = JSON.parse(readFileSync(file, "utf8"));
if (!p.text) throw new Error("text kosong");
if (p.text.length > 500) throw new Error(`teks ${p.text.length} karakter, maks 500`);

if (DRY) { console.log("DRY RUN:\n" + p.text); process.exit(0); }
if (!USER || !TOKEN) throw new Error("THREADS_USER_ID atau THREADS_ACCESS_TOKEN belum di-set");

async function call(path, params) {
  const body = new URLSearchParams({ ...params, access_token: TOKEN });
  const res = await fetch(`${API}/${path}`, { method: "POST", body });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error) throw new Error(`Threads ${path}: ${res.status} ${JSON.stringify(j.error || j).slice(0, 400)}`);
  return j;
}
const { id: creation } = await call(`${USER}/threads`, p.video_url
  ? { media_type: "VIDEO", video_url: p.video_url, text: p.text }
  : { media_type: "TEXT", text: p.text });
if (p.video_url) {   // video diproses dulu: tunggu FINISHED (maks ~15 menit)
  for (let i = 0; i < 90; i++) {
    const r = await fetch(`${API}/${creation}?fields=status,error_message&access_token=${TOKEN}`).then(x => x.json());
    if (r.status === "FINISHED") break;
    if (r.status === "ERROR" || r.status === "EXPIRED") throw new Error(`Threads video ${r.status}: ${r.error_message || ""}`);
    await new Promise(r => setTimeout(r, 10000));
  }
} else await new Promise(r => setTimeout(r, 5000));
const { id: postId } = await call(`${USER}/threads_publish`, { creation_id: creation });
console.log("Posted Threads id:", postId);
