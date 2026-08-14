import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AlbatrossMark } from "../../../components/AlbatrossMark";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ManifestoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[52vh] bg-cream flex items-center justify-center overflow-hidden px-8 py-20">

      {/* Albatross watermark — centered, barely perceptible */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full max-w-3xl text-espresso opacity-[0.07]">
          <AlbatrossMark />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <p className="font-display text-3xl sm:text-4xl md:text-[2.8rem] lg:text-5xl text-espresso leading-[1.25] font-light italic">
            {t("home.manifestoQuote")}
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="mt-12 text-espresso/65 text-[10px] font-light uppercase tracking-[0.35em]"
        >
          {t("home.manifestoLocations")}
        </motion.p>
      </div>
    </section>
  );
};

export default ManifestoSection;
