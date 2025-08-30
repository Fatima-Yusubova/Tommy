import React from 'react'
import CollectionItems from './CollectionItems';
import { Link } from 'react-router';
import { collections } from '../../../../constant/constant';

const Collections = () => {
  return (
    <div className="max-w-[95%] m-auto  mb-25 lg:mb-50">
      <div className="flex items-center justify-center gap-20 pt-20">
        <div className="text-center">
          <h2 className="text-[28px] lg:text-[32px]">Mens</h2>
          <ul
            className="flex flex-col py-3 gap-5
           lg:gap-10 lg:flex-row "
          >
            <li className="">
              <Link className="underline ">Tops</Link>
            </li>
            <li>
              <Link className="underline ">Pants</Link>
            </li>
            <li>
              <Link className="underline ">Accessories</Link>
            </li>
            <li>
              <Link className="underline ">Underwear</Link>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <h2 className="text-[28px] lg:text-[32px]">Women</h2>
          <ul
            className="flex flex-col py-3 gap-5
          lg:gap-10 lg:flex-row   "
          >
            <li className="">
              <Link className="underline ">Tops</Link>
            </li>
            <li>
              <Link className="underline ">Pants</Link>
            </li>
            <li>
              <Link className="underline ">Accessories</Link>
            </li>
            <li>
              <Link className="underline ">Underwear</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid  grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-5 mt-10">
        {collections.map((item, index) => (
          <CollectionItems
            name={item.name}
            image={item.image}
            link={item.link}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Collections