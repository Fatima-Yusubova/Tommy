import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuickviewMenu from "./QuickviewMenu";
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
  const [view ,setView] = useState(false)
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
  const goToNext = (e) => { 
    e.stopPropagation()
    if (swiper) swiper.slideNext()}
  const goToPrev = (e) => {
    e.stopPropagation()
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
    <div className="cursor-pointer">
      <div
        className="relative overflow-hidden bg-gray-50 aspect-[3/4]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!hovered || !item?.images || item.images.length <= 1 ? (
          <img
            className="w-full h-full object-cover"
            src={item?.images?.[0]?.url}
          />
        ) : (
          <Swiper {...swiperConfig} className="w-full h-full product-swiper">
            {item.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  className="w-full h-full object-cover"
                  src={img.url}
                  alt={`${item?.name} - ${i + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {hovered && item?.images?.length > 1 && (
          <>
            <button
              className={`prev-button-${item?.id} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1`}
              onClick={goToPrev}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`next-button-${item?.id} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1`}
              onClick={goToNext}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        {hovered && (
          <div className="hidden lg:flex  absolute inset-0 z-5 items-center justify-center">
            <button
              onClick={() => setView(true)}
              className="bg-white opacity-80 rounded-sm text-black  py-2 w-[180px]"
            >
              Quick View
            </button>
          </div>
        )}
        <QuickviewMenu item={item} view={view} setView={setView} />
        <div className="absolute bottom-3 right-3 lg:hidden">
          <button
            onClick={() => setView(true)}
            className="bg-white w-5 h-5 border-gray-400 border-1 flex items-center justify-center p-1 rounded-full"
          >
            +
          </button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="py-2 font-medium">{item?.name}</h3>
        <div className="flex items-center gap-2">
          {item?.discount > 0 ? (
            <>
              <span className="text-[#484848] text-sm line-through">
                ${item?.price}
              </span>
              <span className="text-black font-medium">
                ${(item?.price * (1 - item?.discount / 100)).toFixed(2)}
              </span>
              <span className="text-[#464C52] text-sm">
                {item?.discount}% off
              </span>
            </>
          ) : (
            <span className="text-black font-medium">${item?.price}</span>
          )}
        </div>

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
    </div>
  );
};

export default ProductCard;
