import React, { useState } from 'react'
import { useGetProductIdQuery } from "../../store/eccomerceApi";
import { Link, useParams } from 'react-router';
import { ChevronRight, ChevronRightIcon } from 'lucide-react';

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

const ProductDetail = () => {
    const [selectedColor ,setSelectedColor] = useState()
    const [selectedSize ,setSelectedSize ] = useState()
    
    const { id } = useParams()
    
    const { data: product} = useGetProductIdQuery(id)
    console.log(product)
   
  return (
    <div className="flex gap-[150px] ">
      <div className="basis-[50%] overflow-y-auto scrollbar-hidden ">
        {product?.images?.map((item, i) => (
          <div key={i}>
            <img src={item.url} alt="" />
          </div>
        ))}
      </div>

      <div className="sticky top-10  px-5 py-10">
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
                  selectedColor === color ? "border-black" : "border-gray-300"
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
          <p className="text-[#464C52] text-sm pt-5">
            Free Standard Shipping on Orders $100+
          </p>
          <div className="flex items-baseline gap-2 py-5">
            <p className="text-[#464C52] text-sm">4 payments of $13.43 with </p>
            <img className="w-12" src="/assets/img/Klarna.svg" alt="" />
            or
            <img className="w-16 " src="/assets/img/afterpay.svg" alt="" />
          </div>
        </div>
        <div>
          <div className="flex  w-full justify-between items-center mb-5 ">
            <p>Product Details</p>
            <span>
              <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
          <div className="flex  w-full justify-between items-center mb-5  ">
            <p>Shipping & Returns</p>
            <span>
              <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
          <div className="flex  w-full justify-between items-center mb-5  ">
            <p>Write a Review</p>
            <span>
              <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
          <div className="flex  w-full justify-between items-center mb-5  ">
            <p>Ask a Question</p>
            <span>
              <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail