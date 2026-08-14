// Brand color tokens for non-Tailwind consumers (canvas, SVG fills, Leaflet
// style objects) that can't read CSS custom properties directly.
// Keep these values in sync with the `@theme` block in src/index.css —
// that's the single source of truth; this file just mirrors it for JS.
export const BRAND_COLORS = {
  espresso: "#3D1A12",
  espressoLight: "#4D2A22",
  espressoDeep: "#2A1814",
  espresso950: "#150804",
  clay: "#3D1E16",
  gold: "#C9922A",
  goldDark: "#B8821A",
  cream: "#F6F4F1",
  linen: "#EFEBE9",
  mist: "#E6E3DF",
  taupe: "#746560",
  tan: "#C6A98B",
  whatsapp: "#25D366",
  whatsappDark: "#1ebe5d",
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;
