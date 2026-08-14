import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Fade + rise on scroll into view. Transform/opacity only (GPU-cheap),
// fires once, and respects MotionConfig's reducedMotion="user" (see App.tsx).
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = motion.div,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: typeof motion.div;
}) {
  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Component>
  );
}
