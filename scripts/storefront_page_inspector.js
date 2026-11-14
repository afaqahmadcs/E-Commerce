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

const ROUTES = [
  { name: "Homepage", path: "/" },
  { name: "Shop (All)", path: "/shop" },
  { name: "Men's Atelier", path: "/shop?category=men" },
  { name: "Women's Studio", path: "/shop?category=women" },
  { name: "Sneakers", path: "/shop?category=sneakers" },
  { name: "Accessories", path: "/shop?category=accessories" },
  { name: "Curated Drop (Streetwear)", path: "/collections/streetwear-essentials" },
  { name: "Product Detail (Hoodie)", path: "/products/afaq-signature-statement-hoodie-grey" },
  { name: "Product Detail (Sneaker)", path: "/products/afaq-luka-5-court-runner" },
  { name: "Search", path: "/search" },
  { name: "Cart (Shopping Bag)", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
  { name: "About (Atelier Manifesto)", path: "/about" },
  { name: "Contact (Concierge)", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Shipping & Returns", path: "/shipping-returns" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms" },
  { name: "Customer Account", path: "/account" },
  { name: "Order History", path: "/account/orders" },
  { name: "Admin Dashboard", path: "/admin" }
];

async function inspectAllRoutes() {
  console.log("================================================================");
  console.log("✦ AFAQ SUPPLY — COMPLETE STOREFRONT ROUTE & DESIGN AUDIT");
  console.log("================================================================\n");

  const edgePath = getEdgePath();
  if (!edgePath) {
    console.error("Browser executable not found!");
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), "reference_frames", "storefront_audit");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  const results = [];

  for (let i = 0; i < ROUTES.length; i++) {
    const route = ROUTES[i];
    const url = `http://localhost:3000${route.path}`;
    const pageErrors = [];

    const onPageError = (err) => pageErrors.push(err.toString());
    const onConsole = (msg) => {
      if (msg.type() === "error") pageErrors.push(msg.text());
    };

    page.on("pageerror", onPageError);
    page.on("console", onConsole);

    try {
      console.log(`[${i + 1}/${ROUTES.length}] Inspecting ${route.name} (${route.path})...`);
      const response = await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });
      await new Promise((r) => setTimeout(r, 600));

      const status = response ? response.status() : "UNKNOWN";

      // Analyze page DOM characteristics
      const pageInfo = await page.evaluate(() => {
        const title = document.title;
        const h1 = document.querySelector("h1") ? document.querySelector("h1").textContent.trim() : null;
        const images = Array.from(document.querySelectorAll("img")).map((img) => img.src);
        const externalImages = images.filter((src) => src.includes("unsplash.com"));
        const localImages = images.filter((src) => !src.includes("unsplash.com") && !src.startsWith("data:"));
        const buttons = Array.from(document.querySelectorAll("button")).map((b) => b.textContent.trim()).filter(Boolean);
        const hasMotionElements = Boolean(document.querySelector("[style*='transform'], [style*='opacity']"));

        return {
          title,
          h1,
          totalImages: images.length,
          externalImagesCount: externalImages.length,
          localImagesCount: localImages.length,
          buttonsCount: buttons.length,
          hasMotionElements
        };
      });

      // Filename safe
      const safeName = route.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
      const screenshotPath = path.join(outDir, `${String(i + 1).padStart(2, "0")}_${safeName}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      results.push({
        ...route,
        status,
        screenshot: path.relative(process.cwd(), screenshotPath).replace(/\\/g, "/"),
        ...pageInfo,
        errors: pageErrors
      });

      console.log(`  ✓ Status: ${status} | H1: "${pageInfo.h1}" | Images: ${pageInfo.totalImages} (${pageInfo.externalImagesCount} unsplash) | Errors: ${pageErrors.length}`);
    } catch (err) {
      console.error(`  ✗ Failed to inspect ${route.name}:`, err.message);
      results.push({
        ...route,
        status: "FAILED",
        error: err.message
      });
    } finally {
      page.off("pageerror", onPageError);
      page.off("console", onConsole);
    }
  }

  await browser.close();

  // Save audit data to JSON
  const jsonPath = path.join(process.cwd(), "storefront_audit_results.json");
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`\nAudit completed! Report saved to ${jsonPath}`);
}

inspectAllRoutes();
