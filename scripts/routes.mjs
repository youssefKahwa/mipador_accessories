// Shared route list for scripts/generate-sitemap.mjs and scripts/prerender.mjs
// — single source of truth so the two never drift apart. Product pages are
// derived live from src/data/products.ts, so adding/removing/pausing a
// product automatically updates both the sitemap and prerendering.
import { products } from "../src/data/products.ts";

// Matches HREFLANG_LANGS in src/hooks/useSEO.ts — "ma" (Darija) isn't an
// ISO-recognized language tag so it's intentionally left out of hreflang
// and prerendering; it still works fine client-side for users who pick it.
export const LANGS = ["fr", "en", "ar"];
export const DEFAULT_LANG = "fr";

export const staticPages = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "products", changefreq: "weekly", priority: "0.9" },
  { path: "about", changefreq: "monthly", priority: "0.75" },
  { path: "contact", changefreq: "yearly", priority: "0.7" },
  { path: "faqs", changefreq: "monthly", priority: "0.65" },
  { path: "tools/color-palette", changefreq: "monthly", priority: "0.75" },
  { path: "privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "refund-policy", changefreq: "yearly", priority: "0.3" },
  { path: "terms-of-service", changefreq: "yearly", priority: "0.3" },
];

export const productPages = products.map((p) => ({
  path: `products/${p.slug}`,
  changefreq: "monthly",
  priority: "0.85",
  image: p.images[0],
  imageTitle: p.name,
}));

export const allPages = [...staticPages, ...productPages];
