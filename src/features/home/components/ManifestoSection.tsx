import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MeridianIcon } from "../../../components/MeridianIcon";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Styled like text engraved on a caseback — a medallion seal, a quote set
// in a frame of hairlines, coordinates below. The one dark, quiet beat
// between the busier sections.
const ManifestoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[46vh] bg-chrome flex items-center justify-center overflow-hidden px-8 py-24 bg-blueprint-grid-dark">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-champagne/30 mb-10"
        >
          <div className="w-11 h-11 rounded-full border border-champagne/40 flex items-center justify-center">
            <MeridianIcon className="w-6 h-6 text-champagne" />
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="border-t border-b border-white/10 py-8"
        >
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-[1.3] font-light italic">
            {t("home.manifestoQuote")}
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mt-8 fig-label text-white/35"
        >
          {t("home.manifestoLocations")}
        </motion.p>
      </div>
    </section>
  );
};

export default ManifestoSection;
