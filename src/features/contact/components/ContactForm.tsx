import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      className="space-y-6 p-5 md:p-8 bg-surface rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={t("contact.namePlaceholder")}
          className="w-full bg-surface border border-mist rounded-xl py-4 px-6 text-sm outline-none focus:border-sapphire-deep transition-colors text-sapphire-deep"
        />
        <input
          type="email"
          placeholder={t("contact.emailPlaceholder")}
          className="w-full bg-surface border border-mist rounded-xl py-4 px-6 text-sm outline-none focus:border-sapphire-deep transition-colors text-sapphire-deep"
        />
      </div>
      <textarea
        placeholder={t("contact.messagePlaceholder")}
        rows={4}
        className="w-full bg-surface border border-mist rounded-xl py-4 px-6 text-sm outline-none focus:border-sapphire-deep transition-colors resize-none text-sapphire-deep"
      />
      <button className="w-full bg-sapphire-deep text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-chrome-deep active:scale-95 transition-all shadow-sm">
        {t("contact.send")}
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
};

export default ContactForm;
