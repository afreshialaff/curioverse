// Posts a text post (with optional link) to the Curioverse Facebook Page via the Graph API.
// Runs in GitHub Actions. Env: FB_PAGE_ID, FB_PAGE_TOKEN (Page access token), DRY_RUN=1 only prints.
// Usage: node scripts/facebook-post.mjs <file.json>   file berisi { "message": "...", "link": "https://..." (opsional) }
import { readFileSync } from "node:fs";

const API = "https://graph.facebook.com/v23.0";
const PAGE = process.env.FB_PAGE_ID;
const TOKEN = process.env.FB_PAGE_TOKEN;
const DRY = process.env.DRY_RUN === "1";
const file = process.argv[2];
if (!file) throw new Error("Usage: node scripts/facebook-post.mjs <file.json>");
const p = JSON.parse(readFileSync(file, "utf8"));
if (!p.message) throw new Error("message kosong");

if (DRY) {
  console.log("DRY RUN ke Halaman", PAGE || "(FB_PAGE_ID belum di-set)");
  console.log(p.message);
  if (p.link) console.log("link:", p.link);
if (p.image) console.log("image:", p.image);
  process.exit(0);
}
if (!PAGE || !TOKEN) throw new Error("FB_PAGE_ID atau FB_PAGE_TOKEN belum di-set");
let res;
if (p.image) {
  // Foto: unggah file lokal ke /photos (caption = message)
  const form = new FormData();
  form.set("caption", p.message);
  form.set("access_token", TOKEN);
  form.set("source", new Blob([readFileSync(p.image)], { type: "image/jpeg" }), p.image.split("/").pop());
  res = await fetch(`${API}/${PAGE}/photos`, { method: "POST", body: form });
} else {
  const body = new URLSearchParams({ message: p.message, access_token: TOKEN });
  if (p.link) body.set("link", p.link);
  res = await fetch(`${API}/${PAGE}/feed`, { method: "POST", body });
}
const j = await res.json().catch(() => ({}));
if (!res.ok || j.error) throw new Error(`Facebook: ${res.status} ${JSON.stringify(j.error || j).slice(0, 400)}`);
console.log("Posted:", j.post_id || j.id, `https://www.facebook.com/${j.post_id || j.id}`);
