import { useState } from "react";
import { toWebp } from "../utils/image";
import { WatchIllustration } from "./WatchIllustration";
import { CategoryPlaceholder } from "./CategoryPlaceholder";
import type { AccessoryType } from "../data/products";

// Renders the real product photo if one exists at `src`, and falls back to
// a code-drawn placeholder the instant that photo 404s — which right now is
// every product, since this launch ships with zero photography. Watches get
// the hand-drawn WatchIllustration (tinted to the product's own colorway);
// every other accessory line gets the generic CategoryPlaceholder lettermark
// so a necklace or tote never renders as a watch face. Drop real files into
// /public/images/products/ matching the paths already set on each product
// in data/products.ts and this starts rendering them automatically, no
// code changes required.
export function ProductVisual({
  src,
  alt,
  dialColor,
  strapColor,
  variant = 0,
  accessoryType,
  categoryLabel,
  imgClassName,
  containerClassName,
}: {
  src?: string;
  alt: string;
  dialColor?: string;
  strapColor?: string;
  variant?: number;
  accessoryType?: AccessoryType;
  categoryLabel?: string;
  imgClassName?: string;
  containerClassName?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={containerClassName}>
        {accessoryType && accessoryType !== "watches" ? (
          <CategoryPlaceholder
            label={categoryLabel ?? accessoryType}
            accessoryType={accessoryType}
            className={imgClassName}
          />
        ) : (
          <WatchIllustration
            dialColor={dialColor}
            strapColor={strapColor}
            variant={variant}
            className={imgClassName}
          />
        )}
      </div>
    );
  }

  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={toWebp(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={imgClassName}
        onError={() => setErrored(true)}
      />
    </picture>
  );
}
