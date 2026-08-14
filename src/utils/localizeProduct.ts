import type { Product } from "../data/products";

export function localizeProduct(product: Product, lang: string): Product {
  if (lang === "en" || !product.translations) return product;
  const locale = product.translations[lang as "fr" | "ar" | "ma"];
  if (!locale) return product;
  return {
    ...product,
    name: locale.name ?? product.name,
    tagline: locale.tagline ?? product.tagline,
    description: locale.description ?? product.description,
    materials: locale.materials ?? product.materials,
    care: locale.care ?? product.care,
    colors: locale.colors ?? product.colors,
    leadTime: locale.leadTime ?? product.leadTime,
  };
}
