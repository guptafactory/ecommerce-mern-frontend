// import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllProductsResponse,
  CategoriesResponse,
  LatestProductsResponse,
  CreateProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  CreateProductRequest,
} from "../../types/api-types";

const server = import.meta.env.VITE_SERVER;

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/product/`,
  }),
  tagTypes: ["Products"],
  // keepUnusedDataFor: 0,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    latestProducts: builder.query<LatestProductsResponse, string>({
      query: () => "latest",
      providesTags: ["Products"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["Products"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => "categories",
      providesTags: ["Products"],
    }),
    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ search, minPrice, maxPrice, category, sort, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (minPrice) base += `&minPrice=${minPrice}`;
        if (maxPrice) base += `&maxPrice=${maxPrice}`;
        if (category) base += `&category=${category}`;
        if (sort) base += `&sort=${sort}`;

        return base;
      },
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<
      CreateProductResponse,
      CreateProductRequest
    >({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
} = productAPI;
