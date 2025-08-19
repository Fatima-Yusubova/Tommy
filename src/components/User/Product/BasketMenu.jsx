import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import BasketItems from "./BasketItems";

const BasketMenu = ({ basketItems, setBagOpen }) => {
  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex items-center justify-between p-6 flex-shrink-0">
        <h2 className="text-2xl font-medium">Shopping Bag</h2>
        <button
          onClick={() => setBagOpen(false)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors md:hidden"
        >
          <IoClose size={20} className="text-gray-600" />
        </button>
      </div>

      <BasketItems basketItems={basketItems} />

      <div className="border-t border-t-gray-200 p-6 flex-shrink-0">
        <div className="flex items-center justify-between text-[16px] font-medium mb-4">
          <div className="flex items-center gap-2">
            <span>Subtotal</span>
            <span className="text-[#464c52]">
              {basketItems?.[0].totalItems} Items
            </span>
          </div>
          <span>$ {basketItems?.[0].totalPrice}</span>
        </div>
        <Link
          to="/basket"
          onClick={() => setBagOpen(false)}
          className="block w-full tracking-tighter text-[16px] bg-black text-[#F7F8F9] py-4 px-6 rounded-md font-medium mb-3 hover:underline text-center"
        >
          Review + Checkout
        </Link>
        <p className="text-xs font-medium text-[#464c52] text-center mt-3">
          Shipping & Taxes Calculated at Checkout
        </p>
      </div>
    </div>
  );
};

export default BasketMenu;
