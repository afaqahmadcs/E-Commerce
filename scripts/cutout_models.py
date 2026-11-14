import os
import rembg
from PIL import Image

session = rembg.new_session("u2netp")
os.makedirs("public/models", exist_ok=True)

for i in range(7, 13):
    src = f"public/images/models/model_{i:02d}.jpg"
    dst = f"public/models/model-{i:02d}.png"
    if os.path.exists(src):
        print(f"Processing {src} -> {dst}...", flush=True)
        img = Image.open(src)
        img.thumbnail((700, 1100), Image.Resampling.LANCZOS)
        out = rembg.remove(img, session=session)
        out.save(dst, "PNG")
        print(f"Successfully created: {dst}", flush=True)

print("All models 7-12 processed successfully!", flush=True)
