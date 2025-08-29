import React, { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  useGetBasketItemsQuery,
  useGetAllCategoryQuery,
  useGetAllProductQuery,
} from "../../../store/eccomerceApi";
import UserMenu from "./UserMenu";
import OpenMenu from "../../ui/OpenMenu";
import BasketMenu from "../Product/BasketMenu";
import WishlistContent from "../Product/WishlistContent"; 
import MobileNavbar from "./MobileNavbar";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Action = () => {
  const [bagOpen, setBagOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false); // Yeni state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: basketItems } = useGetBasketItemsQuery();
  const { data: categories } = useGetAllCategoryQuery();
  const { data: products } = useGetAllProductQuery();
  const wishlist = useSelector((state) => state.wishlist);

  useEffect(() => {
    let result = products;
    if (search) {
      result = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => item.category?.name === selectedCategory
      );
    }
    setFilteredProducts(result);
  }, [search, selectedCategory, products]);

  return (
    <>
      <div className="flex items-center gap-5 relative">
        <button onClick={() => setSearchOpen(true)}>
          <CgSearch size={20} />
        </button>
        <button
          className="relative"
          onClick={() => setWishlistOpen(true)}
        >
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
        <button onClick={() => setUserOpen((prev) => !prev)}>
          <LuUserRound size={20} />
        </button>
        <button className="relative" onClick={() => setBagOpen(true)}>
          <HiOutlineShoppingBag size={20} />
          {basketItems && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {basketItems?.[0]?.totalItems}
            </span>
          )}
        </button>
        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <Menu strokeWidth={2} />
        </button>
      </div>
      <OpenMenu open={searchOpen} setOpen={setSearchOpen} width="max-w-lg">
        <div className="w-full h-full flex flex-col bg-white">
          <div className="flex justify-end p-6 border-b border-gray-200">
            <button onClick={() => setSearchOpen(false)} className="md:hidden">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="relative mb-8">
              <div className="flex items-center p-4">
                <CgSearch size={24} className=" mr-3" />
                <input
                  type="text"
                  placeholder="What are you looking for..."
                  className="flex-1 outline-none  placeholder-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="ml-2 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === "All"
                      ? "bg-black text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCategory("All")}
                >
                  All
                </button>
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.name
                        ? "bg-black text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-6">
                {filteredProducts?.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {filteredProducts?.length} items found
                  </span>
                )}
              </div>
              {filteredProducts?.length > 0 ? (
                <div className="grid grid-cols-2 gap-5  ">
                  {filteredProducts.map((item, i) => (
                    <Link key={i} to={`/product/${item.id}`} className="">
                      <div className="aspect-[3/4] ">
                        <img
                          src={item.images?.[0]?.url}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-2 text-sm mb-2">
                          {item.name}
                        </h4>
                        {item.price && (
                          <p className=" text-black text-sm font-medium">
                            ${item.price}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                    <CgSearch size={96} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {search ? "No products found" : "Start searching"}
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    {search
                      ? `We couldn't find any products matching "${search}". Try different keywords or browse our categories.`
                      : "Type something in the search box to find products."}
                  </p>
                </div>
              )}
              {filteredProducts?.length > 10 && (
                <div className="text-center py-6 mt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Showing first 10 results. Refine your search to see more
                    specific results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </OpenMenu>
      <OpenMenu open={menuOpen} setOpen={setMenuOpen}>
        <MobileNavbar setMenuOpen={setMenuOpen} />
      </OpenMenu>
      <OpenMenu open={bagOpen} setOpen={setBagOpen} width="max-w-md">
        <BasketMenu basketItems={basketItems} setBagOpen={setBagOpen} />
      </OpenMenu>
      <OpenMenu open={wishlistOpen} setOpen={setWishlistOpen} width="max-w-xl">
        <WishlistContent setWishlistOpen={setWishlistOpen} />
      </OpenMenu>
      {userOpen && (
        <div className="absolute z-30 right-0 top-[110px]">
          <UserMenu />
        </div>
      )}
    </>
  );
};

export default Action;
