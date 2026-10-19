// Generator ilustrasi SVG sendiri (credit "Curioverse"). Pakai: node scripts/illustrations.mjs assets/illustrations
// Kalau gambar diubah, naikkan versi nama file (-v2.svg) karena /assets di-cache 1 tahun.
import { writeFileSync } from "node:fs";
const OUT = process.argv[2];
const C = { bg:"#EAE3D5", bg2:"#E1D8C6", card:"#F1ECE1", ink:"#1B1A17", mute:"#4D483F", line:"#CDBFA6", moss:"#3F4A3B", up:"#3F6B3A", down:"#9A3F2B", gold:"#A67C52", goldT:"#7A5532", blue:"#5B7C9A" };
const SERIF = "Georgia, 'Times New Roman', serif", SANS = "'Helvetica Neue', Arial, sans-serif";
const t = (x, y, s, txt, o = {}) => `<text x="${x}" y="${y}" font-family="${o.f || SANS}" font-size="${s}" fill="${o.c || C.ink}"${o.w ? ` font-weight="${o.w}"` : ""}${o.a ? ` text-anchor="${o.a}"` : ""}${o.i ? ` font-style="italic"` : ""}>${txt}</text>`;
const frame = (title, body, note = "Ilustrasi: Curioverse") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img" aria-label="${title}">
<rect width="1600" height="900" fill="${C.bg}"/>
<rect x="28" y="28" width="1544" height="844" rx="22" fill="none" stroke="${C.line}" stroke-width="3"/>
${body}
${t(1540, 846, 26, note, { c: C.mute, a: "end" })}
</svg>
`;
const save = (n, s) => writeFileSync(`${OUT}/${n}`, s);

/* 1. majemuk: Rp10 juta, 6%/th, 30 th */
{
  const X0 = 190, X1 = 1150, Y0 = 740, Y1 = 230, maxV = 60;
  const px = yr => X0 + (X1 - X0) * yr / 30, py = v => Y0 - (Y0 - Y1) * v / maxV;
  const comp = [...Array(31)].map((_, y) => [px(y), py(10 * 1.06 ** y)]);
  const simp = [[px(0), py(10)], [px(30), py(10 * (1 + .06 * 30))]];
  const path = pts => "M" + pts.map(p => p.map(n => n.toFixed(1)).join(",")).join(" L");
  let grid = "";
  for (const v of [0, 10, 20, 30, 40, 50, 60]) grid += `<line x1="${X0}" x2="${X1}" y1="${py(v)}" y2="${py(v)}" stroke="${C.line}" stroke-width="2"/>${t(X0 - 18, py(v) + 12, 30, v ? v + " jt" : "0", { c: C.mute, a: "end" })}`;
  for (const y of [0, 10, 20, 30]) grid += t(px(y), Y0 + 50, 30, y === 30 ? "30 tahun" : y === 0 ? "tahun 0" : y, { c: C.mute, a: "middle" });
  const fc = (10 * 1.06 ** 30).toFixed(1).replace(".", ",");
  const body = `
${t(100, 120, 60, "Bunga yang berbunga", { f: SERIF, w: 700 })}
${t(100, 170, 32, "Setoran awal Rp10 juta, bunga 6% per tahun, tanpa setoran tambahan", { c: C.mute })}
${grid}
<path d="${path(simp)}" fill="none" stroke="${C.blue}" stroke-width="7" stroke-dasharray="18 12" stroke-linecap="round"/>
<path d="${path(comp)}" fill="none" stroke="${C.gold}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
<line x1="${px(12)}" x2="${px(12)}" y1="${py(20.1)}" y2="${Y0}" stroke="${C.ink}" stroke-width="2" stroke-dasharray="6 8"/>
<circle cx="${px(12)}" cy="${py(10 * 1.06 ** 12)}" r="12" fill="${C.ink}"/>
${t(px(12) + 22, py(20.1) + 70, 30, "± 12 tahun: jadi 2×", { w: 700 })}
<circle cx="${px(30)}" cy="${py(10 * 1.06 ** 30)}" r="12" fill="${C.gold}"/>
<circle cx="${px(30)}" cy="${py(28)}" r="12" fill="${C.blue}"/>
<g transform="translate(1250 250)">
  <rect width="270" height="360" rx="18" fill="${C.card}" stroke="${C.line}" stroke-width="3"/>
  <rect x="30" y="44" width="40" height="10" rx="5" fill="${C.gold}"/>${t(84, 58, 30, "majemuk", { w: 700 })}
  ${t(30, 112, 48, "±" + fc + " jt", { f: SERIF, w: 700, c: C.goldT })}
  <rect x="30" y="174" width="40" height="10" rx="5" fill="${C.blue}"/>${t(84, 188, 30, "bunga biasa", { w: 700 })}
  ${t(30, 242, 48, "28 jt", { f: SERIF, w: 700, c: C.blue })}
  ${t(30, 312, 26, "setelah 30 tahun", { c: C.mute })}
