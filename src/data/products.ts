export type ProductStatus = "available" | "out-of-stock" | "coming-soon";
export type ProductLocation = "indoor" | "outdoor";

export interface ProductLocale {
  name?: string;
  tagline?: string;
  description?: string;
  materials?: string[];
  care?: string[];
  colors?: string[];
  leadTime?: string;
}

export type ProductCategory =
  | "Wall Art"
  | "Seating"
  | "Tables"
  | "Lighting"
  | "Storage"
  | "Decor"
  | "Shelving"
  | "Beds"
  | "Outdoor Seating"
  | "Outdoor Tables"
  | "Outdoor Lighting"
  | "Outdoor Decor";

export interface ProductDimensions {
  width: number;   // cm
  depth: number;   // cm
  height: number;  // cm
  weight: number;  // kg
}

export interface Product {
  id: string;
  name: string;
  slug: string;                    // for URL: /products/wabi-lounge-chair
  tagline: string;                 // short emotional sentence
  description: string;            // longer brand-voice paragraph
  price: number;                   // in MAD
  status: ProductStatus;
  location: ProductLocation;       // indoor | outdoor
  category: ProductCategory;
  collection: string;              // e.g. "Wabi Series", "Sahara Edit"
  materials: string[];             // e.g. ["Solid walnut", "Moroccan leather"]
  dimensions: ProductDimensions;
  colors: string[];                // available colorways / dominant palette (art)
  colorSwatches?: string[];        // optional hex codes, same order as `colors` — renders swatch dots
  care: string[];                  // care instructions
  leadTime: string;                // e.g. "3–4 weeks" (handcrafted)
  inStock: boolean;
  featured: boolean;
  images: string[];                // multiple images: [main, detail, lifestyle]
  tags: string[];                  // for filtering: ["bestseller", "new", "handcrafted"]
  stock: number;
  model?: string;                  // URL to .glb file for 3D viewer (optional)
  translations?: {
    fr?: ProductLocale;
    ar?: ProductLocale;
    ma?: ProductLocale;
  };
}

