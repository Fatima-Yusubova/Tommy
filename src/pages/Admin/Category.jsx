import React, { useState } from 'react'
import { Plus, Edit, Trash2 } from "lucide-react";
import Modal from '../../components/ui/Modal';
import {useGetAllCategoryQuery} from '../../store/eccomerceApi'
import AddCategory from '../../components/Admin/Category/AddCategory';
import EditCategory from '../../components/Admin/Category/EditCategory';
const Category = () => {
    const [open ,setOpen] = useState(false)
     const [editopen, setEditopen] = useState(false);
     const [edit, setEdit] = useState();
    const {data} = useGetAllCategoryQuery()
   
    const editCat = (category) =>{
        console.log(category)
        setEdit(category)
        setEditopen(true)
    }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 p-6">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Categories
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your product categories
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Category</span>
            </button>
          </div>
        </div>
        <Modal open={open} setOpen={setOpen}>
          <AddCategory setOpen={setOpen} />
        </Modal>
        <Modal open={editopen} setOpen={setEditopen}>
        
          <EditCategory setEditopen={setEditopen} item={edit} />
        </Modal>

        {/* Categories Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 font-semibold text-gray-700">
            <div>Name</div>
            <div>Slug</div>
            <div>Products</div>
            <div className="text-right">Actions</div>
          </div>
          {data?.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-4 gap-4 p-6 border-b border-gray-100 last:border-b-0 hover:bg-purple-50/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-gray-800">
                  {category.name}
                </span>
              </div>
              <div className="text-gray-600 flex items-center">
                /{category.slug}
              </div>
              <div className="text-gray-600 flex items-center">
                {category.productsCount} products
              </div>
              <div className="flex space-x-2 justify-end items-center">
                <button
                  onClick={() => editCat(category)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category