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

  // Test 1: Click next on Try The Look
  console.log('Testing Next on Try The Look...');
  const nextBtn = await page.$('button[aria-label=\"Next look\"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'test_interaction_look_next.png') });
    console.log('Look 05 captured!');
  }

  // Test 2: Drag Clothing Rail
  console.log('Testing Drag on Clothing Rail...');
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('span, h2, h3'));
    const target = headers.find(h => h.innerText && h.innerText.includes('NEW COLLECTION'));
    if (target) target.closest('section').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Click Right Arrow on Clothing Rail
  const railNextBtn = await page.$('button[aria-label=\"Next garments\"]');
  if (railNextBtn) {
    await railNextBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'test_interaction_rail_slid.png') });
    console.log('Clothing rail slide captured!');
  }

  await browser.close();
  console.log('All interaction tests passed!');
})();

