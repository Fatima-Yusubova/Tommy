import React, { useState } from "react";
import { useGetAllCategoryQuery } from "../../../store/eccomerceApi";
import { useAddProductMutation } from "../../../store/eccomerceApi";
import { useUploadImagesMutation } from "../../../store/eccomerceApi"; // yol sənə uyğun dəyiş
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = ({ setOpen }) => {
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
  const sizeArr = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "XXS",
    "XXXS",
    "EU 36",
    "EU 37",
    "EU 38",
    "EU 39",
    "EU 40",
    "EU 41",
    "EU 42",
    "EU 43",
    "EU 44",
    "EU 45",
    "EU 46",
    "EU 47",
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount ,setDiscount] = useState('')
  const [stock, setStock] = useState("");
  const [brandId, setBrand] = useState("");
  const [slug, setSlug] = useState("");
  const [sizes, setSizes] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [selectedColor, setSelectedColor] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadImage] = useUploadImagesMutation();

  const { data: category } = useGetAllCategoryQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleFile = async (e) => {
    const files = Array.from(e.target.files);
    console.log(files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const result = await uploadImage(formData).unwrap();
        console.log(result);
        if (result?.id) {
          setImages((prev) => [...prev, result.id]);
          setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
        }
        toast.success(result.message);
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleProduct = async () => {
    try {
      const response = await addProduct({
        name,
        description: description,
        price,
        discount,
        stock: Number(stock),
        brandId: Number(brandId),
        sizes,
        images,
        categoryId: Number(categoryId),
        slug,
        colors: selectedColor,
      }).unwrap();

      toast.success("product added succesfully");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-6 w-full">
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
        <Editor
          apiKey="ahgi51rrvah32ha9wv3ceygrba65648m382n46iti20jhor6"
          value={description}
          onEditorChange={(content, editor) => setDescription(content)}
          init={{
            plugins: [
              // Core editing features
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Aug 16, 2025:
              "checklist",
              "mediaembed",
              "casechange",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "editimage",
              "advtemplate",
              "ai",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
              "importword",
              "exportword",
              "exportpdf",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [{ value: "About", title: "about" }],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          initialValue="Welcome to TinyMCE!"
        />
        <div />

        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-3">
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
            placeholder="Add product price..."
            type="number"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-3">
            Dsicount
          </label>
          <input
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full bg-white/70 backdrop-blur-sm text-gray-800 border-2 border-purple-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
            placeholder="Add product discount..."
            type="number"
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
            Colors
          </label>

          <select
            multiple
            value={selectedColor}
            onChange={(e) => {
              console.log(e.target.selectedOptions);
              const selectedCo = Array.from(e.target.selectedOptions).map(
                (item) => item.value
              );
              setSelectedColor(selectedCo);
            }}
            className="block w-full border-2 border-purple-200 rounded-xl p-4 mb-3"
          >
            {colors.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-3">
            Sizes
          </label>
          <select
            multiple
            value={sizes}
            onChange={(e) =>
              setSizes([...e.target.selectedOptions].map((opt) => opt.value))
            }
            className="block w-full text-gray-700 text-lg font-semibold mb-3"
            name=""
            id=""
          >
            {sizeArr.map((item, i) => (
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
            onClick={handleProduct}
            className="px-6 py-3 font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white rounded-xl hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
