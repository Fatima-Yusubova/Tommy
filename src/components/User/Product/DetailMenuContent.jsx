import React from "react";
import { IoClose } from "react-icons/io5";

const DetailMenuContent = ({ product, closeMenu }) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex justify-end p-4 md:hidden ">
        <button onClick={closeMenu}>
          <IoClose size={24} className="text-gray-600" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hidden p-10">
        {product?.description && (
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailMenuContent;
