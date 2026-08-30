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
  // Meridian GMT (id: "1")
  {
    id: "r1",
    productId: "1",
    author: "Karim M.",
    city: "Casablanca",
    date: "2026-06-14",
    rating: 5,
    title: "Exactly what a travel watch should be",
    body: "I fly between Casablanca and Dubai every month and the second time zone bezel has become genuinely useful, not just a spec on paper. Keeps time within a couple seconds a week. The bracelet clasp is the nicest I've owned at this price.",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "Youssef R.",
    city: "Marrakech",
    date: "2026-05-02",
    rating: 5,
    title: "The rotor detail is a nice touch",
    body: "Ordered on WhatsApp, arrived the next day exactly as described. Didn't expect the meridian-cut rotor visible through the case back to look this good in person — small detail but it's the kind of thing that makes you keep flipping your wrist over.",
    verified: true,
  },
  // Horizon Classique (id: "2")
  {
    id: "r3",
    productId: "2",
    author: "Nadia H.",
    city: "Casablanca",
    date: "2026-06-01",
    rating: 5,
    title: "Slides under any cuff, exactly as promised",
    body: "Bought this for my husband for our anniversary and had his initials engraved for free — a nice surprise, wasn't expecting that option. It's thin enough for a dress shirt but doesn't feel flimsy at all. Champagne dial photographs beautifully.",
    verified: true,
  },
  {
    id: "r4",
    productId: "2",
    author: "Mehdi O.",
    city: "Rabat",
    date: "2026-04-18",
    rating: 4,
    title: "Elegant, just wish the strap was a touch longer",
    body: "Everything about the watch itself is excellent — the sunburst dial catches the light beautifully in meetings. Had to get a link added to the leather strap for my wrist size, easy fix. Would buy again.",
    verified: true,
  },
  // Solstice Diver 200 (id: "3")
  {
    id: "r5",
    productId: "3",
    author: "Amina K.",
    city: "Agadir",
    date: "2026-06-20",
    rating: 5,
    title: "Actually built for the water, not just the look",
    body: "I surf most weekends and wanted something I didn't have to babysit. Six months in, no fogging, the bezel action is still tight, and the lume is genuinely bright enough to read at night. The rubber strap has held up better than I expected.",
    verified: true,
  },
  {
    id: "r6",
    productId: "3",
    author: "Hassan B.",
    city: "Tangier",
    date: "2026-05-11",
    rating: 5,
    title: "Great weight, doesn't feel cheap",
    body: "A lot of dive watches in this range feel hollow. This one has real heft without being uncomfortable. Ordered the deep sapphire dial and the color shifts nicely in direct sun. Dispatched same day like the site promised.",
    verified: true,
  },
  // Aria Dress (id: "4")
  {
    id: "r7",
    productId: "4",
    author: "Rim A.",
    city: "Casablanca",
    date: "2026-06-09",
    rating: 5,
    title: "Small on the wrist, big compliments",
    body: "I have small wrists and most watches swallow them — this one is perfectly proportioned. The mesh bracelet drapes rather than clamps, exactly like the description said. Been wearing it daily for two months, still keeps perfect time.",
    verified: true,
  },
  {
    id: "r8",
    productId: "4",
    author: "Salma T.",
    city: "Fès",
    date: "2026-05-25",
    rating: 5,
    title: "The pearl dial changes with the light",
    body: "Genuinely didn't expect a quartz watch at this price to feel this considered. The dial shifts from white to a soft pink depending on the light, which I only noticed after a few days of wearing it. Free engraving on the caseback was a lovely surprise for a gift.",
    verified: true,
  },
  // Vector Chrono (id: "5")
  {
    id: "r9",
    productId: "5",
    author: "Adam L.",
    city: "Casablanca",
    date: "2026-06-17",
    rating: 4,
    title: "Reads fast, which is the whole point",
    body: "Bought this specifically for track days and it does the job — the contrast sub-dials are legible at a glance even with gloves on. The pushers have real resistance, not the mushy feel some chronographs have. Docked one star only because the strap runs slightly stiff out of the box.",
    verified: true,
  },
  {
    id: "r10",
    productId: "5",
    author: "Ines B.",
    city: "Marrakech",
    date: "2026-04-30",
    rating: 5,
    title: "Panda dial is even better in person",
    body: "This was a genuine \"treat yourself\" purchase and I don't regret it at all. The tachymeter bezel is crisp, the perforated strap breathes well in summer, and it arrived the next morning after I ordered on WhatsApp.",
    verified: true,
  },
  // Nocturne Skeleton (id: "6") — limited edition, now sold out
  {
    id: "r11",
    productId: "6",
    author: "Omar F.",
    city: "Casablanca",
    date: "2026-03-22",
    rating: 5,
    title: "Glad I didn't wait on this one",
    body: "Ordered the week it launched after seeing the open-worked movement in the product photos — it's even more impressive hand-wound and watching the bridges move. Numbered 47/200. Already seeing these sell out on the site, worth grabbing if it comes back.",
    verified: true,
  },
  {
    id: "r12",
    productId: "6",
    author: "Laila M.",
    city: "Rabat",
    date: "2026-02-28",
    rating: 5,
    title: "Winding it has become part of my morning",
    body: "Not going to pretend a hand-wound movement is for everyone, but if you like the ritual, this delivers. The gunmetal finish on the exposed bridges doesn't show fingerprints as much as I feared. Genuinely sad these are gone.",
    verified: true,
  },
  // Wanderer Field (id: "7")
  {
    id: "r13",
    productId: "7",
    author: "Yassine K.",
    city: "Tangier",
    date: "2026-06-11",
    rating: 5,
    title: "My everyday, no-thinking-about-it watch",
    body: "Exactly what a field watch should be — legible, tough, and I don't flinch when it gets scratched on a job site because it's not precious. Canvas strap is comfortable even in the heat. Best value in the collection by far.",
    verified: true,
  },
  {
    id: "r14",
    productId: "7",
    author: "Zineb S.",
    city: "Agadir",
    date: "2026-05-19",
    rating: 4,
    title: "Great starter automatic",
    body: "Bought this as my first automatic and it's been a good way to learn what I like before spending more. Keeps reasonable time, the acrylic crystal has already taken a light scuff but buffed out with toothpaste like the care instructions said it would.",
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
