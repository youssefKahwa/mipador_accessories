import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "../../../../store/product.store";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  const shouldReduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Show skeleton briefly on mount and on every filter-driven re-key
  useEffect(() => {
    setReady(false);
    const id = setTimeout(() => setReady(true), 260);
    return () => clearTimeout(id);
  }, [products]);

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.07 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0.01 : 0.55, ease: EASE },
    },
  };

  if (!ready) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {Array.from({ length: Math.min(products.length || 6, 6) }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      key={products.map((p) => p.id).join(",")}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={cardVariants}>
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
