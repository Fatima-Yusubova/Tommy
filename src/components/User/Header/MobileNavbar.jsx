import React, { useState } from "react";
import { Link } from "react-router";
import { useGetAllCategoryQuery } from "../../../store/eccomerceApi";
import { ChevronRight, ChevronLeft, PlusIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import OpenMenu from "../../ui/OpenMenu";
const MobileNavbar = ({ setMenuOpen }) => {
  const { data: categories } = useGetAllCategoryQuery();
  const [subMenu, setSubMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setsubcategories] = useState([]);
//  console.log(categories);
  const handleSubMenuOpen = (arg) => {
    setSelectedCategory(arg)
    setSubMenu(true)
  }
  const handleSubMenuClose = () => {
    setSubMenu(false);
    setSelectedCategory(null);
    setsubcategories([])
  }
  const toggleSubCategory = (arg) => {
    setsubcategories((prev) =>prev.includes(arg) ? prev.filter((id) => id !== arg) : [...prev, arg])
  }

  return (
    <div className="h-full bg-white">
      <div className="h-full">
        <div className="p-6 h-full">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-3xl text-gray-900">Categories</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 md:hidden rounded-full transition-colors" >
              <IoClose size={20} />
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            <ul className="space-y-1">
              {categories?.map((item, i) => (
                <li className="w-full flex items-center justify-between py-3 px-0 text-left"key={i}>
                  <Link to={`/category/${item.id}`} className="text-2xl flex-1" onClick={() => setMenuOpen(false)} >{item.name}</Link>
                    <button onClick={() => handleSubMenuOpen(item)}>
                      <ChevronRight size={25} />
                    </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <OpenMenu open={subMenu} setOpen={handleSubMenuClose}>
          <div className="w-full h-full">
            <div className="p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <button
                    onClick={handleSubMenuClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"><ChevronLeft size={20} /></button>
                  <h2 className="text-3xl">
                    {selectedCategory?.name}
                  </h2>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 md:hidden rounded-full transition-colors"
                >
                  <IoClose size={20} />
                </button>
              </div>
              <div className="overflow-y-auto h-full pb-20">
                <div className="mb-6">
                  <Link
                    to={`/category/${selectedCategory?.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-100"
                  >
                    Shop All {selectedCategory?.name}
                  </Link>
                </div>

                <div className="space-y-4">
                  {selectedCategory?.children?.map((subCategory, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-gray-900 flex-1">
                          <Link to={`/category/${subCategory.id}`} onClick={() => setMenuOpen(false)}>{subCategory.name}</Link>
                        </h3>
                            <button
                              onClick={() => toggleSubCategory(subCategory.id)}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-3">
                              <PlusIcon size={20}
                                className={`transform transition-transform duration-200 ${subcategories.includes(subCategory.id) ? "rotate-45": ""}`}/>
                            </button>
                      </div>
                          <div
                            className={`overflow-y-auto transition-all duration-300 ease-in-out ${
                              subcategories.includes(subCategory.id) ? "max-h-100 opacity-100 mt-3": "max-h-0 opacity-0"}`}>
                            <ul className="space-y-2 ">
                              {subCategory.children.map((item,i) => (
                                <li key={i} className="w-full">
                                  <Link
                                    to={`/category/${item.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 "
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </OpenMenu>
      </div>
    </div>
  );
};

export default MobileNavbar;
