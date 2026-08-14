import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SelectedWorksSection from "./components/SelectedWorksSection";
import ComingSoonSection from "./components/ComingSoonSection";
import HeroSection from "./components/HeroSection";
import HowToOrder from "./components/HowToOrder";
import TaglineSection from "./components/TaglineSection";
import FreeToolTeaser from "./components/FreeToolTeaser";
import ManifestoSection from "./components/ManifestoSection";
import ScrollToTop from "../../components/ScrollToTop";
import { useSEO, useJsonLd } from "../../hooks/useSEO";
import { products } from "../../data/products";

const SITE_URL = "https://mipador.com";

const BREADCRUMB_HOME: Record<string, string> = {
  en: "Home",
  fr: "Accueil",
  ar: "الرئيسية",
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "fr";

  useSEO(t("seo.homeTitle"), t("seo.homeDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/${l}/#webpage`,
          "url": `${SITE_URL}/${l}/`,
          "name": `${t("seo.homeTitle")} | Mipador`,
          "description": t("seo.homeDesc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "about": { "@id": `${SITE_URL}/#organization` },
          "inLanguage": l,
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": BREADCRUMB_HOME[l] ?? "Home",
              "item": `${SITE_URL}/${l}/`,
            },
          ],
        },
        {
          "@type": "ItemList",
          "name": "Featured Mipador Products",
          "description":
            "Handcrafted wall art and paintings — the debut Mipador collection.",
          "url": `${SITE_URL}/${l}/products`,
          "numberOfItems": products.length,
          "itemListElement": products.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.name,
            "url": `${SITE_URL}/${l}/products/${p.slug}`,
          })),
        },
      ],
    }),
    [l, t]
  );
  useJsonLd(schema);

  return (
    <div>
      <ScrollToTop />
      <div id="hero"><HeroSection /></div>
      <div id="selected-works"><SelectedWorksSection /></div>
      <div id="manifesto"><ManifestoSection /></div>
      <div id="how-to-order"><HowToOrder /></div>
      <div id="tagline"><TaglineSection /></div>
      <div id="color-palette"><FreeToolTeaser /></div>
      <div id="coming-soon"><ComingSoonSection /></div>
    </div>
  );
};

export default HomePage;
