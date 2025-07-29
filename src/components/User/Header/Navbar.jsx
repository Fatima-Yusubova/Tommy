import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Navbar = () => {
   const [category ,setCategory] = useState([])

   useEffect(() =>{
    const getAllCategory =async () =>{
        let response = await fetch("http://localhost:3000/api/category");
        const elementData = await response.json()
        console.log(elementData)
        if(elementData){
          setCategory(elementData)
        }
    }
    getAllCategory();
   } ,[])
  return (
    <nav>
      <ul className="flex items-center gap-7">
        {category?.map((item, i) => (
          <div key={i} className="group">
            <li className="text-black font-medium text-sm -tracking-normal relative group  leading-2.5">
              <Link to={`/${item.slug}`}>{item.name}</Link>
              <span className="absolute top-6 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <div className="absolute  w-screen left-0 top-30 z-40 overflow-hidden max-h-0 group-hover:max-h-[600px] transition-all duration-500 bg-white px-12  shadow-[rgba(0,0,15,0.5)_5px_5px_4px_0px]">
              <div className="flex  items-start py-10  gap-30">
                {item.children?.map((item, i) => (
                  <div key={i} className="my-2 cursor-pointer">
                    <h2 className="text-[18px] whitespace-nowrap my-2">
                      {item.name}
                    </h2>
                    <ul>
                      {item.children?.map((item, i) => (
                        <li className="text-gray-500 my-2" key={i}>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar