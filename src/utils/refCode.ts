import type { Product } from "../data/products";

// Abbreviations for the subcategories that exist in the catalog today.
// Anything not listed here (new subcategories, other accessory lines)
// falls back to its own first three letters, so this never needs
// maintenance to stay correct — only to stay pretty.
const KNOWN_SUBCATEGORY_ABBR: Record<string, string> = {
  GMT: "GMT",
  Dress: "DRS",
  Diver: "DIV",
  Chronograph: "CHR",
  Skeleton: "SKL",
  Field: "FLD",
};

// Reference-number styling is a small, genuinely watch-catalog-specific
// detail — real watch listings carry a reference code, decor listings don't.
export function getRefCode(product: Pick<Product, "id" | "subcategory">): string {
  const abbr = KNOWN_SUBCATEGORY_ABBR[product.subcategory] ?? product.subcategory.slice(0, 3).toUpperCase();
  return `MG-${abbr}-${product.id.padStart(3, "0")}`;
}
