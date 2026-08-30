import { Star, MessageCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getProductReviews, getAvgRating, type Review } from "../../../../data/reviews";
import { WHATSAPP_NUMBER } from "../../../../config/whatsapp";
import { Reveal } from "../../../../components/Reveal";
import { revealContainer, revealItem } from "../../../../components/revealVariants";

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={
            n <= Math.round(rating)
              ? "text-champagne fill-champagne"
              : "text-ink/15"
          }
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation();
  const initials = review.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const date = new Date(review.date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-surface rounded-2xl p-5 border border-ink/8 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-ink/8 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-black text-ink/65">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-ink tracking-tight">{review.author}</p>
          <p className="text-[10px] text-ink/65 font-light">{review.city}</p>
        </div>
        {review.verified && (
          <div className="flex items-center gap-1 shrink-0">
            <CheckCircle size={11} className="text-champagne" />
            <span className="text-[9px] font-black uppercase tracking-wider text-champagne">
              {t("reviews.verified")}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <StarRow rating={review.rating} />
        <span className="text-[10px] text-ink/65 font-light">{date}</span>
      </div>

      <div>
        <p className="text-xs font-black text-ink tracking-tight mb-1.5">
          {review.title}
        </p>
        <p className="text-xs text-ink/65 font-light leading-relaxed line-clamp-4">
          {review.body}
        </p>
      </div>
    </div>
  );
}

export function ReviewsSection({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { t } = useTranslation();
  const productReviews = getProductReviews(productId);
  const avgRating = getAvgRating(productId);

  const waText = encodeURIComponent(
    `Hi Mipador Accessories! I'd like to share my experience with the ${productName}.`
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  return (
    <div className="mt-20 md:mt-28">
      <div className="border-t border-ink/10 pt-12">
        {/* Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-3">
              {t("reviews.heading")}
            </p>
            {productReviews.length > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-ink tracking-tight leading-none">
                  {avgRating.toFixed(1)}
                </span>
                <div>
                  <StarRow rating={avgRating} size={16} />
                  <p className="text-xs text-ink/65 font-light mt-1.5">
                    {t("reviews.count", { count: productReviews.length })}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-ink/65 font-light">
                {t("reviews.noReviews")}
              </p>
            )}
          </div>
        </Reveal>

        {/* Cards */}
        {productReviews.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {productReviews.map((review) => (
              <motion.div key={review.id} variants={revealItem}>
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* WhatsApp share CTA */}
        <div className="bg-cloud rounded-2xl px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-sm font-black text-ink tracking-tight mb-1">
              {t("reviews.shareHeading")}
            </p>
            <p className="text-xs text-ink/65 font-light max-w-xs leading-relaxed">
              {t("reviews.shareBody")}
            </p>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-whatsapp text-ink px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-whatsapp-dark transition-colors"
          >
            <MessageCircle size={14} />
            {t("reviews.shareBtn")}
          </a>
        </div>
      </div>
    </div>
  );
}
