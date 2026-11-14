const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

function getEdgePath() {
  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of edgePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function verifyPhase3() {
  const edgePath = getEdgePath();
  if (!edgePath) {
    console.error('Edge executable not found');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const routes = [
    { name: 'phase3_01_homepage', url: 'http://localhost:3000/' },
    { name: 'phase3_02_shop_catalog', url: 'http://localhost:3000/shop' },
    { name: 'phase3_03_collection_hoodies', url: 'http://localhost:3000/collections/hoodies' },
    { name: 'phase3_04_collection_sneakers', url: 'http://localhost:3000/collections/sneakers' },
    { name: 'phase3_05_wishlist', url: 'http://localhost:3000/wishlist' },
    { name: 'phase3_06_search', url: 'http://localhost:3000/search?q=hoodie' },
    { name: 'phase3_07_cart', url: 'http://localhost:3000/cart' },
    { name: 'phase3_08_pdp_hoodie', url: 'http://localhost:3000/products/afaq-signature-statement-hoodie-grey' },
  ];

  const outDir = path.join(__dirname, '..', 'reference_frames');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const route of routes) {
    console.log(`Verifying ${route.url}...`);
    try {
      await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));
      const shotPath = path.join(outDir, `${route.name}.png`);
      await page.screenshot({ path: shotPath });
      console.log(`Saved screenshot to ${shotPath}`);
    } catch (e) {
      console.error(`Error on ${route.url}:`, e.message);
    }
  }

  await browser.close();
  console.log('Phase 3 visual verification complete.');
}

verifyPhase3().catch(console.error);
