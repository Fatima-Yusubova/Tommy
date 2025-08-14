import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../../store/eccomerceApi";
import ProductCard from "../../components/User/Product/ProductCard"; 
import { SlidersHorizontal } from "lucide-react";
import OpenMenu from "../../components/ui/OpenMenu";
import FilterContent from "../../components/User/Product/FilterContent";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data } = useGetProductsByIdQuery(categoryId)
  const [view ,setView] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[95%] m-auto">
        <div className="py-5">
          {data && (
            <>
              <p className="pb-5">{data[0]?.category.name}</p>
              <h1 className="text-2xl">
                {data[0]?.category.name}'s Clothing & Accessories
              </h1>
            </>
          )}
        </div>
        <div className="flex justify-between items-center my-8">
          <span className="text-sm text-[#464C52]">{data?.length} items</span>
          <div className="flex items-center gap-1 text-sm">
            <button onClick={() => setView(true)}>
              <SlidersHorizontal />
            </button>
            Filter & Sorts
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data?.map((item, i) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="text-center my-10">
        <p className="text-sm text-[#1B1D1F] py-4">
          Showing {data?.length} of 1295 items
        </p>
        <button className="border border-gray-300 rounded-sm  w-[40%] lg:w-[30%] py-4 hover:underline hover:border-gray-800 inline-block">
          Load More
        </button>
      </div>
      <OpenMenu open={view} setOpen={setView} width="max-w-4xl">
         <FilterContent closeMenu={() =>setView(false)}/> 
      </OpenMenu>
    </div>
  );
};

export default CategoryPage;
