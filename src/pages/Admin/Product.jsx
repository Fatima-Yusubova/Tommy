import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import Modal from '../../components/ui/Modal';
import AddProduct from '../../components/Admin/Product/AddProduct';

const Product = () => {
    const [open ,setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 p-6 w-full">
      <div className="max-w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Products
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your product 
              </p>
            </div>

            <button
            onClick={() =>setOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Product</span>
            </button>
          </div>
        </div>

      <Modal open={open} setOpen={setOpen}>
            <AddProduct setOpen={setOpen}/>
      </Modal>
      </div>
    </div>
  );
}

export default Product