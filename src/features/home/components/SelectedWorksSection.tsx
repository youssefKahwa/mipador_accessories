import React from "react";
import { useProductStore } from "../../../store/product.store";
import ProductCardHomePage from "../../products/components/ProductGrid/ProductCardHomePage";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const SelectedWorksSection: React.FC = () => {
  const { allProducts } = useProductStore();
  const { t } = useTranslation();

  const featured = allProducts.filter((p) => p.featured).slice(0, 3);
  const { lang } = useParams();
  const currentLang = lang || "fr";

  return (
    <section className="bg-fog py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-espresso tracking-tighter">
              {t("home.selectedWorks").split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-espresso/65 italic">{word}</span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
              <span className="block mt-2 text-espresso/70 font-bold uppercase tracking-[0.3em] text-[10px] not-italic">
                {t("home.selectedWorksSub")}
              </span>
            </h2>
          </div>

          <Link
            to={`/${currentLang}/products`}
            className="text-xs font-black uppercase tracking-widest border-b-2 border-espresso pb-1 text-espresso hover:text-espresso-light hover:border-espresso-light transition-colors"
          >
            {t("home.exploreCollection")}
          </Link>
        </motion.div>

        {featured.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-espresso/10">
            <p className="text-espresso/65 font-medium">{t("home.noFeatured")}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            {featured.map((item) => (
              <motion.div key={item.id} variants={cardVariants}>
                <ProductCardHomePage product={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SelectedWorksSection;
