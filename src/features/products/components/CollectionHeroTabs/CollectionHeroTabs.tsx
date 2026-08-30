import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../../../../store/product.store";
import { CATEGORIES, getCategoryMeta } from "../../../../config/categories";
import { CategoryPlaceholder } from "../../../../components/CategoryPlaceholder";

const GENDER_IMAGES: Record<"men" | "women", string> = {
  men: "/images/category-men.jpg",
  women: "/images/category-women.jpg",
};

// Watch subcategories already have real translations from the pre-rebrand
// UI; every other line's subcategories are shown as-is (fashion terms like
// "Aviator" or "Tote" commonly stay untranslated in retail copy anyway).
const WATCH_SUBCATEGORY_KEYS: Record<string, string> = {
  GMT: "products.catGMT",
  Dress: "products.catDress",
  Diver: "products.catDiver",
  Chronograph: "products.catChronograph",
  Skeleton: "products.catSkeleton",
  Field: "products.catField",
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CollectionHeroTabs: React.FC = () => {
  const { t } = useTranslation();
  const {
    genderFilter,
    setGenderFilter,
    selectedAccessoryType,
    setSelectedAccessoryType,
    selectedCategory,
    setSelectedCategory,
    allProducts,
  } = useProductStore();

  const subcategoryLabel = (sub: string) =>
    WATCH_SUBCATEGORY_KEYS[sub] ? t(WATCH_SUBCATEGORY_KEYS[sub]) : sub;

  // Accessory lines that contain at least one bestseller or featured product
  const popularAccessoryTypes = useMemo(
    () =>
      new Set<string>(
        allProducts
          .filter((p) => p.tags.includes("bestseller") || p.featured)
          .map((p) => p.accessoryType)
      ),
    [allProducts]
  );

  // Product count per accessory line, scoped to the active gender tab
  const accessoryTypeCounts = useMemo(() => {
    const base =
      genderFilter !== "all"
        ? allProducts.filter((p) => p.gender === genderFilter || p.gender === "unisex")
        : allProducts;
    return base.reduce<Record<string, number>>((acc, p) => {
      acc[p.accessoryType] = (acc[p.accessoryType] || 0) + 1;
      return acc;
    }, {});
  }, [allProducts, genderFilter]);

  // Subcategory list + counts for the currently selected accessory line —
  // drives the second-level chip row below (e.g. GMT/Dress/Diver within
  // Watches, or Tote/Crossbody within Bags).
  const activeCategoryMeta = selectedAccessoryType !== "All" ? getCategoryMeta(selectedAccessoryType) : undefined;
  const subcategoryCounts = useMemo(() => {
    if (selectedAccessoryType === "All") return {};
    const base = allProducts.filter(
      (p) =>
        p.accessoryType === selectedAccessoryType &&
        (genderFilter === "all" || p.gender === genderFilter || p.gender === "unisex")
    );
    return base.reduce<Record<string, number>>((acc, p) => {
      acc[p.subcategory] = (acc[p.subcategory] || 0) + 1;
      return acc;
    }, {});
  }, [allProducts, selectedAccessoryType, genderFilter]);

  // Product count per gender — drives the "Coming Soon" ribbon on a tab
  // that has no live pieces yet
  const genderCounts = useMemo(
    () => ({
      men: allProducts.filter((p) => p.gender === "men" || p.gender === "unisex").length,
      women: allProducts.filter((p) => p.gender === "women" || p.gender === "unisex").length,
    }),
    [allProducts]
  );

  const handleTabClick = (tab: "men" | "women") => {
    setGenderFilter(genderFilter === tab ? "all" : tab);
  };

  const handleCategoryClick = (id: string) => {
    setSelectedAccessoryType(selectedAccessoryType === id ? "All" : (id as typeof selectedAccessoryType));
  };

  return (
    <div className="mb-8">

      {/* ── Primary hero tabs ── */}
      <div className="grid grid-cols-2 gap-3 md:gap-5 mb-5">
        {(["men", "women"] as const).map((tab) => {
          const isActive = genderFilter === tab;
          const isComingSoon = genderCounts[tab] === 0;

          return (
            <motion.button
              key={tab}
              onClick={() => handleTabClick(tab)}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.15 }}
              className={`relative overflow-hidden rounded-md h-40 sm:h-52 md:h-60 group focus-visible:outline-none ${
                isActive ? "ring-2 ring-champagne ring-offset-2 ring-offset-frost" : ""
              }`}
            >
              {/* Background photo */}
              <img
                src={GENDER_IMAGES[tab]}
                alt={t(tab === "men" ? "products.tabMen" : "products.tabWomen")}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Darken for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-chrome-deep/80 via-chrome-deep/30 to-chrome-deep/10" />

              {/* Flat tint */}
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  isActive ? "bg-black/10" : "bg-black/0 group-hover:bg-black/10"
                }`}
              />

              {/* Coming Soon ribbon — this tab has no live pieces yet */}
              {isComingSoon && (
                <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-champagne text-ink text-[8.5px] sm:text-[9px] font-black uppercase tracking-widest rounded-sm shadow-sm">
                  {t("card.comingSoon")}
                </span>
              )}

              {/* Label */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-4">
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-champagne text-base leading-none"
                  >
                    ✦
                  </motion.span>
                )}
                <span className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                  {t(tab === "men" ? "products.tabMen" : "products.tabWomen")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 text-center">
                  {t(tab === "men" ? "products.tabMenSub" : "products.tabWomenSub")}
                </span>
              </div>

              {/* Active sliding underbar */}
              {isActive && (
                <motion.div
                  layoutId="genderActiveBar"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-champagne"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Category chips — the 8 accessory lines ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key="categories"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Section label */}
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-ink/65 mb-3">
            {t("products.shopByCategory")}
          </p>

          {/* Horizontal scroll on mobile, wraps on md+ */}
          <div className="flex gap-2.5 overflow-x-auto -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat, i) => {
              const isActive = selectedAccessoryType === cat.id;
              const isPopular = popularAccessoryTypes.has(cat.id);
              const count = accessoryTypeCounts[cat.id] ?? 0;
              const isComingSoon = count === 0;

              return (
                <motion.button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.32, ease: EASE }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.93 }}
                  className={`relative flex-shrink-0 w-[82px] sm:w-[96px] h-[100px] sm:h-[116px] rounded-md overflow-hidden focus-visible:outline-none transition-opacity duration-200 group ${
                    isActive
                      ? "ring-2 ring-champagne ring-offset-1 ring-offset-frost"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Background photo, or a generic lettermark where no photography exists yet */}
                  {cat.hasPhoto ? (
                    <img
                      src={cat.heroImage}
                      alt={t(cat.labelKey)}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isComingSoon ? "opacity-50" : ""}`}
                    />
                  ) : (
                    <CategoryPlaceholder
                      label={t(cat.labelKey)}
                      accessoryType={cat.id}
                      className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110 ${isComingSoon ? "opacity-50" : ""}`}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-chrome-deep/85 via-chrome-deep/15 to-transparent" />

                  {/* Bestseller / featured indicator — top-right champagne star */}
                  {isPopular && (
                    <span className="absolute top-2 right-2 text-champagne text-[11px] leading-none drop-shadow">
                      ★
                    </span>
                  )}

                  {/* Active champagne dot — top-left */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-champagne"
                    />
                  )}

                  {/* Label + piece count */}
                  <div className="absolute bottom-0 left-0 right-0 px-2 pb-2.5">
                    <span className="block text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.1em] text-white leading-tight">
                      {t(cat.labelKey)}
                    </span>
                    {isComingSoon ? (
                      <span className="block text-[7px] font-black uppercase tracking-widest text-champagne mt-0.5 leading-none">
                        {t("card.comingSoon")}
                      </span>
                    ) : (
                      <span className="block text-[7px] font-bold text-white/50 mt-0.5 leading-none">
                        {t("products.pieces", { count })}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Subcategory chips — appears once a specific line is picked ── */}
      <AnimatePresence>
        {activeCategoryMeta && activeCategoryMeta.subcategories.length > 0 && (
          <motion.div
            key={`sub-${activeCategoryMeta.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-4">
              {activeCategoryMeta.subcategories.map((sub) => {
                const isActive = selectedCategory === sub;
                const count = subcategoryCounts[sub] ?? 0;

                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedCategory(isActive ? "All" : sub)}
                    className={`px-3.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                      isActive
                        ? "bg-ink text-white border-ink"
                        : "border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink"
                    }`}
                  >
                    {subcategoryLabel(sub)}
                    {count > 0 && <span className="ml-1.5 opacity-50">{count}</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionHeroTabs;
