import React, { useEffect, useState } from 'react'
import { useUpdateCategoryMutation } from "../../../store/eccomerceApi";
const EditCategory = ({setEditOpen ,item}) => {
     const [name, setName] = useState("");
     const [slug, setSlug] = useState("");
    
     const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

     useEffect(() => {
       if (item) {
         setName(item.name);
         setSlug(item.slug );
       }
     }, [item])

     const handleEditCategory = async() =>{
        try {
          let response =   await updateCategory({name : name ,slug :slug ,id :item.id}).unwrap();
          console.log(response)
            setEditOpen(false)
        } catch (error) {
            console.log(error)
        }
     }
   


  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Edit Category
        </h2>
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
          placeholder="Add category name..."
          type="text"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Slug
        </label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
          placeholder="Add category slug..."
          type="text"
        />
        <p className="text-xs text-purple-600 mt-2 font-medium">
          URL-friendly version of the name
        </p>
      </div>

      <div className="w-full flex justify-end gap-3 pt-4">
        <button
          onClick={() => setOpen(false)}
          className="px-6 py-3 font-semibold text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleEditCategory}
          className="px-6 py-3 font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white rounded-xl hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCategory