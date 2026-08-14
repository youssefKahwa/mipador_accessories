import { useParams, Navigate, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "../../i18n";

import Navbar from "../../assets/components/layout/Navbar";
import Footer from "../../assets/components/layout/Footer";
import AmbientBackground from "../../components/AmbientBackground";
import CartDrawer from "../products/components/Cart/CartDrawer";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";

// ── Lazy-loaded pages (code-split per route) ──────────────
const Homepage        = lazy(() => import("../home/Homepage"));
const ProductsPage    = lazy(() => import("../products/components/Page/ProductsPage"));
const ProductDetailPage = lazy(() => import("../products/components/Page/ProductDetailPage"));
const WishlistPage    = lazy(() => import("../products/components/Page/WishlistPage"));
const About           = lazy(() => import("../about/About"));
const Contact         = lazy(() => import("../contact/Contact"));
const NotFound        = lazy(() => import("../../pages/404Page"));
const PrivacyPolicy   = lazy(() => import("../legal/PrivacyPolicy"));
const RefundPolicy    = lazy(() => import("../legal/RefundPolicy"));
const TermsOfService  = lazy(() => import("../legal/TermsOfService"));
const FaqsPage        = lazy(() => import("../../pages/FaqsPage"));
const ColorPalettePicker = lazy(() => import("../tools/ColorPalettePicker"));

// Blank fallback — page fade transition covers the transition seam
const PageLoader = () => <div className="min-h-screen bg-cream" />;

const supported = ["en", "fr", "ar", "ma"];

export default function LanguageLayout() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // SINGLE SYNC SYSTEM (URL → everything)
  useEffect(() => {
    if (!lang || !supported.includes(lang)) return;

    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);

    const isRTL = lang === "ar" || lang === "ma";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  // First-visit browser language detection
  useEffect(() => {
    if (localStorage.getItem("lang")) return;

    const browserLang = navigator.language.toLowerCase();
    let detected = "fr";
    if (browserLang.includes("ar")) detected = "ar";
    else if (browserLang.includes("en")) detected = "en";

    localStorage.setItem("lang", detected);

    if (lang !== detected) {
      const path = window.location.pathname.split("/").slice(2).join("/");
      navigate(`/${detected}/${path}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lang || !supported.includes(lang)) {
    return <Navigate to="/fr" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AmbientBackground />
      <Navbar />
      <CartDrawer />
      <FloatingWhatsApp />

      <AnimatePresence initial={false} mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/faqs" element={<FaqsPage />} />

              <Route path="/tools/color-palette" element={<ColorPalettePicker />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
