import { Import } from 'lucide-react';
import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import { useDeleteBasketItemMutation } from '../../../store/eccomerceApi';

const BasketMenu = ({ bagOpen, setBagOpen ,basketItems }) => {

   useEffect(() => {
     if (bagOpen) {
       document.body.style.overflow = "hidden"
     } else {
       document.body.style.overflow = "unset"
     }
    
   }, [bagOpen])
    
   const [deleteBasketItem] = useDeleteBasketItemMutation()

   const handleDeleteBasket = async(id) =>{
    try {
      let response = await deleteBasketItem(id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
   }

  return (
    <>
      {bagOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setBagOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 transform transition-transform duration-500 ease-in ${
          bagOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 ">
            <h2 className="text-2xl font-medium">Shopping Bag</h2>
            <button
              onClick={() => setBagOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hidden items-start p-6">
            <div>
              {basketItems?.[0].items ? (
                basketItems?.[0].items.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 mb-8">
                    <div className="h-[200px]">
                      <img
                        src={item?.product?.images?.[0].url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div>
                        <p className="text-black py-2">{item?.product.name}</p>
                        <p className="text-sm text-[#464C52] ">
                          {item?.color} / {item?.size}
                        </p>
                        <p className="text-[#464C52] pt-2">
                          $ {item?.product?.price}
                        </p>
                      </div>

                      <div>
                        
                        <button
                        onClick={() =>handleDeleteBasket(item?.product?.id)}
                         className='text-[#464C52] underline'>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p className=" font-medium text-[16px]">
                    You have no items in your bag.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="border-t border-t-gray-200 p-6">
            <div className="flex items-center justify-between text-[16px] font-medium mb-4">
              <div className="flex items-center gap-2">
                <span className=" ">Subtotal</span>
                <span className="text-[#464c52] ">
                  {basketItems?.[0].totalItems} Items
                </span>
              </div>
              <span>$ {basketItems?.[0].totalPrice}</span>
            </div>
            <button className="w-full tracking-tighter text-[16px] bg-[#F7F8F9] text-[#9FA4A9] py-4 px-6 rounded-md font-medium mb-3">
              Review + Checkout
            </button>
            <p className="text-xs font-medium text-[#464c52] text-center mt-3">
              Shipping & Taxes Calculated at Checkout
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default BasketMenu