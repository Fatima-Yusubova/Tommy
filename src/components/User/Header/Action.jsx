import React from 'react'
import { CgSearch } from "react-icons/cg"
import { LuUserRound } from "react-icons/lu"
import { HiOutlineShoppingBag } from "react-icons/hi";



const Action = () => {
  return (
    <div className='flex items-center gap-5'>
        <button><CgSearch size={20}/></button>
        <button><LuUserRound size={20}/></button>
        <button><HiOutlineShoppingBag size={20}/></button>
    </div>
  )
}

export default Action