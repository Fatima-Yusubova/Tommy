import React, { useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";


const Menu = ({title ,list}) => {
  const [open ,setOpen] = useState(false)
  const toggleMenu =()=>{
    setOpen(!open)
  }

  return (
    <div className="mb-4 md:mb-0 border-gray-700  border-t pb-2 md:border-0">
      <div
        className="flex justify-between  items-center cursor-pointer md:cursor-default py-3 md:py-0 hover:bg-gray-50 md:hover:bg-transparent px-2 md:px-0 rounded-md transition-all duration-200"
        onClick={() => window.innerWidth < 768 && toggleMenu()}>
        <h5 className="text-sm font-bold whitespace-nowrap">{title}</h5>
        <span className="md:hidden text-lg font-bold transition-all duration-300 ease-in-out">
          {open ? <FaMinus /> : <FaPlus />}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all  duration-500 ease-in-out md:!max-h-none md:!opacity-100 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mt-2 md:block">
          {list.map((item, i) => (
            <li
              key={i}
              className={`py-2 text-sm font-sans whitespace-nowrap transform transition-all duration-300 ease-out ${
                open
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0 md:translate-y-0 md:opacity-100"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <a href={item.link} className="tracking-tighter"> {item.name} </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu