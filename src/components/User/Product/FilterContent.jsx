import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { colorMapping, sizeArr } from "../../../constant/constant";

const FilterContent = ({ closeMenu, activeFilter }) => {
  const [openSection, setOpenSection] = useState(activeFilter)
  const [selectedSort, setSelectedSort] = useState("Recommended")
  const [selectedColor, setSelectedColor] = useState(null)
  useEffect(() => {
    setOpenSection(activeFilter)
  }, [activeFilter]);
  const sortOptions = [
    "Recommended",
    "Newest",
    "Price Low To High",
    "Price High to Low",
    "Top Rated",
  ]
  const priceRanges = [
    "$0 - $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $150",
    "$150 - $300",
    "$300+",
  ]
 const toggleSection = (section) => {
   if (openSection === section) {
     setOpenSection(null)
   } else {
     setOpenSection(section)
   }
 };

  return (
    <div className="relative h-full p-4 my-5 md:ml-6 w-full md:w-sm">
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
          <div>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => toggleSection("size")}
            >
              <h4>Size</h4>
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
                    className="flex items-center justify-center border border-gray-300 py-3 px-2 rounded cursor-pointer hover:border-gray-400"
                    onClick={() => console.log(size)}
                  >
                    <span className="text-[#1B1D1F] font-medium text-sm">
                      {size}
                    </span>
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
              <h4>Colors</h4>
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
                    className={`flex items-center gap-2 cursor-pointer select-none ${
                      selectedColor === name ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() =>
                      setSelectedColor((prev) => (prev === name ? null : name))
                    }
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
          <div>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-5 cursor-pointer"
              onClick={() => toggleSection("price")}
            >
              <h4>Price</h4>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openSection === "price" ? "rotate-180" : ""
                }`}
              />
            </div>
            {openSection === "price" && (
              <div className="py-4 space-y-3">
                {priceRanges.map((label, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-gray-400 appearance-none checked:bg-black checked:border-black relative
                      before:content-['✔'] before:absolute before:text-white before:text-xs before:top-[1px] before:left-[3px]"
                    />
                    <span className="text-sm text-[#1B1D1F]">{label}</span>
                  </label>
                ))}
              </div>
            )}
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
