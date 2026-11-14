import os
import urllib.request
import rembg
from PIL import Image

os.makedirs('public/garments', exist_ok=True)
session = rembg.new_session('u2netp')

# 1. Local generated packshots
local_packshots = [
    (r'C:\Users\hp\.gemini\antigravity\brain\ea8ed1c3-57b7-48e0-a836-eb40eb7139f3\afaq_luxury_streetwear_hoodie_packshot_1794649168421.jpg', 'public/garments/hoodie-charcoal-black.png'),
    (r'C:\Users\hp\.gemini\antigravity\brain\ea8ed1c3-57b7-48e0-a836-eb40eb7139f3\luxury_forest_green_hoodie_packshot_1794649201017.jpg', 'public/garments/hoodie-forest-green.png'),
    (r'C:\Users\hp\.gemini\antigravity\brain\ea8ed1c3-57b7-48e0-a836-eb40eb7139f3\luxury_bone_hoodie_packshot_1794649239325.jpg', 'public/garments/hoodie-bone-cream.png'),
    (r'C:\Users\hp\.gemini\antigravity\brain\ea8ed1c3-57b7-48e0-a836-eb40eb7139f3\luxury_charcoal_chore_jacket_packshot_1794649274296.jpg', 'public/garments/jacket-chore-charcoal.png'),
    (r'C:\Users\hp\.gemini\antigravity\brain\ea8ed1c3-57b7-48e0-a836-eb40eb7139f3\luxury_bomber_jacket_packshot_1794649303896.jpg', 'public/garments/jacket-bomber-black.png'),
]

for src, dst in local_packshots:
    if os.path.exists(src):
        try:
            with open(src, 'rb') as f:
                data = f.read()
            out = rembg.remove(data, session=session)
            with open(dst, 'wb') as f:
                f.write(out)
            im = Image.open(dst)
            bbox = im.getbbox()
            if bbox:
                im_crop = im.crop(bbox)
                target_h = 700
                target_w = int(im_crop.width * (target_h / im_crop.height))
                im_res = im_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)
                im_res.save(dst, 'PNG')
                print(f'{dst} created! Size: {im_res.size}')
        except Exception as e:
            print(f'Error processing {src}:', e)

# 2. High-res product studio shots for remaining garments
remote_garments = [
    ('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85', 'public/garments/overshirt-navy-twill.png'),
    ('https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=85', 'public/garments/crewneck-burgundy.png'),
    ('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85', 'public/garments/sweater-olive-merino.png'),
    ('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85', 'public/garments/tee-boxy-white.png'),
    ('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85', 'public/garments/tee-emblem-black.png'),
    ('https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85', 'public/garments/sweater-thermal-sand.png'),
]

headers = {'User-Agent': 'Mozilla/5.0'}
for url, dst in remote_garments:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
        out = rembg.remove(data, session=session)
        with open(dst, 'wb') as f:
            f.write(out)
        im = Image.open(dst)
        bbox = im.getbbox()
        if bbox:
            im_crop = im.crop(bbox)
            target_h = 700
            target_w = int(im_crop.width * (target_h / im_crop.height))
            im_res = im_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)
            im_res.save(dst, 'PNG')
            print(f'{dst} created! Size: {im_res.size}')
    except Exception as e:
        print(f'Error downloading/processing {url}:', e)

print('All garment cutouts processed!')
