import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import {
  useDeleteBasketItemMutation,
  useUpdateBasketItemMutation,
} from "../../../store/eccomerceApi";

const BasketItems = ({ basketItems }) => {
  const [deleteBasketItem] = useDeleteBasketItemMutation();
  const [updateBasketItem] = useUpdateBasketItemMutation();

  const handleDeleteBasket = async (id) => {
    try {
      let response = await deleteBasketItem(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    console.log(id);
    try {
      const response = await updateBasketItem({ id, quantity });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden min-h-0 px-6">
      <div>
        {basketItems?.[0].items ? (
          basketItems?.[0].items.map((item, i) => (
            <div key={i} className="flex items-start gap-6 mb-8">
              <div className="h-[200px] w-[120px] flex-shrink-0">
                <img
                  src={item?.product?.images?.[0].url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div>
                  <p className="text-black py-2">{item?.product.name}</p>
                  <p className="text-sm text-[#464C52]">
                    {item?.color} / {item?.size}
                  </p>
                  <p className="text-[#464C52] pt-2">$ {item?.price}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item?.product?.id, 1)}
                    >
                      <PlusIcon />
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item?.product?.id, -1)}
                    >
                      <MinusIcon />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteBasket(item?.product?.id)}
                    className="text-[#464C52] underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="font-medium text-[16px]">
            You have no items in your bag.
          </p>
        )}
      </div>
    </div>
  );
};

export default BasketItems;
