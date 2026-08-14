import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Quote, Sun, Sunset, Moon, Check, Shuffle, Volume2 } from "lucide-react";
import { useVibeStore } from "../../store/vibe.store";
import { BRAND_COLORS } from "../../config/theme";
import type { PaletteId, RitualStep } from "./paletteData";

const ease = [0.22, 1, 0.36, 1] as const;
const EMPTY_RITUALS: string[] = [];

const RITUAL_ICON: Record<RitualStep["time"], React.ElementType> = {
  morning: Sun,
  midday: Sunset,
  evening: Moon,
};

// ── Save vibe button ──────────────────────────────────────────────────────────
export function SaveVibeButton({
  paletteId,
  textLight,
  label,
  savedLabel,
}: {
  paletteId: PaletteId;
  textLight: boolean;
  label: string;
  savedLabel: string;
}) {
  const isSaved = useVibeStore((s) => s.isSaved(paletteId));
  const toggle = useVibeStore((s) => s.toggleSavedPalette);

  return (
    <motion.button
      onClick={() => toggle(paletteId)}
      whileTap={{ scale: 0.94 }}
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm transition-colors ${
        isSaved
          ? "bg-white text-espresso border-white"
          : textLight
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-espresso/20 text-espresso hover:bg-espresso/5"
      }`}
    >
      <Heart size={12} fill={isSaved ? BRAND_COLORS.espresso : "none"} />
      {isSaved ? savedLabel : label}
    </motion.button>
  );
}

// ── Quote hero ─────────────────────────────────────────────────────────────────
export function VibeQuoteHero({
  quote,
  accent,
  label,
}: {
  quote: { text: string; source?: string };
  accent: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="bg-white rounded-3xl p-6 sm:p-8 mb-5 shadow-sm"
    >
      <Quote size={22} style={{ color: accent }} className="mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-espresso/65 mb-3">
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-black text-espresso leading-snug italic mb-2">
        "{quote.text}"
      </p>
      {quote.source && (
        <p className="text-xs font-bold text-espresso/65">— {quote.source}</p>
      )}
    </motion.div>
  );
}

// ── Ritual timeline ────────────────────────────────────────────────────────────
export function RitualTimeline({
  rituals,
  paletteId,
  isRTL,
  heading,
  timeLabels,
}: {
  rituals: RitualStep[];
  paletteId: PaletteId;
  isRTL: boolean;
  heading: string;
  timeLabels: Record<RitualStep["time"], string>;
}) {
  const completed = useVibeStore((s) => s.completedRituals[paletteId] ?? EMPTY_RITUALS);
  const toggleDone = useVibeStore((s) => s.toggleRitualDone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.06 }}
      className="bg-white rounded-3xl p-6 sm:p-8 mb-5 shadow-sm"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-espresso/65 mb-5">
        {heading}
      </p>
      <div className="space-y-4">
        {rituals.map((step, i) => {
          const Icon = RITUAL_ICON[step.time];
          const done = completed.includes(step.time);
          return (
            <motion.button
              key={step.time}
              onClick={() => toggleDone(paletteId, step.time)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: i * 0.06 }}
              className={`w-full flex items-start gap-3 text-start p-3 rounded-2xl border transition-colors ${
                done ? "border-espresso/15 bg-cream" : "border-transparent hover:bg-cream/60"
              } ${isRTL ? "flex-row-reverse text-end" : ""}`}
            >
              <span className="shrink-0 w-9 h-9 rounded-full bg-espresso/5 flex items-center justify-center mt-0.5">
                <Icon size={16} className="text-espresso/65" />
              </span>
              <span className="flex-1">
                <span className="block text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-1">
                  {timeLabels[step.time]}
                </span>
                <span className={`block text-sm font-bold leading-relaxed ${done ? "text-espresso/65 line-through" : "text-espresso/80"}`}>
                  {step.advice}
                </span>
              </span>
              <span
                className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                  done ? "bg-espresso border-espresso" : "border-espresso/20"
                }`}
              >
                {done && <Check size={13} className="text-white" />}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Mantra deck ────────────────────────────────────────────────────────────────
export function MantraDeck({
  mantras,
  accent,
  label,
  nextLabel,
}: {
  mantras: string[];
  accent: string;
  label: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % mantras.length);
  }, [mantras.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.12 }}
      className="rounded-3xl p-6 sm:p-8 mb-5 shadow-sm"
      style={{ backgroundColor: `${accent}20` }}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-espresso/65 mb-5">
        {label}
      </p>
      <div className="min-h-[88px] flex items-center mb-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -10, rotate: 1 }}
            transition={{ duration: 0.3, ease }}
            className="text-2xl sm:text-3xl font-black text-espresso leading-snug"
          >
            {mantras[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={next}
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl bg-espresso text-white hover:bg-espresso/90 transition-colors"
      >
        <Shuffle size={13} />
        {nextLabel}
      </button>
    </motion.div>
  );
}

// ── Soundscape card ─────────────────────────────────────────────────────────────
export function SoundscapeCard({ soundscape, label }: { soundscape: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.18 }}
      className="bg-white rounded-3xl p-6 sm:p-8 mb-5 shadow-sm flex items-start gap-4"
    >
      <span className="shrink-0 w-10 h-10 rounded-full bg-espresso/5 flex items-center justify-center">
        <Volume2 size={17} className="text-espresso/65" />
      </span>
      <span>
        <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-espresso/65 mb-2">
          {label}
        </span>
        <span className="block text-sm font-bold text-espresso/70 leading-relaxed italic">
          {soundscape}
        </span>
      </span>
    </motion.div>
  );
}
