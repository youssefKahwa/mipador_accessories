import type { CSSProperties } from "react";
import { BRAND_COLORS } from "./theme";

// The site's one recurring geometric motif — a nested zellige-style diamond,
// echoing the Moroccan tilework referenced in the product copy. Used as a
// low-opacity background texture wherever a section wants craft-rooted
// texture instead of a flat color. Derived from BRAND_COLORS.gold so it
// stays in sync with the rest of the palette.
export function zelligePatternStyle(size = 80): CSSProperties {
  const stroke = BRAND_COLORS.gold.replace("#", "%23");
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${stroke}' stroke-width='1.5'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Cpath d='M40 20L60 40L40 60L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: `${size}px ${size}px`,
  };
}
