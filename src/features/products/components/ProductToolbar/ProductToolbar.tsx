import React from "react";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";

const ProductToolbar: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-20 pb-8 border-b border-espresso/10">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <SortSelect />
      </div>
    </div>
  );
};

export default ProductToolbar;
