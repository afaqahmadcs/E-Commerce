import re
import urllib.request
from PIL import Image
import io

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

urls = list(set(re.findall(r'https://images\.unsplash\.com/photo-[^\"\'\s]+', text)))
print(f'Total unique photo URLs: {len(urls)}')

for i, u in enumerate(urls[:15]):
    # fetch small version to check aspect ratio
    test_u = u.split('?')[0] + '?auto=format&fit=crop&w=400&q=80'
    try:
        req = urllib.request.Request(test_u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            im = Image.open(io.BytesIO(resp.read()))
            print(f'{i}: {u.split("?")[0]} - size {im.size}')
    except Exception as e:
        print(f'{i}: error {e}')

