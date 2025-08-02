import React, { useState } from 'react'
import { useGetAllCategoryQuery } from "../../../store/eccomerceApi";
import { useAddProductMutation } from "../../../store/eccomerceApi";
import { useUploadImagesMutation } from "../../../store/eccomerceApi"; // yol sənə uyğun dəyiş
import { toast } from 'react-toastify';



const AddProduct = ({setOpen}) => {
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Gray",
    "Beige",
    "Ivory",
    "Teal",
    "Turquoise",
    "Lime",
    "Olive",
    "Maroon",
    "Navy",
    "Indigo",
    "Gold",
    "Silver",
    "Bronze",
    "Coral",
    "Salmon",
    "Mint",
    "Lavender",
    "Charcoal",
    "Peach",
    "Mustard",
    "Sand",
    "Sky",
    "Plum",
    "Emerald",
    "Ruby",
    "Sapphire",
  ];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXS", "XXXS"];

  const [name  ,setName] = useState('')
  const [description ,setDescription] = useState('')
  const [price ,setPrice] = useState('')
  const [stock ,setStock] = useState('')
  const [brandId ,setBrand] = useState('')
  const [slug ,setSlug] = useState('')
  const [categoryId ,setCategoryId] = useState('')
  const [selectedColor, setSelectedColor] = useState([]);

  const [imagesId, setImagesId] = useState([]);

  const { data :category } = useGetAllCategoryQuery();
   const[addProduct,{isLoading}] = useAddProductMutation();

    const handleColorChange = (e) => {
      const color = e.target.value;
      if (color && !selectedColor.includes(color)) {
        setSelectedColor([...selectedColor, color]);
      }
    };

   
    const removeColor = (colorToRemove) => {
      setSelectedColor(
        selectedColor.filter((color) => color !== colorToRemove)
      );
    };

    const [images, setImages] = useState([])
    const [previews, setPreviews] = useState([])
    const [uploadImage] = useUploadImagesMutation()

    const handleFile = async (e) => {
      const files = Array.from(e.target.files)
      console.log(files)

      for (const file of files) {
        const formData = new FormData()
        formData.append("image", file)
        try {
          const result = await uploadImage(formData).unwrap()
          console.log(result)
          if (result?.id) {
            setImages((prev) => [...prev, result.id])
            setPreviews((prev) => [...prev, URL.createObjectURL(file)])
          }
        } catch (error) {
          toast.error(error)
        }
      }

      //  const handleProducts = async () => {
      //    try {
      //      const response = await addProduct({
      //        name,
      //        description,
      //        price: Number(price),
      //        stock :Number(stock),
      //        brandId: Number(brandId),
      //        sizes,
      //        images,
      //        categoryId : Number(categoryId),
      //        slug,
      //        colors :selectedColor
      //      }).unwrap();

      //      console.log(response);
      //    } catch (error) {
      //      console.log(error);
      //    }
    };
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Add Product
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
          placeholder="Add product name..."
          type="text"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Description
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
          placeholder="Add product description..."
          type="text"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Price
        </label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
          placeholder="Add product price..."
          type="text"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Stock
        </label>
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
          placeholder="Add category name..."
          type="text"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Brand
        </label>
        <input
          value={brandId}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
          placeholder="Add category name..."
          type="text"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Colors{" "}
          {selectedColor.length > 0 && `(${selectedColor.length} selected)`}
        </label>

        {/* Color seçmək üçün dropdown */}
        <select
          onChange={handleColorChange}
          value=""
          className="block w-full border-2 border-purple-200 rounded-xl p-4 mb-3"
        >
          <option value="">Select a color to add</option>
          {colors
            .filter((color) => !selectedColor.includes(color)) // Artıq seçilmiş colorları gizlət
            .map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
        </select>

        {/* Seçilmiş colorları göstər */}
        {selectedColor.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-purple-50 rounded-xl">
            {selectedColor.map((color, index) => (
              <div
                key={index}
                className="bg-white px-3 py-2 rounded-lg border-2 border-purple-200 flex items-center gap-2 shadow-sm"
              >
                <span className="text-gray-700 font-medium">{color}</span>
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold transition-all"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Sizes
        </label>
        <select
          className="block w-full text-gray-700 text-lg font-semibold mb-3"
          name=""
          id=""
        >
          {sizes.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Images
        </label>

        <input
          type="file"
          multiple
          onChange={handleFile}
          className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
        />

        <div className="flex gap-3 mt-4 flex-wrap">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Preview ${i}`}
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <strong>Yüklənmiş şəkil ID-ləri:</strong> {JSON.stringify(images)}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          Category
        </label>
        <select
          className="block w-full border-2 border-purple-200 rounded-xl p-4"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {category?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
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
          
          className="px-6 py-3 font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white rounded-xl hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Add Product
        </button>
      </div>
    </div>
  );
  }
  


export default AddProduct