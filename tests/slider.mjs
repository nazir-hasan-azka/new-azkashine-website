import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const b = await chromium.launch({ headless: true, channel: "msedge" });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
const out = process.argv[2];
let f = 0;
const check = (n, ok, x="") => { console.log(`${ok?"PASS":"FAIL"}  ${n} ${x}`); if(!ok) f++; };

await p.goto((process.env.BASE_URL || "http://localhost:3000") + "/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2000);
await p.evaluate(() => document.querySelector("#featured-heading")?.scrollIntoView({block:"start"}));
await p.waitForTimeout(1200);

const slides = await p.evaluate(() => document.querySelectorAll("[data-slide]").length);
check("all nine products are slides", slides === 9, `(${slides})`);

const activeName = () => p.evaluate(() =>
  document.querySelector('[data-slide][data-active="true"] h3')?.textContent);
const trackX = () => p.evaluate(() => {
  const t = document.querySelector(".slide-track");
  return new DOMMatrix(getComputedStyle(t).transform).m41;
});

const n0 = await activeName(), x0 = await trackX();
await p.screenshot({ path: `${out}/slider-a.png` });

// forward moves the track left
await p.click('[aria-label="Next product"]');
await p.waitForTimeout(900);
const n1 = await activeName(), x1 = await trackX();
check("next advances", n1 !== n0, `${n0} -> ${n1}`);
check("track slides left on next", x1 < x0, `${Math.round(x0)} -> ${Math.round(x1)}`);

// back moves it right — direction-aware
await p.click('[aria-label="Previous product"]');
await p.waitForTimeout(900);
check("track slides right on prev", (await trackX()) > x1);

// pause on hover
await p.hover('[aria-roledescription="carousel"]');
const before = await activeName();
await p.waitForTimeout(3000);
check("autoplay pauses on hover", (await activeName()) === before, `(${before})`);

// staggered copy is applied to the active slide only
const stagger = await p.evaluate(() => {
  const a = document.querySelector('[data-slide][data-active="true"] .slide-copy > h3');
  const i = document.querySelector('[data-slide][data-active="false"] .slide-copy > h3');
  return { active: getComputedStyle(a).opacity, inactive: getComputedStyle(i).opacity };
});
check("inactive slides' copy is held back", stagger.active === "1" && stagger.inactive !== "1", JSON.stringify(stagger));

// jump to the last one
await p.click('[aria-label="Show ProSiddhi"]');
await p.waitForTimeout(900);
check("dot jumps to a distant slide", (await activeName()) === "ProSiddhi");

// all nine still real links
const links = await p.evaluate(() => [...document.querySelectorAll('a[href^="/products/"]')]
  .map(a => a.getAttribute("href")).filter((v,i,s)=>s.indexOf(v)===i).length);
check("nine product links present for crawlers", links >= 9, `(${links} unique)`);
await p.screenshot({ path: `${out}/slider-b.png` });
await b.close();
console.log(f===0 ? "\nslider: all checks passed" : `\n${f} failed`);
process.exit(f === 0 ? 0 : 1);
