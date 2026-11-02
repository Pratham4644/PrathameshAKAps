"""
Prepare the six journey photos for the portfolio scene engine.

What this does, in plain language:
The raw photos are too small to fill a screen, so this script enlarges each one
to 1920px wide, saves a compact WebP, and (if the AI model downloads) builds a
matching grayscale depth map. Near objects are bright, far ones are dark — that
lets the later 3D shader shift the photo a little as the mouse moves.
"""

from __future__ import annotations

import io
import os
import sys
import threading
import traceback
from pathlib import Path

from PIL import Image, ImageFilter

# Hugging Face's Xet downloader hung on the last run; use plain HTTPS.
os.environ.setdefault("HF_HUB_DISABLE_XET", "1")

# --- paths -----------------------------------------------------------------
ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "potfolio_photo"
OUTPUT_DIR = ROOT / "public" / "scenes"

TARGET_WIDTH = 3840
WEBP_QUALITY = 90
DEPTH_BLUR_RADIUS = 2.4
DEPTH_INFER_WIDTH = 768
DEPTH_LOAD_TIMEOUT_SEC = 240
DEPTH_MODEL_ID = "depth-anything/Depth-Anything-V2-Small-hf"
LOCAL_MODEL_CANDIDATES = [
    Path(os.environ["DEPTH_MODEL_PATH"]) if os.environ.get("DEPTH_MODEL_PATH") else None,
    Path(r"D:\hf-cache\Depth-Anything-V2-Small-hf"),
    ROOT / "scripts" / ".cache" / "Depth-Anything-V2-Small-hf",
]

PAGES = [1, 2, 3, 4, 5, 6]


def find_local_model() -> Path | None:
    """Use a folder that already has model.safetensors + config.json."""
    for candidate in LOCAL_MODEL_CANDIDATES:
        if candidate and (candidate / "model.safetensors").exists() and (candidate / "config.json").exists():
            return candidate
    return None


def log(message: str) -> None:
    print(message, flush=True)


def find_source(page: int) -> Path:
    """Pick the largest Page_N.jpg / .png / .webp from the photo folder."""
    candidates = [
        SOURCE_DIR / f"Page_{page}{ext}"
        for ext in (".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG")
        if (SOURCE_DIR / f"Page_{page}{ext}").exists()
    ]
    if not candidates:
        raise FileNotFoundError(f"No Page_{page} photo found in {SOURCE_DIR}")
    return max(candidates, key=lambda path: path.stat().st_size)


def kb(path: Path) -> float:
    return path.stat().st_size / 1024


# --- upscale: Real-ESRGAN if it imports, else Lanczos + mild unsharp -------
_esrganer = None
_esrgan_status = "not tried"


def try_load_realesrgan():
    """Load Real-ESRGAN once. If the package or its weights fail, we skip it."""
    global _esrganer, _esrgan_status
    if _esrgan_status != "not tried":
        return _esrganer

    try:
        from basicsr.archs.rrdbnet_arch import RRDBNet
        from realesrgan import RealESRGANer

        model = RRDBNet(
            num_in_ch=3, num_out_ch=3, num_feat=64,
            num_block=23, num_grow_ch=32, scale=4,
        )
        weight_url = (
            "https://github.com/xinntao/Real-ESRGAN/releases/download/"
            "v0.1.0/RealESRGAN_x4plus.pth"
        )
        weight_path = ROOT / "scripts" / ".cache" / "RealESRGAN_x4plus.pth"
        weight_path.parent.mkdir(parents=True, exist_ok=True)
        if not weight_path.exists():
            log("  downloading Real-ESRGAN weights...")
            _download(weight_url, weight_path)

        _esrganer = RealESRGANer(
            scale=4,
            model_path=str(weight_path),
            model=model,
            tile=400,
            tile_pad=10,
            pre_pad=0,
            half=False,
        )
        _esrgan_status = "ready"
        log("  Real-ESRGAN is ready (CPU, tiled).")
    except Exception as exc:
        _esrganer = None
        _esrgan_status = f"unavailable ({exc.__class__.__name__}: {exc})"
        log(f"  Real-ESRGAN skipped: {_esrgan_status}")
        log("  Falling back to Lanczos + a light unsharp mask.")
    return _esrganer


def _download(url: str, dest: Path) -> None:
    import urllib.request

    tmp = dest.with_suffix(dest.suffix + ".part")
    urllib.request.urlretrieve(url, tmp)
    tmp.replace(dest)


def fit_to_max_width(image: Image.Image) -> Image.Image:
    """Keep native pixels. Only shrink if wider than 3840."""
    rgb = image.convert("RGB")
    if rgb.width <= TARGET_WIDTH:
        return rgb
    ratio = TARGET_WIDTH / rgb.width
    size = (TARGET_WIDTH, max(1, round(rgb.height * ratio)))
    return rgb.resize(size, Image.Resampling.LANCZOS)


def save_webp(image: Image.Image, dest: Path) -> int:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, format="WEBP", quality=WEBP_QUALITY, method=6)
    log(f"  webp q={WEBP_QUALITY}  {kb(dest):6.1f} KB  -> {dest.relative_to(ROOT)}")
    return WEBP_QUALITY


# --- depth maps ------------------------------------------------------------
_depth_pipe = None
_depth_status = "not tried"


def try_load_depth():
    """Load Depth Anything V2 Small. Give up after a few minutes if HF hangs."""
    global _depth_pipe, _depth_status
    if _depth_status != "not tried":
        return _depth_pipe

    local_model = find_local_model()
    model_ref = str(local_model) if local_model else DEPTH_MODEL_ID
    timeout = 90 if local_model else DEPTH_LOAD_TIMEOUT_SEC
    log(f"  loading depth model {model_ref} (timeout {timeout}s)...")
    box = {"pipe": None, "error": None}

    def _load():
        try:
            from transformers import pipeline

            if local_model is None:
                from huggingface_hub import snapshot_download

                snapshot_download(repo_id=DEPTH_MODEL_ID)
            box["pipe"] = pipeline(
                task="depth-estimation",
                model=model_ref,
                local_files_only=local_model is not None,
            )
        except Exception as exc:
            box["error"] = exc
            traceback.print_exc()

    worker = threading.Thread(target=_load, daemon=True)
    worker.start()
    worker.join(timeout)

    if worker.is_alive():
        _depth_pipe = None
        _depth_status = f"unavailable (timed out after {timeout}s)"
        log(f"  Depth maps skipped: {_depth_status}")
        log("  The shader will use a built-in fake depth (bottom = near).")
        return None

    if box["error"] is not None or box["pipe"] is None:
        exc = box["error"] or RuntimeError("pipeline returned nothing")
        _depth_pipe = None
        _depth_status = f"unavailable ({exc.__class__.__name__}: {exc})"
        log(f"  Depth maps skipped: {_depth_status}")
        log("  The shader will use a built-in fake depth (bottom = near).")
        return None

    _depth_pipe = box["pipe"]
    _depth_status = "ready"
    log("  Depth Anything V2 Small is ready.")
    return _depth_pipe


