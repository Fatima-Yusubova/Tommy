import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const DetailMenu = ({ flag, setFlag, product }) => {
  useEffect(() => {
    document.body.style.overflow = flag ? "hidden" : "unset";
  }, [flag]);
 if(product){
    console.log(product)
 }

  return (
    <>
    
      <div
        className={`
          fixed inset-0 bg-black z-[9998] transition-opacity duration-500
          ${flag ? "opacity-50" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setFlag(false)}
      />
      <div
        className={`
          fixed z-[9999] bg-white transition-all duration-500 ease-in-out
          bottom-0 left-0 right-0 max-h-[95vh] h-[95vh] rounded-t-2xl
          ${flag ? "translate-y-0" : "translate-y-full"}
          md:top-0 md:right-0 md:bottom-auto md:left-auto 
          md:max-w-3xl md:h-screen md:max-h-none md:rounded-none
          ${flag ? "md:translate-x-0" : "md:translate-x-full"}
          md:translate-y-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button onClick={() => setFlag(false)}>
              <IoClose size={24} className="text-gray-600" />
            </button>
          </div>
          {product?.description && (
            <div
              className="product-description px-10 pb-10 overflow-y-auto flex-1"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DetailMenu;
