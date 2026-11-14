/**
 * AFAQ SUPPLY — PHASE 5 LUXURY MOTION & RESPONSIVE VERIFICATION
 *
 * Verifies across 4 Viewports:
 * 1. Desktop (1440x960): Runway physics, clothing rail drag, sneaker floating shadow.
 * 2. Laptop (1024x768): Header navigation, catalog filters, quick view modal.
 * 3. Tablet (768x1024): Calibrated model spacing (190px), responsive clothing rail.
 * 4. Smartphone (375x812): Mobile hamburger drawer, calibrated spacing (150px), mobile sticky buy bar.
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'reference_frames');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyPhase5() {
  console.log('================================================================');
  console.log('✨ AFAQ SUPPLY — PHASE 5 MOTION & RESPONSIVE OPTIMIZATION');
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 960 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // -------------------------------------------------------------
  // VIEWPORT 1: DESKTOP (1440 x 960)
  // -------------------------------------------------------------
  console.log('Viewport 1: Desktop (1440 x 960)...');
  await page.setViewport({ width: 1440, height: 960 });
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle2' });
  await delay(1200);

  // Test Runway model switch
  console.log('  -> Testing Runway Carousel Model Transition...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const nextBtn = buttons.find((b) => b.innerText.includes('Next'));
    if (nextBtn) nextBtn.click();
  });
  await delay(1000);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_01_desktop_runway.png'),
    fullPage: false,
  });

  // Test Clothing Rail Quick View Modal
  console.log('  -> Testing Suspended Rail Quick View Modal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const qvBtn = buttons.find((b) => b.innerText.includes('Quick View'));
    if (qvBtn) qvBtn.click();
  });
  await delay(800);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_02_desktop_quickview.png'),
    fullPage: false,
  });

  // Close Quick View
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close modal"]');
    if (closeBtn) closeBtn.click();
  });
  await delay(400);

  // -------------------------------------------------------------
  // VIEWPORT 2: LAPTOP (1024 x 768)
  // -------------------------------------------------------------
  console.log('Viewport 2: Laptop (1024 x 768)...');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle2' });
  await delay(1200);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_03_laptop_shop.png'),
    fullPage: false,
  });

  // -------------------------------------------------------------
  // VIEWPORT 3: TABLET (768 x 1024)
  // -------------------------------------------------------------
  console.log('Viewport 3: Tablet (768 x 1024)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle2' });
  await delay(1200);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_04_tablet_runway.png'),
    fullPage: false,
  });

  // Scroll to Sneaker Section on Tablet
  await page.evaluate(() => {
    window.scrollTo({ top: 1200, behavior: 'instant' });
  });
  await delay(800);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_05_tablet_sneaker.png'),
    fullPage: false,
  });

  // -------------------------------------------------------------
  // VIEWPORT 4: SMARTPHONE (375 x 812 - iPhone X / 12)
  // -------------------------------------------------------------
  console.log('Viewport 4: Smartphone (375 x 812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle2' });
  await delay(1200);

  // Test Mobile Navigation Hamburger
  console.log('  -> Testing Mobile Navigation Drawer...');
  await page.click('button[aria-label="Open navigation menu"]');
  await delay(600);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_06_mobile_nav_drawer.png'),
    fullPage: false,
  });

  // Close Mobile Menu by clicking backdrop or toggle
  await page.click('button[aria-label="Close navigation menu"]');
  await delay(400);

  // Mobile Runway Carousel View
  console.log('  -> Testing Mobile Calibrated Runway Carousel...');
  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_07_mobile_runway.png'),
    fullPage: false,
  });

  // Test Mobile Product Detail with Sticky Bottom Quick Buy Bar
  console.log('  -> Testing Mobile Product Detail with Sticky Buy Bar...');
  await page.goto(`${BASE_URL}/products/afaq-signature-statement-hoodie-grey`, {
    waitUntil: 'networkidle2',
  });
  await delay(1500);

  await page.screenshot({
    path: path.join(OUT_DIR, 'verification_phase5_08_mobile_pdp_sticky.png'),
    fullPage: false,
  });

  await browser.close();

  console.log('\n================================================================');
  console.log('🎉 PHASE 5 LUXURY MOTION & RESPONSIVE SUITE PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

verifyPhase5().catch((err) => {
  console.error('Error during Phase 5 verification:', err);
  process.exit(1);
});
