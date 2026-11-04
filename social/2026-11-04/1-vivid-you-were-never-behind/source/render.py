"""You Were Never Behind — frame renderer. Every frame is f(t). Raw RGB to stdout."""
import sys, math, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 24
PAUSE_AT, PAUSE = 39.8, 1.2          # contemplative pause inserted after "the question"

# scene: (img, start, end, z0, z1, (cx0,cy0), (cx1,cy1))  centers as fraction of image
SC = [
    ("s1", 0.00, 10.25, 1.06, 1.15, (0.50, 0.55), (0.52, 0.58)),
    ("s2", 10.25, 14.55, 1.12, 1.05, (0.46, 0.50), (0.52, 0.50)),
    ("s3", 14.55, 23.75, 1.04, 1.13, (0.50, 0.52), (0.50, 0.50)),
    ("s4", 23.75, 33.05, 1.05, 1.17, (0.50, 0.50), (0.52, 0.56)),
    ("s5", 33.05, 41.00, 1.10, 1.13, (0.50, 0.48), (0.49, 0.47)),
    ("s6", 41.00, 48.20, 1.04, 1.12, (0.50, 0.52), (0.50, 0.50)),
    ("s7", 48.20, 54.50, 1.20, 1.04, (0.48, 0.52), (0.50, 0.50)),
    ("s8", 54.50, 60.80, 1.05, 1.08, (0.50, 0.52), (0.50, 0.52)),
]
CARD0, END = 60.8, 67.5
imgs = {s[0]: Image.open(f"img/{s[0]}.jpg").convert("RGB") for s in SC}

def ease(x):  # smooth in-out
    x = min(1, max(0, x)); return x * x * (3 - 2 * x)

def scene_frame(s, t):
    name, a, b, z0, z1, c0, c1 = s
    im = imgs[name]; iw, ih = im.size
    p = ease((t - a) / (b - a)) * 0.85 + (t - a) / (b - a) * 0.15
    z = z0 + (z1 - z0) * p
    cx = (c0[0] + (c1[0] - c0[0]) * p) * iw; cy = (c0[1] + (c1[1] - c0[1]) * p) * ih
    base = max(W / iw, H / ih) * z            # output px per source px
    sw, sh = W / base, H / ih * ih / base     # source window size
    sh = H / base
    x0 = min(max(cx - sw / 2, 0), iw - sw); y0 = min(max(cy - sh / 2, 0), ih - sh)
    inv = 1 / base
    return im.transform((W, H), Image.AFFINE, (inv, 0, x0, 0, inv, y0), resample=Image.BICUBIC)

# vignette mask (static)
yy, xx = np.mgrid[0:H, 0:W]
r = np.sqrt(((xx - W / 2) / (W * 0.75)) ** 2 + ((yy - H / 2) / (H * 0.62)) ** 2)
VIG = np.clip(1 - 0.38 * np.clip(r - 0.35, 0, 1) ** 1.6, 0, 1)[..., None].astype(np.float32)

# title card
fI = ImageFont.truetype("InstrSerif-400-italic.ttf", 92)
fS = ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-Regular.otf", 36)
def card(t):
    k = t - CARD0
    gy, gx = np.mgrid[0:H, 0:W]
    glow = np.exp(-(((gx - W / 2) / 520) ** 2 + ((gy - H * 0.48) / 700) ** 2))
    base = np.zeros((H, W, 3), np.float32)
    base += glow[..., None] * np.array([46, 30, 16], np.float32) * ease(k / 1.2)
    img = Image.fromarray(base.astype(np.uint8))
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    a1 = ease((k - 0.5) / 1.2); a2 = ease((k - 2.0) / 1.2)
    out = ease((END - 0.9 - t) / 0.9)
    t1, t2 = "you were never behind.", "you were just living a different life."
    w1 = d.textlength(t1, font=fI); w2 = d.textlength(t2, font=fS)
    d.text(((W - w1) / 2, H * 0.44 + (1 - a1) * 14), t1, font=fI, fill=(244, 236, 222, int(255 * a1 * out)))
    d.text(((W - w2) / 2, H * 0.44 + 140 + (1 - a2) * 10), t2, font=fS, fill=(214, 200, 182, int(235 * a2 * out)))
    img.paste(lay, (0, 0), lay)
    return np.asarray(img).astype(np.float32) * out if False else np.asarray(img).astype(np.float32)

def frame(t):
    if t >= CARD0:
        return card(t)
    s = next(x for x in SC if x[1] <= t < x[2])
    f = np.asarray(scene_frame(s, t)).astype(np.float32)
    f *= VIG
    if t < 0.8: f *= ease(t / 0.8)                       # fade in from black
    if t > SC[-1][2] - 1.6: f *= ease((SC[-1][2] - t) / 1.6)  # fade to black
    return f

N = int(round(END * FPS))
rng = np.random.default_rng(11)
grain_bank = [(rng.standard_normal((H // 2, W // 2)).astype(np.float32)) for _ in range(8)]
out = sys.stdout.buffer
a, b = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (0, N)
for i in range(a, b):
    t = i / FPS
    f = frame(t)
    g = np.kron(grain_bank[i % 8], np.ones((2, 2), np.float32))[..., None] * 5.0
    f = np.clip(f + g, 0, 255).astype(np.uint8)
    out.write(f.tobytes())
