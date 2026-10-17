// Downloads media that agents left as temporary links (e.g. Canva export URLs) into the repo,
// so Vercel can serve them from a stable public URL. Runs in GitHub Actions (agent sandboxes
// can't reach Canva's download host). Converts PNG to JPEG because Instagram only accepts JPEG images.
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

let changed = 0;
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
if (!existsSync("social")) process.exit(0);
for (const file of walk("social").filter(f => f.endsWith("post.json"))) {
  const dir = file.replace(/post\.json$/, "");
  const p = JSON.parse(readFileSync(file, "utf8"));
  let dirty = false;
  for (const m of [...(p.media || []), ...(p.cover_media ? [p.cover_media] : [])]) {
    if (!m.remote || existsSync(join(dir, m.file))) continue;
    const res = await fetch(m.remote);
    if (!res.ok) { console.error(`${file}: gagal unduh ${m.file} (${res.status}) — link mungkin kedaluwarsa`); m.fetch_error = `HTTP ${res.status}`; dirty = true; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const out = join(dir, m.file);
    if (/\.jpe?g$/i.test(m.file) && buf.slice(1, 4).toString() === "PNG") {
      writeFileSync(out + ".png", buf);
      execFileSync("convert", [out + ".png", "-quality", "90", out]);
      execFileSync("rm", [out + ".png"]);
    } else writeFileSync(out, buf);
    // Instagram feed only accepts 4:5 to 1.91:1. Canva portrait posts come out 3:4, so centre-crop to 4:5
    // (Kanvas keeps text out of the top/bottom 90px for exactly this reason).
    if (/\.jpe?g$/i.test(m.file)) {
      const [w, h] = execFileSync("identify", ["-format", "%w %h", out]).toString().split(" ").map(Number);
      if (h / w > 1.25) { execFileSync("convert", [out, "-gravity", "center", "-crop", `${w}x${Math.round(w * 1.25)}+0+0`, "+repage", "-quality", "90", out]); console.log("dipotong ke 4:5", out); }
    }
    delete m.remote; delete m.fetch_error; dirty = true; changed++;
    console.log("diunduh", out, buf.length, "bytes");
  }
  if (dirty) writeFileSync(file, JSON.stringify(p, null, 2) + "\n");
}
console.log(`${changed} file media diunduh`);
