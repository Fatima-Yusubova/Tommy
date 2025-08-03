import React from 'react'
import Navbar from './Navbar'
import Action from './Action'
import { Link } from 'react-router';

const Header = () => {
  return (
    <div className="w-full">
      <div className="bg-black py-3 w-full">
        <div className=" text-sm font-medium text-white flex flex-col sm:flex-row gap-2 items-center justify-center w-full">
          <p>Extra 20% Off Sale Styles</p>
          <div className='flex items-center gap-2'>
            <a href="" className="underline">
              Shop Now
            </a>
            <a href="" className="underline">
              Details
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[95%] m-auto py-8">
        <header className="flex items-center justify-between">
          <div className="w-[234px]">
            <Link to='/'>
              <img
                src="/assets/img/Logo.svg"
                alt=""
                className="hidden xl:block w-full object-cover"
              />
              <img className="xl:hidden" src="/Logo-mobile.svg" alt="" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div>
            <Action />
          </div>
        </header>
      </div>
     
    </div>
  );
}

export default Header