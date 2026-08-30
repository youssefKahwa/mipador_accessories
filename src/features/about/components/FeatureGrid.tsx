import { Wind, Sun, Moon, Mountain, Droplets, Star, Circle, Triangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Reveal } from "../../../components/Reveal";
import { revealContainer, revealItem } from "../../../components/revealVariants";

const icons = [Sun, Mountain, Moon, Wind, Droplets, Star, Circle, Triangle];

const FeatureGrid = () => {
  const { t } = useTranslation();

  const touches = [
    { icon: icons[0], title: t("featureGrid.touch1Title"), desc: t("featureGrid.touch1Desc") },
    { icon: icons[1], title: t("featureGrid.touch2Title"), desc: t("featureGrid.touch2Desc") },
    { icon: icons[2], title: t("featureGrid.touch3Title"), desc: t("featureGrid.touch3Desc") },
    { icon: icons[3], title: t("featureGrid.touch4Title"), desc: t("featureGrid.touch4Desc") },
    { icon: icons[4], title: t("featureGrid.touch5Title"), desc: t("featureGrid.touch5Desc") },
    { icon: icons[5], title: t("featureGrid.touch6Title"), desc: t("featureGrid.touch6Desc") },
    { icon: icons[6], title: t("featureGrid.touch7Title"), desc: t("featureGrid.touch7Desc") },
    { icon: icons[7], title: t("featureGrid.touch8Title"), desc: t("featureGrid.touch8Desc") },
  ];

  return (
    <section className="py-24 px-6 bg-frost">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-4">
            {t("featureGrid.eyebrow")}
          </p>
          <h2 className="text-4xl font-black text-ink tracking-tight">
            {t("featureGrid.heading")}
          </h2>
        </Reveal>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {touches.map((item, i) => (
            <motion.div
              key={i}
              variants={revealItem}
              className="bg-surface border border-ink/8 rounded-xl p-6 hover:bg-cloud hover:border-champagne/20 transition-all group"
            >
              <item.icon
                className="text-champagne mb-5 transition-transform group-hover:scale-110"
                size={24}
              />
              <h3 className="font-black text-ink text-sm mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-ink/65 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
