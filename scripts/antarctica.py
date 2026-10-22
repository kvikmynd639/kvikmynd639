"""Pixel-art Antarctica mission scenes for the profile README.

usage: python3 scripts/antarctica.py assets
Draws on a low-res grid, then renders looping animated GIFs
(nearest-neighbour upscaled, so pixels stay crisp). Animated bits live on their own layers.
"""
import math, random, sys, os

OUT = sys.argv[1] if len(sys.argv) > 1 else "assets"
os.makedirs(OUT, exist_ok=True)
SCALE = 5  # logical pixel -> screen pixels

# ───────────── 5x7 bitmap font ─────────────
FONT = {
    "A": "01110 10001 10001 11111 10001 10001 10001", "B": "11110 10001 10001 11110 10001 10001 11110",
    "C": "01110 10001 10000 10000 10000 10001 01110", "D": "11110 10001 10001 10001 10001 10001 11110",
    "E": "11111 10000 10000 11110 10000 10000 11111", "F": "11111 10000 10000 11110 10000 10000 10000",
    "G": "01110 10001 10000 10111 10001 10001 01111", "H": "10001 10001 10001 11111 10001 10001 10001",
    "I": "01110 00100 00100 00100 00100 00100 01110", "J": "00111 00010 00010 00010 00010 10010 01100",
    "K": "10001 10010 10100 11000 10100 10010 10001", "L": "10000 10000 10000 10000 10000 10000 11111",
    "M": "10001 11011 10101 10101 10001 10001 10001", "N": "10001 10001 11001 10101 10011 10001 10001",
    "O": "01110 10001 10001 10001 10001 10001 01110", "P": "11110 10001 10001 11110 10000 10000 10000",
    "Q": "01110 10001 10001 10001 10101 10010 01101", "R": "11110 10001 10001 11110 10100 10010 10001",
    "S": "01111 10000 10000 01110 00001 00001 11110", "T": "11111 00100 00100 00100 00100 00100 00100",
    "U": "10001 10001 10001 10001 10001 10001 01110", "V": "10001 10001 10001 10001 10001 01010 00100",
    "W": "10001 10001 10001 10101 10101 10101 01010", "X": "10001 10001 01010 00100 01010 10001 10001",
    "Y": "10001 10001 01010 00100 00100 00100 00100", "Z": "11111 00001 00010 00100 01000 10000 11111",
    "0": "01110 10001 10011 10101 11001 10001 01110", "1": "00100 01100 00100 00100 00100 00100 01110",
    "2": "01110 10001 00001 00010 00100 01000 11111", "3": "11111 00010 00100 00010 00001 10001 01110",
    "4": "00010 00110 01010 10010 11111 00010 00010", "5": "11111 10000 11110 00001 00001 10001 01110",
    "6": "00110 01000 10000 11110 10001 10001 01110", "7": "11111 00001 00010 00100 01000 01000 01000",
    "8": "01110 10001 10001 01110 10001 10001 01110", "9": "01110 10001 10001 01111 00001 00010 01100",
    " ": "00000 00000 00000 00000 00000 00000 00000", ".": "00000 00000 00000 00000 00000 01100 01100",
    "-": "00000 00000 00000 11111 00000 00000 00000", "·": "00000 00000 00000 00100 00000 00000 00000",
    "~": "00000 00000 01000 10101 00010 00000 00000", "!": "00100 00100 00100 00100 00100 00000 00100",
    "/": "00001 00010 00010 00100 01000 01000 10000", "(": "00010 00100 01000 01000 01000 00100 00010",
    ")": "01000 00100 00010 00010 00010 00100 01000", "&": "01100 10010 10100 01000 10101 10010 01101",
    ",": "00000 00000 00000 00000 01100 00100 01000", ":": "00000 01100 01100 00000 01100 01100 00000",
    ">": "01000 00100 00010 00001 00010 00100 01000", "$": "00100 01111 10100 01110 00101 11110 00100",
    "@": "01110 10001 10111 10101 10111 10000 01111", "[": "01110 01000 01000 01000 01000 01000 01110",
    "]": "01110 00010 00010 00010 00010 00010 01110", "*": "00000 00100 10101 01110 10101 00100 00000", "_": "00000 00000 00000 00000 00000 00000 11111",
}


