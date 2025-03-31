// import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllProductsResponse,
  CategoriesResponse,
  LatestProductsResponse,
  SearchProductsRequest,
  SearchProductsResponse,
} from "../../types/api-types";

const server = import.meta.env.VITE_SERVER;

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<LatestProductsResponse, string>({
      query: () => "latest",
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => "categories",
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
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
} = productAPI;
