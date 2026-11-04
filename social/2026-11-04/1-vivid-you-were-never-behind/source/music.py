"""Deterministic felt-piano bed + ambience for You Were Never Behind."""
import numpy as np, wave, sys
SR = 48000; DUR = float(sys.argv[1]); OUT = sys.argv[2]
n = int(DUR * SR); t = np.arange(n) / SR
rng = np.random.default_rng(3)
buf = np.zeros(n)

def note(f, at, vel, L=4.5):
    a = int(at * SR); m = min(n - a, int(L * SR))
    if m <= 0: return
    s = np.arange(m) / SR
    h = (np.sin(2*np.pi*f*s) + 0.35*np.sin(2*np.pi*2*f*s)*np.exp(-s*1.2)
         + 0.12*np.sin(2*np.pi*3*f*s)*np.exp(-s*2.5) + 0.04*np.sin(2*np.pi*4.01*f*s)*np.exp(-s*4))
    env = (1 - np.exp(-s / 0.012)) * np.exp(-s * (0.55 + f / 900))  # felt: soft attack, warm decay
    buf[a:a+m] += h * env * vel

mid = lambda m: 440 * 2 ** ((m - 69) / 12)
# D major, slow & sparse: Dmaj9 – Bm7 – Gmaj7 – Asus2, 4.8 s per chord
chords = [[50, 57, 61, 64, 66], [47, 54, 57, 61, 62], [43, 50, 54, 57, 62], [45, 52, 57, 59, 64]]
step = 4.8; i = 0; tt = 2.0
while tt < DUR - 6:
    c = chords[i % 4]
    warm = min(1, max(0, (tt - 20) / 25))           # almost silent start, warmth in second half
    pause = 37.0 < tt < 41.5                         # hold back during the question
    base_v = 0.05 + 0.07 * warm
    if pause: base_v *= 0.35
    note(mid(c[0] - 12 if warm > .4 else c[0]), tt, base_v * 0.9, 6)
    pattern = [1, 3, 2, 4] if warm < .5 else [1, 3, 4, 2, 3, 4]
    for k, idx in enumerate(pattern):
        at = tt + 0.6 + k * (step - 1.0) / len(pattern) + rng.uniform(-0.03, 0.03)
        if tt < 12 and k % 2: continue
        note(mid(c[idx]), at, base_v * rng.uniform(0.7, 1.0))
    i += 1; tt += step
# final resolve
note(mid(38), DUR - 9.5, 0.12, 8); note(mid(50), DUR - 9.5, 0.08, 8); note(mid(57), DUR - 9.2, 0.07, 8)
note(mid(61), DUR - 8.9, 0.06, 8); note(mid(66), DUR - 8.5, 0.05, 8)

# simple reverb (feedback comb) for warmth
def reverb(x, delays=(0.031, 0.047, 0.061, 0.083), fb=0.55, mix=0.35):
    y = x.copy()
    for d in delays:
        D = int(d * SR); z = np.zeros_like(x)
        for k in range(1, 12):
            if k * D >= len(x): break
            z[k*D:] += x[:-k*D] * fb ** k
        y += z * mix / len(delays)
    return y
buf = reverb(buf)

def lowpass(x, fc):
    a = 1 - np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); acc = 0.0
    for k in range(len(x)): acc += a * (x[k] - acc); y[k] = acc
    return y
noise = rng.standard_normal(n)
room = lowpass(noise, 300) * 0.010 * np.clip(1 - t / 12, 0, 1)                 # S1 night room tone
rain_env = np.clip((t - 32.6) / 1.2, 0, 1) * np.clip((42.0 - t) / 1.8, 0, 1)
rain = (lowpass(noise, 3500) - lowpass(noise, 600)) * 0.05 * rain_env           # S5 rain
drops = np.zeros(n); idx = rng.integers(int(32.6*SR), int(42*SR), 220); drops[idx] = rng.uniform(.05, .15, 220)
rain += lowpass(drops, 2500) * 3 * rain_env
birds_env = np.clip((t - 48.2) / 1.5, 0, 1) * np.clip((61 - t) / 2, 0, 1)
wind = lowpass(noise, 220) * 0.03 * birds_env
chirp = np.zeros(n)
for at in [49.3, 50.1, 52.6, 55.8, 56.3, 58.9]:
    a = int(at * SR); s = np.arange(int(.12 * SR)) / SR
    chirp[a:a+len(s)] += np.sin(2*np.pi*(3200 + 1400*np.sin(2*np.pi*18*s))*s) * np.exp(-s*30) * 0.02
mix = buf + room + rain + wind + chirp
mix *= np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 2.0, 0, 1)
mix = mix / max(1e-9, np.abs(mix).max()) * 0.5
w = wave.open(OUT, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.clip(mix, -1, 1) * 32767).astype('<i2').tobytes()); w.close()
