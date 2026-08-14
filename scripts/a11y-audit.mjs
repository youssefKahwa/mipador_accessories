import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();

const pages = [
  "/en", "/en/products", "/en/products/zellige-fragments", "/en/about", "/en/contact",
  "/en/faqs", "/en/wishlist", "/fr", "/fr/products/dune-horizon", "/ar", "/en/tools/color-palette",
];

for (const path of pages) {
  await page.goto(`http://localhost:5173${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  if (path === "/en/products/zellige-fragments") {
    await page.getByRole("button", { name: /Add to Cart Instead/i }).click().catch(() => {});
    await page.waitForTimeout(500);
  }
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const contrastViolations = results.violations.filter((v) => v.id === "color-contrast");
  if (contrastViolations.length) {
    console.log(`\n=== ${path} ===`);
    for (const v of contrastViolations) {
      for (const node of v.nodes) {
        console.log("Target:", node.target.join(" "));
        console.log("Summary:", node.failureSummary);
        console.log("HTML:", node.html.slice(0, 200));
        console.log("---");
      }
    }
  }
}

await browser.close();
