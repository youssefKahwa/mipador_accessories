export function toWebp(src: string): string {
  if (!src || !src.startsWith("/images/")) return src;
  return src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
}
