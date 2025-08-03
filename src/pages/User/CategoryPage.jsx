import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../../store/eccomerceApi";
import SaleBanner from "../../components/User/Header/SaleBanner";
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
const CategoryPage = () => {
  const [hover ,setHover] = useState([])
  const { categoryId } = useParams();
  const { data } = useGetProductsByIdQuery(categoryId);
  const hovered = (id) => {
    if(hover.includes(id)) {setHover(hover.filter(item => item != id))}
    else setHover([...hover , id])
  }
  
  return (
    <div>
      <div className="max-w-[95%] m-auto">
        <div className="py-5">
          {data && (
            <>
              <p className="pb-5">{data[0]?.category.name}</p>
              <h1 className="text-2xl">
                {data[0]?.category.name}'s Clothing & Accessories
              </h1>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="h-[420px] bg-[#AE0029] text-white flex items-center justify-center px-5 py-10">
          <div className="text-center max-w-2xl">
            {/* Title */}
            <h1 className="text-5xl md:text-3xl font-garamond  mb-8 leading-tight">
              End of Season Sale
            </h1>

            {/* Discount Information */}
            <div className="mb-10">
              {/* Main Discount */}
              <div className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                Up to 70% Off
              </div>

              {/* Plus Sign */}
              <div className="text-3xl md:text-4xl font-light mb-4 opacity-90">
                +
              </div>

              {/* Extra Discount */}
              <div className="text-2xl md:text-3xl font-medium mb-2 leading-tight">
                EXTRA 30% Off
                <br />
                Sale Styles
              </div>

              {/* Code Information */}
              <div className="text-xl md:text-2xl font-medium opacity-95">
                with Code:{" "}
                <span className="font-bold tracking-widest">SALE</span>
              </div>
            </div>

            {/* Call to Action */}
            <a
              href="#"
              className="inline-block text-lg  border-b-2 border-white pb-3 hover:border-opacity-70 hover:-translate-y-0.5 transition-all duration-300 tracking-wide"
            >
              Shop Now
            </a>
          </div>
        </div>
        {data?.map((item, i) => (
          <div key={i} className="">
            <div className=" h-[420px]">
              <img
                onMouseEnter={() => hovered(item?.id)}
                onMouseLeave={() => hovered(item?.id)}
                className="w-full h-full object-cover"
                src={hover.includes(item?.id) ? item?.images[1]?.url : item?.images[0]?.url}
              />
            </div>
            <div className="p-3">
              <h3 className="py-2 font-medium">{item.name}</h3>
              <p className="font-medium">${item.price}</p>

              {item.colors && item.colors.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {item.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5  rounded-full border-1 border-gray-400  cursor-pointer  hover:border-black"
                      style={{
                        backgroundColor: colorMapping[color],
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
