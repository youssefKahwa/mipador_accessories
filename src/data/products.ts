export type ProductStatus = "available" | "out-of-stock" | "coming-soon";
export type Gender = "men" | "women" | "kids" | "unisex";
export type Movement = "automatic" | "mechanical" | "quartz";

export interface ProductLocale {
  name?: string;
  tagline?: string;
  description?: string;
  materials?: string[];
  care?: string[];
  colors?: string[];
  leadTime?: string;
}

// The top-level accessory line — drives routing, nav, and the sitemap.
// See src/config/categories.ts for the full taxonomy (subcategories per
// line, applicable genders, hero imagery).
export type AccessoryType =
  | "watches"
  | "sunglasses"
  | "eyeglasses"
  | "jewelry"
  | "bags"
  | "scarves"
  | "belts"
  | "hats";

// Watches are the only line with a closed subcategory set today — kept as
// a real union because the style quiz (styleData.ts) needs compile-time
// safety against typos. Every other line's subcategory is just a string
// on Product (see below); validate those against categories.ts instead.
export type WatchSubcategory =
  | "GMT"
  | "Dress"
  | "Diver"
  | "Chronograph"
  | "Skeleton"
  | "Field";

// Specs are polymorphic per accessory line — narrow on `kind` before
// reading a line-specific field, e.g. `product.specs.kind === "watches"`.
// `warranty` is duplicated onto every branch since nearly every UI surface
// that reads specs wants it unconditionally, without narrowing first.
export type ProductSpecs =
  | {
      kind: "watches";
      movement: Movement;
      caseDiameter: number;    // mm
      caseThickness: number;   // mm
      lugToLug: number;        // mm
      weight: number;          // g
      waterResistance: string; // e.g. "100m / 10 ATM"
      powerReserve?: string;   // automatics/mechanicals only, e.g. "42 hours"
      warranty: string;
    }
  | {
      kind: "sunglasses" | "eyeglasses";
      frameWidth: number;    // mm
      lensWidth: number;     // mm
      bridgeWidth: number;   // mm
      templeLength: number;  // mm
      frameMaterial: string;
      lensType?: string;     // e.g. "Polarized", "Prescription-ready"
      uvProtection?: string; // e.g. "UV400"
      warranty: string;
    }
  | {
      kind: "jewelry";
      metal: string; // e.g. "18k Gold Vermeil", "Sterling Silver"
      stone?: string;
      chainLength?: number; // cm
      adjustable: boolean;
      hypoallergenic?: boolean;
      warranty: string;
    }
  | {
      kind: "bags";
      dimensions: { width: number; height: number; depth: number }; // cm
      strapDrop?: number; // cm
      material: string;
      closureType?: string;
      interiorPockets?: number;
      warranty: string;
    }
  | {
      kind: "scarves";
      dimensions: { length: number; width: number }; // cm
      fabric: string;
      careInstructions?: string;
      warranty: string;
    }
  | {
      kind: "belts";
      lengths: number[]; // available lengths, cm
      width: number;     // mm
      material: string;
      buckleType?: string;
      warranty: string;
    }
  | {
      kind: "hats";
      sizeRange: string[]; // e.g. ["S/M", "L/XL"] or cm circumference
      material: string;
      adjustable: boolean;
      warranty: string;
    };

