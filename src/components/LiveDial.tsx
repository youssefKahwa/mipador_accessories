import { useId } from "react";
import { useClock } from "../hooks/useClock";

// The hero's signature piece: a genuinely live-ticking analog dial, not a
// photo. Hands are computed from the visitor's real clock every second —
// including a real date window. This is the one mechanic that could only
// exist on a watch brand's site.
export function LiveDial({ size = 420, className }: { size?: number; className?: string }) {
  const now = useClock(1000);
  const uid = useId();

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const date = now.getDate();

  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  const c = 200;
  const outerR = 190;
  const bezelR = 176;
  const dialR = 158;

  const hourTicks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const rOuter = dialR - 6;
    const rInner = dialR - 24;
    return {
      key: i,
      x1: c + rOuter * Math.sin(angle),
      y1: c - rOuter * Math.cos(angle),
      x2: c + rInner * Math.sin(angle),
      y2: c - rInner * Math.cos(angle),
    };
  });

  const minuteTicks = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const angle = (i * 6 * Math.PI) / 180;
    const rOuter = dialR - 6;
    const rInner = dialR - 13;
    return {
      key: i,
      x1: c + rOuter * Math.sin(angle),
      y1: c - rOuter * Math.cos(angle),
      x2: c + rInner * Math.sin(angle),
      y2: c - rInner * Math.cos(angle),
    };
  }).filter(Boolean) as { key: number; x1: number; y1: number; x2: number; y2: number }[];

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={now.toLocaleTimeString()}
    >
      <defs>
        <radialGradient id={`${uid}-case`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#EEF2F7" />
          <stop offset="55%" stopColor="#B6C2D1" />
          <stop offset="100%" stopColor="#5E6C80" />
        </radialGradient>
        <radialGradient id={`${uid}-dial`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#16213E" />
          <stop offset="100%" stopColor="#060912" />
        </radialGradient>
      </defs>

      <circle cx={c} cy={c} r={outerR} fill={`url(#${uid}-case)`} />
      <circle cx={c} cy={c} r={outerR} fill="none" stroke="#ffffff" strokeOpacity={0.4} strokeWidth={1} />
      <circle cx={c} cy={c} r={bezelR} fill="none" stroke="#00000030" strokeWidth={2} />

      <circle cx={c} cy={c} r={dialR} fill={`url(#${uid}-dial)`} />
      <circle cx={c} cy={c} r={dialR - 40} fill="none" stroke="#ffffff" strokeOpacity={0.06} strokeWidth={0.75} />
      <circle cx={c} cy={c} r={dialR - 70} fill="none" stroke="#ffffff" strokeOpacity={0.06} strokeWidth={0.75} />

      {minuteTicks.map((tk) => (
        <line key={`m-${tk.key}`} x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2} stroke="#ffffff" strokeOpacity={0.35} strokeWidth={1} />
      ))}
      {hourTicks.map((tk) => (
        <line key={`h-${tk.key}`} x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" />
      ))}

      {/* Date window */}
      <g transform={`translate(${c + dialR - 34}, ${c})`}>
        <rect x={-13} y={-11} width={26} height={22} rx={2} fill="#0B1224" stroke="#ffffff" strokeOpacity={0.3} strokeWidth={1} />
        <text x={0} y={6} textAnchor="middle" fontSize={13} fontFamily="var(--font-mono)" fontWeight={600} fill="#ffffff">
          {date}
        </text>
      </g>

      <text x={c} y={c - dialR * 0.45} textAnchor="middle" fontSize={13} fontFamily="var(--font-display)" letterSpacing={3} fill="#ffffff" fillOpacity={0.85}>
        MIPADOR
      </text>
      <text x={c} y={c - dialR * 0.45 + 16} textAnchor="middle" fontSize={7.5} fontFamily="var(--font-mono)" letterSpacing={2} fill="#6FB1FF">
        AUTOMATIC
      </text>

      {/* Hands — real, ticking */}
      <g transform={`rotate(${hourAngle} ${c} ${c})`}>
        <line x1={c} y1={c} x2={c} y2={c - dialR * 0.5} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" />
      </g>
      <g transform={`rotate(${minuteAngle} ${c} ${c})`}>
        <line x1={c} y1={c} x2={c} y2={c - dialR * 0.72} stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />
      </g>
      <g transform={`rotate(${secondAngle} ${c} ${c})`} style={{ transition: "transform 0.2s cubic-bezier(0.4,2.3,0.6,1)" }}>
        <line x1={c} y1={c + 24} x2={c} y2={c - dialR * 0.78} stroke="#C9A455" strokeWidth={1.5} strokeLinecap="round" />
      </g>
      <circle cx={c} cy={c} r={7} fill="#C9A455" />
      <circle cx={c} cy={c} r={2.5} fill="#0B1224" />
    </svg>
  );
}
