import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import Modal from '../../components/ui/Modal';
import AddProduct from '../../components/Admin/Product/AddProduct';
import { useGetAllProductQuery } from '../../store/eccomerceApi';

const Product = () => {
    const [open ,setOpen] = useState(false)
    const { data } = useGetAllProductQuery();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 p-6 w-full">
      <div className="max-w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Products
              </h1>
              <p className="text-gray-600 mt-2">Manage your product</p>
            </div>
            {
            /* <div dangerouslySetInnerHTML={item.about}></div> bura detailin  o hissesini yazacaqsan */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Product</span>
            </button>
          </div>
        </div>

        <Modal open={open} setOpen={setOpen}>
          <AddProduct setOpen={setOpen} />
        </Modal>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 font-semibold text-gray-700">
            <div>Image</div>
            <div>Slug</div>
            <div>Price</div>
          </div>
          {data?.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100 hover:bg-purple-50/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <span className="text-white w-40 h-20 inline-block  font-bold text-sm">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className=" w-full h-full rounded-xl object-cover"
                    />
                  </span>
                </div>
                <span className="font-medium text-gray-800">{item.name}</span>
              </div>

              <div className="text-gray-600 flex items-center">
                /{item.slug}
              </div>
              <div className="text-gray-600 flex items-center">
                ${item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product