</g>
<g transform="translate(1250 650)">${t(0, 0, 30, "Rule of 72:", { w: 700 })}${t(0, 44, 30, "72 ÷ 6 ≈ 12 tahun", { c: C.mute })}</g>`;
  save("majemuk-v1.svg", frame("Grafik bunga majemuk vs bunga biasa", body, "Ilustrasi: Curioverse · simulasi, belum termasuk inflasi, pajak, dan biaya"));
}

/* 2. bullbear */
{
  const pts0 = [[150, 690], [250, 640], [330, 660], [430, 560], [520, 590], [620, 460], [700, 480], [800, 330], [870, 300], [940, 380], [1010, 350], [1090, 470], [1170, 450], [1260, 560], [1340, 540], [1440, 640]]; const pts = pts0.map(([x, y]) => [x, y + 40]);
  const d = "M" + pts.map(p => p.join(",")).join(" L");
  const peakY = 340, lowY = 680;
  const bull = `<g transform="translate(330 330)">
    <path d="M-80 -40 C -130 -80 -140 -150 -110 -190 C -105 -140 -80 -100 -40 -80 Z" fill="${C.ink}"/>
    <path d="M80 -40 C 130 -80 140 -150 110 -190 C 105 -140 80 -100 40 -80 Z" fill="${C.ink}"/>
    <path d="M-90 -60 Q 0 -100 90 -60 L 70 60 Q 0 110 -70 60 Z" fill="${C.up}"/>
    <ellipse cx="0" cy="62" rx="58" ry="36" fill="${C.bg2}"/>
    <circle cx="-22" cy="62" r="7" fill="${C.ink}"/><circle cx="22" cy="62" r="7" fill="${C.ink}"/>
    <circle cx="-40" cy="-10" r="10" fill="${C.bg}"/><circle cx="40" cy="-10" r="10" fill="${C.bg}"/>
    ${t(0, 160, 44, "BULL", { a: "middle", w: 700, c: C.up })}${t(0, 202, 28, "tanduk menyerang ke atas", { a: "middle", c: C.mute })}
  </g>`;
  const bear = `<g transform="translate(1290 240)">
    <circle cx="-70" cy="-80" r="34" fill="${C.down}"/><circle cx="70" cy="-80" r="34" fill="${C.down}"/>
    <circle cx="-70" cy="-80" r="15" fill="${C.bg2}"/><circle cx="70" cy="-80" r="15" fill="${C.bg2}"/>
    <ellipse cx="0" cy="0" rx="100" ry="92" fill="${C.down}"/>
    <ellipse cx="0" cy="38" rx="44" ry="32" fill="${C.bg2}"/><ellipse cx="0" cy="24" rx="15" ry="10" fill="${C.ink}"/>
    <circle cx="-38" cy="-18" r="10" fill="${C.ink}"/><circle cx="38" cy="-18" r="10" fill="${C.ink}"/>
    <g stroke="${C.down}" stroke-width="9" stroke-linecap="round"><line x1="140" y1="-40" x2="110" y2="70"/><line x1="170" y1="-40" x2="140" y2="70"/><line x1="200" y1="-40" x2="170" y2="70"/></g>
    ${t(0, 150, 44, "BEAR", { a: "middle", w: 700, c: C.down })}${t(0, 192, 28, "cakar menyerang ke bawah", { a: "middle", c: C.mute })}
  </g>`;
  const body = `
