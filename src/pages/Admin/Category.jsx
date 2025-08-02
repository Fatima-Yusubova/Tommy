import React, { useState } from "react";
import { Plus, Edit, Trash2, PlusIcon, SquareChevronDown } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useGetAllCategoryQuery } from "../../store/eccomerceApi";
import AddCategory from "../../components/Admin/Category/AddCategory";
import EditCategory from "../../components/Admin/Category/EditCategory";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);
  const [opensub, setOpensub] = useState(false);
  const [edit, setEdit] = useState(null);
  const [subCategoryParent, setSubCategoryParent] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const { data } = useGetAllCategoryQuery();

  const editCat = (category) => {
    setEdit(category);
    setEditopen(true);
  };

  const toggleSubcategories = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 p-6 w-full">
      <div className="max-w-full">
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

        <Modal open={opensub} setOpen={setOpensub}>
          <AddCategory setOpen={setOpensub} parentId={subCategoryParent?.id} />
        </Modal>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 font-semibold text-gray-700">
            <div>Name</div>
            <div>Slug</div>
            <div className="text-right">Actions</div>
          </div>

          {data?.map((category) => (
            <React.Fragment key={category.id}>
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
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

                <div className="flex space-x-2 justify-end items-center">
                  <button
                    onClick={() => editCat(category)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      // delete main category
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSubCategoryParent(category);
                      setOpensub(true);
                    }}
                    className="p-2 flex items-center gap-2 text-gray-400 hover:text-fuchsia-700 rounded-lg transition-all hover:bg-violet-300"
                  >
                    <PlusIcon /> add subcategory
                  </button>

                  <button
                    onClick={() => toggleSubcategories(category.id)}
                    className="p-2 flex items-center gap-2 text-gray-400 hover:text-fuchsia-700 rounded-lg transition-all hover:bg-violet-300"
                  >
                    <SquareChevronDown />
                    {expandedCategories.includes(category.id)
                      ? "hide"
                      : "show"}{" "}
                    subCategory
                  </button>
                </div>
              </div>

              {expandedCategories.includes(category.id) &&
                category.children?.map((sub) => (
                  <div
                    key={sub.id}
                    className="grid grid-cols-3 gap-4 px-12 py-4 border-t border-gray-100 bg-purple-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {sub.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-700">{sub.name}</span>
                    </div>

                    <div className="text-gray-600">/{sub.slug}</div>

                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => editCat(sub)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          // delete subcategory
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSubCategoryParent(sub);
                          setOpensub(true);
                        }}
                        className="p-2 flex items-center gap-2 text-gray-400 hover:text-fuchsia-700 rounded-lg transition-all hover:bg-violet-300"
                      >
                        <PlusIcon /> add subcategory
                      </button>
                    </div>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
