import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../../components/Reveal";

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
    <section className="py-24 px-6 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-6">
              {t("brandPromise.eyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-espresso tracking-tight leading-tight mb-10">
              {t("brandPromise.heading")}
              <br />
              <span className="text-espresso/65 italic font-light">{t("brandPromise.headingSoft")}</span>
            </h2>
            <div className="space-y-5">
              {promises.map((p, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="text-gold" size={11} />
                  </div>
                  <span className="text-espresso/70 text-sm leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative h-[480px] rounded-3xl overflow-hidden">
            <picture style={{ display: "contents" }}>
              <source srcSet="/images/hero.webp" type="image/webp" />
              <img
                src="/images/hero.webp"
                alt="Mipador — spaces that make you feel alive"
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/50 to-transparent" />
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
