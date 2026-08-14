// Bakes real, crawlable HTML for every route at build time — this is the
// direct fix for the site being an empty `<div id="root">` shell in its
// raw HTML, which is why it wasn't getting indexed at all. Runs AFTER
// `vite build` (dist/ must already exist): serves dist/ locally, visits
// every route with a real browser via Playwright, and writes the fully
// rendered DOM (including everything React + useSEO injected into <head>)
// to disk as dist/<lang>/<path>/index.html. The app is still a normal
// client-rendered SPA after this — createRoot() just replaces the
// prerendered markup with its own render on load, so nothing about the
// app's behavior changes for real visitors; crawlers just see real
// content immediately instead of racing JavaScript.
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import { chromium } from "playwright";
import { LANGS, allPages } from "./routes.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");

if (!existsSync(distDir)) {
  console.error("dist/ not found — run `vite build` before prerendering.");
  process.exit(1);
}

const server = await preview({ root, preview: { port: 4319, strictPort: false } });
const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, "");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let ok = 0;
let failed = 0;

for (const routePage of allPages) {
  for (const lang of LANGS) {
    const urlPath = `${lang}/${routePage.path}`;
    const url = `${baseUrl}/${urlPath}`;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
      const html = await page.content();

      const outDir = join(distDir, lang, routePage.path);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), html, "utf8");
      ok++;
    } catch (err) {
      failed++;
      console.warn(`⚠ Failed to prerender /${urlPath}: ${err.message.split("\n")[0]}`);
    }
  }
}

await browser.close();
await new Promise((res) => server.httpServer.close(res));

console.log(`Prerendered ${ok} pages${failed ? `, ${failed} failed (left as SPA-only routes)` : ""}.`);
