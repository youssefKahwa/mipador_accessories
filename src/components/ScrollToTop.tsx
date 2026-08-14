import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Floating navbar height + breathing room, so an anchored section
// doesn't land tucked underneath it.
const HEADER_OFFSET = 100;

const scrollToHash = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, left: 0, behavior: "smooth" });
  return true;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // use "smooth" if you want animation
      });
      return;
    }

    const id = hash.slice(1);
    let cancelled = false;
    let frame: number;

    // Target section may still be mounting (lazy page chunk, motion mount) — retry a few frames.
    const attempt = (triesLeft: number) => {
      if (cancelled) return;
      if (scrollToHash(id) || triesLeft <= 0) return;
      frame = requestAnimationFrame(() => attempt(triesLeft - 1));
    };
    attempt(30);

    // Re-correct once images/layout settle, so late content shifts don't leave the scroll off-target.
    const settle = setTimeout(() => scrollToHash(id), 500);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;