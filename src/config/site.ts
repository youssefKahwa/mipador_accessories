// Central place for brand identity + social links.
// NOTE on imagery: hero, category/gender tiles, and product photos are still
// plain <img> tags pointing at placeholder files under /public/images — drop
// in real photography with the same filenames to replace them. Product
// visuals still fall back to a code-drawn WatchIllustration/LiveDial if a
// file is ever missing (see ProductVisual.tsx). The logo is the real Mipador
// mark, shared with home.mipador.com and mipador.com — see /images/LogoNav*
// and /images/LogoFooter* — don't swap these for a placeholder.
export const SITE = {
  brandName: "Mipador Accessories",
  brandShort: "Mipador",
  brandTagline: "Details, well kept.",
  url: "https://accessories.mipador.com",

  logo: {
    nav: {
      src: "/images/LogoNav.webp",
      srcSet: "/images/LogoNav@1x.webp 200w, /images/LogoNav.webp 400w",
      sizes: "183px",
      width: 183,
      height: 28,
    },
    footer: {
      src: "/images/LogoFooter.webp",
      srcSet: "/images/LogoFooter@1x.webp 300w, /images/LogoFooter@2x.webp 450w, /images/LogoFooter.webp 600w",
      sizes: "285px",
      width: 285,
      height: 64,
    },
  },

  social: {
    instagram: "https://instagram.com/mipadoraccessories",
    tiktok: "https://tiktok.com/@mipadoraccessories",
    youtube: "https://youtube.com/@mipadoraccessories",
  },
} as const;
