import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGetBasketItemsQuery } from "../../../store/eccomerceApi";
import UserMenu from "./UserMenu";
import OpenMenu from "../../ui/OpenMenu";
import BasketMenu from "../Product/BasketMenu";
import MobileNavbar from "./MobileNavbar"; // Yeni komponent
import { Menu } from "lucide-react";

const Action = () => {
  const [bagOpen, setBagOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: basketItems } = useGetBasketItemsQuery();

  console.log(basketItems);

  return (
    <>
      <div className="flex items-center gap-5 relative">
        <button>
          <CgSearch size={20} />
        </button>
        <button onClick={() => setUserOpen((prev) => !prev)}>
          <LuUserRound size={20} />
        </button>
        <button className="relative" onClick={() => setBagOpen(true)}>
          <HiOutlineShoppingBag size={20} />
          {basketItems && (
            <span className="absolute -top-2 -right-2 bg-black !text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {basketItems?.[0].totalItems}
            </span>
          )}
        </button>

        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <Menu strokeWidth={2} />
        </button>
      </div>

      {/* Mobile Menu */}
      <OpenMenu open={menuOpen} setOpen={setMenuOpen} >
        <MobileNavbar setMenuOpen={setMenuOpen} />
      </OpenMenu>

      {/* Basket Menu */}
      <OpenMenu open={bagOpen} setOpen={setBagOpen}>
        <BasketMenu basketItems={basketItems} setBagOpen={setBagOpen} />
      </OpenMenu>

      {/* User Menu */}
      {userOpen && (
        <div className="absolute z-30 right-0 top-[110px]">
          <UserMenu />
        </div>
      )}
    </>
  );
};

export default Action;
