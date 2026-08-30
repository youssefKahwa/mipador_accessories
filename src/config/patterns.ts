import type { CSSProperties } from "react";
import { BRAND_COLORS } from "./theme";

// The site's one recurring geometric motif — a fine guilloché-style tile of
// concentric rings, echoing the engine-turned engraving found on luxury
// watch dials. Used as a low-opacity background texture wherever a section
// wants dial-rooted texture instead of a flat color. Derived from
// BRAND_COLORS.sapphire so it stays in sync with the rest of the palette.
export function guillochePatternStyle(size = 56): CSSProperties {
  const stroke = BRAND_COLORS.sapphire.replace("#", "%23");
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${stroke}' stroke-width='1'%3E%3Ccircle cx='28' cy='28' r='22'/%3E%3Ccircle cx='28' cy='28' r='14'/%3E%3Ccircle cx='28' cy='28' r='6'/%3E%3Cpath d='M28 0V6M28 50V56M0 28H6M50 28H56M6.7 6.7L11 11M45 45L49.3 49.3M6.7 49.3L11 45M45 11L49.3 6.7'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: `${size}px ${size}px`,
  };
}
