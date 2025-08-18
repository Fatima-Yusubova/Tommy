import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OpenMenu from "../../ui/OpenMenu";
import QuickviewContent from "./QuickviewContent";
import { Link } from "react-router";

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
  const [swiper, setSwiper] = useState(null);
  const [view, setView] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (swiper && item?.images?.length > 1) {
      swiper.slideTo(1, 300);
      setCurrentSlide(1);
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (swiper) {
      swiper.slideTo(0, 300);
      setCurrentSlide(0);
    }
  };
  const goToNext = (e) => {
    e.stopPropagation();
    if (swiper) swiper.slideNext();
  };
  const goToPrev = (e) => {
    e.stopPropagation();
    if (swiper) swiper.slidePrev();
  };

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
    speed: 2,
    onSwiper: (swiper) => setSwiper(swiper),
    onSlideChange: (swiper) => setCurrentSlide(swiper.activeIndex),
    allowTouchMove: true,
  };

  return (
    <div className="cursor-pointer w-full">
      <div
        className="relative overflow-hidden bg-gray-50 aspect-[3/4] w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!hovered || !item?.images || item.images.length <= 1 ? (
          <img
            className="w-full h-full object-cover"
            src={item?.images?.[0]?.url}
            alt={item?.name || "Product image"}
          />
        ) : (
          <Swiper {...swiperConfig} className="w-full h-full product-swiper">
            {item.images.map((img, i) => (
              <SwiperSlide key={i}>
                <Link to={`/product/${item?.id}`}>
                  <img className="w-full h-full object-cover" src={img.url} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {hovered && item?.images?.length > 1 && (
          <>
            <button
              className={`prev-button-${item?.id} absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1`}
              onClick={goToPrev}
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              className={`next-button-${item?.id} absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white rounded-full p-1`}
              onClick={goToNext}
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {hovered && (
          <div className="hidden lg:flex absolute inset-0 z-5 items-center justify-center">
            <button
              onClick={() => setView(true)}
              className="bg-white opacity-80 rounded-sm text-black py-2 px-4 text-sm font-medium hover:opacity-100 transition-opacity"
              style={{ minWidth: "140px", maxWidth: "180px" }}
            >
              Quick View
            </button>
          </div>
        )}

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:hidden">
          <button
            onClick={() => setView(true)}
            className="bg-white w-5 h-5 sm:w-6 sm:h-6 border-gray-400 border flex items-center justify-center rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <div className="p-2 sm:p-3 space-y-2 min-h-[80px] sm:min-h-[90px]">
        <h3 className="text-sm sm:text-base font-medium leading-tight line-clamp-2 text-gray-900">
          {item?.name}
        </h3>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {item?.discount > 0 ? (
            <>
              <span className="text-gray-500 text-xs sm:text-sm line-through order-1">
                ${item?.price}
              </span>
              <span className="text-black font-medium text-sm sm:text-base order-2">
                ${(item?.price * (1 - item?.discount / 100)).toFixed(2)}
              </span>
              <span className="text-xs sm:text-sm order-3 text-[#464C52]">
                {item?.discount}% off
              </span>
            </>
          ) : (
            <span className="text-black font-medium text-sm sm:text-base">
              ${item?.price}
            </span>
          )}
        </div>
        {item?.colors && item.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {item.colors.slice(0, 6).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 cursor-pointer hover:border-black hover:scale-110 transition-all duration-200 flex-shrink-0"
                style={{
                  backgroundColor: colorMapping[color],
                }}
                title={color}
              />
            ))}
            {item.colors.length > 6 && (
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-600">
                  +{item.colors.length - 6}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <OpenMenu open={view} setOpen={setView} width="max-w-4xl">
        <QuickviewContent item={item} closeMenu={() => setView(false)} />
      </OpenMenu>
    </div>
  );
};

export default ProductCard;
