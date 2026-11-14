const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  console.log("Navigating to Unsplash...");
  await page.goto("https://unsplash.com/s/photos/streetwear-model", {
    waitUntil: "domcontentloaded",
    timeout: 25000
  });
  await new Promise((r) => setTimeout(r, 2500));

  const photos = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="images.unsplash.com/photo-"]'));
    return imgs.slice(0, 10).map((img) => ({
      src: img.src.split("?")[0],
      alt: img.alt
    }));
  });

  console.log("Found photos:", photos.length);
  photos.forEach((p, i) => console.log(`${i + 1}. [${p.alt}] ${p.src}`));
  await browser.close();
})();

