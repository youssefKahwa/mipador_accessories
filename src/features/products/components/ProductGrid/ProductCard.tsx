import React from "react";
import type { Product } from "../../../../store/product.store";
import { useProductStore } from "../../../../store/product.store";
import { useParams, Link } from "react-router-dom";
import { Bookmark, Heart, Cog, Ruler, Droplets, Tag, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { localizeProduct } from "../../../../utils/localizeProduct";
import { ProductVisual } from "../../../../components/ProductVisual";
import { getRefCode } from "../../../../utils/refCode";

// Two quick facts per non-watch line for the hover spec strip — mirrors the
// movement/diameter/water-resistance strip watches get, without needing a
// bespoke layout per accessory type.
function nonWatchSpecSummary(product: Product): [string, string] | null {
  const specs = product.specs;
  switch (specs.kind) {
    case "sunglasses":
    case "eyeglasses":
      return [specs.frameMaterial, specs.uvProtection ?? specs.lensType ?? specs.warranty];
    case "jewelry":
      return [specs.metal, specs.stone ?? (specs.hypoallergenic ? "Hypoallergenic" : specs.warranty)];
    case "bags":
      return [specs.material, specs.closureType ?? specs.warranty];
    case "scarves":
      return [specs.fabric, `${specs.dimensions.length}×${specs.dimensions.width}cm`];
    case "belts":
      return [specs.material, specs.buckleType ?? specs.warranty];
    case "hats":
      return [specs.material, specs.sizeRange[0] ?? specs.warranty];
    default:
      return null;
  }
}

const ProductCard: React.FC<{ product: Product }> = ({ product: rawProduct }) => {
  const { addToCart, toggleWishlist } = useProductStore();
  const wishlist = useProductStore((s) => s.wishlist);
  const wishlisted = wishlist.includes(rawProduct.id);
  const { t } = useTranslation();
  const isComingSoon = rawProduct.status === "coming-soon";
  const isOutOfStock = rawProduct.status === "out-of-stock";
  const isUnavailable = isComingSoon || isOutOfStock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUnavailable) addToCart(rawProduct.id);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(rawProduct.id);
  };

  const { lang } = useParams();
  const currentLang = lang || "fr";
  const product = localizeProduct(rawProduct, currentLang);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-7, 7]);

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      whileHover={isUnavailable ? {} : { y: -6 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <Link
        to={`/${currentLang}/products/${product.slug}`}
        className="flex flex-col group"
      >
        {/* Image */}
        <motion.div
          onMouseMove={isUnavailable ? undefined : handleTiltMove}
          onMouseLeave={isUnavailable ? undefined : handleTiltLeave}
          style={isUnavailable ? undefined : { rotateX, rotateY, transformPerspective: 700 }}
          className="relative aspect-[4/5] rounded-md bg-cloud overflow-hidden border border-ink/8 transition-all duration-300 group-hover:border-ink/20 group-hover:shadow-[0_16px_48px_rgba(11,18,36,0.14)]">

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
            {product.tags.includes("new") && (
              <span className="px-2 py-1 bg-champagne text-ink font-mono text-[8.5px] font-bold uppercase tracking-widest rounded-sm">
                {t("card.new")}
              </span>
            )}
            {product.tags.includes("bestseller") && (
              <span className="px-2 py-1 bg-chrome text-white font-mono text-[8.5px] font-bold uppercase tracking-widest rounded-sm">
                {t("card.bestseller")}
              </span>
            )}
            {isComingSoon && (
              <span className="px-2 py-1 bg-white/90 text-ink font-mono text-[8.5px] font-bold uppercase tracking-widest rounded-sm">
                {t("card.comingSoon")}
              </span>
            )}
            {isOutOfStock && (
              <span className="px-2 py-1 bg-white/90 text-ink/65 font-mono text-[8.5px] font-bold uppercase tracking-widest rounded-sm">
                {t("card.soldOut")}
              </span>
            )}
          </div>

          {/* Reference code */}
          <div className="absolute top-2.5 right-2.5 z-20 px-2 py-1 bg-ink/70 backdrop-blur-sm rounded-sm">
            <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-white/80">
              {getRefCode(product)}
            </p>
          </div>

          {/* Image */}
          <div className={`w-full h-full transition-all duration-700 ${isComingSoon ? "blur-lg opacity-40" : ""}`}>
            <ProductVisual
              src={product.images[0]}
              alt={product.name}
              dialColor={product.colorSwatches?.[0]}
              strapColor={product.colorSwatches?.[1] ?? product.colorSwatches?.[0]}
              accessoryType={product.accessoryType}
              categoryLabel={product.subcategory}
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              containerClassName="w-full h-full"
            />
          </div>

          {/* Hover-reveal spec strip — replaces the old tilt/"view details" gimmick. */}
          {!isUnavailable && product.specs.kind === "watches" && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-ink/92 backdrop-blur-sm hidden md:flex items-center justify-around py-3 px-2">
              <div className="flex flex-col items-center gap-1">
                <Cog size={13} className="text-white/50" />
                <span className="font-mono text-[8px] text-white/70 uppercase tracking-wider">{t(`product.movement.${product.specs.movement}`)}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Ruler size={13} className="text-white/50" />
                <span className="font-mono text-[8px] text-white/70 uppercase tracking-wider">{product.specs.caseDiameter}mm</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Droplets size={13} className="text-white/50" />
                <span className="font-mono text-[8px] text-white/70 uppercase tracking-wider">{product.specs.waterResistance}</span>
              </div>
            </div>
          )}
          {!isUnavailable && product.specs.kind !== "watches" && nonWatchSpecSummary(product) && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-ink/92 backdrop-blur-sm hidden md:flex items-center justify-around py-3 px-2">
              <div className="flex flex-col items-center gap-1">
                <Tag size={13} className="text-white/50" />
                <span className="font-mono text-[8px] text-white/70 uppercase tracking-wider">{nonWatchSpecSummary(product)![0]}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={13} className="text-white/50" />
                <span className="font-mono text-[8px] text-white/70 uppercase tracking-wider">{nonWatchSpecSummary(product)![1]}</span>
              </div>
            </div>
          )}

          {/* Wishlist toggle */}
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 1.25 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label={wishlisted ? t("wishlist.remove") : t("wishlist.add")}
            className="absolute bottom-2.5 right-2.5 z-30 w-9 h-9 rounded-sm bg-white/85 backdrop-blur-sm flex items-center justify-center hover:bg-surface transition-colors border border-ink/8"
          >
            <Heart
              size={13}
              className={`transition-all duration-200 ${wishlisted ? "text-ink fill-ink" : "text-ink/65"}`}
            />
          </motion.button>
        </motion.div>

        {/* Info */}
        <div className="mt-3.5 flex flex-col">
          <p className="text-ink/50 font-mono text-[8.5px] font-bold uppercase tracking-[0.2em]">
            {product.collection}
          </p>
          <h3 className="text-sm font-black text-ink tracking-tight mt-1">
            {product.name}
          </h3>
          <p className="text-ink/60 text-xs italic mt-0.5 leading-relaxed">
            {product.tagline}
          </p>

          <div className="flex items-center justify-between mt-2.5">
            <p className="font-mono text-ink font-bold text-sm tabular-nums">
              {product.price.toLocaleString()} MAD
            </p>
            {!isUnavailable && (
              <p className="text-ink/50 font-mono text-[8.5px] uppercase tracking-wider">
                {product.leadTime}
              </p>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={isUnavailable}
            className={`mt-3 w-full py-2.5 font-mono text-[9px] font-bold uppercase tracking-widest rounded-sm border flex items-center justify-center gap-2 transition-all duration-300 ${
              isUnavailable
                ? "bg-ink/5 border-ink/8 text-ink/40 cursor-not-allowed"
                : "bg-chrome border-ink text-white hover:bg-chrome-light active:scale-[0.97]"
            }`}
          >
            {isComingSoon ? (
              t("card.comingSoon")
            ) : isOutOfStock ? (
              t("card.soldOut")
            ) : (
              <>
                <Bookmark size={11} />
                {t("card.reserveYours")}
              </>
            )}
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
