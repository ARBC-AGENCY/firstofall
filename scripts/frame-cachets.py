"""
Frames the cachet product shots for the site.

Every cachet image is shown with object-cover, in containers whose shape runs
from narrow home cards to the ultrawide version-page hero. The client's shots
arrive at arbitrary sizes, often with the product touching the frame, so cover
crops the product. This pads each shot onto canvases sized so the product
stays whole in every container shape it is shown in:

  <name>.webp       square — collection panels and home cards.
                    Product intact for container ratios 0.45 to 1.25.
  <name>-wide.webp  2.4:1 — version-page hero. Product intact for 0.6 to 3.5,
                    held in the upper part of the frame, clear of the header
                    above and the title overlaid at the bottom.

The padding is the shot's own background colour. Shots whose edges are not a
flat colour (a photographed scene) are faded into one at the edges first, so
the padding never shows a seam.

  python scripts/frame-cachets.py
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/images"
OUT = SRC / "cachets"

# name -> (client source, product bounding box or None to detect it on white,
#          padding colour or None to take the flat edge colour)
CACHETS = {
    "essential": ("essential.webp", None, None),
    "business": ("business-new.webp", None, None),
    # The former Business shot: a photographed scene, box measured by hand
    "executive": ("Business.webp", (685, 100, 1240, 745), (104, 54, 36)),
    "exclusive": ("Exclusive.webp", None, None),
}

# The share of the canvas the product may occupy, derived from the container
# ratios above with a 5% margin on each side.
SQUARE = {"size": (1600, 1600), "max_w": 0.405, "max_h": 0.72, "top": None}
WIDE = {"size": (3840, 1600), "max_w": 0.54, "max_h": 0.54, "top": 0.16}

MAX_FADE = 400


def edge_colour(a: np.ndarray) -> tuple[int, int, int]:
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    return tuple(int(v) for v in np.median(border, axis=0))


def detect_box(a: np.ndarray, bg) -> tuple[int, int, int, int]:
    ys, xs = np.where(np.abs(a - np.array(bg)).max(axis=2) > 20)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def fade_edges(a: np.ndarray, box, bg) -> np.ndarray:
    """Blend each edge into the padding colour, stopping short of the product."""
    h, w, _ = a.shape
    x0, y0, x1, y1 = box

    def ramp(n, gap_start, gap_end):
        r = np.ones(n)
        for gap, rev in ((gap_start, False), (gap_end, True)):
            width = min(MAX_FADE, gap)
            if width <= 0:
                continue
            t = np.linspace(0, 1, width)
            s = t * t * (3 - 2 * t)
            if rev:
                r[n - width:] = np.minimum(r[n - width:], s[::-1])
            else:
                r[:width] = np.minimum(r[:width], s)
        return r

    mask = np.outer(ramp(h, y0, h - y1), ramp(w, x0, w - x1))[..., None]
    return a * mask + np.array(bg, dtype=float) * (1 - mask)


def frame(img: Image.Image, box, bg, spec) -> Image.Image:
    cw, ch = spec["size"]
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0

    scale = min(spec["max_w"] * ch / bw, spec["max_h"] * ch / bh)
    if scale > 1:
        # Never upscale: shrink the canvas instead, keeping its proportions
        cw, ch = round(cw / scale), round(ch / scale)
        scale = 1.0

    src = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    cx = (x0 + x1) / 2 * scale
    cy = (y0 + y1) / 2 * scale
    target_cy = ch / 2 if spec["top"] is None else spec["top"] * ch + bh * scale / 2

    canvas = Image.new("RGB", (cw, ch), bg)
    canvas.paste(src, (round(cw / 2 - cx), round(target_cy - cy)))
    return canvas


def main():
    OUT.mkdir(exist_ok=True)
    for name, (file, box, bg) in CACHETS.items():
        a = np.asarray(Image.open(SRC / file).convert("RGB")).astype(float)
        bg = bg or edge_colour(a)
        box = box or detect_box(a, bg)
        faded = Image.fromarray(fade_edges(a, box, bg).round().astype(np.uint8))

        for suffix, spec in (("", SQUARE), ("-wide", WIDE)):
            out = OUT / f"{name}{suffix}.webp"
            framed = frame(faded, box, bg, spec)
            framed.save(out, "WEBP", quality=90, method=6)
            print(f"{out.relative_to(ROOT)}  {framed.size}  bg={bg}  box={tuple(int(v) for v in box)}")


if __name__ == "__main__":
    main()
