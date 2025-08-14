import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { colorMapping } from "../../../constant/constant";

const FilterContent = ({ closeMenu }) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");
  const [selectedColor, setSelectedColor] = useState(null);

  const sortOptions = [
    "Recommended",
    "Newest",
    "Price Low To High",
    "Price High to Low",
    "Top Rated",
  ];

  return (
    <div className="relative h-full p-4 my-5">
      <div className="border-b border-gray-300">
        <button onClick={closeMenu} className="absolute top-2 right-2 z-50 p-2">
          <IoClose size={20} />
        </button>
        <h3 className="">Filter & Sort</h3>
        <div className="py-8 overflow-y-auto max-h-[calc(100vh-140px)] pr-2">
          <div>
            <div
              className="flex justify-between items-center border-b border-t border-gray-300 py-5 cursor-pointer"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <h4 className="">Sort by</h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  showSortOptions ? "rotate-180" : ""
                }`}
              />
            </div>
            {showSortOptions && (
              <div className="py-4 space-y-4">
                {sortOptions.map((option, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => setSelectedSort(option)}
                  >
                    <input
                      type="radio"
                      name="sort"
                      checked={selectedSort === option}
                      onChange={() => setSelectedSort(option)}
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
          <div className="flex justify-between items-center border-b border-gray-300 py-5">
            <h4>Size</h4>
            <FaChevronDown />
          </div>

          <div>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => setShowColorOptions(!showColorOptions)}
            >
              <h4>Colors</h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  showColorOptions ? "rotate-180" : ""
                }`}
              />
            </div>
            {showColorOptions && (
              <div className="py-4 grid grid-cols-2 gap-3">
                {Object.entries(colorMapping).map(([name, color], i) => (
                  <button
                    key={i}
                    className={`flex items-center gap-2 cursor-pointer select-none ${
                      selectedColor?.includes(name) ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() => {
                   
                     // console.log(name);
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-gray-400"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span className="text-[#1B1D1F] text-sm">{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-5">
            <h4>Price</h4>
            <FaChevronDown />
          </div>
        </div>
      </div>
      <button className="border border-gray-400 py-4 rounded-sm w-full bg-black text-white hover:underline">
        Clear All
      </button>
    </div>
  );
};

export default FilterContent;
