import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../store/wishlistSlice";
import { X, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useGetAllProductQuery } from "../../../store/eccomerceApi";

const WishlistContent = ({ setWishlistOpen }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const { data: products } = useGetAllProductQuery();

  const wishlistProducts =
    products?.filter((product) => wishlist.includes(product.id)) || [];

  const handleRemoveFromWishlist = (productId) => {
    if (user) {
      dispatch(removeFromWishlist({ userId: user.id, productId }))
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl  text-gray-900">My Wishlist</h2>
        <button
          onClick={() => setWishlistOpen(false)}
          className="p-2 hover:bg-gray-100 md:hidden rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {wishlistProducts.length > 0 ? (
          <div className="p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                {wishlistProducts.length} item
                {wishlistProducts.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-shrink-0"
                    onClick={() => setWishlistOpen(false)}
                  >
                    <div className="w-30 h-40 overflow-hidden">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setWishlistOpen(false)}
                      className="block"
                    >
                      <h3 className="font-medium text-[#464C52] line-clamp-2 text-sm mb-1">
                        {product.name}
                      </h3>
                      {product.price && (
                        <p className="text-black">
                          ${product.price}
                        </p>
                      )}
                    </Link>
                  </div>

                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="flex-shrink-0 p-2 text-gray-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-4 max-w-sm mx-auto">
                Start adding items to your wishlist by clicking the heart icon
                on products you love.
              </p>
              <button
                onClick={() => setWishlistOpen(false)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistContent;
