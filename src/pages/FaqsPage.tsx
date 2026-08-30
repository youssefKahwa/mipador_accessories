import React, { useState, useMemo } from "react";
import Accordion from "../components/Accordion";
import { faqData } from "../data/faqs";
import type { FAQ } from "../data/faqs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useSEO, useJsonLd } from "../hooks/useSEO";
import { SITE } from "../config/site";

const SITE_URL = SITE.url;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Category = FAQ["category"];

const CATEGORIES: { key: Category; labelKey: string }[] = [
  { key: "Technical Support", labelKey: "faqs.catTechnical" },
  { key: "Shopping & Orders", labelKey: "faqs.catShopping" },
  { key: "Payment & billing", labelKey: "faqs.catPayment" },
];

const FAQ_BREADCRUMB: Record<string, { home: string; faqs: string }> = {
  en: { home: "Home", faqs: "FAQ" },
  fr: { home: "Accueil", faqs: "FAQ" },
  ar: { home: "الرئيسية", faqs: "الأسئلة الشائعة" },
};

const FaqsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Technical Support");
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "fr";
  const bc = FAQ_BREADCRUMB[l] ?? FAQ_BREADCRUMB.en;

  useSEO(t("seo.faqsTitle"), t("seo.faqsDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/${l}/faqs#webpage`,
          "url": `${SITE_URL}/${l}/faqs`,
          "name": `${t("seo.faqsTitle")} | ${SITE.brandName}`,
          "description": t("seo.faqsDesc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "inLanguage": l,
          "mainEntity": faqData.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": bc.home,
              "item": `${SITE_URL}/${l}/`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": bc.faqs,
              "item": `${SITE_URL}/${l}/faqs`,
            },
          ],
        },
      ],
    }),
    [l, t, bc]
  );
  useJsonLd(schema);

  const filteredFaqs = faqData.filter((faq: FAQ) => faq.category === activeCategory);

  return (
    <div className="bg-frost min-h-screen px-6 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-20"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-4">
            {t("faqs.studio")}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-ink tracking-tight leading-none mb-6">
            {t("faqs.heading")}
          </h1>
          <p className="text-ink/65 text-base font-light max-w-sm mx-auto leading-relaxed">
            {t("faqs.body")}
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-10 mb-16 border-b border-ink/10">
          {CATEGORIES.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all duration-300 relative ${
                activeCategory === key
                  ? "text-ink"
                  : "text-ink/65 hover:text-ink/65"
              }`}
            >
              {t(labelKey)}
              {activeCategory === key && (
                <motion.span
                  layoutId="faq-tab-indicator"
                  className="absolute bottom-0 left-0 w-full h-px bg-chrome"
                />
              )}
            </button>
          ))}
        </div>

        {/* Accordion */}
        {filteredFaqs.length > 0 ? (
          <Accordion key={activeCategory} items={filteredFaqs} />
        ) : (
          <div className="text-center py-20">
            <p className="text-ink/65 text-sm uppercase tracking-widest font-black">
              {t("faqs.empty")}
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center border-t border-ink/10 pt-16"
        >
          <p className="text-ink/65 text-sm mb-2">{t("faqs.stillQuestion")}</p>
          <a
            href="mailto:mipadorofficial@gmail.com"
            className="text-ink font-black text-sm uppercase tracking-widest border-b border-ink/30 hover:border-ink transition-colors pb-0.5"
          >
            {t("faqs.writeDirectly")}
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default FaqsPage;