export interface Product {
  id: string;
  name: string;
  slug: string;                    // for URL: /products/meridian-gmt
  tagline: string;                 // short emotional sentence
  description: string;             // longer brand-voice paragraph
  price: number;                   // in MAD
  status: ProductStatus;
  gender: Gender;
  accessoryType: AccessoryType;    // top-level line: watches, sunglasses, ...
  subcategory: string;             // fine-grained type within the line, e.g. "GMT", "Aviator", "Tote"
  collection: string;              // e.g. "Meridian Collection"
  materials: string[];             // case / crystal / strap descriptors
  specs: ProductSpecs;
  colors: string[];                // dial / strap colorway names
  colorSwatches?: string[];        // hex codes, same order as `colors`
  sizes?: string[];                // size options where relevant (belts, hats, scarves, jewelry chains)
  care: string[];                  // care instructions
  leadTime: string;                // e.g. "Ships within 24h" / "Sold out — join the waitlist"
  inStock: boolean;
  featured: boolean;
  images: string[];                // real photography slots — swap in anytime, see WatchIllustration fallback
  tags: string[];                  // for filtering: ["bestseller", "new", "limited-edition", "in-house-movement"]
  stock: number;
  model?: string;                  // URL to .glb file for the 3D/AR viewer (optional)
  engravingAvailable?: boolean;    // offer free engraving in the order form
  translations?: {
    fr?: ProductLocale;
    ar?: ProductLocale;
    ma?: ProductLocale;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Meridian GMT",
    slug: "meridian-gmt",
    tagline: "Two time zones. One instinct.",
    description:
      "Built for the perpetually in-transit, the Meridian GMT tracks a second time zone on a bidirectional 24-hour bezel without ever crowding its dial. The in-house automatic caliber is chronometer-regulated, visible through a sapphire case back, and wound by a rotor cut with our meridian motif. Steel bracelet, deployant clasp, no compromises at altitude.",
    price: 8900,
    status: "available",
    gender: "men",
    accessoryType: "watches",
    subcategory: "GMT",
    collection: "Meridian Collection",
    materials: ["316L stainless steel case", "Sapphire crystal, both faces", "Five-link steel bracelet"],
    specs: {
      kind: "watches",
      movement: "automatic",
      caseDiameter: 41,
      caseThickness: 12.4,
      lugToLug: 47,
      weight: 148,
      waterResistance: "100m / 10 ATM",
      powerReserve: "48 hours",
      warranty: "5-year international warranty",
    },
    colors: ["Midnight Blue / Steel", "Black / Steel"],
    colorSwatches: ["#0B1224", "#111318"],
    care: [
      "Keep away from strong magnets (speakers, phone cases, clasps)",
      "Rinse the bracelet in fresh water after seawater or sunscreen contact",
      "Have the movement serviced every 4–5 years",
      "Wind by hand ~30 turns if unworn for more than 36 hours",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/meridian-gmt-main.webp", "/images/products/meridian-gmt-side.webp", "/images/products/meridian-gmt-wrist.webp"],
    tags: ["bestseller", "in-house-movement"],
    stock: 9,
    engravingAvailable: true,
    translations: {
      fr: {
        name: "Meridian GMT",
        tagline: "Deux fuseaux horaires. Un seul instinct.",
        description:
          "Conçue pour ceux qui vivent en transit permanent, la Meridian GMT suit un second fuseau horaire sur une lunette bidirectionnelle 24h sans jamais surcharger son cadran. Le calibre automatique manufacture est réglé chronomètre, visible à travers un fond saphir, et remonté par un rotor gravé de notre motif méridien. Bracelet acier, fermoir déployant, aucun compromis en altitude.",
        materials: ["Boîtier en acier inoxydable 316L", "Verre saphir, double face", "Bracelet acier cinq maillons"],
        colors: ["Bleu nuit / Acier", "Noir / Acier"],
        care: [
          "Tenez à l'écart des champs magnétiques puissants (enceintes, étuis de téléphone, fermoirs)",
          "Rincez le bracelet à l'eau douce après contact avec l'eau de mer ou de la crème solaire",
          "Faites réviser le mouvement tous les 4 à 5 ans",
          "Remontez à la main environ 30 tours si non portée plus de 36 heures",
        ],
        leadTime: "Expédiée sous 24h",
      },
      ar: {
        name: "ميريديان جي إم تي",
        tagline: "توقيتان. غريزة واحدة.",
        description:
          "صُممت لمن يعيشون دائماً على الطريق، تتبّع ميريديان جي إم تي توقيتاً ثانياً على لوح دوّار ثنائي الاتجاه لمدة 24 ساعة دون أن تُثقل مينائها. الحركة الأوتوماتيكية الداخلية مضبوطة بدقة الكرونومتر، ومرئية عبر ظهر ساعة من الياقوت، ويُدار دورانها بروتور محفور بزخرفة الميريديان الخاصة بنا. سوار من الفولاذ، إغلاق قابل للطي، بلا تنازلات في الارتفاعات الشاهقة.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "زجاج ياقوتي من الجهتين", "سوار فولاذي خماسي الحلقات"],
        colors: ["أزرق ليلي / فولاذي", "أسود / فولاذي"],
        care: [
          "ابتعد عن المجالات المغناطيسية القوية (السماعات، أغطية الهاتف، الأقفال)",
          "اشطف السوار بماء عذب بعد ملامسة مياه البحر أو واقي الشمس",
          "قم بصيانة الحركة كل 4 إلى 5 سنوات",
          "أدر التاج يدوياً حوالي 30 دورة إذا لم تُلبس لأكثر من 36 ساعة",
        ],
        leadTime: "تُشحن خلال 24 ساعة",
      },
      ma: {
        name: "ميريديان جي إم تي",
        tagline: "جوج توقيتات. غريزة وحدة.",
        description:
          "مصنوعة للناس اللي دايما فالطريق، ميريديان جي إم تي كتتبع توقيت ثاني فوق لوح دوّار ثنائي الاتجاه ديال 24 ساعة بلا ما تثقل المينا ديالها. الحركة الأوتوماتيكية الداخلية مضبوطة بدقة الكرونومتر، وبانة من ظهر الساعة الياقوتي، وكيدوّرها روتور محفور بزخرفة الميريديان ديالنا. سوار فولاذ، إغلاق قابل للطي، بلا حتى تنازل حتى فالجو الشاهق.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "زجاج ياقوتي من الجوج الجهات", "سوار فولاذي بخمسة حلقات"],
        colors: ["أزرق ليلي / فولاذي", "كحل / فولاذي"],
        care: [
          "بعّد على المجالات المغناطيسية القوية (السماعات، أغطية التيليفون، الأقفال)",
          "شطف السوار بالما العذبة منين يلامس ما البحر ولا الكريم ديال الشمس",
          "دير الصيانة للحركة كل 4 إلى 5 سنين",
          "دوّر التاج بيدك تقريبا 30 دورة إلا ما تلبستش لكثر من 36 ساعة",
        ],
        leadTime: "كتشحن فظرف 24 ساعة",
      },
    },
  },
  {
    id: "2",
    name: "Horizon Classique",
    slug: "horizon-classique",
    tagline: "Restraint is the loudest luxury.",
    description:
      "A dress watch stripped of everything it doesn't need. The Horizon Classique carries a domed sapphire crystal over a sunburst dial, applied champagne indices, and a case slim enough to slide under any cuff. The automatic movement inside is finished with a Côtes de Genève rotor you'll only ever see if you go looking for it — which is exactly the point.",
    price: 6400,
    status: "available",
    gender: "men",
    accessoryType: "watches",
    subcategory: "Dress",
    collection: "Horizon Collection",
    materials: ["316L stainless steel case", "Domed sapphire crystal", "Italian calfskin leather strap"],
    specs: {
      kind: "watches",
      movement: "automatic",
      caseDiameter: 39,
      caseThickness: 9.8,
      lugToLug: 46,
      weight: 78,
      waterResistance: "50m / 5 ATM",
      powerReserve: "40 hours",
      warranty: "5-year international warranty",
    },
    colors: ["Slate Blue / Champagne", "Ivory / Champagne"],
    colorSwatches: ["#16213E", "#F1E9D8"],
    care: [
      "Avoid submerging — this is a splash-resistant dress case, not a diver",
      "Let the leather strap rest a day between long wears",
      "Keep away from strong magnets",
      "Have the movement serviced every 4–5 years",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/horizon-classique-main.webp", "/images/products/horizon-classique-side.webp"],
    tags: ["bestseller"],
    stock: 6,
    engravingAvailable: true,
    translations: {
      fr: {
        name: "Horizon Classique",
        tagline: "La retenue est le luxe le plus éloquent.",
        description:
          "Une montre habillée débarrassée de tout superflu. La Horizon Classique porte un verre saphir bombé au-dessus d'un cadran soleillé, des index champagne appliqués, et un boîtier assez fin pour glisser sous n'importe quel poignet de chemise. Le mouvement automatique qu'elle abrite est fini d'un rotor Côtes de Genève que vous ne verrez que si vous allez le chercher — c'est exactement l'idée.",
        materials: ["Boîtier en acier inoxydable 316L", "Verre saphir bombé", "Bracelet en cuir de veau italien"],
        colors: ["Bleu ardoise / Champagne", "Ivoire / Champagne"],
        care: [
          "Évitez l'immersion — ce boîtier habillé résiste aux éclaboussures, pas à la plongée",
          "Laissez le bracelet en cuir se reposer un jour entre deux longs ports",
          "Tenez à l'écart des champs magnétiques puissants",
          "Faites réviser le mouvement tous les 4 à 5 ans",
        ],
        leadTime: "Expédiée sous 24h",
      },
      ar: {
        name: "هورايزن كلاسيك",
        tagline: "التبسّط هو أرقى أشكال الفخامة.",
        description:
          "ساعة سهرة تخلّت عن كل ما هو زائد. تحمل هورايزن كلاسيك زجاجاً ياقوتياً محدّباً فوق ميناء مشمّس، ومؤشرات شمبانيا مطبّقة، وهيكلاً رفيعاً بما يكفي للانزلاق تحت أي كم قميص. الحركة الأوتوماتيكية بداخلها منتهية بروتور Côtes de Genève لن تراه إلا إذا بحثت عنه — وهذا بالضبط هو المغزى.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "زجاج ياقوتي محدّب", "سوار من جلد العجل الإيطالي"],
        colors: ["أزرق أردوازي / شمبانيا", "عاجي / شمبانيا"],
        care: [
          "تجنب الغمر في الماء — هذا هيكل أنيق مقاوم للرذاذ وليس للغوص",
          "امنح سوار الجلد يوماً للراحة بين فترات اللبس الطويلة",
          "ابتعد عن المجالات المغناطيسية القوية",
          "قم بصيانة الحركة كل 4 إلى 5 سنوات",
        ],
        leadTime: "تُشحن خلال 24 ساعة",
      },
      ma: {
        name: "هورايزن كلاسيك",
        tagline: "البساطة هي أعظم فخامة.",
        description:
          "ساعة أنيقة تخلات على كل شي زايد. هورايزن كلاسيك كتحمل زجاج ياقوتي محدّب فوق مينا مشمسة، ومؤشرات شمبانيا مركّبة، وهيكل رقيق بزاف باش يدخل تحت أي كم قميص. الحركة الأوتوماتيكية لداخل مزوقة بروتور Côtes de Genève ما غاتشوفوش إلا إلا قلبتي عليه — وهادشي هو المقصود بالضبط.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "زجاج ياقوتي محدّب", "سوار من جلد العجل الإيطالي"],
        colors: ["أزرق أردوازي / شمبانيا", "عاجي / شمبانيا"],
        care: [
          "ما تدخلهاش للما — هاد الهيكل الأنيق مقاوم للرشّ ماشي للغطس",
          "خلي سوار الجلد يرتاح نهار بين اللبسات الطويلة",
          "بعّد على المجالات المغناطيسية القوية",
          "دير الصيانة للحركة كل 4 إلى 5 سنين",
        ],
        leadTime: "كتشحن فظرف 24 ساعة",
      },
    },
  },
  {
    id: "3",
    name: "Solstice Diver 200",
    slug: "solstice-diver-200",
    tagline: "Built for the deep end of the day.",
    description:
      "200 meters of water resistance, a unidirectional ceramic bezel that won't scratch or fade, and a lume-charged dial that stays legible long after the sun sets on the dive. The Solstice Diver 200 wears an automatic movement shock-mounted against a screw-down crown and case back — it was tested against depth, not against a spec sheet.",
    price: 7200,
    status: "available",
    gender: "unisex",
    accessoryType: "watches",
    subcategory: "Diver",
    collection: "Solstice Collection",
    materials: ["316L stainless steel case", "Unidirectional ceramic bezel", "Rubber dive strap with steel buckle"],
    specs: {
      kind: "watches",
      movement: "automatic",
      caseDiameter: 42,
      caseThickness: 13.2,
      lugToLug: 48,
      weight: 156,
      waterResistance: "200m / 20 ATM",
      powerReserve: "42 hours",
      warranty: "5-year international warranty",
    },
    colors: ["Deep Sapphire", "Onyx Black"],
    colorSwatches: ["#1E3FA0", "#0A0C10"],
    care: [
      "Rinse in fresh water after every swim in the sea or pool",
      "Check the crown is screwed down fully before any water exposure",
      "Have the gaskets inspected yearly if worn for diving",
      "Have the movement serviced every 4–5 years",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/solstice-diver-200-main.webp", "/images/products/solstice-diver-200-side.webp", "/images/products/solstice-diver-200-wrist.webp"],
    tags: ["bestseller", "new"],
    stock: 11,
    engravingAvailable: true,
    translations: {
      fr: {
        name: "Solstice Diver 200",
        tagline: "Conçue pour les profondeurs de la journée.",
        description:
          "200 mètres d'étanchéité, une lunette céramique unidirectionnelle qui ne se raye ni ne se décolore, et un cadran chargé en luminova qui reste lisible bien après le coucher du soleil sur la plongée. La Solstice Diver 200 loge un mouvement automatique monté sur amortisseurs face à une couronne et un fond vissés — elle a été testée contre la profondeur, pas contre une fiche technique.",
        materials: ["Boîtier en acier inoxydable 316L", "Lunette céramique unidirectionnelle", "Bracelet caoutchouc de plongée, boucle acier"],
        colors: ["Saphir profond", "Noir onyx"],
        care: [
          "Rincez à l'eau douce après chaque baignade en mer ou en piscine",
          "Vérifiez que la couronne est bien vissée avant tout contact avec l'eau",
          "Faites inspecter les joints chaque année en cas d'usage en plongée",
          "Faites réviser le mouvement tous les 4 à 5 ans",
        ],
        leadTime: "Expédiée sous 24h",
      },
      ar: {
        name: "سولستيس دايفر 200",
        tagline: "صُممت لأعماق النهار.",
        description:
          "مقاومة للماء حتى 200 متر، ولوح دوّار أحادي الاتجاه من السيراميك لا يُخدش ولا يبهت، وميناء مشحون باللمعان الليلي يبقى واضحاً بعد وقت طويل من غروب شمس الغوص. تحمل سولستيس دايفر 200 حركة أوتوماتيكية مثبتة بممتصات صدمات أمام تاج وظهر ساعة ملولبين — اختُبرت ضد العمق، لا ضد ورقة المواصفات.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "لوح دوّار أحادي الاتجاه من السيراميك", "سوار مطاطي للغوص بإبزيم فولاذي"],
        colors: ["ياقوت عميق", "أسود أونيكس"],
        care: [
          "اشطف بماء عذب بعد كل سباحة في البحر أو المسبح",
          "تأكد من إحكام ربط التاج قبل أي تلامس مع الماء",
          "افحص الحلقات المطاطية سنوياً إذا استُخدمت للغوص",
          "قم بصيانة الحركة كل 4 إلى 5 سنوات",
        ],
        leadTime: "تُشحن خلال 24 ساعة",
      },
      ma: {
        name: "سولستيس دايفر 200",
        tagline: "مصنوعة لعمق النهار.",
        description:
          "مقاومة للما حتى 200 متر، ولوح دوّار أحادي الاتجاه من السيراميك ما كيتخدشش وما كيبهتش، ومينا مشحونة بضوء ليلي كتبقى واضحة بعد ما تغرب الشمس ديال الغطس. سولستيس دايفر 200 كتحمل حركة أوتوماتيكية مثبتة بممتصات صدمة قدام تاج وظهر ساعة ملولبين — تجربات على العمق، ماشي غير على ورقة.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "لوح دوّار أحادي الاتجاه من السيراميك", "سوار مطاط ديال الغطس بإبزيم فولاذي"],
        colors: ["ياقوت عميق", "كحل أونيكس"],
        care: [
          "شطف بالما العذبة بعد كل عومة فالبحر ولا البسين",
          "تأكد بلي التاج مربوط مزيان قبل أي تلامس مع الما",
          "فحص الحلقات المطاطية كل عام إلا استعملتيها للغطس",
          "دير الصيانة للحركة كل 4 إلى 5 سنين",
        ],
        leadTime: "كتشحن فظرف 24 ساعة",
      },
    },
  },
  {
    id: "4",
    name: "Aria Dress",
    slug: "aria-dress",
    tagline: "Small case. Unmissable presence.",
    description:
      "Aria trades size for precision — a compact 32mm case set with a sunray dial that shifts from pearl to silver as the light moves across it. The bracelet is finished in a fine Milanese mesh that drapes rather than sits on the wrist. Quartz-accurate, so it's exactly on time every single morning, no winding required.",
    price: 4800,
    status: "available",
    gender: "women",
    accessoryType: "watches",
    subcategory: "Dress",
    collection: "Horizon Collection",
    materials: ["316L stainless steel case", "Sunray mother-of-pearl-finish dial", "Milanese mesh bracelet"],
    specs: {
      kind: "watches",
      movement: "quartz",
      caseDiameter: 32,
      caseThickness: 7.6,
      lugToLug: 38,
      weight: 46,
      waterResistance: "30m / 3 ATM",
      warranty: "5-year international warranty",
    },
    colors: ["Pearl / Steel", "Rose Champagne / Steel"],
    colorSwatches: ["#EAF0F8", "#C9A455"],
    care: [
      "Not rated for swimming or showering — splash-resistant only",
      "Wipe the mesh bracelet with a dry cloth to keep the links bright",
      "Replace the battery every 2–3 years to avoid leakage",
      "Keep away from strong magnets",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/aria-dress-main.webp", "/images/products/aria-dress-wrist.webp"],
    tags: ["new"],
    stock: 14,
    engravingAvailable: true,
    translations: {
      fr: {
        name: "Aria Dress",
        tagline: "Petit boîtier. Présence indéniable.",
        description:
          "Aria échange la taille contre la précision — un boîtier compact de 32 mm serti d'un cadran soleillé qui passe de la nacre à l'argent au gré de la lumière. Le bracelet est fini d'une fine maille milanaise qui drape le poignet plutôt qu'elle ne s'y pose. D'une précision quartz, elle est à l'heure exacte chaque matin, sans jamais avoir besoin d'être remontée.",
        materials: ["Boîtier en acier inoxydable 316L", "Cadran soleillé finition nacre", "Bracelet maille milanaise"],
        colors: ["Nacre / Acier", "Champagne rosé / Acier"],
        care: [
          "Non conçue pour la natation ou la douche — résistante aux éclaboussures uniquement",
          "Essuyez le bracelet milanais avec un chiffon sec pour garder l'éclat des mailles",
          "Remplacez la pile tous les 2 à 3 ans pour éviter toute fuite",
          "Tenez à l'écart des champs magnétiques puissants",
        ],
        leadTime: "Expédiée sous 24h",
      },
      ar: {
        name: "آريا دريس",
        tagline: "هيكل صغير. حضور لا يُخطئه أحد.",
        description:
          "تستبدل آريا الحجم بالدقة — هيكل مدمج بقياس 32 مم يحمل ميناءً مشمساً يتحوّل من اللؤلؤي إلى الفضي مع تحرّك الضوء عليه. السوار منتهٍ بشبك ميلانو رفيع يلتفّ حول المعصم بدل أن يستقر عليه فقط. دقة كوارتز تجعلها بالضبط في الوقت كل صباح، دون الحاجة لأي تعبئة يدوية.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "ميناء مشمس بلمسة لؤلؤية", "سوار شبك ميلانو"],
        colors: ["لؤلؤي / فولاذي", "شمبانيا وردي / فولاذي"],
        care: [
          "غير مخصصة للسباحة أو الاستحمام — مقاومة للرذاذ فقط",
          "امسح سوار الشبك بقماش جاف للحفاظ على لمعان الحلقات",
          "استبدل البطارية كل 2 إلى 3 سنوات لتجنب التسريب",
          "ابتعد عن المجالات المغناطيسية القوية",
        ],
        leadTime: "تُشحن خلال 24 ساعة",
      },
      ma: {
        name: "آريا دريس",
        tagline: "هيكل صغير. حضور ما كيفوتوش لحد.",
        description:
          "آريا كتبدل الحجم بالدقة — هيكل مدمج بقياس 32 مم فيه مينا مشمسة كتبدّل من اللؤلؤي للفضي مع تحرك الضوء عليها. السوار مزوق بشبك ميلانو رقيق كيلف على المعصم ماشي غير كيتحط فوقو. دقة كوارتز كتخليها بالضبط فالوقت كل صباح، بلا ما تحتاج تعبئة بيدك.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ 316L", "مينا مشمسة بلمسة لؤلؤية", "سوار شبك ميلانو"],
        colors: ["لؤلؤي / فولاذي", "شمبانيا وردي / فولاذي"],
        care: [
          "ماشي مخصصة للعوم ولا الدوش — مقاومة للرشّ بركة",
          "مسح سوار الشبك بشمالة جافة باش يبقى لمعان الحلقات",
          "بدّل البطارية كل 2 إلى 3 سنين باش ما تسيلش",
          "بعّد على المجالات المغناطيسية القوية",
        ],
        leadTime: "كتشحن فظرف 24 ساعة",
      },
    },
  },
  {
    id: "5",
    name: "Vector Chrono",
    slug: "vector-chrono",
    tagline: "Every second, accounted for.",
    description:
      "A tri-compax chronograph built for reading at speed: contrasting sub-dials, a tachymeter scale on the bezel, and pushers that click with real resistance instead of springy give. Vector Chrono runs on a precision quartz chronograph movement accurate to well within a second a day — built to time things that actually matter.",
    price: 3600,
    status: "available",
    gender: "men",
    accessoryType: "watches",
    subcategory: "Chronograph",
    collection: "Meridian Collection",
    materials: ["Stainless steel case", "Tachymeter bezel", "Perforated leather racing strap"],
    specs: {
      kind: "watches",
      movement: "quartz",
      caseDiameter: 43,
      caseThickness: 11.6,
      lugToLug: 49,
      weight: 112,
      waterResistance: "100m / 10 ATM",
      warranty: "5-year international warranty",
    },
    colors: ["Panda White/Black", "Full Black"],
    colorSwatches: ["#EAF0F8", "#111318"],
    care: [
      "Reset chronograph hands to zero before storing long-term",
      "Rinse the strap edges after heavy sweat exposure",
      "Replace the battery every 2–3 years to avoid leakage",
      "Keep away from strong magnets",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/vector-chrono-main.webp", "/images/products/vector-chrono-side.webp"],
    tags: ["new"],
    stock: 16,
    engravingAvailable: true,
    translations: {
      fr: {
        name: "Vector Chrono",
        tagline: "Chaque seconde, comptée.",
        description:
          "Un chronographe tri-compax conçu pour se lire à toute vitesse : compteurs contrastés, échelle tachymétrique sur la lunette, et poussoirs qui cliquent avec une vraie résistance plutôt qu'un jeu élastique. Vector Chrono tourne sur un mouvement chronographe quartz de précision, exact à moins d'une seconde par jour — conçue pour chronométrer ce qui compte vraiment.",
        materials: ["Boîtier en acier inoxydable", "Lunette tachymétrique", "Bracelet cuir perforé style course"],
        colors: ["Panda blanc/noir", "Tout noir"],
        care: [
          "Remettez les aiguilles du chronographe à zéro avant un stockage prolongé",
          "Rincez les bords du bracelet après une forte exposition à la transpiration",
          "Remplacez la pile tous les 2 à 3 ans pour éviter toute fuite",
          "Tenez à l'écart des champs magnétiques puissants",
        ],
        leadTime: "Expédiée sous 24h",
      },
      ar: {
        name: "فيكتور كرونو",
        tagline: "كل ثانية، محسوبة.",
        description:
          "كرونوغراف ثلاثي العدادات صُمم للقراءة بسرعة: عدادات فرعية متباينة، ومقياس تاكيمتري على اللوح، وأزرار ضغط تنقر بمقاومة حقيقية بدل الليونة المطاطية. يعمل فيكتور كرونو بحركة كرونوغراف كوارتز دقيقة تصل دقتها إلى أقل من ثانية في اليوم — صُممت لقياس ما يهم فعلاً.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ", "لوح بمقياس تاكيمتري", "سوار جلدي مثقّب بطراز السباقات"],
        colors: ["بيضاء/سوداء (باندا)", "أسود بالكامل"],
        care: [
          "أعد عقارب الكرونوغراف إلى الصفر قبل التخزين لفترة طويلة",
          "اشطف حواف السوار بعد التعرّق الشديد",
          "استبدل البطارية كل 2 إلى 3 سنوات لتجنب التسريب",
          "ابتعد عن المجالات المغناطيسية القوية",
        ],
        leadTime: "تُشحن خلال 24 ساعة",
      },
      ma: {
        name: "فيكتور كرونو",
        tagline: "كل ثانية، محسوبة.",
        description:
          "كرونوغراف بتلاتة عدادات مصنوع باش تقراه بسرعة: عدادات فرعية متباينة، ومقياس تاكيمتري على اللوح، وأزرار كتضغط بمقاومة حقيقية ماشي ليونة مطاطية. فيكتور كرونو كيخدم بحركة كرونوغراف كوارتز دقيقة، دقتها أقل من ثانية فالنهار — مصنوعة باش تقيس اللي فعلا مهم.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ", "لوح بمقياس تاكيمتري", "سوار جلدي مثقّب بطراز السباقات"],
        colors: ["بيضة/كحلة (باندا)", "كحل بالكامل"],
        care: [
          "رجع عقارب الكرونوغراف للصفر قبل ما تخزنها لمدة طويلة",
          "شطف حواف السوار منين تعرّق بزاف",
          "بدّل البطارية كل 2 إلى 3 سنين باش ما تسيلش",
          "بعّد على المجالات المغناطيسية القوية",
        ],
        leadTime: "كتشحن فظرف 24 ساعة",
      },
    },
  },
  {
    id: "6",
    name: "Nocturne Skeleton",
    slug: "nocturne-skeleton",
    tagline: "Nothing hidden. Everything earned.",
    description:
      "An open-worked mechanical caliber, hand-finished and left fully exposed front and back, so every jewel and bridge is on permanent display. Nocturne Skeleton is hand-wound — a deliberate, unhurried ritual that mirrors what it took to build the movement inside it. Limited to 200 individually numbered pieces worldwide.",
    price: 12500,
    status: "out-of-stock",
    gender: "unisex",
    accessoryType: "watches",
    subcategory: "Skeleton",
    collection: "Solstice Collection",
    materials: ["Black PVD-coated steel case", "Open-worked hand-finished movement", "Genuine alligator-embossed leather strap"],
    specs: {
      kind: "watches",
      movement: "mechanical",
      caseDiameter: 40,
      caseThickness: 10.9,
      lugToLug: 47,
      weight: 84,
      waterResistance: "30m / 3 ATM",
      powerReserve: "72 hours",
      warranty: "5-year international warranty",
    },
    colors: ["Gunmetal Skeleton"],
    colorSwatches: ["#2A2E38"],
    care: [
      "Hand-wind daily at roughly the same time for the most stable rate",
      "Avoid strong shocks — the open-worked bridges are more exposed than a solid dial",
      "Keep away from strong magnets",
      "Have the movement serviced every 3–4 years given the exposed construction",
    ],
    leadTime: "Sold out — join the waitlist",
    inStock: false,
    featured: false,
    images: ["/images/products/nocturne-skeleton-main.webp", "/images/products/nocturne-skeleton-side.webp"],
    tags: ["limited-edition"],
    stock: 0,
    engravingAvailable: false,
    translations: {
      fr: {
        name: "Nocturne Skeleton",
        tagline: "Rien de caché. Tout mérité.",
        description:
          "Un calibre mécanique squelette, fini à la main et laissé entièrement visible à l'avant comme à l'arrière, pour que chaque rubis et chaque pont reste exposé en permanence. Nocturne Skeleton se remonte à la main — un rituel délibéré et sans hâte, à l'image de ce qu'a demandé la construction du mouvement qu'elle abrite. Limitée à 200 pièces numérotées individuellement dans le monde.",
        materials: ["Boîtier en acier traité PVD noir", "Mouvement squelette fini à la main", "Bracelet cuir véritable façon alligator"],
        colors: ["Squelette gunmetal"],
        care: [
          "Remontez à la main chaque jour, à peu près à la même heure, pour la marche la plus stable",
          "Évitez les chocs violents — les ponts ajourés sont plus exposés qu'un cadran plein",
          "Tenez à l'écart des champs magnétiques puissants",
          "Faites réviser le mouvement tous les 3 à 4 ans compte tenu de sa construction ouverte",
        ],
        leadTime: "Épuisée — rejoignez la liste d'attente",
      },
      ar: {
        name: "نوكتورن سكيليتون",
        tagline: "لا شيء مخفي. كل شيء مستحق.",
        description:
          "حركة ميكانيكية مفرغة، منتهية يدوياً ومكشوفة بالكامل من الأمام والخلف، بحيث يبقى كل جوهرة وجسر ظاهراً بشكل دائم. تُعبّأ نوكتورن سكيليتون يدوياً — طقس متعمّد وغير متسرّع، يعكس ما تطلّبه بناء الحركة بداخلها. محدودة بـ 200 قطعة مرقّمة فردياً حول العالم.",
        materials: ["هيكل فولاذي مطلي PVD أسود", "حركة مفرغة منتهية يدوياً", "سوار جلد طبيعي بنقشة تمساح"],
        colors: ["مفرغة رمادية معدنية"],
        care: [
          "قم بالتعبئة اليدوية يومياً في نفس التوقيت تقريباً للحصول على أدق أداء",
          "تجنب الصدمات القوية — الجسور المفتوحة أكثر عرضة من الميناء المصمت",
          "ابتعد عن المجالات المغناطيسية القوية",
          "قم بصيانة الحركة كل 3 إلى 4 سنوات نظراً لبنيتها المكشوفة",
        ],
        leadTime: "نفدت الكمية — انضم لقائمة الانتظار",
      },
      ma: {
        name: "نوكتورن سكيليتون",
        tagline: "والو ماخفي. كلشي مستاهل.",
        description:
          "حركة ميكانيكية مفرغة، مزوقة بالإيد وبانة بالكامل من قدام ومن لور، باش تبقى كل جوهرة وجسر ظاهرين طول الوقت. نوكتورن سكيليتون كتتعبى بالإيد — طقس متعمد وبلا تسرع، كيعكس اللي تطلبات بناء الحركة لداخلها. محدودة فـ 200 قطعة مرقمة وحدة وحدة فالعالم كامل.",
        materials: ["هيكل فولاذي مطلي PVD كحل", "حركة مفرغة مزوقة بالإيد", "سوار جلد أصلي بنقشة تمساح"],
        colors: ["مفرغة رمادية معدنية"],
        care: [
          "عبّي بالإيد كل نهار فنفس الوقت تقريبا باش يبقى الأداء ثابت",
          "بعّد على الصدمات القوية — الجسور المفتوحة أكثر عرضة من المينا المصمتة",
          "بعّد على المجالات المغناطيسية القوية",
          "دير الصيانة للحركة كل 3 إلى 4 سنين حيت البنية ديالها مكشوفة",
        ],
        leadTime: "سالات الكمية — انضم للائحة الانتظار",
      },
    },
  },
  {
    id: "7",
    name: "Wanderer Field",
    slug: "wanderer-field",
    tagline: "The one you don't baby.",
    description:
      "A field watch built to the original brief: legible in bad light, tough enough for a work bag, cheap enough to actually wear every day. Matte dial, painted numerals, a domed acrylic crystal that shrugs off scratches you'd cry over on sapphire. This is the watch you reach for when the day doesn't ask permission.",
    price: 1900,
    status: "available",
    gender: "unisex",
    accessoryType: "watches",
    subcategory: "Field",
    collection: "Meridian Collection",
    materials: ["Stainless steel case", "Domed acrylic crystal", "Waxed canvas strap, leather backing"],
    specs: {
      kind: "watches",
      movement: "automatic",
      caseDiameter: 40,
      caseThickness: 11.8,
      lugToLug: 47,
      weight: 92,
      waterResistance: "50m / 5 ATM",
      powerReserve: "38 hours",
      warranty: "2-year international warranty",
    },
    colors: ["Olive / Sand", "Charcoal / Black"],
    colorSwatches: ["#4B5A47", "#2B2E33"],
    care: [
      "Wipe the canvas strap dry after rain or heavy sweat",
      "Buff light scuffs on the acrylic crystal with toothpaste and a soft cloth",
      "Keep away from strong magnets",
      "Have the movement serviced every 4–5 years",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/wanderer-field-main.webp", "/images/products/wanderer-field-wrist.webp"],
    tags: ["new"],
    stock: 22,
    engravingAvailable: true,
    translations: {
      fr: {
        name: "Wanderer Field",
        tagline: "Celle qu'on ne ménage pas.",
        description:
          "Une montre militaire conçue selon le cahier des charges d'origine : lisible en faible lumière, assez robuste pour un sac de travail, assez abordable pour la porter vraiment tous les jours. Cadran mat, chiffres peints, verre acrylique bombé qui encaisse les rayures qui vous feraient pleurer sur du saphir. C'est la montre qu'on attrape quand la journée ne demande pas la permission.",
        materials: ["Boîtier en acier inoxydable", "Verre acrylique bombé", "Bracelet toile cirée, doublure cuir"],
        colors: ["Olive / Sable", "Anthracite / Noir"],
        care: [
          "Essuyez le bracelet en toile après la pluie ou une forte transpiration",
          "Polissez les légères rayures sur le verre acrylique avec du dentifrice et un chiffon doux",
          "Tenez à l'écart des champs magnétiques puissants",
          "Faites réviser le mouvement tous les 4 à 5 ans",
        ],
        leadTime: "Expédiée sous 24h",
      },
      ar: {
        name: "واندرر فيلد",
        tagline: "الساعة اللي ما كتخافش عليها.",
        description:
          "ساعة ميدانية صُممت وفق المواصفة الأصلية: واضحة في الإضاءة الضعيفة، متينة بما يكفي لحقيبة العمل، وبسعر معقول بما يكفي لتلبسها فعلاً كل يوم. ميناء غير لامع، أرقام مطلية، وزجاج أكريليك محدّب يتحمّل خدوشاً كانت لتُبكيك على الياقوت. هذه هي الساعة التي تلجأ إليها عندما لا ينتظر اليوم إذنك.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ", "زجاج أكريليك محدّب", "سوار قماش مشمّع بطانة جلدية"],
        colors: ["زيتوني / رملي", "رمادي غامق / أسود"],
        care: [
          "امسح سوار القماش وجفّفه بعد المطر أو التعرّق الشديد",
          "لمّع الخدوش الخفيفة على الزجاج الأكريليكي بمعجون أسنان وقماش ناعم",
          "ابتعد عن المجالات المغناطيسية القوية",
          "قم بصيانة الحركة كل 4 إلى 5 سنوات",
        ],
        leadTime: "تُشحن خلال 24 ساعة",
      },
      ma: {
        name: "واندرر فيلد",
        tagline: "الساعة اللي ما كتخافش عليها.",
        description:
          "ساعة ميدانية مصنوعة على المواصفة الأصلية: واضحة فالضو الضعيف، قاسحة بزاف باش تدخل فساك الخدمة، ورخيصة بزاف باش تلبسها فعلا كل نهار. مينا ماهياش لامعة، أرقام مصبوغة، وزجاج أكريليك محدّب كيتحمل خدوش كانت غادي تبكيك عليها إلا كانت فالياقوت. هادي هي الساعة اللي كتقبض عليها منين النهار ما كيطلبش الإذن.",
        materials: ["هيكل من الفولاذ المقاوم للصدأ", "زجاج أكريليك محدّب", "سوار قماش مشمّع ببطانة جلدية"],
        colors: ["زيتوني / رملي", "رمادي غامق / كحل"],
        care: [
          "مسح سوار القماش ونشفو بعد الشتا ولا التعرق بزاف",
          "لمّع الخدوش الخفيفة فوق الزجاج الأكريليكي بمعجون السنان وشمالة ناعمة",
          "بعّد على المجالات المغناطيسية القوية",
          "دير الصيانة للحركة كل 4 إلى 5 سنين",
        ],
        leadTime: "كتشحن فظرف 24 ساعة",
      },
    },
  },

  // ── Sunglasses ──────────────────────────────────────────
  {
    id: "8",
    name: "Meridian Aviator",
    slug: "meridian-aviator",
    tagline: "Classic lines, zero glare.",
    description:
      "A titanium aviator built light enough to forget you're wearing it, with polarized lenses that cut glare without dulling color. The frame keeps its shape season after season.",
    price: 1450,
    status: "available",
    gender: "unisex",
    accessoryType: "sunglasses",
    subcategory: "Aviator",
    collection: "Riviera Collection",
    materials: ["Titanium frame", "Polarized glass lenses", "Adjustable nose pads"],
    specs: {
      kind: "sunglasses",
      frameWidth: 145,
      lensWidth: 58,
      bridgeWidth: 14,
      templeLength: 140,
      frameMaterial: "Titanium",
      lensType: "Polarized",
      uvProtection: "UV400",
      warranty: "2-year warranty",
    },
    colors: ["Gunmetal / Green", "Gold / Brown"],
    colorSwatches: ["#4A4E58", "#C9A455"],
    care: [
      "Rinse with fresh water after sea or pool exposure",
      "Store in the hard case when not worn",
      "Clean lenses with a microfiber cloth only",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/meridian-aviator-main.webp"],
    tags: ["bestseller", "new"],
    stock: 18,
  },
  {
    id: "9",
    name: "Horizon Wayfarer",
    slug: "horizon-wayfarer",
    tagline: "Bold frame, quiet confidence.",
    description:
      "A wayfarer silhouette in hand-finished acetate, cut a touch narrower than the original for a cleaner fit. UV400 lenses, all day.",
    price: 1250,
    status: "available",
    gender: "unisex",
    accessoryType: "sunglasses",
    subcategory: "Wayfarer",
    collection: "Riviera Collection",
    materials: ["Acetate frame", "UV400 lenses"],
    specs: {
      kind: "sunglasses",
      frameWidth: 142,
      lensWidth: 52,
      bridgeWidth: 20,
      templeLength: 145,
      frameMaterial: "Acetate",
      lensType: "Standard",
      uvProtection: "UV400",
      warranty: "2-year warranty",
    },
    colors: ["Tortoise", "Matte Black"],
    colorSwatches: ["#6B4A2E", "#1A1B1E"],
    care: [
      "Wipe with a microfiber cloth, never a paper towel",
      "Avoid leaving in direct heat — acetate can warp",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/horizon-wayfarer-main.webp"],
    tags: ["new"],
    stock: 24,
  },

  // ── Eyeglasses ──────────────────────────────────────────
  {
    id: "10",
    name: "Solstice Round",
    slug: "solstice-round",
    tagline: "Soft geometry, sharp focus.",
    description:
      "A round acetate frame light enough for all-day wear, ready for your prescription or worn as-is with blue-light lenses. Understated, not fussy.",
    price: 990,
    status: "available",
    gender: "women",
    accessoryType: "eyeglasses",
    subcategory: "Round",
    collection: "Atelier Collection",
    materials: ["Lightweight acetate", "Prescription-ready lenses"],
    specs: {
      kind: "eyeglasses",
      frameWidth: 138,
      lensWidth: 48,
      bridgeWidth: 19,
      templeLength: 140,
      frameMaterial: "Acetate",
      lensType: "Prescription-ready",
      warranty: "1-year warranty",
    },
    colors: ["Blush", "Clear Crystal"],
    colorSwatches: ["#E8B4B8", "#F1F4F9"],
    care: [
      "Clean with lens spray and a microfiber cloth",
      "Store in the case, hinges closed, when not worn",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/solstice-round-main.webp"],
    tags: ["bestseller"],
    stock: 15,
  },
  {
    id: "11",
    name: "Vector Rectangle",
    slug: "vector-rectangle",
    tagline: "Clean lines for the desk and beyond.",
    description:
      "A stainless steel rectangle frame built for long screen days — light on the bridge, sturdy at the hinge, and ready for your prescription.",
    price: 1050,
    status: "available",
    gender: "men",
    accessoryType: "eyeglasses",
    subcategory: "Rectangle",
    collection: "Atelier Collection",
    materials: ["Stainless steel frame", "Prescription-ready lenses"],
    specs: {
      kind: "eyeglasses",
      frameWidth: 140,
      lensWidth: 54,
      bridgeWidth: 17,
      templeLength: 145,
      frameMaterial: "Stainless Steel",
      lensType: "Prescription-ready",
      warranty: "1-year warranty",
    },
    colors: ["Gunmetal", "Matte Black"],
    colorSwatches: ["#4A4E58", "#1A1B1E"],
    care: [
      "Clean with lens spray and a microfiber cloth",
      "Have the hinges tightened yearly if worn daily",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/vector-rectangle-main.webp"],
    tags: ["new"],
    stock: 12,
  },

  // ── Jewelry ─────────────────────────────────────────────
  {
    id: "12",
    name: "Lumière Pendant",
    slug: "lumiere-pendant",
    tagline: "One stone. No noise.",
    description:
      "A single cubic zirconia stone set on a fine gold vermeil chain — the kind of piece that works alone and layers just as well.",
    price: 1290,
    status: "available",
    gender: "women",
    accessoryType: "jewelry",
    subcategory: "Necklace",
    collection: "Lumière Collection",
    materials: ["18k gold vermeil chain", "Cubic zirconia pendant"],
    specs: {
      kind: "jewelry",
      metal: "18k Gold Vermeil",
      stone: "Cubic Zirconia",
      chainLength: 45,
      adjustable: true,
      hypoallergenic: true,
      warranty: "1-year warranty",
    },
    colors: ["Gold"],
    colorSwatches: ["#C9A455"],
    sizes: ["40cm", "45cm", "50cm"],
    care: [
      "Remove before swimming, showering, or sleeping",
      "Store flat in the pouch to avoid tangling",
      "Polish gently with a soft jewelry cloth",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/lumiere-pendant-main.webp"],
    tags: ["bestseller"],
    stock: 20,
  },
  {
    id: "13",
    name: "Horizon Chain Bracelet",
    slug: "horizon-chain-bracelet",
    tagline: "Layers well. Stands alone better.",
    description:
      "A sterling silver chain bracelet with a rhodium finish that resists tarnish — sized to sit, not swing.",
    price: 890,
    status: "available",
    gender: "women",
    accessoryType: "jewelry",
    subcategory: "Bracelet",
    collection: "Lumière Collection",
    materials: ["Sterling silver", "Rhodium plating"],
    specs: {
      kind: "jewelry",
      metal: "Sterling Silver",
      adjustable: true,
      hypoallergenic: true,
      warranty: "1-year warranty",
    },
    colors: ["Silver"],
    colorSwatches: ["#B6C2D1"],
    sizes: ["16cm", "18cm", "20cm"],
    care: [
      "Remove before swimming, showering, or sleeping",
      "Polish gently with a soft jewelry cloth",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/horizon-chain-bracelet-main.webp"],
    tags: ["new"],
    stock: 25,
  },

  // ── Bags ────────────────────────────────────────────────
  {
    id: "14",
    name: "Voyage Tote",
    slug: "voyage-tote",
    tagline: "Room for the whole day.",
    description:
      "Full-grain leather structured just enough to hold its shape, with a canvas-lined interior built for laptops, notebooks, and everything else the day requires.",
    price: 1650,
    status: "available",
    gender: "women",
    accessoryType: "bags",
    subcategory: "Tote",
    collection: "Voyage Collection",
    materials: ["Full-grain leather", "Cotton canvas lining"],
    specs: {
      kind: "bags",
      dimensions: { width: 38, height: 30, depth: 14 },
      strapDrop: 22,
      material: "Full-grain leather",
      closureType: "Zip top",
      interiorPockets: 3,
      warranty: "2-year warranty",
    },
    colors: ["Cognac", "Black"],
    colorSwatches: ["#8B5A2B", "#111318"],
    care: [
      "Condition the leather every few months",
      "Avoid prolonged direct sunlight to prevent fading",
      "Store stuffed with paper to hold its shape",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/voyage-tote-main.webp"],
    tags: ["bestseller"],
    stock: 10,
  },
  {
    id: "15",
    name: "Meridian Crossbody",
    slug: "meridian-crossbody",
    tagline: "Small bag, sharp edit.",
    description:
      "Saffiano leather in a compact silhouette, with just enough room for what actually leaves the house with you. Adjustable strap, magnetic close.",
    price: 1190,
    status: "available",
    gender: "women",
    accessoryType: "bags",
    subcategory: "Crossbody",
    collection: "Voyage Collection",
    materials: ["Saffiano leather", "Adjustable strap"],
    specs: {
      kind: "bags",
      dimensions: { width: 20, height: 16, depth: 7 },
      strapDrop: 55,
      material: "Saffiano leather",
      closureType: "Magnetic flap",
      interiorPockets: 2,
      warranty: "2-year warranty",
    },
    colors: ["Sand", "Black"],
    colorSwatches: ["#D8C7A8", "#111318"],
    care: [
      "Wipe clean with a dry cloth",
      "Avoid overloading — Saffiano keeps its texture best unstretched",
    ],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/meridian-crossbody-main.webp"],
    tags: ["new"],
    stock: 14,
  },

  // ── Scarves ─────────────────────────────────────────────
  {
    id: "16",
    name: "Sahara Silk Scarf",
    slug: "sahara-silk-scarf",
    tagline: "One square. Endless ways to wear it.",
    description:
      "100% mulberry silk with hand-rolled edges — around the neck, on a bag handle, or tied at the wrist. One square, however you wear it.",
    price: 590,
    status: "available",
    gender: "women",
    accessoryType: "scarves",
    subcategory: "Silk",
    collection: "Sahara Collection",
    materials: ["100% mulberry silk", "Hand-rolled edges"],
    specs: {
      kind: "scarves",
      dimensions: { length: 90, width: 90 },
      fabric: "100% Mulberry Silk",
      careInstructions: "Dry clean only",
      warranty: "6-month quality guarantee",
    },
    colors: ["Terracotta Print", "Indigo Print"],
    colorSwatches: ["#B5603D", "#1E3FA0"],
    care: ["Dry clean only", "Store flat or loosely rolled, never folded on a crease"],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/sahara-silk-scarf-main.webp"],
    tags: ["bestseller"],
    stock: 30,
  },
  {
    id: "17",
    name: "Atlas Wool Scarf",
    slug: "atlas-wool-scarf",
    tagline: "Warm without the weight.",
    description:
      "A merino wool blend, woven long enough to wrap twice, soft enough to wear against bare skin. Built for a Casablanca winter, not a Siberian one.",
    price: 490,
    status: "available",
    gender: "men",
    accessoryType: "scarves",
    subcategory: "Wool",
    collection: "Sahara Collection",
    materials: ["Merino wool blend"],
    specs: {
      kind: "scarves",
      dimensions: { length: 180, width: 30 },
      fabric: "Merino Wool Blend",
      careInstructions: "Hand wash cold",
      warranty: "6-month quality guarantee",
    },
    colors: ["Charcoal", "Camel"],
    colorSwatches: ["#3A3D42", "#B08D57"],
    care: ["Hand wash cold, lay flat to dry", "Store folded, away from direct sunlight"],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/atlas-wool-scarf-main.webp"],
    tags: ["new"],
    stock: 22,
  },

  // ── Belts ───────────────────────────────────────────────
  {
    id: "18",
    name: "Heritage Leather Belt",
    slug: "heritage-leather-belt",
    tagline: "Ages better than you do.",
    description:
      "Full-grain leather on a brushed steel buckle, built to take on a patina rather than hide from one. Five sizes, one belt for years.",
    price: 690,
    status: "available",
    gender: "men",
    accessoryType: "belts",
    subcategory: "Leather",
    collection: "Heritage Collection",
    materials: ["Full-grain leather", "Brushed steel buckle"],
    specs: {
      kind: "belts",
      lengths: [85, 90, 95, 100, 105],
      width: 35,
      material: "Full-grain leather",
      buckleType: "Pin buckle",
      warranty: "2-year warranty",
    },
    colors: ["Cognac", "Black"],
    colorSwatches: ["#8B5A2B", "#111318"],
    care: ["Condition every few months", "Avoid prolonged water exposure"],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/heritage-leather-belt-main.webp"],
    tags: ["bestseller"],
    stock: 28,
  },
  {
    id: "19",
    name: "Duo Reversible Belt",
    slug: "duo-reversible-belt",
    tagline: "Two belts. One buckle.",
    description:
      "A rotating buckle flips between black and brown leather in one motion — one belt doing the work of two, without the bulk.",
    price: 750,
    status: "available",
    gender: "men",
    accessoryType: "belts",
    subcategory: "Reversible",
    collection: "Heritage Collection",
    materials: ["Reversible leather", "Rotating buckle"],
    specs: {
      kind: "belts",
      lengths: [90, 95, 100, 105, 110],
      width: 35,
      material: "Reversible leather",
      buckleType: "Rotating buckle",
      warranty: "2-year warranty",
    },
    colors: ["Black / Brown"],
    colorSwatches: ["#111318"],
    care: ["Wipe clean with a dry cloth", "Avoid prolonged water exposure"],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/duo-reversible-belt-main.webp"],
    tags: ["new"],
    stock: 16,
  },

  // ── Hats ────────────────────────────────────────────────
  {
    id: "20",
    name: "Casablanca Cap",
    slug: "casablanca-cap",
    tagline: "Everyday, elevated.",
    description:
      "A cotton twill six-panel cap with clean embroidered eyelets — no logo shouting, just a shape that works with everything.",
    price: 390,
    status: "available",
    gender: "unisex",
    accessoryType: "hats",
    subcategory: "Cap",
    collection: "Casablanca Collection",
    materials: ["Cotton twill", "Embroidered eyelets"],
    specs: {
      kind: "hats",
      sizeRange: ["One size, adjustable"],
      material: "Cotton Twill",
      adjustable: true,
      warranty: "6-month quality guarantee",
    },
    colors: ["Navy", "Sand"],
    colorSwatches: ["#0F2459", "#D8C7A8"],
    care: ["Spot clean only", "Reshape by hand while damp, air dry"],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: true,
    images: ["/images/products/casablanca-cap-main.webp"],
    tags: ["bestseller"],
    stock: 35,
  },
  {
    id: "21",
    name: "Voyage Bucket Hat",
    slug: "voyage-bucket-hat",
    tagline: "Sun-ready, city-ready.",
    description:
      "A cotton canvas bucket hat with UPF 50+ coverage, cut with a slightly wider brim for actual shade — not just the look of it.",
    price: 420,
    status: "available",
    gender: "women",
    accessoryType: "hats",
    subcategory: "Bucket",
    collection: "Casablanca Collection",
    materials: ["Cotton canvas", "UPF 50+"],
    specs: {
      kind: "hats",
      sizeRange: ["S/M", "L/XL"],
      material: "Cotton Canvas",
      adjustable: false,
      warranty: "6-month quality guarantee",
    },
    colors: ["Olive", "Ivory"],
    colorSwatches: ["#4B5A47", "#F1E9D8"],
    care: ["Spot clean only", "Do not machine wash"],
    leadTime: "Ships within 24h",
    inStock: true,
    featured: false,
    images: ["/images/products/voyage-bucket-hat-main.webp"],
    tags: ["new"],
    stock: 20,
  },
];
