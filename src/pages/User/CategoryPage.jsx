import React from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../../store/eccomerceApi";
import SaleBanner from "../../components/User/Header/SaleBanner";
import ProductCard from "./ProductCard"; // Import the ProductCard component

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data } = useGetProductsByIdQuery(categoryId);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
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
      </div>
      <div >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data?.map((item, i) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
