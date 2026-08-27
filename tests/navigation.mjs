import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const B = process.env.BASE_URL || (process.env.BASE_URL || "http://localhost:3000");
const browser = await chromium.launch({ headless: true, channel: "msedge" });
let fails = 0;
const check = (n, ok, x="") => { console.log(`${ok ? "PASS" : "FAIL"}  ${n} ${x}`); if (!ok) fails++; };

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: false });
const page = await ctx.newPage();
const open = () => page.evaluate(() => document.querySelectorAll('header button[aria-expanded="true"]').length > 0);
const whichOpen = () => page.evaluate(() => {
  const b = document.querySelector('header button[aria-expanded="true"]');
  return b ? b.textContent.trim() : null;
});

await page.goto(B + "/", { waitUntil: "domcontentloaded" });

// --- Home link ---
check("Home link present in navbar", await page.locator('header a[href="/"]:not([aria-label])').count() > 0);
await page.goto(B + "/about/", { waitUntil: "domcontentloaded" });
await page.click('header a[href="/"]:not([aria-label])');
await page.waitForTimeout(700);
check("Home link navigates to /", new URL(page.url()).pathname === "/", page.url());

// --- hover opens ---
await page.hover('header button:has-text("Products")');
await page.waitForTimeout(350);
check("hover opens Products dropdown", await open(), `(${await whichOpen()})`);
check("  panel content rendered on hover", await page.locator('header a[href="/products/tawthiq/"]:visible').count() > 0);

// --- hover to the other menu switches ---
await page.hover('header button:has-text("What We Do")');
await page.waitForTimeout(350);
check("hovering the other menu switches panel", (await whichOpen() || "").toLowerCase().includes("what we do"));

// --- move into the panel: must stay open ---
await page.hover('header button:has-text("Products")');
await page.waitForTimeout(300);
await page.hover('header a[href="/products/tawthiq/"]');
await page.waitForTimeout(300);
check("panel stays open when moving into it", await open());

// --- hover a plain top link closes ---
await page.hover('header a[href="/about/"]');
await page.waitForTimeout(350);
check("hovering About closes the panel", !(await open()));

// --- leaving the header closes ---
await page.hover('header button:has-text("Products")');
await page.waitForTimeout(300);
await page.mouse.move(700, 800);
await page.waitForTimeout(400);
check("leaving the header closes the panel", !(await open()));

// --- click still works ---
await page.mouse.move(0, 0);
await page.click('header button:has-text("Products")');
await page.waitForTimeout(300);
check("click still toggles open", await open());
await page.click('header a[href="/industries/"]');
await page.waitForTimeout(700);
check("click-through still closes (earlier fix intact)", !(await open()));

// --- keyboard ---
await page.goto(B + "/", { waitUntil: "domcontentloaded" });
await page.mouse.move(1200, 700);   // park the pointer clear of the header
await page.waitForTimeout(1500);    // home now ships canvas + slider JS; wait for hydration
await page.focus('header button:has-text("Products")');
await page.keyboard.press("Enter");
await page.waitForTimeout(300);
check("keyboard Enter opens panel", await open());
await page.keyboard.press("Escape");
await page.waitForTimeout(250);
check("Escape still closes", !(await open()));
await ctx.close();

// --- touch device: hover must NOT hijack the tap ---
const t = await browser.newContext({ viewport: { width: 390, height: 850 }, hasTouch: true, isMobile: true });
const tp = await t.newPage();
await tp.goto(B + "/", { waitUntil: "domcontentloaded" });
const mOpen = () => tp.evaluate(() => document.querySelector('button[aria-label="Close menu"]') !== null);
await tp.tap('button[aria-label="Open menu"]');
await tp.waitForTimeout(400);
check("touch: mobile menu opens", await mOpen());
check("touch: Home link in mobile menu", await tp.locator('header a[href="/"]:not([aria-label])').count() > 0);
await tp.tap('header a[href="/products/savant-ai/"]');
await tp.waitForTimeout(800);
check("touch: menu closes after tap", !(await mOpen()));
await t.close();

await browser.close();
console.log(fails === 0 ? "\nALL PASSED" : `\n${fails} FAILURE(S)`);
process.exit(fails === 0 ? 0 : 1);
