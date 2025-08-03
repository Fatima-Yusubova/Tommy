import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = JSON.parse(localStorage.getItem("user"))?.token
export const eccomerceApi = createApi({
  reducerPath: "eccomerceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
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
          headers: {
            authorization: `Bearer ${token}`,
          },
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
        headers: {
          authorization: `Bearer ${token}`,
        },
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
        headers: {
          authorization: `Bearer ${token}`,
        },
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
  }),
});

export const { useLoginMutation,useAddCategoryMutation ,useGetAllCategoryQuery ,useUpdateCategoryMutation ,useAddProductMutation ,useUploadImagesMutation ,useGetAllProductQuery} = eccomerceApi;