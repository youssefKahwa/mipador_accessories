import { useEffect, useState } from "react";

// Real, ticking time — used by the nav readout and the hero's live dial.
// One shared hook so both stay in sync and there's a single interval.
export function useClock(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
