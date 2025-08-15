import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../../store/eccomerceApi";
import ProductCard from "../../components/User/Product/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import OpenMenu from "../../components/ui/OpenMenu";
import FilterContent from "../../components/User/Product/FilterContent";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data } = useGetProductsByIdQuery(categoryId);
  const [view, setView] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");
  const sortOptions = [
    "Recommended",
    "Newest",
    "Price Low To High",
    "Price High to Low",
    "Top Rated",
  ];
  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType)
    setView(true)
  }
  const handleCloseFilter = () => {
    setView(false)
    setActiveFilter(null)
  }
  const handleSortSelect = (option) => {
    setSelectedSort(option)
    setShowSortDropdown(false)
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[95%] m-auto">
        <div className="py-5">
          {data && (
            <>
              <p className="pb-5">{data[0]?.category.name}</p>
              <h1 className="text-2xl">
                {data[0]?.category.name}'s Clothing & Accessories
              </h1>
            </>
          )}
        </div>

        <div className="flex justify-between items-center my-5 md:hidden">
          <span className="text-sm text-[#464C52]">{data?.length} items</span>
          <div
            className="flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => handleFilterClick(null)}
          >
            <SlidersHorizontal />
            Filter & Sorts
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-4 my-6">
            <button
              onClick={() => handleFilterClick("size")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400"
            >
              Size <ChevronDown size={16} />
            </button>
            <button
              onClick={() => handleFilterClick("color")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400"
            >
              Color <ChevronDown size={16} />
            </button>
            <button
              onClick={() => handleFilterClick("price")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400"
            >
              Price <ChevronDown size={16} />
            </button>
            <button
              onClick={() => handleFilterClick(null)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400"
            >
              <SlidersHorizontal size={16} />
              All Filters
            </button>
          </div>

          <div className="flex justify-between items-center my-5">
            <span className="text-sm text-[#464C52]">{data?.length} Items</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-sm text-[#464C52]">Sort By</span>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-3xl text-sm hover:border-gray-400"
                >
                  {selectedSort} <ChevronDown size={14} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[180px]">
                    {sortOptions.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleSortSelect(option)}
                        className={`w-full text-left px-4 py-1 text-sm hover:bg-blue-600 hover:text-white ${
                          selectedSort === option
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="text-center my-10">
        <p className="text-sm text-[#1B1D1F] py-4">
          Showing {data?.length} of 1295 items
        </p>
        <button className="border border-gray-300 rounded-sm w-[40%] lg:w-[30%] py-4 hover:underline hover:border-gray-800 inline-block">
          Load More
        </button>
      </div>
      <OpenMenu open={view} setOpen={setView} width="max-w-4xl">
        <FilterContent
          closeMenu={handleCloseFilter}
          activeFilter={activeFilter}
        />
      </OpenMenu>
    </div>
  );
};

export default CategoryPage;
