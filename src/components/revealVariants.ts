import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Wrap a grid/list container with `revealContainer`, then give each child
// item the `revealItem` variants — children fade up in a staggered sequence
// as the container scrolls into view. Paired with components/Reveal.tsx.
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
