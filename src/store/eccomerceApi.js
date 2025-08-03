import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Token-i dinamik almaq üçün function
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

export const eccomerceApi = createApi({
  reducerPath: "eccomerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      // Hər request-də fresh token al
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category", "Product"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        method: "post",
        url: "/auth/signin",
        body: { email: email, password: password },
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
      providesTags : ["Product"]
    }),
  }),
});

export const {
  useGetProductsByIdQuery,
  useLoginMutation,
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useAddProductMutation,
  useUploadImagesMutation,
  useGetAllProductQuery,
} = eccomerceApi;
