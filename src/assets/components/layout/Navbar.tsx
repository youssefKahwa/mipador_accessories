import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";
import { useProductStore } from "../../../store/product.store";
import { SITE } from "../../../config/site";
import { CATEGORIES } from "../../../config/categories";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { useClock } from "../../../hooks/useClock";

const TICKER_KEYS = ["nav.ticker1", "nav.ticker2", "nav.ticker3", "nav.ticker4"];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = lang || "fr";
  const { t } = useTranslation();
  const now = useClock();

  const cartOpen = useProductStore((s) => s.cartOpen);
  const setCartOpen = useProductStore((s) => s.setCartOpen);

  const cartCount = useProductStore((s) =>
    s.cart
      .filter((i) => s.allProducts.some((p) => p.id === i.productId))
      .reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useProductStore((s) => s.getWishlistCount());

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  const navItems = [
    { label: t("nav.findYourMatch"), path: `/${currentLang}/tools/find-your-match` },
    { label: t("nav.about"),      path: `/${currentLang}/about` },
    { label: t("nav.contact"),    path: `/${currentLang}/contact` },
  ];

  const timeString = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <>
      {/* Scroll progress accent — subtle, GPU-cheap (transform only) */}
      <motion.div
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-40 h-0.5 bg-champagne origin-left transition-opacity duration-300 ${
          cartOpen ? "opacity-0" : "opacity-100"
        }`}
        style={{ scaleX: scrollProgress }}
      />
    <div
      className={`fixed top-0 inset-x-0 z-30 transition-opacity duration-300 ${
        cartOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ── Ticker strip ── */}
      <div className="hidden sm:block bg-chrome-deep border-b border-white/8 overflow-hidden h-7">
        <div className="flex items-center h-full animate-marquee">
          {[...TICKER_KEYS, ...TICKER_KEYS].map((key, i) => (
            <span
              key={i}
              className="shrink-0 flex items-center gap-6 font-mono text-[9.5px] tracking-[0.15em] text-white/55 uppercase px-6"
            >
              {t(key)}
              <span className="text-champagne/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main bar ── */}
      <nav className="nav-entrance bg-chrome border-b border-white/10">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6">

          {/* Logo — the shared Mipador mark, inverted to white for this dark navbar */}
          <Link to={`/${currentLang}`} className="shrink-0 flex items-center gap-2.5" aria-label={SITE.brandName}>
            <img
              src={SITE.logo.nav.src}
              srcSet={SITE.logo.nav.srcSet}
              sizes={SITE.logo.nav.sizes}
              alt={SITE.brandShort}
              width={SITE.logo.nav.width}
              height={SITE.logo.nav.height}
              className="h-7 sm:h-8 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="font-display leading-none text-white/60 text-[8.5px] tracking-[0.4em] uppercase">
              {t("nav.propertyTag")}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Collection — hover mega-menu over the 8 accessory lines */}
            <div className="relative group py-2">
              <Link
                to={`/${currentLang}/products`}
                className={`relative flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
                  location.pathname === `/${currentLang}/products` ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {t("nav.collection")}
                <ChevronDown size={12} className="transition-transform duration-200 group-hover:rotate-180" />
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-champagne transition-all duration-300 ${
                    location.pathname === `/${currentLang}/products` ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-40">
                <div className="bg-chrome border border-white/10 rounded-lg shadow-2xl p-3 grid grid-cols-2 gap-1 w-[380px]">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/${currentLang}/products?accessoryType=${cat.id}`}
                      className="px-3 py-2.5 rounded-md hover:bg-white/8 text-white/75 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      {t(cat.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 group ${
                  location.pathname === item.path ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-champagne transition-all duration-300 ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live clock — desktop only */}
            <div className="hidden md:flex items-center gap-1.5 border border-white/12 rounded-md px-2.5 py-1.5 font-mono text-[10.5px] text-white/75 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
              {timeString}
            </div>

            <LanguageSwitcher compact />

            <ThemeToggle className="hidden md:flex" />

            <Link
              to={`/${currentLang}/wishlist`}
              aria-label={t("wishlist.heading")}
              className="hidden md:flex relative w-10 h-10 items-center justify-center rounded-md border border-white/12 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5 transition-colors"
            >
              <Heart size={15} />
              <AnimatePresence mode="popLayout">
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 22 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-sm bg-champagne text-ink font-mono text-[9px] font-bold leading-none pointer-events-none"
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              aria-label={
                cartCount > 0
                  ? t("nav.openCartCount", { count: cartCount })
                  : t("nav.openCart")
              }
              className="hidden md:flex relative w-10 h-10 items-center justify-center rounded-md border border-white/12 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5 transition-colors"
            >
              <ShoppingBag size={15} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 22 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-sm bg-champagne text-ink font-mono text-[9px] font-bold leading-none pointer-events-none"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              to={`/${currentLang}/products`}
              className="hidden lg:flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] px-4 py-2.5 rounded-md bg-champagne text-ink hover:bg-champagne-dark transition-colors"
            >
              {t("nav.discover")}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md border border-white/12 text-white transition-colors hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t("nav.toggleMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-chrome-deep"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {/* Collection — expandable accordion over the 8 accessory lines */}
                <div>
                  <button
                    onClick={() => setIsMobileCollectionOpen((v) => !v)}
                    className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-widest text-white/75"
                    aria-expanded={isMobileCollectionOpen}
                  >
                    {t("nav.collection")}
                    <ChevronDown size={15} className={`transition-transform duration-200 ${isMobileCollectionOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isMobileCollectionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3.5 pt-4 pl-1">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/${currentLang}/products?accessoryType=${cat.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                            >
                              {t(cat.labelKey)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${
                      location.pathname === item.path ? "text-white" : "text-white/75"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to={`/${currentLang}/wishlist`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md border border-white/15 text-white/80 text-xs font-bold uppercase tracking-wider"
                  >
                    <Heart size={14} /> {t("wishlist.heading")} {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setCartOpen(true); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md border border-white/15 text-white/80 text-xs font-bold uppercase tracking-wider"
                  >
                    <ShoppingBag size={14} /> {t("nav.openCart")} {cartCount > 0 && `(${cartCount})`}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[11px] text-white/55 tabular-nums">{timeString}</span>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>

                <Link
                  to={`/${currentLang}/products`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center w-full text-xs font-black uppercase tracking-widest py-3.5 rounded-md bg-champagne text-ink"
                >
                  {t("nav.discoverCollection")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
    </>
  );
};

export default Navbar;
