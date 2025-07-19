import React from 'react'

const SaleBanner = () => {
  return (
    <div className="bg-[#AE0029] text-white h-[300px] md:h-[258px] lg:h-auto lg:py-5 flex items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        {/* Desktop Layout - Horizontal like image 2 */}
        <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-12">
          <h2 className="text-2xl font-garamond  whitespace-nowrap">
            End of Season Sale
          </h2>
          <h2 className="text-[16px] font-medium whitespace-nowrap">
            Up to 70% Off + EXTRA 20% Off Sale Styles
          </h2>
          <div className="flex gap-6 items-center">
            <a
              href=""
              className="underline hover:no-underline transition-all text-[16px] whitespace-nowrap"
            >
              Shop Men
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-[16px] whitespace-nowrap"
            >
              Shop Women
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-[16px] whitespace-nowrap"
            >
              Shop Kids
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-[16px] whitespace-nowrap"
            >
              Shop All
            </a>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Stacked/Centered like image 1 */}
        <div className="lg:hidden flex flex-col gap-6 items-center justify-center text-center h-full">
          <h2 className="text-3xl md:text-4xl font-garamond italic leading-tight">
            End of Season Sale
          </h2>
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-xl md:text-2xl font-medium">Up to 70% Off</h2>
            <h2 className="text-lg md:text-xl font-medium">+</h2>
            <h2 className="text-xl md:text-2xl font-medium">
              EXTRA 20% Off Sale Styles
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl"
            >
              Shop Men
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl"
            >
              Shop Women
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl"
            >
              Shop Kids
            </a>
            <a
              href=""
              className="underline hover:no-underline transition-all text-lg md:text-xl"
            >
              Shop All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleBanner