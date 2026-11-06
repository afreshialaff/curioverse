#!/usr/bin/env python3
"""Render clips + crossfades + VO + music + burned subtitles. Usage: render.py full|short"""
import json, subprocess, sys, os
ROOT = os.path.expanduser("~/hidup")
tag = sys.argv[1]
P = json.load(open(f"{ROOT}/plan_{tag}.json"))
plan, XF, total = P["plan"], P["xf"], P["total"]
FPS = 24
os.makedirs(f"{ROOT}/clips", exist_ok=True)

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(r.stderr[-2500:]); sys.exit(1)

# 1) one clip per scene: very slow, gentle camera move (no aggressive zoom)
for i, p in enumerate(plan):
    out = f"{ROOT}/clips/{tag}_{i:02d}.mp4"
    if os.path.exists(out): continue
    n = int(round(p["len"] * FPS))
    mode = i % 3
    if mode == 0:   # slow push-in 1.00 -> 1.05
        z = f"1+0.05*on/{n}"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif mode == 1: # slow drift down at constant 1.05
        z = "1.05"; x = "iw/2-(iw/zoom/2)"; y = f"(ih-ih/zoom)*(0.15+0.7*on/{n})"
    else:           # slow pull-out 1.05 -> 1.00
        z = f"1.05-0.05*on/{n}"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    vf = (f"scale=1620:2880:flags=lanczos,zoompan=z='{z}':x='{x}':y='{y}':d={n}:s=1080x1920:fps={FPS},"
          f"format=yuv420p")
    run(["ffmpeg","-v","error","-y","-loop","1","-framerate",str(FPS),"-i",f"{ROOT}/raw/img_{p['img']:02d}.jpg",
         "-vf",vf,"-frames:v",str(n),"-c:v","libx264","-preset","veryfast","-crf","18","-pix_fmt","yuv420p",out])
    print("clip", i, flush=True)

# 2) crossfade chain + subtitles + audio mix
inputs = []
for i in range(len(plan)):
    inputs += ["-i", f"{ROOT}/clips/{tag}_{i:02d}.mp4"]
na = len(plan)
for p in plan:
    inputs += ["-i", f"{ROOT}/audio/vo_{p['scene']:02d}.mp3"]
inputs += ["-i", f"{ROOT}/music_{tag}.wav"]

fc, last = [], "[0:v]"
for i in range(1, len(plan)):
    off = plan[i]["start"]
    # hard cut with near-black dip for scene 14 -> 15 (script: hard cut with audio drop)
    trans = "fadeblack" if plan[i]["scene"] == 15 else "fade"
    fc.append(f"{last}[{i}:v]xfade=transition={trans}:duration={XF}:offset={off:.3f}[v{i}]")
    last = f"[v{i}]"
fc.append(f"{last}fade=t=in:st=0:d=1.0,fade=t=out:st={total-2.5:.3f}:d=2.5,"
          f"subtitles={ROOT}/subs_{tag}.ass:fontsdir=/usr/share/fonts/opentype/inter[vout]")
vos = []
for j, p in enumerate(plan):
    ms = int(p["vo_at"] * 1000)
    fc.append(f"[{na+j}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={ms}|{ms},volume=1.0[a{j}]")
    vos.append(f"[a{j}]")
fc.append(f"{''.join(vos)}amix=inputs={len(vos)}:normalize=0,apad[vo]")
fc.append("[vo]asplit=2[vo1][vo2]")
fc.append(f"[{2*na}:a]volume=0.55[mu]")
fc.append("[mu][vo1]sidechaincompress=threshold=0.03:ratio=6:attack=80:release=600[duck]")
fc.append(f"[vo2][duck]amix=inputs=2:normalize=0,atrim=0:{total:.3f},loudnorm=I=-16:TP=-1.5:LRA=11[aout]")

out = f"{ROOT}/out_{tag}.mp4"
run(["ffmpeg","-v","error","-y",*inputs,"-filter_complex",";".join(fc),"-map","[vout]","-map","[aout]",
     "-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p","-r",str(FPS),
     "-c:a","aac","-b:a","192k","-ar","48000","-movflags","+faststart","-t",f"{total:.3f}",out])
print("done", out)
