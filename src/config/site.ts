// Central place to swap the logo, hero imagery, or social links without
// hunting through Navbar/Footer/Hero components. Everything here points
// into /public/images — replace a file there and update the path below.
export const SITE = {
  brandName: "Mipador",

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

  hero: {
    desktop: { src: "/images/hero01.webp", width: 1600, height: 1200 },
    mobile: {
      srcSet: "/images/HeroMobile-sm.webp 520w, /images/HeroMobile.webp 677w",
      width: 677,
      height: 1350,
    },
    featureThumb: {
      url: "/images/atmosphere-1-thumb.webp",
      alt: "Mipador — handcrafted Moroccan textiles and decor",
    },
  },

  social: {
    instagram: "https://instagram.com/mipador",
    tiktok: "https://tiktok.com/@mipadorofficial",
    pinterest: "https://pinterest.com/mipador",
  },
} as const;
