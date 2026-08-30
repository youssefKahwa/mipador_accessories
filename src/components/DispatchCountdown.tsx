import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

// Real cutoff, real clock — not a fabricated urgency timer. Same-day
// dispatch cutoff is 3pm local time; past that it ships the next
// business day. Recomputes off Date.now(), so it's always accurate.
const CUTOFF_HOUR = 15;

function msUntilCutoff() {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  return cutoff.getTime() - now.getTime();
}

export function DispatchCountdown({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [msLeft, setMsLeft] = useState(msUntilCutoff);

  useEffect(() => {
    const id = setInterval(() => setMsLeft(msUntilCutoff()), 30000);
    return () => clearInterval(id);
  }, []);

  if (msLeft <= 0) {
    return (
      <div className={className}>
        <Clock size={13} className="shrink-0" />
        <span>{t("product.dispatchTomorrow")}</span>
      </div>
    );
  }

  const hours = Math.floor(msLeft / 3_600_000);
  const minutes = Math.floor((msLeft % 3_600_000) / 60_000);

  return (
    <div className={className}>
      <Clock size={13} className="shrink-0" />
      <span>{t("product.dispatchCountdown", { hours, minutes })}</span>
    </div>
  );
}