${t(100, 120, 60, "Bull vs bear", { f: SERIF, w: 700 })}
<line x1="150" y1="790" x2="1460" y2="790" stroke="${C.line}" stroke-width="3"/>
<path d="M${pts.slice(0, 9).map(p => p.join(",")).join(" L")}" fill="none" stroke="${C.up}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M${pts.slice(8).map(p => p.join(",")).join(" L")}" fill="none" stroke="${C.down}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="870" cy="340" r="13" fill="${C.ink}"/>${t(870, 310, 30, "puncak", { a: "middle", w: 700 })}
<line x1="890" y1="${peakY}" x2="1500" y2="${peakY}" stroke="${C.ink}" stroke-width="2" stroke-dasharray="6 8"/>
<line x1="1500" y1="${peakY}" x2="1500" y2="${lowY}" stroke="${C.ink}" stroke-width="3"/>
<line x1="1485" y1="${peakY}" x2="1515" y2="${peakY}" stroke="${C.ink}" stroke-width="3"/><line x1="1485" y1="${lowY}" x2="1515" y2="${lowY}" stroke="${C.ink}" stroke-width="3"/>
${t(1530, 740, 30, "turun ≥ 20% dari puncak", { a: "end", w: 700, c: C.down })}
${bull}${bear}`;
  save("bullbear-v1.svg", frame("Ilustrasi bull dan bear market: harga naik lalu turun lebih dari 20 persen dari puncak", body, "Ilustrasi: Curioverse · grafik contoh, bukan data indeks sungguhan"));
}

/* 3. inflasi: es kopi, harga naik 5%/th */
{
  let p = 20000; const rows = [];
  for (let y = 0; y < 4; y++) { rows.push(Math.round(p / 50) * 50); p *= 1.05; }
  const rp = n => "Rp" + n.toLocaleString("de-DE");
  const cup = (x, s, price, label) => {
    const h = 300 * s, w = 170 * s, top = 640 - h;
    return `<g>
      <path d="M${x - w / 2} ${top} L${x + w / 2} ${top} L${x + w * .38} 640 L${x - w * .38} 640 Z" fill="${C.card}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M${x - w * .47} ${top + h * .18} L${x + w * .47} ${top + h * .18} L${x + w * .38} 640 L${x - w * .38} 640 Z" fill="${C.gold}" opacity=".85"/>
      <path d="M${x - w * .45} ${top + h * .18} L${x + w * .45} ${top + h * .18} L${x + w * .43} ${top + h * .38} L${x - w * .43} ${top + h * .38} Z" fill="#F1ECE1" opacity=".75"/>
      <rect x="${x - w * .6}" y="${top - 26}" width="${w * 1.2}" height="26" rx="10" fill="${C.ink}"/>
      <line x1="${x + w * .12}" y1="${top - 26}" x2="${x + w * .3}" y2="${top - 120 * s}" stroke="${C.down}" stroke-width="10" stroke-linecap="round"/>
      ${t(x, 700, 40, rp(price), { a: "middle", w: 700, f: SERIF })}
      ${t(x, 744, 28, label, { a: "middle", c: C.mute })}
    </g>`;
  };
  const xs = [300, 640, 980, 1320];
  const body = `
${t(100, 120, 60, "Es kopi yang sama, harga yang beda", { f: SERIF, w: 700 })}
${t(100, 170, 32, "Contoh kalau harga naik 5% per tahun", { c: C.mute })}
${rows.map((r, i) => cup(xs[i], 1, r, i === 0 ? "tahun ini" : `${i} tahun lagi`)).join("")}
${[0, 1, 2].map(i => `<path d="M${xs[i] + 120} 470 L${xs[i + 1] - 120} 470" stroke="${C.mute}" stroke-width="4" marker-end="url(#ar)"/>`).join("")}
${[0, 1, 2].map(i => t((xs[i] + xs[i + 1]) / 2, 450, 28, "+5%", { a: "middle", w: 700, c: C.down })).join("")}
<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${C.mute}"/></marker></defs>`;
  save("inflasi-v1.svg", frame("Empat gelas es kopi yang sama dengan harga naik 5 persen per tahun", body, "Ilustrasi: Curioverse · angka contoh, bukan harga sungguhan"));
}

/* 4. candle anatomy */
{
  const candle = (cx, up) => {
    const col = up ? C.up : C.down, hi = 230, lo = 720, o = up ? 590 : 330, c = up ? 330 : 590;
    const lab = (y, txt, sub) => `<line x1="${cx + 70}" y1="${y}" x2="${cx + 150}" y2="${y}" stroke="${C.ink}" stroke-width="2"/>${t(cx + 160, y + 12, 34, txt, { w: 700 })}${sub ? t(cx + 160, y + 48, 26, sub, { c: C.mute }) : ""}`;
    return `<line x1="${cx}" y1="${hi}" x2="${cx}" y2="${lo}" stroke="${col}" stroke-width="8"/>
      <rect x="${cx - 60}" y="${Math.min(o, c)}" width="120" height="${Math.abs(o - c)}" rx="6" fill="${col}"/>
      ${lab(hi, "High", "tertinggi")}${lab(up ? c : o, up ? "Close" : "Open", up ? "penutupan" : "pembukaan")}${lab(up ? o : c, up ? "Open" : "Close", up ? "pembukaan" : "penutupan")}${lab(lo, "Low", "terendah")}
      ${t(cx, 800, 36, up ? "Lilin naik" : "Lilin turun", { a: "middle", w: 700, c: col, f: SERIF })}`;
  };
  const body = `
${t(100, 120, 60, "Anatomi satu candlestick", { f: SERIF, w: 700 })}
${candle(470, true)}${candle(1120, false)}
${t(260, 470, 30, "badan", { a: "end", c: C.mute })}<line x1="272" y1="460" x2="395" y2="460" stroke="${C.mute}" stroke-width="2"/>
${t(260, 290, 30, "sumbu", { a: "end", c: C.mute })}<line x1="272" y1="280" x2="460" y2="280" stroke="${C.mute}" stroke-width="2"/>`;
  save("candle-v1.svg", frame("Dua candlestick, satu naik dan satu turun, dengan label open, high, low, close, badan, dan sumbu", body, "Ilustrasi: Curioverse · warna naik/turun tergantung aplikasi"));
}

/* 5. g20 */
{
  const m = ["Afrika Selatan", "Amerika Serikat", "Arab Saudi", "Argentina", "Australia", "Brasil", "India", "Indonesia", "Inggris", "Italia", "Jepang", "Jerman", "Kanada", "Korea Selatan", "Meksiko", "Prancis", "Rusia", "Tiongkok", "Turki"];
  let cells = ""; const cw = 340, ch = 72, x0 = 110, y0 = 205;
  m.forEach((n, i) => { const c = i % 4, r = Math.floor(i / 4), x = x0 + c * (cw + 26), y = y0 + r * (ch + 12), id = n === "Indonesia";
    cells += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="14" fill="${id ? C.moss : C.card}" stroke="${id ? C.moss : C.line}" stroke-width="3"/>${t(x + 26, y + 48, 32, n, { w: id ? 700 : 400, c: id ? C.bg : C.ink })}`; });
  const ex = [["Uni Eropa", ""], ["Uni Afrika", "sejak 2023"]];
  ex.forEach(([n, s], k) => { const i = 19 + k, c = i % 4, r = Math.floor(i / 4), x = x0 + c * (cw + 26), y = y0 + r * (ch + 12);
    cells += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="14" fill="${C.bg2}" stroke="${C.gold}" stroke-width="4" stroke-dasharray="12 8"/>${t(x + 26, y + 48, 32, n, { w: 700, c: C.goldT })}${s ? t(x + 205, y + 47, 24, s, { c: C.mute }) : ""}`; });
  const body = `
${t(100, 120, 60, "Siapa saja di G20?", { f: SERIF, w: 700 })}
${t(100, 172, 32, "19 negara + Uni Eropa + Uni Afrika · dibentuk 1999 · KTT Bali 2022", { c: C.mute })}
${cells}`;
  save("g20-v1.svg", frame("Daftar anggota G20: 19 negara termasuk Indonesia, ditambah Uni Eropa dan Uni Afrika", body));
}

/* 6. cekberita */
{
  const q = ["Siapa sumbernya?", "Kapan kejadiannya?", "Ada data atau cuma klaim?", "Media lain bilang apa?", "Judulnya bikin emosi?"];
  const items = q.map((s, i) => { const y = 260 + i * 110;
    return `<rect x="640" y="${y - 54}" width="72" height="72" rx="14" fill="${C.card}" stroke="${C.moss}" stroke-width="5"/><path d="M656 ${y - 18} L672 ${y} L700 ${y - 40}" fill="none" stroke="${C.moss}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    ${t(740, y, 44, `${i + 1}. ${s}`, { w: 700, f: SERIF })}`; }).join("");
  const phone = `<g transform="translate(140 210)">
    <rect width="360" height="600" rx="44" fill="${C.ink}"/><rect x="22" y="40" width="316" height="520" rx="22" fill="${C.card}"/>
    <rect x="50" y="80" width="260" height="140" rx="12" fill="${C.line}"/>
    <rect x="50" y="250" width="240" height="20" rx="10" fill="${C.mute}"/><rect x="50" y="286" width="200" height="20" rx="10" fill="${C.mute}"/>
    <rect x="50" y="340" width="260" height="12" rx="6" fill="${C.line}"/><rect x="50" y="366" width="230" height="12" rx="6" fill="${C.line}"/><rect x="50" y="392" width="250" height="12" rx="6" fill="${C.line}"/>
    <rect x="50" y="470" width="260" height="64" rx="32" fill="${C.down}"/>${t(180, 513, 32, "Share?", { a: "middle", w: 700, c: C.bg })}
    <circle cx="300" cy="460" r="52" fill="${C.gold}" stroke="${C.bg}" stroke-width="6"/>${t(300, 480, 60, "?", { a: "middle", w: 700, c: C.ink, f: SERIF })}
  </g>`;
  const body = `${t(100, 120, 60, "Sebelum pencet share", { f: SERIF, w: 700 })}${phone}${items}`;
  save("cekberita-v1.svg", frame("Ponsel dengan tombol share dan daftar lima pertanyaan untuk mengecek berita", body));
}

