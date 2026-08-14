import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../../../../store/product.store";

// TODO: Replace hero images with dedicated indoor/outdoor lifestyle photography
const INDOOR_HERO = "/images/products/indoor.webp";
const OUTDOOR_HERO = "/images/products/outdoor.webp";

// Representative image per subcategory — maps to the best matching product shot
// TODO: Update each entry as dedicated category photography becomes available
const CAT_IMAGES: Record<string, string> = {
  "Wall Art":         "/images/products/wallart.webp",
  "Seating":          "/images/products/seating.webp",
  "Tables":           "/images/products/table.webp",
  "Lighting":         "/images/products/lighting.webp",
  "Decor":            "/images/products/decor.webp",
  "Shelving":         "/images/products/shelving.webp",
  "Storage":          "/images/products/storage.webp",
  "Beds":             "/images/products/beds.webp",
  "Outdoor Seating":  "/images/products/outdoorSeating.webp",
  "Outdoor Tables":   "/images/products/outdoorTables.webp",
  "Outdoor Lighting": "/images/products/outdoorLighting.webp",
  "Outdoor Decor":    "/images/products/outdoorDecor.webp",
};

const INDOOR_SUBS = [
  { key: "products.subWallArt",  value: "Wall Art" },
  { key: "products.subSeating",  value: "Seating"  },
  { key: "products.subTables",   value: "Tables"   },
  { key: "products.subLighting", value: "Lighting" },
  { key: "products.subDecor",    value: "Decor"    },
  { key: "products.subShelving", value: "Shelving" },
  { key: "products.subStorage",  value: "Storage"  },
  { key: "products.subBeds",     value: "Beds"     },
] as const;

const OUTDOOR_SUBS = [
  { key: "products.subOutdoorSeating",  value: "Outdoor Seating"  },
  { key: "products.subOutdoorTables",   value: "Outdoor Tables"   },
  { key: "products.subOutdoorLighting", value: "Outdoor Lighting" },
  { key: "products.subOutdoorDecor",    value: "Outdoor Decor"    },
] as const;

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CollectionHeroTabs: React.FC = () => {
  const { t } = useTranslation();
  const {
    locationFilter,
    setLocationFilter,
    selectedCategory,
    setSelectedCategory,
    allProducts,
  } = useProductStore();

  // Categories that contain at least one bestseller or featured product
  const popularCategories = useMemo(
    () =>
      new Set<string>(
        allProducts
          .filter((p) => p.tags.includes("bestseller") || p.featured)
          .map((p) => p.category)
      ),
    [allProducts]
  );

  // Product count per category, scoped to the active location tab
  const categoryCounts = useMemo(() => {
    const base =
      locationFilter !== "all"
        ? allProducts.filter((p) => p.location === locationFilter)
        : allProducts;
    return base.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
  }, [allProducts, locationFilter]);

  // Product count per location — drives the "Coming Soon" ribbon on a tab
  // that has no live pieces yet (e.g. Outdoor, while launch focuses on Wall Art)
  const locationCounts = useMemo(
    () => ({
      indoor: allProducts.filter((p) => p.location === "indoor").length,
      outdoor: allProducts.filter((p) => p.location === "outdoor").length,
    }),
    [allProducts]
  );

  const handleTabClick = (tab: "indoor" | "outdoor") => {
    setLocationFilter(locationFilter === tab ? "all" : tab);
    setSelectedCategory("All");
  };

  const handleSubClick = (catValue: string) => {
    setSelectedCategory(selectedCategory === catValue ? "All" : catValue);
  };

  const activeSubs =
    locationFilter === "indoor"
      ? INDOOR_SUBS
      : locationFilter === "outdoor"
      ? OUTDOOR_SUBS
      : [];

  return (
    <div className="mb-8">

      {/* ── Primary hero tabs ── */}
      <div className="grid grid-cols-2 gap-3 md:gap-5 mb-5">
        {(["indoor", "outdoor"] as const).map((tab) => {
          const isActive = locationFilter === tab;
          const heroImg = tab === "indoor" ? INDOOR_HERO : OUTDOOR_HERO;
          const isComingSoon = locationCounts[tab] === 0;

          return (
            <motion.button
              key={tab}
              onClick={() => handleTabClick(tab)}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.15 }}
              className={`relative overflow-hidden rounded-2xl h-40 sm:h-52 md:h-60 group focus-visible:outline-none ${
                isActive ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : ""
              }`}
            >
              {/* Photo */}
              <img
                src={heroImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Flat tint */}
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  isActive
                    ? "bg-espresso/52"
                    : "bg-espresso/40 group-hover:bg-espresso/28"
                }`}
              />

              {/* Bottom-up gradient keeps label crisp */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-espresso-950/80 to-transparent pointer-events-none" />

              {/* Coming Soon ribbon — this space has no live pieces yet */}
              {isComingSoon && (
                <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-gold text-espresso text-[8.5px] sm:text-[9px] font-black uppercase tracking-widest rounded-xl shadow-sm">
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
                    className="text-gold text-base leading-none"
                  >
                    ✦
                  </motion.span>
                )}
                <span className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                  {t(tab === "indoor" ? "products.tabIndoor" : "products.tabOutdoor")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 text-center">
                  {t(tab === "indoor" ? "products.tabIndoorSub" : "products.tabOutdoorSub")}
                </span>
              </div>

              {/* Active sliding underbar */}
              {isActive && (
                <motion.div
                  layoutId="locationActiveBar"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Subcategory visual image cards ── */}
      <AnimatePresence mode="wait">
        {activeSubs.length > 0 && (
          <motion.div
            key={locationFilter}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Section label */}
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-espresso/65 mb-3">
              {t("products.shopByCategory")}
            </p>

            {/* Horizontal scroll on mobile, wraps on md+ */}
            <div className="flex gap-2.5 overflow-x-auto -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeSubs.map((sub, i) => {
                const isActive = selectedCategory === sub.value;
                const isPopular = popularCategories.has(sub.value);
                const count = categoryCounts[sub.value] ?? 0;
                const isComingSoon = count === 0;
                const img = CAT_IMAGES[sub.value] ?? INDOOR_HERO;

                return (
                  <motion.button
                    key={sub.value}
                    onClick={() => handleSubClick(sub.value)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.32, ease: EASE }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.93 }}
                    className={`relative flex-shrink-0 w-[82px] sm:w-[96px] h-[100px] sm:h-[116px] rounded-xl overflow-hidden focus-visible:outline-none transition-opacity duration-200 group ${
                      isActive
                        ? "ring-2 ring-gold ring-offset-1 ring-offset-cream"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {/* Category photo */}
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        isComingSoon ? "grayscale-[0.5]" : ""
                      }`}
                    />

                    {/* Bottom-up gradient keeps text crisp */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/92 via-espresso-950/25 to-transparent" />

                    {/* Bestseller / featured indicator — top-right gold star */}
                    {isPopular && (
                      <span className="absolute top-2 right-2 text-gold text-[11px] leading-none drop-shadow">
                        ★
                      </span>
                    )}

                    {/* Active gold dot — top-left */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gold"
                      />
                    )}

                    {/* Label + piece count */}
                    <div className="absolute bottom-0 left-0 right-0 px-2 pb-2.5">
                      <span className="block text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.1em] text-white leading-tight">
                        {t(sub.key)}
                      </span>
                      {isComingSoon ? (
                        <span className="block text-[7px] font-black uppercase tracking-widest text-gold mt-0.5 leading-none">
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionHeroTabs;
