import { Check, ChevronDown, Info, InfoIcon } from "lucide-react";
import React, { useState } from "react";
import BasketItems from "../../components/User/Product/BasketItems";
import { useGetBasketItemsQuery } from "../../store/eccomerceApi";

const BasketPage = () => {
  const { data: basketItems, isLoading, error } = useGetBasketItemsQuery()
  if (isLoading) {
    return <div className="max-w-[90%] m-auto my-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-[90%] m-auto my-10">
        Error loading basket items.
      </div>
    );
  }

  return (
    <div className="max-w-[90%] m-auto">
      <div className="my-10 flex flex-col xl:flex-row justify-center items-start xl:gap-[150px] ">
        <div className=" w-full xl:basis-[60%]">
          <div className="flex items-center gap-1">
            <p className="text-[#464C52]">Free shipping on orders of $100+ </p>
            <span className="underline text-sm">Details</span>
          </div>
          <div className="mt-5">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl">Shopping Bag</h1>
              <span className="text-sm text-[#464C52]">
                ({basketItems?.[0]?.totalItems} items)
              </span>
            </div>
            <p className="text-sm py-3 flex items-center gap-1">
              <Info size={15} /> Items in bag are not reserved and may sell out.
              Order now.
            </p>
          </div>

          <div className="my-5 border-gray-300 border-t border-b py-4">
            <BasketItems basketItems={basketItems}/>
          </div>
        </div>
        <div className="w-full xl:basis-[25%]">
          <div className="w-full">
            <div className="flex justify-between border-gray-300 border-t border-b py-4">
              <p className="text-[#464C52] text-sm">Have A Promo Code ?</p>
              <ChevronDown />
            </div>
            <div className="border-b border-gray-500 py-7">
              <div className="flex justify-between pb-4">
                <h3 className="text-xl">Order Summary</h3>
                <span> {basketItems?.[0]?.totalItems} items</span>
              </div>
              <div className="flex justify-between text-sm text-[#464C52] pb-4">
                <p>Subtotal</p>
                <span> $ {basketItems?.[0]?.totalPrice}</span>
              </div>
              <div className="flex  justify-between text-sm pb-4">
                <p className="text-[#464C52]">Standard Shipping</p>
                <span className="text-[#0E845A] justify-between">FREE</span>
              </div>
              <div className="text-sm text-[#464C52] flex justify-between">
                <p>Tax</p>
                <p>Calculated in checkout</p>
              </div>
            </div>
            <div className="my-5">
              <div className="flex justify-between pb-4">
                <p>Estimated total</p>
                <span> $ {basketItems?.[0]?.totalPrice}</span>
              </div>
              <div className="flex place-items-baseline gap-2 text-xs text-[#464C52]">
                <p className="">4 payments of $83.99 with </p>
                <img className="h-3" src="/assets/img/Klarna.svg" alt="" />
                <p>or</p>
                <img className="h-4" src="/assets/img/afterpay.svg" alt="" />
                <InfoIcon size={12} />
              </div>
              <button className="bg-black rounded-sm w-full py-4 text-white hover:underline my-5">
                Start checkout
              </button>
              <p className="text-[#464C52] text-center text-sm">
                or checkout with
              </p>
              <div className="flex justify-between py-4">
                <button className="border-gray-400 hover:border-black rounded-sm py-4 border basis-[45%] flex items-center justify-center">
                  <img src="/assets/img/Klarna.svg" alt="" />
                </button>
                <button className="border-gray-400 hover:border-black rounded-sm py-4 border basis-[45%] flex items-center justify-center">
                  <img src="/assets/img/Klarna.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
