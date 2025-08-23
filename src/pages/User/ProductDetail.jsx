
import React, { useEffect, useState } from "react"
import {useGetProductIdQuery,useAddBasketMutation} from "../../store/eccomerceApi"
import { Link, useParams } from "react-router"
import { ChevronRight, Info } from "lucide-react"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import OpenMenu from "../../components/ui/OpenMenu"
import DetailMenuContent from "../../components/User/Product/DetailMenuContent"
import { colorMapping } from "../../constant/constant"
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState()
  const [selectedSize, setSelectedSize] = useState()
  const [quantity, setQuantity] = useState(1)
  const [touched, setTouched] = useState(false)
  const [flag, setFlag] = useState(false)
  const { id } = useParams()
  const { data: product } = useGetProductIdQuery(id)
  const [addBasket, { isLoading }] = useAddBasketMutation()
   const dispatch = useDispatch();
   const wishlist = useSelector((state) => state.wishlist)
   const isWishlist = wishlist.includes(product?.id)
   const handleWishlist = () => {
     if (isWishlist) {
       dispatch(removeFromWishlist(product.id));
     } else {
       dispatch(addToWishlist(product.id));
     }
   };
  
  const handleBasket = async (id) => {
    if (!selectedColor || !selectedSize) {
      setTouched(true)
      }

    const response = await addBasket({
      id: id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    });
  }

  return (
    <div className="flex gap-[100px] flex-col md:flex-row py-10">
      <div className="hidden md:flex flex-col gap-2 md:basis-[50%] ">
        {product?.images?.map((item, i) => (
          <div key={i} className="w-full ">
            <img className="w-full h-full object-cover " src={item.url} />
          </div>
        ))}
      </div>
      <div className="md:hidden flex overflow-x-auto scrollbar-hidden">
        {product?.images?.map((item, i) => (
          <div key={i} className="w-full aspect-[3/4] shrink-0 ">
            <img className="w-full h-full object-cover" src={item.url} />
          </div>
        ))}
      </div>
      <div className="sticky w-full md:basis-[40%] top-10 self-start px-10 md:pr-20 py-10 h-fit">
        <h5 className="py-4 text-xs">Tommy Hilfiger</h5>
        <Link className="text-xl ">{product?.name}</Link>
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
                  selectedColor === color ? "border-black" : "border-gray-300"
                } hover:border-black transition-colors`}
                style={{ backgroundColor: colorMapping[color] }}
              />
            ))}
          </div>
          {touched && !selectedColor && (
            <p className="text-red-700 text-sm mb-3 flex items-center gap-2">
              <Info size={18} /> Please select a color
            </p>
          )}
        </div>

        <div>
          <p className="text-[#464C52] text-sm py-5">Size</p>
          <ul className="flex items-center gap-3 flex-wrap">
            {product?.sizes?.map((size, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelectedSize(size);
                  setTouched(false);
                }}
                className={`w-20 h-12 border rounded-sm flex items-center justify-center cursor-pointer ${
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
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-200 rounded-sm py-4 px-5"
          >
            <option value="">Qty</option>
            {Array.from({ length: product?.stock || 0 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleBasket(product?.id)}
            disabled={isLoading}
            className="py-3 w-full bg-black text-white rounded-sm hover:underline disabled:opacity-50"
          >
            {isLoading
              ? "Adding..."
              : selectedSize
              ? "Add to Cart"
              : "Select A Size"}
          </button>
        </div>

        <button
          onClick={handleWishlist}
          className={`py-3 w-full rounded-sm border-2 transition-all duration-200 ${
            isWishlist
              ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
              : "bg-white text-black border-black hover:bg-black hover:text-white"
          }`}
        >
          {isWishlist ? (
            <span className="flex items-center justify-center gap-2">
              <IoMdHeart size={20} />
              Remove from Wishlist
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <IoMdHeartEmpty size={20} />
              Add to Wishlist
            </span>
          )}
        </button>

        <div>
          <p className="text-[#464C52] text-sm pt-5">
            Free Standard Shipping on Orders $100+
          </p>
          <div className="flex items-baseline gap-2 py-5">
            <p className="text-[#464C52] text-sm">4 payments of $13.43 with </p>
            <img className="w-12" src="/assets/img/Klarna.svg" alt="Klarna" />
            or
            <img className="w-16" src="/assets/img/afterpay.svg" />
          </div>
        </div>
        <div>
          <div className="flex w-full justify-between items-center mb-5">
            <p>Product Details</p>
            <button onClick={() => setFlag(true)}>
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </div>

          <OpenMenu open={flag} setOpen={setFlag} width="max-w-4xl">
            <DetailMenuContent
              product={product}
              closeMenu={() => setFlag(false)}
            />
          </OpenMenu>

          <div className="flex w-full justify-between items-center mb-5">
            <p>Shipping & Returns</p>
            <button>
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </div>
          <div className="flex w-full justify-between items-center mb-5">
            <p>Write a Review</p>
            <button>
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </div>
          <div className="flex w-full justify-between items-center mb-5">
            <p>Ask a Question</p>
            <button>
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
