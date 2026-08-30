import type { AccessoryType, Gender } from "../data/products";

// Single source of truth for the accessory taxonomy — nav, category
// landing pages, the filter sidebar, and the sitemap generator should all
// read from here instead of hardcoding per-category lists.
export interface CategoryMeta {
  id: AccessoryType;
  labelKey: string;       // i18n key, e.g. "nav.watches"
  heroImage: string;      // /public/images/category-{id}.jpg
  hasPhoto: boolean;      // false renders the CategoryPlaceholder lettermark instead of heroImage
  subcategories: string[];
  genders: Gender[];
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "watches",
    labelKey: "nav.watches",
    heroImage: "/images/category-gmt.jpg",
    hasPhoto: true,
    subcategories: ["GMT", "Dress", "Diver", "Chronograph", "Skeleton", "Field"],
    genders: ["men", "women", "unisex"],
  },
  {
    id: "sunglasses",
    labelKey: "nav.sunglasses",
    heroImage: "/images/category-sunglasses.jpg",
    hasPhoto: false,
    subcategories: ["Aviator", "Wayfarer", "Round", "Cat-Eye", "Sport", "Oversized"],
    genders: ["men", "women", "kids", "unisex"],
  },
  {
    id: "eyeglasses",
    labelKey: "nav.eyeglasses",
    heroImage: "/images/category-eyeglasses.jpg",
    hasPhoto: false,
    subcategories: ["Round", "Rectangle", "Cat-Eye", "Rimless"],
    genders: ["men", "women", "kids", "unisex"],
  },
  {
    id: "jewelry",
    labelKey: "nav.jewelry",
    heroImage: "/images/category-jewelry.jpg",
    hasPhoto: false,
    subcategories: ["Necklace", "Bracelet", "Earrings", "Ring", "Anklet"],
    genders: ["women", "men", "kids"],
  },
  {
    id: "bags",
    labelKey: "nav.bags",
    heroImage: "/images/category-bags.jpg",
    hasPhoto: false,
    subcategories: ["Tote", "Crossbody", "Backpack", "Clutch", "Handbag"],
    genders: ["women", "men", "kids"],
  },
  {
    id: "scarves",
    labelKey: "nav.scarves",
    heroImage: "/images/category-scarves.jpg",
    hasPhoto: false,
    subcategories: ["Silk", "Wool", "Cotton", "Infinity"],
    genders: ["women", "men", "unisex"],
  },
  {
    id: "belts",
    labelKey: "nav.belts",
    heroImage: "/images/category-belts.jpg",
    hasPhoto: false,
    subcategories: ["Leather", "Canvas", "Reversible"],
    genders: ["men", "women"],
  },
  {
    id: "hats",
    labelKey: "nav.hats",
    heroImage: "/images/category-hats.jpg",
    hasPhoto: false,
    subcategories: ["Cap", "Beanie", "Fedora", "Bucket", "Sunhat"],
    genders: ["men", "women", "kids", "unisex"],
  },
];

export function getCategoryMeta(id: AccessoryType): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
