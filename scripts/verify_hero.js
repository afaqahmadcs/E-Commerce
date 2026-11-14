const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyHero() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1520, height: 960 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // 1. Initial Lineup Screenshot
  console.log('Capturing Initial Lineup View...');
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_01_lineup.png'),
  });

  // 2. Click Scrubber "05" or Next Button to test horizontal glide
  console.log('Testing Carousel navigation: clicking Look 05 (Earthy Knitwear)...');
  const buttons = await page.$$('button');
  let clickedScrubber = false;
  for (const b of buttons) {
    const text = await page.evaluate((el) => el.innerText, b);
    if (text.includes('05')) {
      await b.click();
      clickedScrubber = true;
      break;
    }
  }

  if (clickedScrubber) {
    console.log('Look 05 clicked. Waiting 900ms for 700ms transition...');
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(__dirname, '../reference_frames/verification_02_look05_center.png'),
    });
  }

  // 3. Switch back to Look 04 "Studio Day"
  console.log('Switching to Look 04 (Studio Day)...');
  for (const b of buttons) {
    const text = await page.evaluate((el) => el.innerText, b);
    if (text.includes('04')) {
      await b.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 900));

  // 4. Click "VIEW OUTFIT DETAILS" or the "VIEW" pill to test Isolated Mode
  console.log('Clicking "View Outfit Details" to enter Isolated Mode...');
  const allButtons = await page.$$('button');
  for (const b of allButtons) {
    const text = await page.evaluate((el) => el.innerText, b);
    if (text.toLowerCase().includes('view outfit details') || text.toLowerCase().includes('explore outfit')) {
      await b.click();
      break;
    }
  }

  console.log('Waiting for Isolated Mode transition...');
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_03_isolated_view.png'),
  });

  // 5. Test Return to Lineup
  console.log('Testing "Return to Lineup" button...');
  const returnButtons = await page.$$('button');
  for (const b of returnButtons) {
    const text = await page.evaluate((el) => el.innerText, b);
    if (text.toLowerCase().includes('return to lineup')) {
      await b.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 800));

  // 6. Test "Add full look to bag"
  console.log('Testing "Add full look to bag"...');
  const actionButtons = await page.$$('button');
  for (const b of actionButtons) {
    const text = await page.evaluate((el) => el.innerText, b);
    if (text.toLowerCase().includes('add full look to bag')) {
      await b.click();
      break;
    }
  }

  console.log('Waiting for cart drawer to open...');
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(__dirname, '../reference_frames/verification_04_cart_opened.png'),
  });

  await browser.close();
  console.log('Verification run finished successfully!');
}

verifyHero().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});

