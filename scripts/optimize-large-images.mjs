// Run once: node scripts/optimize-large-images.mjs
// Resizes and recompresses oversized source images in public/.
// After running, commit the shrunken files — the vite optimizer handles the rest.

import sharp from "sharp";
import { readFileSync, writeFileSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, "..");

const jobs = [
  // NavBar logo — 3352x512 displayed at ~183x28 (@2x = 366x56)
  {
    src: "public/images/LogoMipadorNavBar.webp",
    maxWidth: 400,
    quality: 85,
    format: "webp",
  },
  // Footer logo — 2284x512 displayed at ~286x64 (@2x = 572x128)
  {
    src: "public/images/LogoMipadorFooter.webp",
    maxWidth: 600,
    quality: 85,
    format: "webp",
  },
  // Mobile hero — displayed at ~549x823 (@2x = 1098x1646)
  {
    src: "public/images/HeroMobile.webp",
    maxWidth: 900,
    quality: 72,
    format: "webp",
  },
  // Desktop hero — 1.1 MB, reasonable but can tighten
  {
    src: "public/images/Hero1.webp",
    maxWidth: 1600,
    quality: 75,
    format: "webp",
  },
  // hero.webp used in BrandPromise + OG image
  {
    src: "public/images/hero.webp",
    maxWidth: 1600,
    quality: 75,
    format: "webp",
  },
];

let totalBefore = 0;
let totalAfter = 0;

for (const job of jobs) {
  const abs = resolve(root, job.src);
  let statBefore;
  try {
    statBefore = statSync(abs);
  } catch {
    console.log(`  skip (not found): ${job.src}`);
    continue;
  }

  const before = statBefore.size;
  totalBefore += before;

  const input = readFileSync(abs);
  const image = sharp(input).resize({ width: job.maxWidth, withoutEnlargement: true });

  let buf;
  if (job.format === "webp") {
    buf = await image.webp({ quality: job.quality }).toBuffer();
  } else if (job.format === "jpeg") {
    buf = await image.jpeg({ quality: job.quality, mozjpeg: true }).toBuffer();
  } else {
    buf = await image.png({ quality: job.quality, compressionLevel: 9 }).toBuffer();
  }

  const after = buf.length;
  totalAfter += after;

  if (after < before) {
    writeFileSync(abs, buf);
    const pct = Math.round((1 - after / before) * 100);
    console.log(
      `  ✓  ${job.src.padEnd(50)} ${(before / 1024).toFixed(0).padStart(6)} KB → ${(after / 1024).toFixed(0).padStart(6)} KB  (-${pct}%)`
    );
  } else {
    console.log(
      `  –  ${job.src.padEnd(50)} ${(before / 1024).toFixed(0).padStart(6)} KB  (already optimal, skipped)`
    );
    totalAfter -= after;
    totalAfter += before;
  }
}

const totalPct = Math.round((1 - totalAfter / totalBefore) * 100);
console.log(
  `\n  Total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB  (-${totalPct}%)`
);
