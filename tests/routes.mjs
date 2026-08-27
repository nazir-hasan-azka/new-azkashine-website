import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");

const ROUTES = ["/", "/what-we-do/", "/what-we-do/ai-automation/", "/what-we-do/digital-platforms/",
  "/what-we-do/cloud-testing/", "/products/", "/products/savant-ai/", "/products/tawthiq/",
  "/products/agentos/", "/products/agent-siddhi/", "/products/smart-ai-assistant/",
  "/products/ethics-intelligence/", "/products/community-connect/", "/products/cloud-orchestration/",
  "/products/prosiddhi/", "/industries/", "/about/", "/contact/"];

const browser = await chromium.launch({ headless: true, channel: "msedge" });
let problems = 0;
for (const w of [390, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const r of ROUTES) {
    await page.goto((process.env.BASE_URL || "http://localhost:3000") + "" + r, { waitUntil: "domcontentloaded", timeout: 20000 });
    const res = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      emptyLinks: [...document.querySelectorAll('a[href="#"], a[href=""]')].length,
      imgNoAlt: [...document.querySelectorAll("img:not([alt])")].length,
    }));
    if (res.overflow || res.h1 !== 1 || res.emptyLinks > 0 || res.imgNoAlt > 0) {
      problems++;
      console.log(`ISSUE ${w}px ${r} -> overflow=${res.overflow}(${res.sw}>${res.iw}) h1=${res.h1} deadLinks=${res.emptyLinks} imgNoAlt=${res.imgNoAlt}`);
    }
  }
  await ctx.close();
  console.log(`checked ${ROUTES.length} routes @ ${w}px`);
}

// Mobile menu interaction
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
const page = await ctx.newPage();
await page.goto((process.env.BASE_URL || "http://localhost:3000") + "/", { waitUntil: "domcontentloaded" });
await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(400);
const menu = await page.evaluate(() => {
  const links = [...document.querySelectorAll("header a")].filter(a => a.offsetParent !== null);
  return { visibleLinks: links.length, hasProducts: links.some(a => a.textContent.includes("Savant")) };
});
console.log(`mobile menu: ${menu.visibleLinks} visible links, products listed = ${menu.hasProducts}`);
await browser.close();
console.log(problems === 0 ? "\nNO ISSUES FOUND" : `\n${problems} issue(s)`);
process.exit(problems === 0 ? 0 : 1);