/* 7. tardigrade */
{
  const bear = `<g transform="translate(470 480)">
    <ellipse cx="0" cy="0" rx="290" ry="150" fill="#D8C7A8" stroke="${C.ink}" stroke-width="6"/>
    ${[-200, -90, 20].map(x => `<path d="M${x - 40} -120 Q ${x + 15} -160 ${x + 70} -120" fill="none" stroke="${C.goldT}" stroke-width="5" opacity=".6"/>`).join("")}
    ${[-190, -70, 50, 170].map(x => `<g><path d="M${x - 30} 110 Q ${x - 34} 190 ${x - 10} 200 L ${x + 30} 200 Q ${x + 40} 160 ${x + 34} 110 Z" fill="#D8C7A8" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>${[-14, 0, 14, 28].map(d => `<line x1="${x + d - 6}" y1="200" x2="${x + d - 10}" y2="222" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`).join("")}</g>`).join("")}
    <ellipse cx="300" cy="-10" rx="70" ry="66" fill="#D8C7A8" stroke="${C.ink}" stroke-width="6"/>
    <circle cx="322" cy="-34" r="11" fill="${C.ink}"/>
    <path d="M352 24 Q 362 32 370 22" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
  const tun = `<g transform="translate(1340 520)">
    <ellipse cx="0" cy="0" rx="130" ry="80" fill="#C5AF8A" stroke="${C.ink}" stroke-width="6"/>
    ${[-70, -20, 30, 80].map(x => `<path d="M${x - 30} -60 Q ${x} -20 ${x - 25} 50" fill="none" stroke="${C.goldT}" stroke-width="5" opacity=".7"/>`).join("")}
    ${t(0, 150, 40, "mode tun", { a: "middle", w: 700, f: SERIF })}${t(0, 192, 28, "mengerut, metabolisme", { a: "middle", c: C.mute })}${t(0, 228, 28, "hampir berhenti", { a: "middle", c: C.mute })}
  </g>`;
  const body = `
${t(100, 120, 60, "Water bear dan mode tun", { f: SERIF, w: 700 })}
${t(100, 172, 32, "Panjangnya kebanyakan sekitar 0,5 mm · 8 kaki", { c: C.mute })}
${bear}${tun}
<defs><marker id="a2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${C.ink}"/></marker></defs>
<path d="M940 420 Q 1060 350 1180 430" fill="none" stroke="${C.ink}" stroke-width="5" marker-end="url(#a2)"/>${t(1060, 350, 30, "kering", { a: "middle", w: 700, c: C.down })}
<path d="M1180 620 Q 1060 700 940 640" fill="none" stroke="${C.ink}" stroke-width="5" marker-end="url(#a2)"/>${t(1060, 730, 30, "ketemu air", { a: "middle", w: 700, c: C.blue })}`;
  save("tardigrade-v1.svg", frame("Gambar kartun tardigrade berkaki delapan dan bentuk tun saat kering", body, "Ilustrasi: Curioverse · bentuk disederhanakan, bukan skala"));
}

/* 8. tulip */
{
  const petal = (d, id) => `<path d="${d}" fill="url(#${id})" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`;
  const stripes = id => `<pattern id="${id}" width="44" height="400" patternUnits="userSpaceOnUse" patternTransform="rotate(8)"><rect width="44" height="400" fill="#F4EEE3"/><path d="M8 0 Q 26 100 12 200 Q 0 300 18 400" stroke="${C.down}" stroke-width="12" fill="none"/></pattern>`;
  const flower = `<g transform="translate(400 210) scale(.85)">
    <path d="M0 330 Q -10 520 10 700" stroke="${C.moss}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M6 600 Q -140 520 -160 380 Q -60 450 6 560 Z" fill="${C.moss}"/>
    <path d="M8 650 Q 150 600 170 450 Q 70 530 8 610 Z" fill="${C.moss}" opacity=".85"/>
    ${petal("M-120 120 Q -150 280 0 340 Q -40 220 -20 60 Q -80 60 -120 120 Z", "st")}
    ${petal("M120 120 Q 150 280 0 340 Q 40 220 20 60 Q 80 60 120 120 Z", "st")}
    ${petal("M-60 40 Q 0 -20 60 40 Q 90 220 0 340 Q -90 220 -60 40 Z", "st")}
  </g>`;
  const X0 = 800, X1 = 1460, Yb = 700;
  const bubble = "M800,660 C 900,650 980,630 1060,560 C 1130,490 1180,320 1240,240 C 1262,230 1272,240 1282,300 C 1300,520 1340,640 1460,680";
  const body = `
<defs>${stripes("st")}</defs>
${t(100, 120, 60, "Tulip mania, 1636 sampai 1637", { f: SERIF, w: 700 })}
${flower}
<line x1="${X0}" y1="${Yb}" x2="${X1}" y2="${Yb}" stroke="${C.ink}" stroke-width="3"/>
<line x1="${X0}" y1="${Yb}" x2="${X0}" y2="220" stroke="${C.ink}" stroke-width="3"/>
${t(X0 - 14, 240, 26, "harga", { a: "end", c: C.mute })}
<path d="${bubble}" fill="none" stroke="${C.gold}" stroke-width="10" stroke-linecap="round"/>
${t(1060, 760, 28, "musim dingin 1636", { a: "middle", c: C.mute })}${t(1300, 760, 28, "Feb 1637", { a: "middle", c: C.down, w: 700 })}
${t(1250, 200, 34, "pop!", { a: "middle", w: 700, c: C.down, f: SERIF, i: true })}
${t(820, 300, 28, "bentuk gelembung harga,", { c: C.mute })}${t(820, 336, 28, "bukan data harga asli", { c: C.mute })}`;
  save("tulip-v1.svg", frame("Ilustrasi tulip bergaris merah-putih dan grafik pola gelembung harga yang naik lalu jatuh pada Februari 1637", body));
}
console.log("ok");

/* 9. barnum-effect: satu profil identik untuk banyak orang (Forer 1948) */
{
  const card = (x, who) => `<g transform="translate(${x} 250)">
  <circle cx="200" cy="0" r="46" fill="${C.moss}"/><circle cx="200" cy="-12" r="18" fill="${C.bg}"/><path d="M168 30 Q200 0 232 30" fill="${C.bg}"/>
  ${t(200, 84, 28, who, { a: "middle", w: 700 })}
  <rect x="0" y="110" width="400" height="390" rx="18" fill="${C.card}" stroke="${C.line}" stroke-width="3"/>
  ${t(30, 160, 22, "HASIL TES KEPRIBADIANMU", { w: 700, c: C.goldT })}
  <line x1="30" x2="370" y1="180" y2="180" stroke="${C.line}" stroke-width="2"/>
  ${t(30, 226, 25, "Kadang kamu ekstrover", { f: SERIF, i: 1 })}${t(30, 260, 25, "dan supel, kadang introver", { f: SERIF, i: 1 })}${t(30, 294, 25, "dan pendiam.", { f: SERIF, i: 1 })}
  ${t(30, 350, 25, "Kamu punya kapasitas besar", { f: SERIF, i: 1 })}${t(30, 384, 25, "yang belum kamu manfaatkan.", { f: SERIF, i: 1 })}
  <rect x="30" y="420" width="340" height="50" rx="10" fill="${C.bg2}"/>${t(200, 454, 24, "“Kok gue banget!”", { a: "middle", w: 700, c: C.moss })}
</g>`;
  const body = `
${t(100, 120, 60, "Satu profil untuk semua", { f: SERIF, w: 700 })}
${t(100, 170, 32, "Forer, 1948: 39 mahasiswa menerima “hasil tes” yang isinya sama persis", { c: C.mute })}
${card(150, "Mahasiswa A")}${card(600, "Mahasiswa B")}${card(1050, "Mahasiswa C")}
<line x1="550" x2="600" y1="555" y2="555" stroke="${C.gold}" stroke-width="5" stroke-dasharray="10 8"/>
<line x1="1000" x2="1050" y1="555" y2="555" stroke="${C.gold}" stroke-width="5" stroke-dasharray="10 8"/>
${t(800, 815, 30, "Rata-rata dinilai tepat ±4,3 dari 5", { a: "middle", w: 700, c: C.goldT })}`;
  save("barnum-effect-v1.svg", frame("Tiga kartu hasil tes kepribadian yang isinya sama persis untuk tiga mahasiswa berbeda", body, "Ilustrasi: Curioverse · kalimat diparafrase dari profil Forer"));
}

/* 10. mandiri-gadai-saham-haji-isam-msci: gadai vs repo + garis waktu */
{
  const col = (x, head, color, lines) => `<g transform="translate(${x} 205)">
  <rect width="620" height="290" rx="18" fill="${C.card}" stroke="${C.line}" stroke-width="3"/>
  <rect width="620" height="70" rx="18" fill="${color}"/><rect y="50" width="620" height="20" fill="${color}"/>
  ${t(310, 48, 36, head, { a: "middle", w: 700, c: C.card })}
  ${lines.map((l, i) => `<circle cx="44" cy="${128 + i * 62}" r="8" fill="${color}"/>${t(70, 138 + i * 62, 28, l)}`).join("")}
</g>`;
  const ev = [["Jan 2026", "MSCI singgung", "risiko turun kelas"], ["24 Jun", "MSCI: tetap Emerging,", "beri tenggat"], ["30 Sep", "Akta gadai", "saham JARR"], ["7 Okt", "Gadai diumumkan", "di BEI"], ["15 Okt", "MSCI usul pindah", "ke Standalone"]];
  const X0 = 200, X1 = 1400, Y = 640, xs = ev.map((_, i) => X0 + (X1 - X0) * i / (ev.length - 1));
  const tl = ev.map(([d, a, b], i) => { const g = i === 2 || i === 3; return `<circle cx="${xs[i]}" cy="${Y}" r="16" fill="${g ? C.down : C.moss}"/>${t(xs[i], Y - 34, 28, d, { a: "middle", w: 700, c: g ? C.down : C.moss })}${t(xs[i], Y + 54, 24, a, { a: "middle" })}${t(xs[i], Y + 86, 24, b, { a: "middle", c: C.mute })}`; }).join("");
  const body = `
${t(100, 120, 60, "Gadai atau repo?", { f: SERIF, w: 700 })}
${t(100, 170, 30, "Pertanyaan kuncinya: siapa yang memegang saham", { c: C.mute })}
${col(150, "GADAI", C.moss, ["Saham tetap milik pemberi gadai", "Jadi agunan tambahan kredit", "Dieksekusi hanya jika gagal bayar"])}
${col(830, "REPO", C.goldT, ["Kepemilikan saham pindah dulu", "Diwajibkan POJK 9/2015", "Ada janji beli kembali"])}
<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${C.line}" stroke-width="6"/>
${tl}`;
  save("mandiri-gadai-saham-haji-isam-msci-v1.svg", frame("Dua kolom gadai saham dan repo, dengan garis waktu Januari sampai 15 Oktober 2026", body, "Ilustrasi: Curioverse · skema disederhanakan, tanpa skala waktu"));
}

/* 11. dark-triad: tiga ciri yang tumpang tindih (Paulhus &amp; Williams, 2002) + masuk vs berprestasi */
{
  const ring = (cx, cy, color) => `<circle cx="${cx}" cy="${cy}" r="165" fill="${color}" fill-opacity=".16" stroke="${color}" stroke-width="5"/>`;
  const lab = (x, y, color, label, sub) => `<rect x="${x - 165}" y="${y - 38}" width="330" height="86" rx="14" fill="${C.card}" stroke="${color}" stroke-width="2"/>${t(x, y, 32, label, { a: "middle", w: 700, c: color })}${t(x, y + 34, 23, sub, { a: "middle", c: C.mute })}`;
  const row = (y, a, b, color) => `<circle cx="1062" cy="${y - 9}" r="9" fill="${color}"/>${t(1084, y, 27, a, { w: 700 })}${t(1084, y + 34, 24, b, { c: C.mute })}`;
  const body = `
${t(100, 120, 60, "Tiga sisi gelap, satu inti", { f: SERIF, w: 700 })}
${t(100, 170, 30, "Paulhus &amp; Williams (2002): tumpang tindih, tapi bukan hal yang sama", { c: C.mute })}
${ring(420, 400, C.goldT)}${ring(640, 400, C.down)}${ring(530, 580, C.moss)}
${lab(230, 250, C.goldT, "Narsisme", "merasa istimewa")}
${lab(830, 250, C.down, "Machiavellianisme", "manipulatif")}
${lab(530, 790, C.moss, "Psikopati", "impulsif, minim empati")}
<circle cx="530" cy="460" r="58" fill="${C.card}" stroke="${C.ink}" stroke-width="3"/>
${t(530, 452, 22, "kurang", { a: "middle", w: 700 })}${t(530, 480, 22, "ramah", { a: "middle", w: 700 })}
<g transform="translate(1020 250)"><rect width="500" height="500" rx="18" fill="${C.card}" stroke="${C.line}" stroke-width="3"/></g>
${t(1062, 310, 30, "Naik vs berprestasi", { f: SERIF, w: 700 })}
${row(380, "Narsisme", "gaji lebih tinggi (Spurk dkk.)", C.goldT)}
${row(470, "Machiavellianisme", "lebih sering jadi atasan", C.down)}
${row(560, "Psikopati", "gaji &amp; posisi justru lebih rendah", C.moss)}
<line x1="1062" x2="1478" y1="625" y2="625" stroke="${C.line}" stroke-width="2"/>
${t(1062, 670, 26, "Kinerja kerja: hampir nol", { w: 700, c: C.ink })}
${t(1062, 706, 24, "~1% variasi (O'Boyle dkk., 2012)", { c: C.mute })}`;
  save("dark-triad-v1.svg", frame("Diagram tiga lingkaran narsisme, Machiavellianisme, dan psikopati yang tumpang tindih, dengan ringkasan hubungannya dengan karier", body, "Ilustrasi: Curioverse · disederhanakan dari riset yang dikutip"));
}

/* 12. pisau-ockham-hantu: hitung asumsi untuk satu kejadian ketindihan */
{
  const col = (x, head, color, lines, foot) => `<g transform="translate(${x} 330)">
  <rect width="620" height="430" rx="18" fill="${C.card}" stroke="${C.line}" stroke-width="3"/>
  <rect width="620" height="70" rx="18" fill="${color}"/><rect y="50" width="620" height="20" fill="${color}"/>
  ${t(310, 48, 32, head, { a: "middle", w: 700, c: C.card })}
  ${lines.map((l, i) => `<circle cx="44" cy="${128 + i * 62}" r="8" fill="${color}"/>${t(70, 138 + i * 62, 26, l)}`).join("")}
  <rect x="30" y="340" width="560" height="60" rx="10" fill="${C.bg2}"/>${t(310, 380, 26, foot, { a: "middle", w: 700, c: color })}
</g>`;
  const body = `
${t(100, 120, 60, "Hitung asumsinya", { f: SERIF, w: 700 })}
${t(100, 170, 30, "Kejadian: bangun tengah malam, badan kaku, terasa ada sosok di kamar", { c: C.mute })}
<g transform="translate(150 215)"><rect width="1300" height="80" rx="16" fill="${C.card}" stroke="${C.gold}" stroke-width="3" stroke-dasharray="12 8"/>
${t(650, 52, 28, "Pisau Ockham: jangan menambah asumsi kalau yang sudah ada cukup", { a: "middle", f: SERIF, i: 1 })}</g>
${col(150, "PENJELASAN 1: KETINDIHAN", C.moss, ["Otot lumpuh saat tidur REM (sudah terukur)", "Mimpi bocor ke saat setengah sadar", "Lebih sering kalau kurang tidur"], "Tidak butuh entitas baru")}
${col(830, "PENJELASAN 2: SOSOK DARI LUAR", C.goldT, ["Ada sosok yang datang ke kamar", "Ia bisa menekan dada tanpa jejak", "Mekanismenya belum bisa diukur"], "Butuh entitas + mekanisme baru")}`;
  save("pisau-ockham-hantu-v1.svg", frame("Dua kolom yang membandingkan jumlah asumsi dua penjelasan untuk kejadian ketindihan di malam hari", body, "Ilustrasi: Curioverse · alat berpikir, bukan penilaian atas keyakinan"));
}

/* 13. halo-effect: Landy &amp; Sigall (1974), nilai esai menurut foto penulis */
{
  const X0 = 260, Y0 = 735, H = 420 / 9;
  const bar = (x, v, color) => `<rect x="${x}" y="${Y0 - v * H}" width="130" height="${v * H}" rx="8" fill="${color}"/>${t(x + 65, Y0 - v * H - 18, 32, String(v).replace(".", ","), { a: "middle", w: 700 })}`;
  const key = (x, color, lab) => `<rect x="${x}" y="222" width="34" height="34" rx="6" fill="${color}"/>${t(x + 48, 249, 26, lab)}`;
  const grp = (x, title, [a, c, u]) => `${bar(x, a, C.gold)}${bar(x + 150, c, C.line)}${bar(x + 300, u, C.blue)}${t(x + 215, Y0 + 50, 30, title, { a: "middle", w: 700 })}`;
  const body = `
${t(100, 120, 60, "Esai yang sama, nilai yang beda", { f: SERIF, w: 700 })}
${t(100, 170, 30, "Landy &amp; Sigall (1974): 60 mahasiswa menilai esai, skala 1–9", { c: C.mute })}
${key(260, C.gold, "foto penulis menarik")}${key(640, C.line, "tanpa foto")}${key(900, C.blue, "foto penulis tidak menarik")}
<line x1="${X0 - 40}" x2="1460" y1="${Y0}" y2="${Y0}" stroke="${C.ink}" stroke-width="3"/>
${grp(X0, "Esai bagus", [6.7, 6.6, 5.9])}
${grp(X0 + 640, "Esai jelek", [5.2, 4.7, 2.7])}`;
  save("halo-effect-v1.svg", frame("Grafik batang nilai esai bagus dan jelek menurut foto penulis: menarik, tanpa foto, tidak menarik", body, "Ilustrasi: Curioverse · data Landy &amp; Sigall (1974)"));
}
