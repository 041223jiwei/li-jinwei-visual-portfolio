"""Losslessly keep paths while reducing oversized WebP assets for the portfolio."""

from __future__ import annotations

import argparse
import os
import tempfile
from pathlib import Path

from PIL import Image


def optimize_image(path: Path, quality: int, max_edge: int, min_bytes: int) -> tuple[int, int]:
    original_size = path.stat().st_size
    if original_size < min_bytes:
        return original_size, original_size

    with Image.open(path) as image:
        image.load()
        width, height = image.size
        scale = min(1.0, max_edge / max(width, height))
        if scale < 1.0:
            size = (max(1, round(width * scale)), max(1, round(height * scale)))
            image = image.resize(size, Image.Resampling.LANCZOS)

        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        file_descriptor, temporary_name = tempfile.mkstemp(
            prefix=f"{path.stem}-optimized-",
            suffix=".webp",
            dir=path.parent,
        )
        os.close(file_descriptor)
        temporary_path = Path(temporary_name)
        try:
            image.save(
                temporary_path,
                format="WEBP",
                quality=quality,
                method=6,
                exact=image.mode == "RGBA",
            )
            optimized_size = temporary_path.stat().st_size
            if optimized_size <= original_size * 0.94:
                temporary_path.replace(path)
                return original_size, optimized_size
            return original_size, original_size
        finally:
            temporary_path.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("public"))
    parser.add_argument("--quality", type=int, default=76)
    parser.add_argument("--max-edge", type=int, default=1920)
    parser.add_argument("--min-kb", type=int, default=96)
    args = parser.parse_args()

    paths = sorted(args.root.rglob("*.webp"))
    before = 0
    after = 0
    changed = 0

    for path in paths:
        original_size, optimized_size = optimize_image(
            path,
            quality=args.quality,
            max_edge=args.max_edge,
            min_bytes=args.min_kb * 1024,
        )
        before += original_size
        after += optimized_size
        changed += optimized_size < original_size

    saved = before - after
    print(
        f"Optimized {changed}/{len(paths)} WebP files: "
        f"{before / 1024 / 1024:.2f} MB -> {after / 1024 / 1024:.2f} MB "
        f"(saved {saved / 1024 / 1024:.2f} MB)."
    )


if __name__ == "__main__":
    main()
