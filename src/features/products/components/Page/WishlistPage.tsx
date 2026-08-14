import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../../../../store/product.store";
import ProductCard from "../ProductGrid/ProductCard";
import { useSEO } from "../../../../hooks/useSEO";
import { AlbatrossMark } from "../../../../components/AlbatrossMark";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: EASE },
  }),
};

export default function WishlistPage() {
  const { t } = useTranslation();
  useSEO(t("wishlist.heading"));
  const { lang } = useParams();
  const currentLang = lang || "fr";
  const getWishlistProducts = useProductStore((s) => s.getWishlistProducts);
  const wishlistProducts = getWishlistProducts();

  return (
    <div className="bg-cream min-h-screen px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-espresso/65 mb-4">
            {t("products.studio")}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-espresso tracking-tight leading-none mb-4">
            {t("wishlist.heading")}
          </h1>
          {wishlistProducts.length > 0 && (
            <p className="text-espresso/65 text-sm font-light">
              {t("wishlist.count", { count: wishlistProducts.length })}
            </p>
          )}
        </motion.div>

        {/* Empty state */}
        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="relative flex flex-col items-center justify-center py-24 text-center overflow-hidden"
          >
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-full max-w-xs text-espresso opacity-[0.04]">
                <AlbatrossMark />
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-espresso/5 flex items-center justify-center mb-6">
                <Heart size={28} className="text-espresso/65" />
              </div>
              <p className="text-espresso font-black text-sm uppercase tracking-widest mb-2">
                {t("wishlist.empty")}
              </p>
              <p className="text-espresso/65 text-xs font-light mb-8 max-w-xs leading-relaxed">
                {t("wishlist.emptyHint")}
              </p>
              <Link
                to={`/${currentLang}/products`}
                className="text-[10px] font-black uppercase tracking-widest text-espresso border-b border-espresso/30 pb-0.5 hover:border-espresso transition-colors"
              >
                {t("wishlist.exploreCollection")}
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
