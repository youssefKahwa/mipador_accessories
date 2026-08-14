import type { SVGProps } from "react";

// The brand mark — an albatross in flight, tied to the "made to move free"
// story. Reused as a faint watermark across quiet/blank moments (empty
// states, 404, manifesto) so the identity shows up beyond the wordmark.
export function AlbatrossMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      {...props}
    >
      {/* Left wing — long, narrow, swept */}
      <path
        d="M288 100 C260 84 215 70 160 72 C195 66 248 82 278 100 Z"
        fill="currentColor"
      />
      <path
        d="M288 100 C255 86 200 74 150 76 C110 80 72 90 30 104 C75 90 135 80 210 84 C248 87 272 97 288 100 Z"
        fill="currentColor"
      />
      {/* Right wing — mirror */}
      <path
        d="M312 100 C340 84 385 70 440 72 C405 66 352 82 322 100 Z"
        fill="currentColor"
      />
      <path
        d="M312 100 C345 86 400 74 450 76 C490 80 528 90 570 104 C525 90 465 80 390 84 C352 87 328 97 312 100 Z"
        fill="currentColor"
      />
      {/* Body */}
      <ellipse cx="300" cy="100" rx="18" ry="9" fill="currentColor" />
      {/* Head */}
      <ellipse cx="316" cy="95" rx="10" ry="8" fill="currentColor" />
      {/* Beak */}
      <path d="M324 93 L340 96 L324 99 Z" fill="currentColor" />
      {/* Tail */}
      <path
        d="M284 105 C274 116 266 120 258 122 C268 115 278 109 284 105 Z"
        fill="currentColor"
      />
    </svg>
  );
}
