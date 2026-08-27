import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const b = await chromium.launch({ headless: true, channel: "msedge" });
const p = await (await b.newContext({ viewport: { width: 1440, height: 760 } })).newPage();
// Only products with real measured figures in the deck should carry a band.
const EXPECT = {
  "community-connect": ["99.9%","<5ms","100k+"],
  "agentos": ["80%"],
  "cloud-orchestration": ["10x"],
  "savant-ai": [], "tawthiq": [], "agent-siddhi": [],
  "smart-ai-assistant": [], "ethics-intelligence": [], "prosiddhi": [],
};
let bad = 0;
for (const [slug, want] of Object.entries(EXPECT)) {
  await p.goto(`http://localhost:3000/products/${slug}/`, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(600);
  const got = await p.evaluate(() => {
    const dl = document.querySelector("dl");
    return dl ? [...dl.querySelectorAll("dd > span:first-child")].map(e => e.textContent.trim()) : [];
  });
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) bad++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${slug.padEnd(20)} ${got.length ? got.join(" | ") : "(no band)"}`);
}
await b.close();
console.log(bad === 0 ? "\nstats bands are exactly as specified" : `\n${bad} mismatch`);
process.exit(bad === 0 ? 0 : 1);
