import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const SITE_NAME = "Mipador";
const SITE_URL = "https://mipador.com";
const OG_DEFAULT_IMAGE = `${SITE_URL}/images/hero.webp`;

const LANGS = ["en", "fr", "ar", "ma"] as const;
type Lang = (typeof LANGS)[number];

const HREFLANG_LANGS = ["en", "fr", "ar"] as const;

const LOCALE_MAP: Record<Lang, string> = {
  en: "en_MA",
  fr: "fr_MA",
  ar: "ar_MA",
  ma: "ar_MA",
};

const RTL_LANGS = new Set<Lang>(["ar", "ma"]);

const DEFAULT_DESCS: Record<Lang, string> = {
  en: "Mipador — contemporary furniture and home decor for spaces that make you feel free and alive. Premium indoor and outdoor pieces. Based in Casablanca, delivered to Casablanca, Rabat, Marrakech, and across Morocco.",
  fr: "Mipador — mobilier et décoration contemporains pour des espaces qui vous font sentir libre et vivant. Pièces premium intérieur et extérieur. Basé à Casablanca, livraison à Casablanca, Rabat, Marrakech et partout au Maroc.",
  ar: "ميبادور — أثاث وديكور معاصر لفضاءات تجعلك تشعر بالحرية والحياة. قطع فاخرة داخلية وخارجية. مقرّنا الدار البيضاء، نوصّل إلى الدار البيضاء والرباط ومراكش وجميع أنحاء المغرب.",
  ma: "ميبادور — أثاث وديكور معاصر لبلاصات كتخليك تحس بالحرية والحياة. قطع فاخرة من الداخل والخارج. مقرنا الدار البيضاء، التوصيل فجميع أنحاء المغرب.",
};

// ── DOM helpers ───────────────────────────────────────────────────────────────

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setHreflang(hreflang: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// ── useSEO ───────────────────────────────────────────────────────────────────
// Drop-in replacement — keeps (title, description?) signature.
// Automatically injects OG, Twitter Card, canonical, hreflang, and sets
// <html lang dir> from the URL's :lang segment.
// Options:
//   ogImage   — full URL to the page-specific social share image
//   ogType    — schema.org page type: "website" (default) | "product" | etc.
//   imageAlt  — alt text for OG + Twitter images (defaults to resolved title)

interface SeoOptions {
  ogImage?: string;
  ogType?: string;
  imageAlt?: string;
}

export function useSEO(title: string, description?: string, options?: SeoOptions) {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang: Lang = LANGS.includes(lang as Lang)
    ? (lang as Lang)
    : "fr";

  const ogImg = options?.ogImage ?? OG_DEFAULT_IMAGE;
  const ogType = options?.ogType ?? "website";
  const imageAlt = options?.imageAlt;

  useEffect(() => {
    const resolvedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const resolvedDesc = description ?? DEFAULT_DESCS[currentLang];
    const locale = LOCALE_MAP[currentLang];
    const resolvedImgAlt = imageAlt ?? resolvedTitle;

    // <html> attributes — drives browser font/layout and assistive tech
    document.documentElement.setAttribute("lang", currentLang);
    document.documentElement.setAttribute(
      "dir",
      RTL_LANGS.has(currentLang) ? "rtl" : "ltr"
    );

    // Title
    document.title = resolvedTitle;

    // ── Primary meta ─────────────────────────────────────────────────────────
    setMeta("name", "description", resolvedDesc);
    setMeta(
      "name",
      "robots",
      "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
    );

    // ── Open Graph ───────────────────────────────────────────────────────────
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", resolvedTitle);
    setMeta("property", "og:description", resolvedDesc);
    setMeta("property", "og:image", ogImg);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", resolvedImgAlt);
    setMeta("property", "og:url", `${SITE_URL}${location.pathname}`);
    setMeta("property", "og:locale", locale);

    // ── Twitter Card ─────────────────────────────────────────────────────────
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@mipador");
    setMeta("name", "twitter:title", resolvedTitle);
    setMeta("name", "twitter:description", resolvedDesc);
    setMeta("name", "twitter:image", ogImg);
    setMeta("name", "twitter:image:alt", resolvedImgAlt);

    // ── Canonical ────────────────────────────────────────────────────────────
    setCanonical(`${SITE_URL}${location.pathname}`);

    // ── hreflang alternates ──────────────────────────────────────────────────
    // Strip the lang prefix to get the rest of the path
    const pathParts = location.pathname.split("/").filter(Boolean); // ["en","products",...]
    const restPath = pathParts.slice(1).join("/"); // "products/..." without lang

    // Only use ISO-recognized language tags for hreflang ("ma" is not valid)
    HREFLANG_LANGS.forEach((l) => {
      const href = `${SITE_URL}/${l}${restPath ? `/${restPath}` : ""}`;
      setHreflang(l, href);
    });
    // x-default → French
    setHreflang(
      "x-default",
      `${SITE_URL}/fr${restPath ? `/${restPath}` : ""}`
    );
  }, [title, description, currentLang, location.pathname, ogImg, ogType, imageAlt]);
}

// ── useJsonLd ────────────────────────────────────────────────────────────────
// Accepts a single schema object or null.
// Use { "@context": "https://schema.org", "@graph": [...] } for multi-type pages.

export function useJsonLd(schema: Record<string, unknown> | null) {
  useEffect(() => {
    if (!schema) return;
    const id = "mipador-json-ld";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [schema]);
}
