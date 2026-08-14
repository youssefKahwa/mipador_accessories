import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const VisionSection = () => {
  const { t } = useTranslation();

  const paragraphs = [
    { lead: t("vision.p1Lead"), body: t("vision.p1Body") },
    { lead: t("vision.p2Lead"), body: t("vision.p2Body") },
    { lead: t("vision.p3Lead"), body: t("vision.p3Body") },
  ];

  const tags = [t("vision.tag1"), t("vision.tag2"), t("vision.tag3")];

  return (
    <section className="py-28 px-6 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Central statement */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-8">
            {t("vision.eyebrow")}
          </p>
          <div className="space-y-0">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-espresso tracking-tight leading-none">
              {t("vision.taglineA")}
            </h2>
            <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic text-espresso/65 tracking-tight leading-none">
              {t("vision.taglineB")}
            </p>
          </div>
        </motion.div>

        {/* Split: image + narrative */}
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16 items-start">

          {/* Image */}
          <motion.div
            className="relative h-[440px] md:h-[700px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <picture style={{ display: "contents" }}>
              <source srcSet="/images/atmosphere-1.webp" type="image/webp" />
              <img
                src="/images/atmosphere-1.png"
                alt="Mipador — spaces that set you free, Casablanca Morocco"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/15 to-transparent" />
            <div className="absolute top-6 left-6">
              <div className="bg-black/25 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                <span className="text-white/70 text-[9px] font-black uppercase tracking-widest">
                  {t("vision.imageBadge")}
                </span>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-gold text-[9px] font-black uppercase tracking-widest mb-3">
                {t("vision.imageCaption")}
              </p>
              <p className="text-white font-black text-2xl leading-tight">
                {t("vision.moveWithPurpose")}
                <br />
                <span className="text-white/50 italic font-light text-xl">
                  {t("vision.liveWithIntention")}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="space-y-10 pt-2 md:pt-4"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {paragraphs.map((p, i) => (
              <motion.div
                key={i}
                className="border-l-2 border-gold/25 pl-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE }}
              >
                <p className="text-espresso font-black text-base md:text-lg leading-snug mb-3">
                  {p.lead}
                </p>
                <p className="text-espresso/65 text-sm leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            ))}

            {/* Tagline pills */}
            <div className="flex flex-wrap gap-2 pl-6 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block border border-espresso/12 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-espresso/65 hover:border-gold/30 hover:text-gold transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
