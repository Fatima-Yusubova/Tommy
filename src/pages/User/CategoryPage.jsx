import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useGetProductsByIdQuery,useGetFilteredProductsQuery} from "../../store/eccomerceApi";
import ProductCard from "../../components/User/Product/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import OpenMenu from "../../components/ui/OpenMenu";
import FilterContent from "../../components/User/Product/FilterContent";
import CubLoader from "../../components/ui/CubLoader";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const {data: allCategoryProducts,isLoading: isCategoryLoading, isFetching} = useGetProductsByIdQuery(categoryId, {
    refetchOnMountOrArgChange: true, 
  });

  const [view, setView] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Recommended");
  const [filters, setFilters] = useState({
    brandId: 1,
    colors: [],
    sizes: [],
    minPrice: null,
    maxPrice: null,
    sort: "Recommended",
  });

  const actvFilter =
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.sort !== null;

  const {
    data: filteredProducts,
    isLoading: isFilteredLoading,
    isFetching: isFilteredFetching,
  } = useGetFilteredProductsQuery(filters, {
    skip: !actvFilter,
  });

  const filteredByCategory = actvFilter? filteredProducts?.filter((item) => +item.category.id === +categoryId): "";
  const displayProducts = actvFilter ? filteredByCategory : allCategoryProducts;

  const sorts = ["Recommended", "Price Low To High", "Price High to Low"];
  const priceRanges = [
    { label: "$0 - $50", min: 0, max: 25 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200+", min: 200, max: null },
  ];

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    setView(true);
  };

  const handleCloseFilter = () => {
    setView(false);
    setActiveFilter(null);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  };

  const handleColorFilter = (colorName) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName],
    }));
  };

  const handleSizeFilter = (size) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handlePriceFilter = (priceRange) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    }));
  };

  const clearPriceFilter = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: null,
      maxPrice: null,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      brandId: 1,
      colors: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
    });
  };

  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    if (
      isCategoryLoading ||
      isFetching ||
      isFilteredLoading ||
      isFilteredFetching
    ) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 1000)
      return () => clearTimeout(timer);
    }
  }, [isCategoryLoading, isFetching, isFilteredLoading, isFilteredFetching])

  if (showLoader) {
    return <CubLoader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[95%] m-auto">
        <div className="py-5">
          {allCategoryProducts && (
            <>
              <p className="pb-5">{allCategoryProducts[0]?.category.name}</p>
              <h1 className="text-2xl">
                {allCategoryProducts[0]?.category.name}'s Clothing & Accessories
              </h1>
            </>
          )}
        </div>

        <div className="flex justify-between items-center my-5 md:hidden">
          <span className="text-sm text-[#464C52]">
            {displayProducts?.length} items
          </span>
          <div
            className="flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => handleFilterClick(null)}
          >
            <SlidersHorizontal />
            Filter & Sorts
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-4 my-6">
            <button
              onClick={() => handleFilterClick("size")}
              className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:border-gray-400 ${
                filters.sizes.length > 0
                  ? "border-black bg-black text-white"
                  : "border-gray-300"
              }`}
            >
              Size {filters.sizes.length > 0 && `(${filters.sizes.length})`}
              <ChevronDown size={16} />
            </button>
            <button
              onClick={() => handleFilterClick("color")}
              className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:border-gray-400 ${
                filters.colors.length > 0
                  ? "border-black bg-black text-white"
                  : "border-gray-300"
              }`}
            >
              Color {filters.colors.length > 0 && `(${filters.colors.length})`}
              <ChevronDown size={16} />
            </button>
            <button
              onClick={() => handleFilterClick("price")}
              className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:border-gray-400 ${
                filters.minPrice !== null || filters.maxPrice !== null
                  ? "border-black bg-black text-white"
                  : "border-gray-300"
              }`}
            >
              Price{" "}
              {(filters.minPrice !== null || filters.maxPrice !== null) &&
                "(1)"}
              <ChevronDown size={16} />
            </button>
            <button
              onClick={() => handleFilterClick(null)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400"
            >
              <SlidersHorizontal size={16} />
              All Filters
            </button>
          </div>

          <div className="flex justify-between items-center my-5">
            <span className="text-sm text-[#464C52]">
              {displayProducts?.length} Items
            </span>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-sm text-[#464C52]">Sort By</span>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={handleSortChange}
                  className="appearance-none flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-3xl text-sm cursor-pointer hover:border-gray-400 pr-8"
                >
                  {sorts.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
        {actvFilter && (
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            {filters.sizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm"
              >
                {size}
                <button
                  onClick={() => handleSizeFilter(size)}
                  className="hover:text-gray-300 ml-1 text-white"
                >
                  ×
                </button>
              </span>
            ))}

            {filters.colors.map((color) => (
              <span
                key={color}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm"
              >
                {color}
                <button
                  onClick={() => handleColorFilter(color)}
                  className="hover:text-gray-300 ml-1 text-white"
                >
                  ×
                </button>
              </span>
            ))}

            {(filters.minPrice !== null || filters.maxPrice !== null) && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm">
                {filters.maxPrice === null
                  ? `$${filters.minPrice}+`
                  : `$${filters.minPrice} - $${filters.maxPrice}`}
                <button
                  onClick={clearPriceFilter}
                  className="hover:text-gray-300 ml-1 text-white"
                >
                  ×
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayProducts?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="text-center my-10">
        <p className="text-sm text-[#1B1D1F] py-4">
          Showing {displayProducts?.length} of
          {allCategoryProducts?.length || 0} items
        </p>
        <button className="border border-gray-300 rounded-sm w-[40%] lg:w-[30%] py-4 hover:underline hover:border-gray-800 inline-block">
          Load More
        </button>
      </div>

      <OpenMenu open={view} setOpen={setView} width="max-w-lg">
        <FilterContent
          closeMenu={handleCloseFilter}
          activeFilter={activeFilter}
          filters={filters}
          handleColorFilter={handleColorFilter}
          handleSizeFilter={handleSizeFilter}
          handlePriceFilter={handlePriceFilter}
          onClearAll={clearAllFilters}
          priceRanges={priceRanges}
        />
      </OpenMenu>
    </div>
  );
};

export default CategoryPage;
