import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { colorMapping, sizeArr } from "../../../constant/constant";

const FilterContent = ({
  closeMenu,
  activeFilter,
  filters,
  handleColorFilter,
  handleSizeFilter,
  handlePriceFilter,
  onClearAll,
  selectedSort, 
  onSortChange, 
}) => {
  const [openSection, setOpenSection] = useState(activeFilter);

  useEffect(() => {
    setOpenSection(activeFilter);
  }, [activeFilter]);

  const sortOptions = ["Recommended", "Price Low To High", "Price High to Low"];

  const priceRanges = [
    { min: 0, max: 25, label: "$0 - $25" },
    { min: 25, max: 50, label: "$25 - $50" },
    { min: 50, max: 100, label: "$50 - $100" },
    { min: 100, max: 150, label: "$100 - $150" },
    { min: 150, max: 300, label: "$150 - $300" },
    { min: 300, max: null, label: "$300+" },
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="relative h-full p-4 my-5 md:ml-6 w-full ">
      <div className="border-b border-gray-300">
        <button
          onClick={closeMenu}
          className="absolute top-2 right-2 z-50 p-2 md:hidden"
        >
          <IoClose size={20} />
        </button>
        <h3 className="">Filter & Sort</h3>

        <div className="py-8 overflow-y-auto max-h-[calc(100vh-140px)] pr-2">
          <div>
            <div
              className="flex justify-between items-center border-b border-t border-gray-300 py-5 cursor-pointer"
              onClick={() => toggleSection("sort")}
            >
              <h4 className="">Sort by</h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openSection === "sort" ? "rotate-180" : ""
                }`}
              />
            </div>
            {openSection === "sort" && (
              <div className="py-4 space-y-4">
                {sortOptions.map((option, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => onSortChange(option)} // Bu dəyişiklik
                  >
                    <input
                      type="radio"
                      name="sort"
                      checked={selectedSort === option} 
                      onChange={() => onSortChange(option)} 
                      className="hidden peer"
                    />
                    <span className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
                      <span
                        className={`w-3 h-3 rounded-full bg-black transition-opacity duration-150 ${
                          selectedSort === option ? "opacity-100" : "opacity-0"
                        }`}
                      ></span>
                    </span>
                    <span className="text-[#1B1D1F] text-sm">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => toggleSection("size")}
            >
              <h4>
                Size {filters?.sizes?.length > 0 && `(${filters.sizes.length})`}
              </h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openSection === "size" ? "rotate-180" : ""
                }`}
              />
            </div>
            {openSection === "size" && (
              <div className="py-4 grid grid-cols-3 gap-3">
                {sizeArr.map((size, i) => (
                  <button
                    key={i}
                    className={`flex items-center justify-center border py-3 px-2 rounded cursor-pointer transition-all ${
                      filters?.sizes?.includes(size)
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleSizeFilter(size)}
                  >
                    <span className="font-medium text-sm">{size}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => toggleSection("color")}
            >
              <h4>
                Colors
                {filters?.colors?.length > 0 && `(${filters.colors.length})`}
              </h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openSection === "color" ? "rotate-180" : ""
                }`}
              />
            </div>
            {openSection === "color" && (
              <div className="py-4 grid grid-cols-2 gap-3">
                {Object.entries(colorMapping).map(([name, color], i) => (
                  <button
                    key={i}
                    className="flex items-center gap-2 p-2  cursor-pointer" 
                    onClick={() => handleColorFilter(name)}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border ${
                        filters?.colors?.includes(name)
                          ? "border-black border-2"
                          : "border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                    ></span>
                    <span className="text-[#1B1D1F] text-sm">{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => toggleSection("price")}
            >
              <h4>
                Price
                {(filters.minPrice !== null || filters.maxPrice !== null) &&
                  "(1)"}
              </h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openSection === "price" ? "rotate-180" : ""
                }`}
              />
            </div>
            {openSection === "price" && (
              <div className="py-4 space-y-3">
                {priceRanges.map((range, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={
                        (range.max === null &&
                          filters.minPrice === range.min) ||
                        (filters.minPrice === range.min &&
                          filters.maxPrice === range.max)
                      }
                      onChange={() => handlePriceFilter(range)}
                      className="w-4 h-4 border border-gray-400 appearance-none checked:bg-black checked:border-black relative
                      before:content-['✔'] before:absolute before:text-white before:text-xs before:top-[1px] before:left-[3px]"
                    />
                    <span className="text-sm text-[#1B1D1F]">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {(filters.minPrice !== null || filters.maxPrice !== null) && (
            <div className="border-t border-gray-300 pt-4 mt-4">
              <h4 className="text-sm font-medium mb-3">Selected Price:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {filters.maxPrice === null
                    ? `$${filters.minPrice}+`
                    : `$${filters.minPrice} - $${filters.maxPrice}`}
                  <button
                    onClick={() => handlePriceFilter({ min: null, max: null })}
                    className="hover:text-red-600 ml-1"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          )}

          {filters?.sizes && filters.sizes.length > 0 && (
            <div className="border-t border-gray-300 pt-4 mt-4">
              <h4 className="text-sm font-medium mb-3">Selected Sizes:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {size}
                    <button
                      onClick={() => handleSizeFilter(size)}
                      className="hover:text-red-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {filters?.colors?.length > 0 && (
            <div className="border-t border-gray-300 pt-4 mt-4">
              <h4 className="text-sm font-medium mb-3">Selected Colors:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.colors.map((colorName) => (
                  <span
                    key={colorName}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-gray-400"
                      style={{ backgroundColor: colorMapping[colorName] }}
                    ></span>
                    {colorName}
                    <button
                      onClick={() => handleColorFilter(colorName)}
                      className="hover:text-red-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onClearAll}
        className="border border-gray-400 py-4 rounded-sm w-full bg-black text-white hover:underline mt-4"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterContent;