def make_depth_map(image: Image.Image, dest: Path) -> bool:
    """Near = bright, far = dark. Soft blur, exact same size as the photo."""
    pipe = try_load_depth()
    if pipe is None:
        return False

    # Infer on a smaller copy — the model resizes internally anyway, and
    # a 2% parallax shift does not need a 1920px depth map to look right.
    infer = image
    if infer.width > DEPTH_INFER_WIDTH:
        ratio = DEPTH_INFER_WIDTH / infer.width
        infer = infer.resize(
            (DEPTH_INFER_WIDTH, max(1, round(infer.height * ratio))),
            Image.Resampling.BILINEAR,
        )

    result = pipe(infer)
    depth = result["depth"] if isinstance(result, dict) else result
    if not isinstance(depth, Image.Image):
        import numpy as np

        array = np.array(depth)
        array = array.astype("float32")
        array = (array - array.min()) / (array.max() - array.min() + 1e-8)
        depth = Image.fromarray((array * 255).astype("uint8"), mode="L")
    else:
        depth = depth.convert("L")

    if depth.size != image.size:
        depth = depth.resize(image.size, Image.Resampling.BILINEAR)
    depth = depth.filter(ImageFilter.GaussianBlur(radius=DEPTH_BLUR_RADIUS))
    dest.parent.mkdir(parents=True, exist_ok=True)
    depth.save(dest, format="PNG", optimize=True)
    log(f"  depth        {kb(dest):6.1f} KB  -> {dest.relative_to(ROOT)}")
    return True


def process_page(page: int, *, do_depth: bool) -> dict:
    source = find_source(page)
    log(f"\n[{page}/6] {source.name}  {Image.open(source).size}")
    image = Image.open(source)
    fitted = fit_to_max_width(image)
    log(f"  output size  {fitted.size}")

    webp_path = OUTPUT_DIR / f"Page_{page}.webp"
    quality = save_webp(fitted, webp_path)

    depth_path = OUTPUT_DIR / f"Page_{page}-depth.png"
    has_depth = make_depth_map(fitted, depth_path) if do_depth else False

    return {
        "page": page,
        "source": source.name,
        "size": fitted.size,
        "webp": webp_path,
        "webp_kb": kb(webp_path),
        "quality": quality,
        "depth": depth_path if has_depth else None,
        "depth_kb": kb(depth_path) if has_depth else None,
    }


def main() -> int:
    skip_depth = "--skip-depth" in sys.argv
    depth_only = "--depth-only" in sys.argv
    if not SOURCE_DIR.exists():
        log(f"Photo folder not found: {SOURCE_DIR}")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    log(f"Source : {SOURCE_DIR}")
    log(f"Output : {OUTPUT_DIR}")
    log(f"Python : {sys.version.split()[0]}")

    results = []
    if depth_only:
        for page in PAGES:
            webp_path = OUTPUT_DIR / f"Page_{page}.webp"
            if not webp_path.exists():
                log(f"Missing {webp_path}; run without --depth-only first.")
                return 1
            image = Image.open(webp_path)
            results.append({
                "page": page,
                "source": webp_path.name,
                "size": image.size,
                "webp": webp_path,
                "webp_kb": kb(webp_path),
                "quality": "—",
                "depth": None,
                "depth_kb": None,
            })
        log("Reusing existing WebP files (--depth-only).")
    else:
        for page in PAGES:
            results.append(process_page(page, do_depth=False))

    if skip_depth:
        _depth_status_override = "skipped (--skip-depth)"
        log("\nDepth pass skipped by flag.")
    else:
        _depth_status_override = None
        log("\n--- depth pass ---")
        for row in results:
            image = Image.open(row["webp"]).convert("RGB")
            depth_path = OUTPUT_DIR / f"Page_{row['page']}-depth.png"
            log(f"\n[depth {row['page']}/6] {row['webp'].name}")
            if make_depth_map(image, depth_path):
                row["depth"] = depth_path
                row["depth_kb"] = kb(depth_path)

    log("\n========== scene assets ==========")
    log(f"{'file':<24} {'px':>12} {'webp KB':>10} {'q':>4} {'depth KB':>10}")
    for row in results:
        w, h = row["size"]
        depth = f"{row['depth_kb']:.1f}" if row["depth_kb"] is not None else "skipped"
        log(
            f"Page_{row['page']}.webp"
            f"  {w}x{h:>4}  {row['webp_kb']:8.1f}  {row['quality']:>4}  {depth:>10}"
        )
    log(f"\nReal-ESRGAN : {_esrgan_status}")
    log(f"Depth model : {_depth_status_override or _depth_status}")
    log("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
