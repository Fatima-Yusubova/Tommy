import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
  const [hovered, setHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState(null)
  const handleMouseEnter = () => {
    setHovered(true)
    if (swiper && item?.images?.length > 1) {
      swiper.slideTo(1, 300)
      setCurrentSlide(1)
    }
  }
  const handleMouseLeave = () => {
    setHovered(false)
    if (swiper) {
      swiper.slideTo(0, 300)
      setCurrentSlide(0)
    }
  }
  const goToNext = () => { 
    if (swiper) swiper.slideNext()}
  const goToPrev = () => {
    if (swiper) swiper.slidePrev()} 
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
    speed:2,
    onSwiper: (swiper) => setSwiper(swiper),
    onSlideChange: (swiper) => setCurrentSlide(swiper.activeIndex),
    allowTouchMove: true,
  }
  return (
    <div className="">
      <div className="h-[420px] relative overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {!hovered || !item?.images || item.images.length <= 1 ? (
          <img className="w-full h-full object-cover" src={item?.images?.[0]?.url}
          />
        ) : (
          <Swiper {...swiperConfig} className="w-full h-full product-swiper">
            {item.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img className="w-full h-full object-cover" src={img.url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {hovered && item?.images?.length > 1 && (
          <>
            <button className={`prev-button-${item?.id} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1 `} onClick={goToPrev}>
              <ChevronLeft size={20} />
            </button>
            <button className={`next-button-${item?.id} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1 `}  onClick={goToNext}>
              <ChevronRight size={20}  />
            </button>
          </>
        )}
      </div>
      <div className="p-3">
        <h3 className="py-2 font-medium">{item?.name}</h3>
        <p className="font-medium">${item?.price}</p>
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
          background: black !important; 
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
