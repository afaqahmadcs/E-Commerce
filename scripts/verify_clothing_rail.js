const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyClothingRail() {
  console.log('Launching Chrome for Clothing Rail Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1520, height: 960 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Scroll directly to the clothing rail section
  console.log('Scrolling to Clothing Rail Section...');
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const railHeading = headings.find(h => h.innerText.includes('PREMIUM STREETWEAR'));
    if (railHeading) {
      const rect = railHeading.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Scroll so the heading is ~80px from top
      window.scrollTo({ top: scrollTop + rect.top - 70, behavior: 'instant' });
    }
  });

  await new Promise((r) => setTimeout(r, 1200));

  console.log('Capturing Screenshot 1: Clothing Rail Initial Overview...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase2_01_rail_overview.png'),
  });

  // 2. Click the Next arrow to scroll the rail horizontally
  console.log('Testing Horizontal Rail Navigation (Next Arrow)...');
  const nextButton = await page.$('button[aria-label="Next garments"]');
  if (nextButton) {
    await nextButton.click();
    await new Promise((r) => setTimeout(r, 700));
    await nextButton.click();
    await new Promise((r) => setTimeout(r, 900));
  }

  console.log('Capturing Screenshot 2: Scrolled Rail Position...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase2_02_rail_scrolled.png'),
  });

  // 3. Open Quick View Modal for active garment
  console.log('Clicking Quick View button...');
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.toUpperCase().includes('QUICK VIEW'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Quick View clicked status:', clicked);

  await new Promise((r) => setTimeout(r, 1200));

  console.log('Capturing Screenshot 3: Garment Quick View Modal Suspended Hanger...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase2_03_quick_view_modal.png'),
  });

  // 4. Select Size "L" and Click "Add to cart"
  console.log('Selecting size L and adding to bag in modal...');
  const sizeSelected = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sizeL = buttons.find(b => b.innerText.trim().toUpperCase() === 'L');
    if (sizeL) {
      sizeL.click();
      return true;
    }
    return false;
  });
  console.log('Size L selected:', sizeSelected);
  await new Promise((r) => setTimeout(r, 400));

  const addClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const addBtn = buttons.find(b => b.innerText.toLowerCase().includes('add to cart'));
    if (addBtn) {
      addBtn.click();
      return true;
    }
    return false;
  });
  console.log('Add to cart clicked:', addClicked);

  await new Promise((r) => setTimeout(r, 1400));

  console.log('Capturing Screenshot 4: Added to Cart Drawer Open...');
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_phase2_04_cart_drawer.png'),
  });

  console.log('All Phase 2 verification screenshots captured successfully!');
  await browser.close();
}

verifyClothingRail().catch((err) => {
  console.error('Error during clothing rail verification:', err);
  process.exit(1);
});
