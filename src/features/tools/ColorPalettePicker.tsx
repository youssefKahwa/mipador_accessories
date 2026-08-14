import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check, Copy, MessageCircle, RotateCcw, Sparkles, ChevronDown } from "lucide-react";
import { useSEO, useJsonLd } from "../../hooks/useSEO";
import { products } from "../../data/products";
import { WHATSAPP_NUMBER } from "../../config/whatsapp";
import ScrollToTop from "../../components/ScrollToTop";
import { PALETTES, type PaletteId, type PaletteLang, type RitualStep } from "./paletteData";
import { VibeQuoteHero, RitualTimeline, MantraDeck, SoundscapeCard, SaveVibeButton } from "./VibeLifestyle";

const SITE_URL = "https://mipador.com";
const ease = [0.22, 1, 0.36, 1] as const;

function toLang(l: string): PaletteLang {
  if (l === "fr" || l === "ar" || l === "ma") return l;
  return "en";
}

// ── Per-palette card visual themes ────────────────────────────────────────────
type SwatchLayout = "strips" | "arch" | "circles" | "diagonal" | "blocks" | "starburst";

interface CardTheme {
  bg: string;
  textLight: boolean;
  layout: SwatchLayout;
}

const CARD_THEMES: Record<PaletteId, CardTheme> = {
  "warm-cozy":       { bg: "#C4845A", textLight: false, layout: "arch"      },
  "fresh-bright":    { bg: "#D4E4D8", textLight: false, layout: "strips"    },
  "bold-dramatic":   { bg: "#1A2834", textLight: true,  layout: "diagonal"  },
  "natural-minimal": { bg: "#E8E4DC", textLight: false, layout: "blocks"    },
  "riad-blue":       { bg: "#3A6B8D", textLight: true,  layout: "circles"   },
  "tadelakt-soul":   { bg: "#9B7355", textLight: true,  layout: "diagonal"  },
  "atlas-cedar":     { bg: "#2D3B2A", textLight: true,  layout: "strips"    },
  "zahra-dusk":      { bg: "#C49490", textLight: false, layout: "arch"      },
  "golden-hour":     { bg: "#C49835", textLight: false, layout: "starburst" },
  "medina-soul":     { bg: "#1A3C3C", textLight: true,  layout: "circles"   },
  "pure-breath":     { bg: "#F0EDE8", textLight: false, layout: "blocks"    },
  "new-medina":      { bg: "#A04832", textLight: true,  layout: "strips"    },
};

