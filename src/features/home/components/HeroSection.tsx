import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { guillochePatternStyle } from "../../../config/patterns";
import { LiveDial } from "../../../components/LiveDial";

const HeroSection = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || "fr";

  return (
    <section className="relative bg-frost px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 lg:pt-5 pb-3 sm:pb-5">
      <div className="relative overflow-hidden rounded-3xl min-h-[94dvh] sm:min-h-[92vh] lg:min-h-[95vh] bg-chrome-deep">

        {/* No real product photography exists yet for this hero — same
            brand-neutral treatment as the hub: pattern + gradient, not a
            placeholder photo. Swap for a real campaign image when available. */}
        <div className="absolute inset-0">
          <div className="w-full h-full hero-breathe">
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={guillochePatternStyle(120)}
            />
          </div>

          {/* Shine sweep — CSS only */}
          <div className="absolute inset-0 w-1/2 hero-shine bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(201,164,85,0.10) 0%, rgba(6,9,18,0.55) 55%, rgba(6,9,18,0.85) 100%)" }} />
          <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(135deg, rgba(30,63,160,0.35) 0%, transparent 40%, rgba(111,177,255,0.14) 100%)" }} />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light" style={{ backgroundImage: "url('/noise.svg')" }} />
        </div>

        {/* The hero's signature visual — a real, live-ticking watch face
            (see LiveDial.tsx), not a stock photo. Centered text is a single
            wide column here (unlike home's two-column hero), so the
            side-bled 620px dial needs real width to clear it — under xl it
            sits centered in the empty space below the subcopy instead. */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[64%] scale-[0.5] opacity-[0.4]
                     xl:left-auto xl:translate-x-0 xl:top-1/2 xl:-right-16 xl:scale-100 xl:opacity-[0.55]
                     pointer-events-none"
          aria-hidden="true"
        >
          <LiveDial size={620} className="drop-shadow-[0_0_120px_rgba(111,177,255,0.25)]" />
        </div>

        {/* Headline — CSS fade-in, no JS opacity gate */}
        <div className="relative z-10 flex items-center justify-center text-center px-6 sm:px-10 h-full pt-32 sm:pt-36 lg:pt-40">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
            <h1
              className="hero-fade-in font-display text-[3rem] sm:text-[4.6rem] md:text-[5.8rem] lg:text-[7rem] font-light tracking-[-0.03em] leading-[1.04] text-white"
              style={{ animationDelay: "0s" }}
            >
              {t("hero.headline")}
            </h1>

            <div className="hero-fade-in flex items-center gap-5" style={{ animationDelay: "0.08s" }}>
              <div className="w-10 h-px bg-white/20" />
              <p className="fig-label text-white/60">{t("hero.badge")}</p>
              <div className="w-10 h-px bg-white/20" />
            </div>

            <p
              className="hero-fade-in text-white/55 text-sm sm:text-base font-light max-w-lg leading-relaxed"
              style={{ animationDelay: "0.16s" }}
            >
              {t("hero.subcopy")}
            </p>
          </div>
        </div>

        {/* Floating card — CSS slide-up, no JS */}
        <div className="hero-card-entrance absolute bottom-6 left-6 right-6 sm:right-auto lg:bottom-8 lg:left-8 z-10 sm:max-w-sm rounded-3xl bg-frost p-4 sm:p-5 flex flex-col items-stretch gap-4">
          <div className="w-full flex items-center gap-3">
            <LiveDial size={44} className="shrink-0 rounded-full" />
            <p className="text-xs leading-snug text-ink/80 font-light">{t("hero.featureCaption")}</p>
            <Link
              to={`/${currentLang}/about`}
              aria-label={t("hero.ourStory")}
              className="ml-auto shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-chrome text-white hover:bg-chrome-light transition-colors"
            >
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <Link
            to={`/${currentLang}/products`}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-chrome px-7 py-4 text-sm font-medium tracking-[0.1em] uppercase text-white hover:bg-chrome-light hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
            <span className="relative z-10">{t("hero.exploreCollection")}</span>
            <ArrowRight size={18} className="relative z-10" />
          </Link>
        </div>

        {/* Ambient glow — hidden on mobile (expensive blur-[140px] GPU layer), visible on desktop */}
        <div className="hidden sm:block hero-glow-entrance absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-ice blur-[140px] z-0 pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
