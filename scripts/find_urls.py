import glob
import re

urls = set()
for f in glob.glob('src/**/*.ts*', recursive=True):
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
        for m in re.findall(r'https://images\.unsplash\.com/[^\s\"\']+', content):
            urls.add(m)

print(f'Found {len(urls)} Unsplash URLs in codebase:')
for u in sorted(urls):
    print(u)

