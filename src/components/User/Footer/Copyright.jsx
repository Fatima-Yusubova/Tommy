import React from 'react'

const Copyright = () => {
  return (
    <div className="my-10">
      <div>
        <a href="">
          <img src="/assets/img/Logo.svg" alt="" />
        </a>
      </div>
      <div className="flex gap-1 items-center flex-wrap py-5">
        <a
          href="#"
          class="text-xs font-medium text-black 
                      text-center sm:text-left"
        >
          Terms &amp; Conditions
        </a>
        <span className="inline text-black text-xs">|</span>

        <a
          href="#"
          className="text-xs font-medium text-black 
                      text-center sm:text-left"
        >
          Privacy Policy
        </a>

        <span className="inline text-black text-xs">|</span>

        <a
          href="#"
          className="text-xs font-medium text-black 
                      text-center sm:text-left"
        >
          Privacy Commitment
        </a>

        <span class="inline font-medium text-black text-xs">|</span>

        <a
          href="#"
          class="text-xs text-black font-medium 
                      text-center sm:text-left"
        >
          Interest Based Ads
        </a>

        <span class="inline text-black text-xs">|</span>

        <a
          href="#"
          class="text-xs text-black  font-medium
                      text-center sm:text-left lg:whitespace-nowrap"
        >
          Do Not Sell Or Share My Personal Information
        </a>

        <span class="inline text-black text-xs">|</span>

        <a
          href="#"
          class="text-xs text-black font-medium
                      text-center sm:text-left lg:whitespace-nowrap"
        >
          PVH Corp. Joint Modern Slavery Act Statement
        </a>

        <span class="inline text-black text-xs">|</span>

        <a
          href="#"
          class="text-xs text-black font-medium
                      text-center sm:text-left"
        >
          Brand Protection
        </a>

        <span class="inline text-black text-xs">|</span>

        <a
          href="#"
          class="text-xs text-black  font-medium
                      text-center sm:text-left"
        >
          Accessibility
        </a>
      </div>
      <div className="text-xs font-medium ">
        <p>Web ID: 698060183</p>
        <p >
          © <span>{new Date().getFullYear()}</span> Tommy Hilfiger licensing,
          LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Copyright