const fs = require('fs');
const path = require('path');

function checkCasing(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkCasing(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /(?:from|import)\s+['"]([.@]\/[^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        let importPath = match[1];
        let resolved = '';
        if (importPath.startsWith('@/')) {
          resolved = path.join(process.cwd(), 'src', importPath.slice(2));
        } else {
          resolved = path.join(dir, importPath);
        }

        const candidates = [
          resolved,
          resolved + '.ts',
          resolved + '.tsx',
          resolved + '.js',
          resolved + '.jsx',
          path.join(resolved, 'index.ts'),
          path.join(resolved, 'index.tsx')
        ];

        let found = candidates.find(c => fs.existsSync(c));
        if (!found) {
          console.log('MISSING IMPORT in ' + fullPath + ': ' + importPath);
        } else {
          const relativeToRoot = path.relative(process.cwd(), found);
          const parts = relativeToRoot.split(path.sep);
          let cur = process.cwd();
          for (const part of parts) {
            const actualEntries = fs.readdirSync(cur);
            if (!actualEntries.includes(part)) {
              console.log('CASE MISMATCH in ' + fullPath + ': expected segment "' + part + '" but found in ' + cur + ': ' + actualEntries.find(e => e.toLowerCase() === part.toLowerCase()));
            }
            cur = path.join(cur, part);
          }
        }
      }
    }
  }
}

checkCasing(path.join(process.cwd(), 'src'));
console.log('Casing check completed.');
