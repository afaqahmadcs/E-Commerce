const puppeteer = require("puppeteer-core");
const fs = require("fs");

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

async function run() {
  const edgePath = getEdgePath();
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 850 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const sections = await page.$$("section");
  console.log("Found sections:", sections.length);
  if (sections[0]) await sections[0].screenshot({ path: "reference_frames/verification_updated_try_the_look.png" });
  if (sections[1]) await sections[1].screenshot({ path: "reference_frames/verification_updated_clothing_rail.png" });
  if (sections[2]) await sections[2].screenshot({ path: "reference_frames/verification_updated_featured_sneaker.png" });
  if (sections[3]) await sections[3].screenshot({ path: "reference_frames/verification_updated_sneaker_perspective.png" });

  await browser.close();
  console.log("Screenshots captured successfully!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
