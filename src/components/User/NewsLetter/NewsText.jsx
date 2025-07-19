import React from 'react'

const NewsText = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-10 xl:gap-15">
      {/* Logo Section */}
      <div className=" relative w-[130px] md:w-[270px] lg:w-[150px] mb-6 lg:mb-0">
        <h4 className="uppercase absolute font-medium left-3 top-0 leading-2  md:left-20 lg:left-6 text-xl   tracking-wide ">
          join
        </h4>
        <div className="">
          <img
            className="w-full h-full object-contain"
            src="/assets/img/club-logo.png"
            alt="Tommy Hilfiger Club Logo"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center lg:text-left lg:flex-1 max-w-md lg:max-w-none">
        <div className="">
          <p className="text-lg font-bold">Enter your email for 20% off</p>
          <p className="text-lg ">your next order and more VIP perks</p>
        </div>
        <p className="text-sm  mt-3">
          Or text <span className="font-semibold">JOIN</span> to{" "}
          <span className="font-semibold">TOMMY (86669)</span> to sign up
          instantly
        </p>
      </div>
    </div>
  );
}

export default NewsText