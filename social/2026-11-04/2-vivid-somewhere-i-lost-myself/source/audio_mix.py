"""Deterministic ambient score + SFX + VO placement for 'Somewhere, I Lost Myself' (60 s)."""
import sys, wave, numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
DUR = 60.0
N = int(DUR * SR)
t = np.arange(N) / SR
rng = np.random.default_rng(11)


def read_wav(p):
    w = wave.open(p, 'rb'); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float64) / 32768; w.close(); return x


def lp(x, fc): return sosfilt(butter(2, fc, 'low', fs=SR, output='sos'), x)
def hp(x, fc): return sosfilt(butter(2, fc, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)


def env_box(a, b, fade=1.0):
    e = np.clip((t - a) / fade, 0, 1) * np.clip((b - t) / fade, 0, 1)
    return e


noise = rng.uniform(-1, 1, N)
music = np.zeros(N)
amb = np.zeros(N)

# ---- low drone (whole film, swells in S5-S7, softens at dawn)
drone_amp = np.interp(t, [0, 24, 33, 42, 48, 60], [0.05, 0.06, 0.09, 0.08, 0.05, 0.03])
drone = (np.sin(2 * np.pi * 55 * t) + 0.5 * np.sin(2 * np.pi * 82.4 * t + 0.3) + 0.3 * np.sin(2 * np.pi * 110.2 * t)) * drone_amp
drone *= (0.85 + 0.15 * np.sin(2 * np.pi * 0.07 * t))
music += drone * np.clip(t / 2, 0, 1)

# ---- airy synth pad (filtered noise + detuned sines), colder first half
pad_freqs_cold = [220.0, 261.6, 329.6]
pad_freqs_warm = [196.0, 246.9, 293.7, 392.0]
warm = np.clip((t - 42) / 8, 0, 1)
pad = np.zeros(N)
for f in pad_freqs_cold:
    pad += (np.sin(2 * np.pi * f * t) + np.sin(2 * np.pi * (f * 1.004) * t)) * (1 - warm)
for f in pad_freqs_warm:
    pad += (np.sin(2 * np.pi * f * t) + np.sin(2 * np.pi * (f * 1.003) * t)) * warm
pad = lp(pad, 900) * 0.010 * (0.7 + 0.3 * np.sin(2 * np.pi * 0.11 * t))
music += pad


# ---- felt piano: soft decaying harmonic notes
def piano(f, start, vel=0.12, L=4.5):
    a = int(start * SR); n = min(N - a, int(L * SR))
    if n <= 0: return
    s = np.arange(n) / SR
    tone = np.sin(2 * np.pi * f * s) + 0.35 * np.sin(4 * np.pi * f * s) + 0.12 * np.sin(6 * np.pi * f * s)
    att = np.minimum(1, s / 0.012)
    music[a:a + n] += lp(tone * att * np.exp(-s * 1.1), 1800) * vel


# sparse, cold (A minor-ish) scenes 1-7
cold_notes = [(0.4, 440.0), (2.8, 329.6), (6.2, 392.0), (9.4, 329.6), (12.3, 293.7), (15.0, 261.6),
              (18.3, 440.0), (20.6, 349.2), (24.4, 329.6), (27.2, 293.7), (30.4, 261.6), (32.6, 220.0),
              (36.4, 349.2), (39.0, 329.6)]
for st, f in cold_notes:
    piano(f, st, 0.10)
    piano(f / 2, st + 0.02, 0.05)
# warmer progression scenes 8-10 (G - Em - C - D - G)
warm_seq = [(42.3, [196.0, 293.7, 392.0]), (45.2, [164.8, 246.9, 329.6]), (48.3, [130.8, 261.6, 329.6]),
            (51.2, [146.8, 293.7, 370.0]), (54.3, [196.0, 293.7, 392.0, 493.9]), (57.0, [196.0, 392.0])]
for st, chord in warm_seq:
    for k, f in enumerate(chord):
        piano(f, st + k * 0.09, 0.07, 5.5)

# ---- ambience
# city hum S1-S4
amb += lp(noise, 220) * 0.08 * env_box(0, 24, 1.0)
# typing clicks S2
for k in range(int(6.4 / 0.13), int(11.6 / 0.13)):
    tt = k * 0.13 + 0.03 * np.sin(k * 1.7)
    a = int(tt * SR); n = int(0.03 * SR); s = np.arange(n) / SR
    amb[a:a + n] += noise[a:a + n] * np.exp(-s * 400) * 0.10
# crowd murmur + footsteps S3
amb += bp(noise, 250, 1400) * 0.06 * env_box(12, 18, 0.6) * (0.8 + 0.2 * np.sin(2 * np.pi * 0.9 * t))
for k in range(60):
    tt = 12.2 + k * 0.095 + 0.04 * np.sin(k * 2.3)
    a = int(tt * SR); n = int(0.05 * SR); s = np.arange(n) / SR
    if a + n < N: amb[a:a + n] += lp(noise[a:a + n], 600) * np.exp(-s * 90) * 0.12
# fluorescent buzz S4
amb += (np.sin(2 * np.pi * 120 * t) + 0.4 * np.sin(2 * np.pi * 240 * t)) * 0.012 * env_box(18, 24, 0.4)
# rain S5 (and faint into S6)
rain = hp(noise, 1800) * 0.07 * env_box(24, 30.4, 0.8)
rain += lp(noise, 1200) * 0.04 * env_box(24, 30.4, 0.8)
amb += rain
# wind S6
wind_e = env_box(30, 36, 1.2) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.25 * t + 1))
amb += bp(noise, 300, 900) * 0.09 * wind_e
# breath swell S7 (exhale ~36.3)
amb += bp(noise, 500, 2500) * 0.05 * np.exp(-np.maximum(0, t - 36.35) * 3) * (t > 36.3)
amb += lp(noise, 150) * 0.03 * env_box(36, 42, 0.6)
# rooftop dawn breeze + distant city S8-S10
amb += bp(noise, 200, 700) * 0.04 * env_box(42, 60, 1.5)

# ---- voiceover placement: (raw_start, raw_end, video_time)
vo_raw = read_wav(sys.argv[1])
lines = [(0.0, 2.64, 0.15), (3.29, 8.45, 6.3), (9.12, 10.99, 12.3), (11.54, 14.80, 18.3), (15.35, 18.25, 24.3),
         (18.78, 22.05, 30.3), (22.69, 27.23, 36.3), (27.76, 30.02, 42.3), (30.53, 33.04, 48.3), (33.57, 35.87, 54.3)]
vo = np.zeros(N)
for a, b, v in lines:
    s0 = int(max(0, a - 0.04) * SR); s1 = min(len(vo_raw), int((b + 0.18) * SR))
    seg = vo_raw[s0:s1].copy(); m = len(seg); fl = int(0.02 * SR)
    seg[:fl] *= np.linspace(0, 1, fl); seg[-fl:] *= np.linspace(1, 0, fl)
    d = int((v - 0.04) * SR); vo[d:d + m] += seg[:N - d]
vo *= 0.95 / max(1e-6, np.abs(vo).max())

# duck bed under VO
vo_env = lp(np.abs(vo), 6)
duck = 1 - 0.45 * np.clip(vo_env / (vo_env.max() + 1e-9) * 4, 0, 1)
bed = (music + amb) * duck
fade = np.clip(t / 0.8, 0, 1) * np.clip((DUR - t) / 2.0, 0, 1)
mix = (bed * 1.6 + vo) * fade
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix *= 0.89 / np.abs(mix).max()

out = sys.argv[2]
w = wave.open(out, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.clip(mix, -1, 1) * 32767).astype('<i2').tobytes()); w.close()
print('wrote', out)
