import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ContactHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-16 lg:mb-24">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="text-6xl md:text-8xl font-light text-clay tracking-[0.05em] leading-none mb-6 uppercase"
      >
        {t("contact.heading")}{" "}
        <span className="opacity-50">{t("contact.headingSoft")}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="text-lg md:text-xl text-taupe font-medium leading-relaxed max-w-xl"
      >
        {t("contact.body")}
      </motion.p>
    </div>
  );
};

export default ContactHero;
