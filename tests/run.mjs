// Runs every suite in order against a already-running server and exits non-zero on
// the first failure, so `npm test` is usable in CI or a pre-push hook.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const suites = readdirSync(new URL(".", import.meta.url))
  .filter((f) => f.endsWith(".mjs") && f !== "run.mjs")
  .sort();

let failed = 0;
for (const s of suites) {
  process.stdout.write(`\n──── ${s} ${"─".repeat(Math.max(0, 60 - s.length))}\n`);
  const r = spawnSync(process.execPath, [fileURLToPath(new URL(s, import.meta.url))], {
    stdio: "inherit",
    env: process.env,
  });
  if (r.status !== 0) failed++;
}
process.stdout.write(
  failed === 0 ? "\n\nall suites completed\n" : `\n\n${failed} suite(s) exited non-zero\n`,
);
process.exit(failed === 0 ? 0 : 1);
