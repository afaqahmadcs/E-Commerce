const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

function getEdgePath() {
  const edgePaths = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Users\\" + (process.env.USERNAME || "hp") + "\\AppData\\Local\\Microsoft\\Edge\\Application\\msedge.exe"
  ];
  for (const p of edgePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function runFinalAudit() {
  console.log("================================================================");
  console.log("✦ AFAQ SUPPLY — PHASE 6 FINAL REFERENCE & QA AUDIT SUITE");
  console.log("================================================================\n");

  const edgePath = getEdgePath();
  if (!edgePath) {
    console.error("Browser executable not found!");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  const outDir = path.join(process.cwd(), "reference_frames");
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Console Error]: ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(`[Page Error]: ${err.toString()}`);
  });

  try {
    // -------------------------------------------------------------
    // STAGE 1: DESKTOP HOMEPAGE & SIGNATURE EXPERIENCES AUDIT
    // -------------------------------------------------------------
    console.log("STAGE 1: Desktop Homepage & Signature Experiences (1440 x 900)...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 1200));

    // Audit 1: Try The Look Runway (00.0s – 05.5s)
    console.log("  [Audit 1/12] Runway Carousel: Full Body Head-to-Shoes & Matching Outfits");
    await page.screenshot({
      path: path.join(outDir, "audit_01_desktop_runway_look04.png"),
      clip: { x: 0, y: 64, width: 1440, height: 750 }
    });

    // Test Touchpad / Wheel navigation to Look 05
    console.log("  [Audit 2/12] Runway Touchpad Navigation (Wheel / Swipe to Look 05)");
    await page.hover("section:first-of-type");
    await page.mouse.wheel({ deltaX: 120, deltaY: 0 });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(outDir, "audit_02_desktop_runway_look05.png"),
      clip: { x: 0, y: 64, width: 1440, height: 750 }
    });

    // Audit 2: Suspended Hanging Clothing Rail (05.5s – 08.5s)
    console.log("  [Audit 3/12] Suspended Clothing Rail: 16 Garments, Wire & Dangling Tags");
    await page.evaluate(() => {
      const rail = document.querySelector("section:nth-of-type(2)");
      if (rail) rail.scrollIntoView({ behavior: "instant" });
    });
    await new Promise(r => setTimeout(r, 800));

    const railRect = await page.evaluate(() => {
      const rail = document.querySelector("section:nth-of-type(2)");
      const rect = rail.getBoundingClientRect();
      return { x: 0, y: Math.max(0, rect.top + window.scrollY), width: 1440, height: Math.min(rect.height, 650) };
    });

    await page.screenshot({
      path: path.join(outDir, "audit_03_desktop_clothing_rail.png"),
      clip: railRect
    });

    // Audit 3: Featured Sneaker Purchasing Interface (13.5s – 16.5s)
    console.log("  [Audit 4/12] Featured Sneaker: Clean Cutout & Breathing Contact Shadow");
    await page.evaluate(() => {
      const sneakerSec = document.querySelector("section:nth-of-type(3)");
      if (sneakerSec) sneakerSec.scrollIntoView({ behavior: "instant" });
    });
    await new Promise(r => setTimeout(r, 800));

    const sneakerRect = await page.evaluate(() => {
      const sec = document.querySelector("section:nth-of-type(3)");
      const rect = sec.getBoundingClientRect();
      return { x: 0, y: Math.max(0, rect.top + window.scrollY), width: 1440, height: Math.min(rect.height, 750) };
    });

    await page.screenshot({
      path: path.join(outDir, "audit_04_desktop_featured_sneaker.png"),
      clip: sneakerRect
    });

    // Audit 4: 3D Perspective Footwear Gallery (11.5s – 13.5s)
    console.log("  [Audit 5/12] 3D Perspective Footwear Gallery: Pure Transparent Orbit");
    await page.evaluate(() => {
      const perspectiveSec = document.querySelector("section:nth-of-type(4)");
      if (perspectiveSec) perspectiveSec.scrollIntoView({ behavior: "instant" });
    });
    await new Promise(r => setTimeout(r, 800));

    const perspectiveRect = await page.evaluate(() => {
      const sec = document.querySelector("section:nth-of-type(4)");
      const rect = sec.getBoundingClientRect();
      return { x: 0, y: Math.max(0, rect.top + window.scrollY), width: 1440, height: Math.min(rect.height, 750) };
    });

    await page.screenshot({
      path: path.join(outDir, "audit_05_desktop_perspective_orbit.png"),
      clip: perspectiveRect
    });

    // -------------------------------------------------------------
    // STAGE 2: EDITORIAL PRODUCT DETAIL PAGE (HOODIE 08.5s – 11.0s)
    // -------------------------------------------------------------
    console.log("\nSTAGE 2: Minimal Editorial Product Detail Page (Hoodie)...");
    await page.goto("http://localhost:3000/products/afaq-signature-statement-hoodie-grey", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 1000));

    console.log("  [Audit 6/12] Editorial Hoodie PDP: Dominant Isolated Asset & Zoom Lens");
    await page.screenshot({
      path: path.join(outDir, "audit_06_desktop_pdp_hoodie.png"),
      fullPage: false
    });

    // Add Hoodie to Cart & Verify Cart Drawer
    console.log("  [Audit 7/12] Cart Drawer Dispatch & Shipping Meter");
    // Click size L pill
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const lBtn = btns.find(b => b.textContent.trim() === "L");
      if (lBtn) lBtn.click();
    });

    // Click Add to Bag
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Add to Bag") || b.textContent.includes("Add to bag"));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(outDir, "audit_07_desktop_cart_drawer.png"),
      fullPage: false
    });

    // -------------------------------------------------------------
    // STAGE 3: FULL COMMERCIAL SHOPPING & CHECKOUT PIPELINE
    // -------------------------------------------------------------
    console.log("\nSTAGE 3: Commercial Checkout & Server Order Validation...");
    await page.goto("http://localhost:3000/checkout", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 1000));

    console.log("  [Audit 8/12] Express Checkout Form & Multi-Gateway Selector");
    await page.screenshot({
      path: path.join(outDir, "audit_08_desktop_checkout_form.png"),
      fullPage: false
    });

    // -------------------------------------------------------------
    // STAGE 4: ATELIER ADMIN MANAGEMENT PORTAL
    // -------------------------------------------------------------
    console.log("\nSTAGE 4: Atelier Admin Portal (/admin)...");
    await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 800));

    // Unlock passcode
    const passInput = await page.$("input[type='password']");
    if (passInput) {
      await passInput.type("1994");
      const unlockBtn = await page.$("button[type='submit']");
      if (unlockBtn) await unlockBtn.click();
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log("  [Audit 9/12] Admin Portal: KPI Analytics & Order Fulfillment Pipeline");
    await page.screenshot({
      path: path.join(outDir, "audit_09_desktop_admin_portal.png"),
      fullPage: false
    });

    // -------------------------------------------------------------
    // STAGE 5: MOBILE FLAGSHIP RESPONSIVE AUDIT (375 x 812)
    // -------------------------------------------------------------
    console.log("\nSTAGE 5: Mobile Flagship Responsive Audit (375 x 812)...");
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 1000));

    console.log("  [Audit 10/12] Mobile Runway Carousel (150px Calibrated Lookbook Peek-In)");
    await page.screenshot({
      path: path.join(outDir, "audit_10_mobile_runway.png"),
      clip: { x: 0, y: 64, width: 375, height: 748 }
    });

    console.log("  [Audit 11/12] Mobile Navigation Sliding Drawer");
    const mobileMenuBtn = await page.$("button[aria-label='Open navigation menu'], button[aria-label='Close navigation menu']");
    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(outDir, "audit_11_mobile_nav_drawer.png"),
        fullPage: false
      });
      // Close menu
      await mobileMenuBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }

    console.log("  [Audit 12/12] Mobile Product Detail Page & Sticky Quick-Buy Bar");
    await page.goto("http://localhost:3000/products/afaq-signature-statement-hoodie-grey", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(outDir, "audit_12_mobile_pdp_sticky.png"),
      fullPage: false
    });

    console.log("\n================================================================");
    console.log("✦ AUDIT LOG RESULTS:");
    console.log(`  Console Errors Caught: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(e => console.log(`  - ${e}`));
    } else {
      console.log("  ✔ Pure Zero Console Errors or Runtime Exceptions!");
    }
    console.log("================================================================\n");

  } catch (err) {
    console.error("Audit run failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runFinalAudit();
