import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import VisionSection from "./components/VisionSection";
import CoreFeatures from "./components/CoreFeatures";
import BrandPromise from "./components/BrandPromise";
// import Testimonials from "./components/Testimonials";
import ModelGrid from "./components/ModelGrid";
import FeatureGrid from "./components/FeatureGrid";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ScrollToTop from "../../components/ScrollToTop";
import { useSEO, useJsonLd } from "../../hooks/useSEO";
import { zelligePatternStyle } from "../../config/patterns";

const SITE_URL = "https://mipador.com";

const ABOUT_LABELS: Record<string, { home: string; about: string }> = {
  en: { home: "Home", about: "Our Story" },
  fr: { home: "Accueil", about: "Notre Histoire" },
  ar: { home: "الرئيسية", about: "قصتنا" },
};

function About() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "fr";
  const l = currentLang;
  const labels = ABOUT_LABELS[l] ?? ABOUT_LABELS.en;

  useSEO(t("seo.aboutTitle"), t("seo.aboutDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/${l}/about#webpage`,
          "url": `${SITE_URL}/${l}/about`,
          "name": `${t("seo.aboutTitle")} | Mipador`,
          "description": t("seo.aboutDesc"),
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
              "name": labels.home,
              "item": `${SITE_URL}/${l}/`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": labels.about,
              "item": `${SITE_URL}/${l}/about`,
            },
          ],
        },
      ],
    }),
    [l, t, labels]
  );
  useJsonLd(schema);

  return (
    <div className="bg-cream font-sans selection:bg-gold/20">
      <ScrollToTop />
      <div id="hero"><AboutHero /></div>
      <div id="story" className="cv-auto"><AboutStory /></div>
      <div id="vision" className="cv-auto"><VisionSection /></div>
      <div id="models" className="cv-auto"><ModelGrid /></div>
      <div id="features" className="cv-auto"><CoreFeatures /></div>
      <div id="feature-grid" className="cv-auto"><FeatureGrid /></div>
      <div id="brand-promise" className="cv-auto"><BrandPromise /></div>
      {/* <Testimonials /> */}

      {/* Final CTA */}
      <section id="cta" className="cv-auto py-32 px-6 bg-espresso relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={zelligePatternStyle()} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-6">
            Mipador Studio
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-8">
            Live in a space
            <br />
            <span className="text-gold/70 italic font-light">
              that gives something back to you .
            </span>
          </h2>
          <p className="text-white/50 text-base mb-12 leading-relaxed max-w-xl mx-auto">
            You don't need to own everything to live beautifully.
            But what you choose to bring in — make it honest, make it warm, make it yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/${currentLang}/products`}
              className="inline-flex items-center justify-center gap-3 bg-gold text-espresso px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold-dark transition-all active:scale-95"
            >
              Explore Collection <ArrowRight size={13} />
            </Link>
            <Link
              to={`/${currentLang}/contact`}
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;