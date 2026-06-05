// Render an SVG file to a transparent PNG via installed Edge.
// Usage: node scripts/svg2png.mjs <in.svg> <out.png> <width> <height>
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const [, , inPath, outPath, w = "600", h = "480"] = process.argv;
const svg = readFileSync(inPath, "utf8");

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
});
await page.setContent(
  `<!doctype html><body style="margin:0">${svg}</body>`,
);
const el = await page.$("svg");
await el.screenshot({ path: outPath, omitBackground: true });
await browser.close();
console.log(`rendered ${outPath}`);
