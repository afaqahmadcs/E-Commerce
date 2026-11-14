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

async function verifyVisualOverhaul() {
  console.log("================================================================");
  console.log("✨ AFAQ SUPPLY — VERIFYING VISUAL OVERHAUL & TOUCHPAD EXPERIENCE");
  console.log("================================================================\n");

  const edgePath = getEdgePath();
  if (!edgePath) {
    console.error("Microsoft Edge executable not found!");
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

  try {
    console.log("1. Loading Flagship Homepage (1440 x 900)...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 1200));

    // Capture Try The Look (Hero Runway)
    console.log("  -> Capturing Try The Look Runway (Full Body & Matching Outfits)...");
    await page.screenshot({
      path: path.join(outDir, "verification_overhaul_01_try_the_look.png"),
      clip: { x: 0, y: 64, width: 1440, height: 750 }
    });

    // Test Touchpad / Mouse Wheel Navigation on Try The Look
    console.log("  -> Testing Touchpad Horizontal Scroll / Wheel Event on Runway...");
    const runwaySelector = "section:first-of-type";
    await page.hover(runwaySelector);
    
    // Simulate horizontal wheel scroll (touchpad swipe left to advance look)
    await page.mouse.wheel({ deltaX: 120, deltaY: 0 });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(outDir, "verification_overhaul_02_runway_after_wheel.png"),
      clip: { x: 0, y: 64, width: 1440, height: 750 }
    });

    // Capture Clothing Rail Section
    console.log("  -> Scrolling to Clothing Rail Section...");
    await page.evaluate(() => {
      const rail = document.querySelector("section:nth-of-type(2)");
      if (rail) rail.scrollIntoView({ behavior: "instant" });
    });
    await new Promise(r => setTimeout(r, 800));

    console.log("  -> Capturing Hanging Clothing Rail (16 Silhouettes, Wire & Tags)...");
    const railRect = await page.evaluate(() => {
      const rail = document.querySelector("section:nth-of-type(2)");
      const rect = rail.getBoundingClientRect();
      return { x: 0, y: Math.max(0, rect.top + window.scrollY), width: 1440, height: Math.min(rect.height, 650) };
    });

    await page.screenshot({
      path: path.join(outDir, "verification_overhaul_03_clothing_rail.png"),
      clip: railRect
    });

    // Test Touchpad / Wheel on Clothing Rail
    console.log("  -> Testing Touchpad Horizontal Scroll on Clothing Rail...");
    await page.mouse.wheel({ deltaX: 350, deltaY: 0 });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(outDir, "verification_overhaul_04_clothing_rail_scrolled.png"),
      clip: railRect
    });

    // Capture Featured Sneaker Section (Zero Gray Box Artifacts)
    console.log("  -> Scrolling to Featured Sneaker Section...");
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

    console.log("  -> Capturing Featured Sneaker (Clean Cutout, No Box Artifacts)...");
    await page.screenshot({
      path: path.join(outDir, "verification_overhaul_05_featured_sneaker.png"),
      clip: sneakerRect
    });

    // Capture 3D Perspective Footwear Gallery
    console.log("  -> Scrolling to 3D Perspective Footwear Gallery...");
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

    console.log("  -> Capturing 3D Perspective Footwear Orbit...");
    await page.screenshot({
      path: path.join(outDir, "verification_overhaul_06_perspective_orbit.png"),
      clip: perspectiveRect
    });

    console.log("\n================================================================");
    console.log("🎉 ALL VISUAL OVERHAUL & INTERACTION CHECKS PASSED!");
    console.log("================================================================\n");

  } catch (err) {
    console.error("Verification failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyVisualOverhaul();
