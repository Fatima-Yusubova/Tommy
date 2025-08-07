import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
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

const QuickviewMenu = ({ view, setView, item }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const { data: product } = useGetProductIdQuery(item.id);

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
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setView(false)}
          ></div>
          <div
            className="
          fixed z-50 bg-white transition-transform duration-500 ease-in-out
          bottom-0 left-0 right-0 max-h-[100vh]  h-[100vh]  rounded-t-2xl
          translate-y-0
          lg:top-0 lg:right-0 lg:bottom-auto lg:left-auto 
          lg:max-w-3xl lg:h-screen lg:max-h-none lg:rounded-none
          lg:translate-x-0 lg:translate-y-0
        "
          >
           
            <button
              onClick={() => setView(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoClose size={24} />
            </button>

            {/* M*/}
            <div className="lg:hidden overflow-y-auto h-full">
              <div className="h-full">
                <div className="flex gap-1 overflow-x-auto scrollbar-hidden mb-6">
                  {product?.images?.map((item, i) => (
                    <div key={i} className="flex-shrink-0 w-64">
                      <img
                        src={item.url}
                        alt=""
                        className="w-full h-full object-cover "
                      />
                    </div>
                  ))}
                </div>
                <div className="p-5">
                  <h5 className="text-xs text-gray-500 mb-2">Tommy Hilfiger</h5>
                  <Link className="text-xl font-medium block mb-3">
                    {product?.name}
                  </Link>
                  <p className="text-lg font-semibold mb-6">
                    ${product?.price}
                  </p>
                  <div className="mb-6">
                    <span className="text-[#464C52] text-sm">Color</span>{" "}
                    <span className="text-sm font-medium">{selectedColor}</span>
                    <div className="flex gap-3 mt-3">
                      {product?.colors?.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color
                              ? "border-black"
                              : "border-gray-300"
                          } hover:border-black transition-colors`}
                          style={{ backgroundColor: colorMapping[color] }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <p className="text-[#464C52] text-sm mb-3">Size</p>
                    <ul className="grid grid-cols-4 gap-3">
                      {product?.sizes?.map((size, i) => (
                        <li
                          key={i}
                          onClick={() => setSelectedSize(size)}
                          className={`h-12 border rounded-sm flex items-center justify-center cursor-pointer ${
                            selectedSize === size
                              ? "border-black bg-black text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <select className="border basis-[30%] border-gray-200 rounded-sm py-3 px-4 flex-1">
                        <option value="">Qty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <button className="py-3  basis-[70%] bg-black text-white rounded-sm  hover:underline">
                        Select A Size
                      </button>
                    </div>

                    <Link to={`/product/${product?.id}`}>
                      <button className="w-full py-3 border border-black rounded-sm hover:underline">
                        View Full Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* D */}
            <div className="hidden lg:flex gap-3 h-full">
              <div className="basis-[50%] overflow-y-auto h-screen scrollbar-hidden">
                {product?.images?.map((item, i) => (
                  <div key={i}>
                    <img src={item.url} alt="" className="w-full" />
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
                    {product?.colors?.map((color, i) => (
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
                        className={`w-15 h-12 border rounded-sm flex items-center justify-center cursor-pointer ${
                          selectedSize === size
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-5 py-4">
                  <select className="border basis-[30%] border-gray-200 rounded-sm py-4 px-5">
                    <option value="">Qty</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <button className="py-4 basis-[70%] bg-black text-white rounded-sm hover:underline">
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
      )}
    </>
  );
};

export default QuickviewMenu;
