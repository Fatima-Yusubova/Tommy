import React from "react";
import { Link } from "react-router";

const CategorySection = ({ title, description, image, link, index }) => {
  return (
    <div className="relative w-full h-[900px] overflow-hidden">
      <img
        src={image}
        className={`absolute inset-0 w-full h-full object-cover
          ${index >= 2 ? "object-left md:object-center" : ""}`}
      />
      <div
        className={`absolute inset-0 z-10 text-white text-center flex flex-col gap-3
        ${
          index == 2
            ? "items-end justify-center pr-[10%] text-right"
            : "items-center justify-center"
        }`}
      >
        <h2 className="text-[42px] lg:text-[56px]">{title}</h2>
        <p className="text-[16px] w-1/3 font-medium tracking-tight hidden lg:block">
          {description}
        </p>
      </div>
      <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10">
        <ul className="flex justify-center flex-nowrap items-center gap-10 text-white tracking-tight text-[16px] underline">
          <li>
            <Link to="/men">{link}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategorySection;
