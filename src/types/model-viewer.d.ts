// Type declarations for the <model-viewer> web component from Google.
// https://modelviewer.dev

import type { CSSProperties, HTMLAttributes, DetailedHTMLProps } from "react";

type ModelViewerElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    poster?: string;
    "camera-controls"?: boolean | "";
    "auto-rotate"?: boolean | "";
    ar?: boolean | "";
    "ar-modes"?: string;
    "ar-scale"?: string;
    "shadow-intensity"?: string | number;
    exposure?: string | number;
    "environment-image"?: string;
    style?: CSSProperties;
    loading?: "auto" | "lazy" | "eager";
  },
  HTMLElement
>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerElement;
    }
  }
}
