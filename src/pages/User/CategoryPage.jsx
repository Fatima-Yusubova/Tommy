import React from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../../store/eccomerceApi";
import SaleBanner from "../../components/User/Header/SaleBanner";
import ProductCard from "./ProductCard"; // Import the ProductCard component

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data } = useGetProductsByIdQuery(categoryId);

  return (
    <div>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="h-[420px] bg-[#AE0029] text-white flex items-center justify-center px-5 py-10">
          <div className="text-center max-w-2xl">
            {/* Title */}
            <h1 className="text-5xl md:text-3xl font-garamond mb-8 leading-tight">
              End of Season Sale
            </h1>

            {/* Discount Information */}
            <div className="mb-10">
              {/* Main Discount */}
              <div className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                Up to 70% Off
              </div>

              {/* Plus Sign */}
              <div className="text-3xl md:text-4xl font-light mb-4 opacity-90">
                +
              </div>

              {/* Extra Discount */}
              <div className="text-2xl md:text-3xl font-medium mb-2 leading-tight">
                EXTRA 30% Off
                <br />
                Sale Styles
              </div>

              {/* Code Information */}
              <div className="text-xl md:text-2xl font-medium opacity-95">
                with Code:{" "}
                <span className="font-bold tracking-widest">SALE</span>
              </div>
            </div>

            {/* Call to Action */}
            <a
              href="#"
              className="inline-block text-lg border-b-2 border-white pb-3 hover:border-opacity-70 hover:-translate-y-0.5 transition-all duration-300 tracking-wide"
            >
              Shop Now
            </a>
          </div>
        </div>

        {data?.map((item, i) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
