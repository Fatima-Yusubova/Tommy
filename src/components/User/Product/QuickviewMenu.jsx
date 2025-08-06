import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router'
import { useGetProductIdQuery } from "../../../store/eccomerceApi";
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
const QuickviewMenu = ({view ,setView ,item}) => {
const [selectedColor ,setSelectedColor] = useState()
const [selectedSize ,setSelectedSize ] = useState()

  const {data: product} = useGetProductIdQuery(item.id)
 // console.log(product)

  useEffect(() => {
    if (view) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [view]);

  return (
    <>
      {view && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setView(false)}
        ></div>
      )}
      <div
        className={`
    fixed z-50 bg-white transition-transform duration-500 ease-in
     top-0 right-0 max-w-3xl
    ${view ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <div className="flex gap-3 ">
          <div className="basis-[50%] overflow-y-auto h-screen scrollbar-hidden">
            {product?.images?.map((item, i) => (
              <div key={i}>
                <img src={item.url} alt="" />
              </div>
            ))}
          </div>
          <div className="overflow-hidden h-full basis-[50%] px-5 py-10">
            <h5 className="py-4 text-xs">Tommy Hilfiger</h5>
            <Link className="text-xl ">{product?.name}</Link>
            <p className="py-5"> $ {product?.price}</p>
            <div>
              <span className="text-[#464C52] text-sm">Color</span>{" "}
              <span className="text-sm">{selectedColor}</span>
              <div className="flex gap-3 my-8">
                {product?.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    } hover:border-black transition-colors`}
                    style={{ backgroundColor: colorMapping[color] }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[#464C52] text-sm py-5">Size</p>
              <ul className="grid grid-cols-5 gap-3">
                {product?.sizes?.map((size, i) => (
                  <li
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`w-15 h-12 border  rounded-sm flex items-center justify-center ${
                      selectedSize == size ? "border-black" : "border-gray-300"
                    }`}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-5 py-4">
              <select className="border border-gray-200 rounded-sm py-4 px-5">
                <option value="">Qty</option>
                <option value="">1</option>
              </select>
              <button className=" py-4 w-full bg-black text-white rounded-sm hover:underline">
                Select A Size
              </button>
            </div>

            <div>
              <Link to={`/product/${product?.id}`}>
                <button className="w-full py-4 border border-black rounded-sm mt-5 hover:underline">
                  View full Products detail
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickviewMenu


           
          
           
            
            