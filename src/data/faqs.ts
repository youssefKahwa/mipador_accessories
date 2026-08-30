export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "Payment & billing" | "Shopping & Orders" | "Technical Support";
}

export const faqData: FAQ[] = [
  // ── Technical Support ────────────────────────────────────────────────────
  {
    id: 1,
    question: "What materials are Mipador Accessories watches made from?",
    answer:
      "Cases are 316L stainless steel, crystals are sapphire (scratch-resistant) or domed acrylic depending on the model, and straps range from genuine leather to rubber to stainless steel bracelets. Every material is listed in full on each product page, under Materials.",
    category: "Technical Support",
  },
  {
    id: 2,
    question: "How do I care for my watch?",
    answer:
      "Keep it away from strong magnets, rinse the case and strap after seawater or sunscreen contact, and have the movement serviced every 4–5 years to keep it accurate. Each product page lists care instructions specific to that watch's movement and materials.",
    category: "Technical Support",
  },
  {
    id: 3,
    question: "Is my watch water resistant?",
    answer:
      "Water resistance varies by model, from 30m (splash-resistant dress watches) up to 200m (dive-ready). Each product page states the exact rating — check it before swimming, showering, or diving with any piece.",
    category: "Technical Support",
  },
  {
    id: 4,
    question: "Can I get my watch engraved?",
    answer:
      "Yes — most pieces offer free engraving on the caseback, up to 20 characters, added directly in the order form. It's a nice touch for gifts. Engraving isn't available on our limited-edition pieces.",
    category: "Technical Support",
  },
  {
    id: 5,
    question: "What does \"automatic\", \"quartz\", and \"mechanical\" mean?",
    answer:
      "Automatic movements wind themselves from the motion of your wrist. Quartz movements run on a battery and are the most accurate day-to-day. Mechanical (hand-wound) movements are wound manually and are the most traditional. Each product page states the movement type clearly.",
    category: "Technical Support",
  },

  // ── Shopping & Orders ─────────────────────────────────────────────────────
  {
    id: 6,
    question: "How do I place an order?",
    answer:
      "Add your chosen watch to the cart, fill in your name, phone number, city, and address, then confirm your order. We'll reach out on WhatsApp within 24 hours to confirm availability, arrange delivery, and answer any last questions — no account required.",
    category: "Shopping & Orders",
  },
  {
    id: 7,
    question: "Do you deliver across Morocco?",
    answer:
      "Yes. We deliver to all major cities and regions across Morocco. Delivery costs 200 MAD, or is free above 6,000 MAD, calculated automatically at checkout.",
    category: "Shopping & Orders",
  },
  {
    id: 8,
    question: "Can I track my order after it's confirmed?",
    answer:
      "Once your order ships, we send you the carrier tracking number via WhatsApp. Most in-stock pieces ship within 24 hours of confirmation.",
    category: "Shopping & Orders",
  },
  {
    id: 9,
    question: "What if my watch arrives damaged?",
    answer:
      "We pack every order securely, but if something arrives damaged, photograph it immediately and send us the photos via WhatsApp or email within 48 hours of delivery. We'll arrange a replacement or full refund — no questions asked.",
    category: "Shopping & Orders",
  },
  {
    id: 10,
    question: "Can I cancel or change my order?",
    answer:
      "You can cancel or modify your order free of charge any time before it ships — usually within 24 hours of confirmation. Contact us as early as possible and we'll do our best to accommodate changes.",
    category: "Shopping & Orders",
  },

  // ── Payment & Billing ─────────────────────────────────────────────────────
  {
    id: 11,
    question: "What payment methods do you accept?",
    answer:
      "We currently accept Cash on Delivery (pay when your watch arrives) and orders via WhatsApp with payment arranged directly with our team. Online card payment will be available soon.",
    category: "Payment & billing",
  },
  {
    id: 12,
    question: "Is Cash on Delivery available everywhere in Morocco?",
    answer:
      "Yes. Cash on Delivery is available across all major Moroccan cities. For some remote locations the carrier may require a small advance — our team will notify you in advance if that applies to your area.",
    category: "Payment & billing",
  },
  {
    id: 13,
    question: "Are there any hidden fees?",
    answer:
      "No. The price you see on the product page is the price you pay. The only additional cost is delivery — 200 MAD, or free above 6,000 MAD — shown clearly in your cart before you confirm.",
    category: "Payment & billing",
  },
  {
    id: 14,
    question: "What is your return and refund policy?",
    answer:
      "We offer a 7-day return window from delivery. If the watch isn't right for you, contact us within 7 days and we'll arrange a collection and full refund. The piece must be unworn and in its original packaging. See our full Refund Policy for details.",
    category: "Payment & billing",
  },
  {
    id: 15,
    question: "Can I get an invoice for my order?",
    answer:
      "Yes. After your order is confirmed, ask us for an invoice via WhatsApp or email and we'll send one to you within 24 hours.",
    category: "Payment & billing",
  },
];
