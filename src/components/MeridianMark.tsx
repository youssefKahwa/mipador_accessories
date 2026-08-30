import type { SVGProps } from "react";

// The brand mark — a dial sitting on the meridian line, ticked like a
// horizon scale, hands set to ten-past-ten. Reused as a faint watermark
// across quiet/blank moments (empty states, 404, manifesto) so the
// identity shows up beyond the wordmark.
export function MeridianMark(props: SVGProps<SVGSVGElement>) {
  const cx = 300;
  const cy = 100;
  const outerR = 58;
  const innerR = 44;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const major = i % 3 === 0;
    const rOuter = innerR;
    const rInner = major ? innerR - 10 : innerR - 6;
    const x1 = cx + rOuter * Math.sin(angle);
    const y1 = cy - rOuter * Math.cos(angle);
    const x2 = cx + rInner * Math.sin(angle);
    const y2 = cy - rInner * Math.cos(angle);
    return { x1, y1, x2, y2, key: i };
  });

  const railTicks = [40, 80, 120, 160, 200, 240, 340, 380, 420, 460, 500, 540].map((x) => ({
    x,
    key: x,
  }));

  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      {...props}
    >
      {/* Meridian line */}
      <line x1={0} y1={cy} x2={600} y2={cy} stroke="currentColor" strokeWidth={1} opacity={0.6} />
      {railTicks.map(({ x, key }) => (
        <line key={key} x1={x} y1={cy - 5} x2={x} y2={cy + 5} stroke="currentColor" strokeWidth={1} opacity={0.5} />
      ))}

      {/* Dial */}
      <circle cx={cx} cy={cy} r={outerR} stroke="currentColor" strokeWidth={1.25} />
      <circle cx={cx} cy={cy} r={innerR} stroke="currentColor" strokeWidth={1} opacity={0.6} />

      {ticks.map(({ x1, y1, x2, y2, key }) => (
        <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={key % 3 === 0 ? 2 : 1} />
      ))}

      {/* Hands — set to ten past ten */}
      <line x1={cx} y1={cy} x2={cx - 20.8} y2={cy - 12} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 29.4} y2={cy - 17} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={2.5} fill="currentColor" />

      {/* Crown */}
      <rect x={outerR + cx} y={cy - 6} width={10} height={12} rx={2} stroke="currentColor" strokeWidth={1.25} />
    </svg>
  );
}
