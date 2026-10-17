import sys, json, wave, numpy as np
SR=48000; BPM=128; spb=60/BPM
dur=float(sys.argv[1]); cues=json.load(open(sys.argv[2])); out=sys.argv[3]; mg=float(sys.argv[4]) if len(sys.argv)>4 else 1.0
n=int(dur*SR); t=np.arange(n)/SR; rng=np.random.default_rng(7); noise=rng.uniform(-1,1,n+SR*2)
ch=np.array([[130.81,164.81,196.0,246.94],[110.0,130.81,164.81,196.0],[87.31,130.81,174.61,220.0],[98.0,146.83,196.0,164.81]])
ci=(t//(spb*8)).astype(int)%4
pad=sum(np.sin(2*np.pi*ch[ci,k]*t)+0.25*np.sin(4*np.pi*ch[ci,k]*t) for k in range(4))*0.016
bl=(t/spb%1)*spb; kick=np.sin(2*np.pi*(55+70*np.exp(-bl*30))*bl)*np.exp(-bl*9)*0.16
ol=((t/spb+0.5)%1)*spb; hat=noise[:n]*np.exp(-ol*60)*0.025
env=np.minimum(1,t/1.0)*np.clip((dur-t)/1.5,0,1)
buf=(pad*(0.7+0.3*(1-np.exp(-bl*8)))+kick+hat)*env*mg
def lp(x,a):
    y=np.zeros_like(x); acc=0.0
    for i in range(len(x)): acc+=a[i]*(x[i]-acc); y[i]=acc
    return y
def sfx(k,L):
    s=np.arange(int(L*SR))/SR; z=noise[:len(s)]
    if k=='pop': return np.sin(2*np.pi*(900-500*np.minimum(1,s/.08))*s)*np.exp(-s*28)*.35
    if k=='tick': return np.sin(2*np.pi*2200*s)*np.exp(-s*140)*.22
    if k=='thud': return np.sin(2*np.pi*(110-50*np.minimum(1,s/.15))*s)*np.exp(-s*14)*.55
    if k=='ding': return (np.sin(2*np.pi*1318.5*s)*.6+np.sin(2*np.pi*1975.5*s)*.3)*np.exp(-s*4.5)*.28
    if k=='click': return z*np.exp(-s*900)*.5+np.sin(2*np.pi*3200*s)*np.exp(-s*300)*.12
    if k=='type': return z*np.exp(-(s%.075)*700)*.22
    if k in('whoosh','swish'):
        e=np.sin(np.pi*s/L)**(2 if k=='whoosh' else 3); return lp(z,.02+.3*e)*e*.9
    if k=='rise': return (np.sin(2*np.pi*(220+660*(s/L)**2)*s)*.15+z*.06*s/L)*np.minimum(1,s/.3)
    return 0*s
LEN=dict(pop=.25,tick=.06,thud=.4,ding=1.4,whoosh=.45,swish=.3,click=.05,type=1,rise=1.2)
for c in cues:
    x=sfx(c['kind'],c.get('len',LEN.get(c['kind'],.3)))*c.get('gain',1); a=int(c['t']*SR); b=min(n,a+len(x))
    if a<n: buf[a:b]+=x[:b-a]
w=wave.open(out,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(buf,-1,1)*32767).astype('<i2').tobytes()); w.close()
