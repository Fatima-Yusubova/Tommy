import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return user?.token;
};

export const eccomerceApi = createApi({
  reducerPath: "eccomerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category", "Product", "Basket"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        method: "post",
        url: "/auth/signin",
        body: { email: email, password: password },
      }),
    }),
    signUp: builder.mutation({
      query: ({
        firstName,
        lastName,
        email,
        password,
        gender,
        dateOfBirth,
      }) => ({
        method: "post",
        url: "/auth/signup",
        body: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender,
          dateOfBirth: dateOfBirth,
        },
      }),
    }),
    addCategory: builder.mutation({
      query: ({ name, slug, parentId }) => {
        return {
          method: "post",
          url: "/category",
          body: {
            name,
            slug,
            parentId: parentId || null,
          },
        };
      },
      invalidatesTags: ["Category"],
    }),
    getAllCategory: builder.query({
      query: () => "category",
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ name, slug, id }) => ({
        method: "post",
        url: `/category/${id}`,
        body: { name, slug },
      }),
      invalidatesTags: ["Category"],
    }),
    addProduct: builder.mutation({
      query: ({
        name,
        description,
        price,
        discount,
        stock,
        brandId,
        colors,
        sizes,
        images,
        categoryId,
        slug,
      }) => ({
        method: "post",
        url: "/product",
        body: {
          name,
          description,
          price,
          discount,
          stock,
          brandId,
          colors,
          sizes,
          images,
          categoryId,
          slug,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    uploadImages: builder.mutation({
      query: (formData) => ({
        url: "/upload/image",
        method: "POST",
        body: formData,
      }),
    }),
    getAllProduct: builder.query({
      query: () => "product/all",
      providesTags: ["Product"],
    }),
    getProductsById: builder.query({
      query: (categoryId) => `product/category/${categoryId}`,
      providesTags: ["Product"],
    }),
    getProductId: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["Product"],
    }),
    addBasket: builder.mutation({
      query: ({ id, color, size, quantity }) => ({
        method: "post",
        url: `/basket/${id}`,
        body: { color, size, quantity },
      }),
      invalidatesTags: ["Basket"],
    }),
    getFilteredProducts: builder.query({
      query: (filters) => ({
        url: "/product/filter",
        params: filters,
      }),
      providesTags: ["Product"],
    }),
    getBasketItems: builder.query({
      query: () => "/basket",
      providesTags: ["Basket"],
    }),
    deleteBasketItem: builder.mutation({
      query: (id) => ({
        method: "delete",
        url: `/basket/${id}`
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});

export const {
  useDeleteBasketItemMutation,
  useGetBasketItemsQuery,
  useGetFilteredProductsQuery,
  useAddBasketMutation,
  useSignUpMutation,
  useGetProductIdQuery,
  useGetProductsByIdQuery,
  useLoginMutation,
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useAddProductMutation,
  useUploadImagesMutation,
  useGetAllProductQuery,
} = eccomerceApi;
