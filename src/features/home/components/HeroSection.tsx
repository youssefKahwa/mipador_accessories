import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SITE } from "../../../config/site";

const HeroSection = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || "fr";

  return (
    <section className="relative bg-[#FBF4ED] px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 lg:pt-5 pb-3 sm:pb-5">
      <div className="relative overflow-hidden rounded-3xl min-h-[94dvh] sm:min-h-[92vh] lg:min-h-[95vh] bg-espresso-975">

        {/* Background image — plain divs, no JS, LCP paints as soon as image downloads */}
        <div className="absolute inset-0">
          <div className="w-full h-full hero-breathe">
            <picture style={{ display: "contents" }}>
              <source media="(max-width: 767px)" srcSet={SITE.hero.mobile.srcSet} sizes="100vw" width={SITE.hero.mobile.width} height={SITE.hero.mobile.height} />
              <source media="(min-width: 768px)" srcSet={SITE.hero.desktop.src} width={SITE.hero.desktop.width} height={SITE.hero.desktop.height} />
              <img
                src={SITE.hero.desktop.src}
                alt="Mipador — Premium Moroccan Furniture & Home Decor, Casablanca Morocco"
                width={SITE.hero.desktop.width}
                height={SITE.hero.desktop.height}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>

          {/* Shine sweep — CSS only */}
          <div className="absolute inset-0 w-1/2 hero-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.72) 100%)" }} />
          <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(135deg, rgba(77,42,34,0.45) 0%, transparent 40%, rgba(198,169,139,0.18) 100%)" }} />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light" style={{ backgroundImage: "url('/noise.svg')" }} />
        </div>

        {/* Headline — CSS fade-in, no JS opacity gate */}
        <div className="relative z-10 flex items-center justify-center text-center px-6 sm:px-10 h-full pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
            <h1
              className="hero-fade-in font-display text-[3.4rem] sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8.5rem] font-light tracking-[-0.03em] leading-[1.04] text-white"
              style={{ animationDelay: "0s" }}
            >
              {t("hero.headline")}
            </h1>

            <div className="hero-fade-in flex items-center gap-5" style={{ animationDelay: "0.08s" }}>
              <div className="w-10 h-px bg-white/20" />
              <p className="text-[9px] uppercase tracking-[0.55em] text-white/50 font-light">{t("hero.badge")}</p>
              <div className="w-10 h-px bg-white/20" />
            </div>
          </div>
        </div>

        {/* Floating card — CSS slide-up, no JS */}
        <div className="hero-card-entrance absolute bottom-6 left-6 right-6 sm:right-auto lg:bottom-8 lg:left-8 z-10 sm:max-w-sm rounded-3xl bg-[#FBF4ED] p-4 sm:p-5 flex flex-col items-stretch gap-4">
          <div className="w-full flex items-center gap-3">
            <img
              src={SITE.hero.featureThumb.url}
              alt={SITE.hero.featureThumb.alt}
              width={56}
              height={56}
              loading="lazy"
              className="w-12 h-12 rounded-lg object-cover shrink-0"
            />
            <p className="text-xs leading-snug text-espresso/80 font-light">{t("hero.featureCaption")}</p>
            <Link
              to={`/${currentLang}/about`}
              aria-label={t("hero.ourStory")}
              className="ml-auto shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-espresso text-cream hover:bg-espresso-deep transition-colors"
            >
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <Link
            to={`/${currentLang}/products`}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-espresso px-7 py-4 text-sm font-medium tracking-[0.1em] uppercase text-cream hover:bg-espresso-deep hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
            <span className="relative z-10">{t("hero.exploreCollection")}</span>
            <ArrowRight size={18} className="relative z-10" />
          </Link>
        </div>

        {/* Ambient glow — hidden on mobile (expensive blur-[140px] GPU layer), visible on desktop */}
        <div className="hidden sm:block hero-glow-entrance absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-tan blur-[140px] z-0 pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