// ── Per-palette SVG swatch designs (used as fallback when no image) ───────────
function SwatchPreview({
  swatches,
  layout,
}: {
  swatches: { hex: string }[];
  layout: SwatchLayout;
}) {
  const s = swatches;

  if (layout === "strips") {
    return (
      <svg viewBox="0 0 100 56" className="w-full h-full" preserveAspectRatio="none">
        {s.map((sw, i) => (
          <rect key={i} x={i * 20} y={0} width={20} height={56} fill={sw.hex} />
        ))}
      </svg>
    );
  }

  if (layout === "arch") {
    return (
      <svg viewBox="0 0 100 56" className="w-full h-full">
        <rect x={0} y={0} width={100} height={56} fill={s[0].hex} />
        <path d="M10,56 L10,30 Q10,10 32,10 Q54,10 54,30 L54,56" fill={s[1].hex} />
        <path d="M52,56 L52,34 Q52,18 70,18 Q88,18 88,34 L88,56" fill={s[2].hex} />
        <circle cx={82} cy={10} r={7} fill={s[3].hex} />
        <rect x={0} y={46} width={12} height={10} fill={s[4].hex} rx={2} />
      </svg>
    );
  }

  if (layout === "circles") {
    return (
      <svg viewBox="0 0 100 56" className="w-full h-full">
        <rect x={0} y={0} width={100} height={56} fill={s[0].hex} />
        <circle cx={10} cy={28} r={12} fill={s[1].hex} />
        <circle cx={32} cy={28} r={18} fill={s[2].hex} />
        <circle cx={58} cy={28} r={18} fill={s[3].hex} />
        <circle cx={84} cy={28} r={14} fill={s[4].hex} />
      </svg>
    );
  }

  if (layout === "diagonal") {
    const tp = [0, 20, 40, 60, 80, 100];
    const bp = [-8, 12, 32, 52, 72, 100];
    return (
      <svg viewBox="0 0 100 56" className="w-full h-full">
        {s.map((sw, i) => (
          <polygon
            key={i}
            points={`${tp[i]},0 ${tp[i + 1]},0 ${bp[i + 1]},56 ${bp[i]},56`}
            fill={sw.hex}
          />
        ))}
      </svg>
    );
  }

  if (layout === "blocks") {
    return (
      <svg viewBox="0 0 100 56" className="w-full h-full">
        <rect x={0}  y={0}  width={62} height={34} fill={s[0].hex} />
        <rect x={0}  y={34} width={62} height={22} fill={s[1].hex} />
        <rect x={62} y={0}  width={38} height={20} fill={s[2].hex} />
        <rect x={62} y={20} width={38} height={18} fill={s[3].hex} />
        <rect x={62} y={38} width={38} height={18} fill={s[4].hex} />
      </svg>
    );
  }

  if (layout === "starburst") {
    const rays: [number, number][] = [
      [100, 28], [87, 62], [50, 72], [13, 62],
      [0, 28],   [13, -6], [50, -16], [87, -6],
    ];
    return (
      <svg viewBox="0 0 100 56" className="w-full h-full">
        <rect x={0} y={0} width={100} height={56} fill={s[0].hex} />
        {rays.map(([x2, y2], i) => (
          <line key={i} x1={50} y1={28} x2={x2} y2={y2}
            stroke={s[4].hex} strokeWidth={1.5} opacity={0.5} />
        ))}
        <circle cx={50} cy={28} r={14} fill={s[1].hex} />
        <circle cx={16} cy={11} r={6}  fill={s[2].hex} />
        <circle cx={84} cy={45} r={5}  fill={s[3].hex} />
        <circle cx={82} cy={9}  r={3}  fill={s[4].hex} opacity={0.8} />
      </svg>
    );
  }

  return null;
}

