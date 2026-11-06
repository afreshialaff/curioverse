#!/usr/bin/env python3
"""Warm original backsound v2 (felt piano arpeggio + soft string pad). Usage: music2.py full|short
Reads plan_<tag>.json, writes music_<tag>.wav (overwrites the v1 bed)."""
import json, os, sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve, butter, sosfilt

ROOT = os.path.expanduser("~/hidup")
tag = sys.argv[1]
P = json.load(open(f"{ROOT}/plan_{tag}.json"))
plan, total = P["plan"], P["total"]
SR = 48000
N = int((total + 0.5) * SR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(3)
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

def scene_at(x):
    for p in plan:
        if p["start"] <= x < p["start"] + p["len"]: return p["scene"]
    return plan[-1]["scene"]

def add(sig, t0, pan=0.0):
    i0 = int(t0 * SR)
    if i0 >= N: return
    n = min(len(sig), N - i0)
    L[i0:i0 + n] += sig[:n] * (1 - pan) ; R[i0:i0 + n] += sig[:n] * (1 + pan)

def piano(m, vel, length=3.2):
    n = int(length * SR); t = np.arange(n) / SR; f = hz(m)
    # soft felt piano: few partials, quick soft attack, gentle decay, upper partials die fast
    w = (np.sin(2*np.pi*f*t) * np.exp(-t*0.9)
         + 0.35*np.sin(2*np.pi*2*f*t) * np.exp(-t*2.2)
         + 0.12*np.sin(2*np.pi*3*f*t) * np.exp(-t*4.0)
         + 0.05*np.sin(2*np.pi*4*f*t) * np.exp(-t*6.0))
    env = np.minimum(1, t / 0.008) * np.minimum(1, (length - t) / 0.4)
    return vel * w * env

def pad(notes, length, amp):
    n = int(length * SR); t = np.arange(n) / SR
    w = np.zeros(n)
    for m in notes:
        f = hz(m)
        w += np.sin(2*np.pi*f*t) + 0.18*np.sin(2*np.pi*2*f*t + 0.3)   # warm, nearly pure tone
    env = np.minimum(1, t / 1.6) * np.minimum(1, (length - t) / 1.2)  # slow swell, no long overlap
    return amp * w / len(notes) * env

# chords as (pad voicing, arpeggio notes) — mid register, no low drone
CH = {
 "Fmaj7": ([53, 57, 60, 64], [53, 60, 64, 69, 72, 69, 64, 60]),
 "C":     ([48, 55, 60, 64], [48, 55, 64, 67, 72, 67, 64, 55]),
 "Am7":   ([57, 60, 64, 67], [45, 57, 60, 64, 67, 64, 60, 57]),
 "G":     ([55, 59, 62, 67], [43, 55, 59, 62, 67, 62, 59, 55]),
 "F":     ([53, 57, 60, 65], [41, 53, 60, 65, 69, 65, 60, 53]),
 "Gsus":  ([55, 60, 62, 67], [43, 55, 60, 62, 67, 62, 60, 55]),
}
WISTFUL = ["Fmaj7", "C", "Am7", "G"]
HOPEFUL = ["C", "Gsus", "Am7", "F"]
BEAT = 60 / 66                      # 66 bpm, calm
BAR = 8 * BEAT / 2                  # 8 eighth-notes per chord
x, k = 0.0, 0
while x < total - 1.0:
    s = scene_at(x)
    hopeful = s >= 24 or (tag == "short" and s >= 26)
    name = (HOPEFUL if hopeful else WISTFUL)[k % 4]
    padv, arp = CH[name]
    if s == 23:                      # near silence for the core question: one soft held chord
        add(pad(padv, BAR + 0.8, 0.05), x)
    else:
        build = 13 <= s <= 22
        add(pad(padv, BAR + 0.8, 0.10 if build else 0.08), x, pan=0.0)
        step = BAR / 8
        for j, m in enumerate(arp):
            if not build and j % 2 == 1 and not hopeful: continue   # sparser in the opening
            vel = (0.20 if j == 0 else 0.13) * rng.uniform(0.85, 1.0)
            if hopeful: m += 12 if j > 0 and m < 64 else 0         # brighter register at the end
            add(piano(m, vel), x + j * step + rng.uniform(0, 0.012), pan=0.15 * np.sin(j))
    x += BAR; k += 1

# smooth room reverb: decaying filtered noise impulse response (~2.2 s)
ir_n = int(2.2 * SR); ti = np.arange(ir_n) / SR
ir = rng.standard_normal(ir_n) * np.exp(-ti * 2.6)
ir = sosfilt(butter(2, 4500, fs=SR, output="sos"), ir); ir /= np.abs(ir).sum() / 6
mix = []
for ch in (L, R):
    wet = fftconvolve(ch, ir)[:N]
    y = 0.72 * ch + 0.28 * wet
    y = sosfilt(butter(2, 7000, fs=SR, output="sos"), y)     # felt, no harsh highs
    mix.append(y)
mus = np.stack(mix, 1)
fi = int(2.0 * SR); mus[:fi] *= np.linspace(0, 1, fi)[:, None]
fo = int(3.0 * SR); mus[-fo:] *= np.linspace(1, 0, fo)[:, None]
mus /= max(1e-9, np.abs(mus).max()); mus *= 0.5
wavfile.write(f"{ROOT}/music_{tag}.wav", SR, (mus * 32767).astype(np.int16))
print("music v2", tag, f"{total:.1f}s")
