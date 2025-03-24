// import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllProductsResponse,
  LatestProductsResponse,
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
  }),
});

// export const getUser = async (id: string) => {
//   const { data }: { data: UserResponse } = await axios.get(
//     `${server}/api/v1/user/${id}?id=1`
//   );
//   return data;
// };

export const { useLatestProductsQuery, useAllProductsQuery } = productAPI;
