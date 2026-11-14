const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyPhase3() {
  console.log('Launching Chrome for Phase 3 Hoodie & Sneaker Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1520, height: 960 });

  // =========================================================================
  // 1. PART A — HOODIE PRODUCT DETAIL (/products/afaq-signature-statement-hoodie-grey)
  // =========================================================================
  console.log('Navigating to Hoodie Product Page...');
  await page.goto('http://localhost:3000/products/afaq-signature-statement-hoodie-grey', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));

  console.log('Capturing Screenshot 1: Hoodie Overview (Minimal Editorial Stage)...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_01_hoodie_overview.png'),
  });

  // Test Front / Back Toggle
  console.log('Testing Front / Back Toggle: Clicking "Back"...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const backBtn = buttons.find((b) => b.innerText.trim().toUpperCase() === 'BACK');
    if (backBtn) backBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log('Capturing Screenshot 2: Hoodie Back View...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_02_hoodie_back_view.png'),
  });

  // Switch back to Front and test Color Selection
  console.log('Switching back to Front and clicking Color Swatch (Forest Green)...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const frontBtn = buttons.find((b) => b.innerText.trim().toUpperCase() === 'FRONT');
    if (frontBtn) frontBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button[title*="Forest"], button[aria-label*="Forest"]'));
    if (buttons.length > 0) {
      buttons[0].click();
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  console.log('Capturing Screenshot 3: Hoodie Color Switch (Forest Green)...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_03_hoodie_color_switch.png'),
  });

  // Test Size Selection & Add to Bag
  console.log('Selecting Size L and Adding to Bag...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sizeL = buttons.find((b) => b.innerText.trim().toUpperCase() === 'L');
    if (sizeL) sizeL.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const addBtn = buttons.find((b) => b.innerText.toLowerCase().includes('add to bag'));
    if (addBtn) addBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1400));

  console.log('Capturing Screenshot 4: Hoodie Added to Bag (Cart Drawer Open)...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_04_hoodie_cart_drawer.png'),
  });

  // =========================================================================
  // 2. PART B — SNEAKERS DETAIL (/products/afaq-luka-5-retro-runner)
  // =========================================================================
  console.log('Navigating to Sneaker Product Page...');
  await page.goto('http://localhost:3000/products/afaq-luka-5-retro-runner', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));

  console.log('Capturing Screenshot 5: Sneaker Detail Overview...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_05_sneaker_overview.png'),
  });

  // Test Thumbnail Selection
  console.log('Testing Viewing Angle Thumbnails (Selecting 2nd thumbnail)...');
  await page.evaluate(() => {
    const thumbButtons = Array.from(document.querySelectorAll('button[aria-label*="angle"], button[aria-label*="Select angle"]'));
    if (thumbButtons.length > 1) {
      thumbButtons[1].click();
    }
  });
  await new Promise((r) => setTimeout(r, 900));

  console.log('Capturing Screenshot 6: Sneaker Viewing Angle Crossfade...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_06_sneaker_angle_switch.png'),
  });

  // Test EU Size Selection & Orange-Accented Purchase Button
  console.log('Selecting EU Size 43 and Adding Sneaker to Bag...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const size43 = buttons.find((b) => b.innerText.trim() === '43');
    if (size43) size43.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const addBtn = buttons.find((b) => b.innerText.toLowerCase().includes('add to bag'));
    if (addBtn) addBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1400));

  console.log('Capturing Screenshot 7: Sneaker Orange Button Feedback & Cart Drawer...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_07_sneaker_cart_drawer.png'),
  });

  // =========================================================================
  // 3. HOMEPAGE FEATURED SNEAKER SHOWCASE (Reference 13.5s - 16.5s)
  // =========================================================================
  console.log('Navigating to Homepage and scrolling to Featured Sneaker section...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));

  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, span'));
    const target = headings.find((el) => el.innerText.includes('FLAGSHIP SNEAKER') || el.innerText.includes('AFAQ LUKA 5'));
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  console.log('Capturing Screenshot 8: Homepage Featured Sneaker Showcase...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase3_08_home_featured_sneaker.png'),
  });

  console.log('All Phase 3 verification screenshots captured successfully!');
  await browser.close();
}

verifyPhase3().catch((err) => {
  console.error('Error during Phase 3 verification:', err);
  process.exit(1);
});
