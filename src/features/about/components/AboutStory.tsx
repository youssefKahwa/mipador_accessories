import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LiveDial } from "../../../components/LiveDial";
import { guillochePatternStyle } from "../../../config/patterns";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AboutStory = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-26 px-6 bg-frost">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Live dial — code-drawn, no photography dependency */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative h-[280px] md:h-[520px] rounded-3xl overflow-hidden order-2 md:order-1 group bg-gradient-brand-deep flex items-center justify-center"
          >
            <div className="absolute inset-0 opacity-[0.4]" style={guillochePatternStyle(72)} aria-hidden="true" />
            <LiveDial size={320} className="relative w-[70%] max-w-[320px] h-auto transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(201,164,85,0.12),transparent_60%)]" />
            <div className="absolute bottom-8 left-8 transition-all duration-500 group-hover:translate-y-[-4px]">
              <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">
                {t("about.videoLocation")}
              </p>
            </div>
            <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                <span className="text-white text-[10px] tracking-widest uppercase">
                  {t("about.videoLabel")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight leading-tight mb-8">
              <span className="text-ink/65 italic font-light">
                {t("about.storyHeading")}
              </span>
            </h2>

            <div className="space-y-5 text-ink/65 text-base leading-relaxed">
              <p>{t("about.storyP1")}</p>
              <p>{t("about.storyP2")}</p>
              <p className="text-ink font-semibold">{t("about.storyP3")}</p>
            </div>

            <div className="mt-10 border-l-2 border-champagne/40 pl-6 space-y-4">
              <p className="text-ink/65 italic text-sm leading-relaxed">
                {t("about.quote")}
                <br />
                <span className="text-ink/65 not-italic text-xs mt-1 block">
                  {t("about.quoteAttrib")}
                </span>
              </p>
              <p className="text-ink/70 text-sm leading-relaxed">
                {t("about.quoteResponse")}
              </p>
              <p className="text-ink font-bold text-sm leading-relaxed">
                {t("about.manifesto")}
                <span className="text-champagne"> {t("about.manifestoAccent")}</span>.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutStory;
