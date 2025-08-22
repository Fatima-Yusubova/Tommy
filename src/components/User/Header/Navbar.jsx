import React from "react";
import { Link } from "react-router";
import { useGetAllCategoryQuery } from "../../../store/eccomerceApi";

const Navbar = () => {
  const { data: category } = useGetAllCategoryQuery()
  const categoryImages = {
    Women: "/assets/img/navbar1.jpg",
    Kids: "/assets/img/navbar2.jpg",
    "Shoes&Accessories": "/assets/img/navbar3.jpg",
    "Tommy Jeans": "/assets/img/navbar4.jpg",
    New: "/assets/img/navbar5.jpg",
    Men: "/assets/img/navbar6.jpg",
  }

  return (
    <nav>
      <ul className="flex items-baseline gap-10">
        {category?.map((item, i) => (
          <div key={i} className="group">
            <li className="text-black font-medium text-sm -tracking-normal relative group leading-2.5">
              <Link to={`/category/${item.id}`}>{item.name}</Link>
              <span className="absolute top-6 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <div className="absolute w-screen left-0 top-30 z-40 overflow-hidden max-h-0 group-hover:max-h-[600px] transition-all duration-500 bg-white px-12 shadow-[rgba(0,0,15,0.5)_5px_5px_4px_0px]">
              <div className="flex items-start py-10 gap-8">
                <div className="mr-8">
                  <img
                    src={categoryImages[item.name]}
                    className="w-60 h-80 object-cover"
                  />
                </div>
                <div className="flex items-start gap-10">
                  {item.children?.map((item, i) => (
                    <div key={i} className="mb-2 cursor-pointer">
                      <h2 className="text-[18px] whitespace-nowrap mb-2">
                        <Link to={`/category/${item.id}`}>{item.name}</Link>
                      </h2>
                      <ul>
                        {item.children?.map((item, i) => (
                          <li className="text-gray-500 my-2" key={i}>
                            <Link to={`/category/${item.id}`}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
