import { BRAND_COLORS } from "../config/theme";
import type { AccessoryType } from "../data/products";

// Generic no-photo fallback for every accessory line except watches (which
// keep their own hand-drawn WatchIllustration). A simple lettermark rather
// than a per-category illustration — cheap to extend the moment a ninth
// category shows up, and never risks looking like the wrong product type.
// See ProductVisual.tsx for the <img>-with-fallback wrapper that renders this.
const ACCENTS: Record<AccessoryType, string> = {
  watches: BRAND_COLORS.sapphire,
  sunglasses: BRAND_COLORS.ink,
  eyeglasses: BRAND_COLORS.slate,
  jewelry: BRAND_COLORS.champagneDark,
  bags: BRAND_COLORS.sapphireDeep,
  scarves: BRAND_COLORS.azure,
  belts: BRAND_COLORS.inkLight,
  hats: BRAND_COLORS.ice,
};

export function CategoryPlaceholder({
  label,
  accessoryType,
  className,
}: {
  label: string;
  accessoryType?: AccessoryType;
  className?: string;
}) {
  const accent = (accessoryType && ACCENTS[accessoryType]) || BRAND_COLORS.sapphire;
  const initial = label.charAt(0).toUpperCase();

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label}>
      <rect width="100" height="100" fill={BRAND_COLORS.haze} />
      <rect width="100" height="100" fill={accent} opacity={0.07} />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight={600}
        fontSize={42}
        fill={accent}
        opacity={0.45}
      >
        {initial}
      </text>
    </svg>
  );
}
