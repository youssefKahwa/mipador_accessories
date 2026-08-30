import { useId } from "react";

// Code-drawn watch portrait used wherever real product photography isn't
// available yet. Parameterized by the product's own colorways so every
// piece reads as itself rather than a generic placeholder. See
// ProductVisual.tsx for the <img>-with-fallback wrapper that renders this.
export function WatchIllustration({
  dialColor = "#1E3FA0",
  strapColor = "#B6C2D1",
  caseTone = "steel",
  variant = 0,
  className,
}: {
  dialColor?: string;
  strapColor?: string;
  caseTone?: "steel" | "black" | "gold";
  variant?: number;
  className?: string;
}) {
  const uid = useId();
  const cx = 150;
  const cy = 168;
  const outerR = 80;
  const bezelR = 74;
  const dialR = 64;

  const caseStops =
    caseTone === "black"
      ? ["#3A3E46", "#15171B", "#050608"]
      : caseTone === "gold"
      ? ["#E7CE9A", "#C9A455", "#8C6E33"]
      : ["#E7ECF3", "#B6C2D1", "#79879C"];

  // Slight per-variant hand angle so gallery thumbnails don't look identical
  const handShift = variant * 12;
  const hourAngle = ((300 + handShift) * Math.PI) / 180;
  const minAngle = ((60 + handShift * 2) * Math.PI) / 180;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const major = i % 3 === 0;
    const rOuter = dialR - 4;
    const rInner = major ? dialR - 14 : dialR - 9;
    return {
      key: i,
      x1: cx + rOuter * Math.sin(angle),
      y1: cy - rOuter * Math.cos(angle),
      x2: cx + rInner * Math.sin(angle),
      y2: cy - rInner * Math.cos(angle),
      major,
    };
  });

  const hourLen = dialR * 0.42;
  const minLen = dialR * 0.62;

  return (
    <svg
      viewBox="0 0 300 375"
      className={className}
      role="img"
      aria-label="Watch illustration"
    >
      <defs>
        <linearGradient id={`${uid}-case`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={caseStops[0]} />
          <stop offset="55%" stopColor={caseStops[1]} />
          <stop offset="100%" stopColor={caseStops[2]} />
        </linearGradient>
        <radialGradient id={`${uid}-dial`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={dialColor} stopOpacity="0.75" />
          <stop offset="100%" stopColor={dialColor} />
        </radialGradient>
        <linearGradient id={`${uid}-strap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strapColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={strapColor} />
        </linearGradient>
      </defs>

      {/* Strap — top */}
      <path
        d={`M${cx - 26} ${cy - outerR + 10} L${cx - 20} 0 L${cx + 20} 0 L${cx + 26} ${cy - outerR + 10} Z`}
        fill={`url(#${uid}-strap)`}
        opacity={0.9}
      />
      {/* Strap — bottom */}
      <path
        d={`M${cx - 26} ${cy + outerR - 10} L${cx - 20} 375 L${cx + 20} 375 L${cx + 26} ${cy + outerR - 10} Z`}
        fill={`url(#${uid}-strap)`}
        opacity={0.9}
      />
      {/* Strap stitching */}
      <line x1={cx - 16} y1={30} x2={cx - 16} y2={cy - outerR + 20} stroke="#00000022" strokeWidth={1} strokeDasharray="3 4" />
      <line x1={cx + 16} y1={30} x2={cx + 16} y2={cy - outerR + 20} stroke="#00000022" strokeWidth={1} strokeDasharray="3 4" />
      <line x1={cx - 16} y1={345} x2={cx - 16} y2={cy + outerR - 20} stroke="#00000022" strokeWidth={1} strokeDasharray="3 4" />
      <line x1={cx + 16} y1={345} x2={cx + 16} y2={cy + outerR - 20} stroke="#00000022" strokeWidth={1} strokeDasharray="3 4" />

      {/* Crown */}
      <rect x={cx + outerR - 4} y={cy - 8} width={14} height={16} rx={3} fill={`url(#${uid}-case)`} stroke="#00000030" strokeWidth={0.75} />

      {/* Case */}
      <circle cx={cx} cy={cy} r={outerR} fill={`url(#${uid}-case)`} />
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#ffffff" strokeOpacity={0.35} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={bezelR} fill="none" stroke="#00000035" strokeWidth={1.5} />

      {/* Dial */}
      <circle cx={cx} cy={cy} r={dialR} fill={`url(#${uid}-dial)`} />
      <circle cx={cx} cy={cy} r={dialR} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={1} />

      {/* Guilloché rings */}
      <circle cx={cx} cy={cy} r={dialR - 18} fill="none" stroke="#ffffff" strokeOpacity={0.1} strokeWidth={0.75} />
      <circle cx={cx} cy={cy} r={dialR - 30} fill="none" stroke="#ffffff" strokeOpacity={0.1} strokeWidth={0.75} />

      {/* Ticks */}
      {ticks.map((tk) => (
        <line
          key={tk.key}
          x1={tk.x1}
          y1={tk.y1}
          x2={tk.x2}
          y2={tk.y2}
          stroke="#ffffff"
          strokeOpacity={0.85}
          strokeWidth={tk.major ? 2.5 : 1}
          strokeLinecap="round"
        />
      ))}

      {/* Wordmark */}
      <text x={cx} y={cy - dialR * 0.42} textAnchor="middle" fontSize={7} fontFamily="serif" letterSpacing={2} fill="#ffffff" fillOpacity={0.75}>
        MIPADOR
      </text>

      {/* Hands */}
      <line
        x1={cx} y1={cy}
        x2={cx + hourLen * Math.sin(hourAngle)} y2={cy - hourLen * Math.cos(hourAngle)}
        stroke="#C9A455" strokeWidth={4} strokeLinecap="round"
      />
      <line
        x1={cx} y1={cy}
        x2={cx + minLen * Math.sin(minAngle)} y2={cy - minLen * Math.cos(minAngle)}
        stroke="#C9A455" strokeWidth={3} strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={4} fill="#C9A455" />
      <circle cx={cx} cy={cy} r={1.6} fill="#0B1224" />
    </svg>
  );
}
