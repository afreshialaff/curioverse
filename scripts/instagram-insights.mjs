// Mengambil data performa post Instagram Curioverse (akun sendiri) untuk dibaca rapat harian (Hope).
// Berjalan di GitHub Actions dengan IG_ACCESS_TOKEN. Output: pipeline/rapat/ig-insights/<tgl>.json
// BELUM DIUJI terhadap API live. Metrik per media bisa ditolak Graph API kalau token belum punya izin
// insight atau versi API berbeda; setiap kegagalan dicatat di output, tidak menghentikan skrip.
// Usage: node scripts/instagram-insights.mjs [YYYY-MM-DD]
import { writeFileSync, mkdirSync } from "node:fs";

const API = "https://graph.instagram.com/v23.0";
const TOKEN = process.env.IG_ACCESS_TOKEN;
const USER = process.env.IG_USER_ID || "me";
const today = process.argv[2] || new Date(Date.now() + 7 * 36e5).toISOString().slice(0, 10);
const METRICS = ["reach", "saved", "shares", "total_interactions", "likes", "comments"];

async function get(path, params = {}) {
  const q = new URLSearchParams({ ...params, access_token: TOKEN });
  const res = await fetch(`${API}/${path}?${q}`);
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error) throw new Error(JSON.stringify(j.error || j).slice(0, 300));
  return j;
}

const out = { date: today, fetched_at: new Date().toISOString(), posts: [], errors: [] };
try {
  const list = await get(`${USER}/media`, { fields: "id,permalink,timestamp,media_type,like_count,comments_count", limit: "25" });
  for (const m of list.data || []) {
    const post = { id: m.id, permalink: m.permalink, timestamp: m.timestamp, media_type: m.media_type,
      like_count: m.like_count ?? null, comments_count: m.comments_count ?? null, insights: {} };
    try {
      const ins = await get(`${m.id}/insights`, { metric: METRICS.join(",") });
      for (const row of ins.data || []) post.insights[row.name] = row.values?.[0]?.value ?? row.total_value?.value ?? null;
    } catch (e) {
      out.errors.push({ id: m.id, error: String(e.message) });
    }
    out.posts.push(post);
  }
} catch (e) {
  out.errors.push({ scope: "media", error: String(e.message) });
}

mkdirSync("pipeline/rapat/ig-insights", { recursive: true });
writeFileSync(`pipeline/rapat/ig-insights/${today}.json`, JSON.stringify(out, null, 2) + "\n");
console.log(`posts: ${out.posts.length}, errors: ${out.errors.length}`);
