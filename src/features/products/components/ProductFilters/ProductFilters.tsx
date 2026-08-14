import React from "react";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../../../../store/product.store";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-espresso/65 mb-4">
      {title}
    </h4>
    {children}
  </div>
);

const FilterBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-left w-full py-1.5 text-sm transition-all duration-200 font-bold ${
      active
        ? "text-espresso translate-x-1.5"
        : "text-espresso/65 hover:text-espresso/70"
    }`}
  >
    {children}
  </button>
);

const ProductFilters: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
  const { t } = useTranslation();
  const {
    selectedCategory, setSelectedCategory,
    selectedCollection, setSelectedCollection,
    locationFilter, setLocationFilter,
    inStockOnly, setInStockOnly,
    resetFilters,
    getAllCategories, getAllCollections,
  } = useProductStore();

  const categories = getAllCategories();
  const collections = getAllCollections();

  return (
    <div
      className={`flex flex-col gap-8 shrink-0 ${
        mobile ? "w-full" : "hidden lg:flex w-52 sticky top-28 h-fit"
      }`}
    >
      {/* Space */}
      <Section title={t("products.filterSpace")}>
        <div className="flex flex-col gap-0.5">
          {(["all", "indoor", "outdoor"] as const).map((loc) => (
            <FilterBtn
              key={loc}
              active={locationFilter === loc}
              onClick={() => setLocationFilter(loc)}
            >
              {loc === "all"
                ? t("products.filterAllSpaces")
                : loc === "indoor"
                ? t("footer.indoor")
                : t("footer.outdoor")}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Category */}
      <Section title={t("products.filterCategory")}>
        <div className="flex flex-col gap-0.5">
          {categories.map((cat) => (
            <FilterBtn
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Collection */}
      <Section title={t("products.filterCollection")}>
        <div className="flex flex-col gap-0.5">
          {collections.map((col) => (
            <FilterBtn
              key={col}
              active={selectedCollection === col}
              onClick={() => setSelectedCollection(col)}
            >
              {col}
            </FilterBtn>
          ))}
        </div>
      </Section>

      {/* Availability */}
      <Section title={t("products.filterAvailability")}>
        <label className="flex items-center gap-3 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-espresso"
          />
          <span className="text-sm font-bold text-espresso/65">
            {t("products.filterInStockOnly")}
          </span>
        </label>
      </Section>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="text-left text-[9px] font-black uppercase tracking-widest text-espresso/65 hover:text-espresso/65 transition-colors"
      >
        {t("products.filterReset")}
      </button>
    </div>
  );
};

export default ProductFilters;
