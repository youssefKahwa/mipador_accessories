import type { ElementType } from "react";
import { Globe2, Gem, Waves, Timer, Eye, Compass, Briefcase, Mountain, Moon } from "lucide-react";
import type { AccessoryType } from "../../data/products";

export type StyleId = "voyager" | "executive" | "diver" | "racer" | "purist" | "wanderer";

export interface StyleMatch {
  accessoryType: AccessoryType;
  subcategory: string;
}

export interface StyleProfile {
  id: StyleId;
  matches: StyleMatch[];
  Icon: ElementType;
  accent: string;
  image: string;
}

// Each style maps to a real set of (accessoryType, subcategory) pairs spanning
// several categories, so "pieces built for this style" on the result page is
// never an empty promise — it's an actual filter against data/products.ts.
// Every product in the catalog belongs to exactly one style.
export const STYLE_PROFILES: StyleProfile[] = [
  {
    id: "voyager",
    Icon: Globe2,
    accent: "#1E3FA0",
    image: "/images/style-voyager.jpg",
    matches: [
      { accessoryType: "watches", subcategory: "GMT" },
      { accessoryType: "sunglasses", subcategory: "Aviator" },
      { accessoryType: "bags", subcategory: "Tote" },
    ],
  },
  {
    id: "executive",
    Icon: Gem,
    accent: "#50617D",
    image: "/images/style-executive.jpg",
    matches: [
      { accessoryType: "watches", subcategory: "Dress" },
      { accessoryType: "eyeglasses", subcategory: "Rectangle" },
      { accessoryType: "belts", subcategory: "Reversible" },
    ],
  },
  {
    id: "diver",
    Icon: Waves,
    accent: "#2F6FE0",
    image: "/images/style-diver.jpg",
    matches: [
      { accessoryType: "watches", subcategory: "Diver" },
      { accessoryType: "sunglasses", subcategory: "Wayfarer" },
      { accessoryType: "bags", subcategory: "Crossbody" },
    ],
  },
  {
    id: "racer",
    Icon: Timer,
    accent: "#0F2459",
    image: "/images/style-racer.jpg",
    matches: [
      { accessoryType: "watches", subcategory: "Chronograph" },
      { accessoryType: "belts", subcategory: "Leather" },
    ],
  },
  {
    id: "purist",
    Icon: Eye,
    accent: "#2A2E38",
    image: "/images/style-purist.jpg",
    matches: [
      { accessoryType: "watches", subcategory: "Skeleton" },
      { accessoryType: "eyeglasses", subcategory: "Round" },
      { accessoryType: "jewelry", subcategory: "Necklace" },
      { accessoryType: "jewelry", subcategory: "Bracelet" },
      { accessoryType: "scarves", subcategory: "Silk" },
    ],
  },
  {
    id: "wanderer",
    Icon: Compass,
    accent: "#4B5A47",
    image: "/images/style-wanderer.jpg",
    matches: [
      { accessoryType: "watches", subcategory: "Field" },
      { accessoryType: "hats", subcategory: "Cap" },
      { accessoryType: "hats", subcategory: "Bucket" },
      { accessoryType: "scarves", subcategory: "Wool" },
    ],
  },
];

export const WEAR_OCCASIONS = ["office", "weekend", "evening"] as const;
export type WearOccasion = (typeof WEAR_OCCASIONS)[number];

export const WEAR_ICONS: Record<WearOccasion, ElementType> = {
  office: Briefcase,
  weekend: Mountain,
  evening: Moon,
};
