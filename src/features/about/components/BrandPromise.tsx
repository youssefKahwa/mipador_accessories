import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../../components/Reveal";
import { WatchIllustration } from "../../../components/WatchIllustration";
import { guillochePatternStyle } from "../../../config/patterns";

const BrandPromise = () => {
  const { t } = useTranslation();

  const promises = [
    t("brandPromise.promise1"),
    t("brandPromise.promise2"),
    t("brandPromise.promise3"),
    t("brandPromise.promise4"),
    t("brandPromise.promise5"),
    t("brandPromise.promise6"),
  ];

  return (
    <section className="py-24 px-6 bg-cloud">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-champagne mb-6">
              {t("brandPromise.eyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight leading-tight mb-10">
              {t("brandPromise.heading")}
              <br />
              <span className="text-ink/65 italic font-light">{t("brandPromise.headingSoft")}</span>
            </h2>
            <div className="space-y-5">
              {promises.map((p, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-xl bg-champagne/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="text-champagne" size={11} />
                  </div>
                  <span className="text-ink/70 text-sm leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative h-[480px] rounded-3xl overflow-hidden bg-gradient-brand-deep flex items-center justify-center">
            <div className="absolute inset-0 opacity-[0.4]" style={guillochePatternStyle(72)} aria-hidden="true" />
            <WatchIllustration dialColor="#0F2459" strapColor="#B6C2D1" className="relative w-[55%] max-w-[280px] h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-chrome-deep/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">
                {t("brandPromise.imageCaption1")}
              </p>
              <p className="text-white font-bold text-lg leading-snug">
                {t("brandPromise.imageCaption2")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
