#!/usr/bin/env python3
"""Build timeline, subtitles (ASS + SRT) and an original music bed for
"Hidup yang Sedang Kita Korbankan". Usage: build.py full|short"""
import json, subprocess, sys, os, re
import numpy as np
from scipy.io import wavfile

ROOT = os.path.expanduser("~/hidup")
MODE = sys.argv[1] if len(sys.argv) > 1 else "full"

# scene id -> image index in raw/ (from contact sheet)
IMG = {1:24,2:23,3:25,4:26,5:22,6:20,7:19,8:16,9:21,10:17,11:18,12:12,13:13,14:14,
       15:10,16:15,17:11,18:8,19:5,20:9,21:7,22:6,23:0,24:1,25:4,26:2,27:3}

TEXT = {}
cur = None
for line in open("/mnt/user-data/uploads/narration_only.txt", encoding="utf-8"):
    line = line.strip()
    m = re.match(r"SCENE (\d+)", line)
    if m: cur = int(m.group(1)); continue
    if line and cur: TEXT[cur] = (TEXT.get(cur, "") + " " + line).strip()

EN = {
1:"Have you ever noticed… that lately, your life is only about getting things done?",
2:"Waking up because work is waiting. Going to sleep thinking about what needs doing tomorrow.",
3:"Even on your days off, you never really rest. Your body may stop working… but your mind never stops thinking.",
4:"Funny, isn't it? We used to have so many dreams.",
5:"To travel to places we've never been. To have time for the people we love.",
6:"To buy something without checking the price. To live calmly, without always worrying about money.",
7:"Then we grew up. And one by one, those dreams turned into responsibilities.",
8:"We started counting everything. How much to save. How much to pay. How much to sacrifice so we can still get by next month.",
9:"Until finally… we became someone we never imagined. Someone always tired. Who replies to messages only when there's time.",
10:"Who cancels plans for being too tired. Who says, \"Later, when everything is more stable.\"",
11:"But… when will our life actually be stable? After a better job? After a bigger salary?",
12:"After our savings are enough? After everyone we love is happy? Or after we have nothing left to chase?",
13:"Because strangely… every time we reach the goal we once dreamed of, there's always a new one to chase. And we keep running.",
14:"Faster. Further. Harder. As if life were a race we're not allowed to lose.",
15:"Yet quietly… a part of us was left behind. The self who used to laugh so easily.",
16:"Who could enjoy an afternoon without guilt. Who could sleep soundly without thinking about tomorrow. Who was happy over little things.",
17:"And now? Even when we have time to rest… we feel guilty for not doing something productive.",
18:"And the saddest part of all… we start to think it's normal. We treat exhaustion as proof that we're fighting.",
19:"We treat lost time as the price of success. Until one day, maybe, we make it.",
20:"We have the money we once dreamed of. The job we once fought for. We can buy things we could only look at from afar.",
21:"But when everything is finally here… we look back. And realize… there were so many days we never truly lived.",
22:"So many moments we missed. So many versions of ourselves we left behind. Just because we were too busy preparing for a better life.",
23:"But what if the life we've been waiting for… is the very life we're missing right now?",
24:"So if you're tired today… I hope you remember one thing. You weren't born just to work. You don't have to turn every second of your life into something productive.",
25:"And you don't have to wait for everything to be perfect to be happy. Because life isn't only about what you manage to collect. It's also about what you get to feel.",
26:"The people you got to hug. The conversations you got to enjoy. And the simple days you'll never be able to repeat.",
27:"Don't spend your entire life trying to make a living… only to realize you never really lived.",
}

SCENES = list(range(1, 28)) if MODE == "full" else [1, 11, 13, 14, 23, 26, 27]

def dur(p):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p]).decode())

LEAD, TAIL, XF = 0.7, 1.3, 0.8
plan, t = [], 0.0
for i, s in enumerate(SCENES):
    vo = dur(f"{ROOT}/audio/vo_{s:02d}.mp3")
    tail = TAIL + (1.5 if s == 23 else 0) + (3.0 if s == 27 else 0) + (0.4 if s in (4, 14, 22) else 0)
    length = LEAD + vo + tail
    plan.append(dict(scene=s, img=IMG[s], vo=vo, start=t, len=length, vo_at=t + LEAD))
    t += length - XF  # next clip overlaps by XF
total = plan[-1]["start"] + plan[-1]["len"]

def chunks(text, maxc=30):
    """Split into subtitle cues of <=2 lines (~2*maxc chars), on sentence/clause boundaries."""
    sents = re.split(r"(?<=[.?!…])\s+", text)
    cues = []
    for s in sents:
        if len(s) <= maxc * 2:
            cues.append(s); continue
        parts = re.split(r"(?<=,)\s+", s); buf = ""
        for p in parts:
            if len(buf) + len(p) + 1 > maxc * 2 and buf: cues.append(buf); buf = p
            else: buf = (buf + " " + p).strip()
        if buf: cues.append(buf)
    return cues

def wrap(s, maxc=30):
    if len(s) <= maxc: return s
    words, best = s.split(), None
    for k in range(1, len(words)):
        a, b = " ".join(words[:k]), " ".join(words[k:])
        sc = max(len(a), len(b))
        if best is None or sc < best[0]: best = (sc, a, b)
    return best[1] + "\\N" + best[2]

