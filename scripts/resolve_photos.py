import urllib.request
import re

urls = [
    'https://unsplash.com/photos/man-in-white-t-shirt-and-blue-denim-jeans-standing-on-black-metal-bar-23a723fd5bd3',
    'https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-and-blue-denim-jeans-standing-on-sidewalk-during-daytime-516f99a79f66',
    'https://unsplash.com/photos/a-man-with-a-white-shirt-and-blue-jeans-734d9101075d',
    'https://unsplash.com/photos/man-in-black-t-shirt-and-blue-denim-jeans-standing-on-bridge-during-daytime-sour_moha',
    'https://unsplash.com/photos/man-in-gray-sweater-standing-near-wall-elimendeinagella',
    'https://unsplash.com/photos/a-man-standing-on-a-sidewalk-wearing-a-sweater-and-sweatpants-goodfacesagency'
]

headers = {'User-Agent': 'Mozilla/5.0'}
for u in urls:
    name = u.split('/')[-1]
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m = re.search(r'https://images\.unsplash\.com/photo-([a-zA-Z0-9_-]+)\?', html)
            if m:
                print(name + ' -> https://images.unsplash.com/photo-' + m.group(1))
            else:
                print('No match for ' + name)
    except Exception as e:
        print('Error for ' + name + ':', e)

