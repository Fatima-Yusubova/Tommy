import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const OpenMenu = ({ open, setOpen, children, width = "max-w-4xl" }) => {
 
  useEffect(() => {
  if(open) {
      document.body.style.overflow= "hidden"
  }else {
     document.body.style.overflow = "unset"
  }
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`
    fixed z-[999999] bg-white transition-all duration-500 ease-in-out
    inset-0 w-full h-screen
    ${open ? "translate-y-0" : "translate-y-full"}
    md:top-0 md:right-0 md:bottom-auto md:left-auto 
    md:w-[600px] md:h-screen md:rounded-none
    ${open ? "md:translate-x-0" : "md:translate-x-full"}
    md:translate-y-0
  `}
      >
        <div className="flex items-start max-w-4xl h-full">
          <div className="flex-1 overflow-y-auto scrollbar-hidden max-h-full">
            {children}
          </div>
          <div className="hidden md:flex items-center justify-between ">
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenMenu;
