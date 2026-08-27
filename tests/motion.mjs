import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const B = process.env.BASE_URL || (process.env.BASE_URL || "http://localhost:3000");
const browser = await chromium.launch({ headless: true, channel: "msedge" });
let fails = 0;
const check = (n, ok, x="") => { console.log(`${ok?"PASS":"FAIL"}  ${n} ${x}`); if(!ok) fails++; };

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Count startViewTransition calls across a client-side navigation
await page.addInitScript(() => {
  window.__vt = 0;
  if (document.startViewTransition) {
    const orig = document.startViewTransition.bind(document);
    document.startViewTransition = (...a) => { window.__vt++; return orig(...a); };
  }
});
await page.goto(B + "/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(800);
check("browser supports View Transitions", await page.evaluate(() => !!document.startViewTransition));
await page.click('header a[href="/about/"]');
await page.waitForTimeout(1200);
console.log(`NOTE  cross-route View Transitions intentionally not wired (calls=${await page.evaluate(() => window.__vt)}) - React 19.2 lacks the API`);
check("route navigation still works", new URL(page.url()).pathname === "/about/", page.url());

await page.goto(B + "/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(900);
// Home hero is now a full-viewport animated canvas.
const hero = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  if (!c) return { canvas: false };
  const g = c.getContext("2d");
  const d = g.getImageData(Math.floor(c.width*0.7), Math.floor(c.height*0.25), 1, 1).data;
  const sec = c.closest("section");
  return { canvas: true, painted: (d[0]+d[1]+d[2]) > 30,
           fullHeight: sec ? sec.getBoundingClientRect().height >= window.innerHeight - 4 : false };
});
check("hero canvas present", hero.canvas === true);
check("hero canvas is painting", hero.painted === true);
check("hero fills the viewport", hero.fullHeight === true);

// Scroll reveals supported?
const sd = await page.evaluate(() => CSS.supports("animation-timeline", "view()"));
check("browser supports scroll-driven animations", sd);
const revealed = await page.evaluate(() => {
  const el = document.querySelector(".reveal-group > *");
  return el ? getComputedStyle(el).animationName : null;
});
check("reveal animation applied", revealed === "reveal-up", `(${revealed})`);

// Hover lift on a product card
await page.evaluate(() => window.scrollTo(0, 1800));
await page.waitForTimeout(600);
const card = page.locator("article.lift").first();
const before = await card.evaluate(el => getComputedStyle(el).transform);
await card.hover();
await page.waitForTimeout(500);
const after = await card.evaluate(el => getComputedStyle(el).transform);
check("card lifts on hover", before !== after, `${before} -> ${after}`);

// Count-up — the home stats band was removed on request; Community Connect still has one.
await page.goto(B + "/products/community-connect/", { waitUntil: "domcontentloaded" });
await page.evaluate(() => document.querySelector("dl")?.scrollIntoView({ block: "center" }));
await page.waitForTimeout(200);
const mid = await page.evaluate(() => document.querySelector("dl dd span")?.textContent);
await page.waitForTimeout(1700);
const end = await page.evaluate(() => document.querySelector("dl dd span")?.textContent);
check("stat counts up then settles", end === "99.9%" && mid !== end, `mid="${mid}" end="${end}"`);

// Reduced motion honoured
const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const rp = await rm.newPage();
await rp.goto(B + "/", { waitUntil: "domcontentloaded" });
await rp.waitForTimeout(600);
const dur = await rp.evaluate(() => getComputedStyle(document.querySelector("article.lift") || document.body).transitionDuration);
check("reduced-motion shortens transitions", parseFloat(dur) < 0.01, `(${dur})`);
// The hero is a canvas now; under reduced motion it must still paint one static frame
// rather than sitting blank.
const heroPainted = await rp.evaluate(() => {
  const c = document.querySelector("canvas");
  if (!c) return false;
  const g = c.getContext("2d");
  const d = g.getImageData(Math.floor(c.width * 0.7), Math.floor(c.height * 0.25), 1, 1).data;
  return d[0] + d[1] + d[2] > 30;
});
check("reduced-motion still paints the hero once", heroPainted === true);
await rm.close();

await browser.close();
console.log(fails === 0 ? "\nALL MOTION TESTS PASSED" : `\n${fails} FAILURE(S)`);
process.exit(fails === 0 ? 0 : 1);
