import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { STYLE_PROFILES } from "../../tools/styleData";
import { guillochePatternStyle } from "../../../config/patterns";

const ease = [0.22, 1, 0.36, 1] as const;

const FreeToolTeaser: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "fr";
  const isRTL = l === "ar" || l === "ma";

  return (
    <section className="relative px-4 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="relative bg-chrome rounded-md overflow-hidden px-8 py-12 sm:px-14 sm:py-16 border border-white/8"
        >
          {/* Instrument-panel texture — same language as the hero */}
          <div className="absolute inset-0 opacity-[0.4]" style={guillochePatternStyle(80)} aria-hidden="true" />
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-20%", right: "-10%",
              width: "55%", height: "90%",
              background: "radial-gradient(circle, rgba(111,177,255,0.14) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Diagonal shimmer sweep — plays once on mount */}
          <motion.div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: 0, width: "22%",
              background: "linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "550%" }}
            transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
          />

          {/* Content */}
          <div className={`relative z-10 flex flex-col sm:flex-row items-center gap-10 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <div className="flex-1 text-center sm:text-start">
              <p className="fig-label text-champagne mb-3">
                {t("findMatch.step1.label")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                {t("home.freeToolHeading")}{" "}
                <span className="italic font-medium">{t("home.freeToolHeadingSoft")}</span>
              </h2>
              <p className="text-sm text-white/65 mb-8 max-w-sm">
                {t("home.freeToolBody")}
              </p>
              <Link
                to={`/${l}/tools/find-your-match`}
                className={`inline-flex items-center gap-2 bg-champagne text-ink text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-md hover:bg-champagne-dark transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("home.freeToolCta")}
                <ArrowRight size={13} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>

            <div className="shrink-0 grid grid-cols-3 gap-2.5 sm:gap-3">
              {STYLE_PROFILES.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md shadow-lg overflow-hidden border border-white/10"
                >
                  <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-chrome-deep/25" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeToolTeaser;
