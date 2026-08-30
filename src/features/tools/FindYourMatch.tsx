import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, MessageCircle } from "lucide-react";
import { STYLE_PROFILES, WEAR_OCCASIONS, WEAR_ICONS, type StyleId } from "./styleData";
import { useStyleStore } from "../../store/style.store";
import { useProductStore } from "../../store/product.store";
import ProductCard from "../products/components/ProductGrid/ProductCard";
import { MeridianIcon } from "../../components/MeridianIcon";
import ScrollToTop from "../../components/ScrollToTop";
import { useSEO } from "../../hooks/useSEO";
import { WHATSAPP_NUMBER } from "../../config/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

const FindYourMatch = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "fr";

  const [selected, setSelected] = useState<StyleId | null>(null);
  const toggleSaved = useStyleStore((s) => s.toggleSavedStyle);
  // Select the *computed boolean*, not the `isSaved` function reference —
  // selecting the function itself never changes identity, so Zustand would
  // never re-render this component when savedStyleIds actually changes.
  const isCurrentSaved = useStyleStore((s) => (selected ? s.isSaved(selected) : false));
  const allProducts = useProductStore((s) => s.allProducts);

  useSEO(t("findMatch.seo.title"), t("findMatch.seo.desc"));

  const style = STYLE_PROFILES.find((s) => s.id === selected) ?? null;
  const matching = style
    ? allProducts.filter((p) =>
        style.matches.some((m) => m.accessoryType === p.accessoryType && m.subcategory === p.subcategory)
      )
    : [];

  const handleWhatsApp = () => {
    if (!style) return;
    const name = t(`findMatch.styles.${style.id}.name`);
    const msg = `Hello Mipador Accessories, I took the style quiz and matched with "${name}" — could you help me choose a piece?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-frost">
      <ScrollToTop />
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-24">

        <AnimatePresence mode="wait">
          {!style ? (
            /* ── Step 1 — pick a style ── */
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="fig-label text-champagne mb-3">{t("findMatch.step1.label")}</p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight leading-tight max-w-2xl">
                {t("findMatch.hero.heading")}
              </h1>
              <p className="mt-4 text-ink/65 text-sm sm:text-base max-w-xl leading-relaxed">
                {t("findMatch.hero.body")}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-12">
                {STYLE_PROFILES.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => setSelected(s.id)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
                    whileHover={{ y: -4 }}
                    className="group relative aspect-[4/5] rounded-md overflow-hidden border border-ink/8 text-left focus-visible:outline-none"
                  >
                    <img
                      src={s.image}
                      alt={t(`findMatch.styles.${s.id}.name`)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-chrome-deep/85 via-chrome-deep/25 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-end p-3.5 sm:p-4">
                      <s.Icon size={18} className="text-champagne mb-2" />
                      <p className="text-white font-black text-sm sm:text-base tracking-tight leading-tight">
                        {t(`findMatch.styles.${s.id}.name`)}
                      </p>
                      <p className="text-white/55 text-[11px] italic mt-1 leading-snug">
                        {t(`findMatch.styles.${s.id}.tagline`)}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Step 2 — result ── */
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <button
                onClick={() => setSelected(null)}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ink/65 hover:text-ink transition-colors mb-10"
              >
                <ArrowLeft size={13} /> {t("findMatch.step2.back")}
              </button>

              {/* Result header */}
              <div className="text-center max-w-xl mx-auto">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ background: `linear-gradient(160deg, ${style.accent} 0%, #060912 100%)` }}
                >
                  <style.Icon size={26} className="text-champagne" />
                </div>
                <p className="fig-label text-champagne mb-2">{t("findMatch.results.whoItsFor")}</p>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-ink tracking-tight">
                  {t(`findMatch.styles.${style.id}.name`)}
                </h2>
                <p className="text-ink/65 italic text-sm mt-2">
                  {t(`findMatch.styles.${style.id}.tagline`)}
                </p>
                <p className="text-ink/65 text-sm leading-relaxed mt-5">
                  {t(`findMatch.styles.${style.id}.desc`)}
                </p>

                <button
                  onClick={() => toggleSaved(style.id)}
                  className={`inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-md border text-[10px] font-black uppercase tracking-widest transition-colors ${
                    isCurrentSaved
                      ? "bg-champagne/10 border-champagne/30 text-champagne"
                      : "border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  <Heart size={12} className={isCurrentSaved ? "fill-champagne" : ""} />
                  {isCurrentSaved ? t("findMatch.results.savedStyle") : t("findMatch.results.saveStyle")}
                </button>
              </div>

              {/* How to wear it */}
              <div className="mt-16">
                <p className="fig-label text-ink/50 mb-4 text-center">{t("findMatch.results.howToWearIt")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {WEAR_OCCASIONS.map((occ) => {
                    const Icon = WEAR_ICONS[occ];
                    const tipKey = `findMatch.styles.${style.id}.wear${occ.charAt(0).toUpperCase()}${occ.slice(1)}`;
                    return (
                      <div key={occ} className="bg-surface border border-ink/8 rounded-md p-5">
                        <Icon size={16} className="text-ink/45 mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-ink mb-1.5">
                          {t(`findMatch.wear.${occ}`)}
                        </p>
                        <p className="text-ink/65 text-xs leading-relaxed">{t(tipKey)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mantra — engraved plaque, echoes ManifestoSection */}
              <div className="mt-12 bg-chrome rounded-md py-10 px-8 text-center bg-blueprint-grid-dark">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-champagne/30 mb-5">
                  <MeridianIcon className="w-6 h-6 text-champagne" />
                </div>
                <p className="font-display text-xl sm:text-2xl text-white italic font-light max-w-md mx-auto">
                  {t(`findMatch.styles.${style.id}.mantra`)}
                </p>
              </div>

              {/* Matching pieces */}
              {matching.length > 0 && (
                <div className="mt-16">
                  <p className="fig-label text-ink/50 mb-6">{t("findMatch.results.matchingPieces")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {matching.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp text-white text-[10px] font-black uppercase tracking-widest px-6 py-3.5 rounded-md hover:bg-whatsapp-dark transition-colors"
                >
                  <MessageCircle size={14} />
                  {t("findMatch.results.talkToUs")}
                </button>
                <Link
                  to={`/${currentLang}/products`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-chrome text-white text-[10px] font-black uppercase tracking-widest px-6 py-3.5 rounded-md hover:bg-chrome-light transition-colors"
                >
                  {t("findMatch.results.shopCategory")}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FindYourMatch;
