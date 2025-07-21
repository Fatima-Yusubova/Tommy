// src/components/User/Header/Action.jsx
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";

import BasketMenu from "./BasketMenu";

const Action = () => {
  const [bagOpen, setBagOpen] = useState(false)
  return (
    <>
      <div className="flex items-center gap-5">
        <button><CgSearch size={20}/></button>
        <button><LuUserRound size={20} /> </button>
        <button onClick={() =>setBagOpen(true)}><HiOutlineShoppingBag size={20} /></button>
      </div>
      <BasketMenu bagOpen={bagOpen} setBagOpen={setBagOpen} />
    </>
  )
}

export default Action;
