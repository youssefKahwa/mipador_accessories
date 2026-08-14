import React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../../../../store/product.store";

const SortSelect: React.FC = () => {
  const { sortBy, setSortBy } = useProductStore();
  const { t } = useTranslation();

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "name")
        }
        className="appearance-none bg-white border-none rounded-xl py-3 pl-5 pr-10 text-[10px] font-black uppercase tracking-widest text-espresso focus:ring-1 focus:ring-espresso/20 outline-none cursor-pointer"
      >
        <option value="featured">{t("products.sortFeatured")}</option>
        <option value="name">{t("products.sortAlpha")}</option>
        <option value="price-asc">{t("products.sortPriceLow")}</option>
        <option value="price-desc">{t("products.sortPriceHigh")}</option>
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/65 pointer-events-none"
        size={13}
      />
    </div>
  );
};

export default SortSelect;
