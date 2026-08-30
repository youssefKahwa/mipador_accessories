import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ComingSoonSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[60vh] bg-haze overflow-hidden flex items-center justify-center py-20">

      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-ink/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="bg-[#FFFFFF] inline-block px-4 py-1 border border-ink/20 rounded-xl mb-8"
        >
          <span className="text-ink text-[9px] font-black uppercase tracking-[0.3em]">
            {t("home.comingSoonBadge")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-5xl md:text-7xl font-black text-ink mb-6 tracking-tighter"
        >
          {t("home.comingSoonHeading")}
          <br />
          <span className="text-ink/65 italic">{t("home.comingSoonSub")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-ink/70 max-w-md mx-auto text-sm leading-relaxed mb-10"
        >
          {t("home.comingSoonBody")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="flex justify-center"
        >
          <div className="flex bg-ink/5 p-1 rounded-xl border border-ink/10 max-w-md w-full">
            <input
              type="email"
              placeholder={t("home.comingSoonPlaceholder")}
              className="bg-transparent border-none focus:ring-0 text-ink placeholder:text-ink/65 text-[10px] font-bold uppercase tracking-widest px-6 flex-1"
            />
            <button className="px-6 py-3 bg-chrome text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-chrome-light active:scale-95 transition-all">
              {t("home.comingSoonButton")}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ComingSoonSection;
