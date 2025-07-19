import React from 'react'

const Navbar = () => {
    const navbarItems =[]
  return (
    <nav>
      <ul className="flex items-center gap-7">
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <a href="">New</a>
        </li>
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <a href="">Men</a>
        </li>
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <a href="">Women</a>
        </li>
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <a href="">Kids</a>
        </li>
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <a href="">Shoes && Accecories</a>
        </li>
        <li className="text-black font-medium text-sm tracking-normal leading-2.5">
          <a href="">Tommy Jeans</a>
        </li>
        <li className="text-rose-700 font-medium text-sm tracking-normal leading-2.5">
          <a href="">Sale</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar