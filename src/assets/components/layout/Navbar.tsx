import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";
import { useProductStore } from "../../../store/product.store";
import { SITE } from "../../../config/site";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = lang || "fr";
  const { t } = useTranslation();

  const cartOpen = useProductStore((s) => s.cartOpen);
  const setCartOpen = useProductStore((s) => s.setCartOpen);

  const cartCount = useProductStore((s) =>
    s.cart
      .filter((i) => s.allProducts.some((p) => p.id === i.productId))
      .reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useProductStore((s) => s.getWishlistCount());

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  const isHome = location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`;
  const onHero = isHome && !scrolled;

  const navItems = [
    { label: t("nav.collection"), path: `/${currentLang}/products` },
    { label: t("nav.about"),      path: `/${currentLang}/about` },
    { label: t("nav.contact"),    path: `/${currentLang}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress accent — subtle, GPU-cheap (transform only) */}
      <motion.div
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-40 h-0.5 bg-gold origin-left transition-opacity duration-300 ${
          cartOpen ? "opacity-0" : "opacity-100"
        }`}
        style={{ scaleX: scrollProgress }}
      />
    <div
      className={`fixed top-0 left-0 right-0 z-30 flex justify-center transition-all duration-500 ${
        cartOpen ? "opacity-0 pointer-events-none" : ""
      } ${onHero ? "px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 lg:pt-5" : "px-4 pt-4"}`}
    >
      <nav
        className={`nav-entrance transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-full max-w-2xl bg-cream/92 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-xl border border-white/10"
            : onHero
            ? "w-full bg-transparent rounded-xl"
            : "w-full max-w-7xl bg-transparent rounded-xl"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "px-6 py-3" : "px-5 py-4"
          }`}
        >
          {/* Logo */}
          <Link to={`/${currentLang}`} className="shrink-0">
            <img
              src={SITE.logo.nav.src}
              srcSet={SITE.logo.nav.srcSet}
              sizes={SITE.logo.nav.sizes}
              alt={SITE.brandName}
              width={SITE.logo.nav.width}
              height={SITE.logo.nav.height}
              className="h-7 w-auto object-contain transition-all duration-500"
              style={onHero ? { filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.5))" } : undefined}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-bold transition-all duration-300 group ${
                  onHero
                    ? `drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] ${
                        location.pathname === item.path ? "text-white" : "text-white/90 hover:text-white"
                      }`
                    : location.pathname === item.path
                    ? "text-espresso"
                    : "text-espresso/65 hover:text-espresso hover:tracking-[0.02em]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    onHero ? "bg-tan" : "bg-espresso"
                  } ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitcher compact={scrolled} />

            {/* Wishlist button */}
            <Link
              to={`/${currentLang}/wishlist`}
              aria-label={t("wishlist.heading")}
              className={`hidden md:flex relative w-11 h-11 items-center justify-center rounded-xl transition-colors ${
                onHero ? "hover:bg-white/10" : "hover:bg-espresso/5"
              }`}
            >
              <Heart size={17} className={onHero ? "text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]" : "text-espresso"} />
              <AnimatePresence mode="popLayout">
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 22 }}
                    className={`absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 flex items-center justify-center rounded-full text-[9px] font-black leading-none pointer-events-none ${
                      onHero ? "bg-cream text-espresso-deep" : "bg-espresso text-white"
                    }`}
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart button with animated badge */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={
                cartCount > 0
                  ? t("nav.openCartCount", { count: cartCount })
                  : t("nav.openCart")
              }
              className={`hidden md:flex relative w-11 h-11 items-center justify-center rounded-xl transition-colors ${
                onHero ? "hover:bg-white/10" : "hover:bg-espresso/5"
              }`}
            >
              <ShoppingBag size={17} className={onHero ? "text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]" : "text-espresso"} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 22 }}
                    className={`absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 flex items-center justify-center rounded-full text-[9px] font-black leading-none pointer-events-none ${
                      onHero ? "bg-cream text-espresso-deep" : "bg-espresso text-white"
                    }`}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <Link
                    to={`/${currentLang}/products`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`hidden md:flex items-center justify-center text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm whitespace-nowrap ${
                      onHero
                        ? "bg-cream text-espresso-deep hover:bg-white"
                        : "bg-espresso text-white hover:bg-espresso-light"
                    }`}
                  >
                    {t("nav.discover")}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors ${
                onHero ? "hover:bg-white/10" : "hover:bg-espresso/5"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t("nav.toggleMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block h-px w-5 ${onHero ? "bg-white" : "bg-espresso"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block h-px w-4 ${onHero ? "bg-white" : "bg-espresso"}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block h-px w-5 ${onHero ? "bg-white" : "bg-espresso"}`}
              />
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
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className={`md:hidden overflow-hidden backdrop-blur-2xl ${
                onHero ? "border-t border-white/15 bg-black/35" : "border-t border-espresso/10 bg-cream/95"
              }`}
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-bold transition-colors duration-300 ${
                      onHero
                        ? location.pathname === item.path
                          ? "text-white"
                          : "text-white/55"
                        : location.pathname === item.path
                        ? "text-espresso"
                        : "text-espresso/65"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  to={`/${currentLang}/wishlist`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 text-base font-bold transition-colors duration-300 ${
                    onHero
                      ? location.pathname.includes("/wishlist")
                        ? "text-white"
                        : "text-white/55"
                      : location.pathname.includes("/wishlist")
                      ? "text-espresso"
                      : "text-espresso/65"
                  }`}
                >
                  <Heart size={16} />
                  {t("wishlist.heading")}
                  {wishlistCount > 0 && (
                    <span
                      className={`ml-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[9px] font-black ${
                        onHero ? "bg-cream text-espresso-deep" : "bg-espresso text-white"
                      }`}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className={`flex items-center gap-2 text-base font-bold transition-colors duration-300 ${
                    onHero ? "text-white/55" : "text-espresso/65"
                  }`}
                >
                  <ShoppingBag size={16} />
                  {t("nav.openCart")}
                  {cartCount > 0 && (
                    <span
                      className={`ml-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[9px] font-black ${
                        onHero ? "bg-cream text-espresso-deep" : "bg-espresso text-white"
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>

                <Link
                  to={`/${currentLang}/products`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-center w-full text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-colors ${
                    onHero
                      ? "bg-cream text-espresso-deep hover:bg-white"
                      : "bg-espresso text-white hover:bg-espresso-light"
                  }`}
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
