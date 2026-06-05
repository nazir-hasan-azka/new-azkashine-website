// Dev-only visual QA helper. Screenshots a URL via installed Edge (no browser download).
// Usage: node scripts/shot.mjs <url> <width> <outfile> [--full]
import { chromium } from "playwright";

const [, , url = "http://localhost:3000", width = "1440", out = "shot.png", full] =
  process.argv;

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: Number(width), height: Number(process.env.SHOT_H || 1000) },
  deviceScaleFactor: Number(process.env.DSF || 2),
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: full === "--full" });
await browser.close();
console.log(`saved ${out} @ ${width}px${full === "--full" ? " (full page)" : ""}`);
