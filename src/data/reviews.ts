export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

export const reviews: Review[] = [
  // Wabi Lounge Chair (id: "1")
  {
    id: "r1",
    productId: "1",
    author: "Leila B.",
    city: "Casablanca",
    date: "2025-10-14",
    rating: 5,
    title: "Completely transformed my living room",
    body: "I've been searching for a piece like this for years. The leather is incredibly soft and the walnut frame is exactly as pictured. Mipador delivered earlier than expected and followed up to make sure everything was perfect. Worth every dirham.",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "Karim M.",
    city: "Marrakech",
    date: "2025-09-02",
    rating: 5,
    title: "Heirloom quality",
    body: "My father saw this chair and asked where I bought it — he thought it was an antique. The craftsmanship is extraordinary. After 3 months of daily use it only looks better. The patina on the leather is beautiful.",
    verified: true,
  },
  {
    id: "r3",
    productId: "1",
    author: "Sara A.",
    city: "Rabat",
    date: "2025-08-20",
    rating: 4,
    title: "Beautiful — delivery took a little longer",
    body: "The chair is stunning, no complaints on quality whatsoever. Delivery took 5 weeks instead of 4 but Mipador kept me updated throughout. The end result is absolutely worth the wait.",
    verified: true,
  },
  // Medina Coffee Table (id: "2")
  {
    id: "r4",
    productId: "2",
    author: "Nadia H.",
    city: "Casablanca",
    date: "2025-11-03",
    rating: 5,
    title: "Unique — no two are the same",
    body: "The natural variation in the concrete is what makes this table special. Mine has a subtle warm tone that photographs beautifully. It anchors the whole room without overpowering it.",
    verified: true,
  },
  {
    id: "r5",
    productId: "2",
    author: "Youssef R.",
    city: "Fès",
    date: "2025-10-18",
    rating: 5,
    title: "Solid and beautiful",
    body: "Very heavy and very well made. The steel base feels indestructible. I've had it for 2 months and used it daily — not a scratch, not a stain. The wax finish they sent with it is excellent.",
    verified: true,
  },
  // Atlas Shelf System (id: "3")
  {
    id: "r6",
    productId: "3",
    author: "Amina K.",
    city: "Agadir",
    date: "2025-10-29",
    rating: 5,
    title: "My whole library now has a home",
    body: "I was nervous ordering furniture online but the team at Mipador sent detailed mounting instructions and even offered to video-call to help. The shelf holds all my books with room to spare and it looks incredible.",
    verified: true,
  },
  {
    id: "r7",
    productId: "3",
    author: "Mehdi O.",
    city: "Casablanca",
    date: "2025-09-15",
    rating: 4,
    title: "Great design, minor finish variation",
    body: "The ash wood has a stunning natural grain. One bracket had a slightly rougher finish than the others — minor — but the team offered to replace it immediately. That kind of service made all the difference.",
    verified: true,
  },
  // Kasbah Floor Lamp (id: "4")
  {
    id: "r8",
    productId: "4",
    author: "Fatima Z.",
    city: "Marrakech",
    date: "2025-11-10",
    rating: 5,
    title: "A small theatre of light",
    body: "Exactly as described. At dusk, the shadow patterns this lamp casts across my walls are unlike anything I've ever seen. Guests ask about it every single time. The brass has the most beautiful warm glow.",
    verified: true,
  },
  {
    id: "r9",
    productId: "4",
    author: "Hassan B.",
    city: "Tangier",
    date: "2025-10-05",
    rating: 5,
    title: "Worth every dirham",
    body: "I bought this for my study. The light it produces is warm and atmospheric — nothing harsh. The braided cord detail is the kind of thing you only notice up close and then can't stop appreciating.",
    verified: true,
  },
  // Sabil Ceramic Vase (id: "5")
  {
    id: "r10",
    productId: "5",
    author: "Rim A.",
    city: "Casablanca",
    date: "2025-12-01",
    rating: 5,
    title: "The centerpiece of my entrance",
    body: "This vase has a weight and presence you can't capture in photos. The glazing is incredibly detailed. I keep it empty with a single dried branch and it's more beautiful than any flower arrangement.",
    verified: true,
  },
];

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAvgRating(productId: string): number {
  const pr = getProductReviews(productId);
  if (pr.length === 0) return 0;
  return pr.reduce((sum, r) => sum + r.rating, 0) / pr.length;
}