class Canvas:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.layers = {}  # name -> (pixels, css class, inline style)
        self.order = []

    def layer(self, name, cls="", style=""):
        if name not in self.layers:
            self.layers[name] = ({}, cls, style)
            self.order.append(name)
        return self.layers[name][0]

    def put(self, layer, x, y, c):
        x, y = int(round(x)), int(round(y))
        if 0 <= x < self.w and 0 <= y < self.h:
            self.layer(layer)[(x, y)] = c

    def text(self, layer, s, x, y, c, scale=1, shadow=None):
        for k, ch in enumerate(s.upper()):
            rows = FONT.get(ch, FONT[" "]).split()
            for ry, row in enumerate(rows):
                for rx, bit in enumerate(row):
                    if bit == "1":
                        for sx in range(scale):
                            for sy in range(scale):
                                px, py = x + k * 6 * scale + rx * scale + sx, y + ry * scale + sy
                                if shadow:
                                    self.put(layer + "_sh", px + 1, py + 1, shadow)
                                self.put(layer, px, py, c)

    def svg(self, extra_css=""):
        parts = []
        for name in self.order:
            px, cls, style = self.layers[name]
            rects = []
            for y in range(self.h):
                x = 0
                while x < self.w:
                    c = px.get((x, y))
                    if c is None:
                        x += 1
                        continue
                    x0 = x
                    while x < self.w and px.get((x, y)) == c:
                        x += 1
                    rects.append(f'<rect x="{x0}" y="{y}" width="{x-x0}" height="1" fill="{c}"/>')
            a = f' class="{cls}"' if cls else ""
            s = f' style="{style}"' if style else ""
            parts.append(f"<g{a}{s}>{''.join(rects)}</g>")
        W, H = self.w, self.h
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*SCALE}" height="{H*SCALE}" shape-rendering="crispEdges">'
            f"<style>{CSS}{extra_css}</style>{''.join(parts)}</svg>"
        )


CSS = """
.a{animation:fa 1.8s steps(1) infinite}.b{animation:fb 1.8s steps(1) infinite}
@keyframes fa{0%{opacity:1}50%{opacity:0}}@keyframes fb{0%{opacity:0}50%{opacity:1}}
.tw{animation:tw 3.2s steps(1) infinite}
@keyframes tw{0%{opacity:1}40%{opacity:.25}60%{opacity:1}80%{opacity:.5}}
.cloud{animation:drift 40s steps(16) infinite alternate}
@keyframes drift{from{transform:translateX(0)}to{transform:translateX(-16px)}}
.birds{animation:fly 30s linear infinite}
@keyframes fly{from{transform:translateX(30px)}to{transform:translateX(-120px)}}
.ff{animation:ff 2.4s steps(3) infinite}
@keyframes ff{0%,100%{opacity:0}50%{opacity:1}}
"""

# ═════════════ ANTARCTICA ═════════════
def stars(cv, n, ymax, seed):
    random.seed(seed)
    for i in range(n):
        x, y = random.randrange(cv.w), random.randrange(1, ymax)
        lay = "stars_tw" if i % 3 == 0 else "stars"
        if lay == "stars_tw":
            cv.layers["stars_tw"] = (cv.layer("stars_tw"), "tw", "")
        cv.put(lay, x, y, random.choice(["#fff6d8", "#e6f0ff", "#cfe6ff"]))


EXTRA = """
.snow{animation:fall 10s linear infinite}.snow2{animation:fall 16s linear infinite}
@keyframes fall{from{transform:translateY(-100%)}to{transform:translateY(0)}}
.xa{animation:xa 5s ease-in-out infinite alternate}.xb{animation:xa 5s ease-in-out infinite alternate-reverse}
@keyframes xa{from{opacity:1}to{opacity:.15}}
.cur{animation:fa 1.1s steps(1) infinite}
.eye{animation:eye 4.5s steps(1) infinite}
@keyframes eye{0%{opacity:0}93%{opacity:1}}
.slide{animation:slide 12s linear infinite}
@keyframes slide{from{transform:translateX(-40px)}to{transform:translateX(280px)}}
.led{animation:led 1.6s steps(1) infinite}
@keyframes led{0%{opacity:1}30%{opacity:0}}
"""


def bands(cv, layer, cols, y0, y1):
    n = len(cols)
    for y in range(y0, y1):
        t = (y - y0) / (y1 - y0) * n
        i = min(int(t), n - 1)
        frac = t - i
        for x in range(cv.w):
            c = cols[i]
            if i + 1 < n and ((frac > .75 and (x + y) % 2 == 0) or (frac > .5 and (x + 2 * y) % 4 == 0)):
                c = cols[i + 1]
            cv.put(layer, x, y, c)


def aurora(cv, layer, phase, seed):
    random.seed(seed)
    curtain = ["#c9ffe2", "#7cffb2", "#3fe0a0", "#25b08c", "#1a7a7a"]
    for x in range(cv.w):
        fade = min(1, max(0, (x - 138) / 40))  # keep it clear of the title
        if fade <= 0:
            continue
        yc = 6 + (x - 138) * .12 + 5 * math.sin(x / 17 + phase) + 2 * math.sin(x / 7 + phase * 2)
        L = int((8 + 6 * math.sin(x / 11 + phase * 1.5)) * fade)
        for d in range(L):
            c = curtain[min(int(d / max(L, 1) * len(curtain)), len(curtain) - 1)]
            if d > L * .6 and (x + d) % 2:
                continue
            cv.put(layer, x, yc + d, c)
        if x % 3 == 0 and fade > .5:  # thin pink upper fringe
            cv.put(layer, x, yc - 2, "#c48cff")


def ridge(cv, layer, peaks, base, light, shade, cap=None):
    for x in range(cv.w):
        best, bp = 0, None
        for px, h, w in peaks:
            v = h - abs(x - px) * h / w
            if v > best:
                best, bp = v, px
        if best <= 0:
            continue
        top = int(base - best)
        for y in range(top, base):
            c = light if x <= bp else shade
            if cap and y - top < 2 and x <= bp:
                c = cap
            cv.put(layer, x, y, c)


