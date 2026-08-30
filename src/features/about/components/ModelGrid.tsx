import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Reveal } from "../../../components/Reveal";
import { revealContainer, revealItem } from "../../../components/revealVariants";

const ModelGrid = () => {
  const { t } = useTranslation();

  const spaces = [
    t("modelGrid.space1"),
    t("modelGrid.space2"),
    t("modelGrid.space3"),
    t("modelGrid.space4"),
    t("modelGrid.space5"),
    t("modelGrid.space6"),
    t("modelGrid.space7"),
    t("modelGrid.space8"),
    t("modelGrid.space9"),
    t("modelGrid.space10"),
    t("modelGrid.space11"),
    t("modelGrid.space12"),
  ];

  return (
    <section className="py-24 px-6 bg-frost">
      <div className="max-w-7xl mx-auto text-center">
        <Reveal>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-4">
            {t("modelGrid.eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight mb-4">
            {t("modelGrid.heading")}
          </h2>
          <p className="text-ink/65 text-base mb-16 max-w-xl mx-auto leading-relaxed">
            {t("modelGrid.body")}
          </p>
        </Reveal>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {spaces.map((space, i) => (
            <motion.div
              key={i}
              variants={revealItem}
              className="bg-surface border border-ink/8 rounded-xl p-5 hover:border-champagne/30 hover:bg-cloud transition-all group cursor-default"
            >
              <p className="text-xs font-black text-ink tracking-tight">
                {space}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModelGrid;
