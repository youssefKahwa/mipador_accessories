import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

const WRIST_SIZES = [
  { key: "S", mm: 150, rangeMin: 34, rangeMax: 39 },
  { key: "M", mm: 165, rangeMin: 38, rangeMax: 43 },
  { key: "L", mm: 185, rangeMin: 42, rangeMax: 47 },
] as const;

// A real fit-guidance tool, not decoration: pick a wrist size and see
// whether this case diameter is a comfortable match, sized against an
// SVG diagram of the actual case.
export function WatchSizeDiagram({
  caseDiameter,
  caseThickness,
  lugToLug,
  weight,
  className,
}: {
  caseDiameter: number;
  caseThickness: number;
  lugToLug: number;
  weight: number;
  className?: string;
}) {
  const { t } = useTranslation();
  const [wrist, setWrist] = useState<(typeof WRIST_SIZES)[number]["key"]>("M");
  const active = WRIST_SIZES.find((w) => w.key === wrist)!;
  const fits = caseDiameter >= active.rangeMin && caseDiameter <= active.rangeMax;
  const runsLarge = caseDiameter > active.rangeMax;

  const size = 156;
  const c = size / 2;
  const scale = 118 / 46;
  const r = (caseDiameter * scale) / 2;

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="text-ink shrink-0">
          <circle cx={c} cy={c} r={c - 3} fill="none" stroke="currentColor" strokeOpacity={0.15} strokeDasharray="2 5" />
          <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" strokeWidth={1.5} />
          <line x1={c - r} y1={c} x2={c + r} y2={c} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
          <line x1={c - r} y1={c - 4} x2={c - r} y2={c + 4} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
          <line x1={c + r} y1={c - 4} x2={c + r} y2={c + 4} stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} />
          <text x={c} y={c - r - 8} textAnchor="middle" fontSize={12} fontWeight={800} fill="currentColor">
            {caseDiameter}mm
          </text>
        </svg>

        <div className="flex-1 w-full">
          <p className="text-[10px] font-black uppercase tracking-widest text-ink/65 mb-2.5">
            {t("product.wristSize")}
          </p>
          <div className="flex gap-2">
            {WRIST_SIZES.map((w) => (
              <button
                key={w.key}
                onClick={() => setWrist(w.key)}
                className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors border ${
                  wrist === w.key
                    ? "bg-chrome text-white border-ink"
                    : "bg-surface text-ink/65 border-ink/12 hover:border-ink/30"
                }`}
              >
                {w.key}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-ink/50 mt-1.5">{t("product.wristSizeHint", { mm: active.mm })}</p>

          <div className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs font-bold ${
            fits ? "bg-green-50 text-green-700" : "bg-champagne/10 text-ink"
          }`}>
            {fits ? <Check size={14} className="shrink-0 mt-0.5" /> : <span className="shrink-0 mt-0.5">·</span>}
            <span>
              {fits
                ? t("product.fitGreat")
                : runsLarge
                ? t("product.fitRunsLarge")
                : t("product.fitRunsSmall")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        {[
          { label: t("product.specDiameter"), value: `${caseDiameter} mm` },
          { label: t("product.specThickness"), value: `${caseThickness} mm` },
          { label: t("product.specLugToLug"), value: `${lugToLug} mm` },
          { label: t("product.specWeight"), value: `${weight} g` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface rounded-xl px-4 py-3 border border-ink/8">
            <p className="text-[9px] font-black uppercase tracking-widest text-ink/65 mb-0.5">{label}</p>
            <p className="text-sm font-black text-ink">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
