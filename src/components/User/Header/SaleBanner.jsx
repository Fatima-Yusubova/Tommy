import React from "react";

const SaleBanner = () => {
  return (
    <div className="bg-[#AE0029] text-white h-[500px] md:h-[400px] lg:h-auto lg:py-5 flex items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 text-center lg:text-left h-full">
          <h2 className="text-3xl md:text-4xl lg:text-2xl font-garamond italic lg:not-italic whitespace-nowrap leading-tight lg:leading-normal">
            End of Season Sale
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
            <h2 className="text-xl md:text-2xl lg:text-[16px] font-medium whitespace-nowrap">
              Up to 70% Off
            </h2>
            <h2 className="text-lg md:text-xl lg:hidden font-medium">+</h2>
            <h2 className="text-xl md:text-2xl lg:text-[16px] font-medium whitespace-nowrap">
              <span className="lg:before:content-['+_'] lg:before:mr-1">
                EXTRA 20% Off Sale Styles
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center">
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl lg:text-[16px] whitespace-nowrap"
            >
              Shop Men
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl lg:text-[16px] whitespace-nowrap"
            >
              Shop Women
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl lg:text-[16px] whitespace-nowrap"
            >
              Shop Kids
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl lg:text-[16px] whitespace-nowrap"
            >
              Shop All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
