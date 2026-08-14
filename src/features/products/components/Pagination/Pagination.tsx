import React from "react";
import { useProductStore } from "../../../../store/product.store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ITEMS_PER_PAGE } from "../Page/ProductsPage";

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, getTotalPages } = useProductStore();
  const totalPages = getTotalPages(ITEMS_PER_PAGE);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-32 flex items-center justify-center gap-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className="w-14 h-14 flex items-center justify-center rounded-xl bg-transparent border border-espresso/10 text-espresso transition-all hover:bg-espresso-light hover:text-fog disabled:opacity-20"
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Pagination Indicators */}
      <div className="flex gap-3 items-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n)}
            className={`transition-all duration-500 rounded-xl ${
              n === currentPage
                ? "bg-espresso w-8 h-2.5"
                : "bg-espresso/10 w-2.5 h-2.5 hover:bg-espresso/30"
            }`}
            aria-label={`Go to page ${n}`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        className="w-14 h-14 flex items-center justify-center rounded-xl bg-transparent border border-espresso/10 text-espresso transition-all hover:bg-espresso-light hover:text-fog disabled:opacity-20"
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