// ─── ACTIVE CATALOG — Wall Art launch collection ───────────────────────────
// Brand focus has shifted to wall art / paintings for launch. The previous
// furniture catalog is preserved below (commented out), not deleted — see
// the "PAUSED — furniture catalog" block at the bottom of this file.
export const products: Product[] = [
  {
    id: "6",
    name: "Zellige Fragments",
    slug: "zellige-fragments",
    tagline: "Zellige, shattered and rebuilt.",
    description:
      "A study in shattered symmetry — this piece translates the nested geometry of Moroccan zellige into a modern composition of terracotta, gold, and espresso fragments on raw cotton paper. Archivally printed and framed by hand in our Casablanca studio, it holds centuries of pattern in a single, contemporary breath.",
    price: 4200,
    status: "available",
    location: "indoor",
    category: "Wall Art",
    collection: "Atelier Edit",
    materials: ["Giclée print on archival cotton paper", "Solid oak frame, natural finish", "Museum-grade UV glass"],
    dimensions: { width: 80, depth: 4, height: 100, weight: 5.5 },
    colors: ["Terracotta", "Gold Ochre", "Espresso", "Dusty Rose", "Cream"],
    colorSwatches: ["#B5533C", "#C9922A", "#3D1A12", "#C48A78", "#EADFCF"],
    care: [
      "Avoid direct sunlight to preserve pigments",
      "Dust frame with a dry, soft cloth",
      "Keep away from humidity",
      "Do not hang above heat sources",
    ],
    leadTime: "1–2 weeks",
    inStock: true,
    featured: true,
    images: ["/images/products/zellige-fragments-main.webp"],
    tags: ["bestseller", "new", "handcrafted"],
    stock: 6,
    translations: {
      fr: {
        name: "Fragments de Zellige",
        tagline: "Le zellige, brisé puis reconstruit.",
        description: "Une étude de symétrie brisée — cette pièce traduit la géométrie imbriquée du zellige marocain en une composition contemporaine de fragments terracotta, or et expresso sur papier coton. Imprimée en édition d'art et encadrée à la main dans notre atelier de Casablanca, elle contient des siècles de motifs dans un souffle résolument moderne.",
        materials: ["Impression giclée sur papier coton d'archive", "Cadre en chêne massif, finition naturelle", "Verre anti-UV qualité musée"],
        colors: ["Terracotta", "Ocre doré", "Expresso", "Rose poudré", "Crème"],
        care: [
          "Évitez l'exposition directe au soleil pour préserver les pigments",
          "Dépoussiérez le cadre avec un chiffon doux et sec",
          "Tenez à l'écart de l'humidité",
          "Ne pas suspendre au-dessus d'une source de chaleur",
        ],
        leadTime: "1–2 semaines",
      },
      ar: {
        name: "شظايا الزليج",
        tagline: "الزليج، تكسّر ثم أُعيد بناؤه.",
        description: "دراسة في التناظر المتكسّر — تترجم هذه القطعة الهندسة المتشابكة للزليج المغربي إلى تكوين معاصر من شظايا التراكوتا والذهبي والإسبريسو على ورق قطني. مطبوعة بتقنية الجيكليه ومؤطرة يدوياً في استوديونا بالدار البيضاء، تحمل قروناً من الزخرفة في نفَس عصري واحد.",
        materials: ["طباعة جيكليه على ورق قطني أرشيفي", "إطار من خشب البلوط الصلب بلمسة طبيعية", "زجاج حامي من الأشعة فوق البنفسجية بجودة المتاحف"],
        colors: ["التراكوتا", "الذهبي الترابي", "الإسبريسو", "الوردي الترابي", "الكريمي"],
        care: [
          "تجنب التعرض المباشر لأشعة الشمس للحفاظ على الألوان",
          "نظّف الإطار بقماش جاف وناعم",
          "أبعد عن الرطوبة",
          "لا تُعلّق فوق مصادر الحرارة",
        ],
        leadTime: "1–2 أسابيع",
      },
      ma: {
        name: "شظايا الزليج",
        tagline: "الزليج، تهرّس ومن بعد تبنى من جديد.",
        description: "دراسة فالتناظر المكسّر — هاد القطعة كتترجم الهندسة المتشابكة ديال الزليج المغربي لتكوين عصري من شظايا التراكوتا والذهبي والإسبريسو فوق ورق قطني. مطبوعة بجيكليه ومؤطرة باليد فالأتيلي ديالنا بالدار البيضاء، كتحمل قرون من الزخرفة فنفَس عصري واحد.",
        materials: ["طباعة جيكليه فوق ورق قطني", "إطار من البلوط الصلب بلمسة طبيعية", "زجاج ضد الأشعة بجودة المتاحف"],
        colors: ["التراكوتا", "الذهبي", "الإسبريسو", "الوردي الترابي", "الكريمي"],
        care: [
          "بعّد على الشمس المباشرة باش يبقاو الألوان",
          "نضح الإطار بشمالة جافة وناعمة",
          "بعّد على الرطوبة",
          "ما تعلقوش فوق مصادر السخانة",
        ],
        leadTime: "1–2 أسابيع",
      },
    },
  },
  {
    id: "7",
    name: "Dune Horizon",
    slug: "dune-horizon",
    tagline: "Where the sand meets the sky.",
    description:
      "Painted in wide, unhurried bands, Dune Horizon distills the Sahara's edge into pure color — sand giving way to rust, rust to umber, umber to night. Hung low and wide, it turns a wall into a horizon line.",
    price: 3800,
    status: "available",
    location: "indoor",
    category: "Wall Art",
    collection: "Atelier Edit",
    materials: ["Acrylic on canvas", "Floating frame, blackened oak"],
    dimensions: { width: 100, depth: 3.5, height: 70, weight: 4.8 },
    colors: ["Warm Sand", "Terracotta", "Burnt Umber", "Espresso", "Gold"],
    colorSwatches: ["#EFDCC0", "#C4845A", "#7A4530", "#3D1A12", "#C9922A"],
    care: [
      "Keep out of direct, prolonged sunlight",
      "Dust canvas edges with a dry brush",
      "Avoid humid rooms (bathrooms, kitchens)",
    ],
    leadTime: "2–3 weeks",
    inStock: true,
    featured: true,
    images: ["/images/products/dune-horizon-main.webp"],
    tags: ["new", "handcrafted"],
    stock: 5,
    translations: {
      fr: {
        name: "Horizon des Dunes",
        tagline: "Là où le sable rencontre le ciel.",
        description: "Peinte en larges bandes tranquilles, Horizon des Dunes distille la lisière du Sahara en couleur pure — le sable cédant à la rouille, la rouille à l'ombre. Suspendue bas et large, elle transforme un mur en ligne d'horizon.",
        materials: ["Acrylique sur toile", "Cadre flottant en chêne noirci"],
        colors: ["Sable chaud", "Terracotta", "Ombre brûlée", "Expresso", "Or"],
        care: [
          "Évitez une exposition prolongée au soleil direct",
          "Dépoussiérez les bords de la toile avec une brosse sèche",
          "Évitez les pièces humides (salle de bain, cuisine)",
        ],
        leadTime: "2–3 semaines",
      },
      ar: {
        name: "أفق الكثبان",
        tagline: "حيث تلتقي الرمال بالسماء.",
        description: "مرسومة بأشرطة عريضة هادئة، تختزل «أفق الكثبان» حافة الصحراء الكبرى في لون خالص — الرمل يفسح المجال للصدأ، والصدأ للسواد. معلّقة منخفضة وعريضة، تحوّل الجدار إلى خط أفق.",
        materials: ["أكريليك على قماش الكانفاس", "إطار عائم من خشب البلوط المؤكسد"],
        colors: ["الرمل الدافئ", "التراكوتا", "السنّي المحروق", "الإسبريسو", "الذهبي"],
        care: [
          "تجنب التعرض الطويل لأشعة الشمس المباشرة",
          "نظّف حواف اللوحة بفرشاة جافة",
          "تجنب الغرف الرطبة كالحمام والمطبخ",
        ],
        leadTime: "2–3 أسابيع",
      },
      ma: {
        name: "أفق الكثبان",
        tagline: "فين كيلتقاو الرمل والسما.",
        description: "مرسومة بخطوط عريضة هادئة، «أفق الكثبان» كتختزل حافة الصحرا فلون خالص — الرمل كيفسح للصدأ، والصدأ للظل. معلقة منخفضة وعريضة، كتحول الجدار لخط أفق.",
        materials: ["أكريليك فوق الكانفاس", "إطار عائم من البلوط المؤكسد"],
        colors: ["الرمل الدافئ", "التراكوتا", "السنّي", "الإسبريسو", "الذهبي"],
        care: [
          "بعّد على الشمس المباشرة لمدة طويلة",
          "نضح حواف اللوحة بفرشاة جافة",
          "بعّد على البيوت الرطبة بحال الحمام والكوزينا",
        ],
        leadTime: "2–3 أسابيع",
      },
    },
  },
  {
    id: "8",
    name: "Indigo Medina",
    slug: "indigo-medina",
    tagline: "The blue hour, held still.",
    description:
      "Layered arches in deepening blue recall the blue hour over a medina rooftop, when the calls to prayer fade and the sky holds its last light. Oil on canvas, framed in solid walnut — a quiet anchor for any room.",
    price: 3600,
    status: "available",
    location: "indoor",
    category: "Wall Art",
    collection: "Atelier Edit",
    materials: ["Oil on canvas", "Solid walnut frame"],
    dimensions: { width: 70, depth: 4, height: 90, weight: 5 },
    colors: ["Indigo", "Cream", "Gold", "Slate"],
    colorSwatches: ["#234A66", "#F6F4F1", "#C9922A", "#5A6B78"],
    care: [
      "Avoid direct sunlight to preserve oil pigments",
      "Dust the frame only, never the canvas surface",
      "Maintain stable room humidity",
    ],
    leadTime: "3–4 weeks",
    inStock: true,
    featured: true,
    images: ["/images/products/indigo-medina-main.webp"],
    tags: ["bestseller", "handcrafted"],
    stock: 4,
    translations: {
      fr: {
        name: "Médina Indigo",
        tagline: "L'heure bleue, figée.",
        description: "Des arches superposées dans un bleu qui s'approfondit rappellent l'heure bleue sur les toits de la médina, quand les appels à la prière s'estompent et que le ciel retient sa dernière lumière. Huile sur toile, encadrée en noyer massif — une ancre tranquille pour toute pièce.",
        materials: ["Huile sur toile", "Cadre en noyer massif"],
        colors: ["Indigo", "Crème", "Or", "Ardoise"],
        care: [
          "Évitez le soleil direct pour préserver les pigments à l'huile",
          "Dépoussiérez uniquement le cadre, jamais la toile",
          "Maintenez une humidité ambiante stable",
        ],
        leadTime: "3–4 semaines",
      },
      ar: {
        name: "مدينة النيلي",
        tagline: "الساعة الزرقاء، ثابتة في مكانها.",
        description: "أقواس متراكبة بأزرق يزداد عمقاً تستحضر الساعة الزرقاء فوق أسطح المدينة، حين يخفت نداء الأذان وتحتفظ السماء بآخر ضوء لها. زيت على قماش، مؤطرة بخشب الجوز الصلب — ركيزة هادئة لأي غرفة.",
        materials: ["زيت على قماش الكانفاس", "إطار من خشب الجوز الصلب"],
        colors: ["النيلي", "الكريمي", "الذهبي", "الرمادي الأردوازي"],
        care: [
          "تجنب الشمس المباشرة للحفاظ على ألوان الزيت",
          "نظّف الإطار فقط، ولا تلمس سطح اللوحة أبداً",
          "حافظ على رطوبة ثابتة في الغرفة",
        ],
        leadTime: "3–4 أسابيع",
      },
      ma: {
        name: "مدينة النيلي",
        tagline: "الساعة الزرقة، واقفة.",
        description: "أقواس فوق بعضياتهم بأزرق كيزيد يعمق كيفكّرو بالساعة الزرقة فوق سطوح المدينة، منين كيخفت الأذان والسما كتشد آخر ضوء ديالها. زيت فوق الكانفاس، مؤطرة بخشب الجوز الصلب — ركيزة هادية لأي بيت.",
        materials: ["زيت فوق الكانفاس", "إطار من الجوز الصلب"],
        colors: ["النيلي", "الكريمي", "الذهبي", "الرمادي"],
        care: [
          "بعّد على الشمس المباشرة باش يبقاو الألوان",
          "نضح غير الإطار، عمرك ما تمس سطح اللوحة",
          "حافظ على رطوبة ثابتة فالبيت",
        ],
        leadTime: "3–4 أسابيع",
      },
    },
  },
  {
    id: "9",
    name: "Saffron Bloom",
    slug: "saffron-bloom",
    tagline: "A garden that never wilts.",
    description:
      "Loose, overlapping blooms in saffron and olive — painted the way a garden grows, without a plan. Watercolor on cotton paper, framed under museum glass to keep its warmth exactly as it was laid down.",
    price: 2600,
    status: "available",
    location: "indoor",
    category: "Wall Art",
    collection: "Atelier Edit",
    materials: ["Watercolor on cotton paper", "Museum glass, oak frame"],
    dimensions: { width: 60, depth: 3, height: 80, weight: 3.2 },
    colors: ["Saffron", "Olive", "Gold", "Blush", "Espresso"],
    colorSwatches: ["#E8B090", "#8B9E7A", "#C9922A", "#F0D4C0", "#3D1A12"],
    care: [
      "Keep away from direct sunlight and moisture",
      "Dust glass gently with a dry microfiber cloth",
      "Handle by the frame only",
    ],
    leadTime: "1–2 weeks",
    inStock: true,
    featured: false,
    images: ["/images/products/saffron-bloom-main.webp"],
    tags: ["new"],
    stock: 7,
    translations: {
      fr: {
        name: "Floraison Safran",
        tagline: "Un jardin qui ne fane jamais.",
        description: "Des fleurs lâches et superposées en safran et olive — peintes comme un jardin pousse, sans plan préétabli. Aquarelle sur papier coton, encadrée sous verre musée pour garder toute sa chaleur intacte.",
        materials: ["Aquarelle sur papier coton", "Verre musée, cadre en chêne"],
        colors: ["Safran", "Olive", "Or", "Rose pâle", "Expresso"],
        care: [
          "Tenez à l'écart du soleil direct et de l'humidité",
          "Dépoussiérez le verre délicatement avec un chiffon microfibre sec",
          "Manipulez uniquement par le cadre",
        ],
        leadTime: "1–2 semaines",
      },
      ar: {
        name: "إزهار الزعفران",
        tagline: "حديقة لا تذبل أبداً.",
        description: "أزهار متراكبة بحرية بألوان الزعفران والزيتوني — مرسومة كما تنمو الحديقة، دون خطة مسبقة. ألوان مائية على ورق قطني، مؤطرة تحت زجاج بجودة المتاحف للحفاظ على دفئها كما هو.",
        materials: ["ألوان مائية على ورق قطني", "زجاج بجودة المتاحف، إطار من خشب البلوط"],
        colors: ["الزعفراني", "الزيتوني", "الذهبي", "الوردي الفاتح", "الإسبريسو"],
        care: [
          "أبعد عن الشمس المباشرة والرطوبة",
          "نظّف الزجاج برفق بقماش مايكروفايبر جاف",
          "تعامل معها من الإطار فقط",
        ],
        leadTime: "1–2 أسابيع",
      },
      ma: {
        name: "إزهار الزعفران",
        tagline: "حديقة عمرها ما كتذبل.",
        description: "زهور متراكبة بحرية بألوان الزعفران والزيتوني — مرسومة بحال ما كتنبت الحديقة، بلا تخطيط. ألوان مائية فوق ورق قطني، مؤطرة تحت زجاج بجودة المتاحف باش يبقى الدفء ديالها كيفما هو.",
        materials: ["ألوان مائية فوق ورق قطني", "زجاج بجودة المتاحف، إطار من البلوط"],
        colors: ["الزعفراني", "الزيتوني", "الذهبي", "الوردي الفاتح", "الإسبريسو"],
        care: [
          "بعّد على الشمس المباشرة والرطوبة",
          "نضح الزجاج بشمالة مايكروفايبر جافة برفق",
          "قبضها غير من الإطار",
        ],
        leadTime: "1–2 أسابيع",
      },
    },
  },
  {
    id: "10",
    name: "Ochre Study No. 3",
    slug: "ochre-study-no-3",
    tagline: "Three gestures, one breath.",
    description:
      "Three brushstrokes, three colors, one gesture repeated until it felt right. Part of a small series of studies exploring restraint — small enough for a shelf, considered enough for a wall.",
    price: 950,
    status: "available",
    location: "indoor",
    category: "Wall Art",
    collection: "Atelier Edit",
    materials: ["Giclée print on archival paper", "Slim oak frame"],
    dimensions: { width: 30, depth: 2.5, height: 40, weight: 1.1 },
    colors: ["Terracotta", "Gold", "Espresso"],
    colorSwatches: ["#B5533C", "#C9922A", "#3D1A12"],
    care: [
      "Avoid direct sunlight",
      "Dust frame with a dry cloth",
    ],
    leadTime: "1 week",
    inStock: true,
    featured: false,
    images: ["/images/products/ochre-study-no-3-main.webp"],
    tags: ["new", "handcrafted"],
    stock: 12,
    translations: {
      fr: {
        name: "Étude Ocre N°3",
        tagline: "Trois gestes, un seul souffle.",
        description: "Trois coups de pinceau, trois couleurs, un même geste répété jusqu'à ce qu'il sonne juste. Issue d'une petite série d'études sur la retenue — assez petite pour une étagère, assez réfléchie pour un mur.",
        materials: ["Impression giclée sur papier d'archive", "Cadre fin en chêne"],
        colors: ["Terracotta", "Or", "Expresso"],
        care: [
          "Évitez l'exposition directe au soleil",
          "Dépoussiérez le cadre avec un chiffon sec",
        ],
        leadTime: "1 semaine",
      },
      ar: {
        name: "دراسة الأوكر رقم 3",
        tagline: "ثلاث لمسات، نفَس واحد.",
        description: "ثلاث ضربات فرشاة، ثلاثة ألوان، حركة واحدة تكررت حتى شعرت بأنها صحيحة. جزء من سلسلة صغيرة من الدراسات حول التبسّط — صغيرة بما يكفي لرف، ومدروسة بما يكفي لجدار.",
        materials: ["طباعة جيكليه على ورق أرشيفي", "إطار رفيع من خشب البلوط"],
        colors: ["التراكوتا", "الذهبي", "الإسبريسو"],
        care: [
          "تجنب التعرض المباشر لأشعة الشمس",
          "نظّف الإطار بقماش جاف",
        ],
        leadTime: "أسبوع واحد",
      },
      ma: {
        name: "دراسة الأوكر رقم 3",
        tagline: "تلاتة لمسات، نفس واحد.",
        description: "تلاتة ضربات فرشاة، تلاتة ألوان، حركة واحدة تعاودات حتى حسّيت بلي صافية. جزء من سلسلة صغيرة ديال الدراسات حول التبسيط — صغيرة باش تتحط فوق رف، ومدروسة باش تتعلق فحيط.",
        materials: ["طباعة جيكليه فوق ورق أرشيفي", "إطار رفيع من البلوط"],
        colors: ["التراكوتا", "الذهبي", "الإسبريسو"],
        care: [
          "بعّد على الشمس المباشرة",
          "نضح الإطار بشمالة جافة",
        ],
        leadTime: "سيمانة وحدة",
      },
    },
  },
];

// ─── PAUSED — furniture catalog ─────────────────────────────────────────
// Kept for reference and easy re-launch. Not part of the live `products`
// array above, so it renders nowhere on the site right now. To bring a
// piece back: move its object into the `products` array above.
/*
const pausedFurnitureCatalog: Product[] = [
  // ─── INDOOR ───────────────────────────────────────────────
  {
    id: "1",
    name: "Wabi Lounge Chair",
    slug: "wabi-lounge-chair",
    tagline: "Sit slower. Think deeper.",
    description:
      "Crafted by hand in the medina workshops of Marrakech, the Wabi Lounge Chair carries the memory of ancient craftsmanship into a contemporary silhouette. Its solid walnut frame and full-grain leather seat age beautifully — becoming more yours with every season.",
    price: 8900,
    status: "available",
    location: "indoor",
    category: "Seating",
    collection: "Wabi Series",
    materials: ["Solid walnut wood", "Full-grain Moroccan leather", "Brass hardware"],
    dimensions: { width: 72, depth: 80, height: 85, weight: 18 },
    colors: ["Tobacco", "Sand", "Charcoal"],
    care: [
      "Dust wood surfaces with a dry cloth",
      "Condition leather every 6 months with natural wax",
      "Avoid direct sunlight exposure",
      "Do not use chemical cleaners on leather",
    ],
    leadTime: "3–4 weeks",
    inStock: true,
    featured: true,
    images: [
      "/images/products/wabi-lounge-chair-main.webp",
      "/images/products/wabi-lounge-chair-detail.webp",
      "/images/products/wabi-lounge-chair-lifestyle.webp",
    ],
    tags: ["bestseller", "handcrafted", "new"],
    stock: 4,
    translations: {
      fr: {
        name: "Fauteuil Lounge Wabi",
        tagline: "S'asseoir plus lentement. Penser plus profondément.",
        description: "Façonné à la main dans les ateliers de la médina de Marrakech, le Fauteuil Lounge Wabi porte la mémoire de l'artisanat ancestral dans une silhouette contemporaine. Son cadre en noyer massif et son assise en cuir pleine fleur vieillissent magnifiquement — devenant davantage les vôtres à chaque saison.",
        materials: ["Bois de noyer massif", "Cuir marocain pleine fleur", "Quincaillerie en laiton"],
        colors: ["Tabac", "Sable", "Charbon"],
        care: [
          "Époussetez les surfaces en bois avec un chiffon sec",
          "Nourrissez le cuir tous les 6 mois avec de la cire naturelle",
          "Évitez l'exposition directe au soleil",
          "N'utilisez pas de nettoyants chimiques sur le cuir",
        ],
        leadTime: "3–4 semaines",
      },
      ar: {
        name: "كرسي وابي للاسترخاء",
        tagline: "اجلس بتأنٍّ. فكّر بعمق.",
        description: "مصنوع يدوياً في ورش مدينة مراكش، يحمل كرسي وابي ذاكرة الحرفة العريقة في خطوط معاصرة. إطاره من خشب الجوز الصلب ومقعده من الجلد المغربي الطبيعي يتحسّنان مع الزمن — ليصبحا أكثر ارتباطاً بك مع كل موسم.",
        materials: ["خشب الجوز الصلب", "الجلد المغربي الطبيعي", "تجهيزات نحاسية"],
        colors: ["التبغ", "الرمل", "الفحم"],
        care: [
          "انفض الأسطح الخشبية بقماش جاف",
          "رطّب الجلد كل 6 أشهر بالشمع الطبيعي",
          "تجنب التعرض المباشر لأشعة الشمس",
          "لا تستخدم منظفات كيميائية على الجلد",
        ],
        leadTime: "3–4 أسابيع",
      },
      ma: {
        name: "كرسي وابي ديال الاسترخاء",
        tagline: "قعد بهدوء. فكر بعمق.",
        description: "مصنوع بيدين فالأورشيات ديال المدينة بمراكش، كرسي وابي كيحمل ذاكرة الصنعة القديمة فشكل عصري. الكاركاص ديالو من الجوز الصلب والجلد المغربي الأصيل كيتحسنو مع الوقت — كيوليو ديالك أكثر مع كل فصل.",
        materials: ["خشب الجوز الصلب", "الجلد المغربي الأصيل", "بيجو نحاسية"],
        colors: ["التاباك", "السابلي", "الشاركول"],
        care: [
          "نضح السطوح الخشبية بشمالة جافة",
          "رطّب الجلد كل 6 شهور بالشمع الطبيعي",
          "بعّد على الشمس المباشرة",
          "ما تستعملش منظفات كيميائية على الجلد",
        ],
        leadTime: "3–4 أسابيع",
      },
    },
  },
  {
    id: "2",
    name: "Medina Coffee Table",
    slug: "medina-coffee-table",
    tagline: "Where mornings begin.",
    description:
      "Inspired by the geometric patterns of Moroccan zellige, the Medina Coffee Table translates centuries of craft into a minimal, functional object. The hand-poured concrete top carries natural variation — no two tables are identical.",
    price: 5400,
    status: "available",
    location: "indoor",
    category: "Tables",
    collection: "Medina Edit",
    materials: ["Hand-poured concrete", "Blackened steel base", "Natural wax finish"],
    dimensions: { width: 110, depth: 60, height: 38, weight: 32 },
    colors: ["Raw Concrete", "Warm Sand"],
    care: [
      "Wipe with damp cloth only",
      "Reseal concrete annually with provided wax",
      "Use coasters to avoid staining",
      "Avoid acidic liquids on surface",
    ],
    leadTime: "2–3 weeks",
    inStock: true,
    featured: true,
    images: [
      "/images/products/medina-coffee-table-main.webp",
      "/images/products/medina-coffee-table-detail.webp",
    ],
    tags: ["handcrafted", "new"],
    stock: 4,
    translations: {
      fr: {
        name: "Table Basse Medina",
        tagline: "Là où commencent les matins.",
        description: "Inspirée par les motifs géométriques du zellige marocain, la Table Basse Medina traduit des siècles de savoir-faire en un objet minimal et fonctionnel. Le plateau en béton coulé à la main présente des variations naturelles — aucune table n'est identique à une autre.",
        materials: ["Béton coulé à la main", "Pied en acier noirci", "Finition à la cire naturelle"],
        colors: ["Béton brut", "Sable chaud"],
        care: [
          "Essuyez uniquement avec un chiffon humide",
          "Rescellez le béton annuellement avec la cire fournie",
          "Utilisez des dessous de verre pour éviter les taches",
          "Évitez les liquides acides sur la surface",
        ],
        leadTime: "2–3 semaines",
      },
      ar: {
        name: "طاولة قهوة المدينة",
        tagline: "حيث تبدأ الصباحات.",
        description: "مستوحاة من الأنماط الهندسية للزليج المغربي، تُترجم طاولة قهوة المدينة قروناً من الحرف اليدوية في شيء بسيط ووظيفي. السطح المصبوب يدوياً من الخرسانة يحمل تنوعاً طبيعياً — لا توجد طاولتان متماثلتان.",
        materials: ["خرسانة مصبوبة يدوياً", "قاعدة من الفولاذ المؤكسد", "طلاء شمع طبيعي"],
        colors: ["الخرسانة الخام", "الرمل الدافئ"],
        care: [
          "امسح بقماش مبلل فقط",
          "أعد طلاء الخرسانة سنوياً بالشمع المرفق",
          "استخدم حوامل للأكواب لتجنب البقع",
          "تجنب السوائل الحمضية على السطح",
        ],
        leadTime: "2–3 أسابيع",
      },
      ma: {
        name: "طابلة المدينة للقهوة",
        tagline: "منين كيبدا الصباح.",
        description: "مستوحاة من الأنماط الهندسية ديال الزليج المغربي، طابلة المدينة كتترجم قرون من الصنعة فشيء بسيط وعملي. السطح المصبوب باليد من البيتون فيه تنوع طبيعي — ما كاين حتى جوج طاولتين متشابهتين.",
        materials: ["بيتون مسكوب باليد", "قاعدة من الحديد المؤكسد", "طلاء شمع طبيعي"],
        colors: ["البيتون الخام", "الرمل الدافئ"],
        care: [
          "مسح بقطعة قماش مبللة فقط",
          "تجديد طلاء البيتون كل عام بالشمع المرفق",
          "استعمال سينيات تحت الكيوسان",
          "بعّد على السوائل الحمضية",
        ],
        leadTime: "2–3 أسابيع",
      },
    },
  },
  {
    id: "3",
    name: "Atlas Shelf System",
    slug: "atlas-shelf-system",
    tagline: "Objects deserve a stage.",
    description:
      "The Atlas Shelf System is built for the collector, the reader, the slow thinker. Solid ashwood planks rest on adjustable blackened iron brackets, creating a modular composition that adapts to your wall and your world.",
    price: 4200,
    status: "available",
    location: "indoor",
    category: "Shelving",
    collection: "Atlas Series",
    materials: ["Solid ash wood", "Blackened iron brackets", "Raw steel hardware"],
    dimensions: { width: 160, depth: 25, height: 120, weight: 22 },
    colors: ["Natural Ash", "Smoked Ash"],
    care: [
      "Dust regularly with a dry cloth",
      "Oil wood annually with linseed oil",
      "Max load 25kg per shelf",
      "Fix to wall studs only",
    ],
    leadTime: "2–3 weeks",
    inStock: true,
    featured: false,
    images: [
      "/images/products/atlas-shelf-main.webp",
      "/images/products/atlas-shelf-detail.webp",
      "/images/products/atlas-shelf-lifestyle.webp",
    ],
    tags: ["handcrafted"],
    stock: 4,
    translations: {
      fr: {
        name: "Système d'Étagères Atlas",
        tagline: "Les objets méritent une scène.",
        description: "Le Système d'Étagères Atlas est conçu pour le collectionneur, le lecteur, le penseur lent. Des planches en frêne massif reposent sur des équerres en fer noirci ajustables, créant une composition modulaire qui s'adapte à votre mur et à votre univers.",
        materials: ["Bois de frêne massif", "Équerres en fer noirci", "Quincaillerie en acier brut"],
        colors: ["Frêne naturel", "Frêne fumé"],
        care: [
          "Dépoussiérez régulièrement avec un chiffon sec",
          "Huilez le bois annuellement avec de l'huile de lin",
          "Charge max 25 kg par étagère",
          "Fixez uniquement aux montants du mur",
        ],
        leadTime: "2–3 semaines",
      },
      ar: {
        name: "نظام أرفف أطلس",
        tagline: "الأشياء تستحق منصة عرض.",
        description: "نظام أرفف أطلس مصمم للمقتنين والقراء والمفكرين المتأنين. ألواح خشب الدردار الصلب ترتكز على أقواس من الحديد المؤكسد القابلة للضبط، مكوّنةً تركيباً معيارياً يتكيف مع جدارك وعالمك.",
        materials: ["خشب الدردار الصلب", "أقواس من الحديد المؤكسد", "تجهيزات من الفولاذ الخام"],
        colors: ["الدردار الطبيعي", "الدردار المدخّن"],
        care: [
          "نظّف بانتظام بقماش جاف",
          "ادهن الخشب سنوياً بزيت بذر الكتان",
          "الحمولة القصوى 25 كجم لكل رف",
          "ثبّت في الجدار بالتساميد فقط",
        ],
        leadTime: "2–3 أسابيع",
      },
      ma: {
        name: "نظام الرفوف أطلس",
        tagline: "الأشياء تستاهل منصة.",
        description: "نظام الرفوف أطلس مصنوع للمقتنين والقراء والناس اللي كيحبو يتأملو. ألواح من خشب الدردار الصلب كترتكز على بلاط من الحديد المؤكسد قابلة للضبط، كيتكوّن منهم تركيب معيار يتكيّف مع الجيط ديالك وعالمك.",
        materials: ["خشب الدردار الصلب", "بلاط حديد مؤكسد", "بيجو من الحديد الخام"],
        colors: ["الدردار الطبيعي", "الدردار المدخّن"],
        care: [
          "نضح بشمالة جافة بانتظام",
          "دهن الخشب بزيت الكتان مرة فالعام",
          "الحمل الأقصى 25 كيلو للرف الواحد",
          "تثبيت فالجدار فالتساميد فقط",
        ],
        leadTime: "2–3 أسابيع",
      },
    },
  },
  {
    id: "4",
    name: "Kasbah Floor Lamp",
    slug: "kasbah-floor-lamp",
    tagline: "Light as atmosphere.",
    description:
      "The Kasbah Floor Lamp draws from the pierced metalwork of southern Moroccan architecture. Its perforated brass shade casts intricate shadow patterns across walls at dusk — turning any corner into a small theatre of light.",
    price: 3800,
    status: "available",
    location: "indoor",
    category: "Lighting",
    collection: "Kasbah Edit",
    materials: ["Hand-pierced brass shade", "Solid walnut stem", "Fabric braided cord"],
    dimensions: { width: 35, depth: 35, height: 165, weight: 7 },
    colors: ["Antique Brass", "Brushed Chrome"],
    care: [
      "Polish brass with dry cloth only",
      "Use max 40W E27 bulb",
      "Keep away from moisture",
      "Do not touch shade when lit",
    ],
    leadTime: "3–4 weeks",
    inStock: false,
    featured: true,
    images: [
      "/images/products/kasbah-lamp-main.webp",
      "/images/products/kasbah-lamp-detail.webp",
      "/images/products/kasbah-lamp-lifestyle.webp",
    ],
    tags: ["bestseller"],
    stock: 8,
    translations: {
      fr: {
        name: "Lampadaire Kasbah",
        tagline: "La lumière comme atmosphère.",
        description: "Le Lampadaire Kasbah s'inspire du travail métallique ajouré de l'architecture du sud du Maroc. Son abat-jour en laiton perforé à la main projette des motifs d'ombres complexes sur les murs au crépuscule — transformant chaque coin en un petit théâtre de lumière.",
        materials: ["Abat-jour en laiton perforé à la main", "Tige en noyer massif", "Cordon tressé en tissu"],
        colors: ["Laiton antique", "Chrome brossé"],
        care: [
          "Polissez le laiton avec un chiffon sec uniquement",
          "Utilisez max ampoule 40W E27",
          "Maintenez à l'écart de l'humidité",
          "Ne touchez pas l'abat-jour lorsqu'il est allumé",
        ],
        leadTime: "3–4 semaines",
      },
      ar: {
        name: "مصباح قصبة الأرضي",
        tagline: "الضوء كجوٍّ.",
        description: "يستوحي مصباح قصبة الأرضي من النقش المعدني المخرم في عمارة جنوب المغرب. أباجورته النحاسية المثقوبة يدوياً تُلقي أنماطاً من الظلال المعقدة على الجدران عند الغسق — محوّلةً كل زاوية إلى مسرح صغير من الضوء.",
        materials: ["أباجورة نحاسية مخرمة يدوياً", "عمود من خشب الجوز الصلب", "سلك مجدول من القماش"],
        colors: ["النحاس العتيق", "الكروم المصقول"],
        care: [
          "لمّع النحاس بقماش جاف فقط",
          "استخدم مصباح 40 واط E27 كحد أقصى",
          "أبعد عن الرطوبة",
          "لا تلمس الأباجورة وهي مضاءة",
        ],
        leadTime: "3–4 أسابيع",
      },
      ma: {
        name: "لامبادير قصبة",
        tagline: "الضوء بحال الجو.",
        description: "لامبادير قصبة مستوحى من النقش المعدني المخرم ديال العمارة الجنوبية المغربية. الأباجورة النحاسية المخرمة باليد كتصنع أنماط من الظلال على الجيطان فالغشية — كتحول كل ركيزة لمسرح صغير من الضوء.",
        materials: ["أباجورة نحاسية مخرمة باليد", "عمود من الجوز الصلب", "كابل منسوج من القماش"],
        colors: ["النحاس العتيق", "الكروم المصقول"],
        care: [
          "لمّع النحاس بشمالة جافة فقط",
          "استعمل أقصى 40 واط E27",
          "بعّد على الرطوبة",
          "ما تمسّش الأباجورة منين تكون مضاءة",
        ],
        leadTime: "3–4 أسابيع",
      },
    },
  },
  {
    id: "5",
    name: "Sabil Ceramic Vase",
    slug: "sabil-ceramic-vase",
    tagline: "Emptiness as design.",
    description:
      "Thrown on the wheel in a small Fès atelier, each Sabil Vase is a quiet conversation between maker and clay. Its irregular form and matte glaze absorb light differently at every hour of the day.",
    price: 1200,
    status: "available",
    location: "indoor",
    category: "Decor",
    collection: "Sabil Objects",
    materials: ["Hand-thrown stoneware", "Matte oxide glaze"],
    dimensions: { width: 18, depth: 18, height: 42, weight: 2.4 },
    colors: ["Clay White", "Olive", "Warm Charcoal"],
    care: [
      "Hand wash only",
      "Not dishwasher safe",
      "Waterproof inside — safe for fresh flowers",
      "Handle with care, each piece is unique",
    ],
    leadTime: "1–2 weeks",
    inStock: true,
    featured: false,
    images: [
      "/images/products/sabil-vase-main.webp",
      "/images/products/sabil-vase-detail.webp",
      "/images/products/sabil-vase-lifestyle.webp",
    ],
    tags: ["new", "handcrafted"],
    stock: 6,
    translations: {
      fr: {
        name: "Vase Céramique Sabil",
        tagline: "Le vide comme design.",
        description: "Tourné sur le tour dans un petit atelier de Fès, chaque Vase Sabil est une conversation tranquille entre l'artisan et l'argile. Sa forme irrégulière et sa glaçure matte absorbent la lumière différemment à chaque heure de la journée.",
        materials: ["Grès tourné à la main", "Glaçure à l'oxyde mat"],
        colors: ["Blanc argile", "Olive", "Charbon chaud"],
        care: [
          "Lavage à la main uniquement",
          "Pas au lave-vaisselle",
          "Étanche à l'intérieur — sûr pour les fleurs fraîches",
          "Manipulez avec soin, chaque pièce est unique",
        ],
        leadTime: "1–2 semaines",
      },
      ar: {
        name: "مزهرية سبيل السيراميكية",
        tagline: "الفراغ كتصميم.",
        description: "مشكّل على الدولاب في ورشة صغيرة بفاس، كل مزهرية سبيل محادثة هادئة بين الصانع والطين. شكلها غير المنتظم وطلاؤها المطفأ يمتصان الضوء بشكل مختلف في كل ساعة من النهار.",
        materials: ["فخار خشن ملوّل يدوياً", "طلاء أكسيد مطفأ"],
        colors: ["الأبيض الطيني", "الزيتون", "الفحم الدافئ"],
        care: [
          "اغسل يدوياً فقط",
          "غير مناسب لغسالة الأطباق",
          "مقاوم للماء من الداخل — آمن للزهور الطازجة",
          "تعامل بحذر، كل قطعة فريدة",
        ],
        leadTime: "1–2 أسابيع",
      },
      ma: {
        name: "فاز سبيل السيراميكي",
        tagline: "الخواء بحال ديزاين.",
        description: "مشكّل على الدولاب فورشة صغيرة بفاس، كل فاز سبيل هو محادثة هادئة بين الصانع والطين. الشكل غير المنتظم ديالو والطلاء المطفأ كيمتصو الضوء بطريقة مختلفة كل ساعة من النهار.",
        materials: ["فخار خشن ملوّل باليد", "طلاء أكسيد مطفأ"],
        colors: ["الأبيض الطيني", "الزيتون", "الفحم الدافئ"],
        care: [
          "غسل باليد فقط",
          "ما تحطّش فغسالة الأطباق",
          "داخله ضد الماء — مناسب للورود الطازجة",
          "تعامل بزين، كل قطعة فريدة",
        ],
        leadTime: "1–2 أسابيع",
      },
    },
  },
];
*/
