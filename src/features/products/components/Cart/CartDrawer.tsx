import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useProductStore } from "../../../../store/product.store";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OrderForm from "../Order/OrderForm";
import { WHATSAPP_NUMBER } from "../../../../config/whatsapp";
import TrustBadges from "../../../../components/TrustBadges";
import { localizeProduct } from "../../../../utils/localizeProduct";
import { MeridianMark } from "../../../../components/MeridianMark";
import { ProductVisual } from "../../../../components/ProductVisual";

const DELIVERY = 200;
const FREE_DELIVERY_THRESHOLD = 6000;

const CartDrawer: React.FC = () => {
  const {
    cart, cartOpen, setCartOpen,
    allProducts, updateQuantity,
    removeFromCart, clearCart, getCartTotal,
  } = useProductStore();

  const { t } = useTranslation();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const total = getCartTotal();
  const isFreeDelivery = total >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = total > 0 && !isFreeDelivery ? DELIVERY : 0;
  const grandTotal = total + deliveryFee;

  const { lang } = useParams();
  const currentLang = lang || "fr";
  const isRTL = currentLang === "ar" || currentLang === "ma";

  const cartProducts = cart
    .map((item) => {
      const raw = allProducts.find((p) => p.id === item.productId);
      if (!raw) return null;
      return { item, product: localizeProduct(raw, currentLang) };
    })
    .filter(Boolean) as {
    item: (typeof cart)[number];
    product: (typeof allProducts)[number];
  }[];

  const handleClose = () => {
    setCartOpen(false);
    setShowOrderForm(false);
  };

  const handleWhatsAppOrder = () => {
    const items = cartProducts
      .map(
        ({ item, product }) =>
          `• ${product.name} (${product.collection}) × ${item.quantity} — ${(product.price * item.quantity).toLocaleString()} MAD`
      )
      .join("\n");

    const message = [
      t("whatsapp.quickMessage"),
      "",
      items,
      "",
      `${t("cart.subtotal")}: ${total.toLocaleString()} MAD`,
      `${t("cart.deliveryEstimate")}: ${isFreeDelivery ? t("cart.free") : `${deliveryFee} MAD`}`,
      `${t("cart.total")}: ${grandTotal.toLocaleString()} MAD`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Body scroll lock
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!cartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClose(); return; }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[60]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("cart.title")}
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 bottom-0 w-full max-w-md bg-frost z-[70] flex flex-col shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-ink" />
                <span className="text-sm font-black text-ink uppercase tracking-widest">
                  {t("cart.title")} ({cart.reduce((s, i) => s + i.quantity, 0)})
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-ink/8 transition-colors"
                aria-label={t("cart.close")}
              >
                <X size={16} className="text-ink" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

              {/* Cart items */}
              <div className="px-6 py-6 space-y-4">
                {cartProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col items-center justify-center py-16 text-center overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <div className="w-full max-w-xs text-ink opacity-[0.04]">
                        <MeridianMark />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                      <ShoppingBag size={40} className="text-ink/15 mb-4" />
                      <p className="text-ink/65 font-black text-sm uppercase tracking-widest">
                        {t("cart.empty")}
                      </p>
                      <p className="text-ink/65 text-xs mt-2 mb-5">
                        {t("cart.emptyHint")}
                      </p>
                      <Link
                        to={`/${currentLang}/products`}
                        onClick={handleClose}
                        className="text-[10px] font-black uppercase tracking-widest text-ink border-b border-ink/30 pb-0.5"
                      >
                        {t("cart.exploreCollection")}
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cartProducts.map(({ item, product }) => (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 bg-surface rounded-xl p-4"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-md bg-cloud overflow-hidden shrink-0">
                          <ProductVisual
                            src={product.images[0]}
                            alt={product.name}
                            dialColor={product.colorSwatches?.[0]}
                            strapColor={product.colorSwatches?.[1] ?? product.colorSwatches?.[0]}
                            accessoryType={product.accessoryType}
                            categoryLabel={product.subcategory}
                            imgClassName="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-ink/65">
                            {product.collection}
                          </p>
                          <p className="text-sm font-black text-ink tracking-tight mt-0.5 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm font-black text-ink mt-1">
                            {(product.price * item.quantity).toLocaleString()} MAD
                          </p>

                          {/* Qty + remove */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-frost rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface transition-colors"
                                aria-label={`Decrease quantity of ${product.name}`}
                              >
                                <Minus size={11} className="text-ink" />
                              </button>
                              <span className="text-xs font-black text-ink w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface transition-colors"
                                aria-label={`Increase quantity of ${product.name}`}
                              >
                                <Plus size={11} className="text-ink" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              <Trash2 size={13} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Order section */}
              {cartProducts.length > 0 && (
                <div className="px-6 pb-8 border-t border-ink/10 pt-5 space-y-4">

                  {/* Totals */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs text-ink/65">
                      <span>{t("cart.subtotal")}</span>
                      <span>{total.toLocaleString()} MAD</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 bg-champagne/6 border border-champagne/15 rounded-xl px-3 py-2.5">
                      <div>
                        <p className="text-xs font-black text-ink/70">{t("cart.deliveryEstimate")}</p>
                        <p className="text-[9px] text-ink font-black uppercase tracking-wider mt-0.5">
                          {isFreeDelivery
                            ? t("cart.freeDeliveryUnlocked")
                            : t("cart.freeDeliveryOver", { amount: "6 000" })}
                        </p>
                      </div>
                      <span className="text-sm font-black text-ink shrink-0">
                        {isFreeDelivery ? t("cart.free") : `${DELIVERY} MAD`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-ink pt-2 border-t border-ink/10">
                      <span>{t("cart.total")}</span>
                      <span>{grandTotal.toLocaleString()} MAD</span>
                    </div>
                  </div>

                  {/* Trust signals — shown before committing to order */}
                  {!showOrderForm && <TrustBadges />}

                  {/* Toggle order form */}
                  <button
                    onClick={() => setShowOrderForm((v) => !v)}
                    className="w-full bg-chrome text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-chrome-light active:scale-95 transition-all"
                  >
                    <ShoppingCart size={14} />
                    {showOrderForm
                      ? t("cart.hideOrderForm")
                      : t("cart.placeOrder", { total: grandTotal.toLocaleString() })}
                  </button>

                  {/* Inline order form */}
                  {showOrderForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface rounded-xl p-5"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-ink/65 mb-5">
                        {t("cart.completeOrder")}
                      </p>
                      <OrderForm
                        lines={cartProducts.map(({ item, product }) => ({
                          name: product.name,
                          collection: product.collection,
                          price: product.price,
                          quantity: item.quantity,
                        }))}
                        total={grandTotal}
                        onSuccess={() => {
                          clearCart();
                          setShowOrderForm(false);
                          setCartOpen(false);
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Order via WhatsApp — quick inquiry, no form required */}
                  {!showOrderForm && (
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full border border-whatsapp text-ink py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-whatsapp/8 active:scale-95 transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 text-whatsapp" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t("whatsapp.orderViaWhatsApp")}
                    </button>
                  )}

                  {/* Clear cart */}
                  {!showOrderForm && (
                    <button
                      onClick={clearCart}
                      className="w-full text-ink/65 text-[9px] font-black uppercase tracking-widest hover:text-ink/65 transition-colors"
                    >
                      {t("cart.clearCart")}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
