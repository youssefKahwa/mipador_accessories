import { useState, useEffect } from "react";
import { Box, Smartphone, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

const MODEL_VIEWER_URL =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";

function loadModelViewer() {
  if (document.querySelector(`script[src="${MODEL_VIEWER_URL}"]`)) return;
  const s = document.createElement("script");
  s.type = "module";
  s.src = MODEL_VIEWER_URL;
  document.head.appendChild(s);
}

interface Props {
  productName: string;
  glbUrl?: string;
  posterUrl?: string;
}

export function RoomVisualizer({ productName, glbUrl, posterUrl }: Props) {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (active) loadModelViewer();
  }, [active]);

  if (!glbUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-6 text-center bg-frost rounded-xl border border-dashed border-ink/15">
        <Box size={28} className="text-ink/65 mb-3" />
        <p className="text-xs font-black uppercase tracking-widest text-ink/65 mb-1">
          {t("visualizer.comingSoon")}
        </p>
        <p className="text-[10px] text-ink/65 font-light max-w-xs leading-relaxed">
          {t("visualizer.comingSoonHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {!active ? (
        <button
          onClick={() => setActive(true)}
          className="w-full flex items-center justify-center gap-3 bg-chrome text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2e1209] transition-colors"
        >
          <Box size={14} />
          {t("visualizer.view3D")}
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F0EDE9]">
            <model-viewer
              key={key}
              src={glbUrl}
              alt={productName}
              poster={posterUrl}
              camera-controls=""
              auto-rotate=""
              ar=""
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="fixed"
              shadow-intensity="1.2"
              exposure="0.85"
              loading="lazy"
              style={{ width: "100%", height: "100%" }}
            />
            <button
              onClick={() => setKey((k) => k + 1)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-surface transition-colors"
              aria-label="Reset view"
              title="Reset view"
            >
              <RotateCcw size={13} className="text-ink" />
            </button>
          </div>

          <div className="flex items-start gap-2.5 px-1">
            <Smartphone size={13} className="text-champagne shrink-0 mt-0.5" />
            <p className="text-[10px] text-ink/65 font-light leading-relaxed">
              {t("visualizer.arHint")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
