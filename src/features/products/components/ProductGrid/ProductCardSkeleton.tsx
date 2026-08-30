import React from "react";

const ProductCardSkeleton: React.FC = () => (
  <div className="flex flex-col animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-[4/5] rounded-md bg-mist border border-ink/8" />
    {/* Info */}
    <div className="mt-3.5 flex flex-col gap-2.5">
      <div className="h-2 w-20 rounded-sm bg-mist" />
      <div className="h-3 w-3/4 rounded-sm bg-mist" />
      <div className="h-2.5 w-full rounded-sm bg-mist" />
      <div className="flex items-center justify-between mt-1">
        <div className="h-3 w-16 rounded-sm bg-mist" />
        <div className="h-2 w-12 rounded-sm bg-mist" />
      </div>
      <div className="h-9 w-full rounded-sm bg-mist mt-1" />
    </div>
  </div>
);

export default ProductCardSkeleton;