// ── Animated palette color band ───────────────────────────────────────────────
// Each palette ID's image goes in /public/palette-moods/{id}.jpg
function ColorBand({ swatches }: { swatches: { hex: string }[] }) {
  return (
    <div className="relative flex h-2.5 w-full overflow-hidden">
      {swatches.map((sw, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: sw.hex }} />
      ))}
      <motion.div
        className="absolute inset-y-0 left-0 w-[40%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
        }}
        animate={{ x: ["-120%", "400%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
      />
    </div>
  );
}

// ── Mood image pair ───────────────────────────────────────────────────────────
// Desktop: parent needs `group` class — hover crossfades primary → secondary.
// Mobile:  no hover, so auto-cycles every 3 s instead.
// Drop images in /public/palette-moods/{id}.jpg and {id}2.jpg.
function MoodImagePair({
  id,
  alt,
  layout,
  swatches,
}: {
  id: string;
  alt: string;
  layout: SwatchLayout;
  swatches: { hex: string }[];
}) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    // Only auto-cycle on touch/no-hover devices
    if (!window.matchMedia("(hover: none)").matches) return;
    const timer = setInterval(() => setShowSecond((v) => !v), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* SVG design — always present as fallback */}
      <div className="absolute inset-0">
        <SwatchPreview swatches={swatches} layout={layout} />
      </div>
      {/* Primary image: visible by default, fades out on hover or when cycling */}
      <img
        src={`/palette-moods/${id}.jpg`}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 ${showSecond ? "opacity-0" : "opacity-100"}`}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      {/* Secondary image: hidden by default, fades in on hover or when cycling */}
      <img
        src={`/palette-moods/${id}2.jpg`}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-100 ${showSecond ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    </>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const ColorPalettePicker: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const l = lang || "fr";
  const paletteLang = toLang(l);
  const isRTL = l === "ar" || l === "ma";

  const [step, setStep] = useState<1 | 2>(1);
  const [paletteId, setPaletteId] = useState<PaletteId | null>(null);
  const [copied, setCopied] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const ritualTimeLabels: Record<RitualStep["time"], string> = {
    morning: t("colorPicker.lifestyle.morning"),
    midday: t("colorPicker.lifestyle.midday"),
    evening: t("colorPicker.lifestyle.evening"),
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  useSEO(t("colorPicker.seo.title"), t("colorPicker.seo.desc"));

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/${l}/tools/color-palette#webpage`,
          "url": `${SITE_URL}/${l}/tools/color-palette`,
          "name": `${t("colorPicker.seo.title")} | Mipador`,
          "description": t("colorPicker.seo.desc"),
          "isPartOf": { "@id": `${SITE_URL}/#website` },
          "inLanguage": l,
        },
        {
          "@type": "SoftwareApplication",
          "name": t("colorPicker.hero.heading"),
          "applicationCategory": "DesignApplication",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
          "operatingSystem": "Web",
          "url": `${SITE_URL}/${l}/tools/color-palette`,
        },
      ],
    }),
    [l, t]
  );
  useJsonLd(schema);

  const activePalette = paletteId ? PALETTES.find((p) => p.id === paletteId) ?? null : null;
  const activeTheme   = paletteId ? CARD_THEMES[paletteId] : null;

  const recommendedProducts = useMemo(() => {
    if (!activePalette) return [];
    return activePalette.productSlugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter(Boolean) as typeof products;
  }, [activePalette]);

  const handlePaletteSelect = useCallback((id: PaletteId) => {
    setPaletteId(id);
    setStep(2);
    setShowProducts(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, []);

  const handleReset = useCallback(() => {
    setPaletteId(null);
    setStep(1);
    setShowProducts(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCopy = useCallback(() => {
    if (!activePalette) return;
    const text = activePalette.swatches.map((s) => s.hex).join("  ");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activePalette]);

  const whatsappMsg = useMemo(() => {
    if (!activePalette) return "";
    const paletteName = activePalette.name[paletteLang];
    const hexes = activePalette.swatches.map((s) => s.hex).join(", ");
    return encodeURIComponent(
      `Hello Mipador! I used your color palette tool.\nPalette: "${paletteName}".\nColors: ${hexes}\nCan you help me choose the right pieces?`
    );
  }, [activePalette, paletteLang]);

  return (
    <div className="min-h-screen bg-cream">
      <ScrollToTop />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-espresso/65 mb-4"
          >
            <Sparkles size={11} className="text-espresso/65" />
            {t("colorPicker.hero.eyebrow")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
            className="text-4xl md:text-5xl font-black text-espresso leading-tight mb-4"
          >
            {t("colorPicker.hero.heading")}{" "}
            <span className="text-espresso/65">{t("colorPicker.hero.headingSoft")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="text-base text-espresso/65 max-w-lg mx-auto"
          >
            {t("colorPicker.hero.body")}
          </motion.p>
        </div>
      </section>

      {/* ── Step progress ────────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-10 px-4">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-500 ${
              s <= step ? "bg-espresso w-10" : "bg-espresso/12 w-6"
            }`}
          />
        ))}
      </div>

      {/* ── Steps ───────────────────────────────────────────────────────────── */}
      <div className="px-4 pb-28">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Palette grid ──────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-espresso/65 text-center mb-2">
                {t("colorPicker.step2.label")}
              </p>
              <h2 className="text-2xl font-black text-espresso text-center mb-8">
                {t("colorPicker.step2.heading")}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {PALETTES.map((palette, idx) => {
                  const theme = CARD_THEMES[palette.id];
                  const textCol = theme.textLight ? "text-white" : "text-espresso";
                  const subCol  = theme.textLight ? "text-white/60" : "text-espresso/65";
                  return (
                    <motion.button
                      key={palette.id}
                      onClick={() => handlePaletteSelect(palette.id)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease, delay: idx * 0.04 }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="group flex flex-col overflow-hidden rounded-2xl cursor-pointer text-start shadow-sm hover:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso/30"
                      style={{ backgroundColor: theme.bg }}
                    >
                      {/* ── Mood image */}
                      <div className="w-full aspect-[4/3] relative overflow-hidden">
                        <MoodImagePair
                          id={palette.id}
                          alt={palette.name[paletteLang]}
                          layout={theme.layout}
                          swatches={palette.swatches}
                        />
                      </div>

                      {/* ── Animated palette color band */}
                      <ColorBand swatches={palette.swatches} />

                      {/* ── Name + feel */}
                      <div className="p-3 pb-4">
                        <p className={`text-sm font-black leading-snug ${textCol}`}>
                          {palette.name[paletteLang]}
                        </p>
                        <p className={`text-[10px] mt-0.5 leading-snug line-clamp-1 ${subCol}`}>
                          {palette.vibe[paletteLang].feel.join(" · ")}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Results ───────────────────────────────────────────────── */}
          {step === 2 && activePalette && activeTheme && (
            <motion.div
              key="step2"
              ref={resultsRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="max-w-3xl mx-auto"
            >
              {/* ── Start over (top) ────────────────────────────────────────── */}
              <div className="text-center mb-6">
                <button
                  onClick={handleReset}
                  className={`inline-flex items-center gap-2 text-xs font-bold text-espresso/65 hover:text-espresso transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <RotateCcw size={12} />
                  {t("colorPicker.results.startOver")}
                </button>
              </div>

              {/* ── Palette hero banner ──────────────────────────────────────── */}
              <div
                className="rounded-3xl overflow-hidden mb-5"
                style={{ backgroundColor: activeTheme.bg }}
              >
                {/* Mood image area — group enables hover crossfade on desktop */}
                <div className="group w-full relative" style={{ aspectRatio: "16/7" }}>
                  <MoodImagePair
                    id={activePalette.id}
                    alt={activePalette.name[paletteLang]}
                    layout={activeTheme.layout}
                    swatches={activePalette.swatches}
                  />
                </div>

                {/* Color band */}
                <ColorBand swatches={activePalette.swatches} />

                {/* Title */}
                <div className={`px-6 py-5 flex items-end justify-between gap-4 ${activeTheme.textLight ? "text-white" : "text-espresso"}`}>
                  <div>
                    <p className={`text-xs font-black uppercase tracking-[0.2em] mb-1 ${activeTheme.textLight ? "text-white/50" : "text-espresso/65"}`}>
                      {t("colorPicker.results.yourPalette")}
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-black">
                      {activePalette.name[paletteLang]}
                    </h2>
                  </div>
                  <SaveVibeButton
                    paletteId={activePalette.id}
                    textLight={activeTheme.textLight}
                    label={t("colorPicker.lifestyle.saveVibe")}
                    savedLabel={t("colorPicker.lifestyle.savedVibe")}
                  />
                </div>
              </div>

              {/* ── Swatches with hex codes ──────────────────────────────────── */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 mb-5 shadow-sm">
                <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6">
                  {activePalette.swatches.map((swatch, i) => (
                    <motion.div
                      key={swatch.hex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                      className="flex flex-col gap-2"
                    >
                      <div
                        className="w-full aspect-square rounded-xl sm:rounded-2xl shadow-sm"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="text-center">
                        <p className="text-[9px] sm:text-[10px] font-bold text-espresso/65 leading-tight">
                          {t(`colorPicker.${swatch.roleKey}`)}
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-black text-espresso font-mono mt-0.5">
                          {swatch.hex}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                    copied
                      ? "border-green-400 bg-green-50 text-green-700"
                      : "border-espresso/12 text-espresso/65 hover:border-espresso/25 hover:text-espresso"
                  } ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? t("colorPicker.results.copied") : t("colorPicker.results.copyHex")}
                </button>
              </div>

              {/* ── Vibe section ────────────────────────────────────────────── */}
              {(() => {
                const vibe    = activePalette.vibe[paletteLang];
                const accent  = activePalette.swatches[0].hex;
                const accent2 = activePalette.swatches[1].hex;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.1 }}
                    className="rounded-3xl overflow-hidden mb-5"
                    style={{ borderLeft: `4px solid ${accent}` }}
                  >
                    <div className="bg-white px-6 sm:px-8 py-8 sm:py-10">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-espresso/65 mb-5">
                        {t("colorPicker.results.theVibe")}
                      </p>
                      <p className="text-xl sm:text-2xl font-black text-espresso leading-snug mb-5 italic">
                        "{vibe.headline}"
                      </p>
                      <p className="text-sm text-espresso/65 leading-relaxed mb-8">
                        {vibe.desc}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-3">
                            {t("colorPicker.results.youllFeel")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {vibe.feel.map((f) => (
                              <span
                                key={f}
                                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-espresso"
                                style={{ backgroundColor: `${accent}30` }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-3">
                            {t("colorPicker.results.bestFor")}
                          </p>
                          <ul className="space-y-1.5">
                            {vibe.bestFor.map((b) => (
                              <li key={b} className={`flex items-center gap-2 text-xs font-bold text-espresso/70 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent2 }} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* ── Lifestyle: how to live this color ─────────────────────────── */}
              {(() => {
                const lifestyle = activePalette.lifestyle[paletteLang];
                const accent    = activePalette.swatches[0].hex;
                return (
                  <>
                    <VibeQuoteHero
                      quote={lifestyle.quote}
                      accent={accent}
                      label={t("colorPicker.lifestyle.aThoughtToCarry")}
                    />
                    <RitualTimeline
                      rituals={lifestyle.rituals}
                      paletteId={activePalette.id}
                      isRTL={isRTL}
                      heading={t("colorPicker.lifestyle.howToLive")}
                      timeLabels={ritualTimeLabels}
                    />
                    <MantraDeck
                      mantras={lifestyle.mantras}
                      accent={accent}
                      label={t("colorPicker.lifestyle.yourMantra")}
                      nextLabel={t("colorPicker.lifestyle.nextMantra")}
                    />
                    <SoundscapeCard
                      soundscape={lifestyle.soundscape}
                      label={t("colorPicker.lifestyle.soundOfThisVibe")}
                    />
                  </>
                );
              })()}

              {/* ── Matching pieces (collapsed, optional) ──────────────────────── */}
              <div className="mb-8">
                <button
                  onClick={() => setShowProducts((v) => !v)}
                  className={`w-full flex items-center justify-between gap-2 text-xs font-bold text-espresso/65 hover:text-espresso transition-colors px-1 py-3 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {t("colorPicker.lifestyle.matchingPiecesToggle")}
                  <motion.span animate={{ rotate: showProducts ? 180 : 0 }} transition={{ duration: 0.25, ease }}>
                    <ChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {showProducts && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                          {recommendedProducts.map((product) => (
                            <Link
                              key={product.id}
                              to={`/${l}/products/${product.slug}`}
                              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-espresso/8"
                            >
                              <div className="aspect-square overflow-hidden bg-[#F0EDE8]">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>
                              <div className="p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-1">
                                  {product.collection}
                                </p>
                                <p className="text-sm font-black text-espresso mb-1">{product.name}</p>
                                <p className="text-xs text-espresso/65 mb-3 line-clamp-2 leading-relaxed">
                                  {product.tagline}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-black text-espresso">
                                    {product.price.toLocaleString()} MAD
                                  </span>
                                  <span className="text-xs font-bold text-espresso/65 group-hover:text-espresso transition-colors">
                                    {t("colorPicker.results.viewProduct")} →
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* ── CTAs ─────────────────────────────────────────────── */}
                        <div
                          className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-center justify-between"
                          style={{ backgroundColor: activeTheme.bg }}
                        >
                          <div>
                            <p className={`font-black mb-1 ${activeTheme.textLight ? "text-white" : "text-espresso"}`}>
                              {t("colorPicker.results.talkToUs")}
                            </p>
                            <p className={`text-xs max-w-xs ${activeTheme.textLight ? "text-white/50" : "text-espresso/65"}`}>
                              {t("colorPicker.results.talkToUsHint")}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <a
                              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center gap-2 bg-whatsapp text-espresso text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-whatsapp-dark transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <MessageCircle size={14} />
                              WhatsApp
                            </a>
                            <Link
                              to={`/${l}/products`}
                              className={`flex items-center justify-center text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-colors ${
                                activeTheme.textLight
                                  ? "bg-white text-espresso hover:bg-white/90"
                                  : "bg-espresso text-white hover:bg-espresso/90"
                              }`}
                            >
                              {t("colorPicker.results.shopCollection")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Start over */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className={`inline-flex items-center gap-2 text-xs font-bold text-espresso/65 hover:text-espresso transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <RotateCcw size={12} />
                  {t("colorPicker.results.startOver")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ColorPalettePicker;
