import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    const navbarItems =[]
  return (
    <nav>
      <ul className="flex items-center gap-7">
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
         <Link to="/"> New</Link>
        </li>
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <Link to="/men">Men</Link>
        </li>
        <li className="text-black font-medium text-sm -tracking-normal leading-2.5">
          <Link to="/women">women</Link>
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
  );
}

export default Navbar