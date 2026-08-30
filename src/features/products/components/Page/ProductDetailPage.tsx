import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight,
  Check, AlertTriangle, Clock, Minus, Plus, Star, X,
  Cog, Droplets, ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { products } from "../../../../data/products";
import type { AccessoryType } from "../../../../data/products";
import { localizeProduct } from "../../../../utils/localizeProduct";
import { getProductReviews, getAvgRating } from "../../../../data/reviews";
import { useProductStore } from "../../../../store/product.store";
import OrderForm from "../Order/OrderForm";
import ScrollToTop from "../../../../components/ScrollToTop";
import TrustBadges from "../../../../components/TrustBadges";
import { useSEO, useJsonLd } from "../../../../hooks/useSEO";
import { ReviewsSection } from "../Reviews/ReviewsSection";
import { RoomVisualizer } from "../../../../components/RoomVisualizer";
import { WatchSizeDiagram } from "../../../../components/WatchSizeDiagram";
import { DispatchCountdown } from "../../../../components/DispatchCountdown";
import { ProductVisual } from "../../../../components/ProductVisual";
import { SITE } from "../../../../config/site";

const SITE_URL = SITE.url;

// ── Helpers ───────────────────────────────────────────────
const clampPan = (z: number, x: number, y: number) => {
  const lim = Math.max(0, (z - 1) * 320);
  return { x: Math.max(-lim, Math.min(lim, x)), y: Math.max(-lim, Math.min(lim, y)) };
};

// ── Full-screen image lightbox with zoom + pan ─────────────
const ImageLightbox: React.FC<{
  images: string[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
  productName: string;
  dialColor?: string;
  strapColor?: string;
  accessoryType?: AccessoryType;
  categoryLabel?: string;
}> = ({ images, index, setIndex, onClose, productName, dialColor, strapColor, accessoryType, categoryLabel }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduce = useReducedMotion();

  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ on: false, mx0: 0, my0: 0, px0: 0, py0: 0 });
  const lastDist = useRef<number | null>(null);
  const touchPan = useRef<{ x0: number; y0: number; px0: number; py0: number } | null>(null);
  const swipeX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickMoved = useRef(false);
  const MAX_ZOOM = 4;

  const commit = useCallback((nz: number, np: { x: number; y: number }) => {
    const p = nz <= 1 ? { x: 0, y: 0 } : clampPan(nz, np.x, np.y);
    zoomRef.current = nz; panRef.current = p;
    setZoom(nz); setPan(p);
  }, []);

  const reset = useCallback(() => commit(1, { x: 0, y: 0 }), [commit]);
  const goTo = useCallback((i: number) => { commit(1, { x: 0, y: 0 }); setIndex(i); }, [commit, setIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if ((e.key === "ArrowLeft") && zoomRef.current <= 1) { goTo(Math.max(0, index - 1)); }
      if ((e.key === "ArrowRight") && zoomRef.current <= 1) { goTo(Math.min(images.length - 1, index + 1)); }
      if (e.key === "+" || e.key === "=") commit(Math.min(MAX_ZOOM, zoomRef.current + 0.5), panRef.current);
      if (e.key === "-") commit(Math.max(1, zoomRef.current - 0.5), panRef.current);
      if (e.key === "0") reset();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, index, images.length, setIndex, goTo, reset, commit]);

  // Wheel zoom — tracks cursor position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const h = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const nz = Math.max(1, Math.min(MAX_ZOOM, zoomRef.current + (e.deltaY < 0 ? 0.3 : -0.3)));
      if (nz <= 1) { commit(1, { x: 0, y: 0 }); return; }
      const r = nz / zoomRef.current;
      commit(nz, { x: cx * (1 - r) + panRef.current.x * r, y: cy * (1 - r) + panRef.current.y * r });
    };
    el.addEventListener("wheel", h, { passive: false });
    return () => el.removeEventListener("wheel", h);
  }, [commit]);

  const onMD = (e: React.MouseEvent) => {
    if (zoomRef.current <= 1) return;
    e.preventDefault();
    clickMoved.current = false;
    dragRef.current = { on: true, mx0: e.clientX, my0: e.clientY, px0: panRef.current.x, py0: panRef.current.y };
    setIsDragging(true);
  };
  const onMM = (e: React.MouseEvent) => {
    if (!dragRef.current.on) return;
    const dx = e.clientX - dragRef.current.mx0;
    const dy = e.clientY - dragRef.current.my0;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) clickMoved.current = true;
    const np = clampPan(zoomRef.current, dragRef.current.px0 + dx, dragRef.current.py0 + dy);
    panRef.current = np; setPan(np);
  };
  const onMU = () => { dragRef.current.on = false; setIsDragging(false); };

  // Click: toggle 1× ↔ 2×, zoomed to cursor
  const onContainerClick = (e: React.MouseEvent) => {
    if (clickMoved.current) { clickMoved.current = false; return; }
    const rect = containerRef.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    if (zoomRef.current > 1) reset();
    else commit(2, { x: cx * (1 - 2), y: cy * (1 - 2) });
  };

  // Touch: pinch-to-zoom + drag-to-pan + swipe-to-navigate
  const onTS = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastDist.current = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
    } else if (e.touches.length === 1) {
      if (zoomRef.current > 1) {
        touchPan.current = { x0: e.touches[0].clientX, y0: e.touches[0].clientY, px0: panRef.current.x, py0: panRef.current.y };
      } else {
        swipeX.current = e.touches[0].clientX;
      }
    }
  };
  const onTM = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && lastDist.current !== null) {
      const d = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
      const nz = Math.max(1, Math.min(MAX_ZOOM, zoomRef.current * (d / lastDist.current)));
      if (nz <= 1) commit(1, { x: 0, y: 0 });
      else { zoomRef.current = nz; setZoom(nz); }
      lastDist.current = d;
    } else if (e.touches.length === 1 && touchPan.current && zoomRef.current > 1) {
      const np = clampPan(zoomRef.current, touchPan.current.px0 + e.touches[0].clientX - touchPan.current.x0, touchPan.current.py0 + e.touches[0].clientY - touchPan.current.y0);
      panRef.current = np; setPan(np);
    }
  };
  const onTE = (e: React.TouchEvent) => {
    if (swipeX.current !== null && zoomRef.current <= 1) {
      const dx = e.changedTouches[0].clientX - swipeX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) goTo(Math.min(images.length - 1, index + 1));
        else goTo(Math.max(0, index - 1));
      }
      swipeX.current = null;
    }
    lastDist.current = null;
    touchPan.current = null;
  };

  const img = images[index];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] bg-black/94 flex flex-col select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0 border-b border-white/8">
        <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.22em]">
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-0.5 bg-white/8 rounded-xl px-2 py-1">
          <button
            onClick={() => commit(Math.max(1, zoomRef.current - 0.5), panRef.current)}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            className="w-8 h-7 flex items-center justify-center text-white/55 hover:text-white disabled:opacity-20 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-white/50 text-[10px] font-black w-10 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => commit(Math.min(MAX_ZOOM, zoomRef.current + 0.5), panRef.current)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            className="w-8 h-7 flex items-center justify-center text-white/55 hover:text-white disabled:opacity-20 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Plus size={12} />
          </button>
          {zoom > 1 && (
            <button
              onClick={reset}
              aria-label="Reset zoom"
              className="ml-1 h-6 px-2 text-[9px] font-black uppercase tracking-wide text-white/50 hover:text-white border border-white/12 hover:border-white/30 rounded-lg transition-colors"
            >
              1:1
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Image area */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        onMouseDown={onMD}
        onMouseMove={onMM}
        onMouseUp={onMU}
        onMouseLeave={onMU}
        onClick={onContainerClick}
        onTouchStart={onTS}
        onTouchMove={onTM}
        onTouchEnd={onTE}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center",
                transition: isDragging ? "none" : "transform 0.1s ease-out",
                willChange: "transform",
              }}
            >
              <ProductVisual
                src={img}
                alt={`${productName} — ${index + 1}`}
                dialColor={dialColor}
                strapColor={strapColor}
                variant={index}
                accessoryType={accessoryType}
                categoryLabel={categoryLabel}
                imgClassName="max-w-[90vw] max-h-[78vh] object-contain block select-none pointer-events-none"
                containerClassName="w-[62vw] max-w-[440px] aspect-[4/5] max-h-[78vh]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        {index > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); goTo(index - 1); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/22 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {index < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goTo(index + 1); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-white/10 hover:bg-white/22 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {zoom === 1 && (
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-white/22 text-[9px] font-black uppercase tracking-[0.22em]">
            Scroll or click · Pinch on mobile
          </p>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2.5 px-5 py-3 shrink-0 border-t border-white/8 overflow-x-auto">
          {images.map((th, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ring-2 ${
                i === index ? "ring-white opacity-100" : "ring-transparent opacity-30 hover:opacity-60"
              }`}
            >
              <ProductVisual
                src={th}
                alt={`${productName} ${i + 1}`}
                dialColor={dialColor}
                strapColor={strapColor}
                variant={i}
                accessoryType={accessoryType}
                categoryLabel={categoryLabel}
                imgClassName="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
};

// ── Collapsible product detail section ────────────────────
const DetailSection: React.FC<{
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ label, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-ink/8">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-ink/65">
          {label}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 ${
            open ? "bg-chrome text-white" : "bg-ink/8 text-ink/65"
          }`}
        >
          {open ? <Minus size={10} /> : <Plus size={10} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

// ── Stock alert ───────────────────────────────────────────
const StockAlert: React.FC<{ stock: number }> = ({ stock }) => {
  const { t } = useTranslation();
  if (stock <= 0) return null;

  if (stock <= 3) {
    return (
      <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <AlertTriangle size={14} className="text-red-500 shrink-0" />
        <p className="text-xs font-black text-red-600 uppercase tracking-wider">
          {t("product.onlyLeft", { count: stock })}
        </p>
      </div>
    );
  }

  if (stock <= 8) {
    return (
      <div className="flex items-center gap-2 bg-champagne/8 border border-champagne/20 rounded-xl px-4 py-3">
        <Clock size={14} className="text-champagne shrink-0" />
        <p className="text-xs font-black text-ink uppercase tracking-wider">
          {t("product.lowStock", { count: stock })}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-xl bg-green-500" />
      <p className="text-xs font-black text-green-600 uppercase tracking-widest">
        {t("product.inStock")}
      </p>
    </div>
  );
};

// ── Star rating ───────────────────────────────────────────
const StarRating: React.FC<{ rating: number; count: number }> = ({ rating, count }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={13}
            className={
              n <= Math.round(rating)
                ? "text-champagne fill-champagne"
                : "text-ink/65"
            }
          />
        ))}
      </div>
      <p className="text-xs text-ink/65 font-light">
        {count > 0
          ? `${rating.toFixed(1)} · ${t("reviews.count", { count })}`
          : t("reviews.noReviews")}
      </p>
    </div>
  );
};

