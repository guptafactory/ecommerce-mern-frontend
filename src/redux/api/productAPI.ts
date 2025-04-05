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
  ProductDetailsResponse,
  UpdateProductResponse,
  UpdateProductRequest,
  DeleteProductResponse,
  DeleteProductRequest,
} from "../../types/api/product";

const server = import.meta.env.VITE_SERVER;

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/product/`,
  }),
  tagTypes: ["Products"],
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

    productDetails: builder.query<ProductDetailsResponse, string>({
      query: (productId) => productId,
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

    updateProduct: builder.mutation<
      UpdateProductResponse,
      UpdateProductRequest
    >({
      query: ({ userId, productId, formData }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<
      DeleteProductResponse,
      DeleteProductRequest
    >({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
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
  useProductDetailsQuery,

  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
