// src/components/User/Header/Action.jsx
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";

import BasketMenu from "./BasketMenu";
import UserMenu from "./UserMenu";

const Action = () => {
  const [bagOpen, setBagOpen] = useState(false)
  const [userOpen ,setUserOpen] = useState(false)
  return (
    <>
      <div className="flex items-center gap-5 relative">
        <button>
          <CgSearch size={20} />
        </button>
        <button onClick={() => setUserOpen((prev) => !prev)}>
          <LuUserRound size={20} />{" "}
        </button>
        <button onClick={() => setBagOpen(true)}>
          <HiOutlineShoppingBag size={20} />
        </button>
      </div>
      <BasketMenu bagOpen={bagOpen} setBagOpen={setBagOpen} />
      {userOpen && (
        <div className=" absolute z-30 right-0 top-[110px]">
          <UserMenu />
        </div>
      )}
    </>
  );
}

export default Action;