// ── Small spec tile ─────────────────────────────────────────
const SpecTile: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-surface rounded-xl px-4 py-3 border border-ink/8">
    <p className="text-[9px] font-black uppercase tracking-widest text-ink/65 mb-0.5">{label}</p>
    <p className="text-sm font-black text-ink">{value}</p>
  </div>
);

// ── Main page ─────────────────────────────────────────────
const ProductDetailPage: React.FC = () => {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const { addToCart } = useProductStore();
  const { t } = useTranslation();
  const currentLang = lang || "fr";

  const [imgIndex, setImgIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const orderBoxRef = useRef<HTMLDivElement>(null);
  const [orderBoxVisible, setOrderBoxVisible] = useState(true);

  const rawProduct = products.find((p) => p.slug === slug);
  const product = rawProduct ? localizeProduct(rawProduct, currentLang) : undefined;
  const productReviews = getProductReviews(product?.id ?? "");
  const avgRating = getAvgRating(product?.id ?? "");

  const productOgImage = product?.images[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : `${SITE_URL}${product.images[0]}`
    : undefined;

  // SEO — runs for every product (hooks must be unconditional)
  useSEO(
    product
      ? `${product.name} — ${product.tagline}`
      : t("product.notFound"),
    product
      ? `${product.description} Made by ${SITE.brandName}. ${product.materials.join(", ")}.`
      : undefined,
    product
      ? {
          ogImage: productOgImage,
          ogType: "product",
          imageAlt: `${product.name} — ${product.tagline} | ${SITE.brandName}`,
        }
      : undefined
  );

  const jsonLdSchema = useMemo(() => {
    if (!product) return null;

    const availability =
      product.status === "available"
        ? "https://schema.org/InStock"
        : product.status === "out-of-stock"
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/PreOrder";

    const productUrl = `${SITE_URL}/${currentLang}/products/${product.slug}`;

    const BREADCRUMB_LABELS: Record<string, { home: string; collection: string }> = {
      en: { home: "Home", collection: "Collection" },
      fr: { home: "Accueil", collection: "Collection" },
      ar: { home: "الرئيسية", collection: "المجموعة" },
    };
    const bc = BREADCRUMB_LABELS[currentLang] ?? BREADCRUMB_LABELS.en;

    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": productUrl,
      "name": product.name,
      "description": product.description,
      "sku": product.slug,
      "url": productUrl,
      "image": product.images.map((img) =>
        img.startsWith("http") ? img : `${SITE_URL}${img}`
      ),
      "brand": {
        "@type": "Brand",
        "name": SITE.brandName,
        "@id": `${SITE_URL}/#organization`,
      },
      "manufacturer": {
        "@type": "Organization",
        "name": SITE.brandName,
        "@id": `${SITE_URL}/#organization`,
      },
      "material": product.materials.join(", "),
      "category": `${product.accessoryType}/${product.subcategory}`,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "MAD",
        "price": product.price,
        "availability": availability,
        "url": productUrl,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": SITE.brandName,
          "@id": `${SITE_URL}/#organization`,
        },
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": bc.home,
            "item": `${SITE_URL}/${currentLang}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": bc.collection,
            "item": `${SITE_URL}/${currentLang}/products`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": productUrl,
          },
        ],
      },
    };

    if (productReviews.length > 0) {
      schema["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": avgRating.toFixed(1),
        "reviewCount": productReviews.length,
        "bestRating": 5,
        "worstRating": 1,
      };
      schema["review"] = productReviews.map((r) => ({
        "@type": "Review",
        "name": r.title,
        "reviewBody": r.body,
        "datePublished": r.date,
        "author": { "@type": "Person", "name": r.author },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.rating,
          "bestRating": 5,
          "worstRating": 1,
        },
      }));
    }

    return schema;
  }, [product, productReviews, avgRating, currentLang]);
  useJsonLd(jsonLdSchema);

  // Sticky mobile buy bar appears once the main order box scrolls off-screen
  useEffect(() => {
    const el = orderBoxRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOrderBoxVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-frost flex flex-col items-center justify-center text-center px-6">
        <p className="text-ink/65 font-black text-sm uppercase tracking-widest mb-6">
          {t("product.notFound")}
        </p>
        <Link
          to={`/${currentLang}/products`}
          className="text-[10px] font-black uppercase tracking-widest text-champagne border-b border-champagne/40 pb-0.5"
        >
          {t("product.backToCollection")}
        </Link>
      </div>
    );
  }

  const isComingSoon = product.status === "coming-soon";
  const isOutOfStock = product.status === "out-of-stock";
  const isUnavailable = isComingSoon || isOutOfStock;
  const stock = product.stock ?? 12;
  const totalPrice = product.price * quantity;
  const currentImage = product.images[imgIndex];
  const dialColor = product.colorSwatches?.[selectedColorIndex] ?? product.colorSwatches?.[0];
  const strapColor =
    product.colorSwatches?.[selectedColorIndex === 0 ? 1 : 0] ?? product.colorSwatches?.[0];

  const handleAddToCart = () => {
    if (!isUnavailable) {
      for (let i = 0; i < quantity; i++) addToCart(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.collection === product.collection || p.subcategory === product.subcategory)
    )
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-frost overflow-hidden">
      <ScrollToTop />

      {/* ── Image lightbox ── */}
      <AnimatePresence>
        {zoomed && product && (
          <ImageLightbox
            images={product.images}
            index={imgIndex}
            setIndex={setImgIndex}
            onClose={() => setZoomed(false)}
            productName={product.name}
            dialColor={dialColor}
            strapColor={strapColor}
            accessoryType={product.accessoryType}
            categoryLabel={product.subcategory}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24">

        {/* Back */}
        <Link
          to={`/${currentLang}/products`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ink/65 hover:text-ink transition-colors mb-8 md:mb-14"
        >
          <ArrowLeft size={13} /> {t("product.backToCollection")}
        </Link>

        {/* ── Main grid: image | info ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 md:items-start">

          {/* ── Images — sticky on desktop ── */}
          <div className="flex flex-col gap-3 md:sticky md:top-28">

            {/* Desktop: left thumbnail strip + main image */}
            <div className="flex gap-3 items-start">

              {/* Vertical thumbnails — desktop only */}
              {product.images.length > 1 && (
                <div className="hidden md:flex flex-col gap-2 w-[66px] shrink-0">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-full aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        i === imgIndex
                          ? "border-ink opacity-100"
                          : "border-transparent opacity-35 hover:opacity-65"
                      }`}
                    >
                      <ProductVisual
                        src={img}
                        alt={`${product.name} — ${i + 1}`}
                        dialColor={dialColor}
                        strapColor={strapColor}
                        variant={i}
                        accessoryType={product.accessoryType}
                        categoryLabel={product.subcategory}
                        imgClassName="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div
                className="relative flex-1 aspect-[4/5] rounded-xl bg-cloud overflow-hidden cursor-zoom-in"
                onClick={() => setZoomed(true)}
                onKeyDown={(e) => e.key === "Enter" && setZoomed(true)}
                tabIndex={0}
                role="button"
                aria-label={t("product.zoomClose")}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (Math.abs(dx) > 50) {
                    if (dx < 0) setImgIndex((i) => Math.min(product.images.length - 1, i + 1));
                    else setImgIndex((i) => Math.max(0, i - 1));
                  }
                  touchStartX.current = null;
                }}
              >
                {/* Animated image transition */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${imgIndex}-${selectedColorIndex}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ProductVisual
                      src={currentImage}
                      alt={product.name}
                      dialColor={dialColor}
                      strapColor={strapColor}
                      variant={imgIndex}
                      accessoryType={product.accessoryType}
                      categoryLabel={product.subcategory}
                      imgClassName="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.015]"
                      containerClassName="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                {isUnavailable && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-xl pointer-events-none">
                    <p className="text-[9px] font-black uppercase tracking-widest text-ink">
                      {isComingSoon ? t("card.comingSoon") : t("card.soldOut")}
                    </p>
                  </div>
                )}
                {product.tags.includes("bestseller") && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-chrome rounded-xl pointer-events-none">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white">
                      {t("card.bestseller")}
                    </p>
                  </div>
                )}

                {/* Mobile prev/next arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIndex((i) => Math.max(0, i - 1)); }}
                      disabled={imgIndex === 0}
                      className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 rounded-xl flex items-center justify-center disabled:opacity-0 hover:bg-surface transition-all duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={15} className="text-ink" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIndex((i) => Math.min(product.images.length - 1, i + 1)); }}
                      disabled={imgIndex === product.images.length - 1}
                      className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 rounded-xl flex items-center justify-center disabled:opacity-0 hover:bg-surface transition-all duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight size={15} className="text-ink" />
                    </button>
                  </>
                )}

                {/* Dot indicators — mobile */}
                {product.images.length > 1 && (
                  <div className="md:hidden absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                    {product.images.map((_, i) => (
                      <div
                        key={i}
                        className={`transition-all duration-300 rounded-full ${
                          i === imgIndex ? "bg-surface w-5 h-1.5" : "bg-white/40 w-1.5 h-1.5"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Zoom hint — desktop */}
                <div className="hidden md:flex absolute bottom-3.5 right-3.5 items-center gap-1.5 bg-black/22 backdrop-blur-sm rounded-lg px-2.5 py-1.5 pointer-events-none">
                  <span className="text-[9px] font-black uppercase tracking-wider text-white/65">
                    Click to zoom
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex md:hidden gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`shrink-0 w-[68px] h-[68px] rounded-xl overflow-hidden border-2 transition-all snap-start ${
                      i === imgIndex
                        ? "border-ink opacity-100"
                        : "border-transparent opacity-40 hover:opacity-70"
                    }`}
                  >
                    <ProductVisual
                      src={img}
                      alt={`${product.name} — ${i + 1}`}
                      dialColor={dialColor}
                      strapColor={strapColor}
                      variant={i}
                      accessoryType={product.accessoryType}
                      categoryLabel={product.subcategory}
                      imgClassName="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info + Order ── */}
          <div className="flex flex-col gap-5">

            {/* Header */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/65 mb-2">
                {product.collection} · {product.subcategory}
              </p>
              <h1 className="text-2xl md:text-4xl font-black text-ink tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-ink/65 italic text-sm mt-1.5">
                {product.tagline}
              </p>
              {product.specs.kind === "watches" && (
                <p className="text-ink/65 text-[11px] font-black uppercase tracking-widest mt-2.5">
                  {product.specs.caseDiameter}mm · {t(`product.movement.${product.specs.movement}`)}
                </p>
              )}
            </div>

            {/* Rating */}
            <StarRating rating={avgRating} count={productReviews.length} />

            {/* Price */}
            <div>
              <p className="text-3xl font-black text-ink">
                {product.price.toLocaleString()} MAD
              </p>
              {quantity > 1 && (
                <p className="text-sm text-ink/65 mt-1 font-light">
                  × {quantity} ={" "}
                  <span className="font-black text-ink">
                    {totalPrice.toLocaleString()} MAD
                  </span>
                </p>
              )}
            </div>

            {/* Quick specs — instant credibility scan */}
            <div className="grid grid-cols-3 gap-2">
              {product.specs.kind === "watches" && (
                <>
                  <div className="flex flex-col items-center gap-1.5 bg-surface rounded-xl border border-ink/8 py-3 px-1">
                    <Cog size={16} className="text-ink/45" />
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-ink/65 text-center leading-tight">
                      {t(`product.movement.${product.specs.movement}`)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 bg-surface rounded-xl border border-ink/8 py-3 px-1">
                    <Droplets size={16} className="text-ink/45" />
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-ink/65 text-center leading-tight">
                      {product.specs.waterResistance}
                    </span>
                  </div>
                </>
              )}
              <div className="flex flex-col items-center gap-1.5 bg-surface rounded-xl border border-ink/8 py-3 px-1">
                <ShieldCheck size={16} className="text-ink/45" />
                <span className="text-[8.5px] font-black uppercase tracking-wider text-ink/65 text-center leading-tight">
                  {product.specs.warranty}
                </span>
              </div>
            </div>

            {/* Colorway picker — swaps the visual, feeds the order message */}
            {product.colors.length > 1 && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-ink/65 mb-2.5">
                  {t("product.colorway")}:{" "}
                  <span className="text-ink normal-case font-bold">
                    {product.colors[selectedColorIndex]}
                  </span>
                </p>
                <div className="flex gap-2.5">
                  {product.colors.map((c, i) => {
                    const hex = product.colorSwatches?.[i];
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedColorIndex(i)}
                        aria-label={c}
                        aria-pressed={selectedColorIndex === i}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                          selectedColorIndex === i
                            ? "border-ink scale-110"
                            : "border-transparent hover:border-ink/25"
                        }`}
                        style={{ backgroundColor: hex ?? "#9AA5B5" }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock alert */}
            {!isUnavailable && <StockAlert stock={stock} />}

            {/* Trust badges */}
            <TrustBadges />

            {/* ── ORDER FORM ── */}
            {!isUnavailable && (
              <div ref={orderBoxRef} className="bg-surface rounded-xl p-5 border border-ink/8 flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-ink/65">
                  {t("product.orderThisPiece")}
                </p>

                <DispatchCountdown className="flex items-center gap-2 text-[11px] font-bold text-ink bg-champagne/8 border border-champagne/20 rounded-lg px-3 py-2.5 w-fit" />

                {/* Quantity selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ink/65">
                    {t("product.quantity")}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-frost rounded-xl p-1.5">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} className="text-ink" />
                      </button>
                      <span className="text-sm font-black text-ink w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(stock || 10, q + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} className="text-ink" />
                      </button>
                    </div>
                    {stock > 0 && stock <= 8 && (
                      <p className="text-[10px] text-ink font-black uppercase tracking-wider">
                        {t("product.countAvailable", { count: stock })}
                      </p>
                    )}
                  </div>
                </div>

                <OrderForm
                  lines={[{
                    name: product.name,
                    collection: product.collection,
                    price: product.price,
                    quantity,
                  }]}
                  total={totalPrice}
                  onSuccess={() => setQuantity(1)}
                  engravingAvailable={product.engravingAvailable}
                  selectedColor={product.colors[selectedColorIndex]}
                />

                {/* Add to cart — secondary CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 border ${
                    added
                      ? "bg-champagne/10 border-champagne/30 text-champagne"
                      : "bg-transparent border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {added ? (
                    <><Check size={12} /> {t("product.addedToCart")}</>
                  ) : (
                    <><ShoppingBag size={12} /> {t("product.addToCartInstead")}</>
                  )}
                </button>
              </div>
            )}

            {/* Unavailable state */}
            {isUnavailable && (
              <div className="w-full py-4 rounded-xl bg-ink/8 text-ink/65 text-[10px] font-black uppercase tracking-widest text-center">
                {isComingSoon
                  ? t("product.unavailableComingSoon")
                  : t("product.unavailableSoldOut")}
              </div>
            )}
          </div>
        </div>

        {/* ── Collapsible detail sections — full width, breaks out of the
             image/info grid so the page doesn't leave a tall empty gap in
             the left column once the sticky image scrolls out of view.
             Split into two columns on desktop so the freed-up width is
             actually used instead of leaving a blank void on the right. ── */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
          <div>
            <DetailSection label={t("product.aboutThisPiece")} defaultOpen>
              <p className="text-ink/65 text-sm leading-relaxed font-light">
                {product.description}
              </p>
            </DetailSection>

            {product.specs.kind === "watches" && (
              <>
                <DetailSection label={t("product.specSheet")} defaultOpen>
                  <WatchSizeDiagram
                    caseDiameter={product.specs.caseDiameter}
                    caseThickness={product.specs.caseThickness}
                    lugToLug={product.specs.lugToLug}
                    weight={product.specs.weight}
                  />
                </DetailSection>

                <DetailSection label={t("product.movementSpecs")}>
                  <div className="grid grid-cols-2 gap-3">
                    <SpecTile label={t("product.specMovement")} value={t(`product.movement.${product.specs.movement}`)} />
                    <SpecTile label={t("product.specWaterResistance")} value={product.specs.waterResistance} />
                    {product.specs.powerReserve && (
                      <SpecTile label={t("product.specPowerReserve")} value={product.specs.powerReserve} />
                    )}
                    <SpecTile label={t("product.specWarranty")} value={product.specs.warranty} />
                  </div>
                </DetailSection>
              </>
            )}

            <DetailSection label={t("product.materials")}>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-surface border border-ink/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-ink/65"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </DetailSection>
          </div>

          <div className="border-t border-ink/8 md:border-t-0 mt-1 md:mt-0">
            <DetailSection label={t("product.care")}>
              <ul className="space-y-2">
                {product.care.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-ink/65 font-light"
                  >
                    <span className="text-champagne shrink-0 font-black mt-0.5">·</span>
                    {c}
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection label={t("product.leadTime")}>
              <div className="space-y-3">
                <p className="text-sm text-ink/65 font-light">
                  {t("product.leadTimeValue", { time: product.leadTime })}
                </p>
                {!isUnavailable && (
                  <DispatchCountdown className="inline-flex items-center gap-2 text-xs font-bold text-ink bg-champagne/8 border border-champagne/20 rounded-lg px-3 py-2.5" />
                )}
              </div>
            </DetailSection>

            <DetailSection label={t("visualizer.heading")}>
              <RoomVisualizer
                productName={product.name}
                glbUrl={product.model}
              />
            </DetailSection>
          </div>
        </div>

        {/* ── Reviews ── */}
        <ReviewsSection productId={product.id} productName={product.name} />

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-32">
            <div className="border-t border-ink/10 pt-12 mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-2">
                {t("product.youMayAlsoLike")}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-ink tracking-tight">
                {t("product.fromTheSameWorld")}
              </h2>
            </div>

            {/* Horizontal scroll on mobile, 3-col grid on md+ */}
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/${currentLang}/products/${p.slug}`}
                  className="flex flex-col group shrink-0 w-[70vw] sm:w-[48vw] md:w-auto snap-start"
                  onClick={() => {
                    setImgIndex(0);
                    setSelectedColorIndex(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="aspect-[3/4] rounded-xl bg-cloud overflow-hidden">
                    <ProductVisual
                      src={p.images[0]}
                      alt={p.name}
                      dialColor={p.colorSwatches?.[0]}
                      strapColor={p.colorSwatches?.[1] ?? p.colorSwatches?.[0]}
                      accessoryType={p.accessoryType}
                      categoryLabel={p.subcategory}
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-ink/65">
                      {p.collection}
                    </p>
                    <p className="text-sm font-black text-ink tracking-tight mt-1">
                      {p.name}
                    </p>
                    <p className="text-sm font-black text-ink mt-1.5">
                      {p.price.toLocaleString()} MAD
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Sticky mobile buy bar — appears once the order box scrolls off ── */}
      <AnimatePresence>
        {!isUnavailable && !orderBoxVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-ink/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-black uppercase tracking-widest text-ink/50 truncate">
                {product.name}
              </p>
              <p className="text-sm font-black text-ink">
                {product.price.toLocaleString()} MAD
              </p>
            </div>
            <button
              onClick={() => orderBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="shrink-0 bg-chrome text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl active:scale-95 transition-transform"
            >
              {t("product.orderThisPiece")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
