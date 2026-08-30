import { ShieldCheck, Truck, RefreshCcw, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

const BADGES = [
  { Icon: ShieldCheck, titleKey: "tagline.craftTitle", descKey: "tagline.craftDesc" },
  { Icon: Award,       titleKey: "tagline.warrantyTitle", descKey: "tagline.warrantyDesc" },
  { Icon: Truck,       titleKey: "tagline.deliveryTitle", descKey: "tagline.deliveryDesc" },
  { Icon: RefreshCcw,  titleKey: "tagline.returnsTitle", descKey: "tagline.returnsDesc" },
] as const;

interface TrustBadgesProps {
  className?: string;
}

export default function TrustBadges({ className = "" }: TrustBadgesProps) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "fr";

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div className="grid grid-cols-4 gap-2">
        {BADGES.map(({ Icon, titleKey, descKey }) => (
          <div
            key={titleKey}
            className="flex flex-col items-center text-center bg-surface rounded-md p-2.5 gap-1.5 border border-ink/8"
          >
            <Icon size={14} strokeWidth={1.5} className="text-ink/45 shrink-0" />
            <p className="text-[7.5px] font-black uppercase tracking-wider text-ink leading-snug">
              {t(titleKey)}
            </p>
            <p className="text-[7px] text-ink/60 leading-snug hidden sm:block">
              {t(descKey)}
            </p>
          </div>
        ))}
      </div>

      <Link
        to={`/${currentLang}/refund-policy`}
        className="text-center text-[8.5px] font-black uppercase tracking-widest text-ink/65 hover:text-ink/65 transition-colors"
      >
        {t("footer.refund")} →
      </Link>
    </div>
  );
}
