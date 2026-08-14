import React from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProductStore } from "../../../../store/product.store";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useProductStore();
  const { t } = useTranslation();

  return (
    <div className="relative w-full md:w-72 group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/65 group-focus-within:text-espresso transition-colors"
        size={15}
      />
      <input
        type="text"
        placeholder={t("products.searchPlaceholder")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white border-none rounded-xl py-3 pl-11 pr-10 text-sm focus:ring-1 focus:ring-espresso/20 outline-none placeholder:text-espresso/65 text-espresso"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
          aria-label="Clear search"
        >
          <X size={13} className="text-espresso/65 hover:text-espresso" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