def igloo(cv, cx, base, rx, ry):
    for y in range(base - ry, base + 1):
        for x in range(cx - rx, cx + rx + 1):
            dx, dy = (x - cx) / rx, (y - base) / ry
            if dx * dx + dy * dy > 1:
                continue
            row = base - y
            c = "#f4faff" if dx < .35 else "#c9dcf0"
            if dx < -.75:
                c = "#dfeefc"
            if row % 4 == 0 or (x - cx + (row // 4) * 3) % 6 == 0:
                c = "#a9c4e2" if dx < .35 else "#8fb0d4"
            cv.put("igloo", x, y, c)
    # outline so it reads against the snow
    for y in range(base - ry - 1, base + 1):
        for x in range(cx - rx - 1, cx + rx + 2):
            dx, dy = (x - cx) / rx, (y - base) / ry
            r = dx * dx + dy * dy
            if 1 < r <= 1.22 and (x, y) not in cv.layer("igloo"):
                cv.put("igloo", x, y, "#7d9cc4")
    # entrance tunnel: snow arch, dark doorway, warm light inside
    ex, er = cx + int(rx * .45), 8
    for y in range(base - er - 1, base + 1):
        for x in range(ex - er - 1, ex + er + 2):
            dx, dy = (x - ex) / er, (y - base) / er
            r = dx * dx + dy * dy
            if r <= 1:
                c = "#eef6ff" if dx < .4 else "#c9dcf0"
                if (base - y) % 4 == 0:
                    c = "#a9c4e2"
                door = (dx / .55) ** 2 + (dy / .8) ** 2 <= 1
                if door:
                    c = "#2a1a14" if dy < -.45 else ("#ff9f4a" if dy < -.2 else "#ffc77a")
                cv.put("igloo", x, y, c)
            elif r <= 1.3:
                cv.put("igloo", x, y, "#7d9cc4")
    for k in range(10):  # warm light spilling on the snow
        cv.put("glow", ex + random.randint(-4, 4), base + random.randint(1, 3), "#ffe2bd")
    # radar mast + dish + blinking light
    top = base - ry
    for y in range(top - 9, top):
        cv.put("igloo", cx - 2, y, "#5b6b80")
    for dx, dy in ((-6, -11), (-5, -10), (-4, -10), (-3, -9), (-2, -9), (-1, -9), (0, -10), (1, -10), (2, -11)):
        cv.put("igloo", cx - 2 + dx + 2, top + dy, "#9aa8bb")
    cv.put("igloo", cx - 2, top - 12, "#5b6b80")
    cv.put("led", cx - 2, top - 13, "#ff4d4d")


def penguin(cv, idx, x, feet, h, salute=False):
    lay, eyes = f"p{idx}", f"pe{idx}"
    cv.layer(lay); cv.layer(eyes, "eye", f"animation-delay:{idx * 1.1:.1f}s")
    rx, ry = max(3, round(h * .32)), h / 2
    cy = feet - ry
    for k in range(-rx - 1, rx + 2):  # shadow
        cv.put("shadow", x + k, feet + 1, "#bcd2ea")
    for y in range(int(feet - h), feet):
        for xx in range(x - rx, x + rx + 1):
            dx, dy = (xx - x) / (rx + .5), (y - cy) / ry
            if dx * dx + dy * dy > 1:
                continue
            c = "#141824" if dx > -.6 else "#2a3550"
            bdx, bdy = (xx - x) / (rx * .62), (y - cy - 1) / (ry * .72)
            if bdx * bdx + bdy * bdy <= 1 and y > feet - h + 4:
                c = "#f4f7fb" if y < feet - 2 else "#d6dde8"
            cv.put(lay, xx, y, c)
    ey = int(feet - h + 3)
    for ex in (x - 1, x + 1):
        cv.put(lay, ex, ey, "#ffffff")
        cv.put(eyes, ex, ey, "#141824")
    cv.put(lay, x - 1 if idx % 2 else x + 1, ey, "#ffffff")
    cv.put(lay, x, ey + 1, "#ff9f1c"); cv.put(lay, x, ey + 2, "#e07b00")
    if salute:  # flipper up to the brow
        for k in range(4):
            cv.put(lay, x + rx + 1 - k // 2, ey + 4 - k, "#141824")
        cv.put(lay, x + 2, ey - 1, "#141824")
    else:
        for k in range(3):
            cv.put(lay, x + rx + 1, int(cy) + k, "#141824")
    for k in range(3):
        cv.put(lay, x - rx - 1, int(cy) + k, "#141824")
    for fx in (x - 2, x - 1, x + 1, x + 2):
        cv.put(lay, fx, feet, "#ff9f1c")


# ───────────── GIF rendering ─────────────
# every animated layer gets (alpha, dx, dy) per frame; layers are alpha-composited,
# upscaled with nearest-neighbour and stitched into a looping GIF by ImageMagick.
import re, shutil, subprocess, tempfile
import numpy as np


def hexrgb(c):
    return [int(c[i:i + 2], 16) for i in (1, 3, 5)]


def anim(cls, style, t, loop):
    m = re.search(r"animation-delay:([\d.]+)s", style or "")
    delay = float(m.group(1)) if m else 0.0
    def ph(period):
        return ((t + delay) / period) % 1.0
    if cls == "a":   return (1.0 if ph(1.2) < .5 else 0.0), 0, 0
    if cls == "b":   return (0.0 if ph(1.2) < .5 else 1.0), 0, 0
    if cls == "cur": return (1.0 if ph(1.2) < .5 else 0.0), 0, 0
    if cls == "tw":
        p = ph(2.4)
        return (.25 if .4 <= p < .6 else .5 if p >= .8 else 1.0), 0, 0
    if cls in ("xa", "xb"):
        u = ph(loop) * 2
        u = 2 - u if u > 1 else u
        u = u * u * (3 - 2 * u)  # smoothstep
        return ((1 - .85 * u) if cls == "xa" else (.15 + .85 * u)), 0, 0
    if cls == "eye": return (1.0 if ph(4.8) >= .93 else 0.0), 0, 0
    if cls == "led": return (1.0 if ph(1.6) < .3 else 0.0), 0, 0
    if cls == "slide": return 1.0, int(-40 + 320 * (t / loop)), 0
    return 1.0, 0, 0


def to_rgba(px, W, H):
    img = np.zeros((H, W, 4), np.float32)
    for (x, y), c in px.items():
        img[y, x, :3] = hexrgb(c)
        img[y, x, 3] = 1.0
    return img


def shift(img, dx, dy):
    out = np.zeros_like(img)
    H, W = img.shape[:2]
    xs, xd = (0, dx) if dx >= 0 else (-dx, 0)
    ys, yd = (0, dy) if dy >= 0 else (-dy, 0)
    w, h = W - abs(dx), H - abs(dy)
    if w > 0 and h > 0:
        out[yd:yd + h, xd:xd + w] = img[ys:ys + h, xs:xs + w]
    return out


def render_gif(cv, path, frames, delay_ms, snow=(), scale=4):
    W, H = cv.w, cv.h
    layers = [(to_rgba(cv.layers[n][0], W, H), cv.layers[n][1], cv.layers[n][2]) for n in cv.order]
    loop = frames * delay_ms / 1000
    tmp = tempfile.mkdtemp()
    for f in range(frames):
        t = f * delay_ms / 1000
        out = np.zeros((H, W, 3), np.float32)
        for img, cls, style in layers:
            a, dx, dy = anim(cls, style, t, loop)
            if a <= 0:
                continue
            src = shift(img, dx, dy) if (dx or dy) else img
            m = src[..., 3:4] * a
            out = out * (1 - m) + src[..., :3] * m
        for flakes, col, alpha, travel in snow:  # falling snow, wraps vertically
            for x, y0 in flakes:
                y = int(y0 + travel * f / frames) % H
                out[y, x] = out[y, x] * (1 - alpha) + np.array(hexrgb(col)) * alpha
        big = np.repeat(np.repeat(out.clip(0, 255).astype(np.uint8), scale, 0), scale, 1)
        from PIL import Image
        Image.fromarray(big).save(f"{tmp}/{f:04d}.png")
    subprocess.run(["magick", "-delay", str(delay_ms // 10), "-loop", "0", f"{tmp}/*.png",
                    "-colors", "96", "-layers", "Optimize", path], check=True)
    shutil.rmtree(tmp)


def flakes(W, H, n, seed):
    random.seed(seed)
    return [(random.randrange(W), random.randrange(H)) for _ in range(n)]


NIGHT = ["#04060f", "#070c1f", "#0b1430", "#102042", "#172d58", "#203c6c"]

# ── header ──
W, H, GROUND = 240, 90, 66
cv = Canvas(W, H)
for name in ("sky", "stars", "stars_tw", "auroraA", "auroraB", "far", "near", "sea", "seaglint", "snow_ground",
             "sparkle", "glow", "tracks", "shadow", "igloo", "led"):
    cv.layer(name)
cv.layers["auroraA"] = ({}, "xa", ""); cv.layers["auroraB"] = ({}, "xb", "")
cv.layers["seaglint"] = ({}, "xa", ""); cv.layers["sparkle"] = ({}, "tw", ""); cv.layers["led"] = ({}, "led", "")
bands(cv, "sky", NIGHT, 0, 60)
stars(cv, 60, 50, 1)
aurora(cv, "auroraA", 0, 2)
aurora(cv, "auroraB", 1.3, 3)
ridge(cv, "far", [(30, 14, 26), (95, 10, 20), (150, 18, 30), (205, 12, 22), (245, 16, 26)], 60, "#3e5a86", "#2c4470")
ridge(cv, "near", [(10, 8, 14), (120, 11, 16), (176, 9, 12), (228, 7, 12)], 61, "#e8f2ff", "#9dbbe0", cap="#ffffff")
for y in range(60, 64):
    for x in range(W):
        cv.put("sea", x, y, "#08162c" if y < 62 else "#0b2240")
        if (x * 7 + y * 13) % 41 == 0 and x > 150:
            cv.put("seaglint", x, y, "#2a9c86")
random.seed(4)
for x in range(W):
    top = GROUND - 2 + int(1.2 * math.sin(x / 9) + random.random() * .9)
    for y in range(top, H):
        d = y - top
        c = "#ffffff" if d == 0 else ("#eaf4ff" if d < 8 else ("#dcebfb" if d < 16 else "#cfe2f7"))
        if random.random() < .03:
            c = "#b9d1ec"
        cv.put("snow_ground", x, y, c)
    if random.random() < .05:
        cv.put("sparkle", x, random.randint(top + 2, H - 2), "#ffffff")
for k in range(16):  # waddle tracks from the igloo to the squad
    tx = 84 + k * 3
    cv.put("tracks", tx, 82 + (k % 2), "#b9d1ec")
igloo(cv, 56, 80, 20, 16)
squad = [(124, 19, False), (138, 16, True), (151, 15, False), (163, 12, False)]
for i, (px, ph, sal) in enumerate(squad):
    penguin(cv, i, px, 82, ph, sal)
cv.text("title", "KVIKMYND639", 8, 6, "#eaf6ff", scale=2, shadow="#0b1430")
cv.text("sub", "> MISSION: ANTARCTICA", 8, 25, "#7cffb2", shadow="#04060f")
cv.layer("cursor", "cur")
for y in range(25, 32):
    for x in range(8 + 22 * 6, 8 + 22 * 6 + 5):
        cv.put("cursor", x, y, "#7cffb2")
render_gif(cv, f"{OUT}/header.gif", 48, 100,
           snow=[(flakes(W, H, 60, 5), "#b9cbe6", .7, H), (flakes(W, H, 35, 6), "#ffffff", .95, 2 * H)])

# ── footer ──
W, H = 240, 30
fv = Canvas(W, H)
for name in ("sky", "stars", "stars_tw", "snow_ground", "spray"):
    fv.layer(name)
bands(fv, "sky", NIGHT[:4], 0, 16)
stars(fv, 20, 14, 11)
for lay in ("stars", "stars_tw"):  # keep the text area clean
    for k in [k for k in fv.layer(lay) if 50 <= k[0] <= 200 and 2 <= k[1] <= 12]:
        del fv.layer(lay)[k]
random.seed(12)
for x in range(W):
    top = 16 + int(math.sin(x / 13))
    for y in range(top, H):
        fv.put("snow_ground", x, y, "#ffffff" if y == top else ("#eaf4ff" if y < 24 else "#dcebfb"))
fv.text("txt", "> END OF TRANSMISSION", 57, 4, "#7cffb2", shadow="#04060f")
fv.layer("cursor", "cur")
for y in range(4, 11):
    for x in range(57 + 22 * 6, 57 + 22 * 6 + 5):
        fv.put("cursor", x, y, "#7cffb2")
# belly-sliding penguin
fv.layer("slider", "slide")
px, py = 10, 22
for x in range(-7, 8):
    for y in range(-3, 3):
        if (x / 7.5) ** 2 + ((y + .5) / 3) ** 2 <= 1:
            fv.put("slider", px + x, py + y, "#141824" if y < 1 else "#f4f7fb")
for x in range(-5, 6):
    fv.put("slider", px + x, py + 3, "#2a3550")
fv.put("slider", px + 8, py - 1, "#ff9f1c"); fv.put("slider", px + 9, py - 1, "#e07b00")
fv.put("slider", px + 5, py - 2, "#ffffff")
fv.put("slider", px - 8, py, "#ff9f1c"); fv.put("slider", px - 9, py + 1, "#ff9f1c")
for k in range(3):
    fv.put("slider", px - 1 - k, py - 3 - (k > 0), "#141824")  # flipper swept back
for k in range(7):
    fv.put("slider", px - 11 - k * 2, py + 1 - (k % 3 == 1), "#cfe2f7")
render_gif(fv, f"{OUT}/footer.gif", 128, 80)

# ── terminal panel (stack + projects) ──
GREEN, CYAN, WHITE, GOLD, DIM = "#7cffb2", "#8fd3ff", "#eaf6ff", "#ffd166", "#5a7aa8"
VAL = 35  # chars in the value column


def wrap_words(items, n, sep="  "):
    lines, cur = [], ""
    for it in items:
        if cur and len(cur) + len(sep) + len(it) > n:
            lines.append(cur); cur = it
        else:
            cur = f"{cur}{sep}{it}" if cur else it
    return lines + [cur]


STACK = [  # the stack only grows: add, don't remove
    ("languages", ["haskell", "fortran", "python", "rust", "go", "sql", "pl/sql", "c (learning)"]),
    ("llm / ai", ["azure-ai", "litellm", "ollama", "llama.cpp", "langchain", "llama-index", "rag", "fine-tuning"]),
    ("web / data", ["flask", "react", "oracle-apex"]),
    ("hpc", ["lapack", "mpi"]),
]
MISSIONS = [
    ("seismowave-hs", "haskell · ai-validation · iris/geonet",
     "3d wave propagation in heterogeneous media, ai-validated against real seismic data."),
    ("power-grid-stability-sim", "fortran · lapack · mpi",
     "load flow analysis and fault simulation under variable loads."),
]
L = []  # each line: list of (text, colour)
L.append([("$ ", GREEN), ("cat mission.txt", WHITE)])
L.append([("  callsign    ", CYAN), ("kvikmynd639", WHITE)])
L.append([("  objective   ", CYAN), ("sci computing · local llms · dbs", WHITE)])
L.append([("  side quest  ", CYAN), ("learning c the hard way, no ai", WHITE)])
L.append([])
L.append([("$ ", GREEN), ("ls ./stack", WHITE)])
for label, items in STACK:
    for i, ln in enumerate(wrap_words(items, VAL)):
        L.append([((f"  {label:<12}" if i == 0 else " " * 14), CYAN), (ln, WHITE)])
L.append([])
L.append([("$ ", GREEN), ("cat ./missions/*.log", WHITE)])
for name, tags, desc in MISSIONS:
    L.append([("  [" + name + "]", GOLD)])
    L.append([("    " + tags, GREEN)])
    for ln in wrap_words(desc.split(), 46, " "):
        L.append([("    " + ln, WHITE)])
    L.append([])
L.append([("$ ", GREEN)])

W = 330
TOPBAR, PAD, LH = 13, 9, 9
FX0, FY0 = 6, 10                      # frame top-left
H = FY0 + TOPBAR + PAD + len(L) * LH + PAD + 14
tv = Canvas(W, H)
for name in ("sky", "stars", "stars_tw", "frame", "screen", "snowcap", "icicles", "text_sh", "text"):
    tv.layer(name)
bands(tv, "sky", NIGHT, 0, H)
stars(tv, 50, H, 31)
FX1, FY1 = W - 7, H - 12
for y in range(FY0, FY1):
    for x in range(FX0, FX1):
        edge = min(x - FX0, FX1 - 1 - x, y - FY0, FY1 - 1 - y)
        if edge < 4:  # icy bevel
            c = "#e8f2ff" if (x - FX0 < 2 or y - FY0 < 2) else "#5a7aa8" if (FX1 - 1 - x < 2 or FY1 - 1 - y < 2) else "#9dbbe0"
            if edge == 0:
                c = "#2c4470"
            tv.put("frame", x, y, c)
        elif y < FY0 + 4 + TOPBAR:
            tv.put("screen", x, y, "#16284f" if y < FY0 + 4 + TOPBAR - 1 else "#2c4470")
        else:
            tv.put("screen", x, y, "#050a18" if (y // 2) % 2 else "#060c1c")
random.seed(33)
for x in range(FX0 - 1, FX1 + 1):  # snow piled on top of the frame
    for d in range(int(2 + 1.6 * math.sin(x / 7) + random.random() * 1.4)):
        tv.put("snowcap", x, FY0 - d, "#ffffff" if d else "#eaf4ff")
for x in range(FX0 + 6, FX1 - 6, 5):  # icicles under the frame
    for d in range(random.randint(1, 5)):
        tv.put("icicles", x, FY1 + d, "#cfe6ff" if d < 3 else "#9dbbe0")
# title bar
for i, c in enumerate(("#ff6b6b", "#ffd166", "#7cffb2")):
    for dx in range(3):
        for dy in range(3):
            tv.put("text", FX0 + 8 + i * 6 + dx, FY0 + 9 + dy, c)
bar = "kvikmynd639@igloo: ~"
tv.text("text", bar, (W - len(bar) * 6) // 2, FY0 + 7, "#9dbbe0")
# content
y = FY0 + 4 + TOPBAR + PAD
for line in L:
    x = FX0 + 4 + PAD
    for txt, col in line:
        tv.text("text", txt, x, y, col, shadow="#0b1430" if col != DIM else None)
        x += len(txt) * 6
    last_x = x
    y += LH
tv.layer("cursor", "cur")
for yy in range(y - LH, y - LH + 7):
    for xx in range(last_x, last_x + 5):
        tv.put("cursor", xx, yy, GREEN)
# a penguin peeking over the top-right corner
penguin(tv, 9, W - 40, FY0 + 2, 12)
for k in [k for k in tv.layer("p9") if k[1] >= FY0 - 1]:
    del tv.layer("p9")[k]
for k in [k for k in tv.layer("pe9") if k[1] >= FY0 - 1]:
    del tv.layer("pe9")[k]
render_gif(tv, f"{OUT}/terminal.gif", 16, 300, scale=3)
print("ok")
