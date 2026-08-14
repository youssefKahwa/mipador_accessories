import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { zelligePatternStyle } from "../../../config/patterns";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AboutHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0 opacity-8" style={zelligePatternStyle()} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-8"
        >
          {t("about.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="text-espresso-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8"
        >
          {t("about.headline")}
          <br />
          <span className="text-espresso/65 italic font-light">
            {t("about.headlineSoft")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="text-espresso/65 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          {t("about.heroBody")}
        </motion.p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent"
        />
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-espresso/65">
          {t("about.scroll")}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