def cues_for(texts):
    out = []
    for p in plan:
        cs = chunks(texts[p["scene"]])
        tot = sum(len(c) for c in cs)
        tt = p["vo_at"]
        for c in cs:
            d = p["vo"] * len(c) / tot
            out.append([tt, tt + d + 0.25, c]); tt += d
    for i in range(len(out) - 1):
        out[i][1] = min(out[i][1], out[i + 1][0] - 0.04)
    return out

def ts_ass(x):
    h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60
    return f"{h}:{m:02d}:{s:05.2f}"
def ts_srt(x):
    ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

tag = MODE
id_cues = cues_for(TEXT)
with open(f"{ROOT}/subs_{tag}.ass", "w", encoding="utf-8") as f:
    f.write("""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Inter Display Medium,60,&H00EEF4F7,&H00EEF4F7,&H00141414,&H80000000,0,0,0,0,100,100,0.4,0,1,3.6,2.4,2,100,100,340,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""")
    for a, b, c in id_cues:
        f.write(f"Dialogue: 0,{ts_ass(a)},{ts_ass(b)},Sub,,0,0,0,,{{\\fad(180,180)}}{wrap(c)}\n")

for lang, texts in (("id", TEXT), ("en", EN)):
    with open(f"{ROOT}/subs_{tag}_{lang}.srt", "w", encoding="utf-8") as f:
        for n, (a, b, c) in enumerate(cues_for(texts), 1):
            f.write(f"{n}\n{ts_srt(a)} --> {ts_srt(b)}\n{wrap(c).replace(chr(92)+'N', chr(10))}\n\n")

# ---------------- original music bed (felt piano + cello pad) ----------------
SR = 48000
N = int((total + 0.5) * SR)
mus = np.zeros(N)
rng = np.random.default_rng(7)
def note(f, t0, d, amp, kind):
    i0 = int(t0 * SR); n = int(d * SR)
    if i0 >= N: return
    n = min(n, N - i0); tt = np.arange(n) / SR
    if kind == "pad":  # cello-ish: saw-ish partials, slow attack/release, vibrato
        vib = 1 + 0.003 * np.sin(2 * np.pi * 5 * tt)
        w = sum(np.sin(2 * np.pi * f * k * vib * tt) / k ** 1.6 for k in range(1, 7))
        env = np.minimum(1, tt / 2.2) * np.minimum(1, (d - tt) / 2.5)
    else:  # felt piano: soft partials, exponential decay
        w = sum(np.sin(2 * np.pi * f * k * tt) * np.exp(-tt * (1.2 + 1.6 * k)) / k ** 2 for k in range(1, 6))
        env = np.minimum(1, tt / 0.012) * np.exp(-tt * 0.55)
    mus[i0:i0 + n] += amp * w * env
def hz(m): return 440 * 2 ** ((m - 69) / 12)

# progression: Am F C G (present / melancholic), switching to C G Am F (hopeful) in the ending
sad = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [48, 52, 55]), (55, [55, 59, 62])]
hope = [(48, [48, 52, 55]), (55, [55, 59, 62]), (57, [57, 60, 64]), (53, [53, 57, 60])]
def scene_at(x):
    for p in plan:
        if p["start"] <= x < p["start"] + p["len"]: return p["scene"]
    return SCENES[-1]
CH = 6.0
k, x = 0, 0.0
while x < total:
    s = scene_at(x)
    hopeful = s >= 24
    root, tri = (hope if hopeful else sad)[k % 4]
    silent = s == 23
    build = 13 <= s <= 22
    pad_amp = 0.0 if silent else (0.055 if build else 0.04)
    if pad_amp:
        note(hz(root - 12), x, CH + 1.5, pad_amp, "pad")
        note(hz(tri[1]), x, CH + 1.5, pad_amp * 0.45, "pad")
    if not silent:
        density = 4 if build else (2 if hopeful else 3)
        for j in range(density):
            m = tri[rng.integers(0, 3)] + 12 * rng.integers(1, 3)
            note(hz(m), x + j * CH / density + rng.uniform(0, 0.4), 4.5, 0.07 if hopeful else 0.06, "piano")
    k += 1; x += CH
# gentle room "reverb": a few decaying echoes
rev = mus.copy()
for dl, g in ((0.043, .35), (0.071, .28), (0.113, .22), (0.167, .16), (0.239, .1)):
    d = int(dl * SR); rev[d:] += g * mus[:-d]
mus = rev
# fade out over last 3s, fade in first 1.5s
fi = int(1.5 * SR); mus[:fi] *= np.linspace(0, 1, fi)
fo = int(3.0 * SR); mus[-fo:] *= np.linspace(1, 0, fo)
mus /= max(1e-9, np.abs(mus).max()); mus *= 0.5
wavfile.write(f"{ROOT}/music_{tag}.wav", SR, (np.stack([mus, mus], 1) * 32767).astype(np.int16))

json.dump(dict(plan=plan, total=total, xf=XF), open(f"{ROOT}/plan_{tag}.json", "w"), indent=1)
print(f"{tag}: {len(plan)} scenes, total {total:.1f}s, {len(id_cues)} cues")
