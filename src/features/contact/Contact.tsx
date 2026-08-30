import ContactForm from "./components/ContactForm";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import CasablancaMap from "./components/CasablancaMap";
import ScrollToTop from "../../components/ScrollToTop";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSEO, useJsonLd } from "../../hooks/useSEO";
import { SITE } from "../../config/site";

const SITE_URL = SITE.url;

const CONTACT_LABELS: Record<string, { home: string; contact: string }> = {
  en: { home: "Home", contact: "Contact" },
  fr: { home: "Accueil", contact: "Contact" },
  ar: { home: "الرئيسية", contact: "تواصل" },
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "fr";
  const labels = CONTACT_LABELS[l] ?? CONTACT_LABELS.en;

  useSEO(t("seo.contactTitle"), t("seo.contactDesc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/${l}/contact#webpage`,
          "url": `${SITE_URL}/${l}/contact`,
          "name": `${t("seo.contactTitle")} | ${SITE.brandName}`,
          "description": t("seo.contactDesc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "inLanguage": l,
        },
        {
          "@type": ["LocalBusiness", "JewelryStore"],
          "@id": `${SITE_URL}/#business`,
          "name": SITE.brandName,
          "description":
            "Accessories studio based in Casablanca, Morocco. Watches, sunglasses, jewelry and more, built on honesty, not hype — delivered across Morocco.",
          "url": `${SITE_URL}`,
          "image": `${SITE_URL}/images/og-default.jpg`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Casablanca",
            "addressRegion": "Grand Casablanca-Settat",
            "addressCountry": "MA",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 33.5731,
            "longitude": -7.5898,
          },
          "priceRange": "MAD 1,900 – MAD 12,500",
          "currenciesAccepted": "MAD",
          "paymentAccepted": "Cash on Delivery, Bank Transfer",
          "areaServed": "Morocco",
          "hasMap": "https://www.google.com/maps?q=Casablanca,Morocco",
          "parentOrganization": { "@id": `${SITE_URL}/#organization` },
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
              "name": labels.contact,
              "item": `${SITE_URL}/${l}/contact`,
            },
          ],
        },
      ],
    }),
    [l, t, labels]
  );
  useJsonLd(schema);
  return (
    <div className="min-h-screen bg-frost p-6 md:p-12 lg:p-24 selection:bg-sapphire-deep selection:text-white">
      <ScrollToTop />
      <div className="max-w-6xl mx-auto">
        <div id="hero"><ContactHero /></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div id="info"><ContactInfo /></div>
            <div id="map"><CasablancaMap /></div>
          </div>

          <div id="contact-form" className="bg-cloud p-8 md:p-10 rounded-[2.5rem] border border-mist">
            <h3 className="text-xl font-bold text-sapphire-deep tracking-tight mb-8">
              Direct Message
            </h3>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
