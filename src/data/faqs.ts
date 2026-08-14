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
    question: "What materials are Mipador pieces made from?",
    answer:
      "Our pieces are crafted from carefully selected natural materials — solid walnut, aged brass, hand-woven fabric, and kiln-fired ceramics. Every material is chosen for its longevity, texture, and how it behaves with time. Full material details are listed on each product page.",
    category: "Technical Support",
  },
  {
    id: 2,
    question: "How do I care for my Mipador furniture?",
    answer:
      "Most wood pieces should be wiped with a dry or lightly damp cloth and kept away from direct prolonged sunlight. Metal accents can be polished with a soft dry cloth. Avoid harsh chemical cleaners. Each product page includes specific care instructions tailored to that piece.",
    category: "Technical Support",
  },
  {
    id: 3,
    question: "Are Mipador pieces suitable for outdoor use?",
    answer:
      "Some pieces are designed specifically for outdoor use with weather-resistant finishes. Each product is clearly labelled Indoor or Outdoor in the catalogue. If you're unsure whether a piece fits your space, reach out — we're happy to advise.",
    category: "Technical Support",
  },
  {
    id: 4,
    question: "Can I customise the finish, colour, or size of a piece?",
    answer:
      "For select pieces we offer customisation options — different wood finishes, fabric colours, or sizing. Contact us directly via WhatsApp or email before placing your order and we'll let you know what's possible and the lead time involved.",
    category: "Technical Support",
  },
  {
    id: 5,
    question: "What does the lead time mean?",
    answer:
      "Lead time is the number of weeks between confirming your order and having the piece ready for delivery. Because many Mipador pieces are made to order, lead times typically range from 2 to 6 weeks depending on the item. The lead time is always shown clearly on the product page.",
    category: "Technical Support",
  },

  // ── Shopping & Orders ─────────────────────────────────────────────────────
  {
    id: 6,
    question: "How do I place an order?",
    answer:
      "Add your chosen piece to the cart, fill in your name, phone number, city, and address, then confirm your order. We'll reach out on WhatsApp within 24 hours to confirm availability, arrange delivery, and answer any last questions — no account required.",
    category: "Shopping & Orders",
  },
  {
    id: 7,
    question: "Do you deliver across Morocco?",
    answer:
      "Yes. We deliver to all major cities and regions across Morocco. Delivery costs 150 MAD and is calculated at checkout. For remote areas, our team will confirm logistics with you directly before finalising the order.",
    category: "Shopping & Orders",
  },
  {
    id: 8,
    question: "Can I track my order after it's confirmed?",
    answer:
      "Once your order ships, we send you the carrier tracking number via WhatsApp. For made-to-order pieces, we'll keep you updated at each production milestone so you always know where your piece is in the process.",
    category: "Shopping & Orders",
  },
  {
    id: 9,
    question: "What if my piece arrives damaged?",
    answer:
      "We pack every order with care, but if something arrives damaged, photograph it immediately and send us the photos via WhatsApp or email within 48 hours of delivery. We'll arrange a replacement or full refund — no questions asked.",
    category: "Shopping & Orders",
  },
  {
    id: 10,
    question: "Can I cancel or change my order?",
    answer:
      "You can cancel or modify a made-to-order piece free of charge within 24 hours of confirmation. After production begins we cannot always accommodate changes, but contact us as early as possible and we'll do our best.",
    category: "Shopping & Orders",
  },

  // ── Payment & Billing ─────────────────────────────────────────────────────
  {
    id: 11,
    question: "What payment methods do you accept?",
    answer:
      "We currently accept Cash on Delivery (pay when your piece arrives) and orders via WhatsApp with payment arranged directly with our team. Online card payment will be available soon.",
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
      "No. The price you see on the product page is the price you pay. The only additional cost is the fixed delivery fee of 150 MAD, shown clearly in your cart before you confirm.",
    category: "Payment & billing",
  },
  {
    id: 14,
    question: "What is your return and refund policy?",
    answer:
      "We offer a 7-day return window from delivery. If the piece isn't right for your space, contact us within 7 days and we'll arrange a collection and full refund. Items must be in their original condition. See our full Refund Policy for details.",
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
