import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper CSS-lərini import et
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const colorMapping = {
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#008000",
  Yellow: "#FFFF00",
  Orange: "#FFA500",
  Purple: "#800080",
  Pink: "#FFC0CB",
  Brown: "#A52A2A",
  Black: "#000000",
  White: "#FFFFFF",
  Gray: "#808080",
  Beige: "#F5F5DC",
  Ivory: "#FFFFF0",
  Teal: "#008080",
  Turquoise: "#40E0D0",
  Lime: "#00FF00",
  Olive: "#808000",
  Maroon: "#800000",
  Navy: "#000080",
  Indigo: "#4B0082",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  Bronze: "#CD7F32",
  Coral: "#FF7F50",
  Salmon: "#FA8072",
  Mint: "#98FB98",
  Lavender: "#E6E6FA",
  Charcoal: "#36454F",
  Peach: "#FFCBA4",
  Mustard: "#FFDB58",
  Sand: "#F4A460",
  Sky: "#87CEEB",
  Plum: "#DDA0DD",
  Emerald: "#50C878",
  Ruby: "#E0115F",
  Sapphire: "#0F52BA",
};

const ProductCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Hover edəndə 2-ci şəkilə (index 1) keç
    if (swiperInstance && item?.images?.length > 1) {
      swiperInstance.slideTo(1, 300);
      setCurrentSlide(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Mouse çıxanda ilk şəkilə qayıt
    if (swiperInstance) {
      swiperInstance.slideTo(0, 300);
      setCurrentSlide(0);
    }
  };

  const goToNext = (e) => {
    e.stopPropagation(); // Parent hover event-ini dayandır
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  // Swiper konfiqurasiyası (autoplay YOX)
  const swiperConfig = {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: `.next-button-${item?.id}`,
      prevEl: `.prev-button-${item?.id}`,
    },
    pagination: {
      clickable: true,
      dynamicBullets: false,
    },
    loop: false,
    speed:0,
    onSwiper: (swiper) => setSwiperInstance(swiper),
    onSlideChange: (swiper) => setCurrentSlide(swiper.activeIndex),
    allowTouchMove: true, // Touch/drag aktiv
  };

  return (
    <div className="">
      <div
        className="h-[420px] relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isHovered || !item?.images || item.images.length <= 1 ? (
          // Hover olmayanda və ya tək şəkil varsa sadəcə ilk şəkil
          <img
            className="w-full h-full object-cover"
            src={item?.images?.[0]?.url}
            alt={item?.name}
          />
        ) : (
          // Hover olanda və çoxlu şəkil varsa Swiper
          <Swiper {...swiperConfig} className="w-full h-full product-swiper">
            {item.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="w-full h-full object-cover"
                  src={image.url}
                  alt={`${item.name} - ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation Button-lar - yalnız hover edəndə və çoxlu şəkil varsa */}
        {isHovered && item?.images?.length > 1 && (
          <>
            {/* Sol Button */}
            <button
              className={`prev-button-${item?.id} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1 `}
              onClick={goToPrev}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Sağ Button */}
            <button
              className={`next-button-${item?.id} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1 `}
              onClick={goToNext}
            >
              <ChevronRight size={20}  />
            </button>
          </>
        )}
      </div>

      {/* Məhsul məlumatları */}
      <div className="p-3">
        <h3 className="py-2 font-medium">{item?.name}</h3>
        <p className="font-medium">${item?.price}</p>

        {/* Rəng seçimləri */}
        {item?.colors && item.colors.length > 0 && (
          <div className="flex gap-2 mt-2">
            {item.colors.map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-1 border-gray-400 cursor-pointer hover:border-black"
                style={{
                  backgroundColor: colorMapping[color],
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS for Swiper */}
      <style jsx>{`
      

        .product-swiper .swiper-pagination {
          bottom: 12px !important;
          z-index: 10;
        }

        .product-swiper .swiper-pagination-bullet {
          background: #e0e0e0 !important;
          opacity: 0.6 !important;
          width: 23px !important;
          height: 2px !important;
          border-radius: 2px !important;
          margin: 0 2px !important;
        }

        .product-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: black !important; /* 🛠️ Qara olsun deyə əlavə etdik */
        }

        .product-swiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-swiper .swiper-button-next,
        .product-swiper .swiper-button-prev {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
