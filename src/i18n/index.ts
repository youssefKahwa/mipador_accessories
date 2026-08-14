import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import ma from "./locales/ma.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
      ma: { translation: ma },
    },

    fallbackLng: "fr",

    supportedLngs: ["en", "fr", "ar", "ma"],

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["path", "navigator"],
    },
  });

export default i18n;