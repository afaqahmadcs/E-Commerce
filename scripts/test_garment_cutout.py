import urllib.request
import rembg
from PIL import Image
import os

os.makedirs('public/garments', exist_ok=True)
session = rembg.new_session('u2netp')

# Test URL: Forest Green Hoodie
test_url = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=85'

req = urllib.request.Request(test_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = resp.read()

out = rembg.remove(data, session=session)
with open('public/garments/test_hoodie.png', 'wb') as f:
    f.write(out)

im = Image.open('public/garments/test_hoodie.png')
bbox = im.getbbox()
if bbox:
    im_crop = im.crop(bbox)
    im_crop.save('public/garments/test_hoodie.png')
    print('Garment cutout success! Size:', im_crop.size)
else:
    print('Failed to get bbox')

