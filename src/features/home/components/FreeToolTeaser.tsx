import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const PREVIEW_CARDS = [
  { bg: "#B8732E", dot: "#F2BB45" },
  { bg: "#5C4A42", dot: "#7FA98E" },
  { bg: "#2E1D17", dot: "#445566" },
  { bg: "#3D2420", dot: null },
];

const ease = [0.22, 1, 0.36, 1] as const;

const FreeToolTeaser: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "fr";
  const isRTL = l === "ar" || l === "ma";

  return (
    <section className="relative px-4 py-20 overflow-hidden">

      {/* Moroccan zellige star pattern
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23D4A055' stroke-width='1'%3E%3Crect x='16' y='16' width='28' height='28'/%3E%3Crect x='16' y='16' width='28' height='28' transform='rotate(45 30 30)'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
      /> */}

      {/* ══ SECTION BACKGROUND motion blobs ══════════════════════════════ */}

      {/* Warm terracotta — top-left of section */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-30%",
          left: "-10%",
          width: "55%",
          height: "130%",
          background: "radial-gradient(circle, rgba(196,132,90,0.28) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 50, -20, 0], y: [0, 30, -25, 0], scale: [1, 1.12, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sage green — bottom-right of section */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-30%",
          right: "-8%",
          width: "50%",
          height: "120%",
          background: "radial-gradient(circle, rgba(74,126,98,0.22) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -40, 25, 0], y: [0, -30, 35, 0], scale: [1, 0.9, 1.14, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Gold center pulse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "30%",
          width: "45%",
          height: "80%",
          background: "radial-gradient(circle, rgba(212,160,85,0.18) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 0.8, 1], opacity: [0.7, 1, 0.4, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* ══ CARD ═════════════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="relative bg-espresso rounded-3xl overflow-hidden px-8 py-12 sm:px-14 sm:py-16"
        >
          {/* Card-level glow blobs */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "-15%", left: "-10%",
              width: "65%", height: "90%",
              background: "radial-gradient(circle, #C4845A 0%, transparent 70%)",
              opacity: 0.32,
            }}
            animate={{ x: [0, 60, -20, 0], y: [0, -40, 50, 0], scale: [1, 1.14, 0.9, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom: "-15%", right: "-8%",
              width: "58%", height: "80%",
              background: "radial-gradient(circle, #3D7A5A 0%, transparent 70%)",
              opacity: 0.28,
            }}
            animate={{ x: [0, -50, 30, 0], y: [0, 40, -42, 0], scale: [1, 0.88, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "15%", right: "8%",
              width: "45%", height: "65%",
              background: "radial-gradient(circle, #D4A055 0%, transparent 70%)",
              opacity: 0.2,
            }}
            animate={{ scale: [1, 1.28, 0.82, 1], x: [0, -30, 18, 0], opacity: [0.2, 0.32, 0.12, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
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

          {/* Texture dots */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Content */}
          <div className={`relative z-10 flex flex-col sm:flex-row items-center gap-10 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <div className="flex-1 text-center sm:text-start">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-3">
                {t("colorPicker.hero.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                {t("home.freeToolHeading")}{" "}
                <span className="italic font-medium">{t("home.freeToolHeadingSoft")}</span>
              </h2>
              <p className="text-sm text-white/55 mb-8 max-w-sm">
                {t("home.freeToolBody")}
              </p>
              <Link
                to={`/${l}/tools/color-palette`}
                className={`inline-flex items-center gap-2 bg-white text-espresso text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl hover:bg-white/90 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("home.freeToolCta")}
                <ArrowRight size={13} className={isRTL ? "rotate-180" : ""} />
              </Link>
            </div>

            <div className="shrink-0 grid grid-cols-2 gap-3 sm:gap-4">
              {PREVIEW_CARDS.map((card, i) => (
                <motion.div
                  key={card.bg}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shadow-lg p-4 flex flex-col justify-between overflow-hidden"
                  style={{ backgroundColor: card.bg }}
                >
                  {card.dot ? (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: card.dot }}
                    />
                  ) : (
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">
                      12 vibes
                    </p>
                  )}
                  <div className="h-[3px] w-full rounded-full bg-white/15" />
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
