import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useGetProductIdQuery } from "../../../store/eccomerceApi";
import { IoClose } from "react-icons/io5";
import { Info } from "lucide-react";
import { useAddBasketMutation } from "../../../store/eccomerceApi"; 

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

const QuickviewContent = ({ item, closeMenu }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity ,setQuantity] = useState(1)
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();
  const { data: product } = useGetProductIdQuery(item?.id);
  const [addBasket, { isLoading }] = useAddBasketMutation(); 
  //console.log(product?.id)

  const handleClick = () => {
    closeMenu();
    navigate(`/product/${product?.id}`);
  }
const handleBasket = async (id) => {
  if (!selectedColor || !selectedSize) {
    setTouched(true)
    return;
  }

  try {
    const response = await addBasket({
      id: id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    })
    closeMenu()

    console.log(response)
  } catch (error) {
    console.error(error)
  }
};


  return (
    <>
      <div className="md:hidden overflow-y-auto h-full">
        <div className="h-full">
          <div className="relative mb-6">
            <div className="flex gap-1 overflow-x-auto scrollbar-hidden">
              {product?.images?.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-64">
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={closeMenu}
              className="absolute top-2 right-2 z-50 p-1 bg-white/30 rounded-full"
            >
              <IoClose size={20} />
            </button>
          </div>

          <div className="p-5">
            <h5 className="text-xs text-gray-500 mb-2">Tommy Hilfiger</h5>
            <Link
              to={`/product/${product?.id}`}
              className="text-xl font-medium block mb-3"
            >
              {product?.name}
            </Link>
            <div className="flex items-center gap-2">
              {product?.discount > 0 ? (
                <>
                  <span className="text-[#484848] text-sm line-through">
                    ${product?.price}
                  </span>
                  <span className="text-black font-medium">
                    $
                    {(product?.price * (1 - product?.discount / 100)).toFixed(
                      2
                    )}
                  </span>
                  <span className="text-[#464C52] text-sm">
                    {product?.discount}% off
                  </span>
                </>
              ) : (
                <span className="text-black font-medium">
                  ${product?.price}
                </span>
              )}
            </div>

            <div className="mb-6">
              <span className="text-[#464C52] text-sm">Color</span>
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

            <div className="mb-6">
              <p className="text-[#464C52] text-sm mb-3">Size</p>
              <ul className="grid grid-cols-4 gap-3">
                {product?.sizes?.map((size, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setSelectedSize(size);
                      setTouched(false);
                    }}
                    className={`h-12 border rounded-sm flex items-center justify-center cursor-pointer
                      ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : touched && !selectedSize
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                  >
                    {size}
                  </li>
                ))}
              </ul>
              {touched && !selectedSize && (
                <p className="text-red-700 text-sm my-5 flex items-center gap-2">
                  <Info size={18} /> Please select a size
                </p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border basis-[30%] border-gray-200 rounded-sm py-3 px-4 flex-1"
                >
                  <option value="">Qty</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button
                 onClick={() =>handleBasket(product?.id)}
                  className="py-3 basis-[70%] bg-black text-white rounded-sm hover:underline"
                >
                  {selectedSize ? "Add to Bag" : "Select A Size"}
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
      <div className="hidden md:flex gap-3 h-full">
        <div className="basis-[50%] overflow-y-auto h-screen scrollbar-hidden relative">
          {product?.images?.map((item, i) => (
            <div key={i}>
              <img src={item.url} alt="" className="w-full" />
            </div>
          ))}
        </div>
        <div className="overflow-hidden h-full basis-[50%] px-5 py-10">
          <h5 className="py-4 text-xs">Tommy Hilfiger</h5>
          <Link to={`/product/${product?.id}`} className="text-xl">
            {product?.name}
          </Link>

          <div className="flex items-center gap-2 py-5">
            {product?.discount > 0 ? (
              <>
                <span className="text-[#484848] text-lg line-through">
                  ${product?.price}
                </span>
                <span className="text-black font-medium">
                  ${(product?.price * (1 - product?.discount / 100)).toFixed(2)}
                </span>
                <span className="text-[#464C52] text-lg">
                  {product?.discount}% off
                </span>
              </>
            ) : (
              <span className="text-black font-medium">${product?.price}</span>
            )}
          </div>

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
                      ? "border-black bg-black text-white"
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
                  onClick={() => {
                    setSelectedSize(size);
                    setTouched(false);
                  }}
                  className={`w-15 h-12 border rounded-sm flex items-center justify-center cursor-pointer
                    ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : touched && !selectedSize
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                >
                  {size}
                </li>
              ))}
            </ul>
            {touched && !selectedSize && (
              <p className="text-red-700 text-sm my-5 flex items-center gap-2">
                <Info size={18} /> Please select a size
              </p>
            )}
          </div>
          <div className="flex items-center gap-5 py-4">
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border basis-[30%] border-gray-200 rounded-sm py-4 px-5"
            >
              <option value="">Qty</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button
              onClick={() =>handleBasket(product?.id)}
              className="py-4 basis-[70%] bg-black text-white rounded-sm hover:underline"
            >
              {selectedSize ? "Add to Bag" : "Select A Size"}
            </button>
          </div>

          <div>
            <button
              className="w-full py-4 border border-black rounded-sm mt-5 hover:underline"
              onClick={handleClick}
            >
              View full Products detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickviewContent;
