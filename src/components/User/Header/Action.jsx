// src/components/User/Header/Action.jsx
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGetBasketItemsQuery } from "../../../store/eccomerceApi";

import BasketMenu from "./BasketMenu";
import UserMenu from "./UserMenu";

const Action = () => {
  const [bagOpen, setBagOpen] = useState(false)
  const [userOpen ,setUserOpen] = useState(false)

  const {data:basketItems} = useGetBasketItemsQuery()

  console.log(basketItems)
  return (
    <>
      <div className="flex items-center gap-5 relative">
        <button>
          <CgSearch size={20} />
        </button>
        <button onClick={() => setUserOpen((prev) => !prev)}>
          <LuUserRound size={20} />{" "}
        </button>
        <button className="relative" onClick={() => setBagOpen(true)}>
          <HiOutlineShoppingBag size={20} />
        </button>
        {basketItems && (
          <span className="absolute -top-2 -right-2 bg-black !text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{basketItems?.[0].totalItems}</span>
        )}
      </div>
      <BasketMenu bagOpen={bagOpen} setBagOpen={setBagOpen} basketItems={basketItems}/>
      {userOpen && (
        <div className=" absolute z-30 right-0 top-[110px]">
          <UserMenu />
        </div>
      )}
    </>
  );
}

export default Action;
