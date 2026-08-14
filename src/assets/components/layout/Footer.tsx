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
        ? "text-espresso font-semibold"
        : "text-espresso/65 hover:text-espresso"
    }`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-cream pt-20 pb-8 px-6 md:px-12 border-t border-espresso/10">
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
            <Link to={`/${currentLang}/`} className="inline-block mb-6">
              <img
                src={SITE.logo.footer.src}
                srcSet={SITE.logo.footer.srcSet}
                sizes={SITE.logo.footer.sizes}
                alt={SITE.brandName}
                width={SITE.logo.footer.width}
                height={SITE.logo.footer.height}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-espresso/65 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-3 mt-8">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-espresso/8 text-espresso/65 hover:bg-espresso hover:text-white transition-all duration-300"
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
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-espresso/8 text-espresso/65 hover:bg-espresso hover:text-white transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
              <a
                href={SITE.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-espresso/8 text-espresso/65 hover:bg-espresso hover:text-white transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-espresso/8 text-espresso/65 hover:bg-espresso hover:text-white transition-all duration-300"
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
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-espresso/65 mb-6">
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
                <Link to={`/${currentLang}/products?location=indoor`} className="text-sm text-espresso/65 hover:text-espresso transition-colors duration-200">
                  {t("footer.indoor")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/products?location=outdoor`} className="text-sm text-espresso/65 hover:text-espresso transition-colors duration-200">
                  {t("footer.outdoor")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/products?tag=new`} className="text-sm text-espresso/65 hover:text-espresso transition-colors duration-200">
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
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-espresso/65 mb-6">
              {t("footer.studioHeading")}
            </p>
            <ul className="space-y-4">
              <li>
                <Link to={`/${currentLang}/about`} className={linkClass("/about")}>
                  {t("footer.ourStory")}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/about#craft`} className="text-sm text-espresso/65 hover:text-espresso transition-colors duration-200">
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
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-espresso/65 mb-6">
              {t("footer.journalHeading")}
            </p>
            <p className="text-sm text-espresso/65 leading-relaxed mb-6">
              {t("footer.journalBody")}
            </p>

            {subscribed ? (
              <div className="bg-espresso/5 rounded-xl px-5 py-4">
                <p className="text-sm font-bold text-espresso">{t("footer.subscribedTitle")}</p>
                <p className="text-xs text-espresso/65 mt-1">{t("footer.subscribedBody")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className="w-full bg-white border border-espresso/10 rounded-xl px-4 py-3 text-sm text-espresso placeholder-espresso/30 focus:outline-none focus:border-espresso/30 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-espresso text-white text-[10px] font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-espresso-light active:scale-95 transition-all duration-300"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-espresso/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-espresso/65">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6">
            <Link to={`/${currentLang}/privacy-policy`} className="hover:text-espresso transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to={`/${currentLang}/terms-of-service`} className="hover:text-espresso transition-colors">
              {t("footer.terms")}
            </Link>
            <Link to={`/${currentLang}/refund-policy`} className="hover:text-espresso transition-colors">
              {t("footer.refund")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
