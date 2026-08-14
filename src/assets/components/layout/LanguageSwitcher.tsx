import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  {
    code: "fr",
    label: "Français",
    short: "FR",
    flag: "/flags/fr.png",
  },
  {
    code: "en",
    label: "English",
    short: "EN",
    flag: "/flags/en.png",
  },
  {
    code: "ar",
    label: "العربية",
    short: "AR",
    flag: "/flags/ar.png",
  },
  // {
  //   code: "ma",
  //   label: "دارجة",
  //   short: "MA",
  //   flag: "/flags/ma.png",
  // },
];

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang } = useParams();
  const navigate = useNavigate();

  const currentLang = lang || "fr";

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const current =
    languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLang = (newLang: string) => {
    const path = window.location.pathname
      .split("/")
      .slice(2)
      .join("/");

    localStorage.setItem("lang", newLang);

    navigate(`/${newLang}/${path}`);

    setOpen(false);
  };

  return (
    <div className="relative z-40" ref={wrapperRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`group flex items-center rounded-xl border border-espresso/10 bg-white/70 backdrop-blur-xl hover:bg-white transition-all duration-300 ${
          compact ? "p-2" : "gap-2 px-2.5 py-2"
        }`}
        aria-label={current.label}
      >
        <img
          src={current.flag}
          alt={current.label}
          className="w-5 h-5 rounded-xl object-cover"
        />

        {!compact && (
          <>
            <span className="text-[11px] font-semibold tracking-wide text-espresso">
              {current.short}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] text-espresso/65"
            >
              ▼
            </motion.span>
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[120%] w-44 overflow-hidden rounded-xl border border-espresso/10 bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                  currentLang === l.code
                    ? "bg-espresso text-white"
                    : "hover:bg-cream text-espresso"
                }`}
              >
                <img
                  src={l.flag}
                  alt={l.label}
                  className="w-5 h-5 rounded-xl object-cover"
                />

                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">
                    {l.label}
                  </span>

                  <span className="text-[10px] opacity-60">
                    {l.short}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}