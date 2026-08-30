import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SITE } from "../../../config/site";
import { WHATSAPP_NUMBER } from "../../../config/whatsapp";

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "fr";

  const linkClass = (path: string) =>
    `transition-colors duration-200 text-sm ${
      pathname === path
        ? "text-white font-semibold"
        : "text-white/65 hover:text-white"
    }`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative z-10 w-full bg-chrome-deep pt-20 pb-8 px-6 md:px-12 border-t border-white/8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-14 gap-x-10 mb-16">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 sm:col-span-2 lg:col-span-2 lg:pr-8"
          >
            <Link to={`/${currentLang}/`} className="inline-flex items-center gap-2.5 mb-6">
              <img
                src={SITE.logo.footer.src}
                srcSet={SITE.logo.footer.srcSet}
                sizes={SITE.logo.footer.sizes}
                alt={SITE.brandShort}
                width={SITE.logo.footer.width}
                height={SITE.logo.footer.height}
                className="h-8 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-display leading-none text-white/60 text-[9px] tracking-[0.4em] uppercase">
                {t("nav.propertyTag")}
              </span>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-2.5 mt-8">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/12 text-white/65 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/12 text-white/65 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/12 text-white/65 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center rounded-sm border border-white/12 text-white/65 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Collection column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="fig-label text-white/50 mb-6">
              {t("footer.collectionHeading")}
            </p>
            <ul className="space-y-4">
              <li>
                <Link to={`/${currentLang}/products`} className={linkClass("/products")}>
                  {t("footer.allPieces")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/wishlist`} className={linkClass("/wishlist")}>
                  {t("footer.wishlist")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/products?gender=men`} className="text-sm text-white/65 hover:text-white transition-colors duration-200">
                  {t("footer.menWatches")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/products?gender=women`} className="text-sm text-white/65 hover:text-white transition-colors duration-200">
                  {t("footer.womenWatches")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/products?tag=new`} className="text-sm text-white/65 hover:text-white transition-colors duration-200">
                  {t("footer.newArrivals")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Studio column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="fig-label text-white/50 mb-6">
              {t("footer.studioHeading")}
            </p>
            <ul className="space-y-4">
              <li>
                <Link to={`/${currentLang}/about`} className={linkClass("/about")}>
                  {t("footer.ourStory")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/about#craft`} className="text-sm text-white/65 hover:text-white transition-colors duration-200">
                  {t("footer.craftsmanship")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/contact`} className={linkClass("/contact")}>
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/faqs`} className={linkClass("/faqs")}>
                  {t("footer.faqs")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 sm:col-span-2 lg:col-span-2 lg:pl-8"
          >
            <p className="fig-label text-white/50 mb-6">
              {t("footer.journalHeading")}
            </p>
            <p className="text-sm text-white/65 leading-relaxed mb-6">
              {t("footer.journalBody")}
            </p>

            {subscribed ? (
              <div className="bg-white/5 border border-white/10 rounded-sm px-5 py-4">
                <p className="text-sm font-bold text-white">{t("footer.subscribedTitle")}</p>
                <p className="text-xs text-white/65 mt-1">{t("footer.subscribedBody")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className="w-full bg-white/5 border border-white/12 rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-champagne text-ink text-[10px] font-black uppercase tracking-widest py-3.5 rounded-sm hover:bg-champagne-dark active:scale-95 transition-all duration-300"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10.5px] text-white/50 tracking-wide">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6 text-xs text-white/65">
            <Link to={`/${currentLang}/privacy-policy`} className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to={`/${currentLang}/terms-of-service`} className="hover:text-white transition-colors">
              {t("footer.terms")}
            </Link>
            <Link to={`/${currentLang}/refund-policy`} className="hover:text-white transition-colors">
              {t("footer.refund")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
