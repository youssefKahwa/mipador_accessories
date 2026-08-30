// Brand color tokens for non-Tailwind consumers (canvas, SVG fills, Leaflet
// style objects) that can't read CSS custom properties directly.
// Keep these values in sync with the `@theme` block in src/index.css —
// that's the single source of truth; this file just mirrors it for JS.
export const BRAND_COLORS = {
  ink: "#0B1224",
  inkLight: "#16213E",
  inkDeep: "#060912",
  sapphireDeep: "#0F2459",
  sapphire: "#1E3FA0",
  azure: "#2F6FE0",
  ice: "#6FB1FF",
  champagne: "#C9A455",
  champagneDark: "#AC8A42",
  haze: "#F1F4F9",
  frost: "#F7F9FC",
  cloud: "#EAF0F8",
  mist: "#D8E1EC",
  slate: "#50617D",
  platinum: "#B6C2D1",
  whatsapp: "#25D366",
  whatsappDark: "#1ebe5d",
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;
