import { motion } from "framer-motion";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const images = [
  { src: "/images/atmosphere-2.webp", alt: "Mipador — contemporary furniture, Morocco" },
  { src: "/images/atmosphere-3.webp", alt: "Mipador — spaces that breathe" },
  { src: "/images/atmosphere-4.webp", alt: "Mipador — outdoor furniture, Morocco" },
  { src: "/images/atmosphere-5.webp", alt: "Mipador — premium home decor, Casablanca" },
];

const isMd = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
const swiperStyle = isMd
  ? { width: "280px", height: "320px" }
  : { width: "240px", height: "270px" };

const LogoStack = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative flex items-center justify-center"
    >
      <Swiper
        effect="cards"
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        style={swiperStyle}
      >
        <SwiperSlide className="rounded-[2rem] overflow-hidden shadow-2xl">
          <img
            src="/images/atmosphere-1.webp"
            alt="Mipador"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-espresso/10" />
        </SwiperSlide>

        {images.map((img, i) => (
          <SwiperSlide key={i} className="rounded-[2rem] overflow-hidden shadow-xl">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-espresso/10" />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default LogoStack;
