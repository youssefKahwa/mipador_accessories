import type { SVGProps } from "react";

// Compact dial mark for tight spaces (navbar, footer, favicon). See
// MeridianMark for the wide watermark variant of the same idea.
export function MeridianIcon(props: SVGProps<SVGSVGElement>) {
  const cx = 20;
  const cy = 20;

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      {...props}
    >
      <circle cx={cx} cy={cy} r={17} stroke="currentColor" strokeWidth={1.75} />
      <line x1={cx} y1={4.5} x2={cx} y2={7.5} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
      <line x1={cx} y1={32.5} x2={cx} y2={35.5} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
      <line x1={4.5} y1={cy} x2={7.5} y2={cy} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
      <line x1={32.5} y1={cy} x2={35.5} y2={cy} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />

      {/* Hands — ten past ten */}
      <line x1={cx} y1={cy} x2={cx - 7} y2={cy - 4} stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 9.5} y2={cy - 5.5} stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={1.6} fill="currentColor" />

      {/* Crown */}
      <rect x={37} y={17.5} width={3} height={5} rx={1} fill="currentColor" />
    </svg>
  );
}
