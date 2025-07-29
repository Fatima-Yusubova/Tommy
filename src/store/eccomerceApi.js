import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = JSON.parse(localStorage.getItem("user"))?.token
export const eccomerceApi = createApi({
  reducerPath: "eccomerceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Category"],
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
        const token = JSON.parse(localStorage.getItem("user"))?.token;
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
  }),
});

export const { useLoginMutation,useAddCategoryMutation ,useGetAllCategoryQuery ,useUpdateCategoryMutation} = eccomerceApi;