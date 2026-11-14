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

(async () => {
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

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  const outDir = path.join(__dirname, '..', 'reference_frames');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Try The Look
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('h1, h2, h3'));
    const target = headers.find(h => h.innerText && h.innerText.includes('Try the Look'));
    if (target) {
      target.closest('section').scrollIntoView({ behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'live_01_try_the_look.png') });

  // 2. Clothing Rail
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('span, h2, h3'));
    const target = headers.find(h => h.innerText && h.innerText.includes('NEW COLLECTION'));
    if (target) {
      target.closest('section').scrollIntoView({ behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'live_02_clothing_rail.png') });

  // 3. Sneaker Perspective
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('span, h2, h3'));
    const target = headers.find(h => h.innerText && h.innerText.includes('FOOTWEAR DIVISION'));
    if (target) {
      target.closest('section').scrollIntoView({ behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'live_03_sneaker_perspective.png') });

  // 4. Featured Sneaker
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('span, h2, h3'));
    const target = headers.find(h => h.innerText && h.innerText.includes('FLAGSHIP SNEAKER'));
    if (target) {
      target.closest('section').scrollIntoView({ behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'live_04_featured_sneaker.png') });

  await browser.close();
  console.log('Live inspection screenshots saved successfully');
})();
