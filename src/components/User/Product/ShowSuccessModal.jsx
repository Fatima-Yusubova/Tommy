import React from "react";
import { IoClose } from "react-icons/io5";

const ShowSuccessModal = ({ addedProduct, onClose }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl my-5 ">1 Item Added</h2>
        <button
          onClick={onClose}
          className="ml-auto md:hidden p-1 hover:bg-gray-100 rounded-full"
        >
          <IoClose size={20} />
        </button>
      </div>

      <div className="flex items-start gap-5 mb-6">
        <div className="w-[160px] h-[220px] flex-shrink-0">
          <img
            src={addedProduct?.images?.[0]?.url}
            className="w-full h-full object-cover "
          />
        </div>
        <div className="flex-1 mt-3">
          <h3 className="font-medium mb-1">{addedProduct?.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {addedProduct?.selectedColor} | {addedProduct?.selectedSize}
          </p>
          <div className="flex items-center gap-2">
            {addedProduct?.discount > 0 ? (
              <>
                <span className="text-gray-500 text-xs line-through">
                  ${addedProduct?.price}
                </span>
                <span className="text-black font-medium">
                  $
                  {(
                    addedProduct?.price *
                    (1 - addedProduct?.discount / 100)
                  ).toFixed(2)}
                  each
                </span>
                <span className="text-red-500 text-xs">
                  {addedProduct?.discount}% off
                </span>
              </>
            ) : (
              <span className="text-black font-medium">
                ${addedProduct?.price} each
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full py-4 bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Review + Checkout
        </button>
        <button
          onClick={() =>onClose()}
          className="w-full py-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ShowSuccessModal;